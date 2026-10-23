import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  UserMinus, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb
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

export default function AttritionView({ attritionReasons, departmentData }) {
  const exitTypeData = [
    { name: 'Voluntary Resignations', value: 82, count: 213, color: '#6366f1' },
    { name: 'Involuntary Departures / Restructuring', value: 18, count: 47, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <UserMinus className="w-5 h-5 text-purple-400" />
          Attrition Analytics & Retention Intelligence
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Deep-dive analysis into employee turnover, exit interview reasons, departmental flight risks, and proactive retention levers.
        </p>
      </div>

      {/* Top Row: Exit Drivers & Voluntary vs Involuntary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Primary Exit Drivers (BarChart) */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Primary Drivers of Employee Departures</h3>
              <p className="text-xs text-slate-400 mt-0.5">Aggregated from structured exit interview surveys</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              260 Total Exits Analyzed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attritionReasons} layout="vertical" margin={{ top: 10, right: 30, left: 140, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 45]} unit="%" tickLine={false} />
                <YAxis type="category" dataKey="reason" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" name="Percentage of Exits" radius={[0, 6, 6, 0]} maxBarSize={20}>
                  {attritionReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Leading Cause: <strong className="text-indigo-400">Career Advancement & Growth (38%)</strong></span>
            <span>Secondary: <strong className="text-pink-400">Compensation (28%)</strong></span>
          </div>
        </div>

        {/* Voluntary vs Involuntary Exit Breakdown */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white tracking-wide">Exit Classification</h3>
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldAlert className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xs text-slate-400">Voluntary resignations vs mutual separations</p>
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={exitTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {exitTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {exitTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            High voluntary percentage indicates market demand for company talent.
          </div>
        </div>

      </div>

      {/* Department Flight Risk Matrix & Actionable Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Churn Assessment Table */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white tracking-wide mb-1">
            Department Attrition & Risk Matrix
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Identifying departments operating above baseline target turnover
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Staff</th>
                  <th className="pb-3 font-semibold">Attrition Rate</th>
                  <th className="pb-3 font-semibold">Risk Level</th>
                  <th className="pb-3 font-semibold">Primary Factor</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {departmentData.map((dept) => {
                  const isHigh = dept.attritionRate >= 5.5;
                  const isMedium = dept.attritionRate >= 4.0 && dept.attritionRate < 5.5;

                  return (
                    <tr key={dept.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3 font-semibold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }}></span>
                        {dept.name}
                      </td>
                      <td className="py-3 text-slate-300">{dept.headcount}</td>
                      <td className="py-3 font-mono font-bold text-white">{dept.attritionRate}%</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          isHigh 
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' 
                            : isMedium 
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {isHigh ? 'Elevated' : isMedium ? 'Moderate' : 'Stable'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">
                        {dept.id === 'sales' ? 'Commission targets & quotas' :
                         dept.id === 'cs' ? 'Shift schedules & compensation' :
                         dept.id === 'eng' ? 'Tech stack advancement' :
                         'Career pathways'}
                      </td>
                      <td className="py-3 text-xs">
                        {isHigh ? (
                          <span className="text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Retention Review
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Within Spec
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Retention Interventions */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">Recommended Actions</h3>
            </div>
            <p className="text-xs text-slate-400">
              AI-driven retention interventions for executive HR teams
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <span className="font-bold text-indigo-300 block mb-1">1. Sales Incentive Restructuring</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Sales attrition (6.2%) can be mitigated by adjusting Q1 accelerator tiers and introducing team quota milestones.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <span className="font-bold text-emerald-300 block mb-1">2. Accelerated Engineering Ladders</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Offer senior IC tracks (Principal & Staff level) to prevent key technical staff departures seeking title advancement.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <span className="font-bold text-amber-300 block mb-1">3. Customer Support Wellness Caps</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cap support queue overtime hours to 8 hours/week maximum to combat burnout symptoms.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-400">
              Targeted retention programs have saved <strong>$1.4M</strong> in replacement recruitment costs.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
