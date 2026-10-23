import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  UserPlus
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1 z-50">
        <p className="font-semibold text-white border-b border-slate-800 pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}:
            </span>
            <span className="font-mono font-bold text-slate-200">
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RecruitmentView({ recruitmentPipeline, openRequisitionsList }) {
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredReqs = priorityFilter === 'all' 
    ? openRequisitionsList 
    : openRequisitionsList.filter((req) => req.priority.toLowerCase() === priorityFilter.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-400" />
          Talent Acquisition & Recruitment Pipeline
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Monitoring end-to-end recruitment funnel conversions, hiring velocity, time-to-fill, and active requisitions.
        </p>
      </div>

      {/* Recruitment Funnel & Velocity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recruitment Pipeline Funnel */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Candidate Pipeline Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">Current quarter candidate flow across evaluation stages</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Conversion: 2.3% Inflow to Hired
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruitmentPipeline} layout="vertical" margin={{ top: 10, right: 30, left: 130, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Candidates" fill="#6366f1" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {recruitmentPipeline.map((entry, index) => {
                    const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#a855f7', '#ec4899', '#10b981'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Inflow: <strong>3,420 Applicants</strong></span>
            <span>Offers Extended: <strong className="text-pink-400">92 Offers</strong></span>
            <span>Joined: <strong className="text-emerald-400">78 New Hires</strong></span>
          </div>
        </div>

        {/* Talent Acquisition KPI Snapshot */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide mb-1">Talent Velocity KPIs</h3>
            <p className="text-xs text-slate-400">Key performance indicators for hiring efficiency</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Avg Time-to-Fill</span>
                <span className="font-mono font-bold text-white text-base">28 Days</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">4 days faster than industry average (32d)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Offer Acceptance Rate</span>
                <span className="font-mono font-bold text-white text-base">84.8%</span>
              </div>
              <span className="text-[10px] text-indigo-400 mt-1 block">78 accepted out of 92 offers extended</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Average Cost-per-Hire</span>
                <span className="font-mono font-bold text-white text-base">$4,200</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Includes sourcing, assessment & tech stacks</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Currently <strong>64 total open roles</strong> authorized across enterprise.
          </div>
        </div>

      </div>

      {/* Priority Open Requisitions Table */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Active Talent Requisitions ({filteredReqs.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">High-impact vacancies actively sourcing candidates</p>
          </div>

          {/* Filter by priority */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Priority:</span>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              {['all', 'critical', 'high', 'medium'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition ${
                    priorityFilter === p
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Req ID</th>
                <th className="pb-3 font-semibold">Position Title</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Openings</th>
                <th className="pb-3 font-semibold">Applicants</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReqs.map((req) => (
                <tr key={req.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 font-mono font-medium text-slate-400">{req.id}</td>
                  <td className="py-3 font-semibold text-white">{req.role}</td>
                  <td className="py-3 text-slate-300">{req.department}</td>
                  <td className="py-3 text-slate-400">{req.location}</td>
                  <td className="py-3 font-bold text-white">{req.openings}</td>
                  <td className="py-3 font-mono text-indigo-400">{req.applicants} Candidates</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                      req.priority === 'Critical'
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : req.priority === 'High'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => alert(`Reviewing applicants for ${req.role} (${req.id})`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition font-medium"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
