export interface BusRouteInfo {
  routeNumber: string;
  routeNameMs: string;
  routeNameEn: string;
  coverageAreas: string[];
  destinations: string[];
  destinationsEn?: string[];
  departureTime: string;
  departureTimeEn?: string;
  notesMs: string;
  notesEn: string;
}

export interface BdqfLevel {
  level: number;
  qualificationTitle: string;
  qualificationTitleEn?: string;
  institutionType: string;
  institutionTypeEn?: string;
  oLevelRequirement: string;
  oLevelRequirementEn?: string;
  employmentPathway: string;
  employmentPathwayEn?: string;
}

export interface FaqItem {
  id: string;
  questionMs: string;
  questionEn: string;
  answerMs: string;
  answerEn: string;
  category: 'pengangkutan' | 'akademik' | 'hecas';
}

export const TUTONG_BUS_ROUTES_DATA: BusRouteInfo[] = [
  {
    routeNumber: 'JSS-TTG-01',
    routeNameMs: 'Laluan Pekan Tutong - Bukit Bendera - PTET',
    routeNameEn: 'Tutong Town - Bukit Bendera - PTET Route',
    coverageAreas: ['Kampung Petani', 'Kampung Suran', 'Pekan Tutong', 'Kampung Sengkarai', 'Bukit Bendera'],
    destinations: ['Pusat Tingkatan Enam Tutong (PTET)'],
    destinationsEn: ['Tutong Sixth Form Centre (PTET)'],
    departureTime: '6:15 Pagi (Isnin - Khamis & Sabtu)',
    departureTimeEn: '6:15 AM (Monday - Thursday & Saturday)',
    notesMs: 'Perkhidmatan bas kerajaan percuma di bawah seliaan Jabatan Sekolah-Sekolah (JSS) Cawangan Daerah Tutong.',
    notesEn: 'Free government school bus service operated by Department of Schools (JSS) Tutong District Branch.'
  },
  {
    routeNumber: 'JSS-TTG-02',
    routeNameMs: 'Laluan Mukim Kiudang & Lamunin ke Hab PTET',
    routeNameEn: 'Mukim Kiudang & Lamunin to PTET Hub Route',
    coverageAreas: ['Kampung Kiudang', 'Kampung Mungkom', 'Kampung Birau', 'Kampung Lamunin', 'Kampung Menunggol Tutong'],
    destinations: ['PTET Bukit Bendera & Stesen Transit Tutong'],
    destinationsEn: ['PTET Bukit Bendera & Tutong Transit Station'],
    departureTime: '6:00 Pagi',
    departureTimeEn: '6:00 AM',
    notesMs: 'Mengambil pelajar di sepanjang jalan utama Kiudang-Lamunin terus ke sekolah.',
    notesEn: 'Pick-up points along the Kiudang-Lamunin main thoroughfare directly to school premises.'
  },
  {
    routeNumber: 'JSS-TTG-03',
    routeNameMs: 'Laluan Mukim Keriam & Telisai ke PTET',
    routeNameEn: 'Mukim Keriam & Telisai to PTET Route',
    coverageAreas: ['Kampung Keriam', 'Kampung Bukit Panggal', 'Kampung Danau', 'Kampung Telisai', 'Perumahan Bukit Beruang'],
    destinations: ['PTET & Stesen Pertukaran Tutong'],
    destinationsEn: ['PTET & Tutong Central Interchange'],
    departureTime: '6:00 Pagi',
    departureTimeEn: '6:00 AM',
    notesMs: 'Termasuk laluan khas bas masuk ke kawasan Rancangan Perumahan Negara (RPN) Bukit Beruang.',
    notesEn: 'Includes dedicated loop servicing the National Housing Scheme (RPN) Bukit Beruang neighborhood.'
  },
  {
    routeNumber: 'JSS-TTG-04',
    routeNameMs: 'Laluan Mukim Tanjong Maya, Ukong & Rambai ke Tutong',
    routeNameEn: 'Mukim Tanjong Maya, Ukong & Rambai to Tutong Route',
    coverageAreas: ['Kampung Lubok Pulau', 'Kampung Tanjong Maya', 'Kampung Ukong', 'Kampung Rambai'],
    destinations: ['PTET & Sekolah-Sekolah Menengah Tutong'],
    destinationsEn: ['PTET & Tutong Secondary Institutions'],
    departureTime: '5:45 Pagi (Kawasan Pedalaman)',
    departureTimeEn: '5:45 AM (Inland / Rural Areas)',
    notesMs: 'Pelajar disarankan berada di perhentian bas 10 minit sebelum waktu ketibaan bas.',
    notesEn: 'Students are advised to wait at the designated pick-up shelter 10 minutes prior to arrival.'
  },
  {
    routeNumber: 'TRANSIT-IBTE-PB',
    routeNameMs: 'Perkhidmatan Bas Transit Tutong ke Institusi BSB & Belait',
    routeNameEn: 'Tutong Transit Bus to BSB & Belait Campuses',
    coverageAreas: ['Stesen Bas Pekan Tutong (Hab Pertukaran Utama)'],
    destinations: ['Politeknik Brunei Ong Sum Ping (BSB)', 'IBTE Nakhoda Ragam', 'IBTE Sultan Saiful Rijal', 'IBTE Wasan', 'Politeknik Lumut (Belait)'],
    destinationsEn: ['Politeknik Brunei Ong Sum Ping (BSB)', 'IBTE Nakhoda Ragam', 'IBTE Sultan Saiful Rijal', 'IBTE Wasan', 'Politeknik Lumut (Belait)'],
    departureTime: '6:20 Pagi',
    departureTimeEn: '6:20 AM',
    notesMs: 'Perkhidmatan bas pengangkutan harian atau mingguan yang berlepas dari Hab Stesen Bas Pekan Tutong.',
    notesEn: 'Daily and weekly scheduled commuter bus departures connecting from Tutong Town Central Bus Station.'
  }
];

