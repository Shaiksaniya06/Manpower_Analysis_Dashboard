
import os
from pathlib import Path
from abc import ABC, abstractmethod
from typing import Optional

import pandas as pd
# pyrefly: ignore[missing-import]
from dotenv import load_dotenv

# --------------------------------------------------
# Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR / "Manpower_5Year_Dataset.csv"

# Load local environment variables from backend/.env
load_dotenv(BACKEND_DIR / ".env")


# --------------------------------------------------
# Database Provider Interface
# --------------------------------------------------

class IDatabaseProvider(ABC):
    """Common interface for CSV and SQL Server providers."""

    @abstractmethod
    def get_manpower_data(self) -> pd.DataFrame:
        """Fetch manpower records."""
        pass

    @abstractmethod
    def is_connected(self) -> bool:
        """Check whether the data source is available."""
        pass


# --------------------------------------------------
# CSV Database Provider
# --------------------------------------------------

class CSVDataProvider(IDatabaseProvider):
    """CSV provider with synthetic fallback data for demonstrations."""

    def __init__(self, file_path: Path = CSV_PATH):
        self.file_path = file_path
        self._cached_df: Optional[pd.DataFrame] = None

    def get_manpower_data(self) -> pd.DataFrame:
        if self._cached_df is not None:
            return self._cached_df.copy()

        if self.file_path.exists():
            df = pd.read_csv(self.file_path)
        else:
            df = self._generate_fallback_data()

        date_cols = [
            "DATEOFBIRTH",
            "DESGATTAINEDDT",
            "JOINISRODATE",
            "SUPERANNUATNDT",
            "AS ON DATE",
        ]

        for col in date_cols:
            if col in df.columns:
                df[col] = pd.to_datetime(df[col], errors="coerce")

        str_cols = [
            "EMPLOYEECODE",
            "EMPLOYEENAME",
            "DESIG",
            "LEVEL",
            "AREA",
            "DIVISION",
            "GROUP",
            "OFFICERTYPE",
        ]

        for col in str_cols:
            if col in df.columns:
                df[col] = df[col].astype(str).str.strip()

        self._cached_df = df
        return self._cached_df.copy()

    def is_connected(self) -> bool:
        # The CSV provider is available even when using generated data.
        return True

    def _generate_fallback_data(self) -> pd.DataFrame:
        """Generate synthetic sample data when the CSV is unavailable."""

        records = []

        divisions = ["HRD", "MISD", "ASD", "BND", "G&CD"]
        areas = ["MSA", "RSA", "ASDA"]
        groups = ["GROUP A", "GROUP B", "GROUP C"]

        desigs = [
            "Scientist/Engineer-SG",
            "Scientist/Engineer-SF",
            "Scientist/Engineer-SE",
            "Scientist/Engineer-SD",
            "Scientist/Engineer-SC",
            "Administrative Officer",
            "Section Officer",
        ]

        dates = pd.date_range(
            start="2021-01-01",
            end="2025-12-31",
            freq="ME",
        )

        for i in range(1, 201):
            emp_id = f"SAMPLE{i:05d}"
            area = areas[i % len(areas)]
            div = divisions[i % len(divisions)]
            grp = groups[i % len(groups)]
            desig = desigs[i % len(desigs)]

            level = (
                "Level 13A"
                if "SG" in desig or "SF" in desig
                else "Level 11"
            )

            officer_type = "GO" if grp == "GROUP A" else "NGO"

            # One snapshot every six months across five years.
            for dt in dates[::6]:
                records.append(
                    {
                        "EMPLOYEECODE": emp_id,
                        "EMPLOYEENAME": f"Sample Employee {i}",
                        "DESIG": desig,
                        "SERVICESTATCODE": "SERVICE",
                        "DATEOFBIRTH": pd.Timestamp("1980-01-01"),
                        "DESGATTAINEDDT": pd.Timestamp("2015-01-01"),
                        "JOINISRODATE": (
                            pd.Timestamp("2005-01-01")
                            + pd.Timedelta(days=i * 15)
                        ),
                        "SUPERANNUATNDT": (
                            pd.Timestamp("2040-01-01")
                            - pd.Timedelta(days=i * 20)
                        ),
                        "BASICPAY": 80000 + (i * 200),
                        "LEVEL": level,
                        "AREA": area,
                        "DIVISION": div,
                        "PWD": "NO",
                        "RESERVCODE": "UR",
                        "RELIGION": "SAMPLE",
                        "SEX": "MALE" if i % 2 == 0 else "FEMALE",
                        "CATEGORY": "TECH",
                        "GROUP": grp,
                        "EXSERVICEMEN": "NO",
                        "OFFICERTYPE": officer_type,
                        "PFTYPE": "NPS",
                        "AS ON DATE": dt,
                    }
                )

        return pd.DataFrame(records)


