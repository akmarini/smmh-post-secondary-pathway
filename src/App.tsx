import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { CareerChoicesDashboard } from './components/CareerChoicesDashboard';
import { RiasecQuiz } from './components/RiasecQuiz';
import { GradeCalculator } from './components/GradeCalculator';
import { VisualPathwaysView } from './components/VisualPathwaysView';
import { PassportView } from './components/PassportView';
import { ParentsHub } from './components/ParentsHub';
import { CounselorPortalModal } from './components/CounselorPortalModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { SmmhtLogo } from './components/SmmhtLogo';
import { SmmhHalaTujuState } from './types';
import { INITIAL_STATE, loadStateFromLocal, saveStateToLocal } from './utils/storage';
import { useLanguage } from './context/LanguageContext';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

export default function App() {
  const { lang, t } = useLanguage();
  const [state, setState] = useState<SmmhHalaTujuState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<NavTab>('calculator');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Restore progress on first load
  useEffect(() => {
    const { state: restoredState, restored } = loadStateFromLocal();
    if (restored) {
      setState(restoredState);
      addToast(
        'success',
        lang === 'ms' ? 'Kemajuan Anda Telah Dipulihkan' : 'Your progress has been restored',
        lang === 'ms' 
          ? 'Semua jawapan kuiz RIASEC, gred O-Level, dan tetapan profil anda sedia digunakan.'
          : 'All your RIASEC quiz answers, O-Level grades, and profile settings are ready.'
      );
    }
  }, []);

  const handleManualSave = () => {
    setIsSaving(true);
    setState((prev) => {
      const updated = saveStateToLocal(prev);
      return updated;
    });
    setTimeout(() => {
      setIsSaving(false);
      addToast(
        'success',
        t.saveSuccessTitle,
        t.saveSuccessMsg
      );
    }, 300);
  };

  // Auto-save whenever state changes to keep localStorage and Passport in sync
  useEffect(() => {
    if (state.profile.studentName || state.riasecCode !== '---') {
      saveStateToLocal(state);
    }
  }, [state]);

  const handleSelectCareerChoice = (careerTitle: string) => {
    setState((prev) => ({
      ...prev,
      careerGoals: prev.careerGoals.includes(careerTitle)
        ? prev.careerGoals
        : [...prev.careerGoals.slice(0, 2), careerTitle]
    }));
    addToast(
      'success',
      lang === 'ms' ? 'Pilihan Kerjaya Ditambah' : 'Career Choice Added',
      lang === 'ms'
        ? `"${careerTitle}" telah ditambah ke dalam Matlamat Kerjaya Passport anda.`
        : `"${careerTitle}" has been added to your Passport career aspirations.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/70 via-slate-50 to-amber-50/20 text-slate-800 flex flex-col font-sans selection:bg-yellow-300 selection:text-sky-950">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Main Top Navigation & Dashboard Guidance Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        state={state}
        onSaveProgress={handleManualSave}
        isSaving={isSaving}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-6 pb-16">
        {activeTab === 'calculator' && (
          <GradeCalculator
            state={state}
            updateState={setState}
            onSaveProgress={handleManualSave}
            goToPassport={() => setActiveTab('passport')}
            goToQuiz={() => setActiveTab('riasec')}
          />
        )}

        {activeTab === 'visualPathway' && (
          <VisualPathwaysView
            state={state}
            updateState={setState}
            onSaveProgress={handleManualSave}
            goToCalculator={() => setActiveTab('calculator')}
            goToPassport={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'riasec' && (
          <RiasecQuiz
            state={state}
            updateState={setState}
            onSaveProgress={handleManualSave}
            goToPassport={() => setActiveTab('passport')}
            goToCalculator={() => setActiveTab('calculator')}
          />
        )}

        {activeTab === 'careers' && (
          <CareerChoicesDashboard
            state={state}
            updateState={setState}
            onSaveProgress={handleManualSave}
            goToPassport={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'passport' && (
          <PassportView
            state={state}
            updateState={setState}
            onSaveProgress={handleManualSave}
          />
        )}

        {activeTab === 'parentshub' && <ParentsHub />}
      </main>

      {/* Counselor Portal Access Modal */}
      <CounselorPortalModal
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
      />

      {/* Application Footer - Modern Aesthetic Lighter Blue & Yellow */}
      <footer className="bg-gradient-to-b from-sky-800 to-sky-950 text-white border-t-4 border-yellow-400 mt-auto print:hidden print-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* School Info */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <SmmhtLogo size="md" className="shrink-0 drop-shadow" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide text-white uppercase">
                    {t.schoolNameHeader}
                  </h3>
                  <p className="text-xs text-yellow-300 font-bold">
                    {t.schoolUnit}
                  </p>
                </div>
              </div>
              <p className="text-xs text-sky-100 leading-relaxed max-w-md">
                {t.schoolMotto}
              </p>
              <div className="flex items-center gap-4 text-xs text-sky-200 pt-1">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  Daerah Tutong, TA1141
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  +673 4221272
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-yellow-300 uppercase tracking-wider">
                {t.guidancePagesTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-sky-100">
                <li>
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {t.calcTab}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('visualPathway')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {lang === 'ms' ? 'Peta Visual & Swasta' : 'Visual Pathways & Colleges'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('riasec')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {t.riasecTab}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('careers')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {t.careersTab}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('passport')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {t.passportTab}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('parentshub')}
                    className="hover:text-yellow-300 transition-colors text-left cursor-pointer"
                  >
                    • {t.parentsTab}
                  </button>
                </li>
              </ul>
            </div>

            {/* Portal Rasmi & Discrete Counselor Link */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-yellow-300 uppercase tracking-wider">
                {t.bruneiPortalsTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-sky-100">
                <li>
                  <a
                    href="https://hecas.moe.gov.bn"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow-300 flex items-center gap-1"
                  >
                    <span>• {t.portalHecas}</span>
                    <ExternalLink className="w-3 h-3 text-sky-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pb.edu.bn"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow-300 flex items-center gap-1"
                  >
                    <span>• {t.portalPb}</span>
                    <ExternalLink className="w-3 h-3 text-sky-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ibte.edu.bn"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow-300 flex items-center gap-1"
                  >
                    <span>• {t.portalIbte}</span>
                    <ExternalLink className="w-3 h-3 text-sky-300" />
                  </a>
                </li>
              </ul>

              {/* Discrete Counselor Portal Button */}
              <div className="pt-2">
                <button
                  id="footer-counselor-portal-link"
                  onClick={() => setIsCounselorModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-900/90 text-sky-100 hover:text-yellow-300 hover:bg-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-700 hover:border-yellow-400 transition-all cursor-pointer shadow-xs"
                  title={lang === 'ms' ? 'Akses khas Guru Kaunselor SMMH untuk eksport fail CSV / Excel' : 'SMMH Counselor access for student analytics & CSV export'}
                >
                  <Lock className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{t.counselorPortal}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation Notice */}
          <div className="mt-8 pt-4 border-t border-sky-700/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sky-200 gap-2 uppercase tracking-tight">
            <div>
              © 2026 {t.schoolNameHeader}.
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-sky-200">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              {t.accreditationNote}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
