export type PathwayStream = 'academic' | 'polytechnic' | 'tvet' | 'private' | 'apprenticeship' | 'direct_career';

export interface VisualPathwayNode {
  id: string;
  stream: PathwayStream;
  stageLevel: 'entry' | 'post_secondary' | 'higher_diploma' | 'degree_university' | 'career_industry';
  stageOrder: number;
  titleMs: string;
  titleEn: string;
  institutionMs: string;
  institutionEn: string;
  qualificationMs: string;
  qualificationEn: string;
  bdqfLevel: string;
  durationMs: string;
  durationEn: string;
  minCredits: number;
  entryRequirementMs: string;
  entryRequirementEn: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
  };
  summaryMs: string;
  summaryEn: string;
  keyFieldsMs: string[];
  keyFieldsEn: string[];
  progressionNextMs: string[];
  progressionNextEn: string[];
  careerOutcomesMs: string[];
  careerOutcomesEn: string[];
  tags: string[];
  connectsTo: string[]; // Node IDs that this node flows into
}

export interface PathwayComparisonMetric {
  id: string;
  titleMs: string;
  titleEn: string;
  academicTrack: string;
  polytechnicTrack: string;
  tvetTrack: string;
  privateTrack: string;
  apprenticeshipTrack: string;
}

export const VISUAL_PATHWAY_NODES: VisualPathwayNode[] = [
  // 1. ENTRY NODE
  {
    id: 'entry-olevel',
    stream: 'academic',
    stageLevel: 'entry',
    stageOrder: 1,
    titleMs: 'Keputusan Peperiksaan O-Level / IGCSE / SMMH',
    titleEn: 'O-Level / IGCSE / SMMH Examination Results',
    institutionMs: 'Sekolah Menengah Muda Hashim Tutong (SMMH)',
    institutionEn: 'Muda Hashim Secondary School Tutong (SMMH)',
    qualificationMs: 'Cambridge GCE O-Level / IGCSE / Sijil Menengah',
    qualificationEn: 'Cambridge GCE O-Level / IGCSE / Secondary Certificate',
    bdqfLevel: 'BDQF Tahap 2 - 3',
    durationMs: 'Tamat Menengah Atas (Tahun 11)',
    durationEn: 'Upper Secondary Completion (Year 11)',
    minCredits: 0,
    entryRequirementMs: 'Semua pelajar lepasan Tahun 11 SMMH mengikut bilangan kredit O-Level yang dicapai.',
    entryRequirementEn: 'All Year 11 SMMH graduating students based on earned O-Level credit tally.',
    colorTheme: {
      bg: 'bg-slate-900',
      border: 'border-amber-400',
      text: 'text-amber-300',
      badge: 'bg-amber-400 text-slate-950 font-black',
      glow: 'shadow-amber-500/20'
    },
    summaryMs: 'Titik permulaan utama bagi setiap pelajar Tahun 11 SMMH. Berdasarkan bilangan kredit subjek yang diperoleh (0 hingga 8+ kredit), pelajar boleh memilih 5 cabang laluan lepasan menengah di Brunei.',
    summaryEn: 'The primary launchpad for every SMMH Year 11 student. Based on credit passes attained (0 to 8+ credits), students can navigate across 5 distinct post-secondary progression streams.',
    keyFieldsMs: ['Bahasa Melayu', 'English Language', 'Mathematics D', 'Sains Tulen / Gabungan', 'Kemanusiaan / Vokasional'],
    keyFieldsEn: ['Malay Language', 'English Language', 'Mathematics D', 'Pure / Combined Sciences', 'Humanities / Vocational'],
    progressionNextMs: ['Pusat Tingkatan Enam (PTET)', 'Politeknik Brunei (PB)', 'IBTE (HNTec/NTec)', 'Kolej Swasta (CCCT/Micronet/LCB/IGS)', 'Perantisan Industri / Kerjaya Terus'],
    progressionNextEn: ['Sixth Form Centre (PTET)', 'Politeknik Brunei (PB)', 'IBTE (HNTec/NTec)', 'Private Colleges (CCCT/Micronet/LCB/IGS)', 'Industry Apprenticeship / Direct Careers'],
    careerOutcomesMs: ['Menentukan kelayakan kemasukan institusi pengajian tinggi atau latihan vokasional'],
    careerOutcomesEn: ['Determines admission pathways into higher education or vocational apprenticeships'],
    tags: ['O-Level', 'Tahun 11', 'Asas Keputusan'],
    connectsTo: ['track-sixthform', 'track-polytechnic', 'track-ibte-hntec', 'track-ibte-ntec', 'track-private-foundation', 'track-private-diploma', 'track-isq-apprentice', 'track-direct-uniformed']
  },

  // 2. STREAM A: SIXTH FORM (PTET / A-LEVELS)
  {
    id: 'track-sixthform',
    stream: 'academic',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'Pusat Tingkatan Enam (PTET / Maktab Duli / PTE Sengkurong)',
    titleEn: 'Sixth Form Centres (PTET / Maktab Duli / PTE Sengkurong)',
    institutionMs: 'Pusat Tingkatan Enam Tutong (PTET) & Pusat Tingkatan Enam Kerajaan',
    institutionEn: 'Tutong Sixth Form Centre (PTET) & Government Sixth Form Centres',
    qualificationMs: 'Cambridge GCE Advanced Level (A-Levels)',
    qualificationEn: 'Cambridge GCE Advanced Level (A-Levels)',
    bdqfLevel: 'BDQF Tahap 4 (Pra-Universiti)',
    durationMs: '2 Tahun',
    durationEn: '2 Years',
    minCredits: 4,
    entryRequirementMs: 'Minimum 4 hingga 5 Kredit O-Level berkaitan. (Kredit Bahasa Melayu bukan syarat am mutlak — pelajar dibenarkan mengambil semula/retake peperiksaan BM O-Level semasa belajar di Tingkatan Enam).',
    entryRequirementEn: 'Minimum 4 to 5 relevant O-Level Credits. (Bahasa Melayu credit is not a strict requirement — students are permitted to retake the BM O-Level exam while studying in Sixth Form).',
    colorTheme: {
      bg: 'bg-sky-900',
      border: 'border-sky-500',
      text: 'text-sky-200',
      badge: 'bg-sky-500 text-white font-bold',
      glow: 'shadow-sky-500/20'
    },
    summaryMs: 'Laluan akademik berprestij tinggi yang memfokuskan kepada teori mendalam dalam 3 hingga 4 subjek A-Level bagi persediaan terus ke program Ijazah Sarjana Muda Universiti.',
    summaryEn: 'The traditional high-academic route focusing on rigorous mastery in 3 to 4 Cambridge A-Level subjects, engineered specifically for direct entry into University Bachelor Degrees.',
    keyFieldsMs: ['Sains (Biologi, Kimia, Fizik)', 'Matematik & Statistik', 'Kemanusiaan (Sejarah, Geografi, Sosiologi)', 'Perniagaan & Ekonomi', 'Syariah / Usuluddin'],
    keyFieldsEn: ['Sciences (Biology, Chemistry, Physics)', 'Mathematics & Further Maths', 'Humanities (History, Geography, Sociology)', 'Business & Economics', 'Shariah / Islamic Studies'],
    progressionNextMs: ['Universiti Tempatan (UBD, UTB, UNISSA, KUPU SB)', 'Biasiswa Kerajaan Ke Luar Negara (MOE Scholarship)'],
    progressionNextEn: ['Local Universities (UBD, UTB, UNISSA, KUPU SB)', 'Overseas Government Scholarships (MOE / MinDef)'],
    careerOutcomesMs: ['Laluan ke Kerjaya Profesional: Doktor Perubatan, Peguam, Jurutera Bertauliah, Saintis, Pegawai Tadbir Diplomatik'],
    careerOutcomesEn: ['Gateway to Licensed Professional Careers: Medical Doctor, Lawyer, Chartered Engineer, Research Scientist, Diplomatic Officer'],
    tags: ['A-Level', 'PTET', '5 Kredit', 'Akademik', 'Universiti'],
    connectsTo: ['dest-university-local', 'dest-university-overseas']
  },

  // 3. STREAM B: POLITEKNIK BRUNEI (DIPLOMA LEVEL 5)
  {
    id: 'track-polytechnic',
    stream: 'polytechnic',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'Politeknik Brunei (PB)',
    titleEn: 'Politeknik Brunei (PB)',
    institutionMs: 'Politeknik Brunei (Kampus Ong Sum Ping & Lumut)',
    institutionEn: 'Politeknik Brunei (Ong Sum Ping & Lumut Campuses)',
    qualificationMs: 'Diploma Tahap 5 BDQF (Perniagaan, ICT, Kejuruteraan, Kesihatan)',
    qualificationEn: 'BDQF Level 5 Diploma (Business, ICT, Engineering, Health)',
    bdqfLevel: 'BDQF Tahap 5 (Diploma)',
    durationMs: '2.5 - 3 Tahun',
    durationEn: '2.5 - 3 Years',
    minCredits: 5,
    entryRequirementMs: 'Minimum 5 Kredit O-Level berkaitan (Wajib Kredit Bahasa Inggeris 1123 untuk semua sekolah; School of Science & Engineering Lumut & Kesihatan WAJIB Sains Tulen: Physics/Chemistry/Biology; Combined Science 5129 tidak diterima untuk kejuruteraan).',
    entryRequirementEn: 'Minimum 5 relevant O-Level Credits (Mandatory English 1123 Credit for all schools; School of Science & Engineering Lumut & Health Sciences MANDATES Pure Science: Physics/Chemistry/Biology; Combined Science 5129 is not accepted for engineering).',
    colorTheme: {
      bg: 'bg-emerald-950',
      border: 'border-emerald-500',
      text: 'text-emerald-200',
      badge: 'bg-emerald-500 text-slate-950 font-bold',
      glow: 'shadow-emerald-500/20'
    },
    summaryMs: 'Laluan teknikal & vokasional peringkat tinggi (Higher TVET) yang menggabungkan 70% amali industri dan 30% teori, diiktiraf tinggi oleh industri Brunei.',
    summaryEn: 'Premier Higher TVET pathway blending 70% practical industry competency with 30% applied theory, highly sought after by local industry employers.',
    keyFieldsMs: [
      'School of Business (Perakaunan, Pemasaran, Perbankan Islam, Sumber Manusia)',
      'School of ICT (Sains Data, Pembangunan Web, Rangkaian, Keselamatan Siber)',
      'School of Science & Engineering (Awam, Elektrik & Elektronik, Mekanikal, Petroleum)',
      'School of Health Sciences (Kejururawatan, Paramedik, Farmasi)'
    ],
    keyFieldsEn: [
      'School of Business (Accounting, Marketing, Islamic Banking, HRM)',
      'School of ICT (Data Analytics, Web Development, Cloud Networking, Cybersecurity)',
      'School of Science & Engineering (Civil, Electrical, Mechanical, Petroleum Engineering)',
      'School of Health Sciences (Nursing, Paramedic, Pharmacy Technician)'
    ],
    progressionNextMs: ['Kemasukan Lanjutan (Advanced Standing Year 2) ke UTB / UBD', 'Pasaran Pekerjaan Eksekutif Teknikal'],
    progressionNextEn: ['Advanced Standing (Direct Year 2) into UTB / UBD Bachelor Degrees', 'Direct High-Demand Technical Industry Careers'],
    careerOutcomesMs: ['Penolong Jurutera', 'Penganalisis Sistem IT', 'Jururawat Hospital', 'Eksekutif Kewangan', 'Pegawai Kualiti (QA/QC)'],
    careerOutcomesEn: ['Assistant Engineer', 'IT Systems Analyst', 'Registered Nurse', 'Finance Executive', 'QA/QC Technical Officer'],
    tags: ['Politeknik', 'Diploma Level 5', '4-5 Kredit', 'Praktikal Industri'],
    connectsTo: ['dest-university-local', 'dest-career-industry']
  },

  // 4. STREAM C: IBTE HNTEC (BDQF LEVEL 4)
  {
    id: 'track-ibte-hntec',
    stream: 'tvet',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'IBTE HNTec (Higher National Technical Education Certificate)',
    titleEn: 'IBTE HNTec (Higher National Technical Education Certificate)',
    institutionMs: 'Institut Pendidikan Teknikal Brunei (IBTE - Semua Kampus)',
    institutionEn: 'Institute of Brunei Technical Education (IBTE - All Campuses)',
    qualificationMs: 'HNTec (Sijil Pendidikan Teknikal Kebangsaan Tinggi)',
    qualificationEn: 'HNTec (Higher National Technical Education Certificate)',
    bdqfLevel: 'BDQF Tahap 4',
    durationMs: '2 Tahun',
    durationEn: '2 Years',
    minCredits: 3,
    entryRequirementMs: 'Minimum 3 hingga 4 Kredit O-Level (termasuk Matematik atau Sains mengikut kursus teknikal).',
    entryRequirementEn: 'Minimum 3 to 4 O-Level Credits (including Mathematics or Science for technical fields).',
    colorTheme: {
      bg: 'bg-amber-950',
      border: 'border-amber-500',
      text: 'text-amber-200',
      badge: 'bg-amber-500 text-slate-950 font-bold',
      glow: 'shadow-amber-500/20'
    },
    summaryMs: 'Program kemahiran teknikal lanjutan peringkat kebangsaan dengan latihan praktikal bengkel, teknologi moden, dan latihan industri wajib 6 bulan.',
    summaryEn: 'National advanced technical certificate featuring hands-on workshop competencies, modern engineering equipment, and a mandatory 6-month industrial internship.',
    keyFieldsMs: [
      'Kejuruteraan Automotif & Kenderaan Berat',
      'Kejuruteraan Bangunan & Perkhidmatan Bangunan',
      'Rangkaian Komputer & Teknologi Maklumat',
      'Hospitaliti & Pengurusan Acara',
      'Operasi Loji & Penyelenggaraan Mekanikal'
    ],
    keyFieldsEn: [
      'Automotive & Heavy Vehicle Technology',
      'Building Engineering & Building Services',
      'Computer Networking & Information Technology',
      'Hospitality Management & Culinary',
      'Plant Operations & Mechanical Maintenance'
    ],
    progressionNextMs: ['Menyambung ke Diploma BDQF Tahap 5 di Politeknik Brunei', 'Kerjaya Juruteknik Kanan & Penyelia Industri'],
    progressionNextEn: ['Articulation into BDQF Level 5 Diploma at Politeknik Brunei', 'Senior Technician & Industrial Supervisory Roles'],
    careerOutcomesMs: ['Juruteknik Kanan Automotif', 'Penyelia Penyelenggaraan Loji', 'Juruteknik Rangkaian IT', 'Penyelia Hospitaliti'],
    careerOutcomesEn: ['Senior Automotive Technician', 'Plant Maintenance Supervisor', 'IT Network Technician', 'Hospitality Operations Supervisor'],
    tags: ['IBTE', 'HNTec', 'Level 4', '3-4 Kredit', 'Kemahiran Teknikal'],
    connectsTo: ['track-polytechnic', 'dest-career-industry']
  },

  // 5. STREAM D: IBTE NTEC & ISQ APPRENTICESHIP (BDQF LEVEL 3)
  {
    id: 'track-ibte-ntec',
    stream: 'tvet',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'IBTE NTec (National Technical Education Certificate)',
    titleEn: 'IBTE NTec (National Technical Education Certificate)',
    institutionMs: 'Institut Pendidikan Teknikal Brunei (IBTE Kampus Mekanikal / Sultan Saiful Rijal / Jefri Bolkiah)',
    institutionEn: 'IBTE Mechanical / Sultan Saiful Rijal / Jefri Bolkiah Campuses',
    qualificationMs: 'NTec (Sijil Pendidikan Teknikal Kebangsaan)',
    qualificationEn: 'NTec (National Technical Education Certificate)',
    bdqfLevel: 'BDQF Tahap 3',
    durationMs: '2 Tahun',
    durationEn: '2 Years',
    minCredits: 1,
    entryRequirementMs: '1 hingga 2 Kredit O-Level atau lulus Tahun 11 SMMH.',
    entryRequirementEn: '1 to 2 O-Level Credits or successful completion of Year 11 SMMH.',
    colorTheme: {
      bg: 'bg-orange-950',
      border: 'border-orange-500',
      text: 'text-orange-200',
      badge: 'bg-orange-500 text-slate-950 font-bold',
      glow: 'shadow-orange-500/20'
    },
    summaryMs: 'Latihan asas vokasional yang berfokus kepada kemahiran kerja tangan praktikal (hands-on) di bengkel dan makmal untuk memenuhi keperluan tenaga kerja mahir tempatan.',
    summaryEn: 'Fundamental vocational training emphasizing hands-on trade craftsmanship in specialized workshops to fulfill national skilled workforce demand.',
    keyFieldsMs: ['Penyamanan Udara & Penyejukan', 'Pemesinan & Fabrikasi Logam', 'Penyediaan Makanan & Pastri', 'Penyelenggaraan Elektrik Asas'],
    keyFieldsEn: ['Air Conditioning & Refrigeration', 'Machining & Metal Fabrication', 'Food Preparation & Bakery', 'Basic Electrical Installation'],
    progressionNextMs: ['Menyambung ke IBTE HNTec (BDQF Level 4) setelah tamat dengan cemerlang', 'Tenaga Kerja Mahir Industri'],
    progressionNextEn: ['Progression into IBTE HNTec (Level 4) upon merit completion', 'Certified Skilled Trade Workforce'],
    careerOutcomesMs: ['Juruteknik Hawa Dingin', 'Jurumesin Fabrikasi Logam', 'Tukang Masak Restoran', 'Juruteknik Pendawaian'],
    careerOutcomesEn: ['HVAC Air-Conditioning Technician', 'Metal Fabricator / Machinist', 'Commercial Restaurant Cook', 'Certified Wireman'],
    tags: ['IBTE', 'NTec', 'Level 3', '1-2 Kredit', 'Vokasional Amali'],
    connectsTo: ['track-ibte-hntec', 'dest-career-industry']
  },

  // 6. STREAM E: PRIVATE INSTITUTIONS - FOUNDATION (CCCT, MICRONET, LCB, IGS, BICPA)
  {
    id: 'track-private-foundation',
    stream: 'private',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'Kolej Swasta: Program Foundation & Sijil (CCCT / Micronet / LCB / IGS)',
    titleEn: 'Private Colleges: Foundation & Certificate Programmes (CCCT / Micronet / LCB / IGS)',
    institutionMs: 'CCCT, Micronet International College, LCB, Kolej IGS, BICPA-FTMS',
    institutionEn: 'CCCT, Micronet International College, LCB, Kolej IGS, BICPA-FTMS',
    qualificationMs: 'Sijil Asas Antarabangsa / Foundation / Sijil BDQF Tahap 3 & 4',
    qualificationEn: 'International Foundation Certificate / BDQF Level 3 & 4 Certificates',
    bdqfLevel: 'BDQF Tahap 3 - 4',
    durationMs: '1 Tahun',
    durationEn: '1 Year',
    minCredits: 1,
    entryRequirementMs: '1 hingga 3 Kredit O-Level (Laluan kemasukan anjal dan terbuka untuk lepasan Tahun 11).',
    entryRequirementEn: '1 to 3 O-Level Credits (Flexible and welcoming entry gateway for Year 11 leavers).',
    colorTheme: {
      bg: 'bg-purple-950',
      border: 'border-purple-500',
      text: 'text-purple-200',
      badge: 'bg-purple-500 text-white font-bold',
      glow: 'shadow-purple-500/20'
    },
    summaryMs: 'Laluan pantas persediaan yang menjimatkan masa untuk pelajar melangkah terus ke peringkat Diploma Tinggi atau Ijazah tanpa perlu menunggu keputusan ulangan O-Level.',
    summaryEn: 'An accelerated pathway allowing students to fast-track directly into Higher Diplomas and Degree routes without losing academic momentum.',
    keyFieldsMs: [
      'Foundation in Information Technology (CCCT / Micronet)',
      'Foundation in Business Administration (CCCT / LCB / IGS)',
      'International Foundation Programme (Chester UK di LCB)',
      'Certificate in Art & Design (Kolej IGS)',
      'ACCA FIA / CAT (BICPA-FTMS)'
    ],
    keyFieldsEn: [
      'Foundation in Information Technology (CCCT / Micronet)',
      'Foundation in Business Administration (CCCT / LCB / IGS)',
      'International Foundation Programme (University of Chester UK at LCB)',
      'Certificate in Art & Design (Kolej IGS)',
      'ACCA FIA / CAT (BICPA-FTMS)'
    ],
    progressionNextMs: ['Menyambung terus ke Diploma BDQF Tahap 5 di kolej yang sama', 'Menyambung ke Ijazah Sarjana Muda UK di LCB'],
    progressionNextEn: ['Direct progression into BDQF Level 5 Diploma at the same college', 'Direct progression into UK Bachelor Degrees at LCB'],
    careerOutcomesMs: ['Pembantu Sokongan Komputer', 'Kerani Pentadbiran Perniagaan', 'Pembantu Reka Bentuk'],
    careerOutcomesEn: ['Junior Computing Support Clerk', 'Administrative Business Clerk', 'Junior Graphic Assistant'],
    tags: ['Kolej Swasta', 'Foundation', '1-3 Kredit', 'Laluan Pantas', 'CCCT', 'Micronet', 'LCB', 'IGS'],
    connectsTo: ['track-private-diploma', 'dest-university-private']
  },

  // 7. STREAM F: PRIVATE INSTITUTIONS - DIPLOMA BDQF LEVEL 5 (CCCT, MICRONET, LCB, IGS)
  {
    id: 'track-private-diploma',
    stream: 'private',
    stageLevel: 'higher_diploma',
    stageOrder: 3,
    titleMs: 'Kolej Swasta: Diploma BDQF Tahap 5 & Pearson BTEC HND UK',
    titleEn: 'Private Colleges: BDQF Level 5 Diploma & Pearson BTEC HND UK',
    institutionMs: 'CCCT, Micronet International College, LCB, Kolej IGS',
    institutionEn: 'CCCT, Micronet International College, LCB, Kolej IGS',
    qualificationMs: 'Diploma Tahap 5 BDQF / Pearson BTEC Level 5 Higher National Diploma (HND)',
    qualificationEn: 'BDQF Level 5 Diploma / Pearson BTEC Level 5 Higher National Diploma (HND)',
    bdqfLevel: 'BDQF Tahap 5 (Diploma)',
    durationMs: '2 - 2.5 Tahun',
    durationEn: '2 - 2.5 Years',
    minCredits: 4,
    entryRequirementMs: '4 Kredit O-Level ATAU Lulus Program Foundation di kolej swasta.',
    entryRequirementEn: '4 O-Level Credits OR Pass in College Foundation Programme.',
    colorTheme: {
      bg: 'bg-indigo-950',
      border: 'border-indigo-500',
      text: 'text-indigo-200',
      badge: 'bg-indigo-500 text-white font-bold',
      glow: 'shadow-indigo-500/20'
    },
    summaryMs: 'Kelayakan antarabangsa berkembar UK yang diiktiraf di seluruh dunia, memberi hak kemasukan terus ke Tahun Akhir (Final Year Top-Up) Ijazah Sarjana Muda di universiti UK atau Australia.',
    summaryEn: 'Globally recognized UK dual qualifications offering direct articulation rights into the Final Year (Top-Up) of UK and Australian Bachelor Honours Degrees.',
    keyFieldsMs: [
      'Diploma in IT & Software Engineering (CCCT / Micronet)',
      'Diploma in Business Management & Marketing (CCCT / LCB)',
      'Diploma in Hospitality Management & Culinary Arts (LCB)',
      'Diploma in Creative Multimedia & Broadcasting (CCCT / IGS)',
      'Diploma in Cyber Security & Network Engineering (Micronet)'
    ],
    keyFieldsEn: [
      'Diploma in IT & Software Engineering (CCCT / Micronet)',
      'Diploma in Business Management & Marketing (CCCT / LCB)',
      'Diploma in Hospitality Management & Culinary Arts (LCB)',
      'Diploma in Creative Multimedia & Broadcasting (CCCT / IGS)',
      'Diploma in Cyber Security & Network Engineering (Micronet)'
    ],
    progressionNextMs: ['Menyambung ke Ijazah Sarjana Muda UK (Final Year Top-Up di UK atau secara 3+0 di Brunei)', 'Peluang Pasaran Kerja Korporat'],
    progressionNextEn: ['Direct Entry to Final Year Top-Up Bachelor Degree in UK / 3+0 in Brunei', 'Corporate Industry Employment'],
    careerOutcomesMs: ['Pembangun Perisian', 'Eksekutif Pemasaran Digital', 'Pengurus Acara Hotel', 'Pereka Multimedia UI/UX'],
    careerOutcomesEn: ['Software Developer', 'Digital Marketing Executive', 'Hotel Operations & Events Lead', 'UI/UX Multimedia Designer'],
    tags: ['BTEC HND', 'Level 5', 'Kolej Swasta', 'Top-Up UK', 'CCCT', 'LCB', 'Micronet'],
    connectsTo: ['dest-university-private', 'dest-career-industry']
  },

  // 8. STREAM G: INDUSTRIAL APPRENTICESHIP (ISQ / EICF ENERGY)
  {
    id: 'track-isq-apprentice',
    stream: 'apprenticeship',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'Skim Perantisan Industri & Sektor Tenaga (ISQ / EICF)',
    titleEn: 'Industry Apprenticeship & Energy Sector (ISQ / EICF)',
    institutionMs: 'IBTE & Sektor Tenaga Brunei (BSP, Megamas, Adinin, Muara Port)',
    institutionEn: 'IBTE & Brunei Energy Sector (BSP, Megamas, Adinin, Muara Port)',
    qualificationMs: 'Industry Skills Qualification (ISQ Level 2) & Sijil Latihan Industri',
    qualificationEn: 'Industry Skills Qualification (ISQ Level 2) & Industrial Certifications',
    bdqfLevel: 'BDQF Tahap 2',
    durationMs: '1 - 1.5 Tahun',
    durationEn: '1 - 1.5 Years',
    minCredits: 0,
    entryRequirementMs: 'Lepasan Tahun 11 SMMH, berumur 17 tahun ke atas, lulus ujian kecergasan fizikal dan pemeriksaan perubatan luar pantai (Offshore Medical).',
    entryRequirementEn: 'Year 11 SMMH completion, age 17+, passing physical fitness assessment and offshore medical clearance.',
    colorTheme: {
      bg: 'bg-rose-950',
      border: 'border-rose-500',
      text: 'text-rose-200',
      badge: 'bg-rose-500 text-white font-bold',
      glow: 'shadow-rose-500/20'
    },
    summaryMs: 'Laluan latihan teknikal berat yang berorientasikan kerjaya pantas di loji minyak dan gas darat serta platform luar pantai dengan tajaan pensijilan keselamatan industri.',
    summaryEn: 'Fast-track heavy technical apprenticeship training designed for direct placement in onshore oil & gas terminals, refineries, and offshore exploration platforms.',
    keyFieldsMs: ['Rigging & Slinging', 'Welding & Fabrications (6G)', 'Scaffolding Erection', 'Blaster Painter & Insulation', 'Marker Fitter'],
    keyFieldsEn: ['Rigging & Slinging', 'Welding & Fabrications (6G)', 'Scaffolding Erection', 'Blaster Painter & Insulation', 'Marker Fitter'],
    progressionNextMs: ['Penempatan Pekerjaan Terus bersama Kontraktor Minyak & Gas Brunei'],
    progressionNextEn: ['Direct Contract Placement with Tier-1 Oil & Gas Operators'],
    careerOutcomesMs: ['Juru Kimpal Berkanun 6G', 'Penyelia Scaffolder Luar Pantai', 'Rigger Loji Tenaga', 'Pemeriksa NDT'],
    careerOutcomesEn: ['Certified 6G High-Pressure Welder', 'Offshore Scaffolding Lead', 'Rig Operations Rigger', 'NDT Inspection Assistant'],
    tags: ['Minyak & Gas', 'ISQ', 'Luar Pantai', 'Latihan Pantas'],
    connectsTo: ['dest-career-industry']
  },

  // 9. STREAM H: DIRECT UNIFORMED SERVICES (ABDB / POLICE / PPDB)
  {
    id: 'track-direct-uniformed',
    stream: 'direct_career',
    stageLevel: 'post_secondary',
    stageOrder: 2,
    titleMs: 'Pasukan Beruniform: ABDB, Polis Diraja, Bomba & Penjara',
    titleEn: 'Uniformed Services: RBAF, Royal Brunei Police, Fire & Rescue',
    institutionMs: 'Akademi Pertahanan ABDB (Tanah Jambu) / Pusat Latihan Polis Gadong',
    institutionEn: 'RBAF Defence Academy (Tanah Jambu) / Police Training Centre Gadong',
    qualificationMs: 'Perajurit Muda ABDB / Rekrut Konstabel PPDB',
    qualificationEn: 'RBAF Recruit / Police Constable Recruit',
    bdqfLevel: 'Perkhidmatan Awam & Pertahanan',
    durationMs: '6 - 9 Bulan Latihan Asas Ketenteraan/Polis',
    durationEn: '6 - 9 Months Basic Military/Police Training',
    minCredits: 2,
    entryRequirementMs: 'Minimum 2 hingga 4 Kredit O-Level (Kredit Bahasa Melayu wajib), ketinggian & BMI menepati piawaian kecergasan fizikal kebangsaan.',
    entryRequirementEn: 'Minimum 2 to 4 O-Level Credits (Malay Credit mandatory), meeting national height, eyesight, and physical fitness criteria.',
    colorTheme: {
      bg: 'bg-cyan-950',
      border: 'border-cyan-500',
      text: 'text-cyan-200',
      badge: 'bg-cyan-500 text-slate-950 font-bold',
      glow: 'shadow-cyan-500/20'
    },
    summaryMs: 'Laluan berkhidmat untuk negara dengan skim perkhidmatan beruniform tetap, perlindungan perubatan kerajaan, dan peluang kenaikan pangkat.',
    summaryEn: 'National service career pathway offering permanent civil establishment, full medical coverage, tactical specialized warfare training, and structured promotion ladders.',
    keyFieldsMs: ['Tentera Darat Diraja Brunei (TDDB)', 'Tentera Laut Diraja Brunei (TLDB)', 'Tentera Udara Diraja Brunei (TUDB)', 'Pasukan Polis Diraja Brunei (PPDB)'],
    keyFieldsEn: ['Royal Brunei Land Force (RBLF)', 'Royal Brunei Navy (RBN)', 'Royal Brunei Air Force (RBAirF)', 'Royal Brunei Police Force (RBPF)'],
    progressionNextMs: ['Latihan Khas Komando / Pemandu Bot Rondaan / Cawangan Penyiasatan Jenayah'],
    progressionNextEn: ['Special Forces Qualification / Naval Coastal Patrol / Criminal Investigation Dept'],
    careerOutcomesMs: ['Anggota Tentera Tetap', 'Konstabel Polis Diraja', 'Ahli Bomba & Penyelamat', 'Pegawai Kastam'],
    careerOutcomesEn: ['Permanent Regular Soldier', 'Police Constable', 'Fire & Rescue Operative', 'Customs Prevention Officer'],
    tags: ['ABDB', 'Polis', 'Beruniform', 'Kerjaya Tetap'],
    connectsTo: ['dest-career-industry']
  },

  // 10. HIGHER DESTINATIONS - LOCAL UNIVERSITIES
  {
    id: 'dest-university-local',
    stream: 'academic',
    stageLevel: 'degree_university',
    stageOrder: 4,
    titleMs: 'Universiti Tempatan (UBD, UTB, UNISSA, KUPU SB)',
    titleEn: 'Local Universities (UBD, UTB, UNISSA, KUPU SB)',
    institutionMs: 'Universiti Brunei Darussalam, Universiti Teknologi Brunei, UNISSA, KUPU SB',
    institutionEn: 'Universiti Brunei Darussalam, Universiti Teknologi Brunei, UNISSA, KUPU SB',
    qualificationMs: 'Ijazah Sarjana Muda (Bachelor Degree Hons) BDQF Tahap 6',
    qualificationEn: 'Bachelor Degree Honours (BDQF Level 6)',
    bdqfLevel: 'BDQF Tahap 6 (Ijazah Sarjana Muda)',
    durationMs: '3 - 4 Tahun',
    durationEn: '3 - 4 Years',
    minCredits: 5,
    entryRequirementMs: 'Mata Tarif A-Level yang mencukupi (cth. 160-240 mata) ATAU Diploma BDQF Tahap 5 yang cemerlang dari Politeknik Brunei.',
    entryRequirementEn: 'Sufficient A-Level Tariff Points (e.g. 160-240 points) OR Merit BDQF Level 5 Diploma from Politeknik Brunei.',
    colorTheme: {
      bg: 'bg-blue-950',
      border: 'border-blue-400',
      text: 'text-blue-200',
      badge: 'bg-blue-400 text-slate-950 font-bold',
      glow: 'shadow-blue-500/20'
    },
    summaryMs: 'Pendidikan tinggi ijazah universiti kebangsaan yang menyediakan kepakaran mendalam untuk memimpin sektor awam, industri korporat dan akademik Brunei Darussalam.',
    summaryEn: 'National degree higher education preparing graduates to lead the public sector, corporate industries, and academic fields across Brunei Darussalam.',
    keyFieldsMs: ['Sains Komputer & AI', 'Kejuruteraan Petroleum & Awam', 'Perubatan & Sains Kesihatan', 'Undang-Undang & Syariah', 'Perniagaan & Kewangan'],
    keyFieldsEn: ['Computer Science & AI', 'Petroleum & Civil Engineering', 'Medicine & Health Sciences', 'Law & Shariah', 'Business Administration & Economics'],
    progressionNextMs: ['Ijazah Sarjana (Master Degree)', 'Kerjaya Pegawai Kanan Kerajaan & Industri'],
    progressionNextEn: ['Master Degrees & PhD', 'Senior Executive & Government Leadership'],
    careerOutcomesMs: ['Pegawai Eksekutif Kerajaan', 'Jurutera Profesional Bertauliah', 'Doktor Perubatan', 'Pakar Kewangan & Data'],
    careerOutcomesEn: ['Government Administrative Officer', 'Chartered Professional Engineer', 'Medical Doctor', 'Financial & Data Strategist'],
    tags: ['UBD', 'UTB', 'UNISSA', 'Ijazah Sarjana Muda', 'BDQF Level 6'],
    connectsTo: ['dest-career-industry']
  },

  // 11. HIGHER DESTINATIONS - OVERSEAS UNIVERSITIES
  {
    id: 'dest-university-overseas',
    stream: 'academic',
    stageLevel: 'degree_university',
    stageOrder: 4,
    titleMs: 'Universiti Luar Negara & Biasiswa Kerajaan (UK, Australia, NZ)',
    titleEn: 'Overseas Universities & Government Scholarships (UK, Australia, NZ)',
    institutionMs: 'Universiti Terkemuka di United Kingdom, Australia, New Zealand, Singapura',
    institutionEn: 'Leading Universities in UK, Australia, New Zealand, Singapore',
    qualificationMs: 'Ijazah Sarjana Muda Luar Negara (Bachelor Honours Degree)',
    qualificationEn: 'Overseas Bachelor Honours Degree',
    bdqfLevel: 'BDQF Tahap 6',
    durationMs: '3 - 4 Tahun',
    durationEn: '3 - 4 Years',
    minCredits: 5,
    entryRequirementMs: 'Keputusan cemerlang A-Level (cth. A*A*A hingga ABB) dan terpilih dalam skim Biasiswa Kerajaan / MinDef.',
    entryRequirementEn: 'Outstanding A-Level grades (e.g. A*A*A to ABB) and selection for Government Overseas / MinDef Scholarships.',
    colorTheme: {
      bg: 'bg-violet-950',
      border: 'border-violet-400',
      text: 'text-violet-200',
      badge: 'bg-violet-400 text-slate-950 font-bold',
      glow: 'shadow-violet-500/20'
    },
    summaryMs: 'Pengajian ijazah sarjana muda antarabangsa di institusi global terkemuka dengan pembiayaan penuh Biasiswa Kerajaan Brunei.',
    summaryEn: 'World-class overseas undergraduate studies at premier universities fully funded through Brunei Government Scholarships.',
    keyFieldsMs: ['Sains Hayat & Perubatan', 'Undang-Undang Antarabangsa', 'Kejuruteraan Aeroangkasa', 'Sains Data & AI Termaju'],
    keyFieldsEn: ['Life Sciences & Medicine', 'International Law', 'Aerospace Engineering', 'Advanced Data Science & AI'],
    progressionNextMs: ['Pegawai Tadbir Kanan Kementerian', 'Pakar Saintifik Antarabangsa'],
    progressionNextEn: ['Senior Ministry Policy Officers', 'Global Technical Specialists'],
    careerOutcomesMs: ['Pakar Perunding Perubatan', 'Peguam Antarabangsa', 'Diplomat Luar Negeri', 'Jurutera Aeroangkasa'],
    careerOutcomesEn: ['Medical Consultant', 'International Barrister', 'Foreign Diplomat', 'Aerospace Engineer'],
    tags: ['Biasiswa', 'Luar Negara', 'UK', 'Australia'],
    connectsTo: ['dest-career-industry']
  },

  // 12. HIGHER DESTINATIONS - PRIVATE DEGREE ROUTES (LCB / UK TOP-UP)
  {
    id: 'dest-university-private',
    stream: 'private',
    stageLevel: 'degree_university',
    stageOrder: 4,
    titleMs: 'Ijazah Sarjana Muda Universiti UK Melalui Kolej Swasta (LCB 3+0 / Top-Up)',
    titleEn: 'UK Bachelor Degrees via Private Colleges (LCB 3+0 / UK Top-Up)',
    institutionMs: 'Laksamana College of Business (University of Chester UK) / Micronet (University of Essex/Sunderland)',
    institutionEn: 'Laksamana College of Business (University of Chester UK) / Micronet (University of Essex/Sunderland)',
    qualificationMs: 'BA (Hons) / BSc (Hons) University of Chester / UK University',
    qualificationEn: 'BA (Hons) / BSc (Hons) University of Chester / UK University',
    bdqfLevel: 'BDQF Tahap 6',
    durationMs: '1 Tahun (Top-Up) atau 3 Tahun (Penuh 3+0)',
    durationEn: '1 Year (Top-Up) or 3 Years (Full 3+0)',
    minCredits: 4,
    entryRequirementMs: 'Lulus Diploma Tahap 5 / BTEC Level 5 HND ATAU Lulus International Foundation Programme (IFP).',
    entryRequirementEn: 'Pass in BDQF Level 5 / BTEC Level 5 HND OR Pass in International Foundation Programme (IFP).',
    colorTheme: {
      bg: 'bg-fuchsia-950',
      border: 'border-fuchsia-400',
      text: 'text-fuchsia-200',
      badge: 'bg-fuchsia-400 text-slate-950 font-bold',
      glow: 'shadow-fuchsia-500/20'
    },
    summaryMs: 'Menduduki dan menamatkan Ijazah Sarjana Muda penuh United Kingdom sepenuhnya di Brunei tanpa perlu ke luar negara, menjimatkan kos sara hidup.',
    summaryEn: 'Complete a full prestigious United Kingdom Bachelor’s Degree entirely locally in Brunei without overseas living costs.',
    keyFieldsMs: ['BSc (Hons) Computer Science & Software', 'BA (Hons) Business Finance & Marketing', 'BA (Hons) International Tourism'],
    keyFieldsEn: ['BSc (Hons) Computer Science & Software', 'BA (Hons) Business Finance & Marketing', 'BA (Hons) International Tourism'],
    progressionNextMs: ['Pasaran Pekerjaan Korporat & Sektor Swasta', 'Ijazah Sarjana (Master Degree)'],
    progressionNextEn: ['Corporate & Private Sector Employment', 'Postgraduate Master Degrees'],
    careerOutcomesMs: ['Pengurus Perniagaan Korporat', 'Pembangun Perisian Kanan', 'Eksekutif Pemasaran Jenama', 'Pengurus Operasi Hotel'],
    careerOutcomesEn: ['Corporate Business Manager', 'Senior Software Engineer', 'Brand Marketing Executive', 'Hotel Operations Director'],
    tags: ['Chester UK', 'Ijazah 3+0', 'Kolej Swasta', 'Level 6'],
    connectsTo: ['dest-career-industry']
  },

  // 13. ULTIMATE DESTINATION - WORKFORCE & CAREER INDUSTRY
  {
    id: 'dest-career-industry',
    stream: 'direct_career',
    stageLevel: 'career_industry',
    stageOrder: 5,
    titleMs: 'Pasaran Kerjaya, Industri & Kemajuan Profesional',
    titleEn: 'Workforce, Industry & Professional Careers',
    institutionMs: 'Sektor Kerajaan, Sektor Tenaga & Minyak Gas, GLCs, Perbankan, IT & Keusahawanan',
    institutionEn: 'Public Service, Energy & Oil/Gas, GLCs, Banking, IT & Entrepreneurship',
    qualificationMs: 'Tenaga Kerja Mahir, Eksekutif & Profesional Brunei',
    qualificationEn: 'Skilled, Executive & Professional Workforce',
    bdqfLevel: 'Kerjaya Profesional',
    durationMs: 'Sepanjang Hayat',
    durationEn: 'Lifelong Career',
    minCredits: 0,
    entryRequirementMs: 'Kelayakan kemahiran atau ijazah yang dipadankan dengan keperluan industri Brunei.',
    entryRequirementEn: 'Matching qualification skills with industrial requirements of Brunei Darussalam.',
    colorTheme: {
      bg: 'bg-slate-900',
      border: 'border-emerald-400',
      text: 'text-emerald-300',
      badge: 'bg-emerald-400 text-slate-950 font-black',
      glow: 'shadow-emerald-500/20'
    },
    summaryMs: 'Destinasi utama setiap laluan pendidikan: menyumbang secara aktif kepada kemajuan sosio-ekonomi Negara Brunei Darussalam.',
    summaryEn: 'The ultimate horizon: active, productive participation in the socio-economic advancement of Brunei Darussalam.',
    keyFieldsMs: ['Sektor Tenaga & Maritim', 'Ekonomi Digital & IT', 'Perkhidmatan Awam & Pertahanan', 'Perbankan Islam & Kewangan', 'Hospitaliti & Pelancongan'],
    keyFieldsEn: ['Energy & Maritime Sector', 'Digital Economy & IT', 'Public Service & Defence', 'Islamic Banking & Finance', 'Hospitality & Tourism'],
    progressionNextMs: ['Peningkatan Kerjaya & Pembelajaran Sepanjang Hayat (CPD)'],
    progressionNextEn: ['Continuous Professional Development & Lifelong Learning'],
    careerOutcomesMs: ['Melahirkan modal insan berpendidikan, berkemahiran tinggi dan berjaya'],
    careerOutcomesEn: ['Accomplished, highly skilled and productive Bruneian workforce'],
    tags: ['Kerjaya', 'Industri', 'Profesional'],
    connectsTo: []
  }
];

