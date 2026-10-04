import { SubjectGrade, PathwayOption } from '../types';

export const O_LEVEL_GRADES = ['A1', 'A2', 'B3', 'B4', 'C5', 'C6', 'D7', 'E8', 'U9'];

// Cambridge IGCSE Letter Grades (A to U - no A*, no numerical suffix)
export const IGCSE_GRADES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'U'];

export const ALL_GRADES = [
  ...O_LEVEL_GRADES,
  ...IGCSE_GRADES
];

export const ENGLISH_SUBJECT_OPTIONS = [
  'IGCSE English as a Second Language (count-in Oral) (0511)',
  'English Language (1123)'
];

export const MATHEMATICS_SUBJECT_OPTIONS = [
  'Mathematics D (4024)',
  'IGCSE Mathematics (0580)'
];

export const DEFAULT_SUBJECTS: SubjectGrade[] = [
  { id: 'sub-bm', subjectName: 'Bahasa Melayu (1201)', isCore: true, grade: '' },
  { id: 'sub-eng', subjectName: 'IGCSE English as a Second Language (count-in Oral) (0511)', isCore: true, grade: '' },
  { id: 'sub-math', subjectName: 'Mathematics D (4024)', isCore: true, grade: '' },
  { id: 'sub-irk', subjectName: 'Pengetahuan Ugama Islam (IRK 2046)', isCore: false, grade: '' },
  { id: 'sub-sci', subjectName: 'Combined Science (5129)', isCore: false, grade: '' },
  { id: 'sub-elec1', subjectName: 'Physics (5054)', isCore: false, grade: '' },
  { id: 'sub-elec2', subjectName: 'Chemistry (5070)', isCore: false, grade: '' },
  { id: 'sub-elec3', subjectName: 'Biology (5090)', isCore: false, grade: '' }
];

export const AVAILABLE_ELECTIVE_SUBJECTS = [
  // Sciences & Agriculture
  'Agriculture (5038)',
  'Physics (5054)',
  'Chemistry (5070)',
  'Biology (5090)',
  'Combined Science (5129)',
  'Additional Mathematics (4037)',
  
  // Computing & Technology
  'Computer Science (2210)',
  'Information & Communication Technology (ICT 0417)',
  'Design & Technology (D&T 6043)',
  
  // Business, Accounting & Commercial
  'Principles of Accounts (7110 / 7707)',
  'Commercial Studies (7101)',
  'Economics (2281)',
  'Business Studies (7115)',
  
  // Humanities & Languages
  'Pengetahuan Ugama Islam (IRK 2046)',
  'Kesusasteraan Melayu (Malay Literature 2010)',
  'Geography (2230 / 2223)',
  'History (2171 / 2147)',
  'Arabic (3180)',
  'English Literature (2010)',
  'Sociology (2251)',
  'Travel & Tourism (7096)',
  
  // Creative & Applied Arts
  'Art & Design (6090)',
  'Food & Nutrition (6065)',
  'Fashion & Textiles (6130)',
  'Physical Education (0413)'
];

export function isIgcseSubject(subjectName: string): boolean {
  const lower = (subjectName || '').toLowerCase();
  return (
    lower.includes('second language') ||
    lower.includes('count-in oral') ||
    lower.includes('0511') ||
    lower.includes('0510') ||
    lower.includes('mathematics (igcse)') ||
    lower.includes('igcse mathematics') ||
    lower.includes('0580')
  );
}

export function isCreditGrade(grade: string): boolean {
  if (!grade) return false;
  const g = grade.trim().toUpperCase();
  // O-Level Credits: A1, A2, B3, B4, C5, C6
  // IGCSE Credits: A, B, C (No A*, no numerical suffix)
  return ['A1', 'A2', 'B3', 'B4', 'C5', 'C6', 'A', 'B', 'C'].includes(g);
}

export function isPassGrade(grade: string): boolean {
  if (!grade) return false;
  const g = grade.trim().toUpperCase();
  // O-Level Pass: A1 - E8
  // IGCSE Pass: A - G (D and E are standard pass benchmarks)
  return [
    'A1', 'A2', 'B3', 'B4', 'C5', 'C6', 'D7', 'E8',
    'A', 'B', 'C', 'D', 'E', 'F', 'G'
  ].includes(g);
}

export function isFailGrade(grade: string): boolean {
  if (!grade) return false;
  const g = grade.trim().toUpperCase();
  return ['U9', 'U'].includes(g);
}

export function calculateCredits(subjects: SubjectGrade[]): {
  totalCredits: number;
  bmCredit: boolean;
  engCredit: boolean;
  mathCredit: boolean;
  addMathCredit: boolean;
  bmPass: boolean;
  engPass: boolean;
  mathPass: boolean;
  hasPhysicsCredit: boolean;
  hasChemistryCredit: boolean;
  hasBiologyCredit: boolean;
  hasCombinedScienceCredit: boolean;
  hasAgricultureCredit: boolean;
  pureScienceCreditCount: number;
  scienceCreditCount: number;
} {
  let totalCredits = 0;
  let bmCredit = false;
  let engCredit = false;
  let mathCredit = false;
  let addMathCredit = false;
  let bmPass = false;
  let engPass = false;
  let mathPass = false;
  let hasPhysicsCredit = false;
  let hasChemistryCredit = false;
  let hasBiologyCredit = false;
  let hasCombinedScienceCredit = false;
  let hasAgricultureCredit = false;
  let pureScienceCreditCount = 0;
  let scienceCreditCount = 0;

  subjects.forEach((sub) => {
    const isCredit = isCreditGrade(sub.grade);
    const isPass = isPassGrade(sub.grade);

    if (isCredit) totalCredits += 1;

    const lowerName = (sub.subjectName || '').toLowerCase();
    if (lowerName.includes('bahasa melayu') || lowerName.includes('1201') || lowerName === 'bm') {
      if (isCredit) bmCredit = true;
      if (isPass) bmPass = true;
    } else if (
      lowerName.includes('english') ||
      lowerName.includes('second language') ||
      lowerName.includes('count-in oral') ||
      lowerName.includes('0511') ||
      lowerName.includes('0510') ||
      lowerName.includes('1123') ||
      lowerName.includes('inggeris') ||
      lowerName.includes('esl')
    ) {
      if (isCredit) engCredit = true;
      if (isPass) engPass = true;
    } else if (
      lowerName.includes('additional mathematics') ||
      lowerName.includes('4037') ||
      lowerName.includes('0606') ||
      lowerName.includes('add math')
    ) {
      if (isCredit) addMathCredit = true;
    } else if (
      lowerName.includes('mathematics') ||
      lowerName.includes('4024') ||
      lowerName.includes('0580') ||
      lowerName.includes('matematik') ||
      lowerName.includes('maths') ||
      lowerName === 'math'
    ) {
      if (isCredit) mathCredit = true;
      if (isPass) mathPass = true;
    }

    if (lowerName.includes('physics') || lowerName.includes('5054')) {
      if (isCredit) {
        hasPhysicsCredit = true;
        pureScienceCreditCount += 1;
        scienceCreditCount += 1;
      }
    } else if (lowerName.includes('chemistry') || lowerName.includes('5070')) {
      if (isCredit) {
        hasChemistryCredit = true;
        pureScienceCreditCount += 1;
        scienceCreditCount += 1;
      }
    } else if (lowerName.includes('biology') || lowerName.includes('5090')) {
      if (isCredit) {
        hasBiologyCredit = true;
        pureScienceCreditCount += 1;
        scienceCreditCount += 1;
      }
    } else if (lowerName.includes('combined science') || lowerName.includes('5129') || lowerName.includes('science 5129') || lowerName === 'science') {
      if (isCredit) {
        hasCombinedScienceCredit = true;
        scienceCreditCount += 1;
      }
    } else if (lowerName.includes('agriculture') || lowerName.includes('5038') || lowerName.includes('pertanian')) {
      if (isCredit) {
        hasAgricultureCredit = true;
        scienceCreditCount += 1;
      }
    }
  });

  return {
    totalCredits,
    bmCredit,
    engCredit,
    mathCredit,
    addMathCredit,
    bmPass,
    engPass,
    mathPass,
    hasPhysicsCredit,
    hasChemistryCredit,
    hasBiologyCredit,
    hasCombinedScienceCredit,
    hasAgricultureCredit,
    pureScienceCreditCount,
    scienceCreditCount
  };
}

