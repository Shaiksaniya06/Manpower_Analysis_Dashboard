import React, { useState, useMemo } from 'react';
import { 
  Contact2, 
  Search, 
  Download, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  MapPin
} from 'lucide-react';
import EmployeeModal from '../EmployeeModal';

export default function EmployeeDirectoryView({ 
  employeeRoster, 
  departmentData, 
  selectedDept, 
  setSelectedDept,
  searchQuery,
  setSearchQuery
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [workModelFilter, setWorkModelFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Status badge styling
  const statusColorMap = {
    'Active': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Notice Period': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'On Leave': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Probation': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  };

  // Filtered and sorted dataset
  const filteredEmployees = useMemo(() => {
    return employeeRoster.filter((emp) => {
      // Department filter
      if (selectedDept !== 'all') {
        const deptObj = departmentData.find(d => d.id === selectedDept);
        if (deptObj && emp.department !== deptObj.name) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && emp.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Work Model filter
      if (workModelFilter !== 'all' && emp.workModel.toLowerCase() !== workModelFilter.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = emp.name.toLowerCase().includes(q);
        const matchesRole = emp.role.toLowerCase().includes(q);
        const matchesDept = emp.department.toLowerCase().includes(q);
        const matchesId = emp.id.toLowerCase().includes(q);
        const matchesLoc = emp.location.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesDept && !matchesId && !matchesLoc) return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [employeeRoster, selectedDept, departmentData, statusFilter, workModelFilter, searchQuery, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export filtered roster to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Department', 'Location', 'Status', 'Employment Type', 'Work Model', 'Tenure', 'Salary', 'Performance', 'Join Date', 'Email'];
    const rows = filteredEmployees.map(emp => [
      emp.id,
      `"${emp.name}"`,
      `"${emp.role}"`,
      `"${emp.department}"`,
      `"${emp.location}"`,
      emp.status,
      emp.type,
      emp.workModel,
      emp.tenure,
      emp.salary,
      `"${emp.performance}"`,
      emp.joinDate,
      emp.email
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `workforce_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Contact2 className="w-5 h-5 text-indigo-400" />
            Employee Directory & Workforce Roster
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive roster of personnel with multi-dimensional filtering, status tracking, and record inspection.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="export-directory-btn"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export Filtered CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Local Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search roster by name, title, department, ID, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 text-xs text-slate-200 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          
          {/* Department Select */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-900 text-slate-200 px-3 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="all">All Departments</option>
            {departmentData.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 text-slate-200 px-3 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="notice period">Notice Period</option>
            <option value="on leave">On Leave</option>
            <option value="probation">Probation</option>
          </select>

          {/* Work Model Filter */}
          <select
            value={workModelFilter}
            onChange={(e) => setWorkModelFilter(e.target.value)}
            className="bg-slate-900 text-slate-200 px-3 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="all">All Work Models</option>
            <option value="remote">Fully Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="on-site">On-Site</option>
          </select>

          {/* Clear Filters */}
          {(selectedDept !== 'all' || statusFilter !== 'all' || workModelFilter !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedDept('all');
                setStatusFilter('all');
                setWorkModelFilter('all');
                setSearchQuery('');
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium px-2 py-1 text-xs"
            >
              Reset
            </button>
          )}

        </div>

      </div>

      {/* Employee Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredEmployees.length}</strong> of{' '}
            <strong className="text-white">{employeeRoster.length}</strong> verified personnel records
          </span>
          <span className="text-[11px]">Click any employee row to inspect complete record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold select-none">
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">
                    ID {sortField === 'id' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    Employee {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('department')}>
                  <div className="flex items-center gap-1">
                    Department {sortField === 'department' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('location')}>
                  <div className="flex items-center gap-1">
                    Location {sortField === 'location' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('workModel')}>
                  <div className="flex items-center gap-1">
                    Model {sortField === 'workModel' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    Status {sortField === 'status' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('tenure')}>
                  <div className="flex items-center gap-1">
                    Tenure {sortField === 'tenure' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('salary')}>
                  <div className="flex items-center justify-end gap-1">
                    Salary {sortField === 'salary' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className="hover:bg-slate-800/40 cursor-pointer transition group"
                  >
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-400 group-hover:text-indigo-400 transition">
                      {emp.id}
                    </td>

                    {/* Employee Profile */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition"
                        />
                        <div>
                          <p className="font-semibold text-white group-hover:text-indigo-300 transition">
                            {emp.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{emp.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4 text-slate-300">
                      {emp.department}
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {emp.location}
                      </span>
                    </td>

                    {/* Work Model */}
                    <td className="py-3 px-4">
                      <span className="text-slate-300 text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {emp.workModel}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusColorMap[emp.status] || 'bg-slate-800 text-slate-300'}`}>
                        {emp.status}
                      </span>
                    </td>

                    {/* Tenure */}
                    <td className="py-3 px-4 text-slate-300 font-mono text-xs">
                      {emp.tenure}
                    </td>

                    {/* Salary */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-200">
                      ${emp.salary.toLocaleString()}
                    </td>

                    {/* View Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition"
                        title="Inspect record"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-500">
                    <p className="font-medium text-sm">No employees match your search criteria</p>
                    <p className="text-xs mt-1">Try resetting filters or adjusting search keyword.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Employee Modal Dialog */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

    </div>
  );
}