export const PATHWAY_COMPARISON_DATA: PathwayComparisonMetric[] = [
  {
    id: 'min-credits',
    titleMs: 'Syarat Minimum Kredit O-Level',
    titleEn: 'Minimum O-Level Credit Requirement',
    academicTrack: '5+ Kredit (Termasuk BM)',
    polytechnicTrack: '4 - 5 Kredit (Termasuk BM & Math/Sc)',
    tvetTrack: '1 - 4 Kredit (HNTec: 3-4, NTec: 1-2)',
    privateTrack: '1 - 4 Kredit (Foundation: 1-3, Diploma: 4)',
    apprenticeshipTrack: '0 - 2 Kredit + Ujian Fizikal'
  },
  {
    id: 'typical-duration',
    titleMs: 'Tempoh Pengajian',
    titleEn: 'Programme Duration',
    academicTrack: '2 Tahun (A-Levels)',
    polytechnicTrack: '2.5 - 3 Tahun (Diploma BDQF 5)',
    tvetTrack: '2 Tahun (HNTec / NTec)',
    privateTrack: '1 Tahun (Foundation) / 2-2.5 Thn (Diploma)',
    apprenticeshipTrack: '1 - 1.5 Tahun (Latihan + Praktikal)'
  },
  {
    id: 'qualification-awarded',
    titleMs: 'Kelayakan Yang Dianugerahkan',
    titleEn: 'Qualification Awarded',
    academicTrack: 'Cambridge GCE A-Levels',
    polytechnicTrack: 'Diploma Tahap 5 BDQF Politeknik',
    tvetTrack: 'IBTE HNTec (Tahap 4) / NTec (Tahap 3)',
    privateTrack: 'BDQF Level 5 Diploma & BTEC HND UK',
    apprenticeshipTrack: 'Sijil Kemahiran Industri (ISQ / EICF)'
  },
  {
    id: 'next-progression',
    titleMs: 'Laluan Seterusnya',
    titleEn: 'Next Immediate Progression',
    academicTrack: 'Ijazah Sarjana Muda UBD/UTB atau Luar Negara',
    polytechnicTrack: 'Tahun 2 Ijazah UTB/UBD ATAU Pasaran Kerja',
    tvetTrack: 'Diploma Politeknik Brunei ATAU Kerjaya Teknikal',
    privateTrack: 'Tahun Akhir Ijazah Sarjana Muda UK (Top-Up)',
    apprenticeshipTrack: 'Pekerjaan Terus Loji / Pelantar Minyak Gas'
  },
  {
    id: 'learning-style',
    titleMs: 'Pendekatan Pembelajaran',
    titleEn: 'Core Learning Methodology',
    academicTrack: '80% Teori Akademik, Peperiksaan Bertulis',
    polytechnicTrack: '70% Praktikal Amali, 30% Teori Industri',
    tvetTrack: '85% Kemahiran Bengkel, Latihan Industri',
    privateTrack: '60% Projek Moden, Pembentangan & Amali IT/Biz',
    apprenticeshipTrack: '90% Kemahiran Tangan & Standard Keselamatan'
  }
];
