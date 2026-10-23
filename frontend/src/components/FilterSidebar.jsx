import React from 'react';
import { ChevronDown, RotateCcw, Filter, Calendar } from 'lucide-react';

export const initialFilterState = {
  joining_date_from: '2000-01-01',
  joining_date_to: '2026-12-31',
  as_on_date: 'All',
  retirement_date_from: '2021-01-01',
  retirement_date_to: '2060-12-31',
  area: 'All',
  division: 'All',
  group: 'All',
  level: 'All',
  designation: 'All',
  officer_type: 'All'
};

const filterDropdownOptions = {
  area: ['All', 'MSA', 'RSA', 'ASDA'],
  division: ['All', 'HRD', 'MISD', 'ASD', 'BND', 'G&CD', 'AD', 'DPD'],
  group: ['All', 'GROUP A', 'GROUP B', 'GROUP C'],
  level: [
    'All',
    'Level 14',
    'Level 13A',
    'Level 12',
    'Level 11',
    'Level 10',
    'Level 9',
    'Level 8',
    'Level 7',
    'Level 6',
    'Level 5',
    'Level 4',
    'Level 2'
  ],
  designation: [
    'All',
    'Scientist/Engineer-SG',
    'Scientist/Engineer-SF',
    'Scientist/Engineer-SE',
    'Scientist/Engineer-SD',
    'Scientist/Engineer-SC',
    'Administrative Officer',
    'Section Officer',
    'Senior Assistant',
    'Technical Officer'
  ],
  officer_type: ['All', 'GO', 'NGO'],
  as_on_date: [
    'All',
    '2026-05-31',
    '2025-12-31',
    '2024-12-31',
    '2023-12-31',
    '2022-12-31',
    '2021-06-30'
  ]
};

export default function FilterSidebar({
  filters,
  setFilters,
  onClearFilters
}) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <aside className="w-full lg:w-60 shrink-0 bg-[#ffffff] border-r border-[#d4d9e2] p-2.5 text-[#1e293b] select-none flex flex-col justify-between shadow-sm overflow-y-auto">
      <div className="space-y-2">
        
        {/* Header */}
        <div className="pb-1.5 border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[#0f284a] uppercase">
            <Filter className="w-3.5 h-3.5 text-[#0078d4]" />
            <span>Filters</span>
          </div>
        </div>

        {/* 1. Joining Date */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase flex items-center justify-between">
            <span>Joining Date</span>
            <Calendar className="w-3 h-3 text-[#94a3b8]" />
          </label>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <input
              type="date"
              value={filters.joining_date_from || '2000-01-01'}
              onChange={(e) => handleChange('joining_date_from', e.target.value)}
              className="w-full px-1.5 py-0.5 bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded text-[10px] text-[#334155] focus:outline-none focus:border-[#0078d4]"
              title="Joining Date From"
            />
            <input
              type="date"
              value={filters.joining_date_to || '2026-12-31'}
              onChange={(e) => handleChange('joining_date_to', e.target.value)}
              className="w-full px-1.5 py-0.5 bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded text-[10px] text-[#334155] focus:outline-none focus:border-[#0078d4]"
              title="Joining Date To"
            />
          </div>
        </div>

        {/* 2. As On Date */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            As On Date
          </label>
          <div className="relative">
            <select
              value={filters.as_on_date || 'All'}
              onChange={(e) => handleChange('as_on_date', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.as_on_date.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All (Latest / Overall)' : opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Retirement Date */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase flex items-center justify-between">
            <span>Retirement Date</span>
            <Calendar className="w-3 h-3 text-[#94a3b8]" />
          </label>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <input
              type="date"
              value={filters.retirement_date_from || '2021-01-01'}
              onChange={(e) => handleChange('retirement_date_from', e.target.value)}
              className="w-full px-1.5 py-0.5 bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded text-[10px] text-[#334155] focus:outline-none focus:border-[#0078d4]"
              title="Retirement Date From"
            />
            <input
              type="date"
              value={filters.retirement_date_to || '2060-12-31'}
              onChange={(e) => handleChange('retirement_date_to', e.target.value)}
              className="w-full px-1.5 py-0.5 bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded text-[10px] text-[#334155] focus:outline-none focus:border-[#0078d4]"
              title="Retirement Date To"
            />
          </div>
        </div>

        {/* 4. Area */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Area
          </label>
          <div className="relative">
            <select
              value={filters.area || 'All'}
              onChange={(e) => handleChange('area', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.area.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 5. Division */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Division
          </label>
          <div className="relative">
            <select
              value={filters.division || 'All'}
              onChange={(e) => handleChange('division', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.division.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 6. Group */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Group
          </label>
          <div className="relative">
            <select
              value={filters.group || 'All'}
              onChange={(e) => handleChange('group', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.group.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 7. Level */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Level
          </label>
          <div className="relative">
            <select
              value={filters.level || 'All'}
              onChange={(e) => handleChange('level', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.level.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 8. Designation */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Designation
          </label>
          <div className="relative">
            <select
              value={filters.designation || 'All'}
              onChange={(e) => handleChange('designation', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.designation.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 9. Officer Type */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#475569] uppercase block">
            Officer Type
          </label>
          <div className="relative">
            <select
              value={filters.officer_type || 'All'}
              onChange={(e) => handleChange('officer_type', e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#edf2f7] border border-[#cbd5e1] rounded px-2 py-0.5 text-[11px] text-[#1e293b] appearance-none cursor-pointer focus:outline-none focus:border-[#0078d4]"
            >
              {filterDropdownOptions.officer_type.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Clear Filters Button at the Bottom */}
      <div className="pt-2.5 mt-2 border-t border-[#e2e8f0]">
        <button
          onClick={onClearFilters}
          className="w-full py-1.5 px-3 bg-[#0078d4] hover:bg-[#106ebe] active:bg-[#005a9e] text-white text-[11px] font-extrabold uppercase tracking-wider rounded transition-colors shadow-sm flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>
    </aside>
  );
}
