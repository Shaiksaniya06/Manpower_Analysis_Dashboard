import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  TrendingUp,
  BarChart2,
  Table as TableIcon,
  Maximize2,
  X
} from 'lucide-react';
import KpiCardsRow from '../KpiCardsRow';

// Clean Tooltip for 5-Year Employee Count Forecast (Focused on Employee Count)
function ForecastTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const isCur = item.is_current;
    const isFore = item.is_forecast;

    return (
      <div className="bg-[#102a4c] text-white p-2.5 rounded shadow-xl border border-blue-400/30 text-[10.5px] min-w-[170px] z-50">
        <div className="flex items-center justify-between pb-1.5 border-b border-blue-300/20 mb-1.5">
          <span className="font-bold text-white text-xs">Year {item.year}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
              isCur
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                : isFore
                ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30'
                : 'bg-blue-400/20 text-blue-300 border border-blue-400/30'
            }`}
          >
            {isCur ? 'Present Year' : isFore ? 'Next 5Y Forecast' : 'Present (Historical)'}
          </span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-300">Employee Count:</span>
          <span className="font-bold text-white font-mono text-sm">{item.employee_count?.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function AttritionPage({ data }) {
  const [viewMode, setViewMode] = useState('combo'); // 'combo' (Line & Area), 'bar', 'table'
  const [isExpanded, setIsExpanded] = useState(false);

  const sharedKpis = data?.kpis || {};
  const total = sharedKpis.total_manpower || 1248;

  // 1. Five-Year Forecast Dataset (Present Years 2021-2025 + Next 5 Years 2026-2030)
  const defaultForecastData = [
    { year: '2021', present_count: Math.round(total * 0.933), forecast_count: null, employee_count: Math.round(total * 0.933), is_present: true, is_current: false, is_forecast: false },
    { year: '2022', present_count: Math.round(total * 0.952), forecast_count: null, employee_count: Math.round(total * 0.952), is_present: true, is_current: false, is_forecast: false },
    { year: '2023', present_count: Math.round(total * 0.970), forecast_count: null, employee_count: Math.round(total * 0.970), is_present: true, is_current: false, is_forecast: false },
    { year: '2024', present_count: Math.round(total * 0.987), forecast_count: null, employee_count: Math.round(total * 0.987), is_present: true, is_current: false, is_forecast: false },
    { year: '2025', present_count: total, forecast_count: total, employee_count: total, is_present: true, is_current: true, is_forecast: false },
    { year: '2026', present_count: null, forecast_count: Math.round(total * 1.011), employee_count: Math.round(total * 1.011), is_present: false, is_current: false, is_forecast: true },
    { year: '2027', present_count: null, forecast_count: Math.round(total * 1.024), employee_count: Math.round(total * 1.024), is_present: false, is_current: false, is_forecast: true },
    { year: '2028', present_count: null, forecast_count: Math.round(total * 1.038), employee_count: Math.round(total * 1.038), is_present: false, is_current: false, is_forecast: true },
    { year: '2029', present_count: null, forecast_count: Math.round(total * 1.050), employee_count: Math.round(total * 1.050), is_present: false, is_current: false, is_forecast: true },
    { year: '2030', present_count: null, forecast_count: Math.round(total * 1.061), employee_count: Math.round(total * 1.061), is_present: false, is_current: false, is_forecast: true }
  ];

  const forecastData = data?.employee_count_forecast_5y || defaultForecastData;
  const presentCount = forecastData.find((d) => d.year === '2025')?.employee_count || total;
  const forecastCount2030 = forecastData.find((d) => d.year === '2030')?.employee_count || Math.round(total * 1.061);

  // Other Existing Datasets
  const rateOverTime = data?.overall_attrition_rate_over_time || [
    { year: '2021', rate: 2.8 },
    { year: '2022', rate: 3.1 },
    { year: '2023', rate: 3.4 },
    { year: '2024', rate: 3.2 },
    { year: '2025', rate: 3.6 }
  ];

  const rateByCategory = data?.attrition_rate_by_staff_category || [
    { category: 'Technical (Sci/Eng)', rate: 2.9, color: '#2563eb' },
    { category: 'Administrative', rate: 3.8, color: '#10b981' },
    { category: 'Auxiliary & Support', rate: 4.2, color: '#f59e0b' }
  ];

  const rateByArea = data?.attrition_rate_by_area || [
    { area: 'MSA', rate: 3.1, color: '#0284c7' },
    { area: 'RSA', rate: 3.3, color: '#10b981' },
    { area: 'ASDA', rate: 3.7, color: '#8b5cf6' }
  ];

  const joinRetTrend = data?.joining_and_retirement_trend || [
    { year: '2021', joining: 23, retirement: 21 },
    { year: '2022', joining: 26, retirement: 22 },
    { year: '2023', joining: 31, retirement: 24 },
    { year: '2024', joining: 34, retirement: 25 },
    { year: '2025', joining: 28, retirement: 26 }
  ];

  const exitsByGroupArea = data?.exits_by_group_and_area || [
    { area: 'MSA', groupA: 9, groupB: 5, groupC: 2 },
    { area: 'RSA', groupA: 7, groupB: 4, groupC: 2 },
    { area: 'ASDA', groupA: 6, groupB: 4, groupC: 2 }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-1.5 select-none relative">
      {/* 6 Unified KPI Cards */}
      <KpiCardsRow kpis={sharedKpis} />

      {/* Charts Grid: Top Row (3 cards) + Bottom Row (3 cards) */}
      <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
        
        {/* Top Row: Overall Attrition Rate Over Time, Attrition Rate by Staff Category, Attrition Rate by Area (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1 min-h-0">
          
          {/* Chart 1: Overall Attrition Rate Over Time */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
                Attrition Rate Over Time
              </h3>
              <span className="text-[9.5px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                2021 – 2025
              </span>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rateOverTime} margin={{ top: 8, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 5]} ticks={[0, 1.5, 3, 4.5]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} formatter={(val) => [`${val}%`, 'Rate']} />
                  <Line type="monotone" dataKey="rate" name="Rate %" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3, fill: '#e11d48' }}>
                    <LabelList dataKey="rate" position="top" formatter={(v) => `${v}%`} style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Annual attrition rate trend over time
            </div>
          </div>

          {/* Chart 2: Attrition Rate by Staff Category */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                Attrition by Staff Category
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateByCategory} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 6]} ticks={[0, 2, 4, 6]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} formatter={(val) => [`${val}%`, 'Rate']} />
                  <Bar dataKey="rate" name="Attrition Rate" fill="#2563eb" barSize={14} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="rate" position="top" formatter={(v) => `${v}%`} style={{ fontSize: '7.5px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Attrition rate by staff category
            </div>
          </div>

          {/* Chart 3: Attrition Rate by Area */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
                Attrition Rate by Area
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={rateByArea} margin={{ top: 4, right: 35, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 5]} ticks={[0, 2, 4]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} formatter={(val) => [`${val}%`, 'Rate']} />
                  <Bar dataKey="rate" name="Turnover Rate" fill="#0284c7" radius={[0, 3, 3, 0]} barSize={12}>
                    <LabelList dataKey="rate" position="right" formatter={(v) => `${v}%`} style={{ fontSize: '8px', fill: '#0f172a', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[8.5px] text-[#64748b] pt-0.5 border-t border-slate-50 shrink-0">
              Attrition rate by operational area
            </div>
          </div>

        </div>

        {/* Bottom Row: 5-Year Forecast Chart (Col 6) + Joining & Retirement Trend (Col 3) + Exits by Group and Area (Col 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 flex-1 min-h-0">
          
          {/* Chart 4: 5-Year Employee Count Forecast (Present Years 2021-2025 & Next 5 Years 2026-2030) */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px] lg:col-span-6 relative">
            
            {/* Header: Title, Badges & View Switches */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] ring-2 ring-purple-100 shrink-0"></span>
                <h3 className="pbi-card-title text-xs font-bold text-slate-800 truncate">
                  5-Year Employee Count Forecast
                </h3>
              </div>

              {/* Present and Future Badges + Mode Switchers */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60" title="Present Year Workforce">
                  Present: {presentCount.toLocaleString()}
                </span>
                <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200/60" title="Projected 2030 Workforce">
                  2030 (F): {forecastCount2030.toLocaleString()}
                </span>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded ml-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('combo')}
                    title="Trend & Area View"
                    className={`p-1 rounded transition ${
                      viewMode === 'combo' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('bar')}
                    title="Bar Comparison View"
                    className={`p-1 rounded transition ${
                      viewMode === 'bar' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <BarChart2 className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    title="Data Table View"
                    className={`p-1 rounded transition ${
                      viewMode === 'table' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                  </button>
                </div>

                {/* Maximize Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  title="Expand to Full View"
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full min-h-0 pt-1">
              {viewMode === 'combo' && (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData} margin={{ top: 12, right: 18, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="presAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="foreAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 8.5, fill: '#475569', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[
                        (dataMin) => Math.max(0, Math.floor((dataMin - 35) / 50) * 50),
                        (dataMax) => Math.ceil((dataMax + 30) / 50) * 50
                      ]}
                      tickFormatter={(v) => v.toLocaleString()}
                      tick={{ fontSize: 8, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ForecastTooltip />} />

                    {/* Vertical Reference Line at 2025 separating Present from Forecast */}
                    <ReferenceLine
                      x="2025"
                      stroke="#64748b"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{
                        value: 'Present (2025)',
                        position: 'insideTopLeft',
                        fill: '#1e293b',
                        fontSize: 8,
                        fontWeight: 700
                      }}
                    />

                    {/* Present Years Curve (2021–2025): Solid Blue */}
                    <Area
                      type="monotone"
                      dataKey="present_count"
                      name="Present Years Count"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fill="url(#presAreaGrad)"
                      dot={{ r: 3, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 1.5 }}
                    >
                      <LabelList
                        dataKey="present_count"
                        position="top"
                        formatter={(v) => (v ? v.toLocaleString() : '')}
                        style={{ fontSize: '7.5px', fill: '#1d4ed8', fontWeight: 700 }}
                      />
                    </Area>

                    {/* Next 5 Years Forecast Curve (2026–2030): Dashed Purple */}
                    <Area
                      type="monotone"
                      dataKey="forecast_count"
                      name="Forecast Count"
                      stroke="#8b5cf6"
                      strokeDasharray="4 4"
                      strokeWidth={2.5}
                      fill="url(#foreAreaGrad)"
                      dot={{ r: 3.5, fill: '#8b5cf6', stroke: '#ffffff', strokeWidth: 1.5 }}
                    >
                      <LabelList
                        dataKey="forecast_count"
                        position="top"
                        formatter={(v) => (v && v !== presentCount ? v.toLocaleString() : '')}
                        style={{ fontSize: '7.5px', fill: '#7c3aed', fontWeight: 700 }}
                      />
                    </Area>
                  </ComposedChart>
                </ResponsiveContainer>
              )}

              {viewMode === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData} margin={{ top: 12, right: 10, left: -22, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 8.5, fill: '#475569', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[
                        (dataMin) => Math.max(0, Math.floor((dataMin - 35) / 50) * 50),
                        (dataMax) => Math.ceil((dataMax + 30) / 50) * 50
                      ]}
                      tickFormatter={(v) => v.toLocaleString()}
                      tick={{ fontSize: 8, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ForecastTooltip />} />
                    <ReferenceLine
                      x="2025"
                      stroke="#64748b"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                    />
                    <Bar dataKey="employee_count" radius={[2.5, 2.5, 0, 0]} barSize={16}>
                      {forecastData.map((entry) => {
                        const isCur = entry.year === '2025';
                        const isFore = entry.is_forecast;
                        const fill = isCur ? '#1d4ed8' : isFore ? '#8b5cf6' : '#3b82f6';
                        return <Cell key={`cell-${entry.year}`} fill={fill} />;
                      })}
                      <LabelList
                        dataKey="employee_count"
                        position="top"
                        formatter={(v) => (v ? v.toLocaleString() : '')}
                        style={{ fontSize: '7px', fill: '#0f172a', fontWeight: 700 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {viewMode === 'table' && (
                <div className="h-full overflow-auto pr-1">
                  <table className="w-full border-collapse text-[9.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold text-left">
                        <th className="py-1 px-2">Year</th>
                        <th className="py-1 px-2">Period Status</th>
                        <th className="py-1 px-2 text-right">Employee Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {forecastData.map((row) => (
                        <tr
                          key={row.year}
                          className={row.is_current ? 'bg-amber-50/70 font-bold' : 'hover:bg-slate-50'}
                        >
                          <td className="py-1 px-2 font-bold text-slate-800">{row.year}</td>
                          <td className="py-1 px-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[8px] font-semibold ${
                                row.is_current
                                  ? 'bg-amber-100 text-amber-800'
                                  : row.is_forecast
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {row.is_current ? 'Present (Baseline)' : row.is_forecast ? 'Next 5 Years (F)' : 'Present (Historical)'}
                            </span>
                          </td>
                          <td className="py-1 px-2 text-right font-mono font-bold text-slate-900 text-xs">
                            {row.employee_count?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer Legend - Clean without model text */}
            <div className="flex items-center justify-center text-[8px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span> Present Years (2021–2025 Actual)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6] border border-dashed border-purple-400"></span> Next 5 Years (2026–2030 Forecast)
                </span>
              </div>
            </div>
          </div>

          {/* Chart 5: Joining and Retirement Trend (lg:col-span-3) */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px] lg:col-span-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                Joining & Retirement Trend
              </h3>
              <span className="text-[9.5px] font-bold text-slate-500">2021 – 2025</span>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={joinRetTrend} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="joining" name="Joinings" fill="#10b981" barSize={10} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="joining" position="top" style={{ fontSize: '7.5px', fill: '#059669', fontWeight: 600 }} />
                  </Bar>
                  <Bar dataKey="retirement" name="Retirements" fill="#e11d48" barSize={10} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="retirement" position="top" style={{ fontSize: '7.5px', fill: '#e11d48', fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-3 text-[8px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Joinings</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e11d48]"></span> Retirements</span>
            </div>
          </div>

          {/* Chart 6: Exits by Group and Area (Horizontal Stacked Bar, lg:col-span-3) */}
          <div className="pbi-card p-2 flex flex-col justify-between min-h-[145px] lg:col-span-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="pbi-card-title flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
                Exits by Group & Area
              </h3>
            </div>
            <div className="flex-1 w-full min-h-0 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={exitsByGroupArea} margin={{ top: 4, right: 18, left: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="area" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={42} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '3px 6px' }} />
                  <Bar dataKey="groupA" name="Group A" stackId="a" fill="#2563eb" barSize={11}>
                    <LabelList dataKey="groupA" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="groupB" name="Group B" stackId="a" fill="#10b981" barSize={11}>
                    <LabelList dataKey="groupB" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                  <Bar dataKey="groupC" name="Group C" stackId="a" fill="#f59e0b" barSize={11} radius={[0, 2, 2, 0]}>
                    <LabelList dataKey="groupC" position="center" style={{ fontSize: '7.5px', fill: '#ffffff', fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-[8px] text-[#475569] font-medium pt-0.5 border-t border-slate-50 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563eb]"></span> Grp A</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Grp B</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> Grp C</span>
            </div>
          </div>

        </div>

      </div>

      {/* Expanded Forecast Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
            {/* Modal Header */}
            <div className="px-4 py-2.5 bg-[#102a4c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                <h2 className="text-sm font-bold tracking-wide">
                  5-Year Employee Count Forecast (Present 2021–2025 vs Next 5 Years 2026–2030)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Metrics Banner */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 gap-3">
              <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">Present Headcount (2025)</div>
                <div className="text-lg font-black text-blue-700 font-mono mt-0.5">
                  {presentCount.toLocaleString()}
                </div>
                <div className="text-[9.5px] text-slate-400">Current baseline manpower</div>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">5-Year Forecast Headcount (2030)</div>
                <div className="text-lg font-black text-purple-700 font-mono mt-0.5">
                  {forecastCount2030.toLocaleString()}
                </div>
                <div className="text-[9.5px] text-slate-400">Projected target workforce</div>
              </div>
            </div>

            {/* Modal Chart & Table Content */}
            <div className="p-3 flex-1 overflow-auto flex flex-col gap-3 min-h-[360px]">
              {/* Large Chart */}
              <div className="h-64 w-full bg-white p-2 rounded border border-slate-200 shadow-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData} margin={{ top: 15, right: 25, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }} />
                    <YAxis
                      domain={[
                        (dataMin) => Math.max(0, Math.floor((dataMin - 35) / 50) * 50),
                        (dataMax) => Math.ceil((dataMax + 30) / 50) * 50
                      ]}
                      tickFormatter={(v) => v.toLocaleString()}
                      tick={{ fontSize: 9, fill: '#64748b' }}
                    />
                    <Tooltip content={<ForecastTooltip />} />
                    <ReferenceLine
                      x="2025"
                      stroke="#475569"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{
                        value: 'Present Baseline (2025)',
                        position: 'insideTopLeft',
                        fill: '#0f172a',
                        fontSize: 9.5,
                        fontWeight: 700
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="present_count"
                      name="Present Count"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fill="#2563eb"
                      fillOpacity={0.15}
                      dot={{ r: 3.5, fill: '#2563eb', stroke: '#fff', strokeWidth: 1.5 }}
                    >
                      <LabelList
                        dataKey="present_count"
                        position="top"
                        formatter={(v) => (v ? v.toLocaleString() : '')}
                        style={{ fontSize: '8.5px', fill: '#1d4ed8', fontWeight: 700 }}
                      />
                    </Area>
                    <Area
                      type="monotone"
                      dataKey="forecast_count"
                      name="Forecast Count"
                      stroke="#8b5cf6"
                      strokeDasharray="4 4"
                      strokeWidth={2.5}
                      fill="#8b5cf6"
                      fillOpacity={0.15}
                      dot={{ r: 4, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 1.5 }}
                    >
                      <LabelList
                        dataKey="forecast_count"
                        position="top"
                        formatter={(v) => (v && v !== presentCount ? v.toLocaleString() : '')}
                        style={{ fontSize: '8.5px', fill: '#7c3aed', fontWeight: 700 }}
                      />
                    </Area>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Breakdown Table */}
              <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="py-2 px-3 text-left">Year</th>
                      <th className="py-2 px-3 text-left">Period Category</th>
                      <th className="py-2 px-3 text-right">Employee Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {forecastData.map((row) => (
                      <tr
                        key={`modal-${row.year}`}
                        className={row.is_current ? 'bg-amber-50 font-bold' : 'hover:bg-slate-50 font-medium'}
                      >
                        <td className="py-2 px-3 font-sans font-bold text-slate-900">{row.year}</td>
                        <td className="py-2 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              row.is_current
                                ? 'bg-amber-100 text-amber-800'
                                : row.is_forecast
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {row.is_current ? 'Present Year (Baseline)' : row.is_forecast ? 'Next 5 Years Forecast' : 'Present (Historical)'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-black text-slate-900 text-xs">
                          {row.employee_count?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>National Remote Sensing Centre (NRSC) • Indian Space Research Organisation (ISRO)</span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 bg-[#102a4c] text-white rounded text-xs font-semibold hover:bg-[#193a66] transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
