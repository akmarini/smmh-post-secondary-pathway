import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  FileSpreadsheet, 
  Search, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  KeyRound,
  Trash2,
  Users
} from 'lucide-react';
import { CohortStudentLog, YEAR_11_CLASSES } from '../types';
import { exportCohortToCsv } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { SmmhtLogo } from './SmmhtLogo';

interface CounselorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_COUNSELOR_PASS = 'SMMHCounselor2026';

export const CounselorPortalModal: React.FC<CounselorPortalModalProps> = ({
  isOpen,
  onClose
}) => {
  const { lang, t } = useLanguage();
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [cohortData, setCohortData] = useState<CohortStudentLog[]>([]);
  const [isLoadingCohort, setIsLoadingCohort] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [pathwayFilter] = useState('ALL');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchCohortData();
    }
  }, [isOpen, isAuthenticated]);

  const fetchCohortData = async () => {
    setIsLoadingCohort(true);
    try {
      const res = await fetch('/api/cohort');
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setCohortData(json.data);
      }
    } catch (e) {
      console.warn('Using local cohort fallback:', e);
    } finally {
      setIsLoadingCohort(false);
    }
  };

  const handleClearCohort = async () => {
    if (cohortData.length === 0) return;
    const confirmed = window.confirm(t.clearCohortConfirm || 'Adakah anda pasti mahu memadamkan semua rekod pelajar dari Portal Kaunselor?');
    if (!confirmed) return;

    setIsClearing(true);
    try {
      const res = await fetch('/api/cohort', {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        setCohortData([]);
      }
    } catch (e) {
      console.warn('Could not clear backend cohort:', e);
      setCohortData([]);
    } finally {
      setIsClearing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEFAULT_COUNSELOR_PASS) {
      setIsAuthenticated(true);
      setAuthError('');
      fetchCohortData();
    } else {
      setAuthError(lang === 'ms' 
        ? 'Kata laluan tidak sah. Sila gunakan "SMMHCounselor2026".' 
        : 'Incorrect password. Please use "SMMHCounselor2026".');
    }
  };

  const handleExportCsv = () => {
    if (cohortData.length === 0) return;
    exportCohortToCsv(cohortData);
  };

  if (!isOpen) return null;

  // Filtered list
  const filteredStudents = cohortData.filter((s) => {
    const matchesSearch =
      searchFilter.trim() === '' ||
      (s.studentName && s.studentName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (s.icNumber && s.icNumber.includes(searchFilter)) ||
      (s.riasecCode && s.riasecCode.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesClass = classFilter === 'ALL' || s.studentClass === classFilter;
    const matchesPathway =
      pathwayFilter === 'ALL' ||
      (s.firstChoicePathway && s.firstChoicePathway.toLowerCase().includes(pathwayFilter.toLowerCase()));

    return matchesSearch && matchesClass && matchesPathway;
  });

  // Calculate cohort aggregate metrics
  const totalStudents = cohortData.length;
  const ptetEligibleCount = cohortData.filter((s) => s.totalCredits >= 5 && (s.bmGrade?.startsWith('A') || s.bmGrade?.startsWith('B') || s.bmGrade?.startsWith('C'))).length;
  const pbEligibleCount = cohortData.filter((s) => s.totalCredits >= 5 && (s.engGrade?.startsWith('A') || s.engGrade?.startsWith('B') || s.engGrade?.startsWith('C'))).length;
  const passportsCompletedCount = cohortData.filter((s) => s.passportCompleted).length;
  const avgCredits = totalStudents > 0 
    ? (cohortData.reduce((acc, curr) => acc + (curr.totalCredits || 0), 0) / totalStudents).toFixed(1)
    : '0.0';

  // RIASEC breakdown in cohort
  const riasecCounts: Record<string, number> = {};
  cohortData.forEach((s) => {
    const code = s.riasecCode || 'LAIN';
    riasecCounts[code] = (riasecCounts[code] || 0) + 1;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl border border-sky-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-sky-800 text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-700">
          <div className="flex items-center gap-3">
            <SmmhtLogo size="md" className="shrink-0 drop-shadow" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">{t.counselorPortalHeader}</h3>
                <span className="bg-amber-400 text-sky-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {t.restrictedAccessBadge}
                </span>
              </div>
              <p className="text-xs text-sky-200">
                {t.schoolNameHeader} • {lang === 'ms' ? 'Analisis Data Tahun 11' : 'Year 11 Student Analytics'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-sky-200 hover:text-white hover:bg-sky-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isAuthenticated ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center mx-auto border border-sky-200">
                <KeyRound className="w-7 h-7 text-sky-700" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-sky-900 uppercase tracking-wide">
                  {t.counselorLoginTitle}
                </h4>
                <p className="text-xs text-slate-600">
                  {t.counselorLoginDesc}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                    {t.passwordLabel}:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full h-10 px-3 pr-10 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-sky-500 bg-slate-50 focus:bg-white"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded bg-rose-50 text-rose-800 text-xs border border-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-10 rounded bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 border border-sky-700"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.verifyAccessBtn}</span>
                </button>
              </form>

              <div className="pt-2 text-[11px] text-slate-500 italic">
                {lang === 'ms' 
                  ? 'Kebenaran khas Kaunselor & Pentadbiran Sekolah Menengah Muda Hashim sahaja.' 
                  : 'Authorized SMMH Counselors & Administration only.'}
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              {/* Top Action Bar & Export/Clear Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sky-50/50 p-4 rounded-lg border border-sky-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase">
                    {t.sessionActiveBadge}
                  </span>
                  <button
                    onClick={fetchCohortData}
                    disabled={isLoadingCohort || isClearing}
                    className="p-1 text-slate-500 hover:text-sky-800 rounded transition-colors"
                    title={lang === 'ms' ? 'Muat semula data pelajar' : 'Refresh student records'}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCohort || isClearing ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="clear-cohort-btn"
                    onClick={handleClearCohort}
                    disabled={cohortData.length === 0 || isClearing}
                    className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all border ${
                      cohortData.length === 0 || isClearing
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border-rose-200 hover:border-rose-300'
                    }`}
                    title={lang === 'ms' ? 'Kosongkan semua rekod pelajar' : 'Clear all student records'}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>{t.clearCohortBtn || (lang === 'ms' ? 'Kosongkan Rekod' : 'Clear Records')}</span>
                  </button>

                  <button
                    id="export-cohort-csv-btn"
                    onClick={handleExportCsv}
                    disabled={cohortData.length === 0}
                    className={`px-4 py-2 rounded text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all border ${
                      cohortData.length === 0
                        ? 'bg-slate-300 text-slate-500 border-slate-300 cursor-not-allowed'
                        : 'bg-sky-700 hover:bg-sky-800 border-sky-700'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.exportCsvBtn}</span>
                  </button>
                </div>
              </div>

              {/* Aggregated Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.totalLoggedStudents}</div>
                  <div className="text-xl font-black text-sky-900 font-mono mt-1">{totalStudents}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{passportsCompletedCount} {t.passportsCompleted}</div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-300">
                  <div className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">{t.ptetEligible}</div>
                  <div className="text-xl font-black text-emerald-950 font-mono mt-1">{ptetEligibleCount}</div>
                  <div className="text-[10px] text-emerald-800 mt-0.5">
                    {totalStudents > 0 ? `${Math.round((ptetEligibleCount / totalStudents) * 100)}% ${t.cohortPercent}` : '0%'}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-sky-50 border border-sky-300">
                  <div className="text-[10px] font-bold text-sky-900 uppercase tracking-wider">{t.pbEligible}</div>
                  <div className="text-xl font-black text-sky-950 font-mono mt-1">{pbEligibleCount}</div>
                  <div className="text-[10px] text-sky-800 mt-0.5">{t.pbBenchmark}</div>
                </div>

                <div className="p-4 rounded-lg bg-purple-50/70 border border-purple-300">
                  <div className="text-[10px] font-bold text-purple-900 uppercase tracking-wider">{t.avgCreditsTitle}</div>
                  <div className="text-xl font-black text-purple-950 font-mono mt-1">{avgCredits}</div>
                  <div className="text-[10px] text-purple-800 mt-0.5">{t.creditsPerStudent}</div>
                </div>
              </div>

              {/* RIASEC Profile Distribution Bar */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="text-xs font-black text-sky-900 uppercase tracking-wider">
                  {t.riasecDistributionTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(riasecCounts).map(([code, count]) => (
                    <span
                      key={code}
                      className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-bold text-sky-900 flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="font-mono text-sky-700">{code}:</span>
                      <span>{count} {lang === 'ms' ? 'Pelajar' : 'Students'}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Filters & Search Table */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Search input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t.searchFilterPlaceholder}
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 rounded border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Class Filter */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="h-9 px-3 rounded border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:border-sky-500 focus:outline-none"
                    >
                      <option value="ALL">{t.allClasses}</option>
                      {YEAR_11_CLASSES.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-slate-200 rounded-lg overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sky-800 text-white uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="p-3">{t.tableStudentName}</th>
                        <th className="p-3">{t.tableClass}</th>
                        <th className="p-3">{t.tableCredits}</th>
                        <th className="p-3">{t.tableCoreGrades}</th>
                        <th className="p-3">RIASEC</th>
                        <th className="p-3">{t.tableFirstChoice}</th>
                        <th className="p-3">{t.tablePassportStatus}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-sky-50/40 transition-colors">
                            <td className="p-3 font-bold text-slate-900">
                              <div>{s.studentName}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{s.icNumber}</div>
                            </td>
                            <td className="p-3 font-medium text-slate-700">{s.studentClass}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                                s.totalCredits >= 5
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                  : s.totalCredits >= 3
                                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {s.totalCredits} Cr
                              </span>
                            </td>
                            <td className="p-3 font-mono text-slate-700 text-[11px]">
                              {s.bmGrade || '-'}/{s.engGrade || '-'}/{s.mathGrade || '-'}
                            </td>
                            <td className="p-3">
                              <span className="font-mono font-bold px-1.5 py-0.5 bg-sky-50 text-sky-900 rounded border border-sky-200 text-[11px]">
                                {s.riasecCode || '-'}
                              </span>
                            </td>
                            <td className="p-3 max-w-[200px] truncate text-slate-700 text-[11px]" title={s.firstChoicePathway}>
                              {s.firstChoicePathway || '-'}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                s.passportCompleted
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                {s.passportCompleted ? (lang === 'ms' ? 'Lengkap' : 'Completed') : (lang === 'ms' ? 'Dalam Proses' : 'In Progress')}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 px-6 text-center">
                            <div className="flex flex-col items-center justify-center space-y-2 text-slate-500">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <Users className="w-5 h-5" />
                              </div>
                              <p className="font-semibold text-slate-700 text-xs">{t.noStudentsFound}</p>
                              <p className="text-[11px] text-slate-400 max-w-sm">
                                {lang === 'ms'
                                  ? 'Portal Kaunselor kini kosong. Rekod pelajar akan didaftarkan secara automatik apabila pelajar melengkapkan dan menyimpan Pasport Hala Tuju mereka.'
                                  : 'The Counselor Portal is currently cleared. Student records will be automatically logged when students complete and save their Pathway Passport.'}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>{t.portalFooterTag}</span>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPasswordInput('');
              onClose();
            }}
            className="text-sky-800 hover:text-sky-950 font-bold uppercase text-[11px] tracking-wider"
          >
            {t.closePortalBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
