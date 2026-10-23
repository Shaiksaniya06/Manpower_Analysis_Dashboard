# MANPOWER ANALYSIS DASHBOARD (NRSC–ISRO)

A complete, colorful, web-based **Manpower Analysis Dashboard** built for the **National Remote Sensing Centre (NRSC) – Indian Space Research Organisation (ISRO)**. 

The application is structured into separate **Frontend** and **Backend** directories using free, open-source technologies (React + Vite + Recharts and FastAPI + Pandas + NumPy) with a decoupled data architecture ready for **Microsoft SQL Server (MSSQL)** integration.

---

## 🏛️ System Features & Specifications

- **Header & Branding**:
  - Displays **MANPOWER ANALYSIS DASHBOARD** in large, bold letters at the top.
  - Authentic NRSC & ISRO vector crest and emblem logos placed beside the title.
- **Left-Side Sidebar Filters**:
  - **Joining Date** (Date range picker)
  - **As On Date** (Dropdown selector)
  - **Retirement Date** (Date range picker)
  - **Area** (MSA, RSA, ASDA, All)
  - **Division** (HRD, MISD, ASD, BND, G&CD, AD, DPD, All)
  - **Group** (GROUP A, GROUP B, GROUP C, All)
  - **Level** (Level 14 to Level 2 7th CPC levels, All)
  - **Designation** (Sci/Eng-SG, SF, SE, SD, SC, Admin Officer, Section Officer, All)
  - **Officer Type** (Gazetted GO, Non-Gazetted NGO, All)
  - **Clear Filters Button**: One-click reset returning all 9 filters to default state.
- **Navigation Buttons**:
  - Six buttons below the title: **Manpower**, **Joining**, **Retirement**, **Attrition**, **Designation**, and **Overview**.
- **Universal KPI Cards**:
  - Four KPI cards permanently visible across **all navigation sections**:
    1. **Total Retirement** (Rose/Red accent)
    2. **Total Joining** (Green/Emerald accent)
    3. **Sanctioned Posts** (Blue accent)
    4. **Vacancies** (Amber/Orange accent)
- **Section Charts (Responsive & Single-Screen Viewport Fit)**:
  - **Manpower**: Total manpower trend progression, manpower by division, manpower by group (donut), sanctioned versus actual manpower (grouped bars).
  - **Joining**: Joining over time (2020–2025), joining by division, joining by group (donut), intake channels.
  - **Retirement**: Retirement over time, retirement by division, retirement by group, succession & knowledge transition readiness.
  - **Attrition**: Attrition rate over time, attrition by division, attrition by group, and **5-Year Forecast Graph (2026–2030)** with predictive projection & confidence band.
  - **Designation**: Manpower by designation (horizontal bars), manpower by level (7th CPC column chart), and manpower by officer type (GO vs NGO donut).
  - **Overview**: Summary of overall manpower by functional stream, joining vs retirement comparative timeline, attrition & stability summary, regional deployment distribution by area.
- **Aesthetic**:
  - Colorful modern charts using **blue, green, purple, orange, and teal** accents.
  - Fits on one desktop screen without vertical scrolling.

---

## 📁 Project Architecture & File Structure

