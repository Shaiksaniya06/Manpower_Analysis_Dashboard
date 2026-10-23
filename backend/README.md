# NRSC–ISRO Manpower Analysis Backend

FastAPI backend with **Pandas** and **NumPy** data processing engine. Designed with a modular provider pattern ready for **Microsoft SQL Server (MSSQL)** integration.

---

## 1. Quick Start (Run Backend Locally)

From the project root:

```bash
# 1. Install dependencies (if not already installed)
python -m pip install -r backend/requirements.txt

# 2. Start the FastAPI development server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at:
- Base URL: `http://127.0.0.1:8000`
- Interactive Swagger Documentation: `http://127.0.0.1:8000/docs`
- Alternative ReDoc: `http://127.0.0.1:8000/redoc`

---

## 2. API Endpoints

All endpoints accept filter parameters via Query parameters (`GET`) or JSON body (`POST`):

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/metrics` | `GET`, `POST` | Core 4 KPIs: Total Retirement, Total Joining, Sanctioned Posts, Vacancies |
| `/api/manpower` | `GET`, `POST` | Total Manpower trend, by Division, by Group, Sanctioned vs Actual |
| `/api/joining` | `GET`, `POST` | Joining over time, by Division, by Group |
| `/api/retirement` | `GET`, `POST` | Retirement over time, by Division, by Group |
| `/api/attrition` | `GET`, `POST` | Attrition rate over time, by Division, by Group, and 5-Year Forecast |
| `/api/designation` | `GET`, `POST` | Manpower by Designation, Level, and Officer Type (GO vs NGO) |
| `/api/overview` | `GET`, `POST` | Comprehensive workforce summary and cross-functional metrics |
| `/api/filters` | `GET` | Dynamic dropdown lists and date boundaries from dataset |
| `/api/health` | `GET` | Service status and database connectivity check |

---

## 3. Microsoft SQL Server Integration (Future Stage)

The API layer (`main.py` and `data_service.py`) is completely separated from the data access layer (`database.py`). To switch from the default CSV / in-memory provider to Microsoft SQL Server:

1. **Install MSSQL drivers & libraries**:
   ```bash
   pip install pyodbc sqlalchemy
   ```

2. **Set Environment Variables**:
   In your `.env` or system environment:
   ```env
   DB_ENGINE=mssql
   # For SQL Server Authentication:
   MSSQL_CONNECTION_STRING=mssql+pyodbc://username:password@your_server/NRSC_DB?driver=ODBC+Driver+17+for+SQL+Server
   
   # Or for Windows Authentication (SSPI):
   MSSQL_CONNECTION_STRING=mssql+pyodbc://@your_server/NRSC_DB?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes
   
   # Optional: customize view or table
   MSSQL_QUERY=SELECT * FROM dbo.NRSC_Manpower_View
   ```

3. **Restart the server**:
   `database.py` will automatically route queries to your Microsoft SQL Server instance without modifying frontend or analytical code!