# --------------------------------------------------
# Microsoft SQL Server Provider
# --------------------------------------------------

class MSSQLDatabaseProvider(IDatabaseProvider):
    """
    SQL Server provider.

    Configure DB_ENGINE=mssql and set MSSQL_CONNECTION_STRING
    in the environment or backend/.env before using this provider.
    """

    def __init__(self, connection_string: Optional[str] = None):
        self.connection_string = (
            connection_string
            or os.getenv("MSSQL_CONNECTION_STRING")
        )

        if not self.connection_string:
            raise ValueError(
                "MSSQL_CONNECTION_STRING must be configured "
                "to use the SQL Server provider."
            )

        self._engine = None

    def _get_engine(self):
        if self._engine is None:
            try:
                from sqlalchemy import create_engine

                self._engine = create_engine(
                    self.connection_string,
                    pool_pre_ping=True,
                )
            except ImportError as exc:
                raise ImportError(
                    "SQLAlchemy and pyodbc are required. "
                    "Install them with: py -m pip install sqlalchemy pyodbc"
                ) from exc

        return self._engine

    def get_manpower_data(self) -> pd.DataFrame:
        """Read manpower records from the existing StarSchema tables."""

        query = os.getenv(
            "MSSQL_QUERY",
            """
            SELECT
                e.EmployeeCode AS EMPLOYEECODE,
                e.EmployeeName AS EMPLOYEENAME,
                d.Designation AS DESIG,
                d.ServiceStatusCode AS SERVICESTATCODE,
                e.DateOfBirth AS DATEOFBIRTH,
                d.DesignationAttainedDate AS DESGATTAINEDDT,
                f.JoiningDate AS JOINISRODATE,
                f.RetirementDate AS SUPERANNUATNDT,
                f.BasicPay AS BASICPAY,
                d.Level AS LEVEL,
                o.Area AS AREA,
                o.Division AS DIVISION,
                e.PWD AS PWD,
                e.ReservationCode AS RESERVCODE,
                e.Religion AS RELIGION,
                e.Sex AS SEX,
                d.Category AS CATEGORY,
                d.[Group] AS [GROUP],
                e.ExServicemen AS EXSERVICEMEN,
                o.OfficerType AS OFFICERTYPE,
                o.PFType AS PFTYPE,
                dt.FullDate AS [AS ON DATE]
            FROM StarSchema.FactManpower AS f
            INNER JOIN StarSchema.DimEmployee AS e
                ON f.EmployeeKey = e.EmployeeKey
            INNER JOIN StarSchema.DimDesignation AS d
                ON f.DesignationKey = d.DesignationKey
            INNER JOIN StarSchema.DimOrganization AS o
                ON f.OrganizationKey = o.OrganizationKey
            INNER JOIN StarSchema.DimDate AS dt
                ON f.SnapshotDateKey = dt.DateKey;
            """,
        )

        engine = self._get_engine()

        with engine.connect() as connection:
            df = pd.read_sql_query(query, connection)

        date_cols = [
            "DATEOFBIRTH",
            "DESGATTAINEDDT",
            "JOINISRODATE",
            "SUPERANNUATNDT",
            "AS ON DATE",
        ]

        for col in date_cols:
            if col in df.columns:
                df[col] = pd.to_datetime(df[col], errors="coerce")

        str_cols = [
            "EMPLOYEECODE",
            "EMPLOYEENAME",
            "DESIG",
            "LEVEL",
            "AREA",
            "DIVISION",
            "GROUP",
            "OFFICERTYPE",
        ]

        for col in str_cols:
            if col in df.columns:
                df[col] = df[col].astype("string").str.strip()

        return df

    def is_connected(self) -> bool:
        """Test SQL Server connectivity."""

        try:
            from sqlalchemy import text

            engine = self._get_engine()

            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))

            return True

        except Exception:
            return False


# --------------------------------------------------
# Database Provider Factory
# --------------------------------------------------

def get_database_provider() -> IDatabaseProvider:
    """Select the configured data source."""

    engine_type = os.getenv("DB_ENGINE", "csv").strip().lower()

    if engine_type in ("mssql", "sqlserver", "sql_server"):
        return MSSQLDatabaseProvider()

    return CSVDataProvider()
