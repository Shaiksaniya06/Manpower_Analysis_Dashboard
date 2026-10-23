import React, { useState } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Sliders, 
  UserPlus, 
  Clock,
  Calculator
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

export default function HeadcountView({ monthlyTrends, summaryMetrics }) {
  // Interactive Simulation State
  const [projectedHiresPerMonth, setProjectedHiresPerMonth] = useState(65);
  const [projectedAttritionRate, setProjectedAttritionRate] = useState(4.0); // % per year
  const [projectionMonths, setProjectionMonths] = useState(6);

  // Calculation for projection
  const currentHeadcount = summaryMetrics.totalHeadcount; // 2480
  const monthlyExitRate = (projectedAttritionRate / 100) / 12;
  
  // Generate projected forecast data points
  let runningHeadcount = currentHeadcount;
  const simulationData = [];
  const startMonthNames = ['Jan 27', 'Feb 27', 'Mar 27', 'Apr 27', 'May 27', 'Jun 27', 'Jul 27', 'Aug 27', 'Sep 27', 'Oct 27', 'Nov 27', 'Dec 27'];

  for (let i = 0; i < projectionMonths; i++) {
    const exitsThisMonth = Math.round(runningHeadcount * monthlyExitRate);
    const netChange = projectedHiresPerMonth - exitsThisMonth;
    runningHeadcount += netChange;
    simulationData.push({
      month: startMonthNames[i % 12],
      projectedHeadcount: runningHeadcount,
      hires: projectedHiresPerMonth,
      exits: exitsThisMonth,
      net: netChange,
      estimatedPayroll: (runningHeadcount * (summaryMetrics.avgAnnualSalary / 12) / 1000000).toFixed(2),
    });
  }

  const finalProjectedHeadcount = simulationData[simulationData.length - 1]?.projectedHeadcount || currentHeadcount;
  const netTotalGrowth = finalProjectedHeadcount - currentHeadcount;
  const finalProjectedPayroll = simulationData[simulationData.length - 1]?.estimatedPayroll || '19.1';

  return (
    <div className="space-y-6">
      
      {/* Top Section: Monthly Movement & Overtime Fatigue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Hires vs Exits */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">Monthly Hires vs Departures</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Hires
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Exits
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">Talent acquisition velocity compared to monthly exits</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hires" name="New Hires" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="exits" name="Departures" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Average Monthly Additions: <strong className="text-emerald-400">60 hires / mo</strong></span>
            <span>Average Exits: <strong className="text-rose-400">21 exits / mo</strong></span>
          </div>
        </div>

        {/* Overtime Hours & Burnout Relief */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">Workforce Overtime & Fatigue Index</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                -14.1% Since Peak
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Total monthly overtime hours across engineering and operations</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="overtimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[3800, 5200]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="overtimeHours" name="Overtime Hours" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#overtimeGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Peak: <strong>4,900 hrs (Jan)</strong></span>
            <span>Current: <strong className="text-emerald-400">4,210 hrs (Dec)</strong></span>
          </div>
        </div>

      </div>

      {/* Interactive Predictive Manpower Simulation Engine */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                  Interactive Workforce Growth Simulator
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Predictive Modeling
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Simulate future headcount trajectory, net additions, and compensation cost by adjusting hiring and retention levers.
                </p>
              </div>
            </div>

            {/* Projection Duration Selector */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-slate-400">Horizon:</span>
              {[3, 6, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setProjectionMonths(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    projectionMonths === m
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Controls & Live Simulation Output */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Levers / Sliders */}
            <div className="space-y-5 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Simulation Levers
              </span>

              {/* Slider 1: Monthly Hiring Target */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Target Monthly Hires:</span>
                  <span className="font-mono font-bold text-emerald-400">{projectedHiresPerMonth} hires/mo</span>
                </div>
                <input
                  id="hiring-slider"
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={projectedHiresPerMonth}
                  onChange={(e) => setProjectedHiresPerMonth(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>20 (Conservative)</span>
                  <span>70 (Baseline)</span>
                  <span>120 (Aggressive)</span>
                </div>
              </div>

              {/* Slider 2: Annual Attrition Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Target Annual Attrition:</span>
                  <span className="font-mono font-bold text-purple-400">{projectedAttritionRate}% / yr</span>
                </div>
                <input
                  id="attrition-slider"
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.2"
                  value={projectedAttritionRate}
                  onChange={(e) => setProjectedAttritionRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>2.0% (Elite Retention)</span>
                  <span>4.2% (Current)</span>
                  <span>8.0% (High Churn)</span>
                </div>
              </div>

              {/* Projected Summary Cards */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] block">Projected Headcount</span>
                  <span className="text-lg font-bold text-white">{finalProjectedHeadcount.toLocaleString()}</span>
                  <span className="text-[11px] text-emerald-400 block">+{netTotalGrowth} net</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
                  <span className="text-slate-400 text-[10px] block">Est. Monthly Payroll</span>
                  <span className="text-lg font-bold text-white">${finalProjectedPayroll}M</span>
                  <span className="text-[11px] text-indigo-400 block">per month</span>
                </div>
              </div>
            </div>

            {/* Simulated Forecast Chart */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 font-semibold">Simulated Growth Horizon ({projectionMonths} Months)</span>
                <span className="text-xs text-indigo-400">Baseline Starting: {currentHeadcount.toLocaleString()}</span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="simGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 50', 'dataMax + 50']} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="projectedHeadcount" name="Simulated Headcount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#simGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-slate-400 mt-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
                💡 <strong className="text-slate-200">Executive Insight:</strong> At {projectedHiresPerMonth} hires/month with {projectedAttritionRate}% attrition, your organization will expand to <strong className="text-white">{finalProjectedHeadcount.toLocaleString()} employees</strong> over the next {projectionMonths} months, requiring an additional <strong>${((parseFloat(finalProjectedPayroll) - 19.1)).toFixed(2)}M/month</strong> in operating compensation budget.
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
