import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, ReferenceLine 
} from 'recharts';
import { 
  Building2, 
  ArrowUpRight,
  Filter
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

export default function DepartmentView({ departmentData, onSelectDepartment }) {
  const [sortField, setSortField] = useState('headcount');

  const sortedDepts = [...departmentData].sort((a, b) => {
    if (sortField === 'headcount') return b.headcount - a.headcount;
    if (sortField === 'attrition') return b.attritionRate - a.attritionRate;
    if (sortField === 'budget') return b.allocatedBudget - a.allocatedBudget;
    if (sortField === 'salary') return b.avgSalary - a.avgSalary;
    return 0;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header with Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Department Capacity & Budget Allocation
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-functional analysis of staffing levels, approved budgets, compensation, and attrition rates.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sort By:
          </span>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'headcount', label: 'Headcount' },
              { id: 'budget', label: 'Budget' },
              { id: 'attrition', label: 'Attrition' },
              { id: 'salary', label: 'Avg Comp' },
            ].map((sort) => (
              <button
                key={sort.id}
                onClick={() => setSortField(sort.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  sortField === sort.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {sortedDepts.map((dept) => {
          const budgetPercent = Math.round((dept.actualSpend / dept.allocatedBudget) * 100);
          const capacityPercent = Math.round((dept.headcount / dept.target) * 100);

          return (
            <div
              key={dept.id}
              className="glass-card p-4 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">
                      {dept.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">Led by {dept.lead}</p>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: dept.color }}
                    title={dept.name}
                  ></span>
                </div>

                {/* Headcount vs Target */}
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Headcount vs Target:</span>
                    <span className="font-mono font-bold text-white">
                      {dept.headcount} / <span className="text-slate-400">{dept.target}</span>
                    </span>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Staffing Fulfillment</span>
                    <span className="font-semibold text-slate-300">{capacityPercent}%</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/40">
                    <span className="text-[10px] text-slate-400 block">Annual Budget</span>
                    <span className="font-bold text-white">${dept.allocatedBudget}M</span>
                    <span className="text-[10px] text-emerald-400 block">${dept.actualSpend}M ({budgetPercent}%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/40">
                    <span className="text-[10px] text-slate-400 block">Attrition Rate</span>
                    <span className={`font-bold ${dept.attritionRate <= 4.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {dept.attritionRate}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {dept.attritionRate <= 4.0 ? 'Optimal' : 'Elevated'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/40">
                    <span className="text-[10px] text-slate-400 block">Avg Salary</span>
                    <span className="font-bold text-slate-200">${Math.round(dept.avgSalary / 1000)}k / yr</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/40">
                    <span className="text-[10px] text-slate-400 block">Open Roles</span>
                    <span className="font-bold text-indigo-400">{dept.openPositions} Requisitions</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectDepartment && onSelectDepartment(dept.id)}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 hover:border-indigo-500 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                Filter This Department <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Budget Allocation vs Actual Spend */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Budget Allocation vs Actual Spend ($ Millions)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Approved annual manpower budget compared to current run-rate</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> Allocated
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Actual Spend
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
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="M" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="allocatedBudget" name="Allocated Budget" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="actualSpend" name="Actual Spend" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition Rates Across Departments */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Department Attrition Rate (%)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Benchmarked against organizational tolerance threshold (5.0%)</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Target &lt; 5.0%
            </span>
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
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 8]} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={5.0} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Target 5.0%', fill: '#f43f5e', fontSize: 10, position: 'insideTopRight' }} />
                <Bar dataKey="attritionRate" name="Attrition Rate" radius={[4, 4, 0, 0]} maxBarSize={22}>
                  {departmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.attritionRate > 5.0 ? '#f43f5e' : entry.attritionRate > 4.0 ? '#f59e0b' : '#10b981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
