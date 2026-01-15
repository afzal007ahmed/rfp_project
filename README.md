# AI-Powered RFP Management System

An end-to-end **AI-powered RFP (Request for Proposal) management platform** that enables procurement teams to generate RFPs, send them to vendors, track replies via email (IMAP), and use AI to analyze and identify the best vendor proposal.

---

## 🚀 Features

This project fulfills all **functional requirements** outlined in the assignment PDF, covering the complete RFP lifecycle from creation to AI-assisted vendor recommendation.

### Vendor Management

* List all vendors
* Add new vendors
* Tag vendors based on proposal quality

### RFP Generation

* Generate RFPs using **Gemini LLM** from natural language prompts
* Transform RFPs into editable email templates
* Select vendors and send RFPs via email

### Email Integration

* Send emails using **Nodemailer**
* Read inbox using **IMAP**
* Track vendor replies using **Message-ID** and **In-Reply-To** headers

### AI-Powered Proposal Evaluation

* Parse and normalize vendor replies
* Compare proposals using Gemini LLM
* Score vendors and identify the **best proposal**
* Generate tags such as pricing, delivery, compliance, and interest level

### History & Tracking

* View history of all generated RFPs
* View vendor-specific replies for each RFP
* Highlight best vendor response per RFP

---

## 🧱 Tech Stack

### Frontend

* React (JavaScript)
* Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL

### Email

* Nodemailer (SMTP sending)
* IMAP (reading inbox & replies)

### AI

* Google Gemini LLM

### Key Libraries

* mailparser (email parsing)
* imap-simple (IMAP client)
* dotenv (env management)

### Frontend

* React (JavaScript)
* Tailwind CSS
* shadcn/ui
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL

### Email & AI

* IMAP (reading inbox & replies)
* Nodemailer (sending emails)
* Google Gemini LLM (RFP generation & proposal analysis)

---

## 🗂️ High-Level Architecture

1. User generates an RFP using AI
2. RFP is converted into an editable email template
3. User selects vendors and sends RFP emails
4. Vendors reply via email
5. Backend reads inbox using IMAP
6. Replies are matched using `In-Reply-To` → `Message-ID`
7. AI analyzes all replies against original RFP
8. Best vendor proposal is identified and tagged

---

## ⚙️ Environment Variables

An `.env.example` file should be created (no secrets committed) listing all required environment variables.

Create a `.env` file in the backend root directory:

Create a `.env` file in the backend root directory:

```env
PORT=3000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

USER_EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password

GEMINI_API_KEY=your_gemini_api_key
```

⚠️ **Important:**

* Use **App Passwords** for email (not your real password)
* Do NOT commit `.env` to version control

---

## 🛠️ Project Setup

### 1. Prerequisites

* **Node.js:** v18 or higher
* **Database:** PostgreSQL
* **Email:** Gmail account with App Password enabled
* **AI:** Google Gemini API key

### 2. Installation Steps

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Email Configuration (Send & Receive)

#### Sending Emails

* Emails are sent using **Nodemailer (SMTP)**
* Gmail App Password is required (not normal Gmail password)

Required env variables:

```env
USER_EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Receiving Emails

* Inbox is read using **IMAP**
* Replies are matched using `Message-ID` and `In-Reply-To`

IMAP uses Gmail default configuration:

* Host: imap.gmail.com
* Port: 993
* TLS enabled

### 4. Running the Application Locally

1. Start PostgreSQL and ensure DB exists
2. Start backend server (`npm run dev`)
3. Start frontend (`npm run dev`)
4. Open browser at `http://localhost:3000`

### 5. Seed Data / Initial Setup

* Vendors can be added manually from the UI
* No seed scripts are required for MVP
* Database tables are auto-created using Sequelize models

### Prerequisites

* Node.js >= 18
* PostgreSQL
* Gmail account with App Password enabled
* Google Gemini API key

### Installation Steps

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database Setup

* Ensure PostgreSQL is running
* Create database manually
* Sequelize models will auto-sync (or migrations if configured)

### 1. Clone Repository

