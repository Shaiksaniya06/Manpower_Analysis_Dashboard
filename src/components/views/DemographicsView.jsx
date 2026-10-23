import React from 'react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users2, 
  Globe2
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

export default function DemographicsView({ 
  ageGroupDistribution, 
  genderDistribution, 
  workModelDistribution, 
  tenureDistribution, 
  departmentData 
}) {
  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <Users2 className="w-5 h-5 text-pink-400" />
          Workforce Demographics & Diversity Profile
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Detailed insights into age distribution, gender representation across departments, tenure maturity, and work models.
        </p>
      </div>

      {/* Top 2 Charts: Age Profile & Department Gender Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Age Bracket Distribution */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Age Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Generational distribution across the organization</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Median Age: 32 Years
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="group" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Employees" fill="#818cf8" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {ageGroupDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-5 gap-2 text-center text-xs">
            {ageGroupDistribution.map((d) => (
              <div key={d.group} className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                <span className="text-slate-400 text-[10px] block truncate">{d.group}</span>
                <span className="font-bold text-white text-xs">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution across Departments */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Gender Balance by Department</h3>
              <p className="text-xs text-slate-400 mt-0.5">Staffing breakdown by functional division</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Male
              </span>
              <span className="flex items-center gap-1 text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span> Female
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Other
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  interval={0} 
                  angle={-25} 
                  textAnchor="end"
                  tickLine={false} 
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="male" name="Male" stackId="a" fill="#3b82f6" maxBarSize={22} />
                <Bar dataKey="female" name="Female" stackId="a" fill="#ec4899" maxBarSize={22} />
                <Bar dataKey="other" name="Other" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              {genderDistribution.map(g => (
                <span key={g.name} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }}></span>
                  {g.name}: <strong className="text-white">{g.percentage}%</strong>
                </span>
              ))}
            </div>
            <span>Non-majority Ratio: <strong className="text-purple-400">46.2%</strong></span>
          </div>
        </div>

      </div>

      {/* Bottom 2 Charts: Tenure Maturity & Work Arrangement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tenure Maturity Profile */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Workforce Tenure Maturity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Length of service distribution across active staff</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Avg Tenure: 3.6 Yrs
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenureDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Employees" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Core Anchor Workforce (&gt;3 yrs): <strong className="text-white">47.5%</strong></span>
            <span>Fresh Talent (&lt;1 yr): <strong className="text-emerald-400">21.0%</strong></span>
          </div>
        </div>

        {/* Global Work Model Setup */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Workplace Model Flexibility</h3>
                <p className="text-xs text-slate-400 mt-0.5">Adoption of remote, hybrid, and onsite working modes</p>
              </div>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4 my-3">
              {workModelDistribution.map((item) => (
                <div key={item.name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-white">{item.value.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Workplace Satisfaction Index: <strong className="text-emerald-400">88% Positive</strong></span>
            <span>Office Footprint Optimization: <strong className="text-indigo-400">Efficient</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}
