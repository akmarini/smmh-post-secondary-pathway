import React, { useState } from 'react';
import { 
  GitBranch, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  ExternalLink, 
  BookOpen, 
  Clock, 
  Award, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Layers, 
  Briefcase, 
  ChevronDown, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  Cpu,
  Coffee,
  Palette,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { SmmhHalaTujuState } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { calculateCredits, isCreditGrade } from '../data/pathwayRules';
import { 
  VISUAL_PATHWAY_NODES, 
  VisualPathwayNode, 
  PathwayStream, 
  PATHWAY_COMPARISON_DATA 
} from '../data/visualPathwaysData';
import { 
  PRIVATE_INSTITUTIONS_DATA, 
  PrivateInstitution, 
  PrivateProgramme 
} from '../data/privateCollegesData';

interface VisualPathwaysViewProps {
  state: SmmhHalaTujuState;
  updateState?: (updater: (prev: SmmhHalaTujuState) => SmmhHalaTujuState) => void;
  onSaveProgress?: () => void;
  goToCalculator: () => void;
  goToPassport: () => void;
}

export const VisualPathwaysView: React.FC<VisualPathwaysViewProps> = ({
  state,
  updateState,
  onSaveProgress,
  goToCalculator,
  goToPassport
}) => {
  const { lang, t } = useLanguage();

  // Active Main Sub-Tab
  const [activeMainTab, setActiveMainTab] = useState<'roadmap' | 'private_colleges' | 'comparison'>('roadmap');

  // Roadmap Filters
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedCreditFilter, setSelectedCreditFilter] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<VisualPathwayNode | null>(null);

  // Private Colleges Filters
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgLevel, setSelectedProgLevel] = useState<string>('all');
  const [privateSearchQuery, setPrivateSearchQuery] = useState<string>('');
  const [selectedProgrammeModal, setSelectedProgrammeModal] = useState<PrivateProgramme | null>(null);
  const [onlyShowEligible, setOnlyShowEligible] = useState<boolean>(false);

  // Student O-Level Summary
  const creditSummary = calculateCredits(state?.subjectGrades || []);
  const totalCredits = creditSummary.totalCredits;
  const bmGrade = state?.subjectGrades?.find((s) => s.id === 'sub-bm' || s.id === 'bm')?.grade || '';
  const engGrade = state?.subjectGrades?.find((s) => s.id === 'sub-eng' || s.id === 'english')?.grade || '';
  const mathGrade = state?.subjectGrades?.find((s) => s.id === 'sub-math' || s.id === 'math_d')?.grade || '';
  const hasBmCredit = isCreditGrade(bmGrade);
  const hasEngCredit = isCreditGrade(engGrade);
  const hasMathCredit = isCreditGrade(mathGrade);

  // Check student eligibility for a roadmap node
  const checkNodeEligibility = (node: VisualPathwayNode) => {
    if (node.id === 'entry-olevel' || node.id === 'dest-career-industry') {
      return { eligible: true, noteMs: 'Terbuka untuk semua pelajar.', noteEn: 'Open to all students.' };
    }

    if (totalCredits < node.minCredits) {
      return {
        eligible: false,
        noteMs: `Memerlukan sekurang-kurangnya ${node.minCredits} kredit (Anda mempunyai ${totalCredits} kredit).`,
        noteEn: `Requires at least ${node.minCredits} credits (You have ${totalCredits} credits).`
      };
    }

    if (node.id === 'track-sixthform') {
      if (!hasBmCredit) {
        return {
          eligible: true,
          noteMs: `Keputusan anda (${totalCredits} kredit) layak memohon Tingkatan Enam. Pelajar dibenarkan mengambil semula (retake) peperiksaan O-Level Bahasa Melayu semasa belajar di PTE.`,
          noteEn: `Your results (${totalCredits} credits) qualify for Sixth Form. Students are permitted to retake the Bahasa Melayu O-Level paper while studying at PTE.`
        };
      }
    }

    if (node.id === 'track-polytechnic') {
      if (!hasEngCredit) {
        return {
          eligible: false,
          noteMs: 'Politeknik Brunei mensyaratkan Kredit Bahasa Inggeris 1123 (Gred C6 ke atas) untuk semua kemasukan Diploma Level 5.',
          noteEn: 'Politeknik Brunei requires an English Language 1123 credit (Grade C6 or above) for all Level 5 Diploma programmes.'
        };
      }
    }

    return {
      eligible: true,
      noteMs: `Keputusan anda (${totalCredits} kredit) mencukupi untuk memohon laluan ini.`,
      noteEn: `Your results (${totalCredits} credits) meet the threshold for this pathway.`
    };
  };

  // Check student eligibility for a private programme
  const checkProgEligibility = (prog: PrivateProgramme) => {
    if (totalCredits >= prog.minCredits) {
      return {
        eligible: true,
        textMs: `Layak Memohon (${totalCredits}/${prog.minCredits} Kredit)`,
        textEn: `Eligible to Apply (${totalCredits}/${prog.minCredits} Credits)`
      };
    }
    return {
      eligible: false,
      textMs: `Perlu ${prog.minCredits} Kredit (Kini: ${totalCredits})`,
      textEn: `Requires ${prog.minCredits} Credits (Current: ${totalCredits})`
    };
  };

  // Filtered Roadmap Nodes
  const filteredNodes = VISUAL_PATHWAY_NODES.filter((node) => {
    if (selectedStream !== 'all' && node.stream !== selectedStream && node.stageLevel !== 'entry' && node.stageLevel !== 'career_industry') {
      return false;
    }
    if (selectedCreditFilter === '5plus' && node.minCredits < 5) return false;
    if (selectedCreditFilter === '3to4' && (node.minCredits < 3 || node.minCredits > 4)) return false;
    if (selectedCreditFilter === '1to2' && (node.minCredits < 1 || node.minCredits > 2)) return false;
    if (selectedCreditFilter === '0' && node.minCredits !== 0) return false;
    return true;
  });

  // Group nodes by stage for structured visual progression
  const stageGroups = [
    {
      level: 'entry',
      titleMs: 'Tahap 1: Asas Keputusan O-Level',
      titleEn: 'Stage 1: O-Level Foundation',
      subtitleMs: 'Keputusan Peperiksaan Tahun 11 SMMH',
      subtitleEn: 'Year 11 SMMH Examination Results',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      nodes: filteredNodes.filter((n) => n.stageLevel === 'entry')
    },
    {
      level: 'post_secondary',
      titleMs: 'Tahap 2: Institusi Lepasan Menengah & Foundation',
      titleEn: 'Stage 2: Post-Secondary & Foundations',
      subtitleMs: 'Pusat Tingkatan Enam, Politeknik, IBTE & Kolej Swasta',
      subtitleEn: 'Sixth Form, Polytechnic, IBTE & Private Colleges',
      badgeColor: 'bg-sky-600 text-white font-bold',
      nodes: filteredNodes.filter((n) => n.stageLevel === 'post_secondary')
    },
    {
      level: 'higher_diploma',
      titleMs: 'Tahap 3: Diploma Lanjutan & BTEC Level 5',
      titleEn: 'Stage 3: Higher National Diplomas',
      subtitleMs: 'Diploma BDQF Tahap 5 & BTEC HND UK',
      subtitleEn: 'BDQF Level 5 Diplomas & Pearson BTEC UK',
      badgeColor: 'bg-indigo-600 text-white font-bold',
      nodes: filteredNodes.filter((n) => n.stageLevel === 'higher_diploma')
    },
    {
      level: 'degree_university',
      titleMs: 'Tahap 4: Ijazah Sarjana Muda & Universiti',
      titleEn: 'Stage 4: Bachelor Degrees & Universities',
      subtitleMs: 'Universiti Tempatan (UBD/UTB), Luar Negara & Ijazah 3+0 Swasta',
      subtitleEn: 'Local Universities (UBD/UTB), Overseas & Private 3+0 Degrees',
      badgeColor: 'bg-blue-600 text-white font-bold',
      nodes: filteredNodes.filter((n) => n.stageLevel === 'degree_university')
    },
    {
      level: 'career_industry',
      titleMs: 'Tahap 5: Pasaran Kerjaya & Industri',
      titleEn: 'Stage 5: Careers & Industry Sectors',
      subtitleMs: 'Sektor Kerajaan, Tenaga, GLC, Korporat & Keusahawanan',
      subtitleEn: 'Public Service, Energy, GLCs, Corporate & Entrepreneurship',
      badgeColor: 'bg-emerald-600 text-white font-bold',
      nodes: filteredNodes.filter((n) => n.stageLevel === 'career_industry')
    }
  ];

  // Filtered Private Programmes
  const allPrivateProgrammes: { institution: PrivateInstitution; programme: PrivateProgramme }[] = [];
  PRIVATE_INSTITUTIONS_DATA.forEach((inst) => {
    inst.programmes.forEach((prog) => {
      allPrivateProgrammes.push({ institution: inst, programme: prog });
    });
  });

  const filteredPrivateProgrammes = allPrivateProgrammes.filter(({ institution, programme }) => {
    if (selectedInstitutionId !== 'all' && institution.id !== selectedInstitutionId) return false;
    if (selectedCategory !== 'all' && programme.fieldCategory !== selectedCategory) return false;
    if (selectedProgLevel === 'foundation' && programme.level !== 'Foundation' && programme.level !== 'BDQF Level 3') return false;
    if (selectedProgLevel === 'diploma' && programme.level !== 'BDQF Level 4' && programme.level !== 'BDQF Level 5 (Diploma)') return false;
    if (onlyShowEligible && totalCredits < programme.minCredits) return false;

    if (privateSearchQuery.trim()) {
      const q = privateSearchQuery.toLowerCase();
      const matchName = programme.name.toLowerCase().includes(q);
      const matchInst = institution.name.toLowerCase().includes(q) || institution.shortName.toLowerCase().includes(q);
      const matchAward = programme.awardingBody.toLowerCase().includes(q);
      const matchModules = programme.keyModulesMs.some(m => m.toLowerCase().includes(q)) || programme.keyModulesEn.some(m => m.toLowerCase().includes(q));
      if (!matchName && !matchInst && !matchAward && !matchModules) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 text-white rounded-2xl p-6 sm:p-8 border border-sky-400/40 shadow-sm relative overflow-hidden">
        {/* Ambient sunshine glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-yellow-300/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-800/80 text-yellow-300 text-xs font-bold uppercase tracking-wider border border-sky-400/50 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-yellow-300" />
              <span>{lang === 'ms' ? 'Peta Visual Hala Tuju & Panduan Institusi Swasta' : 'Visual Pathway Map & Private Institutions Guide'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              {lang === 'ms' ? 'Peta Visual Hala Tuju Pendidikan & Kerjaya' : 'Visual Post-O Level Education & Career Pathways'}
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 max-w-3xl leading-relaxed font-normal">
              {lang === 'ms'
                ? 'Panduan interaktif menyeluruh mengenai cabang laluan lepasan O-Level di Brunei Darussalam: Pusat Tingkatan Enam (PTET), Politeknik Brunei, IBTE, dan program Foundation serta Diploma yang ditawarkan oleh institusi pengajian tinggi swasta (CCCT, Micronet, LCB, Kolej IGS).'
                : 'A comprehensive interactive roadmap detailing post-O Level pathways in Brunei Darussalam: Sixth Form Centres (PTET), Politeknik Brunei, IBTE, and Foundation & Diploma programmes offered by accredited private colleges (CCCT, Micronet, LCB, Kolej IGS).'}
            </p>
          </div>

          {/* Student Quick Status Pill */}
          <div className="bg-sky-900/80 backdrop-blur-xs p-4 rounded-xl border border-sky-400/40 shrink-0 text-center lg:text-right space-y-1 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-yellow-300">
              {lang === 'ms' ? 'Status Keputusan Anda' : 'Your Results Status'}
            </div>
            <div className="text-2xl font-black text-yellow-300">
              {totalCredits} <span className="text-xs font-bold text-white uppercase">{lang === 'ms' ? 'Kredit O-Level' : 'O-Level Credits'}</span>
            </div>
            <div className="text-[11px] text-sky-100 flex items-center justify-center lg:justify-end gap-2 font-medium">
              <span>BM: <strong className={hasBmCredit ? 'text-yellow-300' : 'text-slate-300'}>{bmGrade || '-'}</strong></span>
              <span>•</span>
              <span>Eng: <strong className={hasEngCredit ? 'text-yellow-300' : 'text-slate-300'}>{engGrade || '-'}</strong></span>
              <span>•</span>
              <span>Math: <strong className={hasMathCredit ? 'text-yellow-300' : 'text-slate-300'}>{mathGrade || '-'}</strong></span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-5 border-t border-sky-400/40">
          <button
            onClick={() => setActiveMainTab('roadmap')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'roadmap'
                ? 'bg-yellow-400 text-sky-950 font-black shadow-sm ring-2 ring-yellow-400/70'
                : 'bg-sky-800/80 text-white hover:bg-sky-700/90'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>{lang === 'ms' ? '1. Peta Visual Hala Tuju (Roadmap)' : '1. Visual Pathway Roadmap'}</span>
          </button>

          <button
            onClick={() => setActiveMainTab('private_colleges')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'private_colleges'
                ? 'bg-yellow-400 text-sky-950 font-black shadow-sm ring-2 ring-yellow-400/70'
                : 'bg-sky-800/80 text-white hover:bg-sky-700/90'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{lang === 'ms' ? '2. Institusi Swasta: Foundation & Diploma' : '2. Private Colleges: Foundation & Diploma'}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              activeMainTab === 'private_colleges' ? 'bg-sky-900 text-yellow-300' : 'bg-sky-700 text-white'
            }`}>
              CCCT, LCB, Micronet, IGS
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('comparison')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeMainTab === 'comparison'
                ? 'bg-yellow-400 text-sky-950 font-black shadow-sm ring-2 ring-yellow-400/70'
                : 'bg-sky-800/80 text-white hover:bg-sky-700/90'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'ms' ? '3. Jadual Perbandingan Laluan' : '3. Pathway Comparison Matrix'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VISUAL PATHWAY ROADMAP */}
      {activeMainTab === 'roadmap' && (
        <div className="space-y-6">
          {/* Roadmap Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Filter className="w-4 h-4 text-sky-700" />
                  {lang === 'ms' ? 'Tapis Aliran & Syarat Kelayakan' : 'Filter Streams & Credit Threshold'}
                </h3>
                <p className="text-xs text-slate-600">
                  {lang === 'ms' ? 'Pilih aliran pendidikan untuk melihat perkembangan berperingkat dari O-Level hingga kerjaya.' : 'Select an educational stream to inspect progression stages from O-Levels to industry careers.'}
                </p>
              </div>

              {/* Credit filter pill */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                  {lang === 'ms' ? 'Kredit O-Level:' : 'Credits:'}
                </span>
                {[
                  { id: 'all', label: lang === 'ms' ? 'Semua' : 'All' },
                  { id: '5plus', label: '5+ Kredit' },
                  { id: '3to4', label: '3 - 4 Kredit' },
                  { id: '1to2', label: '1 - 2 Kredit' },
                  { id: '0', label: '0 Kredit / ISQ' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCreditFilter(item.id)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      selectedCreditFilter === item.id
                        ? 'bg-sky-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stream Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
              {[
                { id: 'all', labelMs: 'Semua Aliran', labelEn: 'All Streams', color: 'border-slate-300' },
                { id: 'academic', labelMs: 'Tingkatan 6 (PTET)', labelEn: 'Sixth Form (PTET)', color: 'border-sky-500' },
                { id: 'polytechnic', labelMs: 'Politeknik Brunei', labelEn: 'Politeknik Brunei', color: 'border-emerald-500' },
                { id: 'tvet', labelMs: 'IBTE (HNTec/NTec)', labelEn: 'IBTE TVET', color: 'border-amber-500' },
                { id: 'private', labelMs: 'Kolej Swasta (CCCT/LCB)', labelEn: 'Private Colleges', color: 'border-purple-500' },
                { id: 'apprenticeship', labelMs: 'Perantisan Minyak & Gas', labelEn: 'Energy Apprenticeship', color: 'border-rose-500' }
              ].map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => setSelectedStream(stream.id)}
                  className={`p-2.5 rounded text-left border transition-all ${
                    selectedStream === stream.id
                      ? 'bg-sky-900 text-white border-sky-900 shadow-sm font-black'
                      : `bg-slate-50 text-slate-800 hover:bg-slate-100 ${stream.color}`
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">
                    {lang === 'ms' ? stream.labelMs : stream.labelEn}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Step-by-Step Pathway Tree / Grid */}
          <div className="space-y-6">
            {stageGroups.map((stage, sIdx) => {
              if (stage.nodes.length === 0) return null;

              return (
                <div key={stage.level} className="relative">
                  {/* Stage Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider ${stage.badgeColor}`}>
                      {lang === 'ms' ? stage.titleMs : stage.titleEn}
                    </span>
                    <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                      {lang === 'ms' ? stage.subtitleMs : stage.subtitleEn}
                    </span>
                    <div className="h-px bg-slate-200 flex-1 ml-2"></div>
                  </div>

                  {/* Stage Nodes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stage.nodes.map((node) => {
                      const eligibility = checkNodeEligibility(node);
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`rounded-lg border-2 p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-300'
                              : 'border-slate-200 bg-white hover:border-sky-400'
                          }`}
                        >
                          <div>
                            {/* Top Badge Row */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${node.colorTheme.badge}`}>
                                {node.bdqfLevel}
                              </span>
                              <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                ⏱️ {lang === 'ms' ? node.durationMs : node.durationEn}
                              </span>
                            </div>

                            {/* Node Title */}
                            <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug mb-1">
                              {lang === 'ms' ? node.titleMs : node.titleEn}
                            </h4>

                            {/* Institution */}
                            <div className="text-xs font-semibold text-sky-800 mb-2">
                              {lang === 'ms' ? node.institutionMs : node.institutionEn}
                            </div>

                            {/* Short Summary */}
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {lang === 'ms' ? node.summaryMs : node.summaryEn}
                            </p>
                          </div>

                          {/* Requirements & Eligibility Footer */}
                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <div className="text-[11px] text-slate-700">
                              <strong className="text-slate-900 uppercase font-bold text-[10px] tracking-wider block">
                                {lang === 'ms' ? 'Syarat Minimum:' : 'Min Requirement:'}
                              </strong>
                              <span className="line-clamp-1">{lang === 'ms' ? node.entryRequirementMs : node.entryRequirementEn}</span>
                            </div>

                            {/* Eligibility indicator */}
                            <div className={`p-2 rounded text-[11px] font-bold flex items-center justify-between gap-2 ${
                              eligibility.eligible 
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                                : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}>
                              <span className="flex items-center gap-1.5">
                                {eligibility.eligible ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                ) : (
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                )}
                                <span>{eligibility.eligible ? (lang === 'ms' ? 'Anda Layak' : 'Eligible') : (lang === 'ms' ? 'Belum Cukup Kredit' : 'Credit Gap')}</span>
                              </span>
                              <span className="text-[10px] uppercase underline tracking-wider">
                                {lang === 'ms' ? 'Perincian ➔' : 'Inspect ➔'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Visual connector arrow between stages (except last) */}
                  {sIdx < stageGroups.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-inner">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PRIVATE HIGHER EDUCATION INSTITUTIONS & PROGRAMMES */}
      {activeMainTab === 'private_colleges' && (
        <div className="space-y-6">
          {/* Explanatory Intro Card */}
          <div className="bg-purple-950 text-purple-100 p-6 rounded-lg border border-purple-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-purple-900 text-amber-300 text-xs font-bold uppercase tracking-wider border border-purple-700">
                <Building2 className="w-3.5 h-3.5" />
                <span>{lang === 'ms' ? 'Institusi Pengajian Tinggi Swasta Berdaftar Brunei' : 'Registered Private Higher Education Brunei'}</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase">
                {lang === 'ms' ? 'Program Foundation & Diploma Kolej Swasta' : 'Private College Foundation & Diploma Programmes'}
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                {lang === 'ms'
                  ? 'Institusi swasta di Brunei seperti CCCT, Micronet, Laksamana College of Business (LCB), Kolej IGS, dan BICPA-FTMS menyediakan laluan Foundation dan Diploma BDQF Tahap 4 & 5 bertaraf UK (Pearson BTEC, NCC Education, University of Chester) dengan syarat kemasukan yang anjal bermula dari 1 hingga 4 Kredit O-Level.'
                  : 'Private institutions in Brunei including CCCT, Micronet, Laksamana College of Business (LCB), Kolej IGS, and BICPA-FTMS offer UK-accredited Foundation and BDQF Level 4 & 5 Diplomas (Pearson BTEC, NCC Education, University of Chester) with flexible admission starting from 1 to 4 O-Level credits.'}
              </p>
            </div>

            <div className="bg-purple-900/80 p-4 rounded-lg border border-purple-700 text-center shrink-0 w-full md:w-auto">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                {lang === 'ms' ? 'Jumlah Program Ditawarkan' : 'Total Programmes Offered'}
              </div>
              <div className="text-3xl font-black text-amber-300">
                14+
              </div>
              <div className="text-[11px] text-purple-200">
                {lang === 'ms' ? 'Foundation, BTEC & Diploma' : 'Foundation, BTEC & Diplomas'}
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search input */}
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={privateSearchQuery}
                  onChange={(e) => setPrivateSearchQuery(e.target.value)}
                  placeholder={lang === 'ms' ? 'Cari kursus, kolej (cth: CCCT, IT, BTEC, LCB)...' : 'Search courses, colleges (e.g. CCCT, IT, BTEC, LCB)...'}
                  className="w-full h-10 pl-9 pr-3 rounded border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-sky-600 focus:outline-none font-medium"
                />
              </div>

              {/* Institution Filter */}
              <div>
                <select
                  value={selectedInstitutionId}
                  onChange={(e) => setSelectedInstitutionId(e.target.value)}
                  className="w-full h-10 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">{lang === 'ms' ? 'Semua Institusi Swasta' : 'All Private Institutions'}</option>
                  <option value="ccct">CCCT (Cosmopolitan College)</option>
                  <option value="micronet">Micronet International College</option>
                  <option value="lcb">Laksamana College of Business (LCB)</option>
                  <option value="kolej-igs">Kolej IGS</option>
                  <option value="bicpa-ftms">BICPA-FTMS Accountancy</option>
                </select>
              </div>

              {/* Subject Field Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">{lang === 'ms' ? 'Semua Bidang Pengajian' : 'All Fields of Study'}</option>
                  <option value="it_computing">💻 IT & Pengkomputeran</option>
                  <option value="business_finance">💼 Perniagaan & Pengurusan</option>
                  <option value="hospitality_culinary">🍽️ Hospitaliti & Seni Kulinari</option>
                  <option value="creative_media">🎨 Media Kreatif & Penyiaran</option>
                  <option value="accounting">📊 Perakaunan Profesional (ACCA)</option>
                </select>
              </div>
            </div>

            {/* Quick Level Pills & Eligible Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                  {lang === 'ms' ? 'Peringkat Kursus:' : 'Level:'}
                </span>
                {[
                  { id: 'all', label: lang === 'ms' ? 'Semua Peringkat' : 'All Levels' },
                  { id: 'foundation', label: 'Foundation / Sijil (1-3 Kredit)' },
                  { id: 'diploma', label: 'Diploma BDQF Tahap 5 / BTEC HND (4+ Kredit)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProgLevel(item.id)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      selectedProgLevel === item.id
                        ? 'bg-purple-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Match My Grades Checkbox */}
              <label className="inline-flex items-center gap-2 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyShowEligible}
                  onChange={(e) => setOnlyShowEligible(e.target.checked)}
                  className="rounded text-purple-700 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                />
                <span>{lang === 'ms' ? `Tapis Hanya Yang Layak Saja (${totalCredits} Kredit)` : `Only Show Eligible (${totalCredits} Credits)`}</span>
              </label>
            </div>
          </div>

          {/* Programmes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrivateProgrammes.map(({ institution, programme }) => {
              const elig = checkProgEligibility(programme);

              return (
                <div
                  key={programme.id}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-purple-500 hover:shadow-md transition-all flex flex-col justify-between p-5 space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Row: Institution + Level */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-black text-purple-950 bg-purple-100 px-2 py-0.5 rounded border border-purple-200 uppercase tracking-wider">
                        {institution.shortName}
                      </span>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {programme.level}
                      </span>
                    </div>

                    {/* Programme Name */}
                    <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug">
                      {lang === 'ms' && programme.nameMs ? programme.nameMs : programme.name}
                    </h4>

                    {/* Awarding body & Duration */}
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-slate-700">
                        <Award className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                        <span className="font-medium truncate">{programme.awardingBody}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{lang === 'ms' ? programme.durationMs : programme.durationEn}</span>
                        <span className="text-slate-400">•</span>
                        <span>{programme.intakeMonths}</span>
                      </div>
                    </div>

                    {/* Short Overview */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {lang === 'ms' ? programme.overviewMs : programme.overviewEn}
                    </p>

                    {/* Entry Requirement Pill */}
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs text-slate-700">
                      <strong className="text-slate-900 uppercase font-bold text-[10px] tracking-wider block mb-0.5">
                        {lang === 'ms' ? 'Syarat Kemasukan:' : 'Entry Requirement:'}
                      </strong>
                      <p className="text-[11px] leading-tight">
                        {lang === 'ms' ? programme.minCreditNoteMs : programme.minCreditNoteEn}
                      </p>
                    </div>
                  </div>

                  {/* Card Action & Eligibility Status */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className={`p-2 rounded text-[11px] font-bold flex items-center justify-between ${
                      elig.eligible 
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-950 border border-amber-200'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        {elig.eligible ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        )}
                        <span>{lang === 'ms' ? elig.textMs : elig.textEn}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProgrammeModal(programme)}
                      className="w-full py-2 px-3 rounded bg-purple-900 text-white hover:bg-purple-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{lang === 'ms' ? 'Lihat Modul & Laluan Ijazah' : 'View Modules & Degree Route'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Directory of Private Institutions */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-l-4 border-purple-700 pl-3">
              <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {lang === 'ms' ? 'Direktori & Profil Kolej Swasta di Brunei' : 'Brunei Private Colleges Directory & Profiles'}
              </h3>
              <p className="text-xs text-slate-600">
                {lang === 'ms' ? 'Maklumat perhubungan, lokasi kampus, dan pengiktirafan rasmi bagi institusi swasta berdaftar.' : 'Contact information, campus locations, and accreditation credentials for registered private colleges.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRIVATE_INSTITUTIONS_DATA.map((inst) => (
                <div key={inst.id} className="p-5 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                        {inst.shortName} • Est. {inst.established}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm mt-1">
                        {lang === 'ms' ? inst.nameMs : inst.nameEn}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {lang === 'ms' ? inst.descriptionMs : inst.descriptionEn}
                  </p>

                  <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>{lang === 'ms' ? inst.campusLocationMs : inst.campusLocationEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lang === 'ms' ? inst.accreditationMs : inst.accreditationEn}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{inst.contactPhone}</span>
                    <a
                      href={inst.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-800 hover:text-purple-950 font-bold inline-flex items-center gap-1 uppercase tracking-wider text-[11px]"
                    >
                      <span>Laman Web Rasmi</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPARISON MATRIX */}
      {activeMainTab === 'comparison' && (
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-l-4 border-sky-700 pl-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
              {lang === 'ms' ? 'Jadual Perbandingan Komprehensif Cabang Lepasan O-Level' : 'Comprehensive Post-O Level Pathway Comparison Matrix'}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'ms'
                ? 'Perbandingan terperinci antara Tingkatan Enam (PTET), Politeknik Brunei, IBTE TVET, Kolej Swasta, dan Perantisan Industri.'
                : 'Side-by-side comparison between Sixth Form (PTET), Politeknik Brunei, IBTE TVET, Private Colleges, and Industrial Apprenticeships.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-sky-950 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-3 border border-sky-900 w-48">Kriteria / Parameter</th>
                  <th className="p-3 border border-sky-900 bg-sky-900 text-sky-100">Pusat Tingkatan Enam (PTET)</th>
                  <th className="p-3 border border-sky-900 bg-emerald-950 text-emerald-100">Politeknik Brunei (PB)</th>
                  <th className="p-3 border border-sky-900 bg-amber-950 text-amber-100">IBTE (HNTec & NTec)</th>
                  <th className="p-3 border border-sky-900 bg-purple-950 text-purple-100">Kolej Swasta (CCCT/LCB)</th>
                  <th className="p-3 border border-sky-900 bg-rose-950 text-rose-100">Perantisan Industri (ISQ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PATHWAY_COMPARISON_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 font-black text-slate-900 bg-slate-100 border border-slate-200">
                      {lang === 'ms' ? row.titleMs : row.titleEn}
                    </td>
                    <td className="p-3 text-slate-800 border border-slate-200 font-medium">
                      {row.academicTrack}
                    </td>
                    <td className="p-3 text-slate-800 border border-slate-200 font-medium">
                      {row.polytechnicTrack}
                    </td>
                    <td className="p-3 text-slate-800 border border-slate-200 font-medium">
                      {row.tvetTrack}
                    </td>
                    <td className="p-3 text-purple-950 bg-purple-50/40 border border-slate-200 font-bold">
                      {row.privateTrack}
                    </td>
                    <td className="p-3 text-slate-800 border border-slate-200 font-medium">
                      {row.apprenticeshipTrack}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ROADMAP NODE INSPECTION DRAWER / MODAL */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scaleIn max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${selectedNode.colorTheme.badge}`}>
                  {selectedNode.bdqfLevel} • {lang === 'ms' ? selectedNode.durationMs : selectedNode.durationEn}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {lang === 'ms' ? selectedNode.titleMs : selectedNode.titleEn}
                </h3>
                <p className="text-xs font-bold text-sky-800">
                  {lang === 'ms' ? selectedNode.institutionMs : selectedNode.institutionEn}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Details */}
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1">
                  {lang === 'ms' ? 'Gambaran Keseluruhan Laluan:' : 'Pathway Overview:'}
                </h4>
                <p className="leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                  {lang === 'ms' ? selectedNode.summaryMs : selectedNode.summaryEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-sky-50/60 p-3 rounded border border-sky-100 space-y-1">
                  <span className="font-bold text-sky-950 uppercase text-[11px] block">
                    📋 {lang === 'ms' ? 'Syarat Kemasukan Minimum:' : 'Min Entry Criteria:'}
                  </span>
                  <p>{lang === 'ms' ? selectedNode.entryRequirementMs : selectedNode.entryRequirementEn}</p>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded border border-emerald-100 space-y-1">
                  <span className="font-bold text-emerald-950 uppercase text-[11px] block">
                    🎯 {lang === 'ms' ? 'Kelayakan Dianugerahkan:' : 'Awarded Qualification:'}
                  </span>
                  <p>{lang === 'ms' ? selectedNode.qualificationMs : selectedNode.qualificationEn}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                  📚 {lang === 'ms' ? 'Bidang / Kursus Utama:' : 'Key Fields & Courses:'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ms' ? selectedNode.keyFieldsMs : selectedNode.keyFieldsEn).map((field, fIdx) => (
                    <span key={fIdx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-[11px] font-medium border border-slate-200">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                  🚀 {lang === 'ms' ? 'Laluan Seterusnya & Prospek Kerjaya:' : 'Next Progression & Career Outcomes:'}
                </h4>
                <div className="space-y-1 bg-amber-50/40 p-3 rounded border border-amber-200">
                  {(lang === 'ms' ? selectedNode.careerOutcomesMs : selectedNode.careerOutcomesEn).map((career, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-1.5 text-slate-800">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {(() => {
              const isNodeEligible = (() => {
                if (!selectedNode) return false;
                if (selectedNode.stageLevel === 'entry') return false;
                if (selectedNode.stageLevel === 'degree_university' || selectedNode.stageLevel === 'higher_diploma' || selectedNode.stageLevel === 'career_industry') {
                  return false;
                }
                const credits = creditSummary.totalCredits;
                if (selectedNode.id === 'track-sixthform') {
                  return credits >= 4;
                }
                if (selectedNode.id === 'track-polytechnic') {
                  return credits >= 5;
                }
                if (selectedNode.id === 'track-ibte-hntec') {
                  return credits >= 3;
                }
                if (selectedNode.id === 'track-ibte-ntec') {
                  return credits >= 1;
                }
                if (selectedNode.id === 'track-private-foundation') {
                  return credits >= 3;
                }
                if (selectedNode.id === 'track-private-diploma') {
                  return credits >= 4;
                }
                return credits >= (selectedNode.minCredits || 0);
              })();

              return (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  {updateState ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {!isNodeEligible && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                          <span>{lang === 'ms' ? 'Syarat kelayakan belum dicapai' : 'Requirements not met'}</span>
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!isNodeEligible}
                          onClick={() => {
                            if (!isNodeEligible) return;
                            const name = lang === 'ms' ? selectedNode.titleMs : selectedNode.titleEn;
                            updateState((prev) => ({
                              ...prev,
                              firstChoicePathway: name,
                              secondChoicePathway: prev.secondChoicePathway === name ? '' : prev.secondChoicePathway
                            }));
                            if (onSaveProgress) onSaveProgress();
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all flex items-center gap-1 ${
                            !isNodeEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : state.firstChoicePathway === (lang === 'ms' ? selectedNode.titleMs : selectedNode.titleEn)
                              ? 'bg-amber-400 text-sky-950 ring-2 ring-amber-300 cursor-pointer'
                              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 cursor-pointer'
                          }`}
                        >
                          ⭐ {lang === 'ms' ? 'Pilih Pilihan 1' : 'Select 1st Choice'}
                        </button>
                        <button
                          disabled={!isNodeEligible}
                          onClick={() => {
                            if (!isNodeEligible) return;
                            const name = lang === 'ms' ? selectedNode.titleMs : selectedNode.titleEn;
                            updateState((prev) => ({
                              ...prev,
                              secondChoicePathway: name,
                              firstChoicePathway: prev.firstChoicePathway === name ? '' : prev.firstChoicePathway
                            }));
                            if (onSaveProgress) onSaveProgress();
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all flex items-center gap-1 ${
                            !isNodeEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : state.secondChoicePathway === (lang === 'ms' ? selectedNode.titleMs : selectedNode.titleEn)
                              ? 'bg-sky-800 text-white ring-2 ring-sky-300 cursor-pointer'
                              : 'bg-sky-100 hover:bg-sky-200 text-sky-950 cursor-pointer'
                          }`}
                        >
                          🎯 {lang === 'ms' ? 'Pilih Pilihan 2' : 'Select 2nd Choice'}
                        </button>
                      </div>
                    </div>
                  ) : <div />}

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="px-4 py-2 rounded bg-slate-200 text-slate-800 font-bold text-xs uppercase hover:bg-slate-300 transition-all cursor-pointer"
                    >
                      {lang === 'ms' ? 'Tutup' : 'Close'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNode(null);
                        goToCalculator();
                      }}
                      className="px-4 py-2 rounded bg-sky-900 text-white hover:bg-sky-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'ms' ? 'Semak Dalam Kalkulator Gred' : 'Check in Grade Calculator'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* MODAL 2: PRIVATE PROGRAMME DEEP-DIVE MODAL */}
      {selectedProgrammeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scaleIn max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded border border-purple-200">
                  {selectedProgrammeModal.level} • {selectedProgrammeModal.awardingBody}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {lang === 'ms' && selectedProgrammeModal.nameMs ? selectedProgrammeModal.nameMs : selectedProgrammeModal.name}
                </h3>
                <p className="text-xs font-bold text-purple-800">
                  ⏱️ {lang === 'ms' ? selectedProgrammeModal.durationMs : selectedProgrammeModal.durationEn} • Pengambilan: {selectedProgrammeModal.intakeMonths}
                </p>
              </div>

              <button
                onClick={() => setSelectedProgrammeModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1">
                  {lang === 'ms' ? 'Keterangan Kursus:' : 'Course Overview:'}
                </h4>
                <p className="leading-relaxed bg-purple-50/40 p-3.5 rounded border border-purple-100">
                  {lang === 'ms' ? selectedProgrammeModal.overviewMs : selectedProgrammeModal.overviewEn}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">
                  📋 {lang === 'ms' ? 'Syarat Kemasukan Minimum:' : 'Minimum Entry Criteria:'}
                </span>
                <p className="font-medium text-slate-800">
                  {lang === 'ms' ? selectedProgrammeModal.minCreditNoteMs : selectedProgrammeModal.minCreditNoteEn}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                  📖 {lang === 'ms' ? 'Modul & Sukatan Pelajaran Utama:' : 'Key Syllabus & Modules:'}
                </h4>
                <div className="space-y-1">
                  {(lang === 'ms' ? selectedProgrammeModal.keyModulesMs : selectedProgrammeModal.keyModulesEn).map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {mIdx + 1}
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 uppercase text-[11px] tracking-wider block">
                  🎓 {lang === 'ms' ? 'Laluan Artikulasi Ijazah (Next Progression):' : 'Degree Articulation Route:'}
                </span>
                <p className="text-emerald-900 font-medium">
                  {lang === 'ms' ? selectedProgrammeModal.nextProgressionMs : selectedProgrammeModal.nextProgressionEn}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                  💼 {lang === 'ms' ? 'Peluang Kerjaya Graduan:' : 'Career Outcomes:'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ms' ? selectedProgrammeModal.careerOutcomesMs : selectedProgrammeModal.careerOutcomesEn).map((career, cIdx) => (
                    <span key={cIdx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-[11px] font-semibold border border-slate-200">
                      ✓ {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            {(() => {
              const isProgEligible = creditSummary.totalCredits >= (selectedProgrammeModal.minCredits || 0);

              return (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  {updateState ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {!isProgEligible && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                          <span>{lang === 'ms' ? 'Syarat kelayakan belum dicapai' : 'Requirements not met'}</span>
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!isProgEligible}
                          onClick={() => {
                            if (!isProgEligible) return;
                            const progName = `${selectedProgrammeModal.institutionName} - ${lang === 'ms' && selectedProgrammeModal.nameMs ? selectedProgrammeModal.nameMs : selectedProgrammeModal.name}`;
                            updateState((prev) => ({
                              ...prev,
                              firstChoicePathway: progName,
                              secondChoicePathway: prev.secondChoicePathway === progName ? '' : prev.secondChoicePathway
                            }));
                            if (onSaveProgress) onSaveProgress();
                          }}
                          className={`px-3 py-1.5 rounded font-bold text-xs uppercase transition-all flex items-center gap-1 ${
                            !isProgEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : 'bg-amber-400 hover:bg-amber-500 text-sky-950 cursor-pointer'
                          }`}
                        >
                          ⭐ {lang === 'ms' ? 'Pilih Pilihan 1' : 'Select 1st Choice'}
                        </button>
                        <button
                          disabled={!isProgEligible}
                          onClick={() => {
                            if (!isProgEligible) return;
                            const progName = `${selectedProgrammeModal.institutionName} - ${lang === 'ms' && selectedProgrammeModal.nameMs ? selectedProgrammeModal.nameMs : selectedProgrammeModal.name}`;
                            updateState((prev) => ({
                              ...prev,
                              secondChoicePathway: progName,
                              firstChoicePathway: prev.firstChoicePathway === progName ? '' : prev.firstChoicePathway
                            }));
                            if (onSaveProgress) onSaveProgress();
                          }}
                          className={`px-3 py-1.5 rounded font-bold text-xs uppercase transition-all flex items-center gap-1 ${
                            !isProgEligible
                              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300'
                              : 'bg-purple-900 hover:bg-purple-950 text-white cursor-pointer'
                          }`}
                        >
                          🎯 {lang === 'ms' ? 'Pilih Pilihan 2' : 'Select 2nd Choice'}
                        </button>
                      </div>
                    </div>
                  ) : <div />}

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setSelectedProgrammeModal(null)}
                      className="px-5 py-2 rounded bg-slate-200 text-slate-800 font-bold text-xs uppercase hover:bg-slate-300 transition-all cursor-pointer"
                    >
                      {lang === 'ms' ? 'Tutup Maklumat' : 'Close Details'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
