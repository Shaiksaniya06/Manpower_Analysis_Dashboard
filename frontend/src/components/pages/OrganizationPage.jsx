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
import {
  manpowerByArea,
  manpowerByDivision,
  manpowerByGroup,
  sanctionedVsActualByDivision
} from '../../data/powerBiData';
import { Building2, Layers, MapPin, Users } from 'lucide-react';

export default function OrganizationPage() {
  return (
    <div className="space-y-2.5">
      
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="pbi-card p-2.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#1e70bf] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3 Key Areas</div>
            <div className="text-[10px] text-slate-500 font-medium">MSA, RSA & ASDA</div>
          </div>
        </div>

        <div className="pbi-card p-2.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-[#4338ca] shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">5 Divisions</div>
            <div className="text-[10px] text-slate-500 font-medium">Core Science & Tech Units</div>
          </div>
        </div>

        <div className="pbi-card p-2.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-[#059669] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">3 Cadre Groups</div>
            <div className="text-[10px] text-slate-500 font-medium">Group A, Group B & Group C</div>
          </div>
        </div>

        <div className="pbi-card p-2.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-[#7c3aed] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 leading-tight">4,346 Manpower</div>
            <div className="text-[10px] text-slate-500 font-medium">89.6% Sanctioned Occupancy</div>
          </div>
        </div>
      </div>

      {/* 2x2 Charts Grid for Organizational Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        
        {/* Chart 1: Manpower by Area */}
        <div className="pbi-card p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="pbi-card-title">Manpower by Area</h3>
            <span className="text-[10px] font-medium text-[#64748b]">Regional Deployment</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={manpowerByArea}
                margin={{ top: 8, right: 35, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 2000]} ticks={[0, 500, 1000, 1500, 2000]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }} />
                <Bar dataKey="count" name="Staff Count" fill="#1e70bf" radius={[0, 2, 2, 0]} barSize={16}>
                  <LabelList dataKey="count" position="right" style={{ fontSize: '9px', fill: '#1e293b', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[9px] text-[#64748b] pt-1 border-t border-[#f1f5f9]">
            MSA: 1,765 (40.6%) • RSA: 1,377 (31.7%) • ASDA: 1,205 (27.7%)
          </div>
        </div>

        {/* Chart 2: Manpower by Division */}
        <div className="pbi-card p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="pbi-card-title">Manpower by Division</h3>
            <span className="text-[10px] font-medium text-[#64748b]">Departmental Capacity</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={manpowerByDivision}
                margin={{ top: 8, right: 35, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 1600]} ticks={[0, 400, 800, 1200, 1600]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="division" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }} />
                <Bar dataKey="count" name="Employees" fill="#0284c7" radius={[0, 2, 2, 0]} barSize={14}>
                  <LabelList dataKey="count" position="right" style={{ fontSize: '9px', fill: '#1e293b', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[9px] text-[#64748b] pt-1 border-t border-[#f1f5f9]">
            Earth Observation leads staffing with 1,420 dedicated specialists
          </div>
        </div>

        {/* Chart 3: Manpower by Group */}
        <div className="pbi-card p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="pbi-card-title">Manpower by Group</h3>
            <span className="text-[10px] font-medium text-[#64748b]">Cadre Proportions</span>
          </div>
          <div className="flex items-center justify-around h-56">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }} />
                  <Pie
                    data={manpowerByGroup}
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {manpowerByGroup.map((entry, idx) => (
                      <Cell key={`org-group-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-black text-[#1e293b]">4K</span>
                <span className="text-[8px] uppercase tracking-wider text-[#64748b]">Employees</span>
              </div>
            </div>
            {/* Details */}
            <div className="space-y-2 text-xs">
              {manpowerByGroup.map((grp) => (
                <div key={grp.name} className="flex items-center justify-between gap-4 p-1.5 rounded bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: grp.color }}></span>
                    <span className="font-semibold text-slate-700 text-[11px]">{grp.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-[11px]">{grp.value.toLocaleString()}</span>
                    <span className="text-[9px] text-slate-500 block">({grp.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-[9px] text-[#64748b] pt-1 border-t border-[#f1f5f9]">
            Group A represents scientific core; Group B & C provide engineering & support
          </div>
        </div>

        {/* Chart 4: Division-wise Sanctioned vs Actual Manpower */}
        <div className="pbi-card p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="pbi-card-title">Division-wise Sanctioned vs Actual</h3>
            <span className="text-[10px] font-medium text-[#64748b]">Occupancy & Vacancies</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sanctionedVsActualByDivision} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="division" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 1800]} ticks={[0, 600, 1200, 1800]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }} />
                <Bar dataKey="sanctioned" name="Sanctioned" fill="#93c5fd" barSize={12} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="sanctioned" position="top" style={{ fontSize: '8px', fill: '#64748b' }} />
                </Bar>
                <Bar dataKey="actual" name="Actual" fill="#1e3a8a" barSize={12} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="actual" position="top" style={{ fontSize: '8px', fill: '#1e293b', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-[9px] text-[#475569] font-medium pt-1 border-t border-[#f1f5f9]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#93c5fd]"></span> Sanctioned Posts (Total: 4,850)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span> Actual Staff (Total: 4,346)
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
