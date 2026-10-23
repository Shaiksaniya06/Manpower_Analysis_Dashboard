import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function ManpowerSection({ data }) {
  const {
    total_manpower_trend = [],
    manpower_by_division = [],
    manpower_by_group = [],
    sanctioned_vs_actual = []
  } = data || {};

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 min-h-0">
      
      {/* 1. Total Manpower Trend Over Time */}
      <div className="bg-white border border-[#d8dde6] rounded p-2 flex flex-col shadow-xs min-h-[170px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f5f9] mb-1">
          <span className="text-[11px] font-bold text-[#1e293b] uppercase tracking-wide">
            Total Manpower Trend (2021 - 2026)
          </span>
          <span className="text-[9px] font-semibold text-[#2563eb] bg-blue-50 px-1.5 py-0.5 rounded">
            Headcount Growth
          </span>
        </div>
        <div className="flex-1 min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={total_manpower_trend} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line
                type="monotone"
                dataKey="manpower"
                name="Actual In-Position"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#2563eb' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Sanctioned Strength"
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth={1.8}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Manpower by Division */}
      <div className="bg-white border border-[#d8dde6] rounded p-2 flex flex-col shadow-xs min-h-[170px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f5f9] mb-1">
          <span className="text-[11px] font-bold text-[#1e293b] uppercase tracking-wide">
            Manpower by Division
          </span>
          <span className="text-[9px] font-semibold text-[#10b981] bg-emerald-50 px-1.5 py-0.5 rounded">
            Division Distribution
          </span>
        </div>
        <div className="flex-1 min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={manpower_by_division} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="division" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <Bar dataKey="count" name="Staff Count" radius={[3, 3, 0, 0]}>
                {manpower_by_division.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Manpower by Group */}
      <div className="bg-white border border-[#d8dde6] rounded p-2 flex flex-col shadow-xs min-h-[170px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f5f9] mb-1">
          <span className="text-[11px] font-bold text-[#1e293b] uppercase tracking-wide">
            Manpower by Group
          </span>
          <span className="text-[9px] font-semibold text-[#8b5cf6] bg-purple-50 px-1.5 py-0.5 rounded">
            Cadre Proportion
          </span>
        </div>
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={manpower_by_group}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={58}
                paddingAngle={3}
                dataKey="count"
                nameKey="group"
              >
                {manpower_by_group.map((entry, index) => (
                  <Cell key={`grp-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item) => [`${val} staff (${item.payload.percentage || 0}%)`, item.payload.group]}
                contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Sanctioned versus Actual Manpower */}
      <div className="bg-white border border-[#d8dde6] rounded p-2 flex flex-col shadow-xs min-h-[170px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f5f9] mb-1">
          <span className="text-[11px] font-bold text-[#1e293b] uppercase tracking-wide">
            Sanctioned vs Actual Manpower
          </span>
          <span className="text-[9px] font-semibold text-[#f59e0b] bg-amber-50 px-1.5 py-0.5 rounded">
            Cadre Fulfillment
          </span>
        </div>
        <div className="flex-1 min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sanctioned_vs_actual} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="division" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="sanctioned" name="Sanctioned Posts" fill="#93c5fd" radius={[2, 2, 0, 0]} />
              <Bar dataKey="actual" name="Actual In-Position" fill="#2563eb" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
