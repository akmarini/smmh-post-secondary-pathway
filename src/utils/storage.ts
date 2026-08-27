import { SmmhHalaTujuState, CohortStudentLog } from '../types';
import { DEFAULT_SUBJECTS } from '../data/pathwayRules';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const STORAGE_KEY = 'smmh_hala_tuju_progress_2026';

export const INITIAL_STATE: SmmhHalaTujuState = {
  profile: {
    studentName: '',
    icNumber: '',
    studentClass: '5 Science 1',
    contactNumber: '',
    parentName: '',
    parentContact: '',
    targetAspirations: ''
  },
  riasecAnswers: {},
  riasecCode: '---',
  dominantTraits: [],
  subjectGrades: DEFAULT_SUBJECTS,
  firstChoicePathway: '',
  secondChoicePathway: '',
  checklist: {
    counselorSessionDone: false,
    specialPrereqChecked: false,
    parentDiscussed: false,
    documentsCertified: false,
    hecasAccountCreated: false
  },
  lastSavedAt: null,
  passportCompleted: false
};

export function saveStateToLocal(state: SmmhHalaTujuState): SmmhHalaTujuState {
  const updatedState: SmmhHalaTujuState = {
    ...state,
    lastSavedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    
    // Asynchronously try to sync to backend cohort registry if student name is entered
    if (state.profile.studentName.trim().length > 0) {
      syncCohortRecordToBackend(updatedState);
    }
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
  return updatedState;
}

export function loadStateFromLocal(): { state: SmmhHalaTujuState; restored: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SmmhHalaTujuState>;
      return {
        state: {
          ...INITIAL_STATE,
          ...parsed,
          profile: { ...INITIAL_STATE.profile, ...(parsed.profile || {}) },
          checklist: { ...INITIAL_STATE.checklist, ...(parsed.checklist || {}) },
          riasecAnswers: parsed.riasecAnswers || {},
          dominantTraits: Array.isArray(parsed.dominantTraits) ? parsed.dominantTraits : [],
          subjectGrades: Array.isArray(parsed.subjectGrades) && parsed.subjectGrades.length > 0 ? parsed.subjectGrades : DEFAULT_SUBJECTS
        },
        restored: true
      };
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return { state: INITIAL_STATE, restored: false };
}

export async function syncCohortRecordToBackend(state: SmmhHalaTujuState) {
  try {
    const subjectGrades = state?.subjectGrades || [];
    const bm = subjectGrades.find((s) => s.subjectName.toLowerCase().includes('bahasa melayu') || s.subjectName.toLowerCase().includes('bm'))?.grade || '-';
    const eng = subjectGrades.find((s) => s.subjectName.toLowerCase().includes('english') || s.subjectName.toLowerCase().includes('inggeris'))?.grade || '-';
    const math = subjectGrades.find((s) => s.subjectName.toLowerCase().includes('mathematics') || s.subjectName.toLowerCase().includes('matematik'))?.grade || '-';
    
    let totalCredits = 0;
    subjectGrades.forEach((s) => {
      if (['A1', 'A2', 'B3', 'B4', 'C5', 'C6'].includes((s.grade || '').toUpperCase())) {
        totalCredits += 1;
      }
    });

    const checklistValues = Object.values(state?.checklist || {});
    const checklistCompletedCount = checklistValues.filter(Boolean).length;

    const payload = {
      studentName: state?.profile?.studentName || '',
      icNumber: state?.profile?.icNumber || '01-000000',
      studentClass: state?.profile?.studentClass || '',
      totalCredits,
      bmGrade: bm,
      engGrade: eng,
      mathGrade: math,
      otherGrades: subjectGrades.map((s) => ({ subject: s.subjectName, grade: s.grade || '-' })),
      riasecCode: state?.riasecCode || '---',
      primaryTrait: state?.dominantTraits?.[0] || '-',
      topCareers: [],
      firstChoicePathway: state?.firstChoicePathway || '',
      secondChoicePathway: state?.secondChoicePathway || '',
      passportCompleted: Boolean(state?.passportCompleted),
      checklistCompletedCount,
      checklistTotal: checklistValues.length
    };

    await fetch('/api/cohort', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Graceful offline fallback
    console.warn('Backend cohort sync skipped or offline:', e);
  }
}

export function exportCohortToCsv(cohort: CohortStudentLog[]) {
  const headers = [
    'Student Name',
    'Class',
    'IC Number',
    'Total O-Level Credits',
    'BM Grade',
    'English Grade',
    'Math Grade',
    'RIASEC Code',
    '1st Choice Pathway',
    '2nd Choice Pathway',
    'Passport Completion Status',
    'Checklist Progress',
    'Submission Date (Brunei Time)'
  ];

  const rows = cohort.map((s) => [
    `"${(s.studentName || '').replace(/"/g, '""')}"`,
    `"${(s.studentClass || '').replace(/"/g, '""')}"`,
    `"${(s.icNumber || '').replace(/"/g, '""')}"`,
    s.totalCredits ?? 0,
    `"${s.bmGrade || '-'}"`,
    `"${s.engGrade || '-'}"`,
    `"${s.mathGrade || '-'}"`,
    `"${s.riasecCode || '-'}"`,
    `"${(s.firstChoicePathway || '').replace(/"/g, '""')}"`,
    `"${(s.secondChoicePathway || '').replace(/"/g, '""')}"`,
    s.passportCompleted ? 'COMPLETED' : 'IN_PROGRESS',
    `"${s.checklistCompletedCount || 0}/${s.checklistTotal || 5}"`,
    `"${s.submittedAt ? new Date(s.submittedAt).toLocaleString('en-GB') : '-'}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SMMH_Cohort_Hala_Tuju_2026_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadPassportAsPdf(elementId: string, studentName: string): Promise<boolean> {
  const target = document.getElementById(elementId);
  if (!target) return false;

  try {
    const imgData = await toPng(target, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      skipFonts: true,
      filter: (node) => {
        if (node instanceof HTMLElement && (node.classList?.contains('print-hidden') || node.classList?.contains('print:hidden'))) {
          return false;
        }
        return true;
      }
    });

    const img = new Image();
    img.src = imgData;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 8; // 8mm margin
    const contentWidth = pageWidth - (margin * 2); // 194mm
    const contentHeight = (img.height * contentWidth) / img.width;

    let heightLeft = contentHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    heightLeft -= (pageHeight - margin * 2);

    while (heightLeft > 0) {
      position = heightLeft - contentHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
      heightLeft -= (pageHeight - margin * 2);
    }

    const safeName = (studentName || 'Pelajar_SMMH').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    pdf.save(`Pasport_Hala_Tuju_SMMH_${safeName}.pdf`);
    return true;
  } catch (err) {
    console.error('PDF Generation error:', err);
    return false;
  }
}
