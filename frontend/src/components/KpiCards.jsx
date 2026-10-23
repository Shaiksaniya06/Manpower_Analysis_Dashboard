import React from 'react';
import { 
  Users, 
  UserCheck, 
  TrendingDown, 
  UserPlus, 
  DollarSign, 
  Briefcase,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function KpiCards({ metrics, selectedDeptData }) {
  // If a specific department is selected, adjust KPI metrics dynamically
  const displayMetrics = selectedDeptData ? {
    totalHeadcount: selectedDeptData.headcount,
    growthRate: '+4.2%',
    activeWorkforce: Math.round(selectedDeptData.headcount * 0.95),
    activeRate: selectedDeptData.utilization || 95.0,
    attritionRate: selectedDeptData.attritionRate,
    attritionStatus: selectedDeptData.attritionRate < 4.0 ? 'Low Risk' : 'Moderate',
    netGrowthMonthly: Math.round(selectedDeptData.openPositions * 0.4),
    hiresText: `Target: ${selectedDeptData.target}`,
    payroll: `$${selectedDeptData.actualSpend}M`,
    avgSalary: `$${Math.round(selectedDeptData.avgSalary / 1000)}k / yr`,
    openPositions: selectedDeptData.openPositions,
    lead: selectedDeptData.lead,
  } : {
    totalHeadcount: metrics.totalHeadcount,
    growthRate: `+${metrics.headcountGrowthYoY}% YoY`,
    activeWorkforce: metrics.activeWorkforce,
    activeRate: `${metrics.activeRate}%`,
    attritionRate: `${metrics.attritionRate}%`,
    attritionStatus: `Target < ${metrics.attritionTarget}%`,
    netGrowthMonthly: `+${metrics.netGrowthMonthly}`,
    hiresText: `${metrics.monthlyHires} Hires / ${metrics.monthlyExits} Exits`,
    payroll: metrics.totalMonthlyPayrollFormatted,
    avgSalary: `$${Math.round(metrics.avgAnnualSalary / 1000)}k avg/yr`,
    openPositions: metrics.openRequisitions,
    lead: 'Executive Board',
  };

  const cards = [
    {
      id: 'kpi-headcount',
      title: 'Total Workforce Headcount',
      value: typeof displayMetrics.totalHeadcount === 'number' ? displayMetrics.totalHeadcount.toLocaleString() : displayMetrics.totalHeadcount,
      change: displayMetrics.growthRate,
      isPositive: true,
      subtext: selectedDeptData ? `Target Capacity: ${selectedDeptData.target}` : 'Worldwide across all subsidiaries',
      icon: Users,
      gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
      borderColor: 'border-indigo-500/30',
      iconBg: 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/30',
    },
    {
      id: 'kpi-active-rate',
      title: 'Active Workforce On-Duty',
      value: typeof displayMetrics.activeWorkforce === 'number' ? displayMetrics.activeWorkforce.toLocaleString() : displayMetrics.activeWorkforce,
      change: typeof displayMetrics.activeRate === 'string' ? displayMetrics.activeRate : `${displayMetrics.activeRate}%`,
      isPositive: true,
      subtext: selectedDeptData ? `Utilization score: ${selectedDeptData.utilization}%` : `${metrics.onLeave} on leave, ${metrics.onNotice} notice period`,
      icon: UserCheck,
      gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30',
    },
    {
      id: 'kpi-attrition',
      title: 'Workforce Attrition Rate',
      value: typeof displayMetrics.attritionRate === 'number' ? `${displayMetrics.attritionRate}%` : displayMetrics.attritionRate,
      change: displayMetrics.attritionStatus,
      isPositive: parseFloat(displayMetrics.attritionRate) <= 4.5,
      subtext: selectedDeptData ? `Dept Leader: ${selectedDeptData.lead}` : `Turnover reduced by 0.8% MoM`,
      icon: TrendingDown,
      gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/10 text-purple-400 ring-purple-500/30',
    },
    {
      id: 'kpi-net-growth',
      title: 'Net Monthly Talent Growth',
      value: displayMetrics.netGrowthMonthly,
      change: 'Monthly Net',
      isPositive: true,
      subtext: displayMetrics.hiresText,
      icon: UserPlus,
      gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/30',
    },
    {
      id: 'kpi-payroll',
      title: 'Monthly Payroll & Cost',
      value: displayMetrics.payroll,
      change: displayMetrics.avgSalary,
      isPositive: true,
      subtext: selectedDeptData ? `Budget: $${selectedDeptData.allocatedBudget}M (${Math.round((selectedDeptData.actualSpend / selectedDeptData.allocatedBudget) * 100)}% utilized)` : 'All compensation, bonuses & benefits',
      icon: DollarSign,
      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
    },
    {
      id: 'kpi-open-roles',
      title: 'Open Talent Requisitions',
      value: displayMetrics.openPositions,
      change: 'Avg 28 Days to Hire',
      isPositive: true,
      subtext: selectedDeptData ? `Hiring for ${selectedDeptData.name}` : 'Priority talent requisitions active',
      icon: Briefcase,
      gradient: 'from-pink-500/20 via-pink-500/5 to-transparent',
      borderColor: 'border-pink-500/30',
      iconBg: 'bg-pink-500/10 text-pink-400 ring-pink-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className={`glass-card p-4 rounded-2xl relative overflow-hidden group border ${card.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-40 pointer-events-none`}></div>

            <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
              {/* Header with Title and Icon */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 line-clamp-1">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ring-1 ${card.iconBg} shadow-sm shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Main Metric Value */}
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-white flex items-baseline gap-1.5">
                  {card.value}
                </div>
                
                {/* Secondary badge/change */}
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
                      card.isPositive 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {card.isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {card.change}
                  </span>
                </div>
              </div>

              {/* Footer subtitle */}
              <p className="text-[11px] text-slate-400 line-clamp-1 border-t border-slate-800/60 pt-2">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
