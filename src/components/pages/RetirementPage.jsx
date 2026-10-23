import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

export default function RetirementPage({ data }) {
  const sharedKpis = data?.kpis || {};
  const kpis = data?.retirement_kpi_metrics || {
    total_retirement: sharedKpis.total_retirement || 118,
    superannuation_60: 104,
    voluntary_exits: 14,
    nearing_retirement: 38
  };

  const trendByYear = data?.retirement_trend_by_year || [
    { year: '2020', retirements: 16 },
    { year: '2021', retirements: 19 },
    { year: '2022', retirements: 21 },
    { year: '2023', retirements: 22 },
    { year: '2024', retirements: 25 },
    { year: '2025', retirements: 15 }
  ];

  const byArea = data?.retirements_by_area || [
    { area: 'MSA', retirements: Math.round(kpis.total_retirement * 0.42), color: '#0284c7' },
    { area: 'RSA', retirements: Math.round(kpis.total_retirement * 0.33), color: '#10b981' },
    { area: 'ASDA', retirements: Math.round(kpis.total_retirement * 0.25), color: '#8b5cf6' }
  ];

  const byStaffCategory = data?.retirement_by_staff_category || [
    { category: 'Technical Staff', retirements: Math.round(kpis.total_retirement * 0.58), color: '#ef4444' },
    { category: 'Administrative Staff', retirements: Math.round(kpis.total_retirement * 0.27), color: '#f97316' },
    { category: 'Auxiliary Staff', retirements: Math.round(kpis.total_retirement * 0.15), color: '#8b5cf6' }
  ];

  const byDesignation = data?.retirements_by_designation || [
    { designation: 'Sci/Eng-SG', count: Math.round(kpis.total_retirement * 0.27) },
    { designation: 'Sci/Eng-SF', count: Math.round(kpis.total_retirement * 0.22) },
    { designation: 'Sci/Eng-SE', count: Math.round(kpis.total_retirement * 0.18) },
    { designation: 'Sci/Eng-SD', count: Math.round(kpis.total_retirement * 0.15) },
    { designation: 'Admin Officer', count: Math.round(kpis.total_retirement * 0.10) },
    { designation: 'Section Officer', count: Math.round(kpis.total_retirement * 0.08) }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none">
      
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={sharedKpis} />

      {/* 2x2 Clean Chart Cards Grid - Fits on One Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0">
        
        {/* Chart 1: Retirement Trend by Year */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
              Retirement Trend by Year
            </h3>
            <span className="text-[9.5px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              2020 – 2025
            </span>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendByYear} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Line type="monotone" dataKey="retirements" name="Retirements" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3, fill: '#e11d48' }}>
                  <LabelList dataKey="retirements" position="top" style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Annual retirement trend over time
          </div>
        </div>

        {/* Chart 2: Retirements by Area */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
              Retirements by Area
            </h3>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={byArea} margin={{ top: 4, right: 35, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="retirements" name="Retirements" fill="#ea580c" radius={[0, 3, 3, 0]} barSize={12}>
                  <LabelList dataKey="retirements" position="right" style={{ fontSize: '8.5px', fill: '#0f172a', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Retirement distribution by operational area
          </div>
        </div>

        {/* Chart 3: Retirement by Staff Category */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
              Retirement by Staff Category
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-around min-h-0 pt-1">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Pie data={byStaffCategory} innerRadius={28} outerRadius={46} paddingAngle={3} dataKey="retirements">
                    {byStaffCategory.map((entry, idx) => (
                      <Cell key={`ret-cat-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-[#1e293b]">{kpis.total_retirement?.toLocaleString()}</span>
                <span className="text-[7.5px] uppercase tracking-wider text-[#64748b] font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-xs max-w-[210px] w-full">
              {byStaffCategory.map((cat) => {
                const pct = Math.round((cat.retirements / (kpis.total_retirement || 1)) * 100);
                return (
                  <div key={cat.category} className="flex items-center justify-between gap-2 p-1 rounded bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                      <span className="font-semibold text-slate-700 text-[9.5px] truncate">{cat.category}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-slate-900 text-[9.5px]">{cat.retirements.toLocaleString()}</span>
                      <span className="text-[8px] text-slate-500 block">({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Retirements by staff category
          </div>
        </div>

        {/* Chart 4: Retirements by Designation */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
              Retirements by Designation
            </h3>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={byDesignation} margin={{ top: 4, right: 35, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="designation" type="category" tick={{ fontSize: 8.5, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="count" name="Retirements" fill="#e11d48" radius={[0, 3, 3, 0]} barSize={11}>
                  <LabelList dataKey="count" position="right" style={{ fontSize: '8px', fill: '#0f172a', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Retirement count by designation
          </div>
        </div>

      </div>

    </div>
  );
}
