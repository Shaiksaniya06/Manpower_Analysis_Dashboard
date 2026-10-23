import React from 'react';
import {
  BarChart,
  Bar,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import {
  summaryByLevel,
  joiningsRetirementsTrend,
  salaryAndWorkforceByLevel,
  attritionOverTime,
  attritionSummaryCards,
  staffCategoryAttrition
} from '../data/powerBiData';

export default function BottomSection() {
  return (
    <div className="space-y-2.5">
      {/* Upper Bottom Row: Table + 3 Charts */}
      <div id="levels-section" className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        
        {/* Visual 1: SUMMARY BY LEVEL (Table) */}
        <div className="lg:col-span-3 pbi-card p-2 flex flex-col justify-between overflow-hidden">
          <h3 className="pbi-card-title px-1 mb-1">SUMMARY BY LEVEL</h3>
          <div className="overflow-x-auto">
            <table className="pbi-table text-[10px]">
              <thead>
                <tr>
                  <th className="bg-[#1e70bf] text-white py-1 px-1.5 font-bold">LEVEL</th>
                  <th className="bg-[#1e70bf] text-white py-1 px-1.5 font-bold text-right">Total Employees</th>
                  <th className="bg-[#1e70bf] text-white py-1 px-1.5 font-bold text-right">Total Joinings</th>
                  <th className="bg-[#1e70bf] text-white py-1 px-1.5 font-bold text-right">Total Retirements</th>
                </tr>
              </thead>
              <tbody>
                {summaryByLevel.map((row) => (
                  <tr key={row.level} className="hover:bg-blue-50 border-b border-slate-100">
                    <td className="py-0.5 px-1.5 font-medium text-slate-800">{row.level}</td>
                    <td className="py-0.5 px-1.5 text-right text-slate-700">{row.employees}</td>
                    <td className="py-0.5 px-1.5 text-right text-slate-700">{row.joinings}</td>
                    <td className="py-0.5 px-1.5 text-right text-slate-700">{row.retirements}</td>
                  </tr>
                ))}
                {/* Total Row matching Power BI Dashboard */}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                  <td className="py-1 px-1.5 text-[#1e293b]">Total</td>
                  <td className="py-1 px-1.5 text-right text-[#1e293b]">4346</td>
                  <td className="py-1 px-1.5 text-right text-[#1e293b]">1455</td>
                  <td className="py-1 px-1.5 text-right text-[#1e293b]">371</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual 2: JOININGS & RETIREMENTS TREND */}
        <div className="lg:col-span-3 pbi-card p-3 flex flex-col justify-between">
          <h3 className="pbi-card-title mb-1">JOININGS & RETIREMENTS TREND</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={joiningsRetirementsTrend} margin={{ top: 14, right: 10, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 400]} ticks={[0, 100, 200, 300]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                />
                <Bar dataKey="joinings" name="Total Joinings" fill="#1e70bf" barSize={10} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="joinings" position="top" style={{ fontSize: '8px', fill: '#1e293b' }} />
                </Bar>
                <Bar dataKey="retirements" name="Total Retirements" fill="#93c5fd" barSize={10} radius={[2, 2, 0, 0]}>
                  <LabelList dataKey="retirements" position="top" style={{ fontSize: '8px', fill: '#64748b' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-[9px] text-[#475569] font-medium pt-1 border-t border-[#f1f5f9]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1e70bf]"></span> Total Joinings
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#93c5fd]"></span> Total Retirements
            </span>
          </div>
        </div>

        {/* Visual 3: WORKFORCE DISTRIBUTION & AVERAGE SALARY BY LEVEL */}
        <div className="lg:col-span-3 pbi-card p-3 flex flex-col justify-between">
          <h3 className="pbi-card-title mb-1">WORKFORCE DISTRIBUTION & AVERAGE SALARY BY LEVEL</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={salaryAndWorkforceByLevel} margin={{ top: 14, right: -15, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="level" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} interval={0} angle={-30} textAnchor="end" height={28} />
                <YAxis yAxisId="left" domain={[0, 800]} ticks={[0, 200, 400, 600, 800]} tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 120]} ticks={[0, 50, 100]} tickFormatter={(val) => `${val}K`} tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                  formatter={(val, name) => [name === 'employees' ? `${val} staff` : `₹${val}K`, name === 'employees' ? 'Total Employees' : 'Average BASICPAY']}
                />
                <Bar yAxisId="left" dataKey="employees" name="employees" fill="#3b82f6" barSize={12} radius={[2, 2, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="basicPayK" name="basicPay" stroke="#1e3a8a" strokeWidth={2} dot={{ r: 2, fill: '#1e3a8a' }}>
                  <LabelList dataKey="basicPayK" position="top" formatter={(v) => `${v}K`} style={{ fontSize: '7.5px', fill: '#1e3a8a', fontWeight: 600 }} />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-3 text-[9px] text-[#475569] font-medium pt-1 border-t border-[#f1f5f9]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> Total Employees
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span> Average of BASICPAY
            </span>
          </div>
        </div>

        {/* Visual 4: ATTRITION RATE (%) - OVER TIME (OVERALL) */}
        <div id="attrition-section" className="lg:col-span-3 pbi-card p-3 flex flex-col justify-between">
          <h3 className="pbi-card-title mb-1">ATTRITION RATE (%) - OVER TIME (OVERALL)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attritionOverTime} margin={{ top: 14, right: 10, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickFormatter={(v) => v.slice(0, 3)} tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[100, 250]} ticks={[100, 150, 200]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                  formatter={(val, name) => [`${val}%`, name]}
                />
                <Line type="monotone" dataKey="last12Months" name="Last 12 Months" stroke="#38bdf8" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="last5Years" name="Last 5 Years" stroke="#f97316" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="lastDecade" name="Last Decade" stroke="#1e3a8a" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] text-[#475569] font-medium pt-1 border-t border-[#f1f5f9]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span> Last 12 Months
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Last 5 Years
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span> Last Decade
            </span>
          </div>
        </div>

      </div>

      {/* Sub-Row Bottom Cards: ATTRITION SUMMARY & STAFF CATEGORY MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        
        {/* Sub-Card 1: ATTRITION RATE (%) - SUMMARY(OVERALL) */}
        <div className="lg:col-span-6 pbi-card p-3 flex flex-col justify-between">
          <h3 className="pbi-card-title text-center mb-2">ATTRITION RATE (%) - SUMMARY(OVERALL)</h3>
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-100 py-1">
            {attritionSummaryCards.map((card, idx) => (
              <div key={idx} className="px-1 flex flex-col items-center">
                <span className="text-[11px] font-semibold text-[#1e70bf]">{card.period}</span>
                <span className="text-xl font-black text-[#1e293b] my-0.5">{card.rate}</span>
                <span className={`text-[9px] font-semibold flex items-center justify-center gap-0.5 ${
                  card.trend === 'down' ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {card.trend === 'down' ? '▼' : '▲'} {card.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Card 2: ATTRITION RATE (%) - BY STAFF CATEGORY */}
        <div className="lg:col-span-6 pbi-card p-2 flex flex-col justify-between overflow-hidden">
          <h3 className="pbi-card-title px-1 mb-1">ATTRITION RATE (%) - BY STAFF CATEGORY.</h3>
          <div className="overflow-x-auto">
            <table className="pbi-table text-[10px]">
              <thead>
                <tr>
                  <th rowSpan="2" className="bg-[#1e70bf] text-white py-1 px-2 font-bold align-middle">Period</th>
                  <th colSpan="2" className="bg-[#1e70bf] text-white py-0.5 px-2 font-bold text-center border-l border-blue-400">Administrative Staff</th>
                  <th colSpan="2" className="bg-[#1e70bf] text-white py-0.5 px-2 font-bold text-center border-l border-blue-400">Scientist</th>
                  <th colSpan="2" className="bg-[#1e70bf] text-white py-0.5 px-2 font-bold text-center border-l border-blue-400">Technical Staff</th>
                </tr>
                <tr>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right border-l border-blue-400">Exit Count</th>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right">Rate %</th>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right border-l border-blue-400">Exit Count</th>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right">Rate %</th>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right border-l border-blue-400">Exit Count</th>
                  <th className="bg-[#2b70c9] text-white py-0.5 px-1.5 text-right">Rate %</th>
                </tr>
              </thead>
              <tbody>
                {staffCategoryAttrition.map((row) => (
                  <tr key={row.period} className="hover:bg-blue-50 border-b border-slate-100">
                    <td className="py-1 px-2 font-medium text-slate-800">{row.period}</td>
                    <td className="py-1 px-1.5 text-right text-slate-700">{row.adminExit}</td>
                    <td className="py-1 px-1.5 text-right font-medium text-slate-900">{row.adminRate}%</td>
                    <td className="py-1 px-1.5 text-right text-slate-700">{row.sciExit}</td>
                    <td className="py-1 px-1.5 text-right font-medium text-slate-900">{row.sciRate}%</td>
                    <td className="py-1 px-1.5 text-right text-slate-700">{row.techExit}</td>
                    <td className="py-1 px-1.5 text-right font-medium text-slate-900">{row.techRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
