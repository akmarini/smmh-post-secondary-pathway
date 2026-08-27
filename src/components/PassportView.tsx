import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Download, 
  Sparkles, 
  Save, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Send,
  GraduationCap,
  Printer,
  CheckCircle2,
  AlertCircle,
  Award,
  Compass,
  Star,
  Target,
  Check
} from 'lucide-react';
import { SmmhHalaTujuState, YEAR_11_CLASSES } from '../types';
import { calculateCredits, evaluatePathways } from '../data/pathwayRules';
import { calculateRiasecCode, RIASEC_DIMENSION_INFO } from '../data/riasecQuestions';
import { generateDirectPassportPdf } from '../utils/pdfGenerator';
import { getRiasecEligiblePrograms } from '../utils/riasecProgramMatcher';
import { useLanguage } from '../context/LanguageContext';
import { SmmhtLogo } from './SmmhtLogo';
import confetti from 'canvas-confetti';

export const STANDARD_BRUNEI_PATHWAYS = [
  'Pusat Tingkatan Enam Tutong (PTET) - Aliran Sains (Science Stream)',
  'Pusat Tingkatan Enam Tutong (PTET) - Aliran Sastera & Kemanusiaan (Arts & Humanities)',
  'Pusat Tingkatan Enam Tutong (PTET) - Aliran Syariah & Ugama (Syariah Stream)',
  'Politeknik Brunei (PB) - School of Science & Engineering (Lumut)',
  'Politeknik Brunei (PB) - School of ICT (Ong Sum Ping)',
  'Politeknik Brunei (PB) - School of Business (Ong Sum Ping)',
  'Politeknik Brunei (PB) - School of Health Sciences (PAPRSB IHS)',
  'IBTE Nakhoda Ragam Campus - HNTec in Construction / Geomatics / IT',
  'IBTE Sultan Saiful Rijal Campus - HNTec in Hospitality / ICT / Aviation',
  'IBTE Jefri Bolkiah Campus (Kuala Belait) - HNTec in Engineering / Energy',
  'IBTE Agro-Technology Campus (Wasan) - HNTec in Agro-Technology',
  'IBTE Skills (NTec / ISQ Apprenticeship)',
  'Kolej Swasta - Cosmopolitan College of Commerce & Technology (CCCT)',
  'Kolej Swasta - Micronet International College (Computing & IT)',
  'Kolej Swasta - Laksamana College of Business (LCB)',
  'Kolej Swasta - Kolej IGS Brunei',
  'Kolej Swasta - BICPA-FTMS Accountancy Academy',
  'Skim Perantis Industri / Pengambilan Kerjaya Terus (Direct Cadetship)'
];

