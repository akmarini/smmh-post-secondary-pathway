import React, { useState } from 'react';
import { 
  Users, 
  Bus, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  ShieldCheck
} from 'lucide-react';
import { 
  TUTONG_BUS_ROUTES_DATA, 
  BDQF_LEVELS_DATA, 
  PARENTS_FAQS 
} from '../data/parentsHubData';
import { useLanguage } from '../context/LanguageContext';

export const ParentsHub: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'pengangkutan' | 'akademik' | 'hecas'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = PARENTS_FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const qText = lang === 'en' && faq.questionEn ? faq.questionEn : faq.questionMs;
    const aText = lang === 'en' && faq.answerEn ? faq.answerEn : faq.answerMs;
    const matchesSearch = searchQuery.trim() === '' || 
      qText.toLowerCase().includes(searchQuery.toLowerCase()) || 
      aText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.questionMs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-2xl p-6 sm:p-8 text-white border border-sky-400/40 shadow-sm relative overflow-hidden">
        {/* Ambient sunshine glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-yellow-300/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-800/80 text-yellow-300 text-xs font-black uppercase tracking-wider border border-sky-400/50 shadow-xs">
            <Users className="w-3.5 h-3.5 text-yellow-300" />
            {t.parentsBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {t.parentsHeaderTitle}
          </h2>
          <p className="text-sky-100 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            {t.parentsHeaderDesc}
          </p>
        </div>
      </div>

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="#section-bas"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-md transition-all group flex items-start gap-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-yellow-300 flex items-center justify-center font-bold shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Bus className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-black text-sky-900 text-sm uppercase tracking-wide group-hover:text-sky-600 transition-colors">
              {t.parentsNavBusTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.parentsNavBusDesc}
            </p>
          </div>
        </a>

        <a
          href="#section-mkpk"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-md transition-all group flex items-start gap-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-yellow-300 flex items-center justify-center font-bold shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-black text-sky-900 text-sm uppercase tracking-wide group-hover:text-sky-600 transition-colors">
              {t.parentsNavBdqfTitle}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.parentsNavBdqfDesc}
            </p>
          </div>
        </a>
      </div>

      {/* SECTION 1: LALUAN BAS & PENGANGKUTAN SEKOLAH DAERAH TUTONG */}
      <div id="section-bas" className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-yellow-300 flex items-center justify-center shadow-xs">
            <Bus className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-sky-900 uppercase tracking-wide">
              {t.sectionBusTitle}
            </h3>
            <p className="text-xs text-slate-600">
              {t.sectionBusDesc}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {TUTONG_BUS_ROUTES_DATA.map((route, idx) => {
            const routeName = lang === 'en' && route.routeNameEn ? route.routeNameEn : route.routeNameMs;
            const notes = lang === 'en' && route.notesEn ? route.notesEn : route.notesMs;

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-lg border border-slate-200 bg-white hover:border-sky-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-sky-700 text-yellow-300 rounded-md">
                      {route.routeNumber}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      ⏰ {t.departureTimeLabel}: {route.departureTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-sky-900 text-sm">
                    {routeName}
                  </h4>

                  <div className="text-xs text-slate-700 flex flex-wrap gap-1 items-center">
                    <strong className="text-sky-900 uppercase text-[10px] tracking-wider">{t.coverageAreasLabel}:</strong>
                    {route.coverageAreas.map((area, i) => (
                      <span key={i} className="bg-sky-50 text-sky-900 px-2 py-0.2 rounded border border-sky-200 text-[11px]">
                        {area}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    ℹ️ {notes}
                  </p>
                </div>

                <div className="shrink-0 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider block">{t.keyDestinationsLabel}:</span>
                  <span className="font-bold text-sky-900">{route.destinations.join(', ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: AKREDITASI & RANGKA KERJA BDQF / MKPK */}
      <div id="section-mkpk" className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-yellow-300 flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-sky-900 uppercase tracking-wide">
              {t.sectionBdqfTitle}
            </h3>
            <p className="text-xs text-slate-600">
              {t.sectionBdqfDesc}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {BDQF_LEVELS_DATA.map((bdqf) => {
            const title = lang === 'en' && bdqf.qualificationTitleEn ? bdqf.qualificationTitleEn : bdqf.qualificationTitle;
            const instType = lang === 'en' && bdqf.institutionTypeEn ? bdqf.institutionTypeEn : bdqf.institutionType;
            const oReq = lang === 'en' && bdqf.oLevelRequirementEn ? bdqf.oLevelRequirementEn : bdqf.oLevelRequirement;
            const empPath = lang === 'en' && bdqf.employmentPathwayEn ? bdqf.employmentPathwayEn : bdqf.employmentPathway;

            return (
              <div
                key={bdqf.level}
                className="p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-sky-800 text-amber-300 font-black text-sm flex flex-col items-center justify-center font-mono shrink-0 shadow-sm border border-sky-700">
                    <span className="text-[8px] uppercase tracking-tighter text-sky-200">BDQF</span>
                    <span>T{bdqf.level}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-sky-900 text-sm uppercase">
                      {title}
                    </h4>
                    <div className="text-xs text-slate-700">
                      <strong>{lang === 'ms' ? 'Institusi' : 'Institutions'}:</strong> {instType}
                    </div>
                    <div className="text-xs text-slate-600">
                      <strong>{lang === 'ms' ? 'Syarat Kelayakan' : 'Entry Benchmark'}:</strong> {oReq}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 md:max-w-xs text-xs">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider block mb-0.5">{t.careerProspectLabel}:</span>
                  <span className="text-slate-800 font-medium">{empPath}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: SOALAN LAZIM IBU BAPA (FAQ) */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-yellow-300 flex items-center justify-center shadow-xs font-bold">
              <HelpCircle className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-sky-900 uppercase tracking-wide">
                {t.sectionFaqTitle}
              </h3>
              <p className="text-xs text-slate-600">
                {t.sectionFaqDesc}
              </p>
            </div>
          </div>

          {/* Search box for FAQ */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder={t.searchFaqPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', labelMs: 'Semua Soalan', labelEn: 'All Questions' },
            { id: 'akademik', labelMs: 'Akademik & A-Level', labelEn: 'Academic & A-Levels' },
            { id: 'pengangkutan', labelMs: 'Bas & Pengangkutan', labelEn: 'Bus & Transport' },
            { id: 'hecas', labelMs: 'HECAS & Pendaftaran', labelEn: 'HECAS & Admissions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-yellow-400 text-sky-950 font-black border-yellow-500 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              {lang === 'en' ? tab.labelEn : tab.labelMs}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-2.5">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            const q = lang === 'en' && faq.questionEn ? faq.questionEn : faq.questionMs;
            const a = lang === 'en' && faq.answerEn ? faq.answerEn : faq.answerMs;

            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-lg overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 text-left bg-slate-50 hover:bg-sky-50/50 transition-colors flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-sky-950 text-xs sm:text-sm leading-snug">
                    {q}
                  </span>
                  <div className="p-1 rounded bg-white border border-slate-200 text-slate-600 shrink-0">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <p>{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Counseling Department */}
        <div className="bg-sky-800 text-white rounded-lg p-5 border border-sky-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">
              {t.needCounselingHelpTitle}
            </h4>
            <p className="text-xs text-sky-100">
              {t.needCounselingHelpDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-sky-950 px-3 py-1.5 rounded border border-sky-600 text-amber-300 shrink-0">
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.smmhHotline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
