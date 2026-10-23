import React from 'react';
import {
  AreaChart,
  Area,
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

export default function OverviewPage({ data }) {
  const kpis = data?.kpis || {};
  const totalHeadcount = kpis.total_manpower || 1248;
  const sanctioned = kpis.sanctioned_posts || 1480;
  const joinings = kpis.total_joining || 142;
  const retirements = kpis.total_retirement || 118;

  const trend12m = data?.employee_count_trend_12m || [
    { month: 'Nov 24', headcount: 1180 },
    { month: 'Dec 24', headcount: 1188 },
    { month: 'Jan 25', headcount: 1195 },
    { month: 'Feb 25', headcount: 1202 },
    { month: 'Mar 25', headcount: 1210 },
    { month: 'Apr 25', headcount: 1218 },
    { month: 'May 25', headcount: 1225 },
    { month: 'Jun 25', headcount: 1230 },
    { month: 'Jul 25', headcount: 1238 },
    { month: 'Aug 25', headcount: 1242 },
    { month: 'Sep 25', headcount: 1245 },
    { month: 'Oct 25', headcount: totalHeadcount }
  ];

  const joinRetTrend = data?.joining_and_retirement_trend || [
    { year: '2021', joining: 23, retirement: 21 },
    { year: '2022', joining: 26, retirement: 22 },
    { year: '2023', joining: 31, retirement: 24 },
    { year: '2024', joining: 34, retirement: 25 },
    { year: '2025', joining: 28, retirement: 26 }
  ];

  const staffCategory = data?.employees_by_staff_category || [
    { category: 'Technical & Scientific', count: Math.round(totalHeadcount * 0.68), percentage: 68, color: '#2563eb' },
    { category: 'Administrative & Accounts', count: Math.round(totalHeadcount * 0.20), percentage: 20, color: '#10b981' },
    { category: 'Auxiliary & Support', count: Math.round(totalHeadcount * 0.12), percentage: 12, color: '#f59e0b' }
  ];

  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '8px', fontWeight: 700 }}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const areaDistribution = data?.employees_by_area || [
    { area: 'MSA (Shadnagar)', count: Math.round(totalHeadcount * 0.41), color: '#0284c7' },
    { area: 'RSA (Regional)', count: Math.round(totalHeadcount * 0.32), color: '#10b981' },
    { area: 'ASDA (Aerial)', count: Math.round(totalHeadcount * 0.27), color: '#8b5cf6' }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none">
      
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={kpis} />

      {/* 2x2 Clean Chart Cards Grid - Fits on One Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0">
        
        {/* Chart 1: Employee Count Trend Last 12 Months */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
              Employee Count Trend (Last 12 Months)
            </h3>
            <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              Nov 24 – Oct 25
            </span>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend12m} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGrad12" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 30', 'dataMax + 25']} tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Area type="monotone" dataKey="headcount" name="Headcount" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#trendGrad12)">
                  <LabelList dataKey="headcount" position="top" style={{ fontSize: '7.5px', fill: '#1e293b', fontWeight: 600 }} />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Monthly employee count trend
          </div>
        </div>

        {/* Chart 2: Joining and Retirement Trend */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Joining & Retirement Trend
            </h3>
            <span className="text-[9.5px] font-bold text-slate-500">2021 – 2025</span>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={joinRetTrend} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="joining" name="Joining" fill="#10b981" barSize={10} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="joining" position="top" style={{ fontSize: '7.5px', fill: '#059669', fontWeight: 600 }} />
                </Bar>
                <Bar dataKey="retirement" name="Retirement" fill="#e11d48" barSize={10} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="retirement" position="top" style={{ fontSize: '7.5px', fill: '#e11d48', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-[8.5px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Joining Inflow
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span> Retirement Outflow
            </span>
          </div>
        </div>

        {/* Chart 3: Employees by Staff Category */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
              Employees by Staff Category
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-around min-h-0 pt-1">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Pie data={staffCategory} innerRadius={28} outerRadius={46} paddingAngle={3} dataKey="count" labelLine={false} label={renderPieLabel}>
                    {staffCategory.map((entry, idx) => (
                      <Cell key={`cat-cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-[#1e293b]">{totalHeadcount.toLocaleString()}</span>
                <span className="text-[7.5px] uppercase tracking-wider text-[#64748b] font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-xs max-w-[210px] w-full">
              {staffCategory.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between gap-2 p-1 rounded bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="font-semibold text-slate-700 text-[9.5px] truncate">{cat.category}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-slate-900 text-[9.5px]">{cat.count.toLocaleString()}</span>
                    <span className="text-[8px] text-slate-500 block">({cat.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Workforce distribution by staff category
          </div>
        </div>

        {/* Chart 4: Employees by Area */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              Employees by Area
            </h3>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={areaDistribution} margin={{ top: 4, right: 35, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="count" name="Staff Strength" fill="#0284c7" radius={[0, 3, 3, 0]} barSize={12}>
                  <LabelList dataKey="count" position="right" style={{ fontSize: '8.5px', fill: '#0f172a', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Employee distribution by operational area
          </div>
        </div>

      </div>

    </div>
  );
}
