import React, { useState } from 'react';
import { 
  Calculator, 
  BrainCircuit, 
  Briefcase, 
  BookOpenCheck, 
  Users, 
  Save, 
  Menu, 
  X, 
  CheckCheck,
  Globe,
  Sparkles,
  Shield,
  GraduationCap,
  Compass,
  GitBranch
} from 'lucide-react';
import { SmmhHalaTujuState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { calculateCredits, isCreditGrade } from '../data/pathwayRules';
import { SmmhtLogo } from './SmmhtLogo';

export type NavTab = 'calculator' | 'visualPathway' | 'riasec' | 'careers' | 'passport' | 'parentshub';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  state: SmmhHalaTujuState;
  onSaveProgress: () => void;
  isSaving?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  state,
  onSaveProgress,
  isSaving
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const creditSummary = calculateCredits(state?.subjectGrades || []);
  const totalCredits = creditSummary.totalCredits;
  const bmSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-bm' || s.id === 'bm');
  const engSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-eng' || s.id === 'english');
  const mathSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-math' || s.id === 'math_d');

  const hasBmCredit = bmSubject ? isCreditGrade(bmSubject.grade) : false;
  const hasEngCredit = engSubject ? isCreditGrade(engSubject.grade) : false;
  const hasMathCredit = mathSubject ? isCreditGrade(mathSubject.grade) : false;

  const riasecAnsweredCount = Object.keys(state?.riasecAnswers || {}).length;
  const isRiasecComplete = riasecAnsweredCount >= 24;
  const hasCareerSelected = Boolean(state?.profile?.targetAspirations && state.profile.targetAspirations.trim().length > 0);

  const navItems: {
    id: NavTab;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    badge: string;
    badgeStyle: string;
  }[] = [
    {
      id: 'calculator',
      label: t.navCalculator,
      subLabel: lang === 'ms' ? 'Kira Gred & Semak Kelayakan' : 'Calculate Grades & Pathways',
      icon: <Calculator className="w-4 h-4" />,
      badge: `${totalCredits} ${lang === 'ms' ? 'Kredit' : 'Credits'}`,
      badgeStyle: totalCredits >= 5 
        ? 'bg-emerald-400 text-sky-950 font-black' 
        : totalCredits >= 3 
        ? 'bg-sky-200 text-sky-950 font-bold' 
        : 'bg-sky-700 text-sky-100'
    },
    {
      id: 'visualPathway',
      label: t.navVisualPathway || (lang === 'ms' ? 'Peta Visual & Kolej Swasta' : 'Visual Pathways & Private Colleges'),
      subLabel: lang === 'ms' ? 'PTET, PB, IBTE & Swasta' : 'Roadmap & Private Colleges',
      icon: <GitBranch className="w-4 h-4" />,
      badge: 'CCCT, LCB, IGS',
      badgeStyle: 'bg-amber-400 text-sky-950 font-black'
    },
    {
      id: 'riasec',
      label: t.navRiasec,
      subLabel: lang === 'ms' ? 'Minat Kerjaya Holland' : 'Holland Career Personality',
      icon: <BrainCircuit className="w-4 h-4" />,
      badge: isRiasecComplete 
        ? `Kod: ${state?.riasecCode || 'RIASEC'}` 
        : `${riasecAnsweredCount}/24`,
      badgeStyle: isRiasecComplete 
        ? 'bg-amber-400 text-sky-950 font-black' 
        : 'bg-sky-700 text-sky-100'
    },
    {
      id: 'careers',
      label: t.navCareers,
      subLabel: lang === 'ms' ? 'ABDB, RB Airlines, PPDB' : 'RBAF, RB Airlines, Police',
      icon: <Briefcase className="w-4 h-4" />,
      badge: hasCareerSelected 
        ? (lang === 'ms' ? '✓ Terpilih' : '✓ Selected') 
        : 'RBAF & RB',
      badgeStyle: hasCareerSelected 
        ? 'bg-amber-400 text-sky-950 font-black' 
        : 'bg-sky-700 text-sky-100'
    },
    {
      id: 'passport',
      label: t.navPassport,
      subLabel: lang === 'ms' ? 'Ringkasan & Muat Turun PDF' : 'Summary & Download PDF',
      icon: <BookOpenCheck className="w-4 h-4" />,
      badge: state?.passportCompleted 
        ? (lang === 'ms' ? '✓ Lengkap' : '✓ Ready') 
        : (lang === 'ms' ? 'Draf' : 'Draft'),
      badgeStyle: state?.passportCompleted 
        ? 'bg-emerald-400 text-sky-950 font-black' 
        : 'bg-sky-700 text-sky-100'
    },
    {
      id: 'parentshub',
      label: t.navParentsHub,
      subLabel: lang === 'ms' ? 'Elaun & Laluan Bas Tutong' : 'Allowances & Tutong Buses',
      icon: <Users className="w-4 h-4" />,
      badge: 'Tutong Hub',
      badgeStyle: 'bg-sky-700 text-sky-100'
    }
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-sky-800 text-white border-b border-sky-700 shadow-md print:hidden print-hidden">
      {/* Top Header Bar */}
      <div className="bg-sky-950 text-sky-200 text-xs px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-sky-900 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-bold text-white tracking-wider uppercase">{t.schoolName}</span>
          <span className="hidden sm:inline text-sky-300">| {t.schoolSubtitle.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-3">
          {state.profile.studentName && (
            <span className="hidden md:inline font-sans text-xs text-amber-300 font-semibold bg-sky-900/80 px-2 py-0.5 rounded border border-sky-700">
              {state.profile.studentName} {state.profile.studentClass ? `(${state.profile.studentClass})` : ''}
            </span>
          )}
          {state.lastSavedAt && (
            <span className="text-[11px] text-sky-300 flex items-center gap-1">
              <CheckCheck className="w-3 h-3 text-amber-400" />
              {t.savedAt} {new Date(state.lastSavedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Main Branding & Quick Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none" 
            onClick={() => setActiveTab('calculator')}
            title="Sekolah Menengah Muda Hashim Tutong"
          >
            <SmmhtLogo size="lg" className="shrink-0 transition-transform group-hover:scale-105" withGlow />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  Hala Tuju <span className="text-amber-400">Navigator</span>
                </h1>
                <span className="bg-sky-700/80 text-sky-100 text-[9px] font-bold px-1.5 py-0.5 rounded border border-sky-500 uppercase tracking-wider hidden sm:inline-block">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-[11px] text-sky-200 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Action CTAs: Language Switcher & Save Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Toggle */}
            <div 
              id="language-switcher-group"
              className="flex items-center bg-sky-950 p-0.5 rounded border border-sky-700 shadow-inner"
              title={t.langToggleTooltip}
            >
              <div className="px-1.5 py-1 text-sky-300 hidden sm:flex items-center">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <button
                id="lang-btn-ms"
                onClick={() => setLang('ms')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all uppercase tracking-wider ${
                  lang === 'ms'
                    ? 'bg-amber-400 text-sky-950 shadow-sm font-black'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={lang === 'ms'}
              >
                BM
              </button>
              <button
                id="lang-btn-en"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all uppercase tracking-wider ${
                  lang === 'en'
                    ? 'bg-amber-400 text-sky-950 shadow-sm font-black'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>

            {/* Save Button */}
            <button
              id="header-save-progress-btn"
              onClick={onSaveProgress}
              disabled={isSaving}
              className="flex items-center gap-2 bg-amber-400 text-sky-950 px-3.5 sm:px-4 py-1.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors border border-amber-500 shadow-sm"
              title={t.saveProgress}
            >
              <Save className={`w-3.5 h-3.5 text-sky-950 ${isSaving ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t.saveProgress}</span>
              <span className="sm:hidden">{lang === 'ms' ? 'Simpan' : 'Save'}</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded bg-sky-700 text-white hover:bg-sky-600 transition-colors border border-sky-600"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Unified Dashboard Guidance Tabs Bar (Scrollable & Fully Responsive) */}
      <div className="bg-sky-900/95 border-t border-sky-700/80 px-2 sm:px-6 shadow-inner">
        <div className="max-w-7xl mx-auto relative">
          <nav 
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 scrollbar-none select-none"
            aria-label="Laman Bimbingan Dashboard"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`dashboard-top-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`shrink-0 py-2 px-3 sm:px-3.5 rounded-md flex items-center gap-2.5 transition-all text-left border ${
                    isActive
                      ? 'bg-sky-800 text-white border-amber-400 shadow-md ring-1 ring-amber-400/40'
                      : 'bg-sky-950/40 border-sky-800/80 text-sky-100 hover:bg-sky-800 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded transition-colors ${
                    isActive 
                      ? 'bg-amber-400 text-sky-950' 
                      : 'bg-sky-800/80 text-sky-200'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
                      <span className={isActive ? 'text-amber-300 font-black' : 'text-white'}>
                        {item.label}
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>}
                    </div>
                    <div className="text-[10px] text-sky-300 whitespace-nowrap hidden sm:block">
                      {item.subLabel}
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded shrink-0 shadow-xs font-mono ${item.badgeStyle}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-sky-950 border-t border-sky-800 px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Language Switcher row */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-850">
            <span className="text-xs text-sky-200 font-bold uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              {t.language}
            </span>
            <div className="flex items-center bg-sky-900 p-0.5 rounded border border-sky-700">
              <button
                id="mobile-lang-btn-ms"
                onClick={() => setLang('ms')}
                className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  lang === 'ms' ? 'bg-amber-400 text-sky-950 font-black' : 'text-white/70'
                }`}
              >
                Bahasa Melayu
              </button>
              <button
                id="mobile-lang-btn-en"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  lang === 'en' ? 'bg-amber-400 text-sky-950 font-black' : 'text-white/70'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded text-left transition-all border ${
                  isActive
                    ? 'bg-sky-800 text-white border-amber-400 shadow-sm font-bold'
                    : 'bg-sky-900/60 text-sky-100 border-sky-800 hover:bg-sky-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${isActive ? 'bg-amber-400 text-sky-950' : 'bg-sky-800 text-sky-200'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-[10px] text-sky-300">{item.subLabel}</div>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded ${item.badgeStyle}`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