export const BDQF_LEVELS_DATA: BdqfLevel[] = [
  {
    level: 2,
    qualificationTitle: 'GCE O-Level / IGCSE / Sijil Menengah Rendah',
    qualificationTitleEn: 'GCE O-Level / IGCSE / Lower Secondary Certificate',
    institutionType: 'Sekolah Menengah (Contoh: SMMH Tutong)',
    institutionTypeEn: 'Secondary Schools (e.g. SMMH Tutong)',
    oLevelRequirement: 'Kelayakan asas persekolahan menengah 5 tahun.',
    oLevelRequirementEn: 'Baseline credential upon completing 5-year secondary schooling.',
    employmentPathway: 'Asas untuk melangkah ke Tingkatan 6 A-Level, Diploma Politeknik, atau TVET IBTE.',
    employmentPathwayEn: 'Foundation for progression to Sixth Form A-Levels, Politeknik Diploma, or IBTE TVET.'
  },
  {
    level: 3,
    qualificationTitle: 'Sijil Kemahiran Kebangsaan (NTec) / GCE A-Level (Tingkatan 6)',
    qualificationTitleEn: 'National Technical Certificate (NTec) / Cambridge GCE A-Level (Sixth Form)',
    institutionType: 'IBTE Campuses / Pusat Tingkatan Enam Tutong (PTET)',
    institutionTypeEn: 'IBTE Campuses / Tutong Sixth Form Centre (PTET)',
    oLevelRequirement: 'NTec (1-2 kredit) | A-Level PTET (Minimum 5 kredit O-Level termasuk BM).',
    oLevelRequirementEn: 'NTec (1-2 credits) | A-Level PTET (Minimum 5 O-Level credits including BM).',
    employmentPathway: 'Juruteknik Asas / Persediaan Universiti Sarjana Muda melalui keputusan A-Level.',
    employmentPathwayEn: 'Foundation Technician / Direct Bachelor Degree admission route via A-Level grades.'
  },
  {
    level: 4,
    qualificationTitle: 'Sijil Pendidikan Teknikal Kebangsaan Tinggi (HNTec)',
    qualificationTitleEn: 'Higher National Technical Education Certificate (HNTec)',
    institutionType: 'Institut Pendidikan Teknikal Brunei (IBTE)',
    institutionTypeEn: 'Institute of Brunei Technical Education (IBTE)',
    oLevelRequirement: 'Minimum 3 hingga 4 Kredit O-Level yang relevan.',
    oLevelRequirementEn: 'Minimum of 3 to 4 relevant O-Level Credits.',
    employmentPathway: 'Penyelia Teknikal / Laluan Melanjutkan Pengajian ke Diploma Politeknik Brunei atau Universiti.',
    employmentPathwayEn: 'Technical Supervisor / Direct bridging pathway to Politeknik Brunei Diploma or University.'
  },
  {
    level: 5,
    qualificationTitle: 'Diploma Kebangsaan Tinggi (Level 5 Diploma)',
    qualificationTitleEn: 'Level 5 Higher National Diploma (HND)',
    institutionType: 'Politeknik Brunei (PB)',
    institutionTypeEn: 'Politeknik Brunei (PB)',
    oLevelRequirement: 'Minimum 5 Kredit O-Level termasuk Bahasa Inggeris & Matematik.',
    oLevelRequirementEn: 'Minimum 5 O-Level Credits including English Language & Mathematics.',
    employmentPathway: 'Pegawai Eksekutif Muda / Jurutera Bersekutu / Kemasukan Terus ke Tahun 2 Ijazah Sarjana Muda Universiti.',
    employmentPathwayEn: 'Junior Executive / Associate Engineer / Direct entry into Year 2 of University Bachelor Degrees.'
  },
  {
    level: 6,
    qualificationTitle: "Ijazah Sarjana Muda (Bachelor's Degree with Honours)",
    qualificationTitleEn: "Bachelor's Degree with Honours (Level 6)",
    institutionType: 'UBD, UTB, UNISSA, KUPUSB atau Universiti Luar Negeri (Biasiswa Kerajaan)',
    institutionTypeEn: 'UBD, UTB, UNISSA, KUPUSB or Overseas Universities (Government Scholarship)',
    oLevelRequirement: 'Lulus A-Level PTET (Minimum 160-240 mata tarif) ATAU Diploma PB (GPA > 3.0).',
    oLevelRequirementEn: 'Pass PTET A-Levels (Minimum 160-240 tariff points) OR Politeknik Diploma (GPA > 3.0).',
    employmentPathway: 'Pegawai Kanan Kerajaan (Gred B2), Jurutera Profesional, Doktor, Pensyarah, Eksekutif Korporat.',
    employmentPathwayEn: 'Senior Government Officer (B2 Grade), Professional Engineer, Medical Doctor, Corporate Executive.'
  }
];

