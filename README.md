# 🏥 RVCP Chatbot & Analytics Command Center

> Official AI-Powered Admissions & Clinical Information Chatbot for **RV College of Physiotherapy (RVCP)**, Bengaluru.  
> Affiliated to **Rajiv Gandhi University of Health Sciences (RGUHS)** | Aligned with **NCAHP** | Managed by **RSST**.

---

## 🌟 Key Features

* **🎓 Complete Academic Coverage**:
  * **BPT (Bachelor of Physiotherapy)**: 4.5 Years (4 yrs academic + 6 months compulsory rotatory clinical internship), eligibility criteria (10+2 PCB min 40%, SC/ST 35%, NEET/NCAHP appearance), and application guidelines.
  * **MPT (Master of Physiotherapy)**: 2-year advanced postgraduate study covering all **6 official specialisations**:
    1. Musculoskeletal Sciences
    2. Sports Sciences
    3. Neurological Sciences
    4. Paediatrics
    5. Community Health
    6. Cardiovascular and Pulmonary Sciences
* **💰 Merit Scholarships Engine**:
  * Tier 1: **₹2,00,000** for >75% PCB in 10+2 / PUC.
  * Tier 2: **₹1,00,000** for 60% – 75% PCB in 10+2 / PUC.
* **🧠 Intelligent Search & Direct FAQ Engine**:
  * Instantly answers natural language queries about NEET requirements, course fees, hospital postings (Aster RV), hostel sharing costs, college timings, and campus location in Jayanagar 4th Block.
  * Specificity-weighted matching prevents false-positive routing and accurately guides candidates to dedicated inquiry forms.
* **📊 Dual-Write Telemetry & Command Center**:
  * **WordPress Integration**: Installable `.zip` plugin with admin settings and embedded analytics view.
  * **Live Analytics Dashboard** (`/dashboard`): Real-time KPI tracking for total leads, active sessions, conversion funnel, and missed query gap analysis.
  * **Multi-Channel Dispatch**: Dual-write dispatch to Node.js backend (with email dispatch) and Google Sheets via Apps Script.

---

## 📂 Project Architecture

```
rvcp-chatbot/
├── api/                     # Serverless & Express API handlers
│   └── index.js             # Telemetry, lead capture, and dashboard APIs
├── dashboard/               # Command Center Analytics UI
│   ├── index.html           # Executive Overview & Live Feeds
│   ├── leads.html           # Searchable Leads Stream & CSV Export
│   ├── sessions.html        # Visitor Journey & Telemetry Trails
│   ├── interactions.html    # Event Stream & Missed Queries Gap Analysis
│   ├── analytics.html       # Funnel Conversion & Programme Demand
│   ├── dashboard.css        # Midnight Glassmorphism responsive design
│   └── dashboard.js         # Reactive API client & charts
├── chatbot-data.js          # Knowledge Base, FAQs, and Conversation Flows
├── script.js                # Chatbot engine, UI controller, and telemetry
├── style.css                # Premium RVCP-branded widget theme (#6F4D41)
├── index.html               # Standalone test landing page with RVCP backdrop
├── server.js                # Express daemon server for local execution
├── rvcp-chatbot.php         # WordPress plugin entrypoint with Admin settings
├── rvcp-chatbot.zip         # 1-Click production-ready WordPress plugin package
├── vercel.json              # Vercel deployment configuration
├── .env.example             # Environment credentials template
└── package.json             # Node dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Local Development

```bash
# Install dependencies
npm install

# Start the local server
npm start
# or
node server.js
```

* **Live Chatbot Demo**: Open [http://localhost:3000](http://localhost:3000)
* **Command Center Dashboard**: Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### 2. WordPress Installation

1. Download or copy `rvcp-chatbot.zip`.
2. In your WordPress Admin Dashboard, go to **Plugins > Add New > Upload Plugin**.
3. Select `rvcp-chatbot.zip` and click **Install Now** → **Activate Plugin**.
4. Configure options under **RVCP Chatbot > Settings**:
   * Enable/Disable Chatbot
   * Set Custom Chatbot Title
   * Connect Backend Tracking URL (e.g. `https://your-vercel-deployment.vercel.app`)
   * Connect Google Sheets Web App URL (optional)
5. Access real-time analytics directly from WordPress Admin under **RVCP Chatbot > 📊 Analytics Dashboard**.

### 3. Vercel Cloud Deployment

Deploy the repository directly to [Vercel](https://vercel.com/):

```bash
npx vercel --prod
```

Configure the following environment variables in Vercel project settings:
* `EMAIL_USER`: SMTP Sender email
* `EMAIL_PASS`: SMTP App password
* `RECEIVER_EMAIL`: Admissions recipient desk email (e.g. `rvcp@rvei.edu.in`)

---

## 🏫 Institution Details

* **Institution**: RV College of Physiotherapy (RVCP)
* **Campus**: CA 2/83-3, 9th Main Rd, 4th Block, Jayanagar, Bengaluru, Karnataka 560011
* **Affiliation**: Rajiv Gandhi University of Health Sciences (RGUHS)
* **Regulatory Alignment**: National Commission for Allied and Healthcare Professions (NCAHP)
* **Principal**: Dr. Pruthviraj R (PT), Professor & Principal, Dean of Faculty at RGUHS

---

## 📄 License

GPL-2.0+ / Rashtreeya Sikshana Samithi Trust (RSST).