```bash
git clone <repository-url>
cd rfp-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Database Setup

* Ensure PostgreSQL is running
* Create database
* Run Sequelize migrations (if configured)

---

## 🧠 AI Integration & Design Decisions

AI (Gemini LLM) is used thoughtfully only where data is **unstructured and repetitive**:

### AI Use Cases

1. **RFP Structuring** – Converts natural language procurement needs into a structured RFP schema
2. **Vendor Reply Parsing** – Extracts key proposal details from free-form email replies
3. **Proposal Comparison** – Scores and summarizes vendor proposals to assist decision-making

### Hallucination Mitigation

* Original RFP and raw vendor replies are always passed as grounding context

* AI outputs are constrained to strict JSON formats

* Message-ID references are enforced to avoid invented data

* AI recommendations are advisory, not authoritative

* AI is used only for **unstructured text** processing (RFP text & email replies)

* Deterministic logic (email sending, vendor linking) is handled by backend code

* AI output is constrained to **strict JSON** and validated before use

* AI is advisory — final decisions remain with the user

---

## 📧 Email Sending & Receiving Design

### Sending Emails

* RFPs are sent using **Nodemailer** via SMTP
* Each outgoing RFP email includes a unique `Message-ID`

### Receiving Emails

* Inbox is read using **IMAP**
* Vendor replies are fetched and parsed automatically

### Reply Matching Logic

* Replies are matched using email threading headers:

```js
reply.inReplyTo === rfp.messageId
```

This ensures replies are accurately associated with the correct RFP, even across multiple vendors.

* Each RFP email is sent with a unique `Message-ID`
* Vendor replies contain:

  * `In-Reply-To`
  * `References`
* Replies are matched where:

```js
reply.inReplyTo === rfp.messageId
```

This ensures accurate threading and proposal association.

---

## 📊 API Documentation

### RFP APIs

#### Generate RFP

**POST** `/rfp/generate`

Request Body:

```json
{
  "prompt": "Need laptops and monitors for new office"
}
```

Success Response:

```json
{
  "data": { "raw": "...generated RFP text..." },
  "error": null
}
```

---

#### List RFP History

**GET** `/rfp`

Success Response:

```json
{
  "data": [ { "id": 1, "raw": "..." } ],
  "error": null
}
```

---

### Vendor APIs

#### List Vendors

**GET** `/vendors`

#### Add Vendor

**POST** `/vendors`

Request Body:

```json
{
  "name": "Vendor A",
  "email": "vendor@example.com"
}
```

---

### Email & Replies

#### Send RFP to Vendors

**POST** `/rfp/send`

Request Body:

```json
{
  "rfpId": 1,
  "vendorIds": [1, 2]
}
```

---

#### Get Replies & Best Proposal

**GET** `/replies/:messageId`

Success Response:

```json
{
  "data": { "vendor@email.com": [ { "text": "..." } ] },
  "best": { "sender": "vendor@email.com", "score": 85 },
  "error": null
}
```

### RFP

* `POST /rfp/generate` – Generate structured RFP from natural language
* `GET /rfp` – List all RFPs
* `GET /rfp/:id` – Get RFP details and vendor associations

### Vendors

* `GET /vendors` – List vendors
* `POST /vendors` – Add vendor

### Email & Replies

* `POST /rfp/send` – Send RFP to selected vendors
* `GET /replies/:messageId` – Fetch and analyze vendor replies

---

## 🧾 Decisions & Assumptions

### Key Design Decisions

* Separate models for `rfp`, `vendors`, and `rfp_vendors` to maintain relational clarity
* Used `Message-ID` for uniquely identifying RFP emails
* Used `In-Reply-To` header to match vendor replies
* AI scoring is advisory; final decision is user-controlled
* Normalized email replies before sending to AI for better accuracy

### Assumptions

* Vendors reply using standard email clients
* Replies contain `In-Reply-To` or `References` headers
* Proposals are sent as email text (attachments out of scope)
* Single-user system (no authentication)

### Key Decisions

* Single-user system (as per assignment scope)
* IMAP polling instead of webhooks for simplicity
* AI used only where deterministic parsing is impractical
* Relational DB (Postgres) for data integrity

### Assumptions

* Vendors reply using standard email clients
* Replies include `In-Reply-To` headers
* Attachments are out of scope for MVP

---

## 🤖 AI Tools Usage

### Tools Used While Building

* **ChatGPT** – architecture design, prompt engineering, debugging
* **Google Gemini LLM** – application AI functionality

### How AI Helped During Development

* Designing RFP generation prompts
* Structuring proposal comparison logic
* Handling unstructured vendor email replies
* Improving error handling for LLM outputs

### Notable Prompting Approaches

* Strict JSON-only output enforcement
* Passing original RFP + raw replies as grounding context
* Message-ID enforcement to prevent hallucination

### Learnings

* LLM outputs must always be validated
* Prompt constraints significantly improve reliability
* AI should assist, not replace, business decisions

### Tools Used

* ChatGPT – Prompt design, debugging, architecture reasoning
* Gemini LLM – Core application AI functionality

### How AI Helped

* Designing prompts for structured extraction
* Handling messy vendor email responses
* Improving scoring and summarization logic

### Learnings

* Strict output constraints are required for reliability
* Post-processing and validation are essential for production AI

---

## 📈 Future Improvements

* OAuth2-based Gmail authentication

* Background workers for IMAP polling

* Attachment parsing (PDF/DOC)

* Schema validation for AI outputs

* Confidence scoring and audit logs

* OAuth2 for Gmail IMAP authentication

* Background workers for IMAP polling

* Attachment parsing (PDF / DOC proposals)

* Role-based access control

* Confidence scores for AI evaluation

* Audit logs for procurement decisions

---

## 👤 Author

**Afzal Ahmed**

This project was built as part of an AI-powered system design and implementation assignment.

---

## ✅ Conclusion

This system demonstrates:

* Full-stack development skills
* Practical AI integration
* Email protocol understanding (IMAP)
* Real-world procurement workflow modeling

It is designed as a **production-ready MVP** with clear paths for scaling and hardening.
# rfp_project
