from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class FilterQuery(BaseModel):
    joining_date_from: Optional[str] = None
    joining_date_to: Optional[str] = None
    as_on_date: Optional[str] = None
    retirement_date_from: Optional[str] = None
    retirement_date_to: Optional[str] = None
    area: Optional[str] = "All"
    division: Optional[str] = "All"
    group: Optional[str] = "All"
    level: Optional[str] = "All"
    designation: Optional[str] = "All"
    officer_type: Optional[str] = "All"

class KpiMetrics(BaseModel):
    total_retirement: int
    total_joining: int
    sanctioned_posts: int
    vacancies: int
    total_manpower: int
    attrition_rate: Optional[float] = 3.2

class SeriesPoint(BaseModel):
    name: str
    value: float
    secondary: Optional[float] = None
    extra: Optional[Dict[str, Any]] = None

class ManpowerSectionData(BaseModel):
    kpis: KpiMetrics
    total_manpower_trend: List[Dict[str, Any]]
    manpower_by_division: List[Dict[str, Any]]
    manpower_by_group: List[Dict[str, Any]]
    sanctioned_vs_actual: List[Dict[str, Any]]

class JoiningSectionData(BaseModel):
    kpis: KpiMetrics
    joining_over_time: List[Dict[str, Any]]
    joining_by_division: List[Dict[str, Any]]
    joining_by_group: List[Dict[str, Any]]

class RetirementSectionData(BaseModel):
    kpis: KpiMetrics
    retirement_over_time: List[Dict[str, Any]]
    retirement_by_division: List[Dict[str, Any]]
    retirement_by_group: List[Dict[str, Any]]

class AttritionSectionData(BaseModel):
    kpis: KpiMetrics
    attrition_rate_over_time: List[Dict[str, Any]]
    attrition_by_division: List[Dict[str, Any]]
    attrition_by_group: List[Dict[str, Any]]
    attrition_forecast_5years: List[Dict[str, Any]]
    employee_count_forecast_5y: Optional[List[Dict[str, Any]]] = None

class DesignationSectionData(BaseModel):
    kpis: KpiMetrics
    manpower_by_designation: List[Dict[str, Any]]
    manpower_by_level: List[Dict[str, Any]]
    manpower_by_officer_type: List[Dict[str, Any]]

class OverviewSectionData(BaseModel):
    kpis: KpiMetrics
    overall_manpower: List[Dict[str, Any]]
    joining_vs_retirement: List[Dict[str, Any]]
    attrition_summary: List[Dict[str, Any]]
    distribution_summary: List[Dict[str, Any]]

class FilterOptions(BaseModel):
    areas: List[str]
    divisions: List[str]
    groups: List[str]
    levels: List[str]
    designations: List[str]
    officer_types: List[str]
    min_join_date: str
    max_join_date: str
    min_retirement_date: str
    max_retirement_date: str
    available_as_on_dates: List[str]
