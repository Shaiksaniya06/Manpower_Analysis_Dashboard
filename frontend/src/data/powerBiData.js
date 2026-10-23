// Dataset matching the NRSC Manpower Analysis Power BI Dashboard

export const initialFilters = {
  joinDateStart: '2018-01-01',
  joinDateEnd: '2025-12-31',
  joiningDateStart: '1998-05-14',
  joiningDateEnd: '2025-12-31',
  retirementDateStart: '2018-01-01',
  retirementDateEnd: '2080-12-31',
  area: 'All',
  division: 'All',
  group: 'All',
  level: 'All',
  desig: 'All',
  officerType: 'All',
};

export const filterOptions = {
  area: ['All', 'MSA', 'RSA', 'ASDA'],
  division: ['All', 'Earth Observation', 'Data Processing', 'Geospatial Applications', 'Instrumentation', 'Quality & Safety'],
  group: ['All', 'GROUP A', 'GROUP B', 'GROUP C'],
  level: [
    'All',
    'Level 10',
    'Level 11',
    'Level 13A',
    'Level 14',
    'Level 2',
    'Level 4',
    'Level 5',
    'Level 6',
    'Level 7',
    'Level 8',
  ],
  desig: [
    'All',
    'Scientist/Engineer',
    'Technical Officer',
    'Administrative Officer',
    'Scientific Assistant',
    'Technician',
  ],
  officerType: ['All', 'Gazetted', 'Non-Gazetted'],
};

// 1. MANPOWER PAGE DATA
export const manpowerMetrics = {
  totalManpower: 4346,
  sanctionedPosts: 4850,
  vacancies: 504,
  currentManpower: 4346,
  joinings: 1455,
  retirements: 371,
};

export const sanctionedVsActualByDivision = [
  { division: 'Earth Observation', sanctioned: 1580, actual: 1420, vacancies: 160 },
  { division: 'Data Processing', sanctioned: 1180, actual: 1050, vacancies: 130 },
  { division: 'Geospatial Apps', sanctioned: 990, actual: 890, vacancies: 100 },
  { division: 'Instrumentation', sanctioned: 640, actual: 580, vacancies: 60 },
  { division: 'Quality & Safety', sanctioned: 460, actual: 406, vacancies: 54 },
];

export const manpowerByDivision = [
  { division: 'Earth Observation', count: 1420 },
  { division: 'Data Processing', count: 1050 },
  { division: 'Geospatial Apps', count: 890 },
  { division: 'Instrumentation', count: 580 },
  { division: 'Quality & Safety', count: 406 },
];

export const manpowerByGroup = [
  { name: 'GROUP A', value: 2168, percent: 49.88, color: '#1e70bf' },
  { name: 'GROUP B', value: 1405, percent: 32.34, color: '#00b4d8' },
  { name: 'GROUP C', value: 773, percent: 17.77, color: '#f28e2b' },
];

export const manpowerTrendOverTime = [
  { year: '2020', headcount: 3820, target: 4000 },
  { year: '2021', headcount: 3950, target: 4150 },
  { year: '2022', headcount: 4110, target: 4300 },
  { year: '2023', headcount: 4230, target: 4500 },
  { year: '2024', headcount: 4290, target: 4650 },
  { year: '2025', headcount: 4346, target: 4850 },
];

// 2. JOINING PAGE DATA
export const joiningMetrics = {
  totalJoinings: 1455,
  joiningsThisYear: 183,
  joiningsThisMonth: 28,
  newEmployees: 78,
};

export const joiningsOverTime = [
  { year: '2020', joinings: 342 },
  { year: '2021', joinings: 280 },
  { year: '2022', joinings: 220 },
  { year: '2023', joinings: 190 },
  { year: '2024', joinings: 240 },
  { year: '2025', joinings: 183 },
];

export const joiningsByDivision = [
  { division: 'Earth Observation', joinings: 465 },
  { division: 'Geospatial Apps', joinings: 352 },
  { division: 'Data Processing', joinings: 318 },
  { division: 'Instrumentation', joinings: 195 },
  { division: 'Quality & Safety', joinings: 125 },
];

export const joiningsByDesignation = [
  { designation: 'Scientist/Eng', count: 680 },
  { designation: 'Technical Off', count: 340 },
  { designation: 'Scientific Asst', count: 210 },
  { designation: 'Admin Officer', count: 140 },
  { designation: 'Technician', count: 85 },
];

export const joiningsByGroup = [
  { name: 'GROUP A', value: 757, percent: 52.0, color: '#1e70bf' },
  { name: 'GROUP B', value: 451, percent: 31.0, color: '#00b4d8' },
  { name: 'GROUP C', value: 247, percent: 17.0, color: '#f28e2b' },
];

// 3. RETIREMENT PAGE DATA
export const retirementMetrics = {
  totalRetirements: 371,
  retirementsThisYear: 111,
  retirementsNextYear: 138,
  employeesNearingRetirement: 245,
};

export const retirementTrend = [
  { year: '2020', retirements: 38 },
  { year: '2021', retirements: 42 },
  { year: '2022', retirements: 52 },
  { year: '2023', retirements: 61 },
  { year: '2024', retirements: 67 },
  { year: '2025', retirements: 111 },
];

export const retirementsByDivision = [
  { division: 'Earth Observation', count: 110 },
  { division: 'Data Processing', count: 88 },
  { division: 'Geospatial Apps', count: 74 },
  { division: 'Instrumentation', count: 58 },
  { division: 'Quality & Safety', count: 41 },
];

export const retirementForecast = [
  { year: '2025', actual: 111, forecast: 111 },
  { year: '2026', actual: null, forecast: 138 },
  { year: '2027', actual: null, forecast: 155 },
  { year: '2028', actual: null, forecast: 142 },
  { year: '2029', actual: null, forecast: 160 },
  { year: '2030', actual: null, forecast: 175 },
];

