import React, { useState } from 'react';
import { 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Save, 
  Award, 
  Compass, 
  Briefcase
} from 'lucide-react';
import { 
  RIASEC_QUESTIONS, 
  RIASEC_DIMENSION_INFO, 
  calculateRiasecCode
} from '../data/riasecQuestions';
import { RiasecDimension, SmmhHalaTujuState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface RiasecQuizProps {
  state: SmmhHalaTujuState;
  updateState: (updater: (prev: SmmhHalaTujuState) => SmmhHalaTujuState) => void;
  onSaveProgress: () => void;
  goToPassport: () => void;
  goToCalculator: () => void;
}

const SCALE_OPTIONS = [
  { value: 1, labelMs: 'Sangat Tidak Setuju', labelEn: 'Strongly Disagree', shortMs: 'Sgt Tdk', shortEn: 'Str Dis', short: '1' },
  { value: 2, labelMs: 'Tidak Setuju', labelEn: 'Disagree', shortMs: 'Tdk Stj', shortEn: 'Dis', short: '2' },
  { value: 3, labelMs: 'Sederhana / Berkecuali', labelEn: 'Neutral', shortMs: 'Sdrhna', shortEn: 'Neu', short: '3' },
  { value: 4, labelMs: 'Setuju', labelEn: 'Agree', shortMs: 'Setuju', shortEn: 'Agr', short: '4' },
  { value: 5, labelMs: 'Sangat Setuju', labelEn: 'Strongly Agree', shortMs: 'Sgt Stj', shortEn: 'Str Agr', short: '5' }
];

export const RiasecQuiz: React.FC<RiasecQuizProps> = ({
  state,
  updateState,
  onSaveProgress,
  goToPassport,
  goToCalculator
}) => {
  const { lang, t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<RiasecDimension | 'ALL'>('ALL');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stepper' | 'fullList'>('fullList');

  const answers = state.riasecAnswers;
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = RIASEC_QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleScoreSelect = (questionId: number, score: number) => {
    const updatedAnswers = { ...answers, [questionId]: score };
    const { code, dominantTraits } = calculateRiasecCode(updatedAnswers);

    updateState((prev) => ({
      ...prev,
      riasecAnswers: updatedAnswers,
      riasecCode: code,
      dominantTraits: dominantTraits
    }));

    if (viewMode === 'stepper' && activeQuestionIndex < totalQuestions - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }

    if (Object.keys(updatedAnswers).length === totalQuestions && answeredCount < totalQuestions) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    if (window.confirm(t.confirmResetQuiz)) {
      updateState((prev) => ({
        ...prev,
        riasecAnswers: {},
        riasecCode: '---',
        dominantTraits: []
      }));
      setActiveQuestionIndex(0);
    }
  };

  const handleFillSample = () => {
    const sample: Record<number, number> = {
      1: 5, 2: 4, 3: 4, 4: 5, // R high
      5: 5, 6: 4, 7: 5, 8: 4, // I high
      9: 2, 10: 2, 11: 3, 12: 3, // A
      13: 4, 14: 3, 15: 3, 16: 4, // S
      17: 4, 18: 3, 19: 4, 20: 3, // E
      21: 4, 22: 4, 23: 3, 24: 3  // C
    };
    const { code, dominantTraits } = calculateRiasecCode(sample);
    updateState((prev) => ({
      ...prev,
      riasecAnswers: sample,
      riasecCode: code,
      dominantTraits: dominantTraits
    }));
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }
  };

  const calculated = calculateRiasecCode(answers);
  const isComplete = answeredCount === totalQuestions;

  const filteredQuestions = filterCategory === 'ALL' 
    ? RIASEC_QUESTIONS 
    : RIASEC_QUESTIONS.filter((q) => q.category === filterCategory);

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-2xl p-6 sm:p-8 text-white border border-sky-400/40 shadow-sm relative overflow-hidden">
        {/* Ambient sunshine glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-yellow-300/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-800/80 text-yellow-300 text-xs font-black uppercase tracking-wider border border-sky-400/50 shadow-xs">
              <BrainCircuit className="w-3.5 h-3.5 text-yellow-300" />
              {t.riasecModelBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {t.riasecHeaderTitle}
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
              {t.riasecHeaderDesc}
            </p>
          </div>

          {/* Quick Actions & Code Display */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="bg-sky-900/80 backdrop-blur-xs border border-sky-400/40 rounded-xl p-4 text-center min-w-[200px] shadow-sm">
              <div className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider font-mono">
                {t.yourRiasecCode}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-yellow-300 font-mono tracking-widest my-1">
                {isComplete || answeredCount >= 12 ? calculated.code : '---'}
              </div>
              <div className="text-xs text-sky-100 font-medium">
                {isComplete ? t.completeProfileBadge : `${answeredCount}/24 ${t.questionsAnswered}`}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <button
                id="save-riasec-btn"
                onClick={onSaveProgress}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-400 text-sky-950 font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors border border-yellow-500 shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-sky-950" />
                {lang === 'ms' ? 'Simpan' : 'Save'}
              </button>
              <button
                id="sample-riasec-btn"
                onClick={handleFillSample}
                className="px-3 py-2 rounded-lg bg-sky-800/90 text-white hover:bg-sky-700 text-xs font-bold uppercase tracking-wider transition-colors border border-sky-500 cursor-pointer"
                title={lang === 'ms' ? 'Isi contoh jawapan secara automatik untuk ujian pantas' : 'Auto-fill sample answers for quick testing'}
              >
                {t.sampleQuickFill}
              </button>
              <button
                id="reset-riasec-btn"
                onClick={handleResetQuiz}
                className="p-2 rounded-lg bg-sky-800/90 text-sky-200 hover:text-rose-300 hover:bg-rose-950/40 text-xs transition-colors border border-sky-500 cursor-pointer"
                title={lang === 'ms' ? 'Set Semula Semua Jawapan' : 'Reset All Answers'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-sky-400/40">
          <div className="flex justify-between items-center text-xs text-sky-100 mb-1.5 font-bold uppercase tracking-wider">
            <span>
              {t.quizProgress}: {answeredCount} {t.of} {totalQuestions} {t.itemsCompleted}
            </span>
            <span className="font-mono text-yellow-300 font-black">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-sky-900/90 rounded-full overflow-hidden border border-sky-400/40">
            <div
              className="h-full bg-yellow-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Trait Dimension Filter Pills & View Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mr-2 flex items-center gap-1">
            <FilterIcon /> {t.filterDimension}:
          </span>
          <button
            id="filter-all-btn"
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 rounded text-xs uppercase font-bold tracking-wider transition-all ${
              filterCategory === 'ALL'
                ? 'bg-sky-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.filterAllDim} (24)
          </button>
          {(['R', 'I', 'A', 'S', 'E', 'C'] as RiasecDimension[]).map((dim) => {
            const countForDim = RIASEC_QUESTIONS.filter((q) => q.category === dim && answers[q.id]).length;
            const isSelected = filterCategory === dim;
            const dimName = lang === 'en' ? RIASEC_DIMENSION_INFO[dim].nameEn : RIASEC_DIMENSION_INFO[dim].nameMs;
            return (
              <button
                key={dim}
                id={`filter-${dim}-btn`}
                onClick={() => setFilterCategory(dim)}
                className={`px-2.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all border ${
                  isSelected
                    ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: RIASEC_DIMENSION_INFO[dim].accentColor }}></span>
                <span>{dim} - {dimName.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({countForDim}/4)</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline uppercase font-bold text-[11px]">{t.viewMode}:</span>
          <div className="inline-flex rounded bg-slate-100 p-0.5 border border-slate-300">
            <button
              onClick={() => setViewMode('fullList')}
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'fullList' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              {t.fullList}
            </button>
            <button
              onClick={() => setViewMode('stepper')}
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'stepper' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              {t.focusStepper}
            </button>
          </div>
        </div>
      </div>

      {/* Main Questionnaire Section */}
      {viewMode === 'fullList' ? (
        <div className="space-y-3.5">
          {filteredQuestions.map((q) => {
            const currentScore = answers[q.id];
            const dimInfo = RIASEC_DIMENSION_INFO[q.category];
            const dimName = lang === 'en' ? dimInfo.nameEn : dimInfo.nameMs;

            return (
              <div
                key={q.id}
                id={`riasec-question-card-${q.id}`}
                className={`bg-white rounded-lg p-5 border transition-all duration-200 shadow-sm ${
                  currentScore
                    ? 'border-sky-300 border-l-4 border-l-sky-600 bg-sky-50/20'
                    : 'border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Question Content */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-5 h-5 rounded bg-sky-800 text-amber-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {q.id}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider text-white"
                        style={{ backgroundColor: dimInfo.accentColor }}
                      >
                        {dimName}
                      </span>
                      {currentScore && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300 uppercase tracking-wide">
                          <CheckCircle2 className="w-3 h-3" />
                          {t.scoreLabel}: {currentScore}/5 ({lang === 'en' ? SCALE_OPTIONS.find((s) => s.value === currentScore)?.labelEn : SCALE_OPTIONS.find((s) => s.value === currentScore)?.labelMs})
                        </span>
                      )}
                    </div>

                    {/* Bilingual Statements - primary matches language selected, secondary shown as reference */}
                    <div className="pt-1">
                      <p className="text-slate-900 font-bold text-sm sm:text-base leading-snug">
                        {lang === 'ms' ? q.statementMs : q.statementEn}
                      </p>
                      <p className="text-slate-500 text-xs italic mt-0.5">
                        {lang === 'ms' ? q.statementEn : q.statementMs}
                      </p>
                    </div>
                  </div>

                  {/* 1-5 Scale Scoring Buttons */}
                  <div className="shrink-0 pt-2 lg:pt-0">
                    <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                      {SCALE_OPTIONS.map((opt) => {
                        const isSelected = currentScore === opt.value;
                        const shortLabel = lang === 'en' ? opt.shortEn : opt.shortMs;
                        return (
                          <button
                            key={opt.value}
                            id={`q${q.id}-opt-${opt.value}`}
                            onClick={() => handleScoreSelect(q.id, opt.value)}
                            className={`flex flex-col items-center justify-center p-2 sm:px-2.5 sm:py-2 rounded border transition-all text-center min-w-[50px] sm:min-w-[64px] ${
                              isSelected
                                ? 'bg-sky-800 text-amber-300 border-sky-800 font-bold shadow-sm'
                                : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50 hover:border-sky-400'
                            }`}
                            title={`${opt.short} - ${lang === 'en' ? opt.labelEn : opt.labelMs}`}
                          >
                            <span className={`text-base font-black ${isSelected ? 'text-amber-300' : 'text-slate-800'}`}>
                              {opt.short}
                            </span>
                            <span className={`text-[8px] sm:text-[9px] uppercase font-bold tracking-tighter leading-tight mt-0.5 line-clamp-1 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                              {shortLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Stepper Single-Question Mode */
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-4">
            <span className="font-bold text-sky-800 uppercase tracking-wider">
              {lang === 'ms' ? 'Soalan' : 'Question'} {activeQuestionIndex + 1} {t.of} {totalQuestions}
            </span>
            <span
              className="px-2.5 py-0.5 rounded text-white font-bold text-xs uppercase"
              style={{ backgroundColor: RIASEC_DIMENSION_INFO[RIASEC_QUESTIONS[activeQuestionIndex].category].accentColor }}
            >
              {lang === 'ms' ? 'Kategori' : 'Category'}: {lang === 'en' ? RIASEC_DIMENSION_INFO[RIASEC_QUESTIONS[activeQuestionIndex].category].nameEn : RIASEC_DIMENSION_INFO[RIASEC_QUESTIONS[activeQuestionIndex].category].nameMs}
            </span>
          </div>

          <div className="py-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {lang === 'ms' ? RIASEC_QUESTIONS[activeQuestionIndex].statementMs : RIASEC_QUESTIONS[activeQuestionIndex].statementEn}
            </h3>
            <p className="text-sm text-slate-500 italic">
              {lang === 'ms' ? RIASEC_QUESTIONS[activeQuestionIndex].statementEn : RIASEC_QUESTIONS[activeQuestionIndex].statementMs}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-4">
            {SCALE_OPTIONS.map((opt) => {
              const isSelected = answers[RIASEC_QUESTIONS[activeQuestionIndex].id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleScoreSelect(RIASEC_QUESTIONS[activeQuestionIndex].id, opt.value)}
                  className={`p-3.5 rounded border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-sky-800 text-amber-300 border-sky-800 font-bold shadow-sm'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50 hover:border-sky-400'
                  }`}
                >
                  <span className={`text-xl font-black ${isSelected ? 'text-amber-300' : 'text-slate-800'}`}>
                    {opt.short}
                  </span>
                  <span className="text-xs font-bold uppercase">{lang === 'en' ? opt.labelEn : opt.labelMs}</span>
                  <span className="text-[10px] text-slate-400 italic">{lang === 'en' ? opt.labelMs : opt.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              disabled={activeQuestionIndex === 0}
              onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded bg-slate-100 text-slate-800 font-bold uppercase text-xs disabled:opacity-40 border border-slate-300"
            >
              ← {t.prevQuestion}
            </button>
            <div className="flex items-center gap-1">
              {RIASEC_QUESTIONS.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-2.5 h-2.5 rounded cursor-pointer transition-all ${
                    idx === activeQuestionIndex
                      ? 'bg-sky-700 w-4'
                      : answers[RIASEC_QUESTIONS[idx].id]
                      ? 'bg-emerald-600'
                      : 'bg-slate-300'
                  }`}
                ></span>
              ))}
            </div>
            <button
              disabled={activeQuestionIndex === totalQuestions - 1}
              onClick={() => setActiveQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-4 py-2 rounded bg-sky-700 text-white font-bold uppercase text-xs disabled:opacity-40 border border-sky-700"
            >
              {t.nextQuestion} →
            </button>
          </div>
        </div>
      )}

      {/* Results Breakdown & Wawasan 2035 Career Matches */}
      <div id="riasec-results-section" className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="border-l-4 border-sky-600 pl-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <Award className="w-3.5 h-3.5 text-sky-600" />
              {t.riasecResultsTitle}
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
              {t.riasecResultsSubtitle}: <span className="text-sky-700 font-mono">{calculated.code}</span>
            </h3>
            <p className="text-slate-600 text-xs mt-0.5">
              {t.riasecResultsNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="goto-passport-from-quiz-btn"
              onClick={goToPassport}
              className="flex items-center gap-2 px-4 py-2 rounded bg-sky-700 text-white hover:bg-sky-800 font-bold text-xs uppercase tracking-wider shadow-sm transition-all border border-sky-700"
            >
              <span>{t.generatePassportBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
            <button
              id="goto-calc-from-quiz-btn"
              onClick={goToCalculator}
              className="flex items-center gap-2 px-4 py-2 rounded bg-amber-400 text-sky-950 hover:bg-amber-300 font-bold text-xs uppercase tracking-wider shadow-sm transition-all border border-amber-500"
            >
              <Compass className="w-3.5 h-3.5 text-sky-950" />
              <span>{t.checkEligibilityBtn}</span>
            </button>
          </div>
        </div>

        {/* 6 Dimensions Score Breakdown Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            {t.scoreDistributionTitle}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(['R', 'I', 'A', 'S', 'E', 'C'] as RiasecDimension[]).map((dim) => {
              const info = RIASEC_DIMENSION_INFO[dim];
              const score = calculated.scores[dim];
              const maxPossible = 20;
              const percentage = Math.round((score / maxPossible) * 100);
              const isDominant = calculated.dominantTraits.includes(dim);
              const namePrimary = lang === 'en' ? info.nameEn : info.nameMs;
              const nameSecondary = lang === 'en' ? info.nameMs : info.nameEn;
              const desc = lang === 'en' && info.descriptionEn ? info.descriptionEn : info.descriptionMs;

              return (
                <div
                  key={dim}
                  className={`p-4 rounded-lg border transition-all ${
                    isDominant
                      ? 'bg-sky-50/40 border-sky-500 border-l-4 border-l-sky-600 shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded text-white font-bold text-xs flex items-center justify-center font-mono shadow-sm"
                        style={{ backgroundColor: info.accentColor }}
                      >
                        {dim}
                      </span>
                      <div>
                        <div className="font-bold text-xs text-slate-800 uppercase leading-tight">
                          {namePrimary}
                        </div>
                        <div className="text-[10px] text-slate-500">{nameSecondary}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900 font-mono">
                        {score}
                      </span>
                      <span className="text-[10px] text-slate-500">/20</span>
                      {isDominant && (
                        <div className="text-[9px] font-bold text-sky-950 bg-amber-400 px-1.5 py-0.2 rounded mt-0.5 uppercase">
                          {t.top3Badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dimension Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded overflow-hidden my-2">
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: info.accentColor
                      }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2 mt-1">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic 3 Career Matches Aligned with Wawasan Brunei 2035 */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                {t.careerAlignmentBadge}
              </div>
              <h4 className="text-base font-black text-slate-900 uppercase">
                {t.threeCareerMatchesTitle} ({calculated.code})
              </h4>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block font-medium">
              {t.wawasanAlignNote}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {calculated.careerSuggestions.map((career, idx) => {
              const titlePrimary = lang === 'en' ? career.titleEn : career.titleMs;
              const titleSecondary = lang === 'en' ? career.titleMs : career.titleEn;
              const desc = lang === 'en' && career.descriptionEn ? career.descriptionEn : career.descriptionMs;

              return (
                <div
                  key={idx}
                  className="bg-sky-50/30 rounded-lg p-5 border border-dashed border-sky-300 flex flex-col justify-between hover:border-sky-600 transition-all shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="w-5 h-5 rounded bg-sky-800 text-amber-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[9px] font-bold text-slate-700 bg-white border border-slate-300 px-2 py-0.5 rounded uppercase tracking-wider">
                        {career.sector}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors leading-snug">
                        {titlePrimary}
                      </h5>
                      <p className="text-[11px] text-slate-500 italic mt-0.5">{titleSecondary}</p>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                      {desc}
                    </p>

                    <div className="text-[10px] text-emerald-900 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium">
                      🎯 <strong>{career.wawasan2035Goal}</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs">
                    <span className="text-slate-600 font-bold uppercase text-[10px] block mb-1">{t.trainingInstitutionsLabel}:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.institutions.map((inst, i) => (
                        <span key={i} className="text-[10px] bg-sky-100 text-sky-900 px-1.5 py-0.2 rounded font-medium">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

function FilterIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}