interface PassportViewProps {
  state: SmmhHalaTujuState;
  updateState: (updater: (prev: SmmhHalaTujuState) => SmmhHalaTujuState) => void;
  onSaveProgress: () => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  state,
  updateState,
  onSaveProgress
}) => {
  const { lang, t } = useLanguage();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAiAdvice, setIsLoadingAiAdvice] = useState<boolean>(false);

  const profile = state.profile;
  const checklist = state.checklist;
  const { totalCredits, bmCredit, engCredit, mathCredit } = calculateCredits(state.subjectGrades);
  const riasecData = calculateRiasecCode(state.riasecAnswers);

  const evaluatedPathways = evaluatePathways(state.subjectGrades);
  const riasecEligibleProgs = getRiasecEligiblePrograms(state.subjectGrades, riasecData.dominantTraits);

  const getOptionEligibility = (optionName: string) => {
    const optLower = optionName.toLowerCase();
    if (optLower.includes('ptet') || optLower.includes('tingkatan enam')) {
      return evaluatedPathways.find(p => p.id === 'ptet-sixth-form')?.status !== 'not_eligible';
    }
    if (optLower.includes('politeknik') || optLower.includes('pb')) {
      return evaluatedPathways.find(p => p.id === 'politeknik-brunei')?.status !== 'not_eligible';
    }
    if (optLower.includes('hntec')) {
      return evaluatedPathways.find(p => p.id === 'ibte-hntec')?.status !== 'not_eligible';
    }
    if (optLower.includes('ntec') || optLower.includes('skills')) {
      return evaluatedPathways.find(p => p.id === 'ibte-ntec')?.status !== 'not_eligible';
    }
    if (optLower.includes('kolej swasta') || optLower.includes('ccct') || optLower.includes('micronet') || optLower.includes('lcb') || optLower.includes('igs') || optLower.includes('bicpa')) {
      return evaluatedPathways.find(p => p.id === 'private-colleges')?.status !== 'not_eligible';
    }
    return true;
  };

  const checklistItems = [
    {
      key: 'counselorSessionDone' as const,
      labelMs: 'Telah berbincang dengan Guru Kaunselor Seksyen Bimbingan Kerjaya',
      labelEn: 'Completed 1-on-1 session with Career Guidance Section Counselor'
    },
    {
      key: 'specialPrereqChecked' as const,
      labelMs: 'Telah menyemak syarat khas kursus pilihan di portal rasmi HECAS / PB / IBTE',
      labelEn: 'Checked specific programme entry requirements in HECAS/PB/IBTE portals'
    },
    {
      key: 'parentDiscussed' as const,
      labelMs: 'Telah berbincang dan mendapat persetujuan daripada ibu bapa / penjaga',
      labelEn: 'Discussed pathway choices & transportation logistics with parents'
    },
    {
      key: 'documentsCertified' as const,
      labelMs: 'Dokumen salinan Sijil O-Level dan Kad Pengenalan telah disahkan benar',
      labelEn: 'Certified true copies of O-Level result slip and Smart Identity Card ready'
    },
    {
      key: 'hecasAccountCreated' as const,
      labelMs: 'Akaun pendaftaran portal HECAS & TVET telah dicipta',
      labelEn: 'HECAS & TVET admission portal user profile created'
    }
  ];

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

  const handleProfileChange = (field: keyof typeof profile, value: string) => {
    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleToggleChecklist = (key: keyof typeof checklist) => {
    const updatedChecklist = {
      ...checklist,
      [key]: !checklist[key]
    };
    const completedCount = Object.values(updatedChecklist).filter(Boolean).length;

    updateState((prev) => ({
      ...prev,
      checklist: updatedChecklist,
      passportCompleted: completedCount >= 4
    }));

    if (completedCount === 5) {
      try {
        confetti({ particleCount: 60, spread: 70 });
      } catch {
        // ignore
      }
    }
  };

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    try {
      try {
        confetti({ particleCount: 70, spread: 80 });
      } catch {
        // ignore confetti errors
      }

      const success = generateDirectPassportPdf(state, lang);
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 5000);
      }
    } catch (e) {
      console.error('PDF Generation error:', e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFetchAiCounselorAdvice = async () => {
    setIsLoadingAiAdvice(true);
    try {
      const response = await fetch('/api/ai-counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.studentName || 'Pelajar SMMH',
          studentClass: profile.studentClass,
          totalCredits,
          bmGrade: state.subjectGrades.find((s) => s.subjectName.toLowerCase().includes('bahasa melayu'))?.grade || '-',
          engGrade: state.subjectGrades.find((s) => s.subjectName.toLowerCase().includes('english'))?.grade || '-',
          mathGrade: state.subjectGrades.find((s) => s.subjectName.toLowerCase().includes('mathematics'))?.grade || '-',
          riasecCode: state.riasecCode || riasecData.code,
          topCareers: riasecData.careerSuggestions.map((c) => lang === 'en' ? c.titleEn : c.titleMs),
          dreamPathway: state.firstChoicePathway,
          language: lang
        })
      });
      const data = await response.json();
      if (data.advice) {
        setAiAdvice(data.advice);
      }
    } catch (err) {
      console.error(err);
      setAiAdvice(lang === 'ms' 
        ? 'Sila rujuk terus kepada Guru Kaunselor di Bilik Kaunseling SMMH untuk perbincangan bimbingan lanjut.' 
        : 'Please consult directly with your Career Counselor at the SMMH Counseling Room for personalized guidance.');
    } finally {
      setIsLoadingAiAdvice(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header & Controls - Excluded from Print */}
      <div className="bg-sky-800 rounded-lg p-6 sm:p-8 text-white border border-sky-700 shadow-sm relative overflow-hidden print:hidden print-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-sky-900 text-amber-300 text-xs font-black uppercase tracking-wider border border-sky-600">
              <BookOpenCheck className="w-3.5 h-3.5" />
              {t.passportDocBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {t.passportHeaderTitle}
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {t.passportHeaderDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              id="download-passport-pdf-btn"
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-sky-950 font-black text-xs uppercase tracking-wider shadow-sm transition-all border border-amber-500 cursor-pointer disabled:opacity-50"
            >
              <Download className={`w-3.5 h-3.5 text-sky-950 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
              <span>{isGeneratingPdf ? (lang === 'ms' ? 'Menjana PDF...' : 'Generating PDF...') : (lang === 'ms' ? 'Jana Dokumen PDF (Download)' : 'Download Passport (PDF)')}</span>
            </button>
            <button
              id="passport-save-btn"
              onClick={onSaveProgress}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-sky-900 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider border border-sky-600 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.saveDataBtn}</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-100 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>
              {lang === 'ms' 
                ? 'Pasport PDF telah berjaya dijana dan dimuat turun ke peranti anda!' 
                : 'Passport PDF document has been successfully generated and downloaded!'}
            </span>
          </div>
        )}
      </div>

      {/* Main Official Passport Sheet Frame - Pristine White Sheet */}
      <div
        id="printable-passport-container"
        className="bg-white rounded-lg border border-slate-300 shadow-sm p-6 sm:p-10 space-y-8 relative overflow-hidden print:p-0 print:border-none print:shadow-none print:rounded-none"
      >
        {/* Subtle Watermark BG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none print:hidden">
          <GraduationCap className="w-[600px] h-[600px] text-sky-800" />
        </div>

        {/* Passport Official Header */}
        <div className="border-b-2 border-amber-400 pb-6 text-center space-y-1.5 relative z-10">
          <div className="flex items-center justify-center mb-1">
            <SmmhtLogo size="xl" className="mx-auto drop-shadow-md" />
          </div>
          <h1 className="text-lg sm:text-xl font-black text-sky-900 uppercase tracking-wider">
            {t.schoolNameHeader}
          </h1>
          <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-widest">
            {t.passportDocSubtitle}
          </h2>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold border border-slate-300">
            <span>{lang === 'ms' ? 'TAHUN 2026' : 'YEAR 2026'}</span> • <span>{lang === 'ms' ? 'TAHUN 11' : 'YEAR 11'}</span>
          </div>
        </div>

        {/* SECTION A: Student Profile & Calculated O-Level Credit Summary */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-black text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-sky-800 text-amber-300 text-xs flex items-center justify-center font-mono font-bold">
                A
              </span>
              {t.sectionATitle}
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Student Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.fullNameLabel} <span className="text-rose-500">*</span>:
              </label>
              <input
                id="passport-input-student-name"
                type="text"
                value={profile.studentName}
                onChange={(e) => handleProfileChange('studentName', e.target.value)}
                placeholder={lang === 'ms' ? 'cth: Mohammad Afiq bin Haji Salleh' : 'e.g., Mohammad Afiq bin Haji Salleh'}
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.icNumberLabel}:
              </label>
              <input
                id="passport-input-ic"
                type="text"
                value={profile.icNumber}
                onChange={(e) => handleProfileChange('icNumber', e.target.value)}
                placeholder="cth: 01-123456"
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.classLabel} <span className="text-rose-500">*</span>:
              </label>
              <select
                id="passport-select-class"
                value={profile.studentClass}
                onChange={(e) => handleProfileChange('studentClass', e.target.value)}
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none cursor-pointer"
              >
                {YEAR_11_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.phoneLabel}:
              </label>
              <input
                id="passport-input-contact"
                type="text"
                value={profile.contactNumber}
                onChange={(e) => handleProfileChange('contactNumber', e.target.value)}
                placeholder="cth: +673 8123456"
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.parentNameLabel}:
              </label>
              <input
                id="passport-input-parent-name"
                type="text"
                value={profile.parentName}
                onChange={(e) => handleProfileChange('parentName', e.target.value)}
                placeholder={lang === 'ms' ? 'cth: Haji Salleh bin Awang Damit' : 'e.g., Haji Salleh bin Awang Damit'}
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-1">
                {t.parentPhoneLabel}:
              </label>
              <input
                id="passport-input-parent-contact"
                type="text"
                value={profile.parentContact}
                onChange={(e) => handleProfileChange('parentContact', e.target.value)}
                placeholder="cth: +673 8987654"
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none"
              />
            </div>
          </div>

          {/* O-Level Academic Badge Summary Box */}
          <div className="bg-sky-50/40 rounded-lg p-4 border border-sky-200 mt-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-sky-800 text-amber-300 flex items-center justify-center font-black text-lg font-mono shadow-sm">
                  {totalCredits}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t.calculatedCreditsLabel}
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {totalCredits >= 5 
                      ? (lang === 'ms' ? '5+ Kredit (Memenuhi Syarat PTET / PB)' : '5+ Credits (Meets PTET Sixth Form & PB Diploma benchmark)')
                      : totalCredits >= 3 
                      ? (lang === 'ms' ? '3-4 Kredit (Memenuhi Syarat IBTE HNTec)' : '3-4 Credits (Meets IBTE HNTec benchmark)')
                      : (lang === 'ms' ? '1-2 Kredit (Memenuhi Syarat IBTE NTec)' : '1-2 Credits (Meets IBTE NTec Skills track)')
                    }
                  </div>
                </div>
              </div>

              {/* Core status chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] border ${bmCredit ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
                  BM: {bmCredit ? (lang === 'ms' ? '✓ Kredit' : '✓ Credit') : (lang === 'ms' ? 'Belum Kredit' : 'No Credit')}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] border ${engCredit ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
                  BI: {engCredit ? (lang === 'ms' ? '✓ Kredit' : '✓ Credit') : (lang === 'ms' ? 'Belum Kredit' : 'No Credit')}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] border ${mathCredit ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
                  Math: {mathCredit ? (lang === 'ms' ? '✓ Kredit' : '✓ Credit') : (lang === 'ms' ? 'Belum Kredit' : 'No Credit')}
                </span>
              </div>
            </div>

            {/* Micro subject table */}
            <div className="mt-3 pt-3 border-t border-sky-200 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {state.subjectGrades.map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="truncate max-w-[110px] font-bold text-slate-800 text-[11px]">{sub.subjectName.split('(')[0]}</span>
                  <span className="font-bold font-mono px-1.5 py-0.2 rounded bg-sky-50 text-sky-900 border border-sky-200 text-[11px]">
                    {sub.grade || '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION B: Personality Profile (RIASEC Code & Top Career Matches) */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-black text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-sky-800 text-amber-300 text-xs flex items-center justify-center font-mono font-bold">
                B
              </span>
              {t.sectionBTitle}
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">RIASEC Profile</span>
          </div>

          <div className="bg-slate-50 text-slate-900 rounded-lg p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {t.hollandTypeCodeLabel}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-sky-900 font-mono tracking-widest bg-sky-100/80 px-3 py-0.5 rounded border border-sky-200">
                    {state.riasecCode !== '---' ? state.riasecCode : riasecData.code}
                  </span>
                  <span className="text-xs font-bold text-sky-950 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-xs">
                    {riasecData.dominantTraits.map((trait) => (lang === 'en' ? RIASEC_DIMENSION_INFO[trait]?.nameEn : RIASEC_DIMENSION_INFO[trait]?.nameMs).split(' ')[0]).join(' • ')}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-800 space-y-2 w-full md:w-auto">
                <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
                  <label className="text-[10px] font-black uppercase tracking-wider text-amber-600 block mb-1">
                    ⭐ {t.firstChoiceLabel}
                  </label>
                  <select
                    id="passport-select-first-choice"
                    value={state.firstChoicePathway}
                    onChange={(e) => {
                      updateState((prev) => ({
                        ...prev,
                        firstChoicePathway: e.target.value
                      }));
                      onSaveProgress();
                    }}
                    className="w-full h-8 px-2 rounded bg-slate-50 border border-slate-300 text-slate-900 font-medium text-xs focus:outline-none focus:border-sky-600"
                  >
                    <option value="">{lang === 'ms' ? '-- Pilih Institusi Pilihan 1 --' : '-- Select 1st Choice Pathway --'}</option>
                    {state.firstChoicePathway && !STANDARD_BRUNEI_PATHWAYS.includes(state.firstChoicePathway) && (
                      <option value={state.firstChoicePathway}>{state.firstChoicePathway}</option>
                    )}
                    {STANDARD_BRUNEI_PATHWAYS.map((opt) => {
                      const isEligible = getOptionEligibility(opt);
                      return (
                        <option 
                          key={opt} 
                          value={opt}
                          disabled={!isEligible}
                          className={!isEligible ? 'text-slate-400 bg-slate-100' : 'text-slate-900'}
                        >
                          {opt} {!isEligible ? (lang === 'ms' ? '⛔ (Tidak Layak)' : '⛔ (Not Eligible)') : '✓'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-1">
                    🎯 {t.secondChoiceLabel}
                  </label>
                  <select
                    id="passport-select-second-choice"
                    value={state.secondChoicePathway}
                    onChange={(e) => {
                      updateState((prev) => ({
                        ...prev,
                        secondChoicePathway: e.target.value
                      }));
                      onSaveProgress();
                    }}
                    className="w-full h-8 px-2 rounded bg-slate-50 border border-slate-300 text-slate-900 font-medium text-xs focus:outline-none focus:border-sky-600"
                  >
                    <option value="">{lang === 'ms' ? '-- Pilih Institusi Pilihan 2 --' : '-- Select 2nd Choice Pathway --'}</option>
                    {state.secondChoicePathway && !STANDARD_BRUNEI_PATHWAYS.includes(state.secondChoicePathway) && (
                      <option value={state.secondChoicePathway}>{state.secondChoicePathway}</option>
                    )}
                    {STANDARD_BRUNEI_PATHWAYS.map((opt) => {
                      const isEligible = getOptionEligibility(opt);
                      return (
                        <option 
                          key={opt} 
                          value={opt}
                          disabled={!isEligible}
                          className={!isEligible ? 'text-slate-400 bg-slate-100' : 'text-slate-900'}
                        >
                          {opt} {!isEligible ? (lang === 'ms' ? '⛔ (Tidak Layak)' : '⛔ (Not Eligible)') : '✓'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Top 3 Career Suggestions */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                {t.threeCareerMatchesWawasan}:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {riasecData.careerSuggestions.map((c, i) => (
                  <div key={i} className="bg-white p-2.5 rounded border border-slate-200 space-y-0.5 shadow-xs">
                    <div className="font-black text-slate-900 leading-snug text-xs">
                      {i + 1}. {lang === 'en' ? c.titleEn : c.titleMs}
                    </div>
                    <div className="text-[10px] text-amber-600 font-bold uppercase">
                      {c.sector}
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-2 pt-0.5">
                      {lang === 'en' ? c.descriptionEn : c.descriptionMs}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIASEC-Matched Eligible Programmes (Program Yang Layak Dipohon Berdasarkan Gred & RIASEC) */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-sky-700 shrink-0" />
                  {lang === 'ms' 
                    ? 'Program Pengajian Yang Layak Dipohon Mengikut Minat RIASEC:' 
                    : 'Eligible Academic & Vocational Programmes Matching RIASEC Profile:'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {totalCredits} {lang === 'ms' ? 'Kredit O-Level Dicapai' : 'O-Level Credits Attained'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {riasecEligibleProgs.map((item, pIdx) => {
                  const isEligible = item.status === 'eligible';
                  const isConditional = item.status === 'conditional';
                  const isNotEligible = item.status === 'not_eligible';

                  return (
                    <div 
                      key={pIdx} 
                      className={`p-3.5 rounded-lg border text-xs space-y-2 transition-all shadow-xs ${
                        isEligible 
                          ? 'bg-white border-emerald-300' 
                          : isConditional
                          ? 'bg-amber-50/40 border-amber-300'
                          : 'bg-slate-100/70 border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-black text-slate-900 text-xs">
                          {lang === 'ms' ? item.institutionNameMs : item.institutionNameEn}
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 border ${
                          isEligible
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isConditional
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-200'
                        }`}>
                          {isEligible 
                            ? (lang === 'ms' ? '✓ Layak Memohon' : '✓ Eligible') 
                            : isConditional 
                            ? (lang === 'ms' ? '⚠ Bersyarat' : '⚠ Conditional')
                            : (lang === 'ms' ? '⛔ Belum Layak' : '⛔ Not Eligible')}
                        </span>
                      </div>

                      {/* RIASEC matched trait tags */}
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                          {lang === 'ms' ? 'Padanan Minat:' : 'RIASEC Match:'} {lang === 'ms' ? item.matchedTraitsLabelMs : item.matchedTraitsLabelEn}
                        </span>
                        <span className="text-slate-500 font-medium truncate">
                          {lang === 'ms' ? item.entrySummaryMs : item.entrySummaryEn}
                        </span>
                      </div>

                      {/* Programs list */}
                      <div className="bg-slate-50 p-2 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide block">
                          {lang === 'ms' ? 'Kursus Disyorkan:' : 'Recommended Programmes:'}
                        </span>
                        <ul className="space-y-0.5">
                          {(lang === 'ms' ? item.programsMs : item.programsEn).map((prog, prIdx) => (
                            <li key={prIdx} className="text-[11px] text-slate-800 flex items-start gap-1 leading-snug">
                              <span className="text-sky-700 font-bold">•</span>
                              <span>{prog}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fast choice selection buttons */}
                      <div className="flex items-center justify-end gap-1.5 pt-1">
                        <button
                          type="button"
                          disabled={isNotEligible}
                          onClick={() => {
                            if (isNotEligible) return;
                            const pathwayTitle = `${lang === 'ms' ? item.institutionNameMs : item.institutionNameEn}`;
                            updateState((prev) => ({
                              ...prev,
                              firstChoicePathway: pathwayTitle,
                              secondChoicePathway: prev.secondChoicePathway === pathwayTitle ? '' : prev.secondChoicePathway
                            }));
                            onSaveProgress();
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                            isNotEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 cursor-pointer'
                          }`}
                        >
                          ⭐ {lang === 'ms' ? 'Pilih Pilihan 1' : 'Set 1st Choice'}
                        </button>
                        <button
                          type="button"
                          disabled={isNotEligible}
                          onClick={() => {
                            if (isNotEligible) return;
                            const pathwayTitle = `${lang === 'ms' ? item.institutionNameMs : item.institutionNameEn}`;
                            updateState((prev) => ({
                              ...prev,
                              secondChoicePathway: pathwayTitle,
                              firstChoicePathway: prev.firstChoicePathway === pathwayTitle ? '' : prev.firstChoicePathway
                            }));
                            onSaveProgress();
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                            isNotEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : 'bg-sky-100 text-sky-900 border border-sky-300 hover:bg-sky-200 cursor-pointer'
                          }`}
                        >
                          🎯 {lang === 'ms' ? 'Pilih Pilihan 2' : 'Set 2nd Choice'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION C: Career Counseling Readiness Checklist */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-black text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-sky-800 text-amber-300 text-xs flex items-center justify-center font-mono font-bold">
                C
              </span>
              {t.sectionCTitle}
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">
              Status: {completedChecklistCount}/5 {t.itemsCompleted}
            </span>
          </div>

          <div className="space-y-2">
            {checklistItems.map((item) => {
              const isChecked = checklist[item.key];
              const primaryLabel = lang === 'en' ? item.labelEn : item.labelMs;
              const secondaryLabel = lang === 'en' ? item.labelMs : item.labelEn;

              return (
                <div
                  key={item.key}
                  id={`checklist-item-${item.key}`}
                  onClick={() => handleToggleChecklist(item.key)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950 font-medium shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sky-800 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{primaryLabel}</div>
                      <div className="text-[11px] text-slate-500 italic">{secondaryLabel}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 border ${
                    isChecked ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {isChecked ? t.completedBadge : t.pendingBadge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Counselor Intelligent Guidance Box (Server-Side Gemini API) */}
        <div className="bg-sky-50/30 rounded-lg p-4 sm:p-5 border border-sky-200 relative z-10 space-y-3 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-700 shrink-0" />
              <h4 className="font-black text-sky-900 text-xs uppercase tracking-wider">
                {t.aiAdviceHeader}
              </h4>
            </div>
            <button
              id="get-ai-counselor-advice-btn"
              onClick={handleFetchAiCounselorAdvice}
              disabled={isLoadingAiAdvice}
              className="px-3 py-1.5 rounded bg-sky-700 text-white hover:bg-sky-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50 border border-sky-700"
            >
              <Send className={`w-3 h-3 text-amber-300 ${isLoadingAiAdvice ? 'animate-spin' : ''}`} />
              <span>{isLoadingAiAdvice ? (lang === 'ms' ? 'Menganalisis...' : 'Analyzing...') : t.generateAiAdviceBtn}</span>
            </button>
          </div>

          {aiAdvice ? (
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans shadow-sm">
              <p className="whitespace-pre-line">{aiAdvice}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-600">
              {t.aiAdvicePrompt}
            </p>
          )}
        </div>

        {/* Official Verification & Dual Signature Box */}
        <div className="pt-6 border-t-2 border-slate-200 space-y-6 relative z-10">
          <div className="text-xs text-slate-600 text-center max-w-2xl mx-auto leading-relaxed">
            <p className="font-black text-slate-900 uppercase">{t.endorsementTitle}:</p>
            {t.endorsementText}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Student Signature Box */}
            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center space-y-3 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                {t.studentSigTitle}
              </div>
              <div className="h-14 flex items-end justify-center border-b border-slate-400 pb-1">
                <span className="font-serif italic text-slate-800 text-sm">
                  {profile.studentName ? profile.studentName : '...................................................'}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 flex justify-between px-1">
                <span>{lang === 'ms' ? 'Nama' : 'Name'}: {profile.studentName || (lang === 'ms' ? 'Pelajar' : 'Student')}</span>
                <span>{lang === 'ms' ? 'Tarikh' : 'Date'}: {new Date().toLocaleDateString(lang === 'ms' ? 'ms-MY' : 'en-GB')}</span>
              </div>
            </div>

            {/* Parent / Guardian Signature Box */}
            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center space-y-3 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                {t.parentSigTitle}
              </div>
              <div className="h-14 flex items-end justify-center border-b border-slate-400 pb-1">
                <span className="font-serif italic text-slate-800 text-sm">
                  {profile.parentName ? profile.parentName : '...................................................'}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 flex justify-between px-1">
                <span>{lang === 'ms' ? 'Nama' : 'Name'}: {profile.parentName || (lang === 'ms' ? 'Ibu Bapa / Penjaga' : 'Parent / Guardian')}</span>
                <span>{lang === 'ms' ? 'Tarikh' : 'Date'}: {new Date().toLocaleDateString(lang === 'ms' ? 'ms-MY' : 'en-GB')}</span>
              </div>
            </div>
          </div>

          {/* School Stamp & Official Verification Stamp */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-slate-500 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-medium">{t.schoolStampNote}</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500">
              ID DOKUMEN: PASSPORT-{profile.icNumber ? profile.icNumber.replace(/[^a-zA-Z0-9]/g, '') : '2026-REG'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
