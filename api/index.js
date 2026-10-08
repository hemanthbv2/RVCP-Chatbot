require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static chatbot assets from root and dashboard assets from /dashboard
const rootDir = path.resolve(__dirname, '..');
const dashboardDir = path.join(rootDir, 'dashboard');
const dataDir = path.join(rootDir, 'data');

if (!fs.existsSync(dataDir)) {
    try { fs.mkdirSync(dataDir, { recursive: true }); } catch (_) {}
}

app.use(express.static(rootDir));
app.use('/dashboard', express.static(dashboardDir));

// Helper for local file persistence
const readDataFile = (filename, defaultValue = []) => {
    try {
        const filePath = path.join(dataDir, filename);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (_) {}
    return defaultValue;
};

const writeDataFile = (filename, data) => {
    try {
        const filePath = path.join(dataDir, filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (_) {}
};

// In-memory collections with file persistence backup
const inMemoryLeads = readDataFile('leads.json', []);
const inMemoryInteractions = readDataFile('interactions.json', []);
const inMemorySessions = readDataFile('sessions.json', {});

// Configure Nodemailer transporter with explicit SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ─── Telemetry / Interaction Logger ───────────────────────────
function logInteraction(req, res) {
    try {
        const body = req.body || {};
        const sessionId = body.sessionId || 'sess_anonymous';
        const timestamp = body.timestamp || new Date().toISOString();
        const eventType = body.eventType || 'interaction';
        const eventData = body.data || body;

        // Record interaction (Normalized to WordPress key standards: timestamp & data)
        const interactionRecord = {
            id: 'int_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
            sessionId,
            timestamp,
            eventType,
            pageUrl: body.pageUrl || '',
            userAgent: body.userAgent || '',
            data: eventData
        };

        inMemoryInteractions.unshift(interactionRecord);
        if (inMemoryInteractions.length > 500) inMemoryInteractions.pop();
        writeDataFile('interactions.json', inMemoryInteractions);

        // Update session summary
        if (!inMemorySessions[sessionId]) {
            inMemorySessions[sessionId] = {
                sessionId,
                startedAt: timestamp,
                lastActive: timestamp,
                pageUrl: body.pageUrl || '',
                userAgent: body.userAgent || '',
                eventCount: 0,
                hasLead: false,
                events: []
            };
        }

        const session = inMemorySessions[sessionId];
        session.lastActive = timestamp;
        session.eventCount = (session.eventCount || 0) + 1;
        session.events.unshift({
            timestamp,
            eventType,
            detail: eventData
        });
        if (session.events.length > 50) session.events.pop();

        if (eventType === 'lead_submitted') {
            session.hasLead = true;
        }

        writeDataFile('sessions.json', inMemorySessions);

        return res.status(200).json({ success: true, record: interactionRecord });
    } catch (err) {
        console.error('Error logging telemetry interaction:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

// ─── Lead Dispatcher & Email Notification ─────────────────────
async function sendLeadEmail(req, res) {
    try {
        const leadData = req.body || {};
        const sessionId = leadData.sessionId || 'sess_' + Math.random().toString(36).substring(2, 11);
        const timestamp = new Date().toISOString();

        console.log(`Received new lead on ${req.path}:`, leadData);

        // Normalized to WordPress key standards (timestamp, sessionId, data)
        const leadRecord = {
            id: 'lead_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
            timestamp: timestamp,
            sessionId: sessionId,
            formType: leadData.formType || leadData.extra3 || 'General Inquiry',
            name: leadData.name || 'Not provided',
            phone: leadData.phone || 'Not provided',
            email: leadData.email || '',
            programme: leadData.programme || 'Physiotherapy',
            percentage: leadData.percentage || leadData.extra1 || '',
            city: leadData.city || leadData.extra2 || '',
            specialization: leadData.specialization || '',
            timeSlot: leadData.timeSlot || '',
            status: 'New',
            data: leadData
        };

        inMemoryLeads.unshift(leadRecord);
        writeDataFile('leads.json', inMemoryLeads);

        // Update session status
        if (inMemorySessions[sessionId]) {
            inMemorySessions[sessionId].hasLead = true;
            writeDataFile('sessions.json', inMemorySessions);
        }

        // Format email notification
        let emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #6F4D41; text-align: center; border-bottom: 2px solid #896D62; padding-bottom: 10px;">New RVCP Physiotherapy Lead</h2>
                <div style="background-color: #FAF7F2; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p><strong>Form Type:</strong> <span style="color: #333;">${leadRecord.formType}</span></p>
                    <p><strong>Candidate Name:</strong> <span style="color: #333;">${leadRecord.name}</span></p>
                    <p><strong>Phone:</strong> <span style="color: #333;">${leadRecord.phone}</span></p>
                    ${leadRecord.email ? `<p><strong>Email:</strong> <span style="color: #333;">${leadRecord.email}</span></p>` : ''}
                    ${leadRecord.programme ? `<p><strong>Programme:</strong> <span style="color: #333;">${leadRecord.programme}</span></p>` : ''}
                    ${leadRecord.percentage ? `<p><strong>12th / PCB %:</strong> <span style="color: #333;">${leadRecord.percentage}%</span></p>` : ''}
                    ${leadRecord.specialization ? `<p><strong>Specialisation:</strong> <span style="color: #333;">${leadRecord.specialization}</span></p>` : ''}
                    ${leadRecord.city ? `<p><strong>City:</strong> <span style="color: #333;">${leadRecord.city}</span></p>` : ''}
                    ${leadRecord.timeSlot ? `<p><strong>Visit Time Slot:</strong> <span style="color: #333;">${leadRecord.timeSlot}</span></p>` : ''}
                    <p><strong>Session ID:</strong> <span style="color: #777; font-family: monospace;">${leadRecord.sessionId}</span></p>
                </div>
                <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">Automatically generated by RVCP Chatbot Telemetry Engine.</p>
            </div>
        `;

        if (process.env.EMAIL_USER && process.env.RECEIVER_EMAIL) {
            const mailOptions = {
                from: `"RVCP Chatbot" <${process.env.EMAIL_USER}>`,
                to: process.env.RECEIVER_EMAIL,
                subject: `🚨 RVCP Lead: ${leadRecord.formType} — ${leadRecord.name}`,
                html: emailHtml
            };
            await transporter.sendMail(mailOptions);
            console.log('Lead notification email dispatched successfully.');
        }

        res.status(200).json({ success: true, message: 'Lead recorded and dispatched.', lead: leadRecord });
    } catch (error) {
        console.error('Error handling lead submission:', error);
        res.status(200).json({ success: true, message: 'Lead stored locally.', error: error.message });
    }
}

// ─── API Routes ────────────────────────────────────────────────

// Telemetry ingestion
app.post('/api/telemetry/interaction', logInteraction);
app.post('/api/telemetry/event', logInteraction);

// Dashboard endpoints with Database Key Normalization (matches WordPress format)
app.get('/api/dashboard/leads', (req, res) => {
    res.json(inMemoryLeads);
});

app.get('/api/leads-data', (req, res) => {
    res.json(inMemoryLeads);
});

app.get('/api/dashboard/interactions', (req, res) => {
    res.json(inMemoryInteractions);
});

app.get('/api/dashboard/sessions', (req, res) => {
    const list = Object.values(inMemorySessions).sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
    res.json(list);
});

app.get('/api/dashboard/analytics', (req, res) => {
    const totalLeads = inMemoryLeads.length;
    const sessionList = Object.values(inMemorySessions);
    const totalSessions = Math.max(sessionList.length, totalLeads);
    const conversionRate = totalSessions > 0 ? ((totalLeads / totalSessions) * 100).toFixed(1) : '0.0';

    // Count by form type
    const formTypeCounts = {};
    inMemoryLeads.forEach(l => {
        const type = l.formType || 'Other';
        formTypeCounts[type] = (formTypeCounts[type] || 0) + 1;
    });

    // Count by programme
    const programmeCounts = {
        'BPT': inMemoryLeads.filter(l => (l.programme || '').includes('BPT') || (l.programme || '').includes('Bachelor')).length,
        'MPT': inMemoryLeads.filter(l => (l.programme || '').includes('MPT') || (l.programme || '').includes('Master')).length
    };

    // Unmatched intents
    const unmatchedQueries = inMemoryInteractions
        .filter(i => i.eventType === 'unmatched_query')
        .map(i => ({ query: i.data && i.data.text ? i.data.text : '', timestamp: i.timestamp }));

    res.json({
        totalSessions,
        totalLeads,
        totalInteractions: inMemoryInteractions.length,
        conversionRate: `${conversionRate}%`,
        formTypeCounts,
        programmeCounts,
        unmatchedQueries
    });
});

// Setup endpoint to seed institute credentials (per dual-write specification)
app.post('/api/setup', (req, res) => {
    const defaultInstitute = {
        instituteId: 'RVCP_INSTITUTE_01',
        name: 'RV College of Physiotherapy',
        slug: 'rvcp',
        apiKey: 'rvcp_key_' + Math.random().toString(36).substring(2, 14),
        status: 'active',
        createdAt: new Date().toISOString()
    };
    writeDataFile('institute_setup.json', defaultInstitute);
    res.json({ success: true, message: 'RVCP Institute profile seeded successfully.', institute: defaultInstitute });
});

// Health status check
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        institute: 'RV College of Physiotherapy (RVCP)',
        leadsCount: inMemoryLeads.length,
        interactionsCount: inMemoryInteractions.length,
        sessionsCount: Object.keys(inMemorySessions).length,
        emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    });
});

// Lead post endpoints
app.post('/send-fee-enquiry', sendLeadEmail);
app.post('/send-scholarship', sendLeadEmail);
app.post('/send-campus-visit', sendLeadEmail);
app.post('/send-counsellor', sendLeadEmail);
app.post('/send-book-counselling', sendLeadEmail);
app.post('/send-lead', sendLeadEmail);

// Fallback for unhandled POST requests
app.use((req, res, next) => {
    if (req.method === 'POST') {
        return sendLeadEmail(req, res);
    }
    next();
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`RVCP Backend & Telemetry Server running on http://localhost:${PORT}`);
        console.log(`Dashboard accessible at http://localhost:${PORT}/dashboard`);
    });
}

module.exports = app;
