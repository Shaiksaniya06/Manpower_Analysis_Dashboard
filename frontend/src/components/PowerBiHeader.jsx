import React from 'react';
import { RotateCcw, Download } from 'lucide-react';
import { IsroLogo, NrscLogo } from './Logos';

export default function PowerBiHeader({
  activeNav,
  setActiveNav,
  onResetFilters,
  onExportReport,
  isBackendConnected = false
}) {
  const navItems = [
    { id: 'manpower', label: 'Manpower' },
    { id: 'joining', label: 'Joining' },
    { id: 'retirement', label: 'Retirement' },
    { id: 'attrition', label: 'Attrition' },
    { id: 'designation', label: 'Designation' },
    { id: 'overview', label: 'Overview' },
  ];

  return (
    <header className="bg-[#102a4c] text-white shadow-md shrink-0 border-b border-[#1d4475] z-30 select-none">
      {/* Top Banner with Logos, Title and System Badges */}
      <div className="px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Combined ISRO NRSC Logo + Main Title */}
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Combined ISRO | NRSC Logo Badge */}
          <div className="flex items-center bg-white px-2.5 py-1 rounded shadow-sm border border-slate-200">
            <img
              src="/isro_nrsc_logo.png"
              alt="ISRO NRSC Logo"
              className="h-8 md:h-9 w-auto object-contain select-none"
            />
          </div>

          <div className="h-7 w-[2px] bg-blue-300/20 hidden sm:block"></div>

          {/* Main Title in Large Bold Typography */}
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white drop-shadow-sm flex items-center gap-2">
              <span>MANPOWER ANALYSIS DASHBOARD</span>
            </h1>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          {/* Reset Filters Button */}
          <button
            onClick={onResetFilters}
            title="Reset Filters to Default"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#1a3d6d] hover:bg-[#23508f] active:bg-[#15345e] text-white rounded transition shadow-sm border border-blue-400/25"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Export Report Button */}
          <button
            onClick={onExportReport}
            title="Download CSV Summary"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#0078d4] hover:bg-[#106ebe] active:bg-[#005a9e] text-white rounded transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons Row Below the Title */}
      <div className="px-4 py-1.5 bg-[#0b213d] border-t border-[#1a3c69] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
        {navItems.map((nav) => {
          const isActive = activeNav === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setActiveNav(nav.id)}
              className={`px-4 py-1 rounded text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#ffffff] text-[#0f284a] shadow-md ring-1 ring-white/50'
                  : 'text-blue-100 hover:bg-[#1c3e6d] hover:text-white'
              }`}
            >
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
