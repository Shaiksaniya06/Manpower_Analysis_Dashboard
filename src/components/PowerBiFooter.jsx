import React from 'react';
import { Monitor, Smartphone, Plus, Settings } from 'lucide-react';

export default function PowerBiFooter({ activeNav, setActiveNav }) {
  const pages = [
    { id: 'manpower', label: 'Manpower' },
    { id: 'joining', label: 'Joining' },
    { id: 'retirement', label: 'Retirement' },
    { id: 'attrition', label: 'Attrition' },
    { id: 'organization', label: 'Organization' },
    { id: 'designation', label: 'Designation' },
  ];

  return (
    <footer className="bg-[#f0f2f5] border-t border-[#d8dde6] px-4 py-1.5 flex items-center justify-between text-xs text-[#475569] select-none">
      
      {/* Left controls: Layout icons and Page Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 border-r border-[#cbd5e1] pr-3 shrink-0">
          <button title="Desktop Layout" className="p-1 hover:bg-[#e2e8f0] rounded text-[#1e293b]">
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button title="Mobile Layout" className="p-1 hover:bg-[#e2e8f0] rounded text-[#64748b]">
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-1 shrink-0">
          {pages.map((p) => {
            const isActive = activeNav === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveNav(p.id)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                  isActive
                    ? 'bg-white border border-[#cbd5e1] shadow-xs font-bold text-[#1e293b]'
                    : 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
                }`}
              >
                {p.label}
              </button>
            );
          })}
          <button
            title="Add Page"
            className="w-5 h-5 flex items-center justify-center bg-[#059669] hover:bg-[#047857] text-white rounded text-xs shadow-xs ml-0.5"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center status */}
      <div className="text-[11px] text-[#64748b] hidden lg:block shrink-0 px-2">
        NRSC Manpower Analysis Suite • Page {pages.findIndex(p => p.id === activeNav) + 1} of {pages.length}
      </div>

      {/* Right controls: Zoom & Settings */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>—</span>
          <div className="w-16 h-1 bg-[#cbd5e1] rounded-full relative">
            <div className="absolute left-[49%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#1e70bf] rounded-full"></div>
          </div>
          <span>+</span>
          <span className="font-semibold text-[#334155] ml-1">49%</span>
        </div>
        <button title="Report Settings" className="p-1 hover:bg-[#e2e8f0] rounded text-[#64748b]">
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

    </footer>
  );
}