```text
Manpower_Analysis/
├── backend/                       # Python FastAPI Backend
│   ├── main.py                    # API router, CORS middleware, endpoints
│   ├── data_service.py            # Pandas & NumPy analysis, slicing, forecasting
│   ├── database.py                # Database abstraction (CSV & MSSQL Provider)
│   ├── models.py                  # Pydantic data schemas and KPI models
│   ├── requirements.txt           # Python dependencies
│   └── README.md                  # Backend specific documentation
│
├── src/                           # React + Vite Frontend
│   ├── assets/                    # Static assets
│   ├── components/
│   │   ├── pages/
│   │   │   ├── ManpowerPage.jsx    # Section 1: Manpower charts
│   │   │   ├── JoiningPage.jsx     # Section 2: Joining charts
│   │   │   ├── RetirementPage.jsx  # Section 3: Retirement charts
│   │   │   ├── AttritionPage.jsx   # Section 4: Attrition & 5-year forecast
│   │   │   ├── DesignationPage.jsx # Section 5: Designation, level & officer type
│   │   │   └── OverviewPage.jsx    # Section 6: Overall workforce summary
│   │   ├── FilterSidebar.jsx      # Left sidebar with 9 filters & Clear button
│   │   ├── KpiCardsRow.jsx        # 4 Universal KPI cards
│   │   ├── Logos.jsx              # Vector NRSC and ISRO logos
│   │   └── PowerBiHeader.jsx      # Header, title, logos & navigation tabs
│   ├── data/                      # Client-side datasets and fallback constants
│   ├── services/
│   │   └── api.js                 # API connector with FastAPI & local fallback
│   ├── App.jsx                    # Root application container & layout
│   ├── index.css                  # Tailwind styles and custom dashboard theme
│   └── main.jsx                   # React 19 entry point
│
├── index.html                     # Application HTML template
├── package.json                   # Frontend npm dependencies
├── vite.config.js                 # Vite bundler configuration
└── README.md                      # This comprehensive documentation
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- **Node.js** (v18 or higher) & **npm**
- **Python** (3.10 or higher)

---

### Step 1: Running the Backend (FastAPI)

1. Open a terminal in the project directory:
   ```bash
   cd c:\Users\sksan\OneDrive\Desktop\Manpower_Analysis
   ```

2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Launch the FastAPI server:
   ```bash
   python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
   ```

4. The backend is live at:
   - API Base URL: `http://127.0.0.1:8000`
   - Interactive Swagger API Documentation: `http://127.0.0.1:8000/docs`
   - Health Check: `http://127.0.0.1:8000/api/health`

---

### Step 2: Running the Frontend (React + Vite)

1. In a separate terminal window:
   ```bash
   cd c:\Users\sksan\OneDrive\Desktop\Manpower_Analysis
   ```

2. Install frontend dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

> **Note on Resiliency**: The frontend includes a smart fallback engine. If the FastAPI backend is running, the dashboard connects directly to it (indicated by `FastAPI: Online` badge in the header). If the backend is not started, the dashboard automatically operates in client-side demonstration mode with realistic Pandas-equivalent calculations, ensuring zero downtime during presentations.

---

## 🗄️ Microsoft SQL Server Integration (Next Stage)

The backend employs an abstract Provider Pattern (`IDatabaseProvider` in `backend/database.py`). To connect Microsoft SQL Server in the future:

1. Install SQLAlchemy and PyODBC:
   ```bash
   pip install sqlalchemy pyodbc
   ```

2. Configure environment variables in `.env`:
   ```env
   DB_ENGINE=mssql
   # For SQL Server Authentication:
   MSSQL_CONNECTION_STRING=mssql+pyodbc://username:password@server_name/NRSC_DB?driver=ODBC+Driver+17+for+SQL+Server

   # Or for Windows Authentication (SSPI):
   MSSQL_CONNECTION_STRING=mssql+pyodbc://@server_name/NRSC_DB?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes

   # Target Table or View:
   MSSQL_QUERY=SELECT * FROM dbo.NRSC_Manpower_View
   ```

3. Restart the FastAPI server. No modifications to frontend code or API endpoints are required.

---

## 📡 Backend API Endpoints Reference

| Endpoint | Method | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `/api/metrics` | `GET`, `POST` | `FilterQuery` | Returns the 4 core KPIs: Total Retirement, Total Joining, Sanctioned Posts, Vacancies |
| `/api/manpower` | `GET`, `POST` | `FilterQuery` | Returns total manpower trend, division distribution, group ratio, and sanctioned vs actual |
| `/api/joining` | `GET`, `POST` | `FilterQuery` | Returns joining over time (2020-2025), joining by division, and joining by group |
| `/api/retirement` | `GET`, `POST` | `FilterQuery` | Returns retirement over time, retirement by division, and retirement by group |
| `/api/attrition` | `GET`, `POST` | `FilterQuery` | Returns historical attrition rates, division/group breakdowns, and **5-year forecast** |
| `/api/designation` | `GET`, `POST` | `FilterQuery` | Returns manpower by designation, by 7th CPC level, and by officer type (GO/NGO) |
| `/api/overview` | `GET`, `POST` | `FilterQuery` | Returns overall functional manpower, joining vs retirement timeline, and stability metrics |
| `/api/filters` | `GET` | None | Returns available unique filter values and date limits extracted from dataset |
| `/api/health` | `GET` | None | Returns backend status and database connectivity indicator |
