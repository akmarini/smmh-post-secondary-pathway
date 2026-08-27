export type Language = 'ms' | 'en';

export type RiasecDimension = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecQuestion {
  id: number;
  category: RiasecDimension;
  statementMs: string;
  statementEn: string;
  categoryNameMs: string;
  categoryNameEn: string;
}

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface CareerSuggestion {
  titleMs: string;
  titleEn: string;
  sector: string;
  wawasan2035Goal: string;
  descriptionMs: string;
  descriptionEn?: string;
  institutions: string[];
}

export interface SubjectGrade {
  id: string;
  subjectName: string;
  isCore?: boolean;
  grade: string; // A1, A2, B3, B4, C5, C6, D7, E8, U9, or ''
}

export interface PathwayOption {
  id: string;
  name: string;
  nameMs?: string;
  nameEn?: string;
  institutionName: string;
  institutionNameMs?: string;
  institutionNameEn?: string;
  campusLocation: string;
  campusLocationMs?: string;
  campusLocationEn?: string;
  duration: string;
  durationMs?: string;
  durationEn?: string;
  qualificationLevel: string;
  qualificationLevelMs?: string;
  qualificationLevelEn?: string;
  minCredits: number;
  status: 'eligible' | 'conditional' | 'not_eligible';
  statusLabelMs: string;
  statusLabelEn?: string;
  statusColor: string;
  reasonMs: string;
  reasonEn?: string;
  prerequisitesMs: string[];
  prerequisitesEn?: string[];
  recommendedCourses: string[];
  recommendedCoursesMs?: string[];
  recommendedCoursesEn?: string[];
  intakePortal: string;
  intakePortalMs?: string;
  intakePortalEn?: string;
  allowanceInfo: string;
  allowanceInfoMs?: string;
  allowanceInfoEn?: string;
}

export const YEAR_11_CLASSES = ['10XP', '11Sc', '11A', '11B', '11C', '11D'] as const;
export type Year11Class = (typeof YEAR_11_CLASSES)[number];

export interface StudentProfile {
  studentName: string;
  icNumber: string;
  studentClass: string;
  contactNumber: string;
  parentName: string;
  parentContact: string;
  targetAspirations: string;
}

export interface ChecklistState {
  counselorSessionDone: boolean;
  specialPrereqChecked: boolean;
  parentDiscussed: boolean;
  documentsCertified: boolean;
  hecasAccountCreated: boolean;
}

export interface SmmhHalaTujuState {
  profile: StudentProfile;
  riasecAnswers: Record<number, number>; // questionId -> score 1-5
  riasecCode: string;
  dominantTraits: RiasecDimension[];
  subjectGrades: SubjectGrade[];
  firstChoicePathway: string;
  secondChoicePathway: string;
  checklist: ChecklistState;
  lastSavedAt: string | null;
  passportCompleted: boolean;
}

export interface CohortStudentLog {
  id: string;
  studentName: string;
  icNumber: string;
  studentClass: string;
  totalCredits: number;
  bmGrade: string;
  engGrade: string;
  mathGrade: string;
  otherGrades: { subject: string; grade: string }[];
  riasecCode: string;
  primaryTrait: string;
  topCareers: string[];
  firstChoicePathway: string;
  secondChoicePathway: string;
  passportCompleted: boolean;
  checklistCompletedCount: number;
  checklistTotal: number;
  submittedAt: string;
}
