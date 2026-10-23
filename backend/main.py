from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Dict, Any
from .models import (
    FilterQuery, KpiMetrics, ManpowerSectionData,
    JoiningSectionData, RetirementSectionData, AttritionSectionData,
    DesignationSectionData, OverviewSectionData, FilterOptions
)
from .data_service import ManpowerDataService

app = FastAPI(
    title="NRSC ISRO Manpower Analysis API",
    description="Backend API for Manpower Analysis Dashboard with Pandas, NumPy, and MS SQL Server readiness.",
    version="1.0.0"
)

# Enable CORS for React Frontend (typically running on localhost:5173 or local network)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = ManpowerDataService()

def get_filter_params(
    joining_date_from: Optional[str] = Query(None),
    joining_date_to: Optional[str] = Query(None),
    as_on_date: Optional[str] = Query("All"),
    retirement_date_from: Optional[str] = Query(None),
    retirement_date_to: Optional[str] = Query(None),
    area: Optional[str] = Query("All"),
    division: Optional[str] = Query("All"),
    group: Optional[str] = Query("All"),
    level: Optional[str] = Query("All"),
    designation: Optional[str] = Query("All"),
    officer_type: Optional[str] = Query("All")
) -> FilterQuery:
    return FilterQuery(
        joining_date_from=joining_date_from,
        joining_date_to=joining_date_to,
        as_on_date=as_on_date,
        retirement_date_from=retirement_date_from,
        retirement_date_to=retirement_date_to,
        area=area,
        division=division,
        group=group,
        level=level,
        designation=designation,
        officer_type=officer_type
    )

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "NRSC-ISRO Manpower Analysis API",
        "version": "1.0.0",
        "endpoints": [
            "/api/metrics",
            "/api/manpower",
            "/api/joining",
            "/api/retirement",
            "/api/attrition",
            "/api/designation",
            "/api/overview",
            "/api/filters"
        ]
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database_connected": service.db_provider.is_connected()
    }

@app.get("/api/filters")
def get_filters():
    """Retrieve dropdown filter options and date ranges."""
    return service.get_filter_options()

@app.get("/api/metrics")
def get_kpi_metrics(filters: FilterQuery = Depends(get_filter_params)):
    """Retrieve the 4 core KPI metrics: Total Retirement, Total Joining, Sanctioned Posts, Vacancies."""
    df = service.get_raw_dataframe()
    fdf = service.filter_dataframe(df, filters)
    kpis = service.compute_kpis(fdf)
    return kpis.dict()

@app.post("/api/metrics")
def post_kpi_metrics(filters: FilterQuery):
    df = service.get_raw_dataframe()
    fdf = service.filter_dataframe(df, filters)
    kpis = service.compute_kpis(fdf)
    return kpis.dict()

@app.get("/api/manpower")
def get_manpower(filters: FilterQuery = Depends(get_filter_params)):
    """Total manpower, manpower by division, manpower by group, sanctioned vs actual."""
    return service.get_manpower_section(filters)

@app.post("/api/manpower")
def post_manpower(filters: FilterQuery):
    return service.get_manpower_section(filters)

@app.get("/api/joining")
def get_joining(filters: FilterQuery = Depends(get_filter_params)):
    """Joining over time, joining by division, joining by group."""
    return service.get_joining_section(filters)

@app.post("/api/joining")
def post_joining(filters: FilterQuery):
    return service.get_joining_section(filters)

@app.get("/api/retirement")
def get_retirement(filters: FilterQuery = Depends(get_filter_params)):
    """Retirement over time, retirement by division, retirement by group."""
    return service.get_retirement_section(filters)

@app.post("/api/retirement")
def post_retirement(filters: FilterQuery):
    return service.get_retirement_section(filters)

@app.get("/api/attrition")
def get_attrition(filters: FilterQuery = Depends(get_filter_params)):
    """Attrition rate over time, attrition by division, attrition by group, 5-year forecast."""
    return service.get_attrition_section(filters)

@app.post("/api/attrition")
def post_attrition(filters: FilterQuery):
    return service.get_attrition_section(filters)

@app.get("/api/designation")
def get_designation(filters: FilterQuery = Depends(get_filter_params)):
    """Manpower by designation, level, and officer type."""
    return service.get_designation_section(filters)

@app.post("/api/designation")
def post_designation(filters: FilterQuery):
    return service.get_designation_section(filters)

@app.get("/api/overview")
def get_overview(filters: FilterQuery = Depends(get_filter_params)):
    """Summary of overall manpower, joining, retirement, and attrition."""
    return service.get_overview_section(filters)

@app.post("/api/overview")
def post_overview(filters: FilterQuery):
    return service.get_overview_section(filters)
