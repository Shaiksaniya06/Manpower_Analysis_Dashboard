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

export default function JoiningPage({ data }) {
  const sharedKpis = data?.kpis || {};
  const kpis = data?.joining_kpi_metrics || {
    total_joining: sharedKpis.total_joining || 142,
    last_12m: 38,
    direct_icrb: 105,
    lateral: 37
  };

  const trend12m = data?.joining_trend_12m || [
    { month: 'Nov 24', joinings: 3 },
    { month: 'Dec 24', joinings: 2 },
    { month: 'Jan 25', joinings: 4 },
    { month: 'Feb 25', joinings: 3 },
    { month: 'Mar 25', joinings: 4 },
    { month: 'Apr 25', joinings: 3 },
    { month: 'May 25', joinings: 5 },
    { month: 'Jun 25', joinings: 4 },
    { month: 'Jul 25', joinings: 5 },
    { month: 'Aug 25', joinings: 3 },
    { month: 'Sep 25', joinings: 4 },
    { month: 'Oct 25', joinings: 2 }
  ];

  const byArea = data?.joining_by_area || [
    { area: 'MSA', joinings: Math.round(kpis.total_joining * 0.44), color: '#0284c7' },
    { area: 'RSA', joinings: Math.round(kpis.total_joining * 0.32), color: '#10b981' },
    { area: 'ASDA', joinings: Math.round(kpis.total_joining * 0.24), color: '#8b5cf6' }
  ];

  const byDivision = data?.joining_by_division || [
    { division: 'HRD', joinings: Math.round(kpis.total_joining * 0.32) },
    { division: 'MISD', joinings: Math.round(kpis.total_joining * 0.26) },
    { division: 'ASD', joinings: Math.round(kpis.total_joining * 0.18) },
    { division: 'BND', joinings: Math.round(kpis.total_joining * 0.12) },
    { division: 'G&CD', joinings: Math.round(kpis.total_joining * 0.08) },
    { division: 'AD', joinings: Math.round(kpis.total_joining * 0.04) }
  ];

  const byStaffCategory = data?.joining_by_staff_category || [
    { category: 'Technical (Group A)', joinings: Math.round(kpis.total_joining * 0.58), color: '#2563eb' },
    { category: 'Administrative (Group B)', joinings: Math.round(kpis.total_joining * 0.28), color: '#10b981' },
    { category: 'Auxiliary (Group C)', joinings: Math.round(kpis.total_joining * 0.14), color: '#f59e0b' }
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

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none">
      
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={sharedKpis} />

      {/* 2x2 Clean Chart Cards Grid - Fits on One Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0">
        
        {/* Chart 1: Joining Trend Last 12 Months */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Joining Trend (Last 12 Months)
            </h3>
            <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Nov 24 – Oct 25
            </span>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend12m} margin={{ top: 12, right: 12, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="joinGrad12" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 'dataMax + 1.5']} tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Area type="monotone" dataKey="joinings" name="Joinings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#joinGrad12)">
                  <LabelList dataKey="joinings" position="top" style={{ fontSize: '7.5px', fill: '#059669', fontWeight: 600 }} />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Monthly employee joining trend
          </div>
        </div>

        {/* Chart 2: Joining by Area */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              Joining by Area
            </h3>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={byArea} margin={{ top: 4, right: 35, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="joinings" name="Inductions" fill="#0284c7" radius={[0, 3, 3, 0]} barSize={12}>
                  <LabelList dataKey="joinings" position="right" style={{ fontSize: '8.5px', fill: '#0f172a', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Joining distribution by operational area
          </div>
        </div>

        {/* Chart 3: Joining by Division */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
              Joining by Division
            </h3>
          </div>
          <div className="flex-1 w-full min-h-0 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={byDivision} margin={{ top: 4, right: 35, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="division" type="category" tick={{ fontSize: 8.5, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                <Bar dataKey="joinings" name="Inductions" fill="#2563eb" radius={[0, 3, 3, 0]} barSize={11}>
                  <LabelList dataKey="joinings" position="right" style={{ fontSize: '8px', fill: '#0f172a', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Employee joinings by division
          </div>
        </div>

        {/* Chart 4: Joining by Staff Category or Group */}
        <div className="pbi-card p-2 flex flex-col justify-between h-[calc((100vh-175px)/2)] min-h-[160px]">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
              Joining by Staff Category / Group
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-around min-h-0 pt-1">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Pie data={byStaffCategory} innerRadius={28} outerRadius={46} paddingAngle={3} dataKey="joinings" labelLine={false} label={renderPieLabel}>
                    {byStaffCategory.map((entry, idx) => (
                      <Cell key={`join-cat-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-[#1e293b]">{kpis.total_joining?.toLocaleString()}</span>
                <span className="text-[7.5px] uppercase tracking-wider text-[#64748b] font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-xs max-w-[210px] w-full">
              {byStaffCategory.map((cat) => {
                const pct = Math.round((cat.joinings / (kpis.total_joining || 1)) * 100);
                return (
                  <div key={cat.category} className="flex items-center justify-between gap-2 p-1 rounded bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                      <span className="font-semibold text-slate-700 text-[9.5px] truncate">{cat.category}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-slate-900 text-[9.5px]">{cat.joinings.toLocaleString()}</span>
                      <span className="text-[8px] text-slate-500 block">({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
            Joinings by staff category
          </div>
        </div>

      </div>

    </div>
  );
}
