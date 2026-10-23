# NRSC–ISRO Manpower Analysis Frontend

React 19 + Vite + Recharts frontend for the **Manpower Analysis Dashboard** at NRSC–ISRO.

## Directory Structure

```text
frontend/
├── src/
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
│   ├── services/
│   │   └── api.js                 # API service connecting to FastAPI backend
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Tailored styles & dashboard theme
│   └── main.jsx                   # React entry point
├── public/                        # Static assets & icons
├── index.html                     # HTML document
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
├── postcss.config.js              # PostCSS config
└── tailwind.config.js             # Tailwind CSS config
```

## Running the Frontend

From the `frontend/` directory (or from project root):

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:
`http://localhost:5173`
