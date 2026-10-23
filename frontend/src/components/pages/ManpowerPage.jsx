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

export default function ManpowerPage({ data }) {
  const sharedKpis = data?.kpis || {};
  const kpis = data?.manpower_kpi_metrics || {
    total_manpower: sharedKpis.total_manpower || 1248,
    male_count: 898,
    female_count: 350,
    in_service: 1185,
    sanctioned: sharedKpis.sanctioned_posts || 1480
  };

  const bySex = data?.employees_by_sex || [
    { name: 'Male', value: kpis.male_count, percentage: 72, color: '#2563eb' },
    { name: 'Female', value: kpis.female_count, percentage: 28, color: '#ec4899' }
  ];

  const byGroup = data?.employees_by_group || [
    { group: 'Group A', count: Math.round(kpis.total_manpower * 0.52), percentage: 52, color: '#2563eb' },
    { group: 'Group B', count: Math.round(kpis.total_manpower * 0.31), percentage: 31, color: '#10b981' },
    { group: 'Group C', count: Math.round(kpis.total_manpower * 0.17), percentage: 17, color: '#f59e0b' }
  ];

  const byServiceStatus = data?.employees_by_service_status || [
    { status: 'In-Service Regular', count: kpis.in_service, color: '#10b981' },
    { status: 'On Deputation', count: Math.round(kpis.total_manpower * 0.03), color: '#3b82f6' },
    { status: 'Probationary', count: Math.round(kpis.total_manpower * 0.02), color: '#f59e0b' }
  ];

  const areaWiseCategory = data?.area_wise_staff_category || [
    { area: 'MSA', technical: 348, admin: 102, auxiliary: 62 },
    { area: 'RSA', technical: 271, admin: 80, auxiliary: 48 },
    { area: 'ASDA', technical: 229, admin: 68, auxiliary: 40 }
  ];

  const byArea = data?.employees_by_area || [
    { area: 'MSA', count: Math.round(kpis.total_manpower * 0.41), color: '#0284c7' },
    { area: 'RSA', count: Math.round(kpis.total_manpower * 0.32), color: '#10b981' },
    { area: 'ASDA', count: Math.round(kpis.total_manpower * 0.27), color: '#8b5cf6' }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none">
      
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={sharedKpis} />

      {/* Charts Grid: 3 top + 2 bottom - Clean 1-Screen Fit */}
      <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
        
        {/* Top Row: Sex, Group, Service Status (3 compact cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1 min-h-0">
          
          {/* Chart 1: Employees by Sex */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#ec4899]"></span>
                Employees by Sex
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-around min-h-0 pt-1">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                    <Pie data={bySex} innerRadius={24} outerRadius={40} paddingAngle={4} dataKey="value">
                      {bySex.map((entry, idx) => (
                        <Cell key={`sex-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-xs">
                {bySex.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-slate-700 text-[10px]">{item.name}:</span>
                    <span className="font-bold text-slate-900 text-[10px]">{item.value.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Employee gender distribution
            </div>
          </div>

          {/* Chart 2: Employees by Group */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                Employees by Group
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byGroup} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="group" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="count" name="Staff Strength" fill="#2563eb" barSize={14} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="count" position="top" style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Workforce distribution by group
            </div>
          </div>

          {/* Chart 3: Employees by Service Status */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                Employees by Service Status
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={byServiceStatus} margin={{ top: 4, right: 35, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="status" type="category" tick={{ fontSize: 8.5, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={85} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="count" name="Count" fill="#10b981" radius={[0, 3, 3, 0]} barSize={10}>
                    <LabelList dataKey="count" position="right" style={{ fontSize: '8px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Employee count by service status
            </div>
          </div>

        </div>

        {/* Bottom Row: Area-wise Staff Category Distribution & Employees by Area (2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 min-h-0">
          
          {/* Chart 4: Area Wise Staff Category Distribution (Stacked Bar) */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
                Area Wise Staff Category Distribution
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={areaWiseCategory} margin={{ top: 4, right: 25, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={45} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="technical" name="Technical & Sci" stackId="a" fill="#2563eb" barSize={14}>
                    <LabelList dataKey="technical" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="admin" name="Administrative" stackId="a" fill="#10b981" barSize={14}>
                    <LabelList dataKey="admin" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="auxiliary" name="Auxiliary" stackId="a" fill="#f59e0b" barSize={14}>
                    <LabelList dataKey="auxiliary" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-3 text-[8px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563eb]"></span> Tech & Sci</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Admin</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> Auxiliary</span>
            </div>
          </div>

          {/* Chart 5: Employees by Area */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                Employees by Area
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={byArea} margin={{ top: 4, right: 35, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="count" name="Staff Count" fill="#0284c7" radius={[0, 3, 3, 0]} barSize={12}>
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

    </div>
  );
}
