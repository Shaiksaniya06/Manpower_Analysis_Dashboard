import React from 'react';
import { 
  X, 
  Mail, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Award, 
  Laptop
} from 'lucide-react';

export default function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  const statusColorMap = {
    'Active': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Notice Period': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'On Leave': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Probation': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-card w-full max-w-xl rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative overflow-hidden bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Section */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-lg"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-wide">{employee.name}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColorMap[employee.status] || 'bg-slate-800 text-slate-300'}`}>
                {employee.status}
              </span>
            </div>
            <p className="text-sm text-indigo-400 font-medium">{employee.role}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 font-mono text-slate-300">{employee.id}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {employee.location}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 py-6 text-xs">
          
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Department
            </span>
            <p className="font-semibold text-slate-200">{employee.department}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Laptop className="w-3.5 h-3.5 text-emerald-400" /> Work Arrangement
            </span>
            <p className="font-semibold text-slate-200">{employee.workModel} ({employee.type})</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Tenure & Join Date
            </span>
            <p className="font-semibold text-slate-200">{employee.tenure} (Joined {employee.joinDate})</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Annual Base Compensation
            </span>
            <p className="font-semibold text-emerald-400 font-mono text-sm">${employee.salary.toLocaleString()} / yr</p>
          </div>

          <div className="col-span-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-purple-400" /> Performance Rating
              </span>
              <p className="font-semibold text-white mt-0.5">{employee.performance}</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
              Verified HR Record
            </span>
          </div>

          <div className="col-span-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Internal Email
              </span>
              <p className="font-mono text-slate-300 mt-0.5 select-all">{employee.email}</p>
            </div>
            <a
              href={`mailto:${employee.email}`}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition font-medium text-xs flex items-center gap-1"
            >
              Contact
            </a>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
          >
            Close
          </button>
          <button
            onClick={() => alert(`Opening compensation review workflow for ${employee.name}`)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-indigo-600/30"
          >
            Manage Record
          </button>
        </div>

      </div>
    </div>
  );
}
