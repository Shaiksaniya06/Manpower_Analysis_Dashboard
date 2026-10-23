import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Building2, 
  Users2, 
  UserMinus, 
  UserPlus, 
  Contact2, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, totalEmployees, openRoles }) {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
    { id: 'headcount', label: 'Headcount & Growth', icon: TrendingUp, badge: '+5.8%' },
    { id: 'departments', label: 'Departments & Budget', icon: Building2, badge: '8' },
    { id: 'demographics', label: 'Diversity & Demographics', icon: Users2, badge: null },
    { id: 'attrition', label: 'Attrition & Retention', icon: UserMinus, badge: '4.2%' },
    { id: 'recruitment', label: 'Recruitment & Talent', icon: UserPlus, badge: openRoles ? `${openRoles}` : '64' },
    { id: 'roster', label: 'Employee Directory', icon: Contact2, badge: totalEmployees ? `${totalEmployees}` : '2.4k' },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] bg-slate-950/95 lg:bg-slate-950/70 backdrop-blur-xl border-r border-slate-800/80 z-40 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-72 translate-x-0'
      }`}
    >
      {/* Navigation Top */}
      <div className="p-4 space-y-6">
        {/* Workspace indicator */}
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Enterprise Portal</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsCollapsed(true);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-700/80 text-white font-semibold shadow-lg shadow-indigo-600/25 ring-1 ring-indigo-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`}
                />
                
                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Left Active Glow bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-indigo-400"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Widget */}
      <div className="p-4 border-t border-slate-800/80">
        {!isCollapsed ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 border border-indigo-500/20 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-semibold text-indigo-200">Workforce Health: Optimal</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Capacity index at 94.4%. High retention in Core Engineering & Operations.
            </p>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-1.5 rounded-full w-[94.4%]"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Health Score: 94.4%">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
