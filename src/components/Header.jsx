import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  RefreshCw, 
  Bell, 
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  selectedDept, 
  setSelectedDept, 
  timeframe, 
  setTimeframe,
  searchQuery,
  setSearchQuery,
  departments,
  onExportCSV,
  onRefresh
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left: Branding & Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Manpower Analytics
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Roster
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Workforce Intelligence & Organizational Planning</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-md ml-2 hidden lg:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search employee, title, department, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Department Filter */}
          <div className="relative">
            <select
              id="dept-filter-select"
              aria-label="Filter by department"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none bg-slate-900/90 text-slate-200 text-xs font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-700/60 hover:border-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm transition"
            >
              <option value="all">All Departments ({departments.length})</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Timeframe Selector */}
          <div className="relative hidden sm:block">
            <select
              id="timeframe-select"
              aria-label="Select timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-slate-900/90 text-slate-200 text-xs font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-700/60 hover:border-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm transition"
            >
              <option value="month">Current Month (Dec 2026)</option>
              <option value="quarter">Q4 2026 (Trailing)</option>
              <option value="ytd">Year-to-Date (2026)</option>
              <option value="full">12-Month Historical</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-data-btn"
            onClick={handleRefreshClick}
            title="Refresh analytics data"
            className="p-2 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white transition shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          {/* Export Report CSV */}
          <button
            id="export-csv-btn"
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export Dataset</span>
            <span className="md:hidden">Export</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white relative transition shadow-sm"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-200">Alerts & Workforce Signals</span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div className="text-xs p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <p className="font-medium text-slate-200">Engineering Headcount Gap</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">24 open positions pending offer closure for Q1.</p>
                  </div>
                  <div className="text-xs p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <p className="font-medium text-slate-200">Attrition Benchmark Achieved</p>
                    <p className="text-[11px] text-emerald-400 mt-0.5">Turnover decreased to 4.2%, well below target (5.0%).</p>
                  </div>
                  <div className="text-xs p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <p className="font-medium text-slate-200">Overtime Utilization Down</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Burnout risk dropped by 12.4% following new hires.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 ring-2 ring-indigo-500/30 flex items-center justify-center font-bold text-xs text-white">
              HR
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-tight">Shaik Saniya</p>
              <p className="text-[10px] text-slate-400">Head of People & Org</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
