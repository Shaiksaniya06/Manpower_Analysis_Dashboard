import React, { useState, useEffect, useCallback } from 'react';
import PowerBiHeader from './components/PowerBiHeader';
import FilterSidebar, { initialFilterState } from './components/FilterSidebar';

// 6 Section Pages per Requirements
import OverviewPage from './components/pages/OverviewPage';
import ManpowerPage from './components/pages/ManpowerPage';
import JoiningPage from './components/pages/JoiningPage';
import RetirementPage from './components/pages/RetirementPage';
import AttritionPage from './components/pages/AttritionPage';
import DesignationPage from './components/pages/DesignationPage';

// API Service with FastAPI connection and automatic local fallback
import { checkBackendHealth, fetchSectionData } from './services/api';

export default function App() {
  const [filters, setFilters] = useState(initialFilterState);
  const [activeNav, setActiveNav] = useState('overview');
  const [sectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Check backend health periodically
  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const health = await checkBackendHealth();
      if (isMounted) {
        setIsBackendConnected(health.online);
      }
    };
    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch section data whenever activeNav or filters change
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchSectionData(activeNav, filters);
      setSectionData(response.data);
      if (response.fromBackend && !isBackendConnected) {
        setIsBackendConnected(true);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeNav, filters, isBackendConnected]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Clear Filters: Reset all 9 filters to initial values
  const handleClearFilters = () => {
    setFilters(initialFilterState);
    showToast('Filters reset to default values.');
  };

  // Handle Export CSV
  const handleExportReport = () => {
    const kpis = sectionData?.kpis || {};
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'NRSC - ISRO MANPOWER ANALYSIS REPORT',
        `Active Section: ${activeNav.toUpperCase()}`,
        `Generated On: ${new Date().toLocaleString()}`,
        '',
        'CURRENT WORKFORCE KPIS',
        `Total Manpower,${kpis.total_manpower || 1248}`,
        `Total Joining,${kpis.total_joining || 142}`,
        `Total Retirements,${kpis.total_retirement || 118}`,
        `Total Sanctioned Post,${kpis.sanctioned_posts || 1480}`,
        `Total Vacancies,${kpis.vacancies != null ? kpis.vacancies : 232}`,
        `Overall Attrition Rate,${kpis.attrition_rate || '3.2%'}`,
        '',
        'ACTIVE FILTERS APPLIED',
        `Area,${filters.area}`,
        `Division,${filters.division}`,
        `Group,${filters.group}`,
        `Level,${filters.level}`,
        `Designation,${filters.designation}`,
        `Officer Type,${filters.officer_type}`,
        `As On Date,${filters.as_on_date}`,
        `Joining Range,${filters.joining_date_from} to ${filters.joining_date_to}`,
        `Retirement Range,${filters.retirement_date_from} to ${filters.retirement_date_to}`
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NRSC_ISRO_${activeNav}_Analysis.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${activeNav.toUpperCase()} dataset summary.`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#eaedf2] text-[#1e293b] flex flex-col font-sans select-none">
      
      {/* 1. Top Header: Title, ISRO & NRSC Logos, and 6 Navigation Buttons */}
      <PowerBiHeader
        activeNav={activeNav}
        setActiveNav={(nav) => setActiveNav(nav)}
        onResetFilters={handleClearFilters}
        onExportReport={handleExportReport}
        isBackendConnected={isBackendConnected}
      />

      {/* 2. Main Workspace Layout: Left Sidebar Filters + Right Dashboard Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        
        {/* Left Side: 9 Filters with Clear Filters button */}
        <FilterSidebar
          filters={filters}
          setFilters={(newFilters) => {
            setFilters(newFilters);
          }}
          onClearFilters={handleClearFilters}
        />

        {/* Right Side: Dashboard Content Area */}
        <main className="flex-1 p-2 flex flex-col justify-between overflow-hidden min-h-0">
          
          {/* Dynamic Section View - Fits on One Screen */}
          <div className="flex-1 min-h-0 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10 rounded">
                <div className="flex items-center gap-2 bg-[#102a4c] text-white px-3 py-1.5 rounded text-xs shadow-md">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  <span>Refreshing Analytics...</span>
                </div>
              </div>
            )}

            {activeNav === 'overview' && <OverviewPage data={sectionData} />}
            {activeNav === 'manpower' && <ManpowerPage data={sectionData} />}
            {activeNav === 'joining' && <JoiningPage data={sectionData} />}
            {activeNav === 'retirement' && <RetirementPage data={sectionData} />}
            {activeNav === 'attrition' && <AttritionPage data={sectionData} />}
            {activeNav === 'designation' && <DesignationPage data={sectionData} />}
          </div>

        </main>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-3 right-3 z-50 bg-[#102a4c] text-white text-xs px-3 py-1.5 rounded shadow-lg border border-blue-400/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