export const PARENTS_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'akademik',
    questionMs: 'Apakah perbezaan utama antara Tingkatan 6 (PTET) dan Politeknik Brunei / IBTE?',
    questionEn: 'What is the main difference between Sixth Form (PTET) and Politeknik Brunei / IBTE?',
    answerMs: 'Tingkatan 6 (PTET) memberi tumpuan kepada akademik teori secara mendalam selama 2 tahun untuk menduduki peperiksaan GCE A-Level sebagai persediaan utama memasuki Ijazah Sarjana Muda di UBD, UTB, UNISSA atau biasiswa luar negara. Manakala Politeknik Brunei dan IBTE memberi tumpuan kepada kemahiran praktikal, latihan industri (internship), dan teknologi gunaan, di mana graduan terus mempunyai kebolehpasaran kerja tinggi atau boleh menyambung terus ke tahun kedua universiti.',
    answerEn: 'Sixth Form (PTET) focuses on rigorous academic theory over 2 years leading to Cambridge GCE A-Levels as the primary route to Bachelor Degrees at UBD, UTB, UNISSA, or overseas government scholarships. Politeknik Brunei and IBTE emphasize applied technical competence, structured industrial internships, and high immediate market employability with advanced standing options into university year 2.'
  },
  {
    id: 'faq-3',
    category: 'pengangkutan',
    questionMs: 'Bagaimanakah dengan kemudahan pengangkutan bas untuk pelajar dari kampung-kampung di Daerah Tutong?',
    questionEn: 'What school bus transportation facilities are available for students across Tutong District villages?',
    answerMs: 'Jabatan Sekolah-Sekolah (JSS) Kementerian Pendidikan menyediakan perkhidmatan bas sekolah percuma yang merangkumi kawasan kampung utama di Daerah Tutong (seperti Pekan Tutong, Keriam, Bukit Beruang, Telisai, Kiudang, Lamunin, Tanjong Maya, dan Ukong) yang membawa pelajar terus ke Pusat Tingkatan Enam Tutong (PTET). Untuk ke kampus Politeknik dan IBTE, terdapat perkhidmatan bas transit dari Hab Stesen Bas Pekan Tutong.',
    answerEn: 'The Department of Schools (JSS) under the Ministry of Education provides free daily school bus routes servicing major villages across Tutong District (including Tutong Town, Keriam, Bukit Beruang, Telisai, Kiudang, Lamunin, Tanjong Maya, and Ukong) directly to Tutong Sixth Form Centre (PTET). For Politeknik and IBTE campuses in BSB and Belait, dedicated transit buses operate from the Tutong Town Central Bus Station.'
  },
  {
    id: 'faq-4',
    category: 'akademik',
    questionMs: 'Jika anak saya tidak mendapat kredit dalam Bahasa Melayu atau Bahasa Inggeris, apakah kesannya?',
    questionEn: 'What happens if my child does not achieve a credit in Bahasa Melayu or English Language?',
    answerMs: 'Kredit Bahasa Melayu (A1-C6) adalah syarat WAJIB bagi kemasukan ke PTET dan permohonan biasiswa kerajaan. Manakala Kredit Bahasa Inggeris (A1-C6) adalah syarat WAJIB bagi kemasukan ke semua program Diploma di Politeknik Brunei. Jika anak anda belum mencapai kredit dalam subjek tersebut, mereka masih boleh memohon program IBTE HNTec/NTec atau mendaftar untuk menduduki semula peperiksaan O-Level ulangan (Mei/Jun atau Oktober/November).',
    answerEn: 'A Credit in Bahasa Melayu (A1-C6) is MANDATORY for PTET Sixth Form admission and government scholarship awards. A Credit in English Language (A1-C6) is MANDATORY for all Diploma programmes at Politeknik Brunei. If not attained, students can apply for IBTE HNTec/NTec courses or register for O-Level resits in the May/June or Oct/Nov examination series.'
  },
  {
    id: 'faq-5',
    category: 'hecas',
    questionMs: 'Bilakah permohonan HECAS dan pendaftaran kemasukan dibuka setiap tahun?',
    questionEn: 'When do HECAS applications and institutional admissions open each year?',
    answerMs: 'Permohonan HECAS (Higher Education Centralized Admission System) bagi kemasukan Tingkatan 6 PTET dan Politeknik Brunei biasanya dibuka dalam tempoh 1 hingga 2 minggu sejurus selepas keputusan rasmi O-Level diumumkan (kebiasaannya pada akhir Januari atau awal Februari). Pusingan kedua HECAS akan dibuka pada bulan Ogos. Pendaftaran IBTE TVET pula dibuka dua kali setahun (Pengambilan Januari dan Julai).',
    answerEn: 'HECAS (Higher Education Centralized Admission System) for PTET Sixth Form and Politeknik Brunei typically opens within 1-2 weeks following the official release of O-Level results (usually late January or early February). A second HECAS round opens in August. IBTE TVET admissions open twice annually for January and July intakes.'
  },
  {
    id: 'faq-6',
    category: 'akademik',
    questionMs: 'Adakah sijil Diploma Politeknik Brunei dan HNTec IBTE diiktiraf oleh Kerajaan Brunei untuk perjawatan awam?',
    questionEn: 'Are Politeknik Brunei Diplomas and IBTE HNTec certificates recognized for Brunei Civil Service positions?',
    answerMs: 'Ya, 100% diiktiraf! Semua program di PTET, Politeknik Brunei, dan IBTE telah diakreditasi di bawah Majlis Kebangsaan Pengiktirafan Kelayakan (MKPK) Kementerian Pendidikan Brunei dan diselaraskan dengan Rangka Kerja Kelayakan Kebangsaan Brunei (BDQF). Pemegang Diploma Level 5 Politeknik Brunei diiktiraf untuk perjawatan Gred C1/C2 dalam Perkhidmatan Awam (JPA).',
    answerEn: 'Yes, 100% officially recognized! All programmes at PTET, Politeknik Brunei, and IBTE are accredited under the National Accreditation Council (MKPK) of the Ministry of Education Brunei and aligned with the BDQF framework. Politeknik Brunei Level 5 Diploma graduates qualify for Grade C1/C2 positions within the Brunei Public Service (JPA).'
  }
];
