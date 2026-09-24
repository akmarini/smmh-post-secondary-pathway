import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ArrowRight, 
  School, 
  Save, 
  RotateCcw, 
  Check,
  Star,
  Target,
  BookmarkCheck
} from 'lucide-react';
import { 
  O_LEVEL_GRADES, 
  DEFAULT_SUBJECTS, 
  AVAILABLE_ELECTIVE_SUBJECTS, 
  calculateCredits, 
  evaluatePathways,
  isCreditGrade,
  isPassGrade
} from '../data/pathwayRules';
import { SubjectGrade, SmmhHalaTujuState, PathwayOption } from '../types';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface GradeCalculatorProps {
  state: SmmhHalaTujuState;
  updateState: (updater: (prev: SmmhHalaTujuState) => SmmhHalaTujuState) => void;
  onSaveProgress: () => void;
  goToPassport: () => void;
  goToQuiz: () => void;
}

export const GradeCalculator: React.FC<GradeCalculatorProps> = ({
  state,
  updateState,
  onSaveProgress,
  goToPassport,
  goToQuiz
}) => {
  const { lang, t } = useLanguage();
  const [selectedElectiveToAdd, setSelectedElectiveToAdd] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [selectedPathwayFilter, setSelectedPathwayFilter] = useState<'all' | 'eligible' | 'conditional'>('all');

  const [selectedFeedbackMessage, setSelectedFeedbackMessage] = useState<{ type: 'first' | 'second'; name: string } | null>(null);

  const subjects = state.subjectGrades;
  const { 
    totalCredits, 
    bmCredit, 
    engCredit, 
    mathCredit, 
    bmPass, 
    engPass, 
    mathPass
  } = calculateCredits(subjects);

  const pathways = evaluatePathways(subjects);

  // Helper matching functions for 1st and 2nd choices with robust matching
  const isSelectedAsFirst = (pathway: PathwayOption) => {
    const cur = (state.firstChoicePathway || '').toLowerCase().trim();
    if (!cur) return false;
    const name = pathway.name.toLowerCase().trim();
    const nameMs = (pathway.nameMs || '').toLowerCase().trim();
    const nameEn = (pathway.nameEn || '').toLowerCase().trim();
    return cur === name || cur === nameMs || cur === nameEn || (pathway.id && cur.includes(pathway.id)) ||
      (pathway.id === 'ptet-sixth-form' && cur.includes('tingkatan enam')) ||
      (pathway.id === 'politeknik-brunei' && cur.includes('politeknik')) ||
      (pathway.id === 'ibte-hntec' && cur.includes('ibte'));
  };

  const isSelectedAsSecond = (pathway: PathwayOption) => {
    const cur = (state.secondChoicePathway || '').toLowerCase().trim();
    if (!cur) return false;
    const name = pathway.name.toLowerCase().trim();
    const nameMs = (pathway.nameMs || '').toLowerCase().trim();
    const nameEn = (pathway.nameEn || '').toLowerCase().trim();
    return cur === name || cur === nameMs || cur === nameEn || (pathway.id && cur.includes(pathway.id)) ||
      (pathway.id === 'ptet-sixth-form' && cur.includes('tingkatan enam')) ||
      (pathway.id === 'politeknik-brunei' && cur.includes('politeknik')) ||
      (pathway.id === 'ibte-hntec' && cur.includes('ibte'));
  };

  const handleSelectFirstChoice = (pathway: PathwayOption) => {
    const chosenName = lang === 'en' && pathway.nameEn ? pathway.nameEn : (pathway.nameMs || pathway.name);
    updateState((prev) => {
      const isAlreadyFirst = prev.firstChoicePathway === chosenName;
      const isCurrentlySecond = prev.secondChoicePathway === chosenName;
      return {
        ...prev,
        firstChoicePathway: isAlreadyFirst ? '' : chosenName,
        secondChoicePathway: isCurrentlySecond ? '' : prev.secondChoicePathway
      };
    });
    setSelectedFeedbackMessage({ type: 'first', name: chosenName });
    setTimeout(() => {
      setSelectedFeedbackMessage(null);
    }, 5000);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  const handleSelectSecondChoice = (pathway: PathwayOption) => {
    const chosenName = lang === 'en' && pathway.nameEn ? pathway.nameEn : (pathway.nameMs || pathway.name);
    updateState((prev) => {
      const isAlreadySecond = prev.secondChoicePathway === chosenName;
      const isCurrentlyFirst = prev.firstChoicePathway === chosenName;
      return {
        ...prev,
        secondChoicePathway: isAlreadySecond ? '' : chosenName,
        firstChoicePathway: isCurrentlyFirst ? '' : prev.firstChoicePathway
      };
    });
    setSelectedFeedbackMessage({ type: 'second', name: chosenName });
    setTimeout(() => {
      setSelectedFeedbackMessage(null);
    }, 5000);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  const handleGradeChange = (subjectId: string, newGrade: string) => {
    const updatedSubjects = subjects.map((sub) =>
      sub.id === subjectId ? { ...sub, grade: newGrade } : sub
    );
    updateState((prev) => ({
      ...prev,
      subjectGrades: updatedSubjects
    }));
  };

  const handleSubjectNameChange = (subjectId: string, newName: string) => {
    const updatedSubjects = subjects.map((sub) =>
      sub.id === subjectId ? { ...sub, subjectName: newName } : sub
    );
    updateState((prev) => ({
      ...prev,
      subjectGrades: updatedSubjects
    }));
  };

  const handleAddElective = () => {
    if (!selectedElectiveToAdd) return;
    const newSub: SubjectGrade = {
      id: `sub-custom-${Date.now()}`,
      subjectName: selectedElectiveToAdd,
      isCore: false,
      grade: ''
    };
    updateState((prev) => ({
      ...prev,
      subjectGrades: [...prev.subjectGrades, newSub]
    }));
    setSelectedElectiveToAdd('');
  };

  const handleRemoveSubject = (subjectId: string) => {
    updateState((prev) => ({
      ...prev,
      subjectGrades: prev.subjectGrades.filter((s) => s.id !== subjectId)
    }));
  };

  const handleResetGrades = () => {
    if (window.confirm(t.confirmResetGrades)) {
      updateState((prev) => ({
        ...prev,
        subjectGrades: DEFAULT_SUBJECTS
      }));
      setHasCalculated(false);
    }
  };

  const handleLoadSampleGrades = (type: 'ptet' | 'pb' | 'ibte') => {
    let sample: SubjectGrade[];
    if (type === 'ptet') {
      sample = [
        { id: 'sub-bm', subjectName: 'Bahasa Melayu (1201)', isCore: true, grade: 'A2' },
        { id: 'sub-eng', subjectName: 'English Language (1123 / IGCSE)', isCore: true, grade: 'B3' },
        { id: 'sub-math', subjectName: 'Mathematics D (4024)', isCore: true, grade: 'A1' },
        { id: 'sub-irk', subjectName: 'Pengetahuan Ugama Islam (IRK)', isCore: false, grade: 'A1' },
        { id: 'sub-sci', subjectName: 'Physics (5054)', isCore: false, grade: 'B3' },
        { id: 'sub-elec1', subjectName: 'Chemistry (5070)', isCore: false, grade: 'B4' },
        { id: 'sub-elec2', subjectName: 'Biology (5090)', isCore: false, grade: 'C5' },
        { id: 'sub-elec3', subjectName: 'Additional Mathematics (4037)', isCore: false, grade: 'B4' }
      ];
    } else if (type === 'pb') {
      sample = [
        { id: 'sub-bm', subjectName: 'Bahasa Melayu (1201)', isCore: true, grade: 'B3' },
        { id: 'sub-eng', subjectName: 'English Language (1123)', isCore: true, grade: 'C5' },
        { id: 'sub-math', subjectName: 'Mathematics D (4024)', isCore: true, grade: 'C6' },
        { id: 'sub-irk', subjectName: 'Pengetahuan Ugama Islam (IRK 2046)', isCore: false, grade: 'B4' },
        { id: 'sub-sci', subjectName: 'Combined Science (5129)', isCore: false, grade: 'B4' },
        { id: 'sub-elec1', subjectName: 'Computer Science (2210)', isCore: false, grade: 'A2' },
        { id: 'sub-elec2', subjectName: 'Principles of Accounts (7110 / 7707)', isCore: false, grade: 'C5' },
        { id: 'sub-elec3', subjectName: 'Art & Design (6090)', isCore: false, grade: 'C6' }
      ];
    } else {
      sample = [
        { id: 'sub-bm', subjectName: 'Bahasa Melayu (1201)', isCore: true, grade: 'C6' },
        { id: 'sub-eng', subjectName: 'English Language (1123)', isCore: true, grade: 'D7' },
        { id: 'sub-math', subjectName: 'Mathematics D (4024)', isCore: true, grade: 'C5' },
        { id: 'sub-irk', subjectName: 'Pengetahuan Ugama Islam (IRK 2046)', isCore: false, grade: 'C5' },
        { id: 'sub-sci', subjectName: 'Agriculture (5038)', isCore: false, grade: 'B4' },
        { id: 'sub-elec1', subjectName: 'Design & Technology (D&T 6043)', isCore: false, grade: 'B4' },
        { id: 'sub-elec2', subjectName: 'Geography (2230 / 2223)', isCore: false, grade: 'E8' }
      ];
    }

    updateState((prev) => ({
      ...prev,
      subjectGrades: sample
    }));
    triggerCalculation();
  };

  const triggerCalculation = () => {
    setHasCalculated(true);
    if (totalCredits >= 5) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const filteredPathways = pathways.filter((p) => {
    if (selectedPathwayFilter === 'all') return true;
    if (selectedPathwayFilter === 'eligible') return p.status === 'eligible';
    if (selectedPathwayFilter === 'conditional') return p.status === 'conditional';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-sky-400/40 relative overflow-hidden">
        {/* Ambient sunshine glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-yellow-300/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-800/80 text-yellow-300 text-xs font-bold uppercase tracking-wider border border-sky-400/50 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-yellow-300" />
              <span>{lang === 'ms' ? 'Panduan & Kalkulator Kelayakan Lepasan Menengah Brunei' : 'Brunei Post-Secondary Pathways Guide & Calculator'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              {t.calcHeaderTitle}
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 max-w-3xl leading-relaxed font-normal">
              {t.calcHeaderDesc}
            </p>
          </div>

          {/* Quick Preset Buttons for rapid testing */}
          <div className="bg-sky-900/80 backdrop-blur-xs p-4 rounded-xl border border-sky-400/40 shrink-0 shadow-sm">
            <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider block mb-2 font-mono">
              {t.quickSamples}
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                id="sample-btn-ptet"
                onClick={() => handleLoadSampleGrades('ptet')}
                className="text-left px-3 py-1.5 rounded-lg bg-sky-800/90 hover:bg-yellow-400 hover:text-sky-950 text-xs text-white font-bold transition-all border border-sky-600 hover:border-yellow-400 uppercase cursor-pointer"
              >
                ★ {t.samplePtet}
              </button>
              <button
                id="sample-btn-pb"
                onClick={() => handleLoadSampleGrades('pb')}
                className="text-left px-3 py-1.5 rounded-lg bg-sky-800/90 hover:bg-yellow-400 hover:text-sky-950 text-xs text-white font-bold transition-all border border-sky-600 hover:border-yellow-400 uppercase cursor-pointer"
              >
                ★ {t.samplePb}
              </button>
              <button
                id="sample-btn-ibte"
                onClick={() => handleLoadSampleGrades('ibte')}
                className="text-left px-3 py-1.5 rounded-lg bg-sky-800/90 hover:bg-yellow-400 hover:text-sky-950 text-xs text-white font-bold transition-all border border-sky-600 hover:border-yellow-400 uppercase cursor-pointer"
              >
                ★ {t.sampleHntec}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Credits */}
        <div className="bg-white p-4 rounded-lg border border-sky-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            {t.totalCreditsLabel}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-sky-700">
              {totalCredits}
            </span>
            <span className="text-xs text-slate-500 font-bold uppercase">{t.creditsSuffix}</span>
          </div>
          <div className="mt-2 text-[11px] font-medium text-slate-600">
            {totalCredits >= 5 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {lang === 'ms' ? 'Memenuhi syarat umum 5 Kredit' : 'Meets general 5 credits benchmark'}
              </span>
            ) : totalCredits >= 3 ? (
              <span className="text-sky-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {lang === 'ms' ? 'Memenuhi syarat IBTE HNTec (3 Kredit)' : 'Meets IBTE HNTec benchmark (3 credits)'}
              </span>
            ) : (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {lang === 'ms' ? 'Laluan NTec & Kemahiran Asas' : 'NTec & Foundation Skills Track'}
              </span>
            )}
          </div>
        </div>

        {/* BM Credit Status */}
        <div className="bg-white p-4 rounded-lg border border-sky-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            {t.bmStatusLabel}
          </span>
          <div className="flex items-center gap-2 mt-2">
            {bmCredit ? (
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Kredit (A1 - C6)' : 'Credit (A1 - C6)'}
              </span>
            ) : bmPass ? (
              <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-900 border border-sky-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Lulus (D7 - E8)' : 'Pass Only (D7 - E8)'}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Belum Kredit' : 'No Credit Yet'}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            {t.bmRequiredNote}
          </span>
        </div>

        {/* English Credit Status */}
        <div className="bg-white p-4 rounded-lg border border-sky-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            {t.engStatusLabel}
          </span>
          <div className="flex items-center gap-2 mt-2">
            {engCredit ? (
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Kredit (A1 - C6)' : 'Credit (A1 - C6)'}
              </span>
            ) : engPass ? (
              <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-900 border border-sky-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Lulus (D7 - E8)' : 'Pass Only (D7 - E8)'}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Belum Kredit' : 'No Credit Yet'}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            {t.engRequiredNote}
          </span>
        </div>

        {/* Mathematics D Status */}
        <div className="bg-white p-4 rounded-lg border border-sky-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            {t.mathStatusLabel}
          </span>
          <div className="flex items-center gap-2 mt-2">
            {mathCredit ? (
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Kredit (A1 - C6)' : 'Credit (A1 - C6)'}
              </span>
            ) : mathPass ? (
              <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-900 border border-sky-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Lulus (D7 - E8)' : 'Pass Only (D7 - E8)'}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 font-bold text-xs uppercase">
                {lang === 'ms' ? 'Belum Kredit' : 'No Credit Yet'}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            {t.mathRequiredNote}
          </span>
        </div>
      </div>

      {/* Main Subject Grade Entry Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              {t.subjectTableTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ms'
                ? 'Pilih gred Cambridge O-Level (A1 hingga U9) bagi setiap mata pelajaran untuk mengira kelayakan secara automatik.'
                : 'Select your Cambridge O-Level grades (A1 to U9) for each subject to automatically evaluate admission eligibility.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="reset-all-grades-btn"
              onClick={handleResetGrades}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetGradesBtn}</span>
            </button>
            <button
              id="save-grades-shortcut-btn"
              onClick={onSaveProgress}
              className="px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-sky-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-yellow-500 shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{t.saveGradesBtn}</span>
            </button>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 text-white uppercase text-[11px] tracking-wider border border-sky-600">
                <th className="py-3 px-4 font-bold w-12">#</th>
                <th className="py-3 px-4 font-bold">{t.subjectCol}</th>
                <th className="py-3 px-4 font-bold w-28">{t.typeCol}</th>
                <th className="py-3 px-4 font-bold w-40">{t.gradeCol}</th>
                <th className="py-3 px-4 font-bold w-36">{t.statusCol}</th>
                <th className="py-3 px-4 font-bold w-20 text-center">{t.actionsCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border border-slate-300">
              {subjects.map((sub, idx) => {
                const isCredit = isCreditGrade(sub.grade);
                const isPass = isPassGrade(sub.grade);
                const isFail = sub.grade === 'U9';

                return (
                  <tr key={sub.id} className={`hover:bg-slate-50 transition-colors ${sub.isCore ? 'bg-sky-50/30 font-medium' : ''}`}>
                    <td className="py-3 px-4 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4">
                      {sub.isCore ? (
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{sub.subjectName}</span>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={sub.subjectName}
                          onChange={(e) => handleSubjectNameChange(sub.id, e.target.value)}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600"
                          placeholder="Nama Mata Pelajaran"
                        />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {sub.isCore ? (
                        <span className="px-2 py-0.5 rounded bg-sky-700 text-white text-[10px] font-bold uppercase tracking-wider">
                          {t.coreSubject}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                          {t.electiveSubject}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        id={`select-grade-${sub.id}`}
                        value={sub.grade}
                        onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                        className={`w-full h-8 px-2 rounded border font-bold text-xs focus:outline-none ${
                          isCredit
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                            : isPass
                            ? 'bg-sky-50 border-sky-400 text-sky-900'
                            : isFail
                            ? 'bg-rose-50 border-rose-400 text-rose-900'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        <option value="">-- Gred / Grade --</option>
                        {O_LEVEL_GRADES.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      {isCredit ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.creditValid}
                        </span>
                      ) : isPass ? (
                        <span className="inline-flex items-center gap-1 text-sky-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.passOnly}
                        </span>
                      ) : isFail ? (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {t.failGrade}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          {t.notEntered}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {!sub.isCore && (
                        <button
                          id={`remove-sub-${sub.id}`}
                          onClick={() => handleRemoveSubject(sub.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                          title="Padam mata pelajaran elektif ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Elective Row */}
        <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <label htmlFor="select-add-elective" className="block text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-1">
              {lang === 'ms' ? '+ Tambah Mata Pelajaran Elektif Lain (Sains, Bahasa, Perakaunan, ICT, dll):' : '+ Add Other Elective Subjects (Science, Languages, Accounting, ICT, etc):'}
            </label>
            <select
              id="select-add-elective"
              value={selectedElectiveToAdd}
              onChange={(e) => setSelectedElectiveToAdd(e.target.value)}
              className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-800 text-xs focus:outline-none focus:border-sky-600"
            >
              <option value="">{t.addElectivePlaceholder}</option>
              {AVAILABLE_ELECTIVE_SUBJECTS.filter(
                (opt) => !subjects.some((s) => s.subjectName.toLowerCase().trim() === opt.toLowerCase().trim())
              ).map((subName) => (
                <option key={subName} value={subName}>
                  {subName}
                </option>
              ))}
            </select>
          </div>

          <button
            id="add-elective-btn"
            onClick={handleAddElective}
            disabled={!selectedElectiveToAdd}
            className="w-full sm:w-auto mt-auto h-9 px-4 rounded-lg bg-sky-600 text-white hover:bg-sky-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all border border-sky-500 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-yellow-300" />
            <span>{t.addElectiveBtn}</span>
          </button>
        </div>

        {/* Big Prominent Execution Button: "Jana Hala Tuju Saya" */}
        <div className="pt-6 border-t border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
          <button
            id="generate-pathway-btn"
            onClick={() => triggerCalculation()}
            className="w-full max-w-md py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white hover:from-sky-500 hover:to-sky-400 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border-b-4 border-yellow-400 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{lang === 'ms' ? 'JANA HALA TUJU SAYA' : 'EVALUATE MY PATHWAYS'}</span>
            <ArrowRight className="w-4 h-4 text-yellow-300" />
          </button>
          <p className="text-xs text-slate-500">
            {lang === 'ms'
              ? 'Klik butang di atas untuk memadankan keputusan anda dengan syarat institusi lepasan menengah Brunei.'
              : 'Click the button above to match your grades against Brunei post-secondary entry requirements.'}
          </p>
        </div>
      </div>

      {/* Pathway Matching Results Container */}
      <div id="pathway-results-container" className="space-y-6">
        {/* Floating Realtime Selection Feedback */}
        {selectedFeedbackMessage && (
          <div className="bg-yellow-400 text-sky-950 px-4 py-3 rounded-xl border-2 border-yellow-500 shadow-lg flex items-center justify-between gap-3 animate-bounce">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <Check className="w-5 h-5 text-sky-950 stroke-[3]" />
              <span>
                {selectedFeedbackMessage.type === 'first' ? '⭐ PILIHAN 1 DIKEMASKINI: ' : '🎯 PILIHAN 2 DIKEMASKINI: '}
                <span className="underline decoration-sky-950 font-black">{selectedFeedbackMessage.name}</span>
                {lang === 'ms' ? ' telah disimpan ke dalam Pasport SMMH anda!' : ' has been saved into your SMMH Passport!'}
              </span>
            </div>
            <button
              onClick={goToPassport}
              className="px-3 py-1 bg-sky-950 text-yellow-300 hover:bg-sky-900 rounded-lg font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer"
            >
              {lang === 'ms' ? 'Buka Pasport' : 'Open Passport'} →
            </button>
          </div>
        )}

        {/* Active Selection Summary Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 rounded-2xl p-5 text-white border border-sky-400/40 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-yellow-300" />
                <h4 className="text-xs font-black uppercase tracking-wider text-yellow-300">
                  {lang === 'ms' ? 'Status Pilihan Hala Tuju SMMH Anda' : 'Your SMMH Pathway Selections'}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 rounded-lg p-2.5 border border-white/20">
                  <div className="text-[10px] uppercase font-bold text-yellow-300 flex items-center justify-between">
                    <span>⭐ {lang === 'ms' ? 'Pilihan 1 (Keutamaan 1)' : '1st Choice (Priority 1)'}</span>
                    {state.firstChoicePathway && (
                      <button 
                        onClick={() => {
                          updateState((prev) => ({ ...prev, firstChoicePathway: '' }));
                          onSaveProgress();
                        }}
                        className="text-rose-300 hover:text-white text-[10px] underline ml-2"
                      >
                        {lang === 'ms' ? 'Batal' : 'Clear'}
                      </button>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">
                    {state.firstChoicePathway || (lang === 'ms' ? '— Belum dipilih (Sila klik butang di bawah) —' : '— Not selected (Click button below) —')}
                  </div>
                </div>

                <div className="bg-white/10 rounded p-2.5 border border-white/15">
                  <div className="text-[10px] uppercase font-bold text-sky-300 flex items-center justify-between">
                    <span>🎯 {lang === 'ms' ? 'Pilihan 2 (Keutamaan 2)' : '2nd Choice (Priority 2)'}</span>
                    {state.secondChoicePathway && (
                      <button 
                        onClick={() => {
                          updateState((prev) => ({ ...prev, secondChoicePathway: '' }));
                          onSaveProgress();
                        }}
                        className="text-rose-300 hover:text-white text-[10px] underline ml-2"
                      >
                        {lang === 'ms' ? 'Batal' : 'Clear'}
                      </button>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">
                    {state.secondChoicePathway || (lang === 'ms' ? '— Belum dipilih (Sila klik butang di bawah) —' : '— Not selected (Click button below) —')}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                id="calc-summary-view-passport-btn"
                onClick={goToPassport}
                className="px-4 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-sky-950 font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 border border-yellow-500 cursor-pointer"
              >
                <span>{lang === 'ms' ? 'Lihat di Pasport' : 'View in Passport'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-950" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-sky-100 shadow-sm">
          <div className="border-l-4 border-sky-500 pl-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
              <School className="w-3.5 h-3.5 text-sky-500" />
              {lang === 'ms' ? 'Hasil Pemadanan Kelayakan Lepasan Menengah' : 'Post-Secondary Admission Pathway Results'}
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              {t.pathwaysSectionTitle}
            </h3>
          </div>

          {/* Filter Status Buttons */}
          <div className="flex items-center gap-1.5 bg-sky-50 p-1 rounded-lg border border-sky-200">
            <button
              onClick={() => setSelectedPathwayFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                selectedPathwayFilter === 'all' ? 'bg-sky-600 text-white shadow-xs font-black' : 'text-sky-800 hover:text-sky-950'
              }`}
            >
              {t.filterAll} ({pathways.length})
            </button>
            <button
              onClick={() => setSelectedPathwayFilter('eligible')}
              className={`px-3 py-1.5 rounded text-xs uppercase font-bold tracking-wider transition-all ${
                selectedPathwayFilter === 'eligible' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filterEligible} ({pathways.filter((p) => p.status === 'eligible').length})
            </button>
            <button
              onClick={() => setSelectedPathwayFilter('conditional')}
              className={`px-3 py-1.5 rounded text-xs uppercase font-bold tracking-wider transition-all ${
                selectedPathwayFilter === 'conditional' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filterConditional} ({pathways.filter((p) => p.status === 'conditional').length})
            </button>
          </div>
        </div>

        {/* Detailed Pathway Cards */}
        <div className="space-y-4">
          {filteredPathways.map((pathway) => {
            const isEligible = pathway.status === 'eligible';
            const isConditional = pathway.status === 'conditional';
            const statusLabel = lang === 'en' && pathway.statusLabelEn ? pathway.statusLabelEn : pathway.statusLabelMs;
            const displayName = lang === 'en' && pathway.nameEn ? pathway.nameEn : pathway.name;
            const displayLevel = lang === 'en' && pathway.qualificationLevelEn ? pathway.qualificationLevelEn : pathway.qualificationLevel;
            const displayDuration = lang === 'en' && pathway.durationEn ? pathway.durationEn : pathway.duration;
            const displayReason = lang === 'en' && pathway.reasonEn ? pathway.reasonEn : pathway.reasonMs;
            const displayCampus = lang === 'en' && pathway.campusLocationEn ? pathway.campusLocationEn : pathway.campusLocation;
            const displayPrereqs = lang === 'en' && pathway.prerequisitesEn ? pathway.prerequisitesEn : pathway.prerequisitesMs;
            const displayCourses = lang === 'en' && pathway.recommendedCoursesEn ? pathway.recommendedCoursesEn : pathway.recommendedCourses;
            const displayPortal = lang === 'en' && pathway.intakePortalEn ? pathway.intakePortalEn : pathway.intakePortal;

            const isFirstChoice = isSelectedAsFirst(pathway);
            const isSecondChoice = isSelectedAsSecond(pathway);

            return (
              <div
                key={pathway.id}
                id={`pathway-card-${pathway.id}`}
                className={`bg-white rounded-xl p-6 border-2 transition-all shadow-sm relative ${
                  isFirstChoice
                    ? 'border-yellow-400 ring-2 ring-yellow-400/50 border-l-8 border-l-yellow-400 bg-yellow-50/20'
                    : isSecondChoice
                    ? 'border-sky-600 ring-2 ring-sky-400/40 border-l-8 border-l-sky-600 bg-sky-50/20'
                    : isEligible
                    ? 'border-sky-500 border-l-8 border-l-sky-500'
                    : isConditional
                    ? 'border-yellow-400 border-l-8 border-l-yellow-500'
                    : 'border-slate-200 opacity-80'
                }`}
              >
                {/* Active Choice Badges */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left info column */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isFirstChoice && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-yellow-400 text-sky-950 border border-yellow-500 shadow-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-sky-950 text-sky-950" />
                          <span>{lang === 'ms' ? 'PILIHAN 1 ANDA' : 'YOUR 1ST CHOICE'}</span>
                        </span>
                      )}
                      {isSecondChoice && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-700 text-white border border-sky-800 shadow-xs flex items-center gap-1">
                          <Target className="w-3 h-3 text-yellow-300" />
                          <span>{lang === 'ms' ? 'PILIHAN 2 ANDA' : 'YOUR 2ND CHOICE'}</span>
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${pathway.statusColor}`}>
                        {statusLabel}
                      </span>
                      <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 uppercase tracking-wider">
                        {displayLevel}
                      </span>
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                        {t.durationLabel}: {displayDuration}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                      {displayName}
                    </h4>

                    {/* Specific analysis reason */}
                    <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                      isEligible
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : isConditional
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-slate-50 border-slate-300 text-slate-700'
                    }`}>
                      <strong>{lang === 'ms' ? 'Status Analisis SMMH:' : 'SMMH Counseling Analysis:'}</strong> {displayReason}
                    </div>

                    {/* Campus Location & Prerequisites */}
                    <div className={`grid gap-3 pt-1 text-xs ${displayCampus ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {displayCampus ? (
                        <div className="bg-sky-50/50 p-3 rounded-lg border border-sky-100">
                          <span className="font-bold text-sky-950 uppercase tracking-wider block mb-1 text-[11px]">📍 {t.campusLabel}:</span>
                          <p className="text-slate-700">{displayCampus}</p>
                        </div>
                      ) : null}

                      <div className="bg-sky-50/50 p-3 rounded-lg border border-sky-100">
                        <span className="font-bold text-sky-950 uppercase tracking-wider block mb-1 text-[11px]">📋 {t.prereqTitle}</span>
                        <ul className="space-y-0.5 text-slate-700 list-disc list-inside">
                          {displayPrereqs.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Recommended Programmes */}
                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                        {t.recommendedCoursesTitle}
                      </span>
                      <div className="space-y-1">
                        {displayCourses.map((crs, i) => (
                          <div key={i} className="text-xs bg-slate-50 text-slate-800 p-2 rounded-lg border border-slate-200 flex items-start gap-1.5">
                            <span className="text-sky-600 font-bold">•</span>
                            <span>{crs}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Action column */}
                  <div className="lg:w-60 shrink-0 flex flex-col justify-between space-y-4 pt-4 lg:pt-0 lg:border-l lg:border-slate-200 lg:pl-5">
                    {displayPortal ? (
                      <div className="bg-sky-50 p-3 rounded-lg border border-sky-200 text-center space-y-1">
                        <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                          {t.portalLabel}
                        </span>
                        <div className="text-xs font-bold text-sky-900">
                          {displayPortal}
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      {pathway.status === 'not_eligible' && (
                        <div className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 text-center flex items-center justify-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                          <span>{lang === 'ms' ? 'Syarat kelayakan belum dicapai' : 'Requirements not yet met'}</span>
                        </div>
                      )}

                      <button
                        id={`select-first-choice-${pathway.id}`}
                        onClick={() => handleSelectFirstChoice(pathway)}
                        disabled={pathway.status === 'not_eligible'}
                        title={pathway.status === 'not_eligible' ? (lang === 'ms' ? 'Tidak layak memohon (Syarat kelayakan belum dicapai)' : 'Not eligible to apply (Requirements not yet met)') : ''}
                        className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm border cursor-pointer ${
                          pathway.status === 'not_eligible'
                            ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300 shadow-none'
                            : isFirstChoice
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-sky-950 border-yellow-500 ring-2 ring-yellow-300 font-black'
                            : 'bg-sky-600 hover:bg-sky-700 text-white border-sky-600'
                        }`}
                      >
                        {pathway.status === 'not_eligible' ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                            <span>{lang === 'ms' ? 'Tidak Layak Memohon' : 'Not Eligible to Apply'}</span>
                          </>
                        ) : isFirstChoice ? (
                          <>
                            <Check className="w-4 h-4 text-sky-950 stroke-[3]" />
                            <span>{lang === 'ms' ? '✓ Pilihan 1 Dipilih' : '✓ 1st Choice Selected'}</span>
                          </>
                        ) : (
                          <>
                            <Star className="w-3.5 h-3.5 text-yellow-300" />
                            <span>{t.selectAsFirstChoice}</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`select-second-choice-${pathway.id}`}
                        onClick={() => handleSelectSecondChoice(pathway)}
                        disabled={pathway.status === 'not_eligible'}
                        title={pathway.status === 'not_eligible' ? (lang === 'ms' ? 'Tidak layak memohon (Syarat kelayakan belum dicapai)' : 'Not eligible to apply (Requirements not yet met)') : ''}
                        className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                          pathway.status === 'not_eligible'
                            ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300 shadow-none'
                            : isSecondChoice
                            ? 'bg-sky-800 hover:bg-sky-900 text-white border-sky-800 ring-2 ring-sky-400 font-black'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-200'
                        }`}
                      >
                        {pathway.status === 'not_eligible' ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                            <span>{lang === 'ms' ? 'Tidak Layak Memohon' : 'Not Eligible to Apply'}</span>
                          </>
                        ) : isSecondChoice ? (
                          <>
                            <Check className="w-4 h-4 text-yellow-300 stroke-[3]" />
                            <span>{lang === 'ms' ? '✓ Pilihan 2 Dipilih' : '✓ 2nd Choice Selected'}</span>
                          </>
                        ) : (
                          <>
                            <Target className="w-3.5 h-3.5 text-sky-700" />
                            <span>{t.selectAsSecondChoice}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="bg-sky-900 rounded-lg p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-sky-700">
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              {lang === 'ms' ? 'Langkah Seterusnya: Pasport Hala Tuju & Ujian RIASEC' : 'Next Step: Pathway Passport & RIASEC Quiz'}
            </h4>
            <p className="text-xs text-sky-200">
              {lang === 'ms'
                ? 'Sahkan profil personaliti anda dan cetak dokumen Pasport Hala Tuju SMMH berserta tandatangan ibu bapa.'
                : 'Confirm your career personality profile and print the SMMH Pathway Passport complete with parent endorsement.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="calc-goto-riasec-btn"
              onClick={goToQuiz}
              className="px-4 py-2 rounded bg-sky-800 text-white hover:bg-sky-700 font-bold text-xs uppercase tracking-wider border border-sky-600 transition-all"
            >
              {t.nextToQuizBtn} →
            </button>
            <button
              id="calc-goto-passport-btn"
              onClick={goToPassport}
              className="px-4 py-2 rounded bg-amber-400 text-sky-950 hover:bg-amber-300 font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 border border-amber-500"
            >
              <span>{t.nextToPassportBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