export function evaluatePathways(subjects: SubjectGrade[]): PathwayOption[] {
  const {
    totalCredits,
    bmCredit,
    engCredit,
    mathCredit,
    hasPhysicsCredit,
    hasChemistryCredit,
    hasBiologyCredit,
    hasCombinedScienceCredit,
    hasAgricultureCredit,
    pureScienceCreditCount
  } = calculateCredits(subjects);

  const pathways: PathwayOption[] = [
    // 1. Pusat Tingkatan Enam Tutong (PTET) / Sixth Form
    {
      id: 'ptet-sixth-form',
      name: 'Pusat Tingkatan Enam Tutong (PTET) - Sijil Tinggi Persekolahan GCE A-Level',
      nameMs: 'Pusat Tingkatan Enam Tutong (PTET) - Sijil Tinggi Persekolahan GCE A-Level',
      nameEn: 'Tutong Sixth Form Centre (PTET) - Cambridge GCE Advanced Level (A-Level)',
      institutionName: 'Pusat Tingkatan Enam Tutong (PTET)',
      institutionNameMs: 'Pusat Tingkatan Enam Tutong (PTET)',
      institutionNameEn: 'Tutong Sixth Form Centre (PTET)',
      campusLocation: '',
      campusLocationMs: '',
      campusLocationEn: '',
      duration: '2 Tahun (Tingkatan 6 Bawah & Atas)',
      durationMs: '2 Tahun (Tingkatan 6 Bawah & Atas)',
      durationEn: '2 Years (Lower & Upper Sixth Form)',
      qualificationLevel: 'BDQF Tahap 3 / GCE Cambridge Advanced Level (A-Level)',
      qualificationLevelMs: 'BDQF Tahap 3 / GCE Cambridge Advanced Level (A-Level)',
      qualificationLevelEn: 'BDQF Level 3 / Cambridge GCE Advanced Level (A-Level)',
      minCredits: 4,
      status: 'not_eligible',
      statusLabelMs: 'Belum Mencapai Syarat',
      statusLabelEn: 'Entry Requirements Not Met',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Sekurang-kurangnya 4 atau 5 Kredit O-Level (A1-C6) atau IGCSE (Gred A-C) yang relevan',
        'Kredit Bahasa Melayu (1201) BUKAN syarat am mutlak — pelajar yang belum mencapai kredit BM dibenarkan mengambil semula (retake) peperiksaan BM O-Level semasa belajar di Tingkatan Enam',
        'Kredit dalam mata pelajaran khusus A-Level yang ingin diambil (Contoh: Gred B4 / Gred B IGCSE dalam Sains & Matematik untuk subjek A-Level Sains)'
      ],
      prerequisitesEn: [
        'Minimum of 4 to 5 relevant O-Level (A1-C6) or IGCSE (Grade A-C) Credits',
        'Credit in Bahasa Melayu (1201) is NOT a strict prerequisite — students without a BM credit are accepted and permitted to retake their BM O-Level exam while studying in Sixth Form',
        'Credits in specific prerequisite subjects for chosen A-Level subjects (e.g. Grade B4 or IGCSE Grade B in Science & Maths for Science stream)'
      ],
      recommendedCourses: [
        'Aliran Sains Tulen (Physics, Chemistry, Biology, Mathematics)',
        'Aliran Sains Sosial & Kemanusiaan (Economics, Geography, History, Accounting)',
        'Aliran Sastera Melayu & Syariah (Bahasa Melayu, Kesusasteraan, IRK/Syariah)'
      ],
      recommendedCoursesMs: [
        'Aliran Sains Tulen (Physics, Chemistry, Biology, Mathematics)',
        'Aliran Sains Sosial & Kemanusiaan (Economics, Geography, History, Accounting)',
        'Aliran Sastera Melayu & Syariah (Bahasa Melayu, Kesusasteraan, IRK/Syariah)'
      ],
      recommendedCoursesEn: [
        'Pure Science Stream (Physics, Chemistry, Biology, Mathematics)',
        'Social Sciences & Humanities (Economics, Geography, History, Accounting)',
        'Malay Literature & Syariah Stream (Bahasa Melayu, Literature, Islamic Studies)'
      ],
      intakePortal: '',
      intakePortalMs: '',
      intakePortalEn: '',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 2. Politeknik Brunei (PB)
    {
      id: 'politeknik-brunei',
      name: 'Politeknik Brunei (PB) - Diploma Lanjutan (Level 5 Diploma)',
      nameMs: 'Politeknik Brunei (PB) - Diploma Lanjutan (Level 5 Diploma)',
      nameEn: 'Politeknik Brunei (PB) - Level 5 Higher National Diploma',
      institutionName: 'Politeknik Brunei (Kementerian Pendidikan)',
      institutionNameMs: 'Politeknik Brunei (Kementerian Pendidikan)',
      institutionNameEn: 'Politeknik Brunei (Ministry of Education)',
      campusLocation: 'Kampus Utama Ong Sum Ping (BSB) & Kampus Lumut (Belait)',
      campusLocationMs: 'Kampus Utama Ong Sum Ping (BSB) & Kampus Lumut (Belait)',
      campusLocationEn: 'Main Campus Ong Sum Ping (BSB) & Lumut Campus (Belait)',
      duration: '3 Tahun (Termasuk 6 Bulan Latihan Industri / Internship)',
      durationMs: '3 Tahun (Termasuk 6 Bulan Latihan Industri / Internship)',
      durationEn: '3 Years (Including 6 Months Structured Industry Internship)',
      qualificationLevel: 'BDQF Tahap 5 (Diploma Kebangsaan Tinggi / Level 5 Diploma)',
      qualificationLevelMs: 'BDQF Tahap 5 (Diploma Kebangsaan Tinggi / Level 5 Diploma)',
      qualificationLevelEn: 'BDQF Level 5 (Higher National Diploma)',
      minCredits: 5,
      status: 'not_eligible',
      statusLabelMs: 'Belum Mencapai Syarat',
      statusLabelEn: 'Entry Requirements Not Met',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Sekurang-kurangnya 5 Kredit yang relevan (Gred A1-C6 / IGCSE Gred A-C)',
        'Kredit Bahasa Inggeris (1123 / IGCSE English as a Second Language 0511, Gred A1-C6 atau A-C) adalah WAJIB untuk semua program Diploma PB',
        'Kredit Matematik (4024 / IGCSE Mathematics 0580, Gred A1-C6 atau A-C) wajib untuk School of Science & Engineering dan School of ICT',
        'School of Science & Engineering (Lumut) & Health Sciences: WAJIB Kredit Sains Tulen (Physics 5054 / Chemistry 5070 / Biology 5090). NOTA: Combined Science (5129) tidak setara dengan Sains Tulen untuk program Kejuruteraan PB.',
        'Lulus Bahasa Melayu (A1 - D7 / E8)'
      ],
      prerequisitesEn: [
        'At least 5 relevant Credits (Grade A1-C6 / IGCSE Grade A-C)',
        'Credit in English Language (1123 / IGCSE English as a Second Language 0511, Grade A1-C6 or A-C) is MANDATORY for all PB Diploma programmes',
        'Credit in Mathematics (4024 / IGCSE Mathematics 0580, Grade A1-C6 or A-C) required for School of Science & Engineering and School of ICT',
        'School of Science & Engineering (Lumut) & Health Sciences: MANDATORY Pure Science credit (Physics 5054 / Chemistry 5070 / Biology 5090). NOTE: Combined Science (5129) is not equivalent to Pure Science for PB Engineering programmes.',
        'Pass in Bahasa Melayu (A1 - D7 / E8)'
      ],
      recommendedCourses: [
        'School of Science and Engineering (Lumut): Diploma in Petroleum Engineering, Electrical & Electronic, Civil Engineering',
        'School of ICT (Ong Sum Ping): Diploma in Cybersecurity, Web Development, Data Analytics',
        'School of Business (Ong Sum Ping): Diploma in Business Studies, Accounting & Finance',
        'School of Health Sciences (PAPRSB IHS): Diploma in Health Sciences (Nursing / Physiotherapy)'
      ],
      recommendedCoursesMs: [
        'School of Science and Engineering (Lumut): Diploma in Petroleum Engineering, Electrical & Electronic, Civil Engineering',
        'School of ICT (Ong Sum Ping): Diploma in Cybersecurity, Web Development, Data Analytics',
        'School of Business (Ong Sum Ping): Diploma in Business Studies, Accounting & Finance',
        'School of Health Sciences (PAPRSB IHS): Diploma in Health Sciences (Nursing / Physiotherapy)'
      ],
      recommendedCoursesEn: [
        'School of Science and Engineering (Lumut): Diploma in Petroleum Engineering, Electrical & Electronic, Civil Engineering',
        'School of ICT (Ong Sum Ping): Diploma in Cybersecurity, Web Development, Data Analytics',
        'School of Business (Ong Sum Ping): Diploma in Business Studies, Accounting & Finance',
        'School of Health Sciences (PAPRSB IHS): Diploma in Health Sciences (Nursing / Physiotherapy)'
      ],
      intakePortal: 'Portal HECAS & Politeknik Brunei Admission System (PBAS)',
      intakePortalMs: 'Portal HECAS & Politeknik Brunei Admission System (PBAS)',
      intakePortalEn: 'HECAS Portal & Politeknik Brunei Admission System (PBAS)',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 3. IBTE Diploma (BDQF Level 5 - Higher TVET Diploma)
    {
      id: 'ibte-diploma',
      name: 'IBTE Diploma (Tahap 5 BDQF) - Program Diploma Tinggi TVET',
      nameMs: 'IBTE Diploma (Tahap 5 BDQF) - Program Diploma Tinggi TVET',
      nameEn: 'IBTE Diploma (BDQF Level 5) - Higher TVET Diploma Programmes',
      institutionName: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameMs: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameEn: 'Institute of Brunei Technical Education (IBTE)',
      campusLocation: 'Kampus Jefri Bolkiah (Kuala Belait), Kampus Sultan Saiful Rijal, Kampus Agro-Teknologi Wasan & Kampus Perniagaan Gadong',
      campusLocationMs: 'Kampus Jefri Bolkiah (Kuala Belait), Kampus Sultan Saiful Rijal, Kampus Agro-Teknologi Wasan & Kampus Perniagaan Gadong',
      campusLocationEn: 'Jefri Bolkiah Campus (Kuala Belait), Sultan Saiful Rijal Campus, Agro-Technology Campus Wasan & Business Campus Gadong',
      duration: '2.5 hingga 3 Tahun (Termasuk Latihan Industri Antarabangsa / Pelayaran Laut)',
      durationMs: '2.5 hingga 3 Tahun (Termasuk Latihan Industri Antarabangsa / Pelayaran Laut)',
      durationEn: '2.5 to 3 Years (Includes International / Sea-Time Industrial Internship)',
      qualificationLevel: 'BDQF Tahap 5 (Diploma Kebangsaan Tinggi)',
      qualificationLevelMs: 'BDQF Tahap 5 (Diploma Kebangsaan Tinggi)',
      qualificationLevelEn: 'BDQF Level 5 (Higher National Diploma)',
      minCredits: 5,
      status: 'not_eligible',
      statusLabelMs: 'Belum Mencapai Syarat',
      statusLabelEn: 'Entry Requirements Not Met',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Sekurang-kurangnya 5 Kredit O-Level berkaitan (Wajib Kredit Bahasa Inggeris & Matematik/Sains bagi bidang Kejuruteraan & Maritim)',
        'Atau kelulusan Sijil HNTec (BDQF Tahap 4) berkaitan dengan Purata Nilai Gred (GPA) minimum 2.7 ke atas',
        'Lulus ujian temu duga khas, ujian bakat praktikal, dan pemeriksaan kesihatan piawaian industri (ENG1/Maritim untuk Akademi Maritim Brunei)'
      ],
      prerequisitesEn: [
        'Minimum of 5 relevant O-Level Credits (Mandatory English Language & Mathematics/Science for Engineering & Maritime disciplines)',
        'Or relevant HNTec (BDQF Level 4) certificate with minimum GPA of 2.7 or above',
        'Pass interview assessment, practical aptitude test, and certified medical fitness examination (ENG1/Maritime for Brunei Maritime Academy)'
      ],
      recommendedCourses: [
        'Diploma in Marine Engineering (Akademi Maritim Brunei - Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Nautical Studies (Akademi Maritim Brunei - Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Control & Automation Engineering (Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Refinery Operator / Process Engineering (Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Information & Communication Technology (Kampus Sultan Saiful Rijal & Kampus Jefri Bolkiah)',
        'Diploma in Hospitality Management & Culinary Arts (Kampus Sultan Saiful Rijal)',
        'Diploma in Agricultural Technology (Agrotechnology) (Kampus Agro-Teknologi Wasan)',
        'Diploma in Business & Financial Services (Kampus Perniagaan Gadong)'
      ],
      recommendedCoursesMs: [
        'Diploma in Marine Engineering (Akademi Maritim Brunei - Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Nautical Studies (Akademi Maritim Brunei - Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Control & Automation Engineering (Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Refinery Operator / Process Engineering (Kampus Jefri Bolkiah, Kuala Belait)',
        'Diploma in Information & Communication Technology (Kampus Sultan Saiful Rijal & Kampus Jefri Bolkiah)',
        'Diploma in Hospitality Management & Culinary Arts (Kampus Sultan Saiful Rijal)',
        'Diploma in Agricultural Technology (Agrotechnology) (Kampus Agro-Teknologi Wasan)',
        'Diploma in Business & Financial Services (Kampus Perniagaan Gadong)'
      ],
      recommendedCoursesEn: [
        'Diploma in Marine Engineering (Brunei Maritime Academy - Jefri Bolkiah Campus, Kuala Belait)',
        'Diploma in Nautical Studies (Brunei Maritime Academy - Jefri Bolkiah Campus, Kuala Belait)',
        'Diploma in Control & Automation Engineering (Jefri Bolkiah Campus, Kuala Belait)',
        'Diploma in Refinery Operator / Process Engineering (Jefri Bolkiah Campus, Kuala Belait)',
        'Diploma in Information & Communication Technology (Sultan Saiful Rijal & Jefri Bolkiah Campuses)',
        'Diploma in Hospitality Management & Culinary Arts (Sultan Saiful Rijal Campus)',
        'Diploma in Agricultural Technology (Agrotechnology) (Agro-Technology Campus Wasan)',
        'Diploma in Business & Financial Services (Business Campus Gadong)'
      ],
      intakePortal: 'Portal Pengambilan Pelajar IBTE (TVeCAS) & HECAS',
      intakePortalMs: 'Portal Pengambilan Pelajar IBTE (TVeCAS) & HECAS',
      intakePortalEn: 'IBTE TVET Admission Portal (TVeCAS) & HECAS',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 4. IBTE HNTec (Higher National Technical Education Certificate)
    {
      id: 'ibte-hntec',
      name: 'IBTE HNTec (Higher National Technical Education Certificate) - Tahap 4',
      nameMs: 'IBTE HNTec (Higher National Technical Education Certificate) - Tahap 4',
      nameEn: 'IBTE HNTec (Higher National Technical Education Certificate) - Level 4',
      institutionName: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameMs: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameEn: 'Institute of Brunei Technical Education (IBTE)',
      campusLocation: 'Semua 7 Kampus Cawangan IBTE (Sultan Saiful Rijal, Nakhoda Ragam, Mekanikal, Perniagaan, Agro-Teknologi Wasan, Jefri Bolkiah & Sultan Bolkiah)',
      campusLocationMs: 'Semua 7 Kampus Cawangan IBTE (Sultan Saiful Rijal, Nakhoda Ragam, Mekanikal, Perniagaan, Agro-Teknologi Wasan, Jefri Bolkiah & Sultan Bolkiah)',
      campusLocationEn: 'All 7 IBTE Campuses (Sultan Saiful Rijal, Nakhoda Ragam, Mechanical, Business, Agro-Technology Wasan, Jefri Bolkiah & Sultan Bolkiah)',
      duration: '2 Tahun (Amali Bersepadu)',
      durationMs: '2 Tahun (Amali Bersepadu)',
      durationEn: '2 Years (Integrated Practical Apprenticeship)',
      qualificationLevel: 'BDQF Tahap 4 (Sijil Kemahiran Teknikal Kebangsaan Tinggi)',
      qualificationLevelMs: 'BDQF Tahap 4 (Sijil Kemahiran Teknikal Kebangsaan Tinggi)',
      qualificationLevelEn: 'BDQF Level 4 (Higher National Technical Certificate)',
      minCredits: 3,
      status: 'not_eligible',
      statusLabelMs: 'Belum Mencapai Syarat',
      statusLabelEn: 'Entry Requirements Not Met',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Sekurang-kurangnya 3 hingga 4 Kredit O-Level yang bersesuaian',
        'Lulus Bahasa Melayu & Bahasa Inggeris',
        'Lulus Matematik atau Sains untuk bidang teknikal dan teknologi maklumat'
      ],
      prerequisitesEn: [
        'Minimum of 3 to 4 relevant O-Level Credits',
        'Pass in Bahasa Melayu & English Language',
        'Pass in Mathematics or Science for technical and IT disciplines'
      ],
      recommendedCourses: [
        'HNTec in Aircraft Maintenance Engineering (Airframe & Engine / Avionics) (Kampus Sultan Saiful Rijal)',
        'HNTec in Hospitality Operations & Culinary Arts (Kampus Sultan Saiful Rijal)',
        'HNTec in Information Technology & Computer Networking (Kampus Sultan Saiful Rijal & Kampus Jefri Bolkiah)',
        'HNTec in Construction & Draftsmanship / Building Services / Geomatics (Kampus Nakhoda Ragam)',
        'HNTec in Automotive Technology & Heavy Vehicle Engineering (Kampus Mekanikal, Tungku)',
        'HNTec in Business Management, Accounting & Office Administration (Kampus Perniagaan, Gadong)',
        'HNTec in Agrotechnology & Crop Production / Laboratory Science (Kampus Agro-Teknologi Wasan - Berdekatan Tutong)',
        'HNTec in Plant Engineering, Instrumentation & Control (Kampus Jefri Bolkiah & Kampus Sultan Bolkiah, Belait)'
      ],
      recommendedCoursesMs: [
        'HNTec in Aircraft Maintenance Engineering (Airframe & Engine / Avionics) (Kampus Sultan Saiful Rijal)',
        'HNTec in Hospitality Operations & Culinary Arts (Kampus Sultan Saiful Rijal)',
        'HNTec in Information Technology & Computer Networking (Kampus Sultan Saiful Rijal & Kampus Jefri Bolkiah)',
        'HNTec in Construction & Draftsmanship / Building Services / Geomatics (Kampus Nakhoda Ragam)',
        'HNTec in Automotive Technology & Heavy Vehicle Engineering (Kampus Mekanikal, Tungku)',
        'HNTec in Business Management, Accounting & Office Administration (Kampus Perniagaan, Gadong)',
        'HNTec in Agrotechnology & Crop Production / Laboratory Science (Kampus Agro-Teknologi Wasan - Berdekatan Tutong)',
        'HNTec in Plant Engineering, Instrumentation & Control (Kampus Jefri Bolkiah & Kampus Sultan Bolkiah, Belait)'
      ],
      recommendedCoursesEn: [
        'HNTec in Aircraft Maintenance Engineering (Airframe & Engine / Avionics) (Sultan Saiful Rijal Campus)',
        'HNTec in Hospitality Operations & Culinary Arts (Sultan Saiful Rijal Campus)',
        'HNTec in Information Technology & Computer Networking (Sultan Saiful Rijal & Jefri Bolkiah Campuses)',
        'HNTec in Construction & Draftsmanship / Building Services / Geomatics (Nakhoda Ragam Campus)',
        'HNTec in Automotive Technology & Heavy Vehicle Engineering (Mechanical Campus, Tungku)',
        'HNTec in Business Management, Accounting & Office Administration (Business Campus, Gadong)',
        'HNTec in Agrotechnology & Crop Production / Laboratory Science (Agro-Technology Campus Wasan - Near Tutong)',
        'HNTec in Plant Engineering, Instrumentation & Control (Jefri Bolkiah & Sultan Bolkiah Campuses, Belait)'
      ],
      intakePortal: 'Sistem Pengambilan Pelajar IBTE (TVET Admission Portal) - Januari & Julai',
      intakePortalMs: 'Sistem Pengambilan Pelajar IBTE (TVET Admission Portal) - Januari & Julai',
      intakePortalEn: 'IBTE TVET Admission Portal - January & July Intakes',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 5. IBTE NTec (National Technical Education Certificate)
    {
      id: 'ibte-ntec',
      name: 'IBTE NTec (National Technical Education Certificate) - Tahap 3 Kemahiran Asas',
      nameMs: 'IBTE NTec (National Technical Education Certificate) - Tahap 3 Kemahiran Asas',
      nameEn: 'IBTE NTec (National Technical Education Certificate) - Level 3 Foundation Skills',
      institutionName: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameMs: 'Institut Pendidikan Teknikal Brunei (IBTE)',
      institutionNameEn: 'Institute of Brunei Technical Education (IBTE)',
      campusLocation: 'Semua 7 Kampus Cawangan IBTE Brunei-Muara & Belait',
      campusLocationMs: 'Semua 7 Kampus Cawangan IBTE Brunei-Muara & Belait',
      campusLocationEn: 'All 7 IBTE Campuses across Brunei-Muara & Belait Districts',
      duration: '1 hingga 2 Tahun',
      durationMs: '1 hingga 2 Tahun',
      durationEn: '1 to 2 Years',
      qualificationLevel: 'BDQF Tahap 3 (Sijil Kemahiran Teknikal Asas)',
      qualificationLevelMs: 'BDQF Tahap 3 (Sijil Kemahiran Teknikal Asas)',
      qualificationLevelEn: 'BDQF Level 3 (National Technical Certificate)',
      minCredits: 1,
      status: 'not_eligible',
      statusLabelMs: 'Belum Mencapai Syarat',
      statusLabelEn: 'Entry Requirements Not Met',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Sekurang-kurangnya 1 hingga 2 Kredit O-Level atau tamat persekolahan Tahun 11 SMMH',
        'Lulus ujian temu duga dan amali yang ditetapkan oleh pihak IBTE'
      ],
      prerequisitesEn: [
        'Minimum of 1 to 2 O-Level Credits or completion of Year 11 SMMH secondary schooling',
        'Pass interview and practical assessment conducted by IBTE'
      ],
      recommendedCourses: [
        'NTec in Light Vehicle Mechanics & Vehicle Body Repair (Kampus Mekanikal, Tungku)',
        'NTec in Building Craft - Carpentry, Plumbing & Masonry (Kampus Nakhoda Ragam)',
        'NTec in Culinary Skills & Food & Beverage Operations (Kampus Sultan Saiful Rijal)',
        'NTec in Business Administration & Retail Operations (Kampus Perniagaan, Gadong)',
        'NTec in Crop Production, Aquaculture & Food Processing (Kampus Agro-Teknologi Wasan)',
        'NTec in Industrial Machining & Metal Fabrication (Kampus Mekanikal & Kampus Sultan Bolkiah)'
      ],
      recommendedCoursesMs: [
        'NTec in Light Vehicle Mechanics & Vehicle Body Repair (Kampus Mekanikal, Tungku)',
        'NTec in Building Craft - Carpentry, Plumbing & Masonry (Kampus Nakhoda Ragam)',
        'NTec in Culinary Skills & Food & Beverage Operations (Kampus Sultan Saiful Rijal)',
        'NTec in Business Administration & Retail Operations (Kampus Perniagaan, Gadong)',
        'NTec in Crop Production, Aquaculture & Food Processing (Kampus Agro-Teknologi Wasan)',
        'NTec in Industrial Machining & Metal Fabrication (Kampus Mekanikal & Kampus Sultan Bolkiah)'
      ],
      recommendedCoursesEn: [
        'NTec in Light Vehicle Mechanics & Vehicle Body Repair (Mechanical Campus, Tungku)',
        'NTec in Building Craft - Carpentry, Plumbing & Masonry (Nakhoda Ragam Campus)',
        'NTec in Culinary Skills & Food & Beverage Operations (Sultan Saiful Rijal Campus)',
        'NTec in Business Administration & Retail Operations (Business Campus, Gadong)',
        'NTec in Crop Production, Aquaculture & Food Processing (Agro-Technology Campus Wasan)',
        'NTec in Industrial Machining & Metal Fabrication (Mechanical & Sultan Bolkiah Campuses)'
      ],
      intakePortal: 'TVET Admission Portal IBTE',
      intakePortalMs: 'TVET Admission Portal IBTE',
      intakePortalEn: 'IBTE TVET Admission Portal',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 6. IBTE Apprenticeship Scheme (EICF & ISQ Energy Programs)
    {
      id: 'ibte-apprenticeship',
      name: 'Skim Perantisan Industri IBTE (EICF Energy Industry Competency)',
      nameMs: 'Skim Perantisan Industri IBTE (EICF Energy Industry Competency)',
      nameEn: 'IBTE Industry Apprenticeship Scheme (EICF / ISQ Energy Programmes)',
      institutionName: 'IBTE & Sektor Industri Minyak/Gas (BSP / Megamas / Adinin / UNN)',
      institutionNameMs: 'IBTE & Sektor Industri Minyak/Gas (BSP / Megamas / Adinin / UNN)',
      institutionNameEn: 'IBTE & Energy/Oil & Gas Industry (BSP / Megamas / Adinin / UNN)',
      campusLocation: 'Kampus Sultan Bolkiah (Seria), Kampus Jefri Bolkiah (Kuala Belait), Kampus Sultan Saiful Rijal & Pusat Latihan Industri',
      campusLocationMs: 'Kampus Sultan Bolkiah (Seria), Kampus Jefri Bolkiah (Kuala Belait), Kampus Sultan Saiful Rijal & Pusat Latihan Industri',
      campusLocationEn: 'Sultan Bolkiah Campus (Seria), Jefri Bolkiah Campus (Kuala Belait), Sultan Saiful Rijal Campus & Partner Industry Training Facilities',
      duration: '1 hingga 1.5 Tahun (Tajaan Penuh Industri)',
      durationMs: '1 hingga 1.5 Tahun (Tajaan Penuh Industri)',
      durationEn: '1 to 1.5 Years (Fully Sponsored by Energy Industry)',
      qualificationLevel: 'BDQF Tahap 2/3 + Sijil Kompetensi Industri Antarabangsa (OPITO/City & Guilds)',
      qualificationLevelMs: 'BDQF Tahap 2/3 + Sijil Kompetensi Industri Antarabangsa (OPITO/City & Guilds)',
      qualificationLevelEn: 'BDQF Level 2/3 + International Industry Certification (OPITO/City & Guilds)',
      minCredits: 1,
      status: 'not_eligible',
      statusLabelMs: 'Layak Bersyarat',
      statusLabelEn: 'Conditionally Eligible',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      reasonMs: '',
      reasonEn: '',
      prerequisitesMs: [
        'Tamat Tahun 11 dengan minimum 1-2 kredit/lulus O-Level',
        'Lulus pemeriksaan kesihatan perubatan (Medical Fitness offshore)',
        'Lulus temu duga dan ujian kecergasan fizikal penaja industri'
      ],
      prerequisitesEn: [
        'Completed Year 11 with minimum 1-2 O-Level credits/passes',
        'Pass offshore medical fitness examination',
        'Pass interview and physical aptitude test by industrial sponsors'
      ],
      recommendedCourses: [
        'ISQ in Industrial Welding (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Scaffolding Operations (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Rigging & Rigger Fitter (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Marker Fitter & Pipe Fitting (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'Skim Perantisan Deck Rating & Engine Rating (Akademi Maritim Brunei - Kampus Jefri Bolkiah)',
        'Skim Perantisan Kejuruteraan Rangkaian Telekomunikasi (Kampus Sultan Saiful Rijal & UNN)'
      ],
      recommendedCoursesMs: [
        'ISQ in Industrial Welding (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Scaffolding Operations (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Rigging & Rigger Fitter (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'ISQ in Marker Fitter & Pipe Fitting (Kampus Sultan Bolkiah & Industri Minyak/Gas)',
        'Skim Perantisan Deck Rating & Engine Rating (Akademi Maritim Brunei - Kampus Jefri Bolkiah)',
        'Skim Perantisan Kejuruteraan Rangkaian Telekomunikasi (Kampus Sultan Saiful Rijal & UNN)'
      ],
      recommendedCoursesEn: [
        'ISQ in Industrial Welding (Sultan Bolkiah Campus & Oil/Gas Industry)',
        'ISQ in Scaffolding Operations (Sultan Bolkiah Campus & Oil/Gas Industry)',
        'ISQ in Rigging & Rigger Fitter (Sultan Bolkiah Campus & Oil/Gas Industry)',
        'ISQ in Marker Fitter & Pipe Fitting (Sultan Bolkiah Campus & Oil/Gas Industry)',
        'Deck Rating & Engine Rating Apprenticeship (Brunei Maritime Academy - Jefri Bolkiah Campus)',
        'Telecommunication Network Engineering Apprenticeship (Sultan Saiful Rijal Campus & UNN)'
      ],
      intakePortal: 'Pengambilan Khas Kerjasama Jabatan Tenaga & IBTE',
      intakePortalMs: 'Pengambilan Khas Kerjasama Jabatan Tenaga & IBTE',
      intakePortalEn: 'Joint Department of Energy & IBTE Special Intake',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    },

    // 7. Kolej Swasta: CCCT (Cosmopolitan College) / Micronet / LCB
    {
      id: 'private-colleges-ccct',
      name: 'Kolej Swasta: CCCT (Cosmopolitan College) / Micronet / LCB - Sijil & Diploma',
      nameMs: 'Kolej Swasta: CCCT (Cosmopolitan College) / Micronet / LCB - Sijil & Diploma',
      nameEn: 'Private Colleges: CCCT (Cosmopolitan College) / Micronet / LCB - Certificate & Diploma',
      institutionName: 'CCCT (Cosmopolitan College of Commerce & Technology), Micronet & Kolej Swasta',
      institutionNameMs: 'CCCT (Cosmopolitan College of Commerce & Technology), Micronet & Kolej Swasta',
      institutionNameEn: 'CCCT (Cosmopolitan College of Commerce & Technology), Micronet & Private Colleges',
      campusLocation: 'Bandar Seri Begawan / Cawangan Daerah',
      campusLocationMs: 'Bandar Seri Begawan / Cawangan Daerah',
      campusLocationEn: 'Bandar Seri Begawan / District Branches',
      duration: '1 - 2.5 Tahun (Tahap Sijil / Diploma BDQF Tahap 4 & 5)',
      durationMs: '1 - 2.5 Tahun (Tahap Sijil / Diploma BDQF Tahap 4 & 5)',
      durationEn: '1 - 2.5 Years (Certificate / Diploma Levels BDQF Level 4 & 5)',
      qualificationLevel: 'BDQF Tahap 3, 4 & 5 (Pearson BTEC / NCC Education UK / Sijil Tempatan)',
      qualificationLevelMs: 'BDQF Tahap 3, 4 & 5 (Pearson BTEC / NCC Education UK / Sijil Tempatan)',
      qualificationLevelEn: 'BDQF Level 3, 4 & 5 (Pearson BTEC / NCC Education UK / Local Awards)',
      minCredits: 1,
      status: 'eligible',
      statusLabelMs: 'Terbuka Untuk Permohonan',
      statusLabelEn: 'Open for Applications',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      reasonMs: 'Kolej swasta seperti CCCT (Cosmopolitan College of Commerce & Technology), Micronet dan LCB menawarkan laluan kemasukan fleksibel untuk program IT, Pengkomputeran, Perniagaan, dan Media Kreatif (BTEC / Sijil Kemahiran).',
      reasonEn: 'Private institutions such as CCCT (Cosmopolitan College of Commerce & Technology), Micronet and LCB offer flexible entry routes for IT, Computing, Business, and Creative Media (BTEC / Skills Certificates).',
      prerequisitesMs: [
        '1 hingga 4 Kredit O-Level bergantung kepada peringkat program (Sijil / Diploma)',
        'Laluan kemasukan alternatif berasaskan tamat Tahun 11 SMMH'
      ],
      prerequisitesEn: [
        '1 to 4 O-Level Credits depending on programme level (Certificate / Diploma)',
        'Alternative entry pathways based on Year 11 secondary completion'
      ],
      recommendedCourses: [
        'CCCT: Diploma in Information Technology, Business Administration, Creative Multimedia',
        'Micronet: Pearson BTEC Level 3 & 5 in Computing / IT Networking',
        'LCB: BTEC Business Management & Hospitality'
      ],
      recommendedCoursesMs: [
        'CCCT: Diploma in Information Technology, Business Administration, Creative Multimedia',
        'Micronet: Pearson BTEC Level 3 & 5 in Computing / IT Networking',
        'LCB: BTEC Business Management & Hospitality'
      ],
      recommendedCoursesEn: [
        'CCCT: Diploma in Information Technology, Business Administration, Creative Multimedia',
        'Micronet: Pearson BTEC Level 3 & 5 in Computing / IT Networking',
        'LCB: BTEC Business Management & Hospitality'
      ],
      intakePortal: 'Pengambilan Terus Institusi (CCCT / Micronet / LCB)',
      intakePortalMs: 'Pengambilan Terus Institusi (CCCT / Micronet / LCB)',
      intakePortalEn: 'Direct Institutional Intake (CCCT / Micronet / LCB)',
      allowanceInfo: '',
      allowanceInfoMs: '',
      allowanceInfoEn: ''
    }
  ];

  // Logic Evaluation for PTET
  const ptet = pathways.find((p) => p.id === 'ptet-sixth-form')!;
  if (totalCredits >= 4) {
    ptet.status = 'eligible';
    ptet.statusLabelMs = totalCredits >= 5 ? 'Layak Masuk PTET (A-Levels)' : 'Layak Masuk PTET (4 Kredit)';
    ptet.statusLabelEn = totalCredits >= 5 ? 'Eligible for PTET (A-Levels)' : 'Eligible for PTET (4 Credits)';
    ptet.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    
    if (bmCredit) {
      ptet.reasonMs = `Tahniah! Anda mempunyai ${totalCredits} Kredit O-Level berserta Kredit Bahasa Melayu (1201). Anda layak memohon kemasukan ke Pusat Tingkatan Enam Tutong (PTET) bagi pakej kombinasi subjek A-Level yang bersesuaian.`;
      ptet.reasonEn = `Congratulations! You have ${totalCredits} O-Level Credits including a Credit in Bahasa Melayu (1201). You are eligible to apply for Tutong Sixth Form Centre (PTET) for suitable A-Level subject combinations.`;
    } else {
      ptet.reasonMs = `Tahniah! Anda mempunyai ${totalCredits} Kredit O-Level dan layak memohon ke Pusat Tingkatan Enam Tutong (PTET). NOTA BAHASA MELAYU: Kredit Bahasa Melayu bukan syarat mutlak untuk kemasukan PTE — anda dibenarkan mengambil semula (retake) peperiksaan O-Level Bahasa Melayu semasa meneruskan pengajian di Tingkatan Enam.`;
      ptet.reasonEn = `Congratulations! You have ${totalCredits} O-Level Credits and are eligible to apply for Tutong Sixth Form Centre (PTET). BAHASA MELAYU NOTE: A BM credit is not an absolute barrier for Sixth Form entry — you are permitted to retake your Bahasa Melayu O-Level paper while studying at PTE.`;
    }
  } else if (totalCredits === 3) {
    ptet.status = 'conditional';
    ptet.statusLabelMs = 'Hampir Layak (Kurang 1 Kredit)';
    ptet.statusLabelEn = 'Nearly Eligible (Short 1 Credit)';
    ptet.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
    ptet.reasonMs = `Anda mempunyai 3 kredit O-Level. PTE menerima minimum 4 kredit. Anda boleh menduduki semula 1 kertas O-Level sesi Mei/Jun atau memohon program Diploma IBTE HNTec (Tahap 4) / Kolej Swasta.`;
    ptet.reasonEn = `You have 3 O-Level credits. Sixth Form accepts a minimum of 4 credits. You may resit 1 O-Level paper in the May/June session or consider IBTE HNTec (Level 4) / Private College Diplomas.`;
  } else {
    ptet.status = 'not_eligible';
    ptet.statusLabelMs = 'Belum Mencapai Syarat';
    ptet.statusLabelEn = 'Entry Requirements Not Met';
    ptet.statusColor = 'bg-slate-100 text-slate-700 border-slate-300';
    ptet.reasonMs = `Anda kini mempunyai ${totalCredits} kredit. Pusat Tingkatan Enam (PTET) memerlukan sekurang-kurangnya 4 kredit O-Level.`;
    ptet.reasonEn = `You currently have ${totalCredits} credits. Sixth Form Centres (PTET) require at least 4 O-Level credits.`;
  }

  // Logic Evaluation for Politeknik Brunei (PB)
  const pb = pathways.find((p) => p.id === 'politeknik-brunei')!;
  const hasPureScience = pureScienceCreditCount >= 1;

  if (totalCredits >= 5 && engCredit && mathCredit && hasPureScience) {
    pb.status = 'eligible';
    pb.statusLabelMs = 'Layak Penuh Semua Sekolah PB (Termasuk Sains & Kejuruteraan)';
    pb.statusLabelEn = 'Fully Eligible for All PB Schools (Including Science & Engineering)';
    pb.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    pb.reasonMs = `Cemerlang! Anda mempunyai ${totalCredits} kredit lengkap dengan Kredit Bahasa Inggeris (1123 / IGCSE ESL 0511), Matematik (4024 / IGCSE 0580), dan Sains Tulen (${[
      hasPhysicsCredit ? 'Physics' : '',
      hasChemistryCredit ? 'Chemistry' : '',
      hasBiologyCredit ? 'Biology' : ''
    ].filter(Boolean).join('/')}). Anda layak memohon semua Sekolah di Politeknik Brunei termasuk School of Science and Engineering (Lumut), School of Health Sciences, School of ICT, dan School of Business.`;
    pb.reasonEn = `Excellent! You have ${totalCredits} credits with required Credits in English Language (1123 / IGCSE ESL 0511), Mathematics (4024 / IGCSE 0580), and Pure Science (${[
      hasPhysicsCredit ? 'Physics' : '',
      hasChemistryCredit ? 'Chemistry' : '',
      hasBiologyCredit ? 'Biology' : ''
    ].filter(Boolean).join('/')}). You are eligible for all Schools at Politeknik Brunei including School of Science and Engineering (Lumut), School of Health Sciences, School of ICT, and School of Business.`;
  } else if (totalCredits >= 5 && engCredit && mathCredit && !hasPureScience) {
    pb.status = 'conditional';
    pb.statusLabelMs = 'Layak School of ICT & School of Business Sahaja';
    pb.statusLabelEn = 'Eligible for School of ICT & School of Business Only';
    pb.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
    pb.reasonMs = `Anda mempunyai ${totalCredits} kredit berserta Kredit Bahasa Inggeris dan Matematik. Anda LAYAK untuk program di School of ICT (Cyber Security, Web Dev, Data Analytics) dan School of Business. NOTA PENTING: Untuk School of Science & Engineering (Kejuruteraan Lumut) dan School of Health Sciences, Politeknik Brunei mensyaratkan Sains Tulen (Physics/Chemistry/Biology) — Combined Science (5129) tidak setara dengan subjek Sains Tulen untuk program Kejuruteraan PB.`;
    pb.reasonEn = `You have ${totalCredits} credits with English Language and Mathematics credits. You are ELIGIBLE for School of ICT (Cyber Security, Web Dev, Data Analytics) and School of Business. IMPORTANT NOTE: For School of Science & Engineering (Lumut Engineering) and School of Health Sciences, Politeknik Brunei strictly requires Pure Science credits (Physics/Chemistry/Biology) — Combined Science (5129) is not considered equivalent to Pure Science for PB Engineering programmes.`;
  } else if (totalCredits >= 5 && engCredit && !mathCredit) {
    pb.status = 'conditional';
    pb.statusLabelMs = 'Layak School of Business Sahaja';
    pb.statusLabelEn = 'Eligible for School of Business Only';
    pb.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
    pb.reasonMs = `Anda mempunyai ${totalCredits} kredit berserta Kredit Bahasa Inggeris. Anda layak untuk program Diploma School of Business (Perniagaan, Perakaunan, Pengurusan). Walau bagaimanapun, School of Science & Engineering, School of ICT dan School of Health Sciences memerlukan Kredit Matematik dan Sains Tulen.`;
    pb.reasonEn = `You have ${totalCredits} credits and an English Language credit. You qualify for School of Business Diploma programmes (Business Studies, Accounting, Management). However, School of Science & Engineering, School of ICT and School of Health Sciences require Mathematics credit and Pure Science credits.`;
  } else if (totalCredits >= 5 && !engCredit) {
    pb.status = 'conditional';
    pb.statusLabelMs = 'Bersyarat (Perlu Kredit Bahasa Inggeris)';
    pb.statusLabelEn = 'Conditional (English Language Credit Required)';
    pb.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
    pb.reasonMs = `Anda mempunyai ${totalCredits} kredit tetapi Politeknik Brunei mensyaratkan Kredit Bahasa Inggeris (Gred C6 O-Level / Gred C IGCSE ke atas) untuk semua kemasukan Diploma Level 5. Pertimbangkan untuk mengambil semula kertas Bahasa Inggeris atau memulakan pengajian melalui IBTE HNTec / Kolej Swasta.`;
    pb.reasonEn = `You have ${totalCredits} credits, but Politeknik Brunei strictly mandates an English Language credit (Grade C6 O-Level / Grade C IGCSE or above) across all Level 5 Diploma programmes. Consider resitting the English paper in May/June or progressing via IBTE HNTec / Private Colleges.`;
  } else if (totalCredits >= 3 && totalCredits <= 4) {
    pb.status = 'conditional';
    pb.statusLabelMs = 'Laluan Jambatan Melalui IBTE HNTec (Tahap 4)';
    pb.statusLabelEn = 'Bridging Pathway via IBTE HNTec (Level 4)';
    pb.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
    pb.reasonMs = `Anda mempunyai ${totalCredits} kredit. Anda boleh memasuki IBTE HNTec (Tahap 4) terlebih dahulu selama 2 tahun dan seterusnya menyambung ke Diploma Tahap 5 Politeknik Brunei atau Universiti dengan keputusan cemerlang (GPA > 3.0).`;
    pb.reasonEn = `You have ${totalCredits} credits. You can enter IBTE HNTec (Level 4) for 2 years and subsequently progress into Politeknik Brunei Level 5 Diploma or University with strong academic standing (GPA > 3.0).`;
  } else {
    pb.status = 'not_eligible';
    pb.statusLabelMs = 'Belum Mencapai Syarat Minimum PB';
    pb.statusLabelEn = 'PB Entry Requirements Not Met';
    pb.statusColor = 'bg-slate-100 text-slate-700 border-slate-300';
    pb.reasonMs = `Politeknik Brunei memerlukan sekurang-kurangnya 5 kredit O-Level berserta kredit Bahasa Inggeris (dan Matematik / Sains Tulen bagi kursus teknikal).`;
    pb.reasonEn = `Politeknik Brunei requires at least 5 O-Level credits together with English Language credit (and Mathematics / Pure Science for technical courses).`;
  }

  // Logic Evaluation for IBTE Diploma (Level 5)
  const ibteDip = pathways.find((p) => p.id === 'ibte-diploma');
  if (ibteDip) {
    if (totalCredits >= 5 && engCredit && mathCredit) {
      ibteDip.status = 'eligible';
      ibteDip.statusLabelMs = 'Layak Penuh Diploma IBTE (Tahap 5)';
      ibteDip.statusLabelEn = 'Fully Eligible for IBTE Level 5 Diploma';
      ibteDip.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      ibteDip.reasonMs = `Tahniah! Anda mempunyai ${totalCredits} kredit O-Level berserta Kredit Bahasa Inggeris dan Matematik. Anda layak memohon program Diploma Tahap 5 BDQF di IBTE seperti Diploma Kejuruteraan Marin & Pengajian Nautika (Akademi Maritim Brunei JBC), Kawalan & Automasi, Pengendali Kilang Penapis, Teknologi Maklumat (ICT), Hospitaliti & Seni Kulinari, Agroteknologi, atau Perkhidmatan Perniagaan.`;
      ibteDip.reasonEn = `Congratulations! You have ${totalCredits} O-Level credits with English Language and Mathematics credits. You qualify for BDQF Level 5 Diploma programmes at IBTE including Marine Engineering & Nautical Studies (Brunei Maritime Academy JBC), Control & Automation, Refinery Operator, ICT, Hospitality & Culinary Arts, Agrotechnology, or Business Services.`;
    } else if (totalCredits >= 5 && engCredit && !mathCredit) {
      ibteDip.status = 'conditional';
      ibteDip.statusLabelMs = 'Layak Diploma Hospitaliti & Perniagaan IBTE';
      ibteDip.statusLabelEn = 'Eligible for IBTE Hospitality & Business Diplomas';
      ibteDip.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
      ibteDip.reasonMs = `Anda mempunyai ${totalCredits} kredit O-Level dan Kredit Bahasa Inggeris. Anda layak untuk program Diploma IBTE dalam Pengurusan Hospitaliti dan Perkhidmatan Perniagaan. Walau bagaimanapun, program Kejuruteraan Marin, Nautika dan Automasi memerlukan Kredit Matematik.`;
      ibteDip.reasonEn = `You have ${totalCredits} O-Level credits and an English Language credit. You qualify for IBTE Diplomas in Hospitality Management and Business Services. However, Marine Engineering, Nautical Studies, and Automation require a Mathematics credit.`;
    } else if (totalCredits >= 5 && !engCredit) {
      ibteDip.status = 'conditional';
      ibteDip.statusLabelMs = 'Kredit Bahasa Inggeris Diperlukan';
      ibteDip.statusLabelEn = 'English Credit Required';
      ibteDip.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
      ibteDip.reasonMs = `Anda mempunyai ${totalCredits} kredit O-Level tetapi program Diploma Tahap 5 IBTE mensyaratkan Kredit Bahasa Inggeris (Gred C6/C ke atas). Anda boleh menduduki semula Bahasa Inggeris atau memasuki laluan HNTec Tahap 4 terlebih dahulu.`;
      ibteDip.reasonEn = `You have ${totalCredits} O-Level credits, but IBTE Level 5 Diplomas require an English Language credit (Grade C6/C or better). You may resit English or enter via HNTec Level 4 first.`;
    } else if (totalCredits >= 3 && totalCredits <= 4) {
      ibteDip.status = 'conditional';
      ibteDip.statusLabelMs = 'Laluan Jambatan Melalui HNTec (Tahap 4)';
      ibteDip.statusLabelEn = 'Bridging Pathway via HNTec (Level 4)';
      ibteDip.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
      ibteDip.reasonMs = `Anda mempunyai ${totalCredits} kredit. Program Diploma Tahap 5 memerlukan 5 kredit, namun anda boleh memulakan pengajian di HNTec (Tahap 4) selama 2 tahun di IBTE dan menyambung terus ke Diploma Tahap 5 dengan keputusan cemerlang (GPA > 2.7).`;
      ibteDip.reasonEn = `You have ${totalCredits} credits. Level 5 Diplomas require 5 credits, but you can enter HNTec (Level 4) for 2 years at IBTE and progress directly to Level 5 Diploma with strong academic performance (GPA > 2.7).`;
    } else {
      ibteDip.status = 'not_eligible';
      ibteDip.statusLabelMs = 'Disyorkan Laluan HNTec / NTec';
      ibteDip.statusLabelEn = 'Recommended for HNTec / NTec Track';
      ibteDip.statusColor = 'bg-slate-100 text-slate-700 border-slate-300';
      ibteDip.reasonMs = `Kemasukan terus ke Diploma Tahap 5 IBTE memerlukan sekurang-kurangnya 5 kredit O-Level. Anda disyorkan memohon program HNTec Tahap 4 (3 kredit) atau NTec Tahap 3 terlebih dahulu.`;
      ibteDip.reasonEn = `Direct admission to IBTE Level 5 Diploma requires at least 5 O-Level credits. You are recommended to apply for HNTec Level 4 programmes (minimum 3 credits) or NTec Level 3 first.`;
    }
  }

  // Logic Evaluation for IBTE HNTec
  const hntec = pathways.find((p) => p.id === 'ibte-hntec')!;
  if (totalCredits >= 3) {
    hntec.status = 'eligible';
    hntec.statusLabelMs = 'Layak Penuh HNTec';
    hntec.statusLabelEn = 'Fully Eligible for HNTec';
    hntec.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    hntec.reasonMs = `Tahniah! Anda mempunyai ${totalCredits} kredit (melebihi syarat minimum 3 kredit). Anda layak memilih program HNTec merentasi 7 kampus cawangan IBTE di seluruh Brunei (Sultan Saiful Rijal, Nakhoda Ragam, Mekanikal, Perniagaan, Agro-Teknologi Wasan, Jefri Bolkiah & Sultan Bolkiah).`;
    hntec.reasonEn = `Congratulations! You have ${totalCredits} credits (satisfying the 3 credits requirement). You qualify for HNTec programmes across all 7 IBTE campuses nationwide.`;
  } else if (totalCredits === 2) {
    hntec.status = 'conditional';
    hntec.statusLabelMs = 'Bersyarat / Temu Duga Khas';
    hntec.statusLabelEn = 'Conditional / Special Interview';
    hntec.statusColor = 'bg-amber-100 text-amber-900 border-amber-300';
    hntec.reasonMs = `Anda mempunyai 2 kredit O-Level. Sesetengah program HNTec menerima kemasukan bersyarat berasaskan temu duga kemahiran atau anda boleh memohon program NTec Tahap 3 selama setahun sebelum dinaikkan taraf.`;
    hntec.reasonEn = `You have 2 O-Level credits. Certain HNTec programmes accept conditional entries based on technical interview assessment, or you may enter NTec Level 3 prior to upgrading.`;
  } else {
    hntec.status = 'not_eligible';
    hntec.statusLabelMs = 'Disyorkan NTec';
    hntec.statusLabelEn = 'Recommended for NTec';
    hntec.statusColor = 'bg-slate-100 text-slate-700 border-slate-300';
    hntec.reasonMs = `Syarat HNTec memerlukan sekurang-kurangnya 3 kredit O-Level. Anda disyorkan memohon program NTec Tahap 3.`;
    hntec.reasonEn = `HNTec admission requires at least 3 O-Level credits. You are recommended to apply for NTec Level 3 technical programmes.`;
  }

  // Logic Evaluation for IBTE NTec
  const ntec = pathways.find((p) => p.id === 'ibte-ntec')!;
  if (totalCredits >= 1) {
    ntec.status = 'eligible';
    ntec.statusLabelMs = 'Layak Penuh NTec';
    ntec.statusLabelEn = 'Fully Eligible for NTec';
    ntec.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    ntec.reasonMs = `Anda memenuhi syarat kemasukan program sijil kemahiran teknikal asas NTec di IBTE.`;
    ntec.reasonEn = `You meet the admission criteria for IBTE NTec foundation vocational programmes.`;
  } else {
    ntec.status = 'conditional';
    ntec.statusLabelMs = 'Layak Berasaskan Tamat Tahun 11';
    ntec.statusLabelEn = 'Eligible via Year 11 Completion';
    ntec.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
    ntec.reasonMs = `Pelajar yang menamatkan persekolahan menengah Tahun 11 di SMMH layak memohon program NTec melalui laluan penilaian amali dan temu duga bakat.`;
    ntec.reasonEn = `Students completing Year 11 secondary schooling at SMMH qualify for NTec programmes through practical talent assessments and aptitude interviews.`;
  }

  // Logic Evaluation for Apprenticeship
  const app = pathways.find((p) => p.id === 'ibte-apprenticeship')!;
  if (totalCredits >= 2) {
    app.status = 'eligible';
    app.statusLabelMs = 'Sangat Disyorkan (Peluang Tajaan Penuh)';
    app.statusLabelEn = 'Highly Recommended (Full Sponsorship Opportunity)';
    app.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    app.reasonMs = `Keputusan anda sangat sesuai untuk permohonan skim perantisan industri minyak, gas & kejuruteraan tenaga di Brunei.`;
    app.reasonEn = `Your qualifications are well-suited for industry-sponsored oil, gas & energy apprenticeships in Brunei.`;
  } else {
    app.status = 'conditional';
    app.statusLabelMs = 'Layak Mengikuti Ujian Temu Duga';
    app.statusLabelEn = 'Eligible for Aptitude & Interview Test';
    app.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
    app.reasonMs = `Terbuka kepada lulusan Tahun 11 SMMH yang melepasi tapisan kecergasan fizikal dan pemeriksaan kesihatan industri.`;
    app.reasonEn = `Open to SMMH Year 11 leavers who meet physical fitness benchmarks and pass industrial medical health examinations.`;
  }

  // Logic Evaluation for Private Colleges (CCCT / Micronet / LCB)
  const ccct = pathways.find((p) => p.id === 'private-colleges-ccct');
  if (ccct) {
    if (totalCredits >= 4) {
      ccct.status = 'eligible';
      ccct.statusLabelMs = 'Layak Terus (Peringkat Diploma Level 5)';
      ccct.statusLabelEn = 'Directly Eligible (Level 5 Diploma)';
      ccct.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      ccct.reasonMs = `Dengan ${totalCredits} kredit O-Level, anda layak terus memohon program Diploma BDQF Tahap 5 / Pearson BTEC di institusi swasta seperti CCCT, Micronet, dan LCB.`;
      ccct.reasonEn = `With ${totalCredits} O-Level credits, you are directly eligible for BDQF Level 5 Diploma / Pearson BTEC courses at private institutions including CCCT, Micronet, and LCB.`;
    } else if (totalCredits >= 1) {
      ccct.status = 'eligible';
      ccct.statusLabelMs = 'Layak Peringkat Sijil / Foundation';
      ccct.statusLabelEn = 'Eligible for Certificate / Foundation Level';
      ccct.statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      ccct.reasonMs = `Anda memenuhi syarat kemasukan program Sijil Asas / BTEC Level 3 di CCCT (Cosmopolitan College) dan kolej swasta berakreditasi.`;
      ccct.reasonEn = `You meet entry criteria for Foundation Certificate / BTEC Level 3 programmes at CCCT (Cosmopolitan College) and accredited private colleges.`;
    } else {
      ccct.status = 'conditional';
      ccct.statusLabelMs = 'Laluan Kemasukan Khas / Asas';
      ccct.statusLabelEn = 'Special Access / Foundation Pathway';
      ccct.statusColor = 'bg-blue-100 text-blue-800 border-blue-300';
      ccct.reasonMs = `Laluan program asas khas terbuka kepada lulusan Tahun 11 SMMH yang ingin membina kemahiran dalam bidang IT dan Perniagaan di CCCT.`;
      ccct.reasonEn = `Special foundation access is available for SMMH Year 11 school-leavers seeking skills in IT and Business at CCCT.`;
    }
  }

  return pathways;
}
