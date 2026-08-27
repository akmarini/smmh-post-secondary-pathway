import React, { useState } from 'react';
import { 
  Shield, 
  Plane, 
  Anchor, 
  HeartPulse, 
  Award, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  Check, 
  Info,
  DollarSign,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SmmhHalaTujuState } from '../types';
import { CAREER_OPPORTUNITIES, CareerOpportunity } from '../data/careerChoicesData';
import { useLanguage } from '../context/LanguageContext';
import { calculateCredits, isCreditGrade } from '../data/pathwayRules';

interface CareerChoicesDashboardProps {
  state: SmmhHalaTujuState;
  updateState: React.Dispatch<React.SetStateAction<SmmhHalaTujuState>>;
  onSaveProgress: () => void;
  goToPassport: () => void;
}

export const CareerChoicesDashboard: React.FC<CareerChoicesDashboardProps> = ({
  state,
  updateState,
  onSaveProgress,
  goToPassport
}) => {
  const { lang, t } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedEntryType, setSelectedEntryType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCareer, setSelectedCareer] = useState<CareerOpportunity | null>(null);

  const creditSummary = calculateCredits(state?.subjectGrades || []);
  const totalCredits = creditSummary.totalCredits;
  const bmGrade = state?.subjectGrades?.find((s) => s.id === 'sub-bm' || s.id === 'bm')?.grade || '';
  const engGrade = state?.subjectGrades?.find((s) => s.id === 'sub-eng' || s.id === 'english')?.grade || '';
  const mathGrade = state?.subjectGrades?.find((s) => s.id === 'sub-math' || s.id === 'math_d')?.grade || '';

  const hasBmCredit = isCreditGrade(bmGrade);
  const hasEngCredit = isCreditGrade(engGrade);
  const hasMathCredit = isCreditGrade(mathGrade);

  // Check student eligibility for a specific career
  const checkCareerEligibility = (career: CareerOpportunity) => {
    if (totalCredits < career.minCredits) {
      return {
        eligible: false,
        reasonMs: `Memerlukan minimum ${career.minCredits} kredit O-Level (Anda kini mempunyai ${totalCredits} kredit).`,
        reasonEn: `Requires minimum ${career.minCredits} O-Level credits (You currently have ${totalCredits} credits).`
      };
    }

    if (career.id === 'rb-cadet-pilot') {
      if (!hasEngCredit || !hasMathCredit) {
        return {
          eligible: false,
          reasonMs: 'Memerlukan kredit asas dalam English (1123) dan Mathematics D (4024) untuk melayakkan ke Tingkatan 6 (A-Level Maths/Physics).',
          reasonEn: 'Requires prerequisite credit passes in English (1123) and Mathematics D (4024) to enter Sixth Form (A-Level Maths/Physics).'
        };
      }
      return {
        eligible: true,
        reasonMs: 'Layak Asas O-Level! Langkah seterusnya: Ambil A-Level (Maths & Physics) di PTET / Diploma sebelum memohon skim kadet pada umur 18+.',
        reasonEn: 'O-Level Prerequisite Met! Next Step: Pursue A-Levels (Maths & Physics) at PTET / Diploma before applying for cadet intake at age 18+.'
      };
    }

    if (career.id === 'rbaf-perajurit-muda' || career.id === 'rbpf-konstabel') {
      if (!hasBmCredit) {
        return {
          eligible: false,
          reasonMs: 'Wajib mempunyai kredit dalam Bahasa Melayu (1201).',
          reasonEn: 'Mandatory credit pass in Bahasa Melayu (1201).'
        };
      }
    }

    if (career.id === 'rb-cabin-crew') {
      if (!hasEngCredit || !hasBmCredit) {
        return {
          eligible: false,
          reasonMs: 'Wajib mempunyai kredit dalam Bahasa Melayu dan English Language.',
          reasonEn: 'Mandatory credit pass in Bahasa Melayu and English Language.'
        };
      }
    }

    return {
      eligible: true,
      reasonMs: `Gred anda memenuhi syarat akademik minimum (${career.minCredits} kredit).`,
      reasonEn: `Your grades meet the minimum academic criteria (${career.minCredits} credits).`
    };
  };

  // Filter careers
  const filteredCareers = CAREER_OPPORTUNITIES.filter((career) => {
    if (selectedSector !== 'all' && career.sector !== selectedSector) return false;
    if (selectedEntryType !== 'all' && career.entryType !== selectedEntryType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = career.titleMs.toLowerCase().includes(q) || career.titleEn.toLowerCase().includes(q);
      const matchOrg = career.organizationMs.toLowerCase().includes(q) || career.organizationEn.toLowerCase().includes(q);
      const matchDesc = career.descriptionMs.toLowerCase().includes(q) || career.descriptionEn.toLowerCase().includes(q);
      if (!matchTitle && !matchOrg && !matchDesc) return false;
    }
    return true;
  });

  const handleSelectAsAspiration = (career: CareerOpportunity) => {
    const careerTitle = lang === 'ms' ? career.titleMs : career.titleEn;
    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        targetAspirations: careerTitle
      }
    }));
    onSaveProgress();
  };

  const isSelectedInPassport = (career: CareerOpportunity) => {
    const careerTitleMs = career.titleMs.toLowerCase();
    const careerTitleEn = career.titleEn.toLowerCase();
    const currentAsp = (state?.profile?.targetAspirations || '').toLowerCase();
    return currentAsp.includes(careerTitleMs) || currentAsp.includes(careerTitleEn) || currentAsp.includes(career.organizationMs.toLowerCase());
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'defense':
        return <Shield className="w-4 h-4 text-sky-600" />;
      case 'aviation':
        return <Plane className="w-4 h-4 text-amber-500" />;
      case 'maritime_energy':
        return <Anchor className="w-4 h-4 text-sky-800" />;
      case 'public_health':
        return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      default:
        return <Award className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner - Sky Blue Theme */}
      <div className="bg-white border-2 border-sky-600 rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-sm border border-sky-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'ms' ? 'Peluang Pasukan Beruniform & Industri Kebangsaan' : 'Uniformed Services & National Industry Pathways'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
              {t.careersHeaderTitle}
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {t.careersHeaderDesc}
            </p>
          </div>

          {/* Quick Grade Reference Box */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 shrink-0 min-w-[240px]">
            <p className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1">
              {lang === 'ms' ? 'Status Kelayakan Semasa Anda:' : 'Your Current Eligibility Status:'}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-sky-700">{totalCredits}</span>
              <span className="text-xs font-bold text-slate-600">{t.creditsSuffix}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[10px]">
              <span className={`px-1.5 py-0.5 rounded font-bold ${hasBmCredit ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                BM: {bmGrade || '-'}
              </span>
              <span className={`px-1.5 py-0.5 rounded font-bold ${hasEngCredit ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                ENG: {engGrade || '-'}
              </span>
              <span className={`px-1.5 py-0.5 rounded font-bold ${hasMathCredit ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                MATH: {mathGrade || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Organization Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-sky-100">
          <div className="flex items-center gap-2.5 p-2.5 bg-sky-50/70 rounded border border-sky-200/70">
            <div className="w-8 h-8 rounded bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ABDB
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-sky-950 truncate">Angkatan Bersenjata</p>
              <p className="text-[10px] text-slate-500">RBAF Penanjong</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-amber-50/70 rounded border border-amber-200/70">
            <div className="w-8 h-8 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              RB
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-sky-950 truncate">Royal Brunei Airlines</p>
              <p className="text-[10px] text-slate-500">Pilot, Cabin, MRO</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-sky-50/70 rounded border border-sky-200/70">
            <div className="w-8 h-8 rounded bg-sky-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
              PPDB
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-sky-950 truncate">Polis Diraja Brunei</p>
              <p className="text-[10px] text-slate-500">RBPF Gadong</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-sky-50/70 rounded border border-sky-200/70">
            <div className="w-8 h-8 rounded bg-sky-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              BGC
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-sky-950 truncate">Brunei Gas Carriers</p>
              <p className="text-[10px] text-slate-500">LNG Maritime Cadet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCareersPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Entry Type Selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-sky-600 shrink-0" />
            <select
              value={selectedEntryType}
              onChange={(e) => setSelectedEntryType(e.target.value)}
              className="text-xs font-bold bg-sky-50 border border-sky-300 text-sky-900 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">{lang === 'ms' ? 'Semua Tahap Masuk' : 'All Entry Levels'}</option>
              <option value="direct_o_level">{t.careersFilterDirect}</option>
              <option value="o_level_training">{t.careersFilterTraining}</option>
              <option value="cadetship">{t.careersFilterCadetship}</option>
            </select>
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedSector('all')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors border ${
              selectedSector === 'all'
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {t.careersFilterAll} ({CAREER_OPPORTUNITIES.length})
          </button>
          <button
            onClick={() => setSelectedSector('defense')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
              selectedSector === 'defense'
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{t.careersFilterDefense}</span>
          </button>
          <button
            onClick={() => setSelectedSector('aviation')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
              selectedSector === 'aviation'
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>{t.careersFilterAviation}</span>
          </button>
          <button
            onClick={() => setSelectedSector('maritime_energy')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
              selectedSector === 'maritime_energy'
                ? 'bg-sky-800 text-white border-sky-800 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>{t.careersFilterMaritimeEnergy}</span>
          </button>
          <button
            onClick={() => setSelectedSector('public_health')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
              selectedSector === 'public_health'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>{t.careersFilterPublicHealth}</span>
          </button>
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCareers.map((career) => {
          const title = lang === 'ms' ? career.titleMs : career.titleEn;
          const org = lang === 'ms' ? career.organizationMs : career.organizationEn;
          const desc = lang === 'ms' ? career.descriptionMs : career.descriptionEn;
          const entryLabel = lang === 'ms' ? career.entryTypeLabelMs : career.entryTypeLabelEn;
          const duration = lang === 'ms' ? career.trainingDurationMs : career.trainingDurationEn;
          const location = lang === 'ms' ? career.trainingLocationMs : career.trainingLocationEn;
          const salary = lang === 'ms' ? career.allowanceAndSalaryMs : career.allowanceAndSalaryEn;
          const wawasan = lang === 'ms' ? career.wawasanAlignmentMs : career.wawasanAlignmentEn;
          const portalName = lang === 'ms' ? career.portalNameMs : career.portalNameEn;

          const eligibility = checkCareerEligibility(career);
          const isSelected = isSelectedInPassport(career);

          return (
            <div
              key={career.id}
              id={`career-card-${career.id}`}
              className={`bg-white rounded-lg border-2 transition-all shadow-sm flex flex-col justify-between overflow-hidden ${
                isSelected 
                  ? 'border-amber-500 ring-2 ring-amber-400/30' 
                  : eligibility.eligible 
                    ? 'border-sky-300 hover:border-sky-500' 
                    : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Card Top Banner */}
              <div className="p-5 pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-sky-50 rounded-md border border-sky-200">
                      {getSectorIcon(career.sector)}
                    </span>
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                      {org}
                    </span>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    career.entryType === 'cadetship'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : career.entryType === 'direct_o_level'
                        ? 'bg-sky-100 text-sky-900 border border-sky-300'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                  }`}>
                    {entryLabel}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {desc}
                </p>

                {/* Eligibility Pill */}
                <div className="mt-3">
                  {eligibility.eligible ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded border border-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.gradeMatchEligible}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded border border-amber-300">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lang === 'ms' ? eligibility.reasonMs : eligibility.reasonEn}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Specs Section */}
              <div className="p-5 space-y-3 bg-slate-50/60 text-xs text-slate-700 flex-1">
                {/* Requirements */}
                <div className="space-y-1">
                  <p className="font-bold text-sky-950 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    {t.careerRequirementsLabel}
                  </p>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600">
                    {(lang === 'ms' ? career.coreRequirementsMs : career.coreRequirementsEn).slice(0, 2).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Training & Location */}
                <div className="space-y-1 pt-1 border-t border-slate-200">
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span><strong>{lang === 'ms' ? 'Latihan:' : 'Training:'}</strong> {duration}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span><strong>{lang === 'ms' ? 'Lokasi:' : 'Location:'}</strong> {location}</span>
                  </div>
                </div>

                {/* Allowance / Salary */}
                <div className="p-2.5 bg-sky-50 rounded border border-sky-200 text-sky-950 text-[11px] font-medium leading-relaxed">
                  <strong>{lang === 'ms' ? '💰 Elaun & Gaji:' : '💰 Allowance & Salary:'}</strong> {salary}
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={() => setSelectedCareer(career)}
                  className="px-3 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded border border-sky-300 transition-colors flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{t.viewDetailsBtn}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={career.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-sky-700 rounded hover:bg-slate-100 transition-colors"
                    title={portalName}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    id={`select-career-btn-${career.id}`}
                    onClick={() => handleSelectAsAspiration(career)}
                    className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
                      isSelected
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.addedToPassportBadge}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{lang === 'ms' ? 'Pilih Kerjaya' : 'Select Career'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'ms' ? 'Tiada Peluang Kerjaya Dijumpai' : 'No Career Opportunities Found'}
          </h3>
          <p className="text-xs text-slate-500">
            {lang === 'ms' ? 'Sila ubah kata kunci carian atau tetapan penapis sektor di atas.' : 'Please adjust your search keywords or sector filters above.'}
          </p>
          <button
            onClick={() => {
              setSelectedSector('all');
              setSelectedEntryType('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-md hover:bg-sky-700 uppercase"
          >
            {lang === 'ms' ? 'Set Semula Penapis' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Bottom CTA to Passport */}
      <div className="p-6 bg-gradient-to-r from-sky-900 to-sky-800 rounded-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>{lang === 'ms' ? 'Jana Pasport Kerjaya Pelajar SMMH' : 'Generate SMMH Student Career Passport'}</span>
          </h3>
          <p className="text-xs text-sky-200 mt-1 max-w-xl">
            {lang === 'ms'
              ? 'Pilihan kerjaya yang anda tetapkan akan dimasukkan secara automatik ke dalam Pasport Hala Tuju PDF untuk perbincangan bersama Guru Kaunselor dan ibu bapa.'
              : 'Your chosen career aspiration will automatically be embedded into your Pathway Passport PDF for counseling reviews with parents and teachers.'}
          </p>
        </div>

        <button
          onClick={goToPassport}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-sky-950 font-black text-xs uppercase tracking-wider rounded-md transition-all shrink-0 flex items-center gap-2 shadow"
        >
          <span>{t.nextToPassportBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Career Details Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-sky-600 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-sky-900 text-white px-6 py-4 flex items-center justify-between border-b border-sky-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-amber-400 text-sky-950 flex items-center justify-center font-bold text-xs">
                  {selectedCareer.sector === 'aviation' ? '✈️' : selectedCareer.sector === 'defense' ? '🛡️' : '⚓'}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight text-white">
                    {lang === 'ms' ? selectedCareer.titleMs : selectedCareer.titleEn}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {lang === 'ms' ? selectedCareer.organizationMs : selectedCareer.organizationEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCareer(null)}
                className="text-sky-200 hover:text-white p-1 rounded hover:bg-sky-800 transition-colors"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-800">
              {/* Full Description */}
              <div className="p-3.5 bg-sky-50 rounded-md border border-sky-200 text-slate-700 leading-relaxed">
                {lang === 'ms' ? selectedCareer.descriptionMs : selectedCareer.descriptionEn}
              </div>

              {/* Core Academic Requirements */}
              <div className="space-y-2">
                <h4 className="font-bold text-sky-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  {t.careerRequirementsLabel}
                </h4>
                <ul className="space-y-1 pl-5 list-disc text-slate-700">
                  {(lang === 'ms' ? selectedCareer.coreRequirementsMs : selectedCareer.coreRequirementsEn).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Physical & Fitness Requirements */}
              {selectedCareer.physicalRequirementsMs && (
                <div className="space-y-2">
                  <h4 className="font-bold text-sky-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-500" />
                    {t.careerPhysicalLabel}
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-slate-700">
                    {(lang === 'ms' ? selectedCareer.physicalRequirementsMs : selectedCareer.physicalRequirementsEn || []).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Training Duration & Location */}
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  {t.careerTrainingLabel}
                </h4>
                <p><strong>{lang === 'ms' ? 'Tempoh:' : 'Duration:'}</strong> {lang === 'ms' ? selectedCareer.trainingDurationMs : selectedCareer.trainingDurationEn}</p>
                <p><strong>{lang === 'ms' ? 'Lokasi Latihan:' : 'Location:'}</strong> {lang === 'ms' ? selectedCareer.trainingLocationMs : selectedCareer.trainingLocationEn}</p>
              </div>

              {/* Allowances & Salary Scale */}
              <div className="p-3.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 space-y-1">
                <h4 className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  {t.careerSalaryLabel}
                </h4>
                <p className="leading-relaxed">
                  {lang === 'ms' ? selectedCareer.allowanceAndSalaryMs : selectedCareer.allowanceAndSalaryEn}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2">
                <h4 className="font-bold text-sky-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-600" />
                  {t.careerBenefitsLabel}
                </h4>
                <ul className="space-y-1 pl-5 list-disc text-slate-700">
                  {(lang === 'ms' ? selectedCareer.keyBenefitsMs : selectedCareer.keyBenefitsEn).map((ben, i) => (
                    <li key={i}>{ben}</li>
                  ))}
                </ul>
              </div>

              {/* Career Ladder */}
              <div className="space-y-2">
                <h4 className="font-bold text-sky-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-amber-500" />
                  {t.careerLadderLabel}
                </h4>
                <div className="space-y-1.5 pl-2">
                  {(lang === 'ms' ? selectedCareer.careerProgressionMs : selectedCareer.careerProgressionEn).map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wawasan 2035 Goal */}
              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-950 text-xs">
                <strong>{t.wawasanGoalLabel}</strong> {lang === 'ms' ? selectedCareer.wawasanAlignmentMs : selectedCareer.wawasanAlignmentEn}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedCareer(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded uppercase"
              >
                {t.closeDetailsBtn}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCareer.officialPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                  <span>{t.applyOfficialPortalBtn}</span>
                </a>

                <button
                  onClick={() => {
                    handleSelectAsAspiration(selectedCareer);
                    setSelectedCareer(null);
                  }}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.addToPassportBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
