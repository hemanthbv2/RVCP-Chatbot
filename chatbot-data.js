/**
 * RVCP Chatbot — Knowledge Base & Conversation Flow Data
 * Source: rvcp.edu.in + Official Prospectus & NCAHP Guidelines
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * GOOGLE SHEETS INTEGRATION
 * ═══════════════════════════════════════════════════════════════
 * Set your deployed Google Apps Script URL here or in WP admin settings.
 * If left empty, form data will be sent to the backend API.
 * ═══════════════════════════════════════════════════════════════
 */
const GOOGLE_SHEETS_URL = (window.rvcpChatbotSettings && window.rvcpChatbotSettings.googleSheetsUrl)
  ? window.rvcpChatbotSettings.googleSheetsUrl
  : '';

const RVCP_DATA = {

  // ─── College Info ────────────────────────────────────────────
  college: {
    name: "RV College of Physiotherapy",
    shortName: "RVCP",
    established: 2003,
    trust: "Rashtreeya Sikshana Samithi Trust (RSST) / RV Educational Institutions (RVEI)",
    affiliation: "Rajiv Gandhi University of Health Sciences (RGUHS), Karnataka",
    recognitions: [
      "Government of Karnataka",
      "Rajiv Gandhi University of Health Sciences (RGUHS)",
      "National Commission for Allied and Healthcare Professions (NCAHP) Aligned"
    ],
    address: `<a href="https://www.google.com/maps/search/?api=1&query=RV+College+of+Physiotherapy+Jayanagar+Bengaluru" target="_blank" style="color: #6F4D41; font-weight: 600; text-decoration: underline;">No. CA 2/83-3, 9th Main Rd, 4th Block, Jayanagar, Bengaluru, Karnataka 560011 📍</a>`,
    location: "Jayanagar 4th Block, Bengaluru",
    locationHighlight: "Minute's walk from Jayanagar bus terminus, easy metro access 🚇",
    website: "https://www.rvcp.edu.in/",
    admissionPortal: "https://wds-prd.rvei.edu.in:4430/sap/bc/ui5_ui5/sap/zrvihlthscience/index.html#/Scode/RVCP",
    fioriPortal: "https://wds-prd.rvei.edu.in:4430/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=RV+College+of+Physiotherapy+Jayanagar+Bengaluru",
    phone: {
      office: "080-68917151",
      line2: "080-68917152",
      line3: "080-68917153"
    },
    email: "rvcp@rvei.edu.in",
    social: {
      facebook: "https://www.facebook.com/RVCPhysiotherapy/",
      twitter: "https://twitter.com/RVPhysiotherapy",
      instagram: "https://www.instagram.com/rvphysiotherapy/",
      linkedin: "https://www.linkedin.com/school/rvcphysiotherapy/"
    },
    leadership: {
      president: { name: "Dr. M.P. Shyam", role: "President, RSST / RVEI" },
      secretary: { name: "Dr. (h.c.) A.V.S. Murthy", role: "Hon. Secretary, RSST / RVEI" },
      jointSecretary: { name: "Mr. D.P. Nagaraj", role: "Hon. Joint Secretary, RSST / RVEI" },
      principal: { name: "Dr. Pruthviraj R (PT)", role: "Professor & Principal, RVCP; Dean of Faculty in Physiotherapy & Allied Health Sciences, RGUHS" }
    }
  },

  // ─── Programmes ──────────────────────────────────────────────
  programmes: {
    bpt: {
      name: "Bachelor of Physiotherapy (BPT)",
      shortName: "BPT",
      duration: "4.5 Years (4 Years Academic + 6 Months Compulsory Rotatory Clinical Internship)",
      type: "Undergraduate Professional Degree",
      tagline: "Premier Physiotherapy Degree with Extensive Hospital Rotations & Clinical Mastery",
      description: "The Bachelor of Physiotherapy (BPT) programme at RVCP is a premier choice for aspiring physiotherapists seeking a transformative education. This 4.5-year programme integrates theoretical mastery in Anatomy, Physiology, and Biomechanics with practical clinical training, clinical observation, hospital postings, and a 6-month compulsory rotatory internship. Renowned faculty emphasise critical thinking, evidence-based practice, and compassionate patient care.",
      aims: [
        "Develop thorough knowledge of human body structure, biomechanics, and pathological processes.",
        "Demonstrate proficiency in advanced physiotherapeutic assessment, electrotherapy, exercise therapy, and manual techniques.",
        "Provide evidence-based rehabilitation for orthopaedic, neurological, sports, paediatric, and cardiopulmonary conditions.",
        "Train leaders and ethical healthcare practitioners with strong clinical reasoning."
      ],
      eligibility: {
        education: "Pass in 10+2 / Pre-University Examination (PUC) or approved equivalent examination.",
        subjects: "Physics, Chemistry, and Biology (PCB) with English.",
        marks: "Minimum 40% aggregate marks in PCB (relaxed to 35% for SC/ST candidates). As per NCAHP guidelines: minimum 50% in aggregate PCB, appeared in NEET.",
        age: "At least 17 years of age as on the date of admission.",
        foreign: "Equivalent qualification determined by AIU / NCAHP Equivalence Committee."
      },
      documentsRequired: [
        "10th Standard Marks Card (Original + 2 Xerox)",
        "12th / PUC Marks Card (Original + 2 Xerox)",
        "Aadhaar Card (Xerox)",
        "Transfer Certificate (TC) or Migration Certificate (Original)",
        "Recent Applicant Passport Photographs (35 x 45 mm, max 20 KB)",
        "Eligibility Certificate from RGUHS (for CBSE, ICSE, and out-of-Karnataka students)"
      ],
      scholarships: [
        { tier: "Merit Tier 1", amount: "₹2,00,000", criteria: "PCB (Physics, Chemistry, Biology) score > 75%" },
        { tier: "Merit Tier 2", amount: "₹1,00,000", criteria: "PCB score between 60% and 75%" }
      ],
      commencement: "Typically mid-September as per RGUHS Academic Calendar.",
      careerPaths: [
        "Consultant Physiotherapist in Multi-Speciality / Super-Speciality Hospitals",
        "Sports Physiotherapist for National / State Teams, Leagues & Academies",
        "Neuro-Rehabilitation & Stroke Specialist",
        "Orthopaedic & Musculoskeletal Specialist",
        "Paediatric & Child Development Therapist",
        "Cardiopulmonary & ICU / Critical Care Physiotherapist",
        "Ergonomic & Occupational Health Specialist in Corporate IT Hubs",
        "Private Clinical Practice / Rehabilitation Centre Director",
        "Global Licensure & Careers (USA, UK, Canada, Australia, Gulf countries)",
        "Higher Studies (MPT / Ph.D. / Fellowship)"
      ],
      link: "https://www.rvcp.edu.in/academics/programme/bachelor_of_physiotherapy/"
    },

    mpt: {
      name: "Master of Physiotherapy (MPT)",
      shortName: "MPT",
      duration: "2 Years (4 Semesters)",
      type: "Postgraduate Degree",
      tagline: "Advanced Specialisations in Clinical Practice, Research & Academic Leadership",
      description: "The two-year Master of Physiotherapy (MPT) programme at RVCP equips students with evidence-based practices, advanced clinical diagnostic skills, research methodologies, and clinical teaching. By integrating intensive hospital postings with cutting-edge academic theory, MPT graduates excel as specialised consultants, educators, hospital administrators, and researchers.",
      specializations: [
        { name: "Musculoskeletal Sciences", hod: "Dr. Paul Daniel V.K (PT), Professor & HOD", focus: "Orthopaedic conditions, spine rehab, joint replacements, manual therapy & shoulder clinic." },
        { name: "Sports Sciences", hod: "Dr. Stephiya Davis (PT), Lecturer & Clinical In-Charge", focus: "Athletic performance, biomechanical screening, acute sports injuries, return-to-sport testing." },
        { name: "Neurological Sciences", hod: "Dr. Trapthi Kamath (PT), Assistant Professor", focus: "Stroke rehabilitation, spinal cord injuries, Parkinson's, traumatic brain injuries, neuro-plasticity." },
        { name: "Paediatrics", hod: "Dr. Pallavi Wajapey (PT), Assistant Professor & HOD", focus: "Cerebral palsy, developmental delays, neonatal ICU physiotherapy, high-risk infant follow-up." },
        { name: "Community Health", hod: "Dr. Sukrutha N (PT), Lecturer", focus: "Geriatric care, women's health, ergonomic screenings, community-based inclusive rehabilitation." },
        { name: "Cardiovascular and Pulmonary Sciences", hod: "Dr. Dokka Mani Chandrika (PT), Lecturer", focus: "Cardiac rehab, pulmonary hygiene, ICU / post-surgical acute care, COPD management." }
      ],
      eligibility: {
        education: "Bachelor of Physiotherapy (BPT) from any UGC / RGUHS recognized university.",
        mode: "Full-time BPT only (distance/correspondence degrees are strictly ineligible).",
        internship: "Completed 6 months compulsory rotatory internship.",
        registration: "Registered with State Physiotherapy Council / relevant authority."
      },
      documentsRequired: [
        "10th & 12th Marks Cards (Original)",
        "BPT All 4 Years Marks Cards (Original)",
        "Internship Completion Certificate (Original)",
        "PDC (Provisional Degree Certificate) and ODC (Original Degree Certificate)",
        "Transfer Certificate (TC) or Migration Certificate (Original)",
        "Aadhaar Card (Xerox)",
        "RGUHS Eligibility Certificate (if BPT was completed outside RGUHS)"
      ],
      commencement: "Scheduled around mid-September as per RGUHS Academic Calendar.",
      careerPaths: [
        "Super-Speciality Consultant Physiotherapist",
        "Assistant Professor / Associate Professor / HOD in Top Colleges",
        "Head of Department in Corporate Hospitals & Rehab Centers",
        "Lead Sports Physiotherapist for Olympic & National Athletes",
        "Clinical Research Scientist & Ph.D. Scholar",
        "International Practice with Global Equivalency Certification"
      ],
      link: "https://www.rvcp.edu.in/academics/programme/masters-of-physiotherapy/"
    }
  },

  // ─── Departments & Key Faculty ───────────────────────────────
  departments: [
    { name: "Musculoskeletal Physiotherapy", hod: "Dr. Paul Daniel V.K (PT), Professor & HOD", faculty: "Dr. Archana P, Dr. Anusha V Shenai" },
    { name: "Paediatric Physiotherapy", hod: "Dr. Pallavi Wajapey (PT), Asst. Professor & HOD", faculty: "Dr. Akshata Nadgir" },
    { name: "Neurological Physiotherapy", hod: "Dr. Trapthi Kamath (PT), Assistant Professor", faculty: "Dr. Mallika H Pandith" },
    { name: "Sports Physiotherapy", hod: "Dr. Stephiya Davis (PT), Lecturer & Clinical In-Charge", faculty: "Dr. Bilva Prasad B L" },
    { name: "Community Health Physiotherapy", hod: "Dr. Sukrutha N (PT), Lecturer", faculty: "Dr. Suchitha S Rao" },
    { name: "Cardiovascular & Pulmonary Physiotherapy", hod: "Dr. Dokka Mani Chandrika (PT), Lecturer", faculty: "Dr. Tejuvarshini V" }
  ],

  // ─── Clinical Services ───────────────────────────────────────
  clinicalServices: {
    opd: "Speciality Physiotherapy OPD equipped with advanced electrotherapy, manual therapy, and therapeutic exercise suites.",
    eveningClinic: "Evening Speciality Clinic providing high-quality, subsidized physiotherapy treatment to the community, giving PG students intensive clinical case handling.",
    subSpecialities: [
      "Shoulder Speciality Clinic",
      "Spine & Postural Rehabilitation",
      "Neuro-Developmental & Stroke Rehabilitation",
      "High-Risk Infant & Paediatric Early Intervention Clinic",
      "Cardiopulmonary Fitness & Post-COVID Pulmonary Rehab",
      "Sports Injury & Movement Analysis Clinic"
    ],
    hospitalAffiliations: "Clinical training and inpatient hospital postings conducted across premier multi-speciality partner hospitals including Aster RV Hospital and other RGUHS-affiliated super-speciality centres."
  },

  // ─── Scholarships ────────────────────────────────────────────
  scholarships: [
    {
      name: "BPT Academic Merit Scholarship — Tier 1",
      amount: "₹2,00,000",
      description: "Awarded to students with aggregate Physics, Chemistry, Biology (PCB) score above 75% in 12th/PUC."
    },
    {
      name: "BPT Academic Merit Scholarship — Tier 2",
      amount: "₹1,00,000",
      description: "Awarded to students with aggregate PCB score between 60% and 75% in 12th/PUC."
    },
    {
      name: "RSST / RV Institutional Scholarships",
      description: "Provided by Rashtreeya Sikshana Samithi Trust for deserving candidates based on merit and financial background."
    },
    {
      name: "Government & National Scholarships",
      description: "State & central government welfare scholarships (SSP, NSP, E-pass) supported with full administrative assistance."
    }
  ],

  // ─── Campus Visit Slots ──────────────────────────────────────
  campusVisitSlots: [
    "10:30 AM",
    "12:00 PM",
    "3:00 PM"
  ],

  // ─── Hostel Details ──────────────────────────────────────────
  hostel: {
    fees: [
      { type: "2 sharing", amount: "₹ 48,300" },
      { type: "3 sharing", amount: "₹ 47,250" },
      { type: "4 sharing", amount: "₹ 46,200" },
      { type: "Dormitory", amount: "₹ 36,750" },
      { type: "Guest Room", amount: "₹ 525/- per day (Inclusive of GST)" }
    ],
    cautionDeposit: "₹ 5,000 one-time (Refundable upon course completion or vacating)",
    messFee: "₹ 52,800 per year (Two instalments of ₹ 26,400 per six months)"
  },

  // ─── About Text ──────────────────────────────────────────────
  about: {
    welcome: "RV College of Physiotherapy (RVCP) was established in 2003 under the aegis of the prestigious Rashtreeya Sikshana Samithi Trust (RSST, founded 1940). Affiliated to Rajiv Gandhi University of Health Sciences (RGUHS), RVCP is one of Karnataka's foremost physiotherapy institutions. Located in Jayanagar 4th Block, Bengaluru, the college offers cutting-edge laboratory infrastructure, an active outpatient department (OPD), and extensive clinical affiliations with top multi-speciality hospitals.",
    whyUs: "With over two decades of academic excellence, experienced faculty headed by Dean of Faculty (RGUHS) Dr. Pruthviraj R, hands-on hospital rotations, generous merit scholarships up to ₹2 Lakhs, and robust career placement support, RVCP provides the gold standard in physical therapy education."
  }
};

