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
  const bmSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-bm' || s.id === 'bm' || s.subjectName?.toLowerCase().includes('bahasa melayu'));
  const engSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-eng' || s.id === 'english' || s.subjectName?.toLowerCase().includes('english') || s.subjectName?.toLowerCase().includes('second language') || s.subjectName?.toLowerCase().includes('0511') || s.subjectName?.toLowerCase().includes('esl'));
  const mathSubject = (state?.subjectGrades || []).find((s) => s.id === 'sub-math' || s.id === 'math_d' || s.subjectName?.toLowerCase().includes('mathematics') || s.subjectName?.toLowerCase().includes('0580') || s.subjectName?.toLowerCase().includes('math'));

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
        ? 'bg-yellow-300 text-sky-950 font-bold' 
        : 'bg-sky-800 text-sky-100'
    },
    {
      id: 'visualPathway',
      label: t.navVisualPathway || (lang === 'ms' ? 'Peta Visual & Kolej Swasta' : 'Visual Pathways & Private Colleges'),
      subLabel: lang === 'ms' ? 'PTET, PB, IBTE & Swasta' : 'Roadmap & Private Colleges',
      icon: <GitBranch className="w-4 h-4" />,
      badge: 'CCCT, LCB, IGS',
      badgeStyle: 'bg-yellow-400 text-sky-950 font-black'
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
        ? 'bg-yellow-400 text-sky-950 font-black' 
        : 'bg-sky-800 text-sky-100'
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
        ? 'bg-yellow-400 text-sky-950 font-black' 
        : 'bg-sky-800 text-sky-100'
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
        : 'bg-sky-800 text-sky-100'
    },
    {
      id: 'parentshub',
      label: t.navParentsHub,
      subLabel: lang === 'ms' ? 'Elaun & Laluan Bas Tutong' : 'Allowances & Tutong Buses',
      icon: <Users className="w-4 h-4" />,
      badge: 'Tutong Hub',
      badgeStyle: 'bg-sky-800 text-sky-100'
    }
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-sky-600 text-white border-b border-sky-400/40 shadow-md print:hidden print-hidden">
      {/* Top Header Bar */}
      <div className="bg-sky-700/95 text-sky-100 text-xs px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-sky-600 font-mono shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="font-bold text-white tracking-wider uppercase">{t.schoolName}</span>
          <span className="hidden sm:inline text-sky-200">| {t.schoolSubtitle.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-3">
          {state.profile.studentName && (
            <span className="hidden md:inline font-sans text-xs text-yellow-300 font-semibold bg-sky-800/90 px-2 py-0.5 rounded border border-sky-600">
              {state.profile.studentName} {state.profile.studentClass ? `(${state.profile.studentClass})` : ''}
            </span>
          )}
          {state.lastSavedAt && (
            <span className="text-[11px] text-sky-200 flex items-center gap-1 font-medium">
              <CheckCheck className="w-3 h-3 text-yellow-400" />
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
                  Hala Tuju <span className="text-yellow-300 drop-shadow-xs font-black">Navigator</span>
                </h1>
                <span className="bg-sky-700/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-yellow-400/60 uppercase tracking-wider hidden sm:inline-block shadow-xs">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-[11px] text-sky-100 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Action CTAs: Language Switcher & Save Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Toggle */}
            <div 
              id="language-switcher-group"
              className="flex items-center bg-sky-800/80 p-0.5 rounded-lg border border-sky-400/60 shadow-inner"
              title={t.langToggleTooltip}
            >
              <div className="px-1.5 py-1 text-yellow-300 hidden sm:flex items-center">
                <Globe className="w-3.5 h-3.5 text-yellow-300" />
              </div>
              <button
                id="lang-btn-ms"
                onClick={() => setLang('ms')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all uppercase tracking-wider ${
                  lang === 'ms'
                    ? 'bg-yellow-400 text-sky-950 shadow-sm font-black'
                    : 'text-white/80 hover:text-white cursor-pointer'
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
                    ? 'bg-yellow-400 text-sky-950 shadow-sm font-black'
                    : 'text-white/80 hover:text-white cursor-pointer'
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
              className="flex items-center gap-2 bg-yellow-400 text-sky-950 px-3.5 sm:px-4 py-1.5 rounded-lg font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors border border-yellow-300 shadow-sm cursor-pointer"
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
              className="lg:hidden p-2 rounded-lg bg-sky-700 text-white hover:bg-sky-600 transition-colors border border-sky-500 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Unified Dashboard Guidance Tabs Bar (Scrollable & Fully Responsive) */}
      <div className="bg-sky-700/95 backdrop-blur-md border-t border-sky-500/50 px-2 sm:px-6 shadow-inner">
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
                  className={`shrink-0 py-2 px-3 sm:px-3.5 rounded-lg flex items-center gap-2.5 transition-all text-left border cursor-pointer ${
                    isActive
                      ? 'bg-white text-sky-950 border-yellow-400 shadow-md ring-2 ring-yellow-400/70'
                      : 'bg-sky-800/50 border-sky-600/60 text-sky-50 hover:bg-sky-600 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-yellow-400 text-sky-950 shadow-xs' 
                      : 'bg-sky-800 text-sky-200'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
                      <span className={isActive ? 'text-sky-950 font-black' : 'text-white'}>
                        {item.label}
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block animate-pulse"></span>}
                    </div>
                    <div className={`text-[10px] whitespace-nowrap hidden sm:block ${isActive ? 'text-sky-700 font-semibold' : 'text-sky-200'}`}>
                      {item.subLabel}
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 shadow-xs font-mono ${item.badgeStyle}`}>
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
        <div className="lg:hidden bg-sky-800 border-t border-sky-600 px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Language Switcher row */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-700">
            <span className="text-xs text-sky-100 font-bold uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-yellow-300" />
              {t.language}
            </span>
            <div className="flex items-center bg-sky-900 p-0.5 rounded-lg border border-sky-600">
              <button
                id="mobile-lang-btn-ms"
                onClick={() => setLang('ms')}
                className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  lang === 'ms' ? 'bg-yellow-400 text-sky-950 font-black shadow-xs' : 'text-white/80'
                }`}
              >
                Bahasa Melayu
              </button>
              <button
                id="mobile-lang-btn-en"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  lang === 'en' ? 'bg-yellow-400 text-sky-950 font-black shadow-xs' : 'text-white/80'
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
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-white text-sky-950 border-yellow-400 shadow-sm font-black'
                    : 'bg-sky-900/60 text-sky-100 border-sky-700 hover:bg-sky-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${isActive ? 'bg-yellow-400 text-sky-950' : 'bg-sky-700 text-sky-200'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">{item.label}</div>
                    <div className={`text-[10px] ${isActive ? 'text-sky-700 font-semibold' : 'text-sky-200'}`}>{item.subLabel}</div>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeStyle}`}>
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
