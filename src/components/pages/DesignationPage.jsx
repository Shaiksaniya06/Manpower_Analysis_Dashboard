import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import KpiCardsRow from '../KpiCardsRow';

export default function DesignationPage({ data }) {
  const sharedKpis = data?.kpis || {};
  const kpis = data?.designation_kpi_metrics || {
    total_designations: 9,
    levels_active: 8,
    avg_basic_pay: '₹98,450',
    sanctioned_cadre: sharedKpis.sanctioned_posts || 1480
  };

  const byDesignation = data?.employees_by_designation || [
    { designation: 'Sci/Eng-SG', count: 200 },
    { designation: 'Sci/Eng-SF', count: 275 },
    { designation: 'Sci/Eng-SE', count: 300 },
    { designation: 'Sci/Eng-SD', count: 224 },
    { designation: 'Sci/Eng-SC', count: 100 },
    { designation: 'Admin Officer', count: 62 },
    { designation: 'Section Officer', count: 87 }
  ];

  const summaryByLevel = data?.summary_by_level || [
    { level: 'Level 14', count: 75 },
    { level: 'Level 13A', count: 225 },
    { level: 'Level 12', count: 175 },
    { level: 'Level 11', count: 250 },
    { level: 'Level 10', count: 200 },
    { level: 'Level 8', count: 150 },
    { level: 'Level 7', count: 99 },
    { level: 'Level 6 & below', count: 74 }
  ];

  const byStaffCategory = data?.designation_by_staff_category || [
    { category: 'Technical (Sci/Eng)', count: 848, color: '#2563eb' },
    { category: 'Administrative Officers', count: 250, color: '#10b981' },
    { category: 'Auxiliary & Support', count: 150, color: '#f59e0b' }
  ];

  const byArea = data?.designation_by_area || [
    { area: 'MSA', seniorSci: 82, leadEng: 122, techAdmin: 308 },
    { area: 'RSA', seniorSci: 64, leadEng: 95, techAdmin: 240 },
    { area: 'ASDA', seniorSci: 54, leadEng: 83, techAdmin: 200 }
  ];

  const avgPay = data?.average_basic_pay_by_designation || [
    { designation: 'Sci/Eng-SG', avg_pay: 182400 },
    { designation: 'Sci/Eng-SF', avg_pay: 144200 },
    { designation: 'Sci/Eng-SE', avg_pay: 118500 },
    { designation: 'Sci/Eng-SD', avg_pay: 88700 },
    { designation: 'Sci/Eng-SC', avg_pay: 67700 },
    { designation: 'Admin Off.', avg_pay: 78800 },
    { designation: 'Sec. Off.', avg_pay: 65400 }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none">
      
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={sharedKpis} />

      {/* Charts Grid: 3 top + 2 bottom - Clean 1-Screen Fit */}
      <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
        
        {/* Top Row: Employees by Designation, Summary by Level, Designation by Staff Category (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1 min-h-0">
          
          {/* Chart 1: Employees by Designation */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1e70bf]"></span>
                Employees by Designation
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={byDesignation} margin={{ top: 4, right: 35, left: 15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="designation" type="category" tick={{ fontSize: 8.5, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="count" name="Count" fill="#1e70bf" radius={[0, 3, 3, 0]} barSize={10}>
                    <LabelList dataKey="count" position="right" style={{ fontSize: '8px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Employee distribution by designation
            </div>
          </div>

          {/* Chart 2: Summary by Level */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
                Summary by Level
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summaryByLevel} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="level" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="count" name="Staff Count" fill="#8b5cf6" barSize={12} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="count" position="top" style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Employee count across pay levels
            </div>
          </div>

          {/* Chart 3: Designation by Staff Category */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                Designation by Staff Category
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-around min-h-0 pt-1">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                    <Pie data={byStaffCategory} innerRadius={24} outerRadius={40} paddingAngle={3} dataKey="count">
                      {byStaffCategory.map((entry, idx) => (
                        <Cell key={`cat-desig-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-xs max-w-[190px] w-full">
                {byStaffCategory.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between gap-1 p-0.5 rounded">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                      <span className="font-semibold text-slate-700 text-[9px] truncate">{cat.category}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-[9px] shrink-0">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Workforce distribution by staff category
            </div>
          </div>

        </div>

        {/* Bottom Row: Designation by Area & Average Basic Pay by Designation (2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 min-h-0">
          
          {/* Chart 4: Designation by Area (Stacked Bar) */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                Designation by Area
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={byArea} margin={{ top: 4, right: 25, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="seniorSci" name="Senior Sci (SG/SF)" stackId="a" fill="#2563eb" barSize={14}>
                    <LabelList dataKey="seniorSci" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="leadEng" name="Lead Eng (SE/SD)" stackId="a" fill="#10b981" barSize={14}>
                    <LabelList dataKey="leadEng" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="techAdmin" name="Tech & Admin" stackId="a" fill="#f59e0b" barSize={14}>
                    <LabelList dataKey="techAdmin" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-3 text-[8px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563eb]"></span> Senior Sci</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Lead Eng</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> Tech & Admin</span>
            </div>
          </div>

          {/* Chart 5: Average Basic Pay by Designation */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#0d9488]"></span>
                Average Basic Pay by Designation (₹)
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgPay} margin={{ top: 8, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="designation" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `₹${v/1000}k`} tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} formatter={(val) => [`₹${val.toLocaleString()}`, 'Avg Pay']} />
                  <Bar dataKey="avg_pay" name="Avg Basic Pay" fill="#0d9488" barSize={13} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="avg_pay" position="top" formatter={(v) => `₹${Math.round(v/1000)}k`} style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Average basic pay by designation (₹)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
