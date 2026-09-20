# Vyapaar OS 🛒🇮🇳
> **Production-Ready Business Operating System, Smart Point of Sale (POS) & GST Invoicing for Indian SMBs & Retailers.**

---

## 📌 Architecture Overview

Vyapaar OS is built for high-throughput retail checkout, robust inventory tracking, and seamless GST compliance.

```
├── backend/               # FastAPI async REST microservices
│   ├── app/
│   │   ├── api/v1/        # Endpoints (Auth, POS Checkout, Inventory, Customers, Telemetry)
│   │   ├── core/          # Pydantic Settings, JWT Auth & Security Headers
│   │   ├── database/      # Async Motor MongoDB connection with fallback resilience
│   │   ├── models/        # Pydantic & Domain Schemas
│   │   └── services/      # Demand forecasting engine (ML & statistical fallback)
│   ├── tests/             # Pytest automated test suite
│   ├── Dockerfile         # Python 3.12 slim container
│   └── requirements.txt   # Pinned dependencies
│
├── frontend/              # Modern React 18 + Vite + Tailwind CSS Single Page App
│   ├── src/
│   │   ├── components/    # Layout (Sidebar, Header), Modals & Charts
│   │   ├── pages/         # Dashboard, Smart POS, Inventory, Customers CRM, Analytics, Settings
│   │   ├── store/         # Zustand persistent business store & cart engine
│   │   └── lib/           # Environment-aware API client
│   ├── Dockerfile         # Multi-stage Node.js + Nginx Alpine build
│   └── nginx.conf         # Production SPA routing
│
├── n8n/                   # Workflow orchestration (e.g. WhatsApp invoice dispatch)
└── docker-compose.yml     # Complete container stack (API, Web, MongoDB, Redis, n8n)
```

---

## 🚀 Quickstart Guide

### 1. Environment Setup
Copy the environment template in the root directory:
```bash
cp .env.example .env
```
*(Optional)* For the frontend:
```bash
cp frontend/.env.example frontend/.env
```

### 2. Run with Docker Compose (Recommended)
Launch the complete stack (FastAPI backend, React frontend, MongoDB 6, Redis 7, and n8n):
```bash
docker compose up --build -d
```
- **Frontend POS & Dashboard:** [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **n8n Automation:** [http://localhost:5678](http://localhost:5678)

---

### 3. Local Development (Without Docker)

#### Backend:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate          # On Windows (or source venv/bin/activate on Unix)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Running Backend Tests:
```bash
cd backend
pytest
```

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Credentials & Security

- **Default Demo Admin Credentials:**
  - **Username:** `admin`
  - **Password:** `admin123`
- **Untracked Environment:** All `.env` files are ignored by git to protect credentials. Always customize `SECRET_KEY` in production.
- **Security Headers:** Strict Transport Security (HSTS), Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

---

## ⚡ Core Features

- **Smart POS Terminal:** Keyboard-friendly product search, barcode scanning, category filters, instant quantity adjustments.
- **GST Tax Invoices:** Dynamic CGST & SGST (e.g., 9% + 9%) computation, instant printable/downloadable tax invoices with HSN/GSTIN.
- **UPI QR Code Generation:** Direct scan-to-pay QR modal with merchant UPI VPA.
- **Inventory Control:** Low-stock threshold alerts, real-time stock deductions on checkout, and Add/Delete product modal.
- **Customer CRM:** Track customer lifetime value, transaction history, and loyalty reward points.
- **Business Profile Settings:** Update store legal entity, GSTIN, phone, address, and invoice numbering with local persistence.

---

## 📄 License
Proprietary & Open template for Indian SMBs. Built for speed and reliability.