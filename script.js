/**
 * RVCP Chatbot — Conversation Engine & State Machine
 * Handles chat interactions, form submissions, and intent matching
 */

(function () {
  'use strict';

  // ─── State ─────────────────────────────────────────────────
  let isOpen = false;
  let isTyping = false;
  let messageQueue = [];
  let currentFlow = null;
  let promptDismissed = false;
  let inactivityTimer = null;
  const INACTIVITY_TIMEOUT = 120000; // 120 seconds (2 minutes)
  const STORAGE_KEY = 'rvcp_chatbot_state';

  // Helper to dynamically resolve the logo path in WordPress or standalone environments
  const getLogoUrl = () => {
    return (window.rvcpChatbotSettings && window.rvcpChatbotSettings.logoUrl)
      ? window.rvcpChatbotSettings.logoUrl
      : 'logo.png';
  };

  // Persistent session ID generator for end-to-end tracking
  const getSessionId = () => {
    let sid = sessionStorage.getItem('rvcp_session_id');
    if (!sid) {
      sid = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
      sessionStorage.setItem('rvcp_session_id', sid);
    }
    return sid;
  };

  // Lightweight dual telemetry dispatcher (backend API + graceful fallback)
  const recordTelemetry = (eventType, eventData = {}) => {
    try {
      let baseUrl = '';
      if (window.rvcpChatbotSettings && window.rvcpChatbotSettings.vercelUrl) {
        baseUrl = window.rvcpChatbotSettings.vercelUrl.replace(/\/$/, '');
      } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        baseUrl = 'http://localhost:3000';
      }
      const payload = {
        sessionId: getSessionId(),
        eventType,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        data: eventData
      };
      fetch(baseUrl + '/api/telemetry/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (_) {}
  };

  // ─── DOM References ────────────────────────────────────────
  const chatContainer = document.getElementById('chatContainer');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatToggle = document.getElementById('chatToggle');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatClearBtn = document.getElementById('chatClearBtn');
  const welcomePrompt = document.getElementById('welcomePrompt');
  const welcomePromptClose = document.getElementById('welcomePromptClose');
  const landingCta = document.getElementById('landingCta');

  // ─── Initialize ────────────────────────────────────────────
  function init() {
    attachEventListeners();
    const loaded = loadState();
    
    if (!loaded) {
      showWelcomePrompt();
    }
  }

  // ─── Local Storage ────────────────────────────────────────
  function saveState() {
    const messages = [];
    const messageEls = chatMessages.querySelectorAll('.message');
    messageEls.forEach(el => {
      const isBot = el.classList.contains('bot');
      messages.push({
        type: isBot ? 'bot' : 'user',
        html: el.querySelector('.message-bubble').innerHTML,
        time: el.querySelector('.message-time').innerText
      });
    });

    // Determine if buttons or form are currently active
    let activeInteractive = null;
    const buttonsContainer = document.getElementById('buttonsContainer');
    const formContainer = document.getElementById('formContainer');

    if (formContainer && currentFlow) {
      activeInteractive = { type: 'form', flowId: currentFlow };
    } else if (buttonsContainer && currentFlow) {
      activeInteractive = { type: 'buttons', flowId: currentFlow };
    }

    const state = {
      isOpen,
      promptDismissed,
      currentFlow,
      messages,
      activeInteractive
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    try {
      const state = JSON.parse(saved);
      isOpen = state.isOpen;
      promptDismissed = state.promptDismissed;
      currentFlow = state.currentFlow;

      // Restore messages
      if (state.messages && state.messages.length > 0) {
        state.messages.forEach(msg => {
          const messageEl = document.createElement('div');
          messageEl.className = `message ${msg.type}`;
          messageEl.innerHTML = `
            <div class="message-avatar">${msg.type === 'bot' ? '<img src="' + getLogoUrl() + '" alt="RV">' : 'You'}</div>
            <div>
              <div class="message-bubble">${msg.html}</div>
              <span class="message-time">${msg.time}</span>
            </div>
          `;
          chatMessages.appendChild(messageEl);
        });
        scrollToBottom();
      } else {
        // If no messages, we should show welcome
        if (isOpen) {
           navigateTo('welcome');
        }
      }

      // Restore interactive elements
      if (state.activeInteractive) {
        const flow = CHAT_FLOWS[state.activeInteractive.flowId];
        if (flow) {
          if (state.activeInteractive.type === 'buttons' && flow.buttons) {
            renderButtons(flow.buttons, false); // Pass false to skip saving during load
          } else if (state.activeInteractive.type === 'form' && flow.form) {
            renderForm(flow.form, flow.buttons, false);
          }
        }
      }

      // Restore UI state
      if (isOpen) {
        chatContainer.classList.add('open');
        chatToggle.classList.add('hidden');
        resetInactivityTimer();
      }

      if (promptDismissed && welcomePrompt) {
        welcomePrompt.classList.add('hidden');
      }

      return state.messages && state.messages.length > 0;
    } catch (e) {
      console.error('[RVCP Chatbot] Error loading state:', e);
      return false;
    }
  }

  // ─── Event Listeners ──────────────────────────────────────
  function attachEventListeners() {
    chatToggle.addEventListener('click', toggleChat);
    chatCloseBtn.addEventListener('click', closeChat);
    
    if (chatClearBtn) {
      chatClearBtn.addEventListener('click', clearChat);
    }
    
    chatSendBtn.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
      }
    });

    if (welcomePrompt) {
      welcomePrompt.addEventListener('click', (e) => {
        if (!e.target.closest('.welcome-prompt-close')) {
          openChat();
        }
      });
    }

    if (welcomePromptClose) {
      welcomePromptClose.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissPrompt();
      });
    }

    if (landingCta) {
      landingCta.addEventListener('click', openChat);
    }
  }

  // ─── Chat Toggle ──────────────────────────────────────────
  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    isOpen = true;
    chatContainer.classList.add('open');
    chatToggle.classList.add('hidden');
    dismissPrompt();

    // Start welcome flow if no messages yet
    if (chatMessages.children.length === 0) {
      setTimeout(() => navigateTo('welcome'), 300);
    }

    recordTelemetry('chat_opened', {});
    saveState();
    setTimeout(() => chatInput.focus(), 500);
    resetInactivityTimer();
  }

  function closeChat() {
    isOpen = false;
    chatContainer.classList.remove('open');
    setTimeout(() => {
      chatToggle.classList.remove('hidden');
    }, 300);
    saveState();
    clearInactivityTimer();
  }
  
  function clearChat() {
    chatMessages.innerHTML = '';
    messageQueue = [];
    isTyping = false;
    currentFlow = null;
    localStorage.removeItem(STORAGE_KEY);
    clearInactivityTimer();
    
    if (isOpen) {
      setTimeout(() => navigateTo('welcome'), 100);
    }
  }

  // ─── Welcome Prompt ───────────────────────────────────────
  function showWelcomePrompt() {
    if (promptDismissed) return;
    setTimeout(() => {
      if (!isOpen && welcomePrompt) {
        welcomePrompt.classList.remove('hidden');
      }
    }, 5000); // Changed from 2s to 5s
  }

  function dismissPrompt() {
    promptDismissed = true;
    if (welcomePrompt) {
      welcomePrompt.classList.add('hidden');
    }
    saveState();
  }

  // ─── Navigation ───────────────────────────────────────────
  function navigateTo(flowId) {
    const flow = CHAT_FLOWS[flowId];
    if (!flow) {
      addBotMessage("I'm sorry, I couldn't find that information. Let me take you back to the main menu.");
      setTimeout(() => navigateTo('welcome'), 1000);
      return;
    }

    currentFlow = flowId;
    recordTelemetry('flow_navigated', { flowId: flowId });
    clearButtons();
    clearForms();

    // Queue messages
    const messages = flow.messages || [];
    const buttons = flow.buttons || [];
    const form = flow.form || null;

    showTypingIndicator();

    let totalDelay = 600;
    messages.forEach((msg, index) => {
      const delay = totalDelay + (msg.delay || 400);
      totalDelay = delay;

      setTimeout(() => {
        hideTypingIndicator();
        addBotMessage(msg.text);

        // Show typing for next message if more messages
        if (index < messages.length - 1) {
          setTimeout(() => showTypingIndicator(), 200);
        }
      }, delay);
    });

    // Show form after messages
    if (form) {
      setTimeout(() => {
        renderForm(form, buttons);
      }, totalDelay + 400);
    }

    // Show buttons after messages (and form if no form)
    if (!form && buttons.length > 0) {
      setTimeout(() => {
        renderButtons(buttons);
      }, totalDelay + 400);
    }

    saveState();
    resetInactivityTimer();
  }

  // ─── Messages ─────────────────────────────────────────────
  function addBotMessage(html) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message bot';
    messageEl.innerHTML = `
      <div class="message-avatar"><img src="${getLogoUrl()}" alt="RV"></div>
      <div>
        <div class="message-bubble">${formatMessage(html)}</div>
        <span class="message-time">${getTimeString()}</span>
      </div>
    `;
    chatMessages.appendChild(messageEl);
    saveState();
    scrollToBottom();
  }

  function addUserMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message user';
    messageEl.innerHTML = `
      <div class="message-avatar">You</div>
      <div>
        <div class="message-bubble">${escapeHtml(text)}</div>
        <span class="message-time">${getTimeString()}</span>
      </div>
    `;
    chatMessages.appendChild(messageEl);
    saveState();
    scrollToBottom();
  }

  function formatMessage(html) {
    // Convert \n to <br>
    return html.replace(/\n/g, '<br>');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ─── Typing Indicator ────────────────────────────────────
  function showTypingIndicator() {
    if (isTyping) return;
    isTyping = true;

    const typingEl = document.createElement('div');
    typingEl.className = 'typing-indicator';
    typingEl.id = 'typingIndicator';
    typingEl.innerHTML = `
      <div class="message-avatar">RV</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessages.appendChild(typingEl);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    isTyping = false;
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
  }

  // ─── Buttons ──────────────────────────────────────────────
  function renderButtons(buttons, shouldSave = true) {
    clearButtons();
    const container = document.createElement('div');
    container.className = 'buttons-container';
    container.id = 'buttonsContainer';

    buttons.forEach((btn, index) => {
      const buttonEl = document.createElement('button');
      buttonEl.className = 'quick-btn' + (btn.label.includes('←') ? ' back-btn' : '');
      buttonEl.textContent = btn.label;
      buttonEl.style.animationDelay = `${index * 60}ms`;

      buttonEl.addEventListener('click', () => {
        addUserMessage(btn.label);
        recordTelemetry('button_clicked', { label: btn.label, action: btn.action });
        clearButtons();
        clearForms();
        setTimeout(() => navigateTo(btn.action), 300);
      });

      container.appendChild(buttonEl);
    });

    chatMessages.appendChild(container);
    if (shouldSave) saveState();
    scrollToBottom();
  }

  function clearButtons() {
    const existing = document.getElementById('buttonsContainer');
    if (existing) {
      existing.remove();
      saveState();
    }
  }

  // ─── Forms ────────────────────────────────────────────────
  function renderForm(form, afterButtons, shouldSave = true) {
    clearForms();
    const container = document.createElement('div');
    container.className = 'chat-form';
    container.id = 'formContainer';

    const card = document.createElement('div');
    card.className = 'form-card';

    form.fields.forEach((field) => {
      const group = document.createElement('div');
      group.className = 'form-group';

      const label = document.createElement('label');
      label.textContent = field.label;
      label.setAttribute('for', `field_${field.name}`);
      group.appendChild(label);

      if (field.type === 'select') {
        const select = document.createElement('select');
        select.id = `field_${field.name}`;
        select.name = field.name;
        select.required = field.required;

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = `Select ${field.label}`;
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        field.options.forEach((opt) => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });

        group.appendChild(select);
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.id = `field_${field.name}`;
        input.name = field.name;
        input.placeholder = field.placeholder || '';
        input.required = field.required;
        if (field.type === 'tel') {
          input.pattern = '[0-9]{10}';
          input.maxLength = 10;
          input.inputMode = 'numeric';
          // Block non-digit characters on keypress
          input.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          });
          // Strip non-digits on paste/input
          input.addEventListener('input', (e) => {
            const cleaned = input.value.replace(/\D/g, '').slice(0, 10);
            if (input.value !== cleaned) {
              input.value = cleaned;
            }
          });
        }
        group.appendChild(input);
      }

      card.appendChild(group);
    });

    const submitBtn = document.createElement('button');
    submitBtn.className = 'form-submit-btn';
    submitBtn.textContent = form.submitLabel;
    submitBtn.type = 'button';

    submitBtn.addEventListener('click', () => {
      if (validateForm(card, form.fields)) {
        const formData = collectFormData(card, form.fields);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Show user input summary
        const summary = form.fields.map(f => {
          const value = formData[f.name];
          return `${f.label}: ${value}`;
        }).join('\n');
        addUserMessage(summary);

        clearForms();

        // Send data to Google Sheets (if configured)
        sendToGoogleSheets(form.id, formData);

        // Show success response
        setTimeout(() => {
          showTypingIndicator();
          setTimeout(() => {
            hideTypingIndicator();
            addBotMessage(form.successMessage);

            if (afterButtons && afterButtons.length > 0) {
              setTimeout(() => renderButtons(afterButtons), 400);
            }
          }, 1000);
        }, 500);
      }
    });

    card.appendChild(submitBtn);
    container.appendChild(card);
    chatMessages.appendChild(container);
    if (shouldSave) saveState();
    scrollToBottom();
  }

  function clearForms() {
    const existing = document.getElementById('formContainer');
    if (existing) {
      existing.remove();
      saveState();
    }
  }

  function validateForm(card, fields) {
    let isValid = true;

    fields.forEach((field) => {
      const input = card.querySelector(`#field_${field.name}`);
      if (!input) return;

      const value = input.value.trim();

      if (field.required && !value) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
        isValid = false;
      } else if (field.type === 'tel' && value && !/^\d{10}$/.test(value)) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
        isValid = false;
      } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
        isValid = false;
      } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }
    });

    if (!isValid) {
      // Show validation message
      const existingError = card.querySelector('.form-error');
      if (!existingError) {
        const error = document.createElement('div');
        error.className = 'form-error';
        error.style.cssText = 'color: #f87171; font-size: 12px; text-align: center; margin-top: 4px;';
        error.textContent = '⚠️ Please fill in all required fields correctly';
        card.appendChild(error);
        setTimeout(() => error.remove(), 3000);
      }
    }

    return isValid;
  }

  function collectFormData(card, fields) {
    const data = {};
    fields.forEach((field) => {
      const input = card.querySelector(`#field_${field.name}`);
      if (input) data[field.name] = input.value.trim();
    });
    return data;
  }

  // ─── Google Sheets Integration ────────────────────────────
  function sendToGoogleSheets(formType, formData) {
    // Note: the backend (email) call below always runs; the Google Sheets call is skipped if no URL is configured.
    if (typeof GOOGLE_SHEETS_URL === 'undefined' || !GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === '') {
      console.log('[RVCP Chatbot] Google Sheets URL not configured. Sending to backend only:', formType, formData);
    }

    // Map form data to spreadsheet columns based on form type
    let payload = {
      ...formData,
      formType: formType,
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || ''
    };

    switch (formType) {
      case 'fee_enquiry':
        payload.programme = 'Bachelor of Physiotherapy (BPT)';
        payload.extra1 = formData.percentage || '';  // 12th / PCB %
        payload.extra2 = formData.city || '';         // City
        payload.extra3 = 'Fee Enquiry';
        break;

      case 'fee_enquiry_msc':
        payload.programme = 'Master of Physiotherapy (MPT)';
        payload.extra1 = formData.specialization || ''; // Specialization
        payload.extra2 = formData.city || '';             // City
        payload.extra3 = 'Fee Enquiry';
        break;

      case 'scholarship_apply':
        payload.programme = formData.programme || '';
        payload.extra1 = '';
        payload.extra2 = '';
        payload.extra3 = 'Scholarship Guidance';
        break;

      case 'campus_visit_1030':
        payload.programme = '';
        payload.extra1 = '';
        payload.extra2 = '';
        payload.extra3 = 'Campus Visit';
        payload.timeSlot = '10:30 AM';
        break;

      case 'campus_visit_1200':
        payload.programme = '';
        payload.extra1 = '';
        payload.extra2 = '';
        payload.extra3 = 'Campus Visit';
        payload.timeSlot = '12:00 PM';
        break;

      case 'campus_visit_0300':
        payload.programme = '';
        payload.extra1 = '';
        payload.extra2 = '';
        payload.extra3 = 'Campus Visit';
        payload.timeSlot = '3:00 PM';
        break;

      case 'talk_to_counsellor':
        payload.programme = '';
        payload.extra1 = '';
        payload.extra2 = '';
        payload.extra3 = 'Talk to Admission Counsellor';
        break;

      case 'book_counselling':
        payload.programme = 'Master of Physiotherapy (MPT)';
        payload.extra1 = formData.specialization || '';
        payload.extra2 = '';
        payload.extra3 = 'Book Counselling Session';
        break;

      default:
        payload.extra3 = formType;
    }

    if (payload.extra3) {
      payload.formType = payload.extra3;
    }

    let endpoint = '/send-lead';
    switch (payload.extra3) {
      case 'Fee Enquiry': endpoint = '/send-fee-enquiry'; break;
      case 'Scholarship Guidance': endpoint = '/send-scholarship'; break;
      case 'Campus Visit': endpoint = '/send-campus-visit'; break;
      case 'Talk to Admission Counsellor': endpoint = '/send-counsellor'; break;
      case 'Book Counselling Session': endpoint = '/send-book-counselling'; break;
    }

    // Attach persistent session ID for end-to-end tracking
    payload.sessionId = getSessionId();

    // 1. Send to Backend Server
    let baseUrl = '';
    if (window.rvcpChatbotSettings && window.rvcpChatbotSettings.vercelUrl) {
      baseUrl = window.rvcpChatbotSettings.vercelUrl.replace(/\/$/, '');
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      baseUrl = 'http://localhost:3000';
    }

    fetch(baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      console.log('[RVCP Chatbot] Lead processed:', data);
      recordTelemetry('lead_submitted', { formType: payload.formType, name: payload.name, programme: payload.programme });
    })
    .catch(err => console.error('[RVCP Chatbot] Error sending lead email:', err));

    // 2. Send to Google Sheets via Apps Script Web App (if configured)
    if (typeof GOOGLE_SHEETS_URL !== 'undefined' && GOOGLE_SHEETS_URL) {
      fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',  // Google Apps Script requires no-cors
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        console.log('[RVCP Chatbot] Data sent to Google Sheets successfully');
      })
      .catch((error) => {
        console.warn('[RVCP Chatbot] Failed to send data to Google Sheets:', error);
      });
    }
  }

  // ─── User Text Input Handling ─────────────────────────────
  function handleUserInput() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    recordTelemetry('user_message', { text: text });
    chatInput.value = '';
    clearButtons();
    clearForms();

    // 1. Check Direct FAQ Engine first for immediate, natural answers
    const matchedFaq = matchFaq(text);
    if (matchedFaq) {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        addBotMessage(matchedFaq.answer);
        recordTelemetry('faq_answered', { faqId: matchedFaq.id, query: text });
        if (matchedFaq.actionButtons && matchedFaq.actionButtons.length > 0) {
          setTimeout(() => renderButtons(matchedFaq.actionButtons), 300);
        }
      }, 500);
      resetInactivityTimer();
      return;
    }

    // 2. Specificity-weighted Intent Flow matching
    const matchedAction = matchIntent(text);
    if (matchedAction) {
      setTimeout(() => navigateTo(matchedAction), 350);
    } else {
      // Log missed query in telemetry for continuous intelligence
      recordTelemetry('unmatched_query', { text: text });

      // Courteous Fallback with instant options
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        addBotMessage(
          `I want to make sure I get you the exact information! 🤔\n\nYou can ask about:\n• <strong>BPT (Bachelor of Physiotherapy)</strong>\n• <strong>MPT (Master of Physiotherapy)</strong> & 6 Specialisations\n• <strong>Merit Scholarships (Up to ₹2 Lakhs)</strong>\n• <strong>Clinical OPD & Hospital Postings</strong>\n• <strong>Hostel & Mess Facilities</strong>\n• <strong>Campus Visit Booking</strong>\n• <strong>Contact & Faculty Directory</strong>\n\nOr choose an option below to continue:`
        );
        setTimeout(() => {
          renderButtons(CHAT_FLOWS.welcome.buttons);
        }, 350);
      }, 600);
    }

    resetInactivityTimer();
  }

  // ─── Student Slang & Abbreviations Dictionary ────────────
  const ABBREVIATIONS_MAP = {
    // Leadership & People
    "princi": "principal", "princ": "principal", "pncpl": "principal", "princie": "principal",
    "princii": "principal", "princple": "principal", "princpal": "principal", "principle": "principal",
    "dir": "director", "dr": "doctor", "prof": "professor", "profs": "professor",
    "fac": "faculty", "facs": "faculty", "hod": "head of department", "hods": "head of department",

    // College & Campus
    "clg": "college", "colg": "college", "coll": "college", "inst": "institute",
    "univ": "university", "dept": "department", "depts": "departments",

    // Programmes
    "bpt": "bpt", "mpt": "mpt", "pt": "physiotherapy", "phys": "physiotherapy",
    "physio": "physiotherapy", "bach": "bachelor", "mast": "master", "ug": "bpt", "pg": "mpt",

    // MPT Specialisations
    "msk": "musculoskeletal", "sprts": "sports", "neuro": "neurological", "neur": "neurological",
    "ortho": "orthopaedic", "orth": "orthopaedic", "peds": "pediatric", "paed": "pediatric",
    "ped": "pediatric", "cardio": "cardiopulmonary", "pulm": "pulmonary", "comm": "community",

    // Fees & Finance
    "fe": "fees", "fee": "fees", "fees": "fees", "fi": "fees", "chrg": "charges", "chrgs": "charges",
    "pkg": "package", "pack": "package", "tuit": "tuition", "mgmt": "management",
    "instl": "installment", "instal": "installment",

    // Scholarships
    "schol": "scholarship", "schlr": "scholarship", "sch": "scholarship",
    "schlrshp": "scholarship", "scholr": "scholarship", "mer": "merit",

    // Hostel & Accommodation
    "host": "hostel", "hostl": "hostel", "hstl": "hostel", "accom": "accommodation",
    "accomodation": "accommodation", "accomm": "accommodation", "rm": "room", "rms": "rooms",
    "shrg": "sharing", "dorm": "dormitory",

    // Eligibility & Exams
    "elig": "eligibility", "elg": "eligibility", "eligib": "eligibility",
    "pct": "percentage", "perc": "percentage", "per": "percentage",
    "pcb": "pcb", "puc": "eligibility", "ent": "entrance", "qual": "qualification",

    // Admissions & Applications
    "adm": "admission", "admn": "admission", "admiss": "admission", "admin": "admission",
    "appl": "apply", "app": "application", "reg": "registration", "regn": "registration",

    // Placements & Jobs
    "place": "placement", "plcmnt": "placement", "placements": "placement",
    "sal": "salary", "fut": "future", "opp": "opportunities", "hosp": "hospital",

    // Location & Contact
    "loc": "location", "locn": "location", "addr": "address", "add": "address",
    "ph": "phone", "num": "number", "no": "number", "cont": "contact",
    "mob": "mobile", "hlp": "help", "info": "information",

    // Clinical
    "opd": "opd", "clnc": "clinic", "clinc": "clinic", "evng": "evening",
    "eve": "evening", "rot": "internship", "intern": "internship",

    // Timings
    "tim": "timings", "time": "timings", "hrs": "hours", "sched": "schedule",

    // Documents
    "doc": "documents", "docs": "documents", "cert": "certificates", "certs": "certificates",

    // Discounts & Waivers
    "disc": "scholarship"
  };

  function normalizeQuery(text) {
    const raw = text.toLowerCase().trim();
    const tokens = raw.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
    const expanded = tokens.map(t => ABBREVIATIONS_MAP[t] || t);
    return {
      raw,
      tokens,
      expandedQuery: expanded.join(' '),
      allTokens: Array.from(new Set([...tokens, ...expanded]))
    };
  }

  function matchFaq(text) {
    if (typeof FAQ_KNOWLEDGE === 'undefined' || !Array.isArray(FAQ_KNOWLEDGE)) return null;
    const norm = normalizeQuery(text);
    const candidates = [norm.raw, norm.expandedQuery];

    // 1. Direct pattern match against raw and expanded queries
    for (const query of candidates) {
      for (const faq of FAQ_KNOWLEDGE) {
        if (faq.patterns.some(p => query.includes(p))) {
          return faq;
        }
      }
    }

    // 2. Token / Stem / Common Root match across all tokens (original + expanded)
    for (const faq of FAQ_KNOWLEDGE) {
      for (const pattern of faq.patterns) {
        for (const query of candidates) {
          if (pattern.length >= 4 && query.includes(pattern)) return faq;
          if (query.length >= 4 && pattern.includes(query)) return faq;
        }

        for (const word of norm.allTokens) {
          if (word.length >= 3) {
            if (pattern === word) return faq;
            if (pattern.startsWith(word) || (pattern.length >= 4 && word.startsWith(pattern))) {
              return faq;
            }
            let common = 0;
            while (common < word.length && common < pattern.length && word[common] === pattern[common]) {
              common++;
            }
            if (common >= 5 && (word.length - common <= 3) && (pattern.length - common <= 3)) {
              return faq;
            }
          }
        }
      }
    }

    return null;
  }

  function matchIntent(text) {
    if (typeof INTENT_MAP === 'undefined' || !Array.isArray(INTENT_MAP)) return null;
    const norm = normalizeQuery(text);
    const candidates = [norm.raw, norm.expandedQuery];
    let bestAction = null;
    let highestScore = 0;

    for (const intent of INTENT_MAP) {
      const baseWeight = intent.weight || 10;
      for (const keyword of intent.keywords) {
        for (const query of candidates) {
          if (query.includes(keyword)) {
            const score = baseWeight + (keyword.length * 2);
            if (score > highestScore) {
              highestScore = score;
              bestAction = intent.action;
            }
          }
        }

        for (const word of norm.allTokens) {
          if (word.length >= 3) {
            if (keyword === word) {
              const score = baseWeight + (word.length * 2);
              if (score > highestScore) {
                highestScore = score;
                bestAction = intent.action;
              }
            } else if (word.length >= 4 && (keyword.startsWith(word) || word.startsWith(keyword))) {
              const score = baseWeight + (word.length * 2) - 1;
              if (score > highestScore) {
                highestScore = score;
                bestAction = intent.action;
              }
            }
          }
        }
      }
    }

    return bestAction;
  }

  // ─── Inactivity Prompt ────────────────────────────────────
  function resetInactivityTimer() {
    clearInactivityTimer();
    if (isOpen) {
      inactivityTimer = setTimeout(() => {
        addBotMessage(
          `Hello 👋\n\nJust checking if you need assistance regarding <strong>BPT (Bachelor of Physiotherapy)</strong> or <strong>MPT</strong> admission.\n\n<strong>Admissions are now open for 2026-2027 under RVCP!</strong>`
        );
        renderButtons([
          { label: "🎓 BPT Programme", action: "bpt_main" },
          { label: "📚 MPT Programme", action: "mpt_main" },
          { label: "💰 Scholarship Details", action: "scholarships" },
          { label: "📞 Contact Us", action: "contact" },
          { label: "← Main Menu", action: "welcome" }
        ]);
        recordTelemetry('inactivity_prompt_shown', {});
      }, INACTIVITY_TIMEOUT);
    }
  }

  function clearInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }

  // ─── Utilities ────────────────────────────────────────────
  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function getTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  // ─── Start ────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