// ─── Conversation Flow Definitions ─────────────────────────────
const CHAT_FLOWS = {

  // Welcome / Root flow
  welcome: {
    messages: [
      { text: `Hello! 👋 Welcome to <strong>RV College of Physiotherapy (RVCP)</strong>, Bengaluru.\n\n🎓 <strong>Admissions Open 2026–2027</strong> | RGUHS Affiliated\n💰 Merit Scholarships up to <strong>₹2,00,000</strong>!\n\nHow can we help you today? Please choose an option below:`, delay: 350 }
    ],
    buttons: [
      { label: "🎓 BPT (Bachelor of Physiotherapy)", action: "bpt_main" },
      { label: "📚 MPT (Master of Physiotherapy)", action: "mpt_main" },
      { label: "💰 Scholarships (Up to ₹2L)", action: "scholarships" },
      { label: "🏥 Clinical Services & OPD", action: "clinical_services" },
      { label: "🏠 Hostel & Fees", action: "hostel_details" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "ℹ️ About RVCP", action: "about" },
      { label: "📞 Contact Us", action: "contact" }
    ]
  },

  // ─── BPT Flow ────────────────────────────────────────────────
  bpt_main: {
    messages: [
      { text: `<strong>🎓 Bachelor of Physiotherapy (BPT) — 4.5 Years</strong>\n\n⏱️ <strong>Duration:</strong> 4 Years + 6 Months Internship\n🏛️ <strong>Affiliation:</strong> RGUHS | Jayanagar 4th Block, Bengaluru\n💰 <strong>Scholarships:</strong> Up to ₹2 Lakh for PCB merit students\n🏥 <strong>Clinical Posting:</strong> Speciality OPD & Top Hospitals\n\nWhat would you like to explore?`, delay: 350 }
    ],
    buttons: [
      { label: "📋 Eligibility Criteria", action: "bpt_eligibility" },
      { label: "💰 Fee & Scholarship Enquiry", action: "fee_enquiry_bpt" },
      { label: "📈 Career Opportunities", action: "bpt_career" },
      { label: "📑 Documents Required", action: "bpt_documents" },
      { label: "📞 Talk to Counsellor", action: "talk_to_counsellor" },
      { label: "← Back to Main Menu", action: "welcome" }
    ]
  },

  bpt_eligibility: {
    messages: [
      { text: `<strong>📋 BPT — Eligibility Criteria</strong>\n\n✅ <strong>Qualification:</strong> Pass in 10+2 / PUC with Physics, Chemistry & Biology (PCB) with English.\n✅ <strong>Minimum Marks:</strong>\n• General: <strong>40% aggregate</strong> in PCB\n• SC / ST: <strong>35% aggregate</strong> in PCB\n• NCAHP guideline: 50% aggregate + NEET appearance\n✅ <strong>Age:</strong> Minimum <strong>17 years</strong> as on admission date.`, delay: 350 }
    ],
    buttons: [
      { label: "💰 Fee & Scholarship Enquiry", action: "fee_enquiry_bpt" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "📑 Documents Required", action: "bpt_documents" },
      { label: "← Back to BPT", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  bpt_career: {
    messages: [
      { text: `<strong>📈 Career Scope after BPT</strong>\n\n• <strong>High Demand Roles:</strong> Hospitals & ICUs, Sports Physiotherapist (IPL/National squads), Stroke & Spine Rehab, Paediatric Clinics, Corporate Ergonomics & Private Practice.\n• <strong>Global Opportunities:</strong> USA, UK, Canada, Australia & Gulf.\n• <strong>Starting Packages:</strong> ₹4.5 LPA – ₹9 LPA (₹15+ LPA for specialists).`, delay: 350 }
    ],
    buttons: [
      { label: "📞 Request Counsellor Callback", action: "talk_to_counsellor" },
      { label: "💰 Fee Structure Enquiry", action: "fee_enquiry_bpt" },
      { label: "← Back to BPT", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  bpt_documents: {
    messages: [
      { text: `<strong>📑 Documents Required for BPT Admission</strong>\n\n1. 10th & 12th / PUC Marks Cards (Original + 2 copies)\n2. Aadhaar Card (Copy)\n3. Transfer Certificate (TC) or Migration Certificate (Original)\n4. Passport size photos (35 x 45 mm)\n5. RGUHS Eligibility Certificate (for CBSE, ICSE, or outside Karnataka)\n\n📅 <strong>Batch Commencement:</strong> Mid-September (RGUHS Calendar).`, delay: 350 }
    ],
    buttons: [
      { label: "💰 Fee & Scholarship Enquiry", action: "fee_enquiry_bpt" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "← Back to BPT", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Fee Enquiry BPT ─────────────────────────────────────────
  fee_enquiry_bpt: {
    messages: [
      { text: `<strong>💰 BPT Fee & Scholarship Enquiry</strong>\n\nShare your details to receive official fee breakdowns and check eligibility for up to <strong>₹2 Lakh merit scholarship</strong>:`, delay: 350 }
    ],
    form: {
      id: "fee_enquiry",
      fields: [
        { name: "name", label: "Student Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit mobile number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true },
        { name: "percentage", label: "12th / PCB Percentage (%)", type: "number", placeholder: "e.g. 78", required: true },
        { name: "city", label: "Current City", type: "text", placeholder: "Your city", required: true }
      ],
      submitLabel: "Submit BPT Enquiry 📩",
      successMessage: `Thank you! ✅ Your BPT enquiry has been received. Our admissions counsellor will call you within <strong>30 minutes</strong> with fee details and scholarship eligibility.\n\n📞 Immediate Assistance: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Back to BPT", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── MPT Flow ────────────────────────────────────────────────
  mpt_main: {
    messages: [
      { text: `<strong>📚 Master of Physiotherapy (MPT) — 2 Years</strong>\n\n⏱️ <strong>Duration:</strong> 2 Years (4 Semesters) | Affiliated to RGUHS\n🔬 <strong>6 Premier Specialisations Offered</strong>\n🏥 <strong>Clinical Exposure:</strong> Speciality OPD, super-speciality hospital postings & research.\n\nPlease select what you would like to know:`, delay: 350 }
    ],
    buttons: [
      { label: "🔬 6 Specialisations Offered", action: "mpt_specializations" },
      { label: "📋 Eligibility Criteria", action: "mpt_eligibility" },
      { label: "💰 MPT Fee Enquiry", action: "fee_enquiry_mpt" },
      { label: "📑 Documents Required", action: "mpt_documents" },
      { label: "📞 Priority MPT Counselling", action: "book_counselling" },
      { label: "← Back to Main Menu", action: "welcome" }
    ]
  },

  mpt_specializations: {
    messages: [
      { text: `<strong>🔬 MPT — 6 Specialisations Offered at RVCP:</strong>\n\n1. <strong>Musculoskeletal Sciences:</strong> Orthopaedics, spine & joint replacement rehab\n2. <strong>Sports Sciences:</strong> Athletic assessment, biomechanics & sports conditioning\n3. <strong>Neurological Sciences:</strong> Stroke rehabilitation, NDT & spinal cord injury\n4. <strong>Paediatric Physiotherapy:</strong> Cerebral palsy, developmental delay & NICU\n5. <strong>Community Health:</strong> Geriatric wellness, women's health & ergonomics\n6. <strong>Cardiovascular & Pulmonary:</strong> Cardiac rehab & ICU ventilator care`, delay: 400 }
    ],
    buttons: [
      { label: "📋 Eligibility Criteria", action: "mpt_eligibility" },
      { label: "💰 MPT Fee Enquiry", action: "fee_enquiry_mpt" },
      { label: "📞 Book Counselling Session", action: "book_counselling" },
      { label: "← Back to MPT", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  mpt_eligibility: {
    messages: [
      { text: `<strong>📋 MPT — Eligibility Criteria</strong>\n\n✅ <strong>Qualification:</strong> Full-time BPT from a UGC / RGUHS recognized university.\n✅ <strong>Internship:</strong> Completed 6-month compulsory rotatory clinical internship.\n✅ <strong>Registration:</strong> Registered with State Physiotherapy Council.\n\n📅 <strong>Commencement:</strong> Mid-September (RGUHS).`, delay: 350 }
    ],
    buttons: [
      { label: "🔬 View Specialisations", action: "mpt_specializations" },
      { label: "💰 MPT Fee Enquiry", action: "fee_enquiry_mpt" },
      { label: "← Back to MPT", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  mpt_documents: {
    messages: [
      { text: `<strong>📑 Documents Required for MPT Admission:</strong>\n\n1. 10th & 12th Marks Cards (Original)\n2. BPT All 4-Year Marks Cards (Original)\n3. 6-Month Internship Completion Certificate\n4. PDC & Degree Certificate (ODC)\n5. Transfer / Migration Certificate & Aadhaar Card\n6. RGUHS Eligibility Certificate (if outside RGUHS)`, delay: 350 }
    ],
    buttons: [
      { label: "💰 MPT Fee Enquiry", action: "fee_enquiry_mpt" },
      { label: "📞 Book Priority Counselling", action: "book_counselling" },
      { label: "← Back to MPT", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  fee_enquiry_mpt: {
    messages: [
      { text: `<strong>💰 MPT Fee Enquiry</strong>\n\nShare your details to receive the MPT fee breakdown and specialisation quota availability:`, delay: 350 }
    ],
    form: {
      id: "fee_enquiry_msc",
      fields: [
        { name: "name", label: "Candidate Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit mobile number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true },
        { name: "specialization", label: "Preferred MPT Specialisation", type: "select", options: [
          "Musculoskeletal Sciences",
          "Sports Sciences",
          "Neurological Sciences",
          "Paediatrics",
          "Community Health",
          "Cardiovascular and Pulmonary Sciences"
        ], required: true },
        { name: "city", label: "Current City", type: "text", placeholder: "Your city", required: true }
      ],
      submitLabel: "Submit MPT Enquiry 📩",
      successMessage: `Thank you! ✅ Your MPT enquiry has been registered. Our postgraduate admissions counsellor will reach out within <strong>30 minutes</strong>.\n\n📞 Direct Desk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Back to MPT", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Scholarships Flow ──────────────────────────────────────
  scholarships: {
    messages: [
      { text: `<strong>⭐ Merit Scholarships at RVCP (Up to ₹2,00,000)</strong>\n\n🥇 <strong>₹2,00,000 (Tier 1):</strong> PCB score <strong>above 75%</strong> in 12th / PUC\n🥈 <strong>₹1,00,000 (Tier 2):</strong> PCB score between <strong>60% – 75%</strong> in 12th / PUC\n🏛️ <strong>RSST & Government Schemes:</strong> Deserving and welfare scholarships supported.\n\nWould you like guidance on applying?`, delay: 350 }
    ],
    buttons: [
      { label: "📝 Apply for Scholarship Guidance", action: "scholarship_apply" },
      { label: "🎓 BPT Programme Details", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  scholarship_apply: {
    messages: [
      { text: `<strong>📝 Scholarship Application Guidance</strong>\n\nPlease share your details so our scholarship cell can verify your eligibility and guide you through the process:`, delay: 350 }
    ],
    form: {
      id: "scholarship_apply",
      fields: [
        { name: "name", label: "Student Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit mobile number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true },
        { name: "programme", label: "Interested Programme", type: "select", options: ["Bachelor of Physiotherapy (BPT)", "Master of Physiotherapy (MPT)"], required: true }
      ],
      submitLabel: "Get Scholarship Guidance 📩",
      successMessage: `Thank you! ✅ Our scholarship coordinator will contact you shortly with eligibility confirmation and document submission steps.\n\n📞 Office: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Back to Scholarships", action: "scholarships" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Clinical Services Flow ──────────────────────────────────
  clinical_services: {
    messages: [
      { text: `<strong>🏥 Clinical Services & Training at RVCP</strong>\n\n• <strong>Speciality OPD:</strong> Full-fledged daily outpatient physiotherapy care.\n• <strong>Evening Speciality Clinic:</strong> Subsidized community care & PG clinical training.\n• <strong>Focus Clinics:</strong> Shoulder, Spine, Neuro-Rehab, Paediatrics & Sports Injury.\n• <strong>Hospital Tie-ups:</strong> Postings at Aster RV Hospital & top multi-speciality centres.`, delay: 350 }
    ],
    buttons: [
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "📞 Talk to Counsellor", action: "talk_to_counsellor" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Hostel Flow ───────────────────────────────────────────
  hostel_details: {
    messages: [
      { text: `<strong>🏠 RVCP Hostel Accommodation & Fees (Annual)</strong>\n\n• <strong>2 Sharing:</strong> ₹ 48,300\n• <strong>3 Sharing:</strong> ₹ 47,250\n• <strong>4 Sharing:</strong> ₹ 46,200\n• <strong>Dormitory:</strong> ₹ 36,750\n• <strong>Caution Deposit:</strong> ₹ 5,000 (Refundable)\n• <strong>Mess Charges:</strong> ₹ 52,800/yr (₹ 26,400 per 6 months)\n• <strong>Guest Room:</strong> ₹ 525/day (incl. GST)\n\nSafe campus housing in Jayanagar with Wi-Fi, 24/7 security & nutritious dining.`, delay: 350 }
    ],
    buttons: [
      { label: "🏫 Book Campus & Hostel Visit", action: "campus_visit" },
      { label: "📞 Talk to Counsellor", action: "talk_to_counsellor" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Campus Visit Flow ──────────────────────────────────────
  campus_visit: {
    messages: [
      { text: `<strong>🏫 Visit RVCP Campus</strong>\n\nTour our labs, Speciality OPD, and meet the faculty at Jayanagar 4th Block, Bengaluru.\n\nPlease select your preferred visit time:`, delay: 300 }
    ],
    buttons: [
      { label: "🕥 10:30 AM Slot", action: "campus_book_1030" },
      { label: "🕛 12:00 PM Slot", action: "campus_book_1200" },
      { label: "🕒 3:00 PM Slot", action: "campus_book_0300" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  campus_book_1030: {
    messages: [
      { text: `You selected the <strong>10:30 AM</strong> slot. ⏰\nPlease share your details to confirm your visit:`, delay: 300 }
    ],
    form: {
      id: "campus_visit_1030",
      fields: [
        { name: "name", label: "Your Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true }
      ],
      submitLabel: "Confirm 10:30 AM Visit ✅",
      successMessage: `🎉 <strong>Campus visit booked for 10:30 AM!</strong>\n\n📍 <strong>Address:</strong> ${RVCP_DATA.college.address}\n\nOur admission reception will call you to confirm arrival. See you at RVCP! 🏫\n\n📞 Helpdesk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  campus_book_1200: {
    messages: [
      { text: `You selected the <strong>12:00 PM</strong> slot. ⏰\nPlease share your details to confirm your visit:`, delay: 300 }
    ],
    form: {
      id: "campus_visit_1200",
      fields: [
        { name: "name", label: "Your Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true }
      ],
      submitLabel: "Confirm 12:00 PM Visit ✅",
      successMessage: `🎉 <strong>Campus visit booked for 12:00 PM!</strong>\n\n📍 <strong>Address:</strong> ${RVCP_DATA.college.address}\n\nOur admission reception will call you to confirm arrival. See you at RVCP! 🏫\n\n📞 Helpdesk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  campus_book_0300: {
    messages: [
      { text: `You selected the <strong>3:00 PM</strong> slot. ⏰\nPlease share your details to confirm your visit:`, delay: 300 }
    ],
    form: {
      id: "campus_visit_0300",
      fields: [
        { name: "name", label: "Your Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true }
      ],
      submitLabel: "Confirm 3:00 PM Visit ✅",
      successMessage: `🎉 <strong>Campus visit booked for 3:00 PM!</strong>\n\n📍 <strong>Address:</strong> ${RVCP_DATA.college.address}\n\nOur admission reception will call you to confirm arrival. See you at RVCP! 🏫\n\n📞 Helpdesk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Talk to Admission Counsellor ────────────────────────────
  talk_to_counsellor: {
    messages: [
      { text: `<strong>📞 RVCP Admission Counselling</strong>\n\nHave questions about cutoffs, fees, or hospital postings? Share your contact info and our counsellor will call you within <strong>30 minutes</strong>:`, delay: 350 }
    ],
    form: {
      id: "talk_to_counsellor",
      fields: [
        { name: "name", label: "Your Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit mobile number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true }
      ],
      submitLabel: "Request Callback 📞",
      successMessage: `Thank you! ✅ Your callback request is received. An RVCP counsellor will call you within <strong>30 minutes</strong>.\n\n📞 Immediate Desk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "🎓 BPT Programme", action: "bpt_main" },
      { label: "📚 MPT Programme", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Book Counselling Session (MPT) ──────────────────────────
  book_counselling: {
    messages: [
      { text: `<strong>📞 Priority MPT Counselling</strong>\n\nSchedule a 1-on-1 session with our academic heads for specialisation and clinical rotation guidance:`, delay: 350 }
    ],
    form: {
      id: "book_counselling",
      fields: [
        { name: "name", label: "Your Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter 10-digit number", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
        { name: "specialization", label: "Preferred Specialisation", type: "select", options: [
          "Musculoskeletal Sciences",
          "Sports Sciences",
          "Neurological Sciences",
          "Paediatrics",
          "Community Health",
          "Cardiovascular and Pulmonary Sciences"
        ], required: true }
      ],
      submitLabel: "Book Priority Session 📩",
      successMessage: `Thank you! ✅ Your priority MPT counselling session is booked. Our postgraduate coordinator will get in touch shortly.\n\n📞 Helpdesk: <strong>${RVCP_DATA.college.phone.office}</strong>`
    },
    buttons: [
      { label: "← Back to MPT", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── About RVCP ──────────────────────────────────────────────
  about: {
    messages: [
      { text: `<strong>ℹ️ About RV College of Physiotherapy (RVCP)</strong>\n\n• <strong>Established:</strong> 2003 under RSST (Est. 1940)\n• <strong>Affiliation:</strong> RGUHS | Recognised by Govt of Karnataka & NCAHP aligned\n• <strong>Principal:</strong> Dr. Pruthviraj R (PT), Dean at RGUHS\n• <strong>Location:</strong> Jayanagar 4th Block, Bengaluru\n• <strong>Highlights:</strong> 20+ years of excellence, in-house Speciality OPD, top hospital postings & scholarships up to ₹2L.\n\n🌐 <a href="${RVCP_DATA.college.website}" target="_blank">Visit rvcp.edu.in</a>`, delay: 350 }
    ],
    buttons: [
      { label: "🎓 BPT Programme", action: "bpt_main" },
      { label: "📚 MPT Programme", action: "mpt_main" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "📞 Contact Us", action: "contact" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  // ─── Contact ─────────────────────────────────────────────────
  contact: {
    messages: [
      { text: `<strong>📞 Contact RV College of Physiotherapy</strong>\n\n📍 <strong>Address:</strong> ${RVCP_DATA.college.address}\n📞 <strong>Phone:</strong> <a href="tel:${RVCP_DATA.college.phone.office}">${RVCP_DATA.college.phone.office}</a> / <a href="tel:${RVCP_DATA.college.phone.line2}">${RVCP_DATA.college.phone.line2}</a>\n✉️ <strong>Email:</strong> <a href="mailto:${RVCP_DATA.college.email}">${RVCP_DATA.college.email}</a>\n🌐 <strong>Website:</strong> <a href="${RVCP_DATA.college.website}" target="_blank">rvcp.edu.in</a>`, delay: 350 }
    ],
    buttons: [
      { label: "🏢 Faculty & HOD Directory", action: "dept_contacts" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },

  dept_contacts: {
    messages: [
      { text: `<strong>🏢 Departments & HODs at RVCP:</strong>\n\n• <strong>Musculoskeletal:</strong> Dr. Paul Daniel V.K (PT), Prof & HOD\n• <strong>Sports Sciences:</strong> Dr. Stephiya Davis (PT), Lecturer & In-Charge\n• <strong>Neurological:</strong> Dr. Trapthi Kamath (PT), Asst Prof\n• <strong>Paediatrics:</strong> Dr. Pallavi Wajapey (PT), Asst Prof & HOD\n• <strong>Community Health:</strong> Dr. Sukrutha N (PT), Lecturer\n• <strong>Cardio-Pulmonary:</strong> Dr. Dokka Mani Chandrika (PT), Lecturer`, delay: 350 }
    ],
    buttons: [
      { label: "📞 General Contact", action: "contact" },
      { label: "← Main Menu", action: "welcome" }
    ]
  }
};

// ─── Direct Knowledge & FAQ Engine ─────────────────────────────
const FAQ_KNOWLEDGE = [
  {
    id: "faq_location",
    patterns: ["where is", "location", "locate", "located", "address", "how to reach", "directions", "landmark", "nearest metro", "bus stop", "jayanagar 4th block"],
    answer: `📍 <strong>RVCP Location:</strong>\n\n${RVCP_DATA.college.address}\n\n🚇 1-minute walk from Jayanagar bus terminus & metro station!`,
    actionButtons: [
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "📞 Contact Us", action: "contact" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_neet_eligibility",
    patterns: ["neet", "is neet required", "is neet compulsory", "neet mandatory", "entrance exam", "kcet", "cutoff", "cut off", "pcb marks", "minimum percentage"],
    answer: `📝 <strong>BPT Eligibility & NEET:</strong>\n\n• <strong>10+2 / PUC:</strong> Physics, Chemistry, Biology & English\n• <strong>Marks:</strong> Min 40% aggregate in PCB (35% for SC/ST; NCAHP: 50% + NEET)\n• <strong>Age:</strong> 17+ years | <strong>Scholarships up to ₹2 Lakhs</strong> for PCB merit!`,
    actionButtons: [
      { label: "📋 Full BPT Eligibility", action: "bpt_eligibility" },
      { label: "💰 Scholarship Details", action: "scholarships" },
      { label: "💰 Fee & Scholarship Enquiry", action: "fee_enquiry_bpt" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_fees",
    patterns: ["fee structure", "how much is fee", "course fee", "annual fee", "tuition fee", "cost of bpt", "cost of mpt", "package", "donation", "management quota fee"],
    answer: `💰 <strong>RVCP Fee Structure:</strong>\n\nFees adhere to Govt of Karnataka & RGUHS norms. Merit scholarships up to <strong>₹2 Lakhs</strong> are available for PCB achievers.\n\nPlease select a programme below for a customized fee breakdown:`,
    actionButtons: [
      { label: "🎓 BPT Fee Enquiry", action: "fee_enquiry_bpt" },
      { label: "📚 MPT Fee Enquiry", action: "fee_enquiry_mpt" },
      { label: "💰 Scholarship Slabs", action: "scholarships" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_career_placements",
    patterns: ["job", "jobs", "career", "salary", "placement", "placements", "recruiters", "scope", "future", "opportunities", "hospital jobs", "average salary"],
    answer: `💼 <strong>Career Scope & Placements:</strong>\n\n• <strong>Packages:</strong> ₹4.5 LPA – ₹9 LPA (up to ₹15+ LPA for senior specialists)\n• <strong>Roles:</strong> Hospitals, Sports Teams, Stroke/Spine Rehab, Corporate Ergonomics & Private Clinics\n• <strong>Clinical Postings:</strong> Hands-on training at Aster RV and partner super-speciality hospitals.`,
    actionButtons: [
      { label: "📈 BPT Career Paths", action: "bpt_career" },
      { label: "🏥 Clinical OPD & Postings", action: "clinical_services" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_timings",
    patterns: ["timing", "timings", "working hours", "college hours", "open hours", "operating hours", "schedule", "class time"],
    answer: `⏰ <strong>College & OPD Timings:</strong>\n\n• <strong>Academic Classes:</strong> 9:00 AM – 4:30 PM (Mon–Sat)\n• <strong>Speciality OPD:</strong> 9:00 AM – 4:00 PM\n• <strong>Evening Clinic:</strong> 4:30 PM – 7:00 PM\n• <strong>Sunday:</strong> Closed`,
    actionButtons: [
      { label: "🏥 Clinical Services & OPD", action: "clinical_services" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_duration",
    patterns: ["duration", "how many years", "how long", "course duration", "how long is bpt", "how long is mpt", "semesters"],
    answer: `⏱️ <strong>Programme Durations:</strong>\n\n• <strong>BPT:</strong> <strong>4.5 Years</strong> (4 Years academic + 6 Months rotatory clinical internship)\n• <strong>MPT:</strong> <strong>2 Years</strong> (4 Semesters) full-time PG specialisation`,
    actionButtons: [
      { label: "🎓 Explore BPT (4.5 Yrs)", action: "bpt_main" },
      { label: "📚 Explore MPT (2 Yrs)", action: "mpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_leadership",
    patterns: [
      "principal", "princi", "princie", "princii", "princ", "princpal", "princple", "principle", "principals",
      "principal sir", "dean", "dean sir", "who is principal", "who is the principal", "pruthviraj", "dr pruthviraj",
      "dr. pruthviraj", "management", "trustees", "president", "shyam", "nagaraj", "avs murthy", "head of college",
      "head of institution", "director", "leadership", "who is head", "who is the head"
    ],
    answer: `👨‍🏫 <strong>RVCP Leadership:</strong>\n\n• <strong>Principal:</strong> <strong>Dr. Pruthviraj R (PT)</strong> — Principal, RVCP & Dean of Faculty at RGUHS\n• <strong>President, RSST:</strong> Dr. M.P. Shyam\n• <strong>Hon. Secretary:</strong> Dr. (h.c.) A.V.S. Murthy\n• <strong>Hon. Joint Secretary:</strong> Mr. D.P. Nagaraj`,
    actionButtons: [
      { label: "🏢 Faculty & HOD Directory", action: "dept_contacts" },
      { label: "ℹ️ About RVCP & RSST", action: "about" },
      { label: "📞 Contact College Office", action: "contact" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_hostel",
    patterns: ["hostel", "mess", "food", "stay", "accommodation", "room", "rooms", "sharing", "dormitory", "hostel fee", "mess fee", "curfew", "boys hostel", "girls hostel"],
    answer: `🏠 <strong>Hostel & Mess Details (Annual):</strong>\n\n• <strong>Sharing:</strong> 2-sharing (₹48,300) | 3-sharing (₹47,250) | 4-sharing (₹46,200) | Dorm (₹36,750)\n• <strong>Mess:</strong> ₹52,800/yr (₹26,400 per 6 months)\n• <strong>Caution Deposit:</strong> ₹5,000 (Refundable)\n• Safe campus living in Jayanagar with 24/7 security & Wi-Fi.`,
    actionButtons: [
      { label: "🏠 Full Hostel Details", action: "hostel_details" },
      { label: "🏫 Book Campus Visit", action: "campus_visit" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_affiliation",
    patterns: ["affiliated", "affiliation", "university", "recognition", "recognised", "rguhs", "ncahp", "government", "accreditation", "validity"],
    answer: `🏛️ <strong>Affiliation & Approvals:</strong>\n\n• Affiliated to <strong>Rajiv Gandhi University of Health Sciences (RGUHS)</strong>\n• Recognised by <strong>Govt of Karnataka</strong> & aligned with <strong>NCAHP</strong>\n• Backed by the 80+ year legacy of <strong>RSST</strong> (est. 1940)`,
    actionButtons: [
      { label: "ℹ️ About RVCP", action: "about" },
      { label: "🎓 BPT Programme", action: "bpt_main" },
      { label: "← Main Menu", action: "welcome" }
    ]
  },
  {
    id: "faq_apply",
    patterns: ["how to apply", "application process", "apply online", "admission portal", "registration form", "sap portal", "apply for bpt", "apply for mpt"],
    answer: `📝 <strong>How to Apply (2026–2027):</strong>\n\n1. Apply online via the <strong>RVEI SAP Admission Portal</strong>\n2. Or share your details right here to receive immediate admission guidance!`,
    actionButtons: [
      { label: "💰 BPT Application & Fee", action: "fee_enquiry_bpt" },
      { label: "📚 MPT Application", action: "fee_enquiry_mpt" },
      { label: "📞 Request Callback", action: "talk_to_counsellor" }
    ]
  }
];

// ─── Intent Matching Keywords & Priority Rules ────────────────
const INTENT_MAP = [
  // Compound Specific Intents (Highest Priority)
  { keywords: ["mpt fee", "mpt fees", "mpt tuition", "mpt cost", "how much is mpt", "fees for mpt", "mpt fee structure", "masters fee"], action: "fee_enquiry_mpt", weight: 40 },
  { keywords: ["bpt fee", "bpt fees", "bpt tuition", "bpt cost", "how much is bpt", "fees for bpt", "bpt fee structure", "bachelor fee", "ug fee", "fee structure", "tuition fee", "cost of study", "fee enquiry"], action: "fee_enquiry_bpt", weight: 35 },
  { keywords: ["mpt eligibility", "eligibility for mpt", "who can apply for mpt", "mpt qualification", "bpt required for mpt", "mpt criteria", "internship completion"], action: "mpt_eligibility", weight: 35 },
  { keywords: ["bpt eligibility", "eligibility for bpt", "who can apply for bpt", "pcb marks", "pcb cutoff", "12th percentage", "puc marks", "neet requirement", "neet mandatory", "minimum marks", "ncahp criteria", "eligibility criteria", "age limit"], action: "bpt_eligibility", weight: 35 },
  { keywords: ["mpt documents", "documents for mpt", "mpt certificates", "pdc", "odc", "degree certificate", "provisional degree"], action: "mpt_documents", weight: 35 },
  { keywords: ["bpt documents", "documents for bpt", "documents required", "documents needed", "documents for admission", "docs needed", "marks cards", "transfer certificate", "migration certificate", "aadhaar", "certificates needed", "documents list"], action: "bpt_documents", weight: 32 },
  { keywords: ["mpt specialization", "mpt specialisations", "specializations in mpt", "sports physio", "neurological physiotherapy", "neuro physiotherapy", "musculoskeletal", "pediatric physiotherapy", "cardiopulmonary", "community health"], action: "mpt_specializations", weight: 35 },
  { keywords: ["bpt career", "career opportunities", "job scope", "placements", "recruiters", "salary", "job opportunities", "career after bpt", "scope of bpt", "jobs after physiotherapy"], action: "bpt_career", weight: 35 },
  { keywords: ["scholarship application", "apply scholarship", "claim scholarship", "how to get scholarship"], action: "scholarship_apply", weight: 35 },
  { keywords: ["hostel fee", "mess fee", "room charges", "hostel charges", "sharing cost", "dormitory fee"], action: "hostel_details", weight: 35 },
  { keywords: ["book visit", "book campus tour", "schedule visit", "visit college", "see campus"], action: "campus_visit", weight: 35 },

  // Focused Topic Intents (Medium-High Priority)
  { keywords: ["scholarship", "scholarships", "financial aid", "fee waiver", "2 lakh", "1 lakh", "merit scholarship", "concession"], action: "scholarships", weight: 28 },
  { keywords: ["clinical", "opd", "clinic", "evening clinic", "hospital posting", "aster rv", "patient care", "practical training", "shoulder clinic", "spine clinic"], action: "clinical_services", weight: 28 },
  { keywords: ["hostel", "accommodation", "stay", "room", "rooms", "mess", "food", "dormitory", "sharing", "guest room", "caution deposit"], action: "hostel_details", weight: 28 },
  { keywords: ["campus", "visit", "tour", "location", "address", "directions", "where is", "how to reach", "jayanagar 4th block", "metro", "bus stand"], action: "campus_visit", weight: 26 },
  { keywords: ["specialization", "speciality", "sports", "neuro", "ortho", "pediatric", "cardio"], action: "mpt_specializations", weight: 25 },
  { keywords: ["career", "placements", "jobs", "salary", "scope", "employment"], action: "bpt_career", weight: 25 },
  { keywords: ["counsellor", "counselor", "callback", "call me", "talk to counsellor", "guidance", "speak to someone", "admissions help"], action: "talk_to_counsellor", weight: 25 },
  { keywords: ["book counselling", "priority counselling", "mpt guidance"], action: "book_counselling", weight: 25 },
  { keywords: ["faculty", "hod", "principal", "princi", "princie", "princple", "principle", "professor", "teachers", "staff", "departments", "head of department", "pruthviraj", "paul daniel", "pallavi", "dean", "leadership"], action: "dept_contacts", weight: 25 },
  { keywords: ["about", "history", "trust", "rsst", "rvei", "affiliation", "rguhs", "ncahp", "college info", "why rvcp", "established"], action: "about", weight: 22 },
  { keywords: ["contact", "phone", "call", "email", "office number", "reach", "helpline", "admission office"], action: "contact", weight: 22 },
  { keywords: ["admission", "admissions", "apply", "enroll", "enrol", "application", "portal", "registration", "seat", "seats"], action: "bpt_main", weight: 20 },
  { keywords: ["fee", "fees", "cost", "tuition", "charge", "price", "expense"], action: "fee_enquiry_bpt", weight: 18 },
  { keywords: ["eligibility", "qualification", "criteria", "neet", "marks", "percentage"], action: "bpt_eligibility", weight: 18 },
  { keywords: ["documents", "docs", "certificates", "documentation"], action: "bpt_documents", weight: 28 },

  // Broad Roots (Lowest Priority - only if no specific topic match)
  { keywords: ["mpt", "m.p.t", "master of physiotherapy", "postgraduate", "pg", "masters"], action: "mpt_main", weight: 12 },
  { keywords: ["bpt", "b.p.t", "bachelor of physiotherapy", "undergraduate", "ug", "physiotherapy", "physio"], action: "bpt_main", weight: 10 },
  { keywords: ["hi", "hello", "hey", "hii", "namaste", "good morning", "good evening", "good afternoon", "start", "menu", "home", "reset"], action: "welcome", weight: 8 },
  { keywords: ["help", "assist", "support", "guide"], action: "welcome", weight: 6 }
];

