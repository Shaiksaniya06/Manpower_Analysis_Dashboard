/**
 * Frontend API Service with automatic fallback to client-side analytical data engine.
 * Seamlessly connects to FastAPI at http://127.0.0.1:8000
 */
const API_BASE = 'https://manpower-analysis-dashboard.onrender.com/api';


export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { online: true, ...data };
    }
  } catch (err) {
    // Backend offline
  }
  return { online: false };
}

export async function fetchFiltersFromApi() {
  try {
    const res = await fetch(`${API_BASE}/filters`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Return null to use client defaults
  }
  return null;
}

export async function fetchSectionData(section, filters) {
  try {
    const res = await fetch(`${API_BASE}/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
      signal: AbortSignal.timeout(2500)
    });
    if (res.ok) {
      const data = await res.json();
      // Ensure local client fallback fields are blended if any specific audio fields are absent
      const local = computeLocalSectionData(section, filters);
      return { data: { ...local, ...data }, fromBackend: true };
    }
  } catch (e) {
    // Fallback to client-side computation
  }

  // Client-side fallback computation
  return { data: computeLocalSectionData(section, filters), fromBackend: false };
}

// ==========================================
// CLIENT-SIDE ANALYTICAL DATA ENGINE
// ==========================================
function computeLocalMultiplier(filters) {
  let m = 1.0;
  if (filters.area === 'MSA') m *= 0.41;
  else if (filters.area === 'RSA') m *= 0.32;
  else if (filters.area === 'ASDA') m *= 0.27;

  if (filters.group === 'GROUP A') m *= 0.52;
  else if (filters.group === 'GROUP B') m *= 0.31;
  else if (filters.group === 'GROUP C') m *= 0.17;

  if (filters.division && filters.division !== 'All') m *= 0.22;
  if (filters.level && filters.level !== 'All') m *= 0.16;
  if (filters.designation && filters.designation !== 'All') m *= 0.14;
  if (filters.officer_type && filters.officer_type !== 'All') m *= 0.65;

  return Math.max(0.08, m);
}

function computeLocalKpis(filters) {
  const mult = computeLocalMultiplier(filters);
  const manpower = Math.round(1248 * mult);
  const sanctioned = Math.round(1480 * mult);
  const vacancies = Math.max(0, sanctioned - manpower);
  const joining = Math.round(142 * mult);
  const retirement = Math.round(118 * mult);
  const attrition_rate = '3.2%';

  return {
    total_manpower: manpower,
    total_joining: joining,
    total_retirement: retirement,
    sanctioned_posts: sanctioned,
    vacancies: vacancies,
    attrition_rate: attrition_rate
  };
}

export function computeLocalSectionData(section, filters) {
  const kpis = computeLocalKpis(filters);
  const total = kpis.total_manpower;
  const join = kpis.total_joining;
  const ret = kpis.total_retirement;

  if (section === 'overview') {
    return {
      kpis,
      employee_count_trend_12m: [
        { month: 'Nov 24', headcount: Math.round(total * 0.94) },
        { month: 'Dec 24', headcount: Math.round(total * 0.95) },
        { month: 'Jan 25', headcount: Math.round(total * 0.95) },
        { month: 'Feb 25', headcount: Math.round(total * 0.96) },
        { month: 'Mar 25', headcount: Math.round(total * 0.97) },
        { month: 'Apr 25', headcount: Math.round(total * 0.97) },
        { month: 'May 25', headcount: Math.round(total * 0.98) },
        { month: 'Jun 25', headcount: Math.round(total * 0.98) },
        { month: 'Jul 25', headcount: Math.round(total * 0.99) },
        { month: 'Aug 25', headcount: Math.round(total * 0.99) },
        { month: 'Sep 25', headcount: Math.round(total * 1.00) },
        { month: 'Oct 25', headcount: total }
      ],
      joining_and_retirement_trend: [
        { year: '2021', joining: Math.round(join * 0.16), retirement: Math.round(ret * 0.18), net_change: Math.round(join * 0.16 - ret * 0.18) },
        { year: '2022', joining: Math.round(join * 0.18), retirement: Math.round(ret * 0.19), net_change: Math.round(join * 0.18 - ret * 0.19) },
        { year: '2023', joining: Math.round(join * 0.22), retirement: Math.round(ret * 0.20), net_change: Math.round(join * 0.22 - ret * 0.20) },
        { year: '2024', joining: Math.round(join * 0.24), retirement: Math.round(ret * 0.21), net_change: Math.round(join * 0.24 - ret * 0.21) },
        { year: '2025', joining: Math.round(join * 0.20), retirement: Math.round(ret * 0.22), net_change: Math.round(join * 0.20 - ret * 0.22) }
      ],
      employees_by_staff_category: [
        { category: 'Technical & Scientific', count: Math.round(total * 0.68), percentage: 68, color: '#2563eb' },
        { category: 'Administrative & Accounts', count: Math.round(total * 0.20), percentage: 20, color: '#10b981' },
        { category: 'Auxiliary & Support', count: Math.round(total * 0.12), percentage: 12, color: '#f59e0b' }
      ],
      employees_by_area: [
        { area: 'MSA (Earth Station)', count: Math.round(total * 0.41), percentage: 41, color: '#0284c7' },
        { area: 'RSA (Regional Centers)', count: Math.round(total * 0.32), percentage: 32, color: '#10b981' },
        { area: 'ASDA (Aerial Services)', count: Math.round(total * 0.27), percentage: 27, color: '#8b5cf6' }
      ]
    };
  }

  if (section === 'manpower') {
    const maleCount = Math.round(total * 0.72);
    const femaleCount = total - maleCount;
    return {
      kpis,
      manpower_kpi_metrics: {
        total_manpower: total,
        male_count: maleCount,
        female_count: femaleCount,
        in_service: Math.round(total * 0.95),
        sanctioned: kpis.sanctioned_posts
      },
      employees_by_sex: [
        { name: 'Male', value: maleCount, percentage: 72, color: '#2563eb' },
        { name: 'Female', value: femaleCount, percentage: 28, color: '#ec4899' }
      ],
      employees_by_group: [
        { group: 'Group A', count: Math.round(total * 0.52), percentage: 52, color: '#2563eb' },
        { group: 'Group B', count: Math.round(total * 0.31), percentage: 31, color: '#10b981' },
        { group: 'Group C', count: Math.round(total * 0.17), percentage: 17, color: '#f59e0b' }
      ],
      employees_by_service_status: [
        { status: 'In-Service Regular', count: Math.round(total * 0.95), color: '#10b981' },
        { status: 'On Deputation', count: Math.max(1, Math.round(total * 0.03)), color: '#3b82f6' },
        { status: 'Probationary', count: Math.max(1, Math.round(total * 0.02)), color: '#f59e0b' }
      ],
      area_wise_staff_category: [
        { area: 'MSA', technical: Math.round(total * 0.41 * 0.68), admin: Math.round(total * 0.41 * 0.20), auxiliary: Math.round(total * 0.41 * 0.12) },
        { area: 'RSA', technical: Math.round(total * 0.32 * 0.68), admin: Math.round(total * 0.32 * 0.20), auxiliary: Math.round(total * 0.32 * 0.12) },
        { area: 'ASDA', technical: Math.round(total * 0.27 * 0.68), admin: Math.round(total * 0.27 * 0.20), auxiliary: Math.round(total * 0.27 * 0.12) }
      ],
      employees_by_area: [
        { area: 'MSA', count: Math.round(total * 0.41), color: '#0284c7' },
        { area: 'RSA', count: Math.round(total * 0.32), color: '#10b981' },
        { area: 'ASDA', count: Math.round(total * 0.27), color: '#8b5cf6' }
      ]
    };
  }

  if (section === 'joining') {
    return {
      kpis,
      joining_kpi_metrics: {
        total_joining: join,
        last_12m: Math.max(1, Math.round(join * 0.26)),
        direct_icrb: Math.round(join * 0.74),
        lateral: Math.round(join * 0.26)
      },
      joining_trend_12m: [
        { month: 'Nov 24', joinings: Math.max(1, Math.round(join * 0.08)) },
        { month: 'Dec 24', joinings: Math.max(1, Math.round(join * 0.06)) },
        { month: 'Jan 25', joinings: Math.max(1, Math.round(join * 0.10)) },
        { month: 'Feb 25', joinings: Math.max(1, Math.round(join * 0.07)) },
        { month: 'Mar 25', joinings: Math.max(1, Math.round(join * 0.09)) },
        { month: 'Apr 25', joinings: Math.max(1, Math.round(join * 0.08)) },
        { month: 'May 25', joinings: Math.max(1, Math.round(join * 0.11)) },
        { month: 'Jun 25', joinings: Math.max(1, Math.round(join * 0.09)) },
        { month: 'Jul 25', joinings: Math.max(1, Math.round(join * 0.12)) },
        { month: 'Aug 25', joinings: Math.max(1, Math.round(join * 0.07)) },
        { month: 'Sep 25', joinings: Math.max(1, Math.round(join * 0.08)) },
        { month: 'Oct 25', joinings: Math.max(1, Math.round(join * 0.05)) }
      ],
      joining_by_area: [
        { area: 'MSA', joinings: Math.round(join * 0.44), color: '#0284c7' },
        { area: 'RSA', joinings: Math.round(join * 0.32), color: '#10b981' },
        { area: 'ASDA', joinings: Math.round(join * 0.24), color: '#8b5cf6' }
      ],
      joining_by_division: [
        { division: 'HRD', joinings: Math.round(join * 0.32) },
        { division: 'MISD', joinings: Math.round(join * 0.26) },
        { division: 'ASD', joinings: Math.round(join * 0.18) },
        { division: 'BND', joinings: Math.round(join * 0.12) },
        { division: 'G&CD', joinings: Math.round(join * 0.08) },
        { division: 'AD', joinings: Math.round(join * 0.04) }
      ],
      joining_by_staff_category: [
        { category: 'Technical (Group A)', joinings: Math.round(join * 0.58), color: '#2563eb' },
        { category: 'Administrative (Group B)', joinings: Math.round(join * 0.28), color: '#10b981' },
        { category: 'Auxiliary (Group C)', joinings: Math.round(join * 0.14), color: '#f59e0b' }
      ]
    };
  }

  if (section === 'retirement') {
    return {
      kpis,
      retirement_kpi_metrics: {
        total_retirement: ret,
        superannuation_60: Math.round(ret * 0.88),
        voluntary_exits: Math.round(ret * 0.12),
        nearing_retirement: Math.round(ret * 0.32)
      },
      retirement_trend_by_year: [
        { year: '2020', retirements: Math.max(1, Math.round(ret * 0.14)), superannuation: Math.round(ret * 0.12), voluntary: Math.round(ret * 0.02) },
        { year: '2021', retirements: Math.max(1, Math.round(ret * 0.16)), superannuation: Math.round(ret * 0.14), voluntary: Math.round(ret * 0.02) },
        { year: '2022', retirements: Math.max(1, Math.round(ret * 0.18)), superannuation: Math.round(ret * 0.16), voluntary: Math.round(ret * 0.02) },
        { year: '2023', retirements: Math.max(1, Math.round(ret * 0.19)), superannuation: Math.round(ret * 0.17), voluntary: Math.round(ret * 0.02) },
        { year: '2024', retirements: Math.max(1, Math.round(ret * 0.21)), superannuation: Math.round(ret * 0.18), voluntary: Math.round(ret * 0.03) },
        { year: '2025', retirements: Math.max(1, Math.round(ret * 0.12)), superannuation: Math.round(ret * 0.10), voluntary: Math.round(ret * 0.02) }
      ],
      retirements_by_area: [
        { area: 'MSA', retirements: Math.round(ret * 0.42), color: '#0284c7' },
        { area: 'RSA', retirements: Math.round(ret * 0.33), color: '#10b981' },
        { area: 'ASDA', retirements: Math.round(ret * 0.25), color: '#8b5cf6' }
      ],
      retirement_by_staff_category: [
        { category: 'Technical Staff', retirements: Math.round(ret * 0.58), color: '#ef4444' },
        { category: 'Administrative Staff', retirements: Math.round(ret * 0.27), color: '#f97316' },
        { category: 'Auxiliary Staff', retirements: Math.round(ret * 0.15), color: '#8b5cf6' }
      ],
      retirements_by_designation: [
        { designation: 'Sci/Eng-SG', count: Math.round(ret * 0.27) },
        { designation: 'Sci/Eng-SF', count: Math.round(ret * 0.22) },
        { designation: 'Sci/Eng-SE', count: Math.round(ret * 0.18) },
        { designation: 'Sci/Eng-SD', count: Math.round(ret * 0.15) },
        { designation: 'Admin Officer', count: Math.round(ret * 0.10) },
        { designation: 'Section Officer', count: Math.round(ret * 0.08) }
      ]
    };
  }

  if (section === 'attrition') {
    const histYears = ['2021', '2022', '2023', '2024', '2025'];
    const histRates = [2.8, 3.1, 3.4, 3.2, 3.6];
    const histMultipliers = [0.933, 0.952, 0.970, 0.987, 1.0];
    const forecastYears = ['2026', '2027', '2028', '2029', '2030'];
    const forecastMultipliers = [1.011, 1.024, 1.038, 1.050, 1.061];
    const forecastRates = [3.3, 3.4, 3.5, 3.5, 3.6];

    const employee_count_forecast_5y = [
      ...histYears.map((yr, idx) => {
        const count = Math.round(total * histMultipliers[idx]);
        const isCur = yr === '2025';
        const netChg = count - total;
        return {
          year: yr,
          period: isCur ? '2025 (Present)' : yr,
          present_count: count,
          forecast_count: isCur ? count : null,
          employee_count: count,
          attrition_rate: histRates[idx],
          projected_exits: Math.max(1, Math.round(count * (histRates[idx] / 100))),
          net_change: netChg,
          net_change_pct: Number(((netChg / Math.max(1, total)) * 100).toFixed(1)),
          is_present: true,
          is_current: isCur,
          is_forecast: false,
          type: 'Present'
        };
      }),
      ...forecastYears.map((yr, idx) => {
        const count = Math.round(total * forecastMultipliers[idx]);
        const spread = Math.round(count * (0.012 + idx * 0.005));
        const netChg = count - total;
        return {
          year: yr,
          period: `${yr} (F)`,
          present_count: null,
          forecast_count: count,
          employee_count: count,
          upper_count: count + spread,
          lower_count: count - spread,
          attrition_rate: forecastRates[idx],
          projected_exits: Math.max(1, Math.round(count * (forecastRates[idx] / 100))),
          net_change: netChg,
          net_change_pct: Number(((netChg / Math.max(1, total)) * 100).toFixed(1)),
          is_present: false,
          is_current: false,
          is_forecast: true,
          type: 'Forecast'
        };
      })
    ];

    return {
      kpis,
      attrition_kpi_metrics: {
        attrition_rate: '3.2%',
        total_exits: Math.round(total * 0.032),
        voluntary_pct: '78.5%',
        stability_score: '96.8%'
      },
      employee_count_forecast_5y,
      overall_attrition_rate_over_time: [
        { year: '2021', rate: 2.8 },
        { year: '2022', rate: 3.1 },
        { year: '2023', rate: 3.4 },
        { year: '2024', rate: 3.2 },
        { year: '2025', rate: 3.6 }
      ],
      attrition_rate_by_staff_category: [
        { category: 'Technical (Sci/Eng)', rate: 2.9, color: '#2563eb' },
        { category: 'Administrative', rate: 3.8, color: '#10b981' },
        { category: 'Auxiliary & Support', rate: 4.2, color: '#f59e0b' }
      ],
      joining_and_retirement_trend: [
        { year: '2021', joining: Math.round(join * 0.16), retirement: Math.round(ret * 0.18) },
        { year: '2022', joining: Math.round(join * 0.18), retirement: Math.round(ret * 0.19) },
        { year: '2023', joining: Math.round(join * 0.22), retirement: Math.round(ret * 0.20) },
        { year: '2024', joining: Math.round(join * 0.24), retirement: Math.round(ret * 0.21) },
        { year: '2025', joining: Math.round(join * 0.20), retirement: Math.round(ret * 0.22) }
      ],
      attrition_rate_by_area: [
        { area: 'MSA', rate: 3.1, color: '#0284c7' },
        { area: 'RSA', rate: 3.3, color: '#10b981' },
        { area: 'ASDA', rate: 3.7, color: '#8b5cf6' }
      ],
      exits_by_group_and_area: [
        { area: 'MSA', groupA: 9, groupB: 5, groupC: 2 },
        { area: 'RSA', groupA: 7, groupB: 4, groupC: 2 },
        { area: 'ASDA', groupA: 6, groupB: 4, groupC: 2 }
      ]
    };
  }

  // designation
  return {
    kpis,
    designation_kpi_metrics: {
      total_designations: 9,
      levels_active: 8,
      avg_basic_pay: '₹98,450',
      sanctioned_cadre: kpis.sanctioned_posts
    },
    employees_by_designation: [
      { designation: 'Sci/Eng-SG', count: Math.round(total * 0.16) },
      { designation: 'Sci/Eng-SF', count: Math.round(total * 0.22) },
      { designation: 'Sci/Eng-SE', count: Math.round(total * 0.24) },
      { designation: 'Sci/Eng-SD', count: Math.round(total * 0.18) },
      { designation: 'Sci/Eng-SC', count: Math.round(total * 0.08) },
      { designation: 'Admin Officer', count: Math.round(total * 0.05) },
      { designation: 'Section Officer', count: Math.round(total * 0.07) }
    ],
    summary_by_level: [
      { level: 'Level 14', count: Math.round(total * 0.06) },
      { level: 'Level 13A', count: Math.round(total * 0.18) },
      { level: 'Level 12', count: Math.round(total * 0.14) },
      { level: 'Level 11', count: Math.round(total * 0.20) },
      { level: 'Level 10', count: Math.round(total * 0.16) },
      { level: 'Level 8', count: Math.round(total * 0.12) },
      { level: 'Level 7', count: Math.round(total * 0.08) },
      { level: 'Level 6 & below', count: Math.round(total * 0.06) }
    ],
    designation_by_staff_category: [
      { category: 'Technical (Sci/Eng)', count: Math.round(total * 0.68), color: '#2563eb' },
      { category: 'Administrative Officers', count: Math.round(total * 0.20), color: '#10b981' },
      { category: 'Auxiliary & Support', count: Math.round(total * 0.12), color: '#f59e0b' }
    ],
    designation_by_area: [
      { area: 'MSA', seniorSci: Math.round(total * 0.41 * 0.38), leadEng: Math.round(total * 0.41 * 0.30), techAdmin: Math.round(total * 0.41 * 0.32) },
      { area: 'RSA', seniorSci: Math.round(total * 0.32 * 0.38), leadEng: Math.round(total * 0.32 * 0.30), techAdmin: Math.round(total * 0.32 * 0.32) },
      { area: 'ASDA', seniorSci: Math.round(total * 0.27 * 0.38), leadEng: Math.round(total * 0.27 * 0.30), techAdmin: Math.round(total * 0.27 * 0.32) }
    ],
    average_basic_pay_by_designation: [
      { designation: 'Sci/Eng-SG', avg_pay: 182400 },
      { designation: 'Sci/Eng-SF', avg_pay: 144200 },
      { designation: 'Sci/Eng-SE', avg_pay: 118500 },
      { designation: 'Sci/Eng-SD', avg_pay: 88700 },
      { designation: 'Sci/Eng-SC', avg_pay: 67700 },
      { designation: 'Admin Officer', avg_pay: 78800 },
      { designation: 'Section Officer', avg_pay: 65400 }
    ]
  };
}
