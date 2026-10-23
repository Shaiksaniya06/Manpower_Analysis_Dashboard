import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import {
  employeeCountTrend,
  employeesByArea,
  areaStaffCategoryDistribution,
  actualVsForecast
} from '../data/powerBiData';

export default function MiddleChartsRow() {
  return (
    <div id="middle-charts-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
      
      {/* Chart 1: EMPLOYEE COUNT TREND */}
      <div className="pbi-card p-3 flex flex-col justify-between">
        <h3 className="pbi-card-title mb-1.5">EMPLOYEE COUNT TREND</h3>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={employeeCountTrend} margin={{ top: 18, right: 12, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 600]} ticks={[0, 200, 400, 600]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                formatter={(val) => [`${val} employees`, 'Headcount']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#1e70bf"
                strokeWidth={2}
                dot={{ r: 3, fill: '#1e70bf' }}
                activeDot={{ r: 5 }}
              >
                <LabelList dataKey="count" position="top" style={{ fontSize: '10px', fill: '#1e293b', fontWeight: 600 }} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: EMPLOYEES BY AREA */}
      <div className="pbi-card p-3 flex flex-col justify-between">
        <h3 className="pbi-card-title mb-1.5">EMPLOYEES BY AREA</h3>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={employeesByArea}
              margin={{ top: 10, right: 35, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 2000]} ticks={[0, 500, 1000, 1500]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="area" type="category" tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                formatter={(val) => [`${val} employees`, 'Count']}
              />
              <Bar dataKey="count" fill="#1e70bf" radius={[0, 2, 2, 0]} barSize={16}>
                <LabelList dataKey="count" position="right" style={{ fontSize: '10px', fill: '#1e293b', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: AREA WISE STAFF CATEGORY DISTRIBUTION */}
      <div id="staff-dist-section" className="pbi-card p-3 flex flex-col justify-between">
        <h3 className="pbi-card-title mb-1.5">AREA WISE STAFF CATEGORY DISTRIBUTION</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={areaStaffCategoryDistribution}
              stackOffset="expand"
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis 
                type="number" 
                tickFormatter={(val) => `${Math.round(val * 100)}%`}
                ticks={[0, 0.5, 1]} 
                tick={{ fontSize: 10, fill: '#64748b' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis dataKey="area" type="category" tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                formatter={(val, name) => [`${val}%`, name]}
              />
              <Bar dataKey="administrative" name="Administrative Staff" stackId="a" fill="#38bdf8" barSize={16} />
              <Bar dataKey="scientist" name="Scientist" stackId="a" fill="#1e3a8a" barSize={16} />
              <Bar dataKey="technical" name="Technical Staff" stackId="a" fill="#f97316" barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Custom Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] text-[#475569] font-medium pt-1 border-t border-[#f1f5f9]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span> Administrative
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1e3a8a]"></span> Scientist
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Technical
          </span>
        </div>
      </div>

      {/* Chart 4: EMPLOYEE HEADCOUNT: ACTUAL VS FORECAST */}
      <div className="pbi-card p-3 flex flex-col justify-between">
        <h3 className="pbi-card-title mb-1.5">EMPLOYEE HEADCOUNT: ACTUAL VS FORECAST</h3>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={actualVsForecast} margin={{ top: 18, right: 12, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 600]} ticks={[0, 200, 400, 600]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ fontSize: '11px', borderRadius: '4px', padding: '4px 8px' }}
                formatter={(val, name) => [`${val || '—'}`, name === 'actual' ? 'Actual Headcount' : 'Forecast Projection']}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#1e70bf"
                strokeWidth={2}
                dot={{ r: 3, fill: '#1e70bf' }}
              >
                <LabelList dataKey="actual" position="top" style={{ fontSize: '9px', fill: '#1e293b' }} />
              </Line>
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#64748b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