export const retirementsByYear = [
  { year: '2020', count: 38 },
  { year: '2021', count: 42 },
  { year: '2022', count: 52 },
  { year: '2023', count: 61 },
  { year: '2024', count: 67 },
  { year: '2025', count: 111 },
];

// 4. ATTRITION PAGE DATA
export const attritionMetrics = {
  attritionRate: 8.5,
  totalAttrition: 361,
  voluntaryAttrition: 284,
  involuntaryAttrition: 77,
};

export const attritionTrend = [
  { month: 'Jan', rate: 7.2, benchmark: 5.0 },
  { month: 'Feb', rate: 7.5, benchmark: 5.0 },
  { month: 'Mar', rate: 8.1, benchmark: 5.0 },
  { month: 'Apr', rate: 8.3, benchmark: 5.0 },
  { month: 'May', rate: 8.0, benchmark: 5.0 },
  { month: 'Jun', rate: 8.4, benchmark: 5.0 },
  { month: 'Jul', rate: 8.6, benchmark: 5.0 },
  { month: 'Aug', rate: 8.8, benchmark: 5.0 },
  { month: 'Sep', rate: 8.7, benchmark: 5.0 },
  { month: 'Oct', rate: 8.9, benchmark: 5.0 },
  { month: 'Nov', rate: 8.6, benchmark: 5.0 },
  { month: 'Dec', rate: 8.5, benchmark: 5.0 },
];

export const attritionByDivision = [
  { division: 'Earth Observation', exits: 118, rate: 8.3 },
  { division: 'Data Processing', exits: 92, rate: 8.7 },
  { division: 'Geospatial Apps', exits: 76, rate: 8.5 },
  { division: 'Instrumentation', exits: 45, rate: 7.8 },
  { division: 'Quality & Safety', exits: 30, rate: 7.4 },
];

export const attritionByGroup = [
  { name: 'GROUP A', value: 159, percent: 44.0, color: '#1e70bf' },
  { name: 'GROUP B', value: 137, percent: 38.0, color: '#00b4d8' },
  { name: 'GROUP C', value: 65, percent: 18.0, color: '#f28e2b' },
];

// 5. ORGANIZATION PAGE DATA
export const manpowerByArea = [
  { area: 'MSA', count: 1765, sanctioned: 1950 },
  { area: 'RSA', count: 1377, sanctioned: 1540 },
  { area: 'ASDA', count: 1205, sanctioned: 1360 },
];

// 6. DESIGNATION PAGE DATA
export const employeeCountByDesignation = [
  { designation: 'Scientist/Engineer', count: 1840, vacancies: 190, sanctioned: 2030 },
  { designation: 'Technical Officer', count: 1020, vacancies: 120, sanctioned: 1140 },
  { designation: 'Scientific Assistant', count: 680, vacancies: 95, sanctioned: 775 },
  { designation: 'Administrative Officer', count: 460, vacancies: 55, sanctioned: 515 },
  { designation: 'Technician', count: 346, vacancies: 44, sanctioned: 390 },
];

export const designationDistributionByDivision = [
  {
    division: 'Earth Observation',
    scientist: 650,
    techOfficer: 340,
    sciAssistant: 210,
    admin: 130,
    technician: 90,
  },
  {
    division: 'Data Processing',
    scientist: 480,
    techOfficer: 260,
    sciAssistant: 160,
    admin: 90,
    technician: 60,
  },
  {
    division: 'Geospatial Apps',
    scientist: 400,
    techOfficer: 210,
    sciAssistant: 140,
    admin: 80,
    technician: 60,
  },
  {
    division: 'Instrumentation',
    scientist: 190,
    techOfficer: 130,
    sciAssistant: 110,
    admin: 90,
    technician: 60,
  },
  {
    division: 'Quality & Safety',
    scientist: 120,
    techOfficer: 80,
    sciAssistant: 60,
    admin: 70,
    technician: 76,
  },
];

// Reference dataset from overview page
export const employeesBySex = [
  { name: 'MALE', value: 2955, label: 'MALE 2K', color: '#1e70bf' },
  { name: 'FEMALE', value: 1391, label: 'FEMALE 2K', color: '#e05697' },
];

export const employeesByArea = [
  { area: 'MSA', count: 1765 },
  { area: 'RSA', count: 1377 },
  { area: 'ASDA', count: 1205 },
];

export const areaStaffCategoryDistribution = [
  { area: 'MSA', administrative: 18.44, scientist: 52.06, technical: 29.49 },
  { area: 'RSA', administrative: 29.72, scientist: 54.89, technical: 15.39 },
  { area: 'ASDA', administrative: 22.27, scientist: 47.02, technical: 30.70 },
];

export const summaryByLevel = [
  { level: 'Level 10', employees: 768, joinings: 268, retirements: 65 },
  { level: 'Level 11', employees: 680, joinings: 180, retirements: 48 },
  { level: 'Level 13A', employees: 475, joinings: 133, retirements: 32 },
  { level: 'Level 14', employees: 285, joinings: 82, retirements: 24 },
  { level: 'Level 2', employees: 37, joinings: 37, retirements: 0 },
  { level: 'Level 4', employees: 142, joinings: 22, retirements: 12 },
  { level: 'Level 5', employees: 547, joinings: 264, retirements: 45 },
  { level: 'Level 6', employees: 376, joinings: 108, retirements: 30 },
  { level: 'Level 7', employees: 399, joinings: 127, retirements: 35 },
  { level: 'Level 8', employees: 642, joinings: 162, retirements: 52 },
];
