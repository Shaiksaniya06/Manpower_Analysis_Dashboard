import React from 'react';
import { 
  Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  PieChart as PieIcon, 
  ArrowUpRight, 
  Award,
  CheckCircle2,
  Clock
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

export default function OverviewView({ monthlyTrends, departmentData, genderDistribution, workModelDistribution, onNavigateTab }) {
  return (
    <div className="space-y-6">
      
      {/* Top Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Headcount Trajectory & Movement (Composed Chart) */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">Workforce Growth Trajectory</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">12-Month Headcount Evolution vs Monthly Talent Inflow & Outflow</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> Total Headcount
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Hires
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Exits
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="headcountGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} domain={[2300, 2550]} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} domain={[0, 90]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="headcount" name="Headcount" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#headcountGradient)" />
                <Bar yAxisId="right" dataKey="hires" name="New Hires" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={14} />
                <Bar yAxisId="right" dataKey="exits" name="Departures" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={14} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Net Workforce Expansion: <strong className="text-white">+100 personnel</strong> in last 12 months</span>
            <button 
              onClick={() => onNavigateTab && onNavigateTab('headcount')}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition"
            >
              Deep-dive Trends <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Diversity & Gender Composition */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
                <PieIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">Workforce Demographics</h3>
            </div>
            <p className="text-xs text-slate-400">Gender Distribution & Inclusion Balance</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {genderDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{item.value.toLocaleString()}</span>
                  <span className="font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <button 
              onClick={() => onNavigateTab && onNavigateTab('demographics')}
              className="w-full py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition flex items-center justify-center gap-1 border border-slate-700/60"
            >
              Explore Full Demographics <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Middle Row: Department Capacity & Work Arrangement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Headcount vs Target Capacity */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">Department Capacity & Headcount</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">Current Staffing vs Authorized Target Capacity</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> Active Staff
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600"></span> Approved Target
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
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
                <Bar dataKey="headcount" name="Current Staff" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="target" name="Target Capacity" fill="#475569" radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Overall Capacity Fulfillment: <strong className="text-emerald-400">95.4%</strong></span>
            <button 
              onClick={() => onNavigateTab && onNavigateTab('departments')}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition"
            >
              View Department Budgets <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Work Model Arrangement */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">Work Arrangement Model</h3>
            </div>
            <p className="text-xs text-slate-400">Workplace Flexibility & Remote Roster</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={workModelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {workModelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {workModelDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{item.value.toLocaleString()}</span>
                  <span className="font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <span className="text-[11px] text-slate-400">
              85% of workforce operates with remote or hybrid flexibility.
            </span>
          </div>
        </div>

      </div>

      {/* Strategic Signals & Operational Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Signal 1: Retention Health */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Retention Benchmark</h4>
            <p className="text-xs text-slate-300 mt-1">
              Annualized turnover is <strong>4.2%</strong>, outperforming the industry ceiling of 5.0%. Engineering retention reached an all-time high of 96.2%.
            </p>
          </div>
        </div>

        {/* Signal 2: Overtime & Wellbeing */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Overtime Relief</h4>
            <p className="text-xs text-slate-300 mt-1">
              Monthly overtime decreased by <strong>12.4%</strong> following the integration of 78 new hires in Q4, reducing burnout risk in Operations.
            </p>
          </div>
        </div>

        {/* Signal 3: Continuous Upskilling */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Upskilling & Training</h4>
            <p className="text-xs text-slate-300 mt-1">
              <strong>14,250 hours</strong> of certified technical & leadership training completed this quarter with an employee satisfaction score of 84/100.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
