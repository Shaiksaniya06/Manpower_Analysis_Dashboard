import React from 'react';
import { Users, UserPlus, UserMinus, ShieldCheck, AlertCircle, TrendingDown } from 'lucide-react';

export default function KpiCardsRow({ kpis }) {
  const total_manpower = kpis?.total_manpower ?? 1248;
  const total_joining = kpis?.total_joining ?? 142;
  const total_retirement = kpis?.total_retirement ?? 118;
  const sanctioned_posts = kpis?.sanctioned_posts ?? 1480;
  const vacancies = kpis?.vacancies ?? Math.max(0, (sanctioned_posts - total_manpower));

  const formatAttritionRate = (val) => {
    if (val === undefined || val === null || val === '') return '3.2%';
    if (typeof val === 'number') return `${val.toFixed(1)}%`;
    const str = String(val).trim();
    return str.endsWith('%') ? str : `${str}%`;
  };

  const attrition_rate = formatAttritionRate(kpis?.attrition_rate);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 shrink-0 select-none">
      
      {/* 1. Total Manpower */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#2563eb] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Total Manpower">
            Total Manpower
          </div>
          <div className="text-base lg:text-lg font-black text-slate-900 leading-tight">
            {Number(total_manpower).toLocaleString()}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <Users className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2. Total Joining */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#10b981] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Total Joining">
            Total Joining
          </div>
          <div className="text-base lg:text-lg font-black text-emerald-600 leading-tight">
            {Number(total_joining).toLocaleString()}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          <UserPlus className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 3. Total Retirements */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#e11d48] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Total Retirements">
            Total Retirements
          </div>
          <div className="text-base lg:text-lg font-black text-rose-600 leading-tight">
            {Number(total_retirement).toLocaleString()}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
          <UserMinus className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 4. Total Sanctioned Post */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#0284c7] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Total Sanctioned Post">
            Total Sanctioned Post
          </div>
          <div className="text-base lg:text-lg font-black text-sky-700 leading-tight">
            {Number(sanctioned_posts).toLocaleString()}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 5. Total Vacancies */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#f59e0b] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Total Vacancies">
            Total Vacancies
          </div>
          <div className="text-base lg:text-lg font-black text-amber-600 leading-tight">
            {Number(vacancies).toLocaleString()}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <AlertCircle className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 6. Overall Attrition Rate */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-[#8b5cf6] rounded px-2.5 py-2 flex items-center justify-between shadow-xs hover:shadow-sm transition-all">
        <div className="min-w-0 pr-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate" title="Overall Attrition Rate">
            Overall Attrition Rate
          </div>
          <div className="text-base lg:text-lg font-black text-purple-600 leading-tight">
            {attrition_rate}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
          <TrendingDown className="w-3.5 h-3.5" />
        </div>
      </div>

    </div>
  );
}
