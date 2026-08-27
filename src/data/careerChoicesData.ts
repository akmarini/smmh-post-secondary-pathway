export interface CareerOpportunity {
  id: string;
  titleMs: string;
  titleEn: string;
  organizationMs: string;
  organizationEn: string;
  sector: 'defense' | 'aviation' | 'maritime_energy' | 'public_health';
  sectorNameMs: string;
  sectorNameEn: string;
  badgeColor: string;
  entryType: 'direct_o_level' | 'o_level_training' | 'cadetship';
  entryTypeLabelMs: string;
  entryTypeLabelEn: string;
  minCredits: number;
  coreRequirementsMs: string[];
  coreRequirementsEn: string[];
  physicalRequirementsMs?: string[];
  physicalRequirementsEn?: string[];
  trainingDurationMs: string;
  trainingDurationEn: string;
  trainingLocationMs: string;
  trainingLocationEn: string;
  allowanceAndSalaryMs: string;
  allowanceAndSalaryEn: string;
  keyBenefitsMs: string[];
  keyBenefitsEn: string[];
  careerProgressionMs: string[];
  careerProgressionEn: string[];
  descriptionMs: string;
  descriptionEn: string;
  wawasanAlignmentMs: string;
  wawasanAlignmentEn: string;
  officialPortalUrl: string;
  portalNameMs: string;
  portalNameEn: string;
  recommendedRiasec: string[]; // e.g. ['R', 'E', 'C']
}

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  // 1. RBAF - Perajurit Muda
  {
    id: 'rbaf-perajurit-muda',
    titleMs: 'Perajurit Muda ABDB (Tentera Darat, Laut & Udara)',
    titleEn: 'RBAF Military Recruit (Army, Navy & Air Force)',
    organizationMs: 'Angkatan Bersenjata Diraja Brunei (ABDB / RBAF)',
    organizationEn: 'Royal Brunei Armed Forces (RBAF)',
    sector: 'defense',
    sectorNameMs: 'Pertahanan & Keselamatan',
    sectorNameEn: 'Defense & Security',
    badgeColor: 'bg-sky-600 text-white',
    entryType: 'direct_o_level',
    entryTypeLabelMs: 'Kemasukan Terus Lepasan O-Level',
    entryTypeLabelEn: 'Direct Post-O Level Intake',
    minCredits: 2,
    coreRequirementsMs: [
      'Warganegara Brunei Darussalam (Rakyat Jati).',
      'Minimum 2 - 4 Kredit O-Level termasuk Bahasa Melayu (Gred C6 ke atas).',
      'Umur antara 18 hingga 25 tahun semasa pendaftaran.',
      'Lulus Ujian Kelayakan Fizikal Asas (PFT) & Pemeriksaan Perubatan Kategori A.'
    ],
    coreRequirementsEn: [
      'Brunei Darussalam Citizen (Rakyat Jati).',
      'Minimum 2 - 4 O-Level Credits including Bahasa Melayu (Grade C6 or better).',
      'Age between 18 and 25 years old at time of intake.',
      'Pass Basic Physical Fitness Test (PFT) & Medical Category A screening.'
    ],
    physicalRequirementsMs: [
      'Ketinggian minimum Lelaki: 157 cm | Wanita: 152 cm.',
      'BMI ideal (18.5 - 25.0) dan tiada kecacatan fizikal atau rabun warna kekal.',
      'Larian 2.4 km bawah 11 min 30 saat (Lelaki) / bawah 13 min 30 saat (Wanita).'
    ],
    physicalRequirementsEn: [
      'Minimum Height Male: 157 cm | Female: 152 cm.',
      'Healthy BMI (18.5 - 25.0), no severe color blindness or chronic medical conditions.',
      '2.4 km Run under 11 mins 30 secs (Male) / under 13 mins 30 secs (Female).'
    ],
    trainingDurationMs: '6 Bulan Latihan Asas Ketenteraan',
    trainingDurationEn: '6 Months Basic Military Training',
    trainingLocationMs: 'Institut Latihan ABDB (IL ABDB), Kem Penanjong, Tutong',
    trainingLocationEn: 'RBAF Training Institute (TI RBAF), Penanjong Camp, Tutong',
    allowanceAndSalaryMs: 'Elaun Latihan: B$650 - B$800/bulan (Penginapan & Makanan Percuma) ➔ Gaji Permulaan Selepas Tamat: B$1,250 - B$1,850/bulan + Elaun Khidmat.',
    allowanceAndSalaryEn: 'Training Allowance: B$650 - B$800/month (Free Lodging & Rations) ➔ Starting Salary: B$1,250 - B$1,850/month + Service Allowances.',
    keyBenefitsMs: [
      'Skim pencen perkhidmatan kerajaan & caruman TAP/SCP.',
      'Kemudahan perubatan percuma sepenuhnya untuk anggota dan keluarga tanggungan.',
      'Peluang penajaan kursus kepakaran teknikal (BDQF Tahap 4 & 5) ke luar negeri.',
      'Elaun kepakaran khas (Penerbangan, Selam Tempur, Komando, Siber & Perisikan).'
    ],
    keyBenefitsEn: [
      'Government service pension / TAP & SCP contribution.',
      'Comprehensive free medical and dental care for servicemen and dependents.',
      'Overseas sponsorship opportunities for technical diplomas and specialist qualifications.',
      'Specialist allowances (Aviation, Combat Diver, Special Forces, Cyber Security).'
    ],
    careerProgressionMs: [
      'Perajurit Muda (Recruit) ➔ Prebet (Private)',
      'Lans Koperal ➔ Koperal ➔ Sarjan ➔ Pegawai Waran',
      'Peluang kenaikan pangkat ke Kor Pegawai melalui Sekolah Pegawai Kadet (OCS) bagi yang berprestasi cemerlang.'
    ],
    careerProgressionEn: [
      'Recruit ➔ Private',
      'Lance Corporal ➔ Corporal ➔ Sergeant ➔ Warrant Officer',
      'Commissioning opportunity to Officer Corps via Officer Cadet School (OCS) for top performers.'
    ],
    descriptionMs: 'Berkhidmat menjaga kedaulatan negara melalui tiga cabang utama: Tentera Darat Diraja Brunei (TDDB), Tentera Laut Diraja Brunei (TLDB) di Muara, atau Tentera Udara Diraja Brunei (TUDB) di Pangkalan Rimba.',
    descriptionEn: 'Serve the nation through three main services: Royal Brunei Land Force (RBLF), Royal Brunei Navy (RBN) at Muara Naval Base, or Royal Brunei Air Force (RBAirF) at Rimba Air Base.',
    wawasanAlignmentMs: 'Teras Keselamatan Kebangsaan & Ketenteraman Awam Negara Brunei Darussalam.',
    wawasanAlignmentEn: 'National Security & Public Resilience Strategic Sector.',
    officialPortalUrl: 'https://mindef.gov.bn',
    portalNameMs: 'Portal Pengambilan Kementerian Pertahanan (MinDef)',
    portalNameEn: 'Ministry of Defence Recruitment Portal',
    recommendedRiasec: ['R', 'E', 'C']
  },

  // 2. Royal Brunei Airlines - Cadet Pilot
  {
    id: 'rb-cadet-pilot',
    titleMs: 'Program Juruterbang Kadet Diraja (RB Cadet Pilot)',
    titleEn: 'Royal Brunei Airlines Cadet Pilot Programme',
    organizationMs: 'Syarikat Penerbangan Diraja Brunei (Royal Brunei Airlines - RB)',
    organizationEn: 'Royal Brunei Airlines (RB)',
    sector: 'aviation',
    sectorNameMs: 'Penerbangan & Syarikat Penerbangan',
    sectorNameEn: 'Aviation & Airlines',
    badgeColor: 'bg-amber-500 text-white',
    entryType: 'cadetship',
    entryTypeLabelMs: 'Lepasan A-Level / Diploma (Tajaan Penuh RB)',
    entryTypeLabelEn: 'Post-A Level / Diploma (Fully Sponsored Cadetship)',
    minCredits: 5,
    coreRequirementsMs: [
      'Warganegara Kebawah Duli Yang Maha Mulia Paduka Seri Baginda Sultan dan Yang Di-Pertuan Negara Brunei Darussalam (Rakyat Jati).',
      'Kelayakan Utama: Minimum 2 - 3 GCE \'A\' Level Gred B/C ke atas (termasuk Mathematics & Physics/Science) ATAU Diploma / Ijazah Sarjana Muda yang diiktiraf.',
      'Asas GCE \'O\' Level: Minimum 4 - 5 Kredit termasuk Gred C6/B4 dalam English Language (1123), Mathematics D (4024), Sains/Fizik, dan Bahasa Melayu (1201).',
      'Umur: Bujang dan berumur antara 18 hingga 26 tahun pada tarikh permulaan latihan.',
      'Lulus Pemeriksaan Kesihatan Penerbangan Kelas 1 (CAAB / EASA / UK Class 1 Medical).'
    ],
    coreRequirementsEn: [
      'Citizen of His Majesty The Sultan and Yang Di-Pertuan of Negara Brunei Darussalam (Rakyat Jati).',
      'Primary Academic Requirement: Minimum 2 - 3 GCE \'A\' Levels (Grade B/C or higher, including Mathematics & Physics/Science) OR a recognized Diploma / Bachelor\'s Degree.',
      'Baseline GCE \'O\' Level: Minimum 4 - 5 Credits including English Language (1123), Mathematics D (4024), Science/Physics, and Bahasa Melayu (1201).',
      'Age & Status: Single, between 18 and 26 years of age at the start of flight training.',
      'Must pass Class 1 Civil Aviation Medical Examination (CAAB / EASA / UK Class 1 Medical).'
    ],
    physicalRequirementsMs: [
      'Ketinggian minimum 5 kaki 2 inci (157.5 cm) hingga 160 cm (mampu mencapai instrumen kokpit pesawat).',
      'Penglihatan 6/6 (boleh dibantu dengan cermin mata/kanta lekap mengikut piawaian Kelas 1), tiada rabun warna.',
      'Lulus ujian saringan psikomotor (COMPASS test), matematik penerbangan, dan penilaian simulator.',
      'Lulus tapisan keselamatan lapangan terbang dan tapisan visa latihan penerbangan antarabangsa.'
    ],
    physicalRequirementsEn: [
      'Minimum height 5 ft 2 in (157.5 cm) to 160 cm (able to reach aircraft cockpit controls comfortably).',
      'Vision 6/6 (correctable with glasses/contacts under Class 1 standards), normal color vision.',
      'Pass COMPASS psychomotor aptitude screening, aviation mental math, and flight simulator evaluation.',
      'Clear security vetting for airport airside passes and international flight academy visas.'
    ],
    trainingDurationMs: '18 - 24 Bulan Latihan Penerbangan Luar Negara (ATPL Frozen)',
    trainingDurationEn: '18 - 24 Months Overseas Flight Training (Frozen ATPL)',
    trainingLocationMs: 'Akademi Penerbangan Bertauliah Antarabangsa (cth. FTEJerez Sepanyol / CTC Aviation / CAE Oxford UK / New Zealand) & RB Flight Operations',
    trainingLocationEn: 'Accredited International Flight Academy (e.g. FTEJerez Spain / CTC Aviation / CAE Oxford UK / New Zealand) & RB Flight Operations',
    allowanceAndSalaryMs: 'Yuran Latihan & Elaun Luar Negeri Ditanggung Sepenuhnya oleh RB (Bernilai B$180,000+) ➔ Gaji Pegawai Pertama (First Officer): B$4,500 - B$8,000+/bulan ➔ Kapten: B$12,000 - B$20,000+/bulan.',
    allowanceAndSalaryEn: 'Full Flight Training Costs & Living Allowance Sponsored by RB (Worth B$180,000+) ➔ First Officer Salary: B$4,500 - B$8,000+/month ➔ Captain: B$12,000 - B$20,000+/month.',
    keyBenefitsMs: [
      '📌 Laluan Pelajar SMMH: Selepas O-Level, sambung ke Tingkatan 6 (PTET) untuk mengambil A-Level (Maths & Physics) sebelum memohon bila berumur 18 tahun.',
      'Lesen Juruterbang Komersil Antarabangsa (CPL/IR dengan ATPL Frozen).',
      'Jaminan kerjaya mengendalikan pesawat canggih Boeing 787 Dreamliner & Airbus A320neo.',
      'Tiket penerbangan tahunan percuma dan konsesi perjalanan untuk keluarga ke destinasi antarabangsa RB.',
      'Insurans kesihatan penerbangan dan elaun penerbangan antarabangsa.'
    ],
    keyBenefitsEn: [
      '📌 SMMH Student Roadmap: After O-Levels, enter Sixth Form (PTET) to complete A-Levels (Maths & Physics) before applying when reaching age 18.',
      'International Commercial Pilot License (CPL/IR with Frozen ATPL).',
      'Guaranteed airline career flying Boeing 787 Dreamliners & Airbus A320neo aircraft.',
      'Free annual duty tickets and heavily discounted staff travel for immediate family across RB global network.',
      'Comprehensive international pilot health & flight duty allowance.'
    ],
    careerProgressionMs: [
      'Lepasan Tingkatan 6 (A-Level / PTET) ➔ Cadet Pilot Trainee (18-24 bln)',
      'Second Officer (S/O) ➔ First Officer (F/O) ➔ Senior First Officer (SFO)',
      'Kapten Pesawat (Commander / Captain) ➔ Jurulatih Penerbangan / Type Rating Examiner (TRI/TRE)'
    ],
    careerProgressionEn: [
      'Sixth Form Graduate (A-Level / PTET) ➔ Cadet Pilot Trainee (18-24 months)',
      'Second Officer (S/O) ➔ First Officer (F/O) ➔ Senior First Officer (SFO)',
      'Airline Captain (Commander) ➔ Flight Instructor / Type Rating Examiner (TRI/TRE)'
    ],
    descriptionMs: 'Menjadi juruterbang pesawat komersial Royal Brunei Airlines. Sila ambil perhatian: Skim ini memerlukan kelayakan GCE \'A\' Level (atau Diploma/Ijazah) dan umur minimum 18 tahun. Pelajar SMMH disarankan menyasarkan kemasukan ke PTET (Pusat Tingkatan Enam Tutong) terlebih dahulu.',
    descriptionEn: 'Fly commercial airliners for Royal Brunei Airlines. Please note: This prestigious scheme requires GCE \'A\' Levels (or Diploma/Degree) and a minimum age of 18. SMMH O-Level students are advised to target Sixth Form (PTET) first.',
    wawasanAlignmentMs: 'Pembangunan Modal Insan Berkemahiran Tinggi & Keterhubungan Pengangkutan Antarabangsa.',
    wawasanAlignmentEn: 'High-Skilled Human Capital Development & Global Aviation Connectivity.',
    officialPortalUrl: 'https://www.flyroyalbrunei.com/brunei/en/careers/',
    portalNameMs: 'Laman Kerjaya Rasmi Royal Brunei Airlines',
    portalNameEn: 'Royal Brunei Airlines Careers Portal',
    recommendedRiasec: ['R', 'I', 'E']
  },

  // 3. Royal Brunei Airlines - Aircraft Maintenance Engineer Trainee (AMET)
  {
    id: 'rb-aircraft-maintenance',
    titleMs: 'Juruteknik & Jurutera Penyelenggaraan Pesawat (RB AMET)',
    titleEn: 'RB Aircraft Maintenance Engineer Trainee / Technician (AMET)',
    organizationMs: 'Royal Brunei Engineering (RB Maintenance, Repair & Overhaul)',
    organizationEn: 'Royal Brunei Engineering (RB MRO)',
    sector: 'aviation',
    sectorNameMs: 'Penerbangan & Syarikat Penerbangan',
    sectorNameEn: 'Aviation & Airlines',
    badgeColor: 'bg-sky-700 text-white',
    entryType: 'o_level_training',
    entryTypeLabelMs: 'Laluan O-Level + Diploma Teknikal IBTE/ATTC',
    entryTypeLabelEn: 'O-Level + IBTE/ATTC Technical Apprenticeship',
    minCredits: 4,
    coreRequirementsMs: [
      'Minimum 4 Kredit O-Level termasuk English Language (1123 Gred C6+), Mathematics D (4024 Gred C6+), dan Physics / Science.',
      'Seterusnya mengikuti program HNTec / Diploma in Aircraft Maintenance di IBTE Sultan Saiful Rijal / ATTC.',
      'Kemahiran analitikal yang teliti terhadap sistem mekanikal dan avionik pesawat.'
    ],
    coreRequirementsEn: [
      'Minimum 4 O-Level Credits including English Language (1123 Grade C6+), Mathematics D (4024 Grade C6+), and Physics / Science.',
      'Progress into HNTec / Diploma in Aircraft Maintenance at IBTE Sultan Saiful Rijal / ATTC.',
      'High attention to detail regarding aircraft mechanical, power-plant, and avionic systems.'
    ],
    physicalRequirementsMs: [
      'Penglihatan warna sempurna (Ujian Ishihara normal untuk pendawaian kabel avionik).',
      'Kecergasan fizikal untuk bekerja di hangar penyelenggaraan dan apron lapangan terbang.'
    ],
    physicalRequirementsEn: [
      'Perfect color vision (Ishihara color test for avionic wiring and safety circuits).',
      'Physical fitness to work in active aircraft hangars and airfield aprons.'
    ],
    trainingDurationMs: '2 - 3 Tahun (Diploma BDQF Tahap 5 + Latihan Amali Berlesen CAAB/EASA Part 66)',
    trainingDurationEn: '2 - 3 Years (BDQF Level 5 Diploma + CAAB/EASA Part 66 Practical Apprenticeship)',
    trainingLocationMs: 'Hangar Kejuruteraan RB, Lapangan Terbang Antarabangsa Brunei & IBTE Kampus Sultan Saiful Rijal',
    trainingLocationEn: 'RB Engineering Hangars, Brunei International Airport & IBTE SSR Campus',
    allowanceAndSalaryMs: 'Elaun Latihan Kerajaan/Tajaan: B$100 - B$350/bulan ➔ Gaji Juruteknik Berlesen: B$2,200 - B$4,500+/bulan ➔ Jurutera Berlesen EASA: B$5,000 - B$9,000+/bulan.',
    allowanceAndSalaryEn: 'Training Allowance: B$100 - B$350/month ➔ Licensed Technician Salary: B$2,200 - B$4,500+/month ➔ EASA Licensed Engineer: B$5,000 - B$9,000+/month.',
    keyBenefitsMs: [
      'Lesen Penyelenggaraan Pesawat Antarabangsa CAAB & EASA Part 66 (Kategori B1 Mekanikal / B2 Avionik).',
      'Kelayakan bernilai tinggi yang diiktiraf di seluruh industri penerbangan global.',
      'Kemudahan tiket konsesi penerbangan RB untuk staf kejuruteraan.'
    ],
    keyBenefitsEn: [
      'CAAB & EASA Part 66 Aircraft Maintenance License (Category B1 Mechanical / B2 Avionics).',
      'High-value qualification in perpetual global demand across aviation MRO facilities.',
      'Discounted staff flight tickets and international travel privileges.'
    ],
    careerProgressionMs: [
      'Trainee Aircraft Technician ➔ Junior Aircraft Technician',
      'Licensed Aircraft Engineer (LAE Category A/B1/B2)',
      'Lead Maintenance Engineer ➔ Base Maintenance Manager / Chief Technical Officer'
    ],
    careerProgressionEn: [
      'Trainee Aircraft Technician ➔ Junior Aircraft Technician',
      'Licensed Aircraft Engineer (LAE Category A/B1/B2)',
      'Lead Maintenance Engineer ➔ Base Maintenance Manager / Chief Technical Officer'
    ],
    descriptionMs: 'Memastikan pesawat komersil RB (Dreamliner 787 & A320neo) berada dalam keadaan keselamatan teknikal tertinggi sebelum setiap penerbangan berlepas.',
    descriptionEn: 'Maintain, inspect, and certify the airworthiness of Royal Brunei’s modern jet fleet to ensure peak safety standards for every single international flight.',
    wawasanAlignmentMs: 'Pertumbuhan Industri Penerbangan & Kejuruteraan Berteknologi Tinggi.',
    wawasanAlignmentEn: 'Aviation Engineering & High-Tech Maintenance Cluster.',
    officialPortalUrl: 'https://ibte.edu.bn',
    portalNameMs: 'Portal Pengambilan IBTE Sultan Saiful Rijal (Penerbangan)',
    portalNameEn: 'IBTE Sultan Saiful Rijal Aviation Intake Portal',
    recommendedRiasec: ['R', 'I', 'C']
  },

  // 4. Royal Brunei Airlines - Cabin Crew
  {
    id: 'rb-cabin-crew',
    titleMs: 'Krew Kabin & Pramugara / Pramugari Diraja (RB Cabin Crew)',
    titleEn: 'Royal Brunei Airlines Cabin Crew (Flight Attendants)',
    organizationMs: 'Syarikat Penerbangan Diraja Brunei (Royal Brunei Airlines - RB)',
    organizationEn: 'Royal Brunei Airlines (RB)',
    sector: 'aviation',
    sectorNameMs: 'Penerbangan & Syarikat Penerbangan',
    sectorNameEn: 'Aviation & Airlines',
    badgeColor: 'bg-sky-500 text-white',
    entryType: 'direct_o_level',
    entryTypeLabelMs: 'Kemasukan Terus Lepasan O-Level',
    entryTypeLabelEn: 'Direct Post-O Level Recruitment',
    minCredits: 4,
    coreRequirementsMs: [
      'Warganegara Brunei Darussalam (Rakyat Jati).',
      'Minimum 4 Kredit O-Level termasuk Bahasa Melayu dan English Language (Gred C6 ke atas).',
      'Kefasihan bertutur dalam Bahasa Melayu dan Bahasa Inggeris (Bahasa ketiga adalah satu kelebihan).',
      'Personaliti ramah, berhemah tinggi, dan berorientasikan layanan mesra Brunei.'
    ],
    coreRequirementsEn: [
      'Brunei Darussalam Citizen (Rakyat Jati).',
      'Minimum 4 O-Level Credits including Bahasa Melayu and English Language (Grade C6 or better).',
      'Fluent spoken communication in both Bahasa Melayu and English (third language is an asset).',
      'Warm, professional interpersonal skills embodying Brunei hospitality.'
    ],
    physicalRequirementsMs: [
      'Ketinggian minimum Wanita: 158 cm | Lelaki: 165 cm (mampu mencapai 210 cm tanpa kasut).',
      'Kebolehan berenang tanpa bantuan (50 meter) bagi tujuan keselamatan kecemasan di laut.',
      'Grooming profesional, kulit bersih, dan tiada tatu terdedah.'
    ],
    physicalRequirementsEn: [
      'Minimum height Female: 158 cm | Male: 165 cm (arm reach of 210 cm on tiptoes).',
      'Ability to swim 50 meters unaided for ditching safety procedures.',
      'Impeccable grooming, clear complexion, and no visible tattoos in uniform.'
    ],
    trainingDurationMs: '8 - 12 Minggu Kursus Keselamatan & Hospitaliti Penerbangan Intensif',
    trainingDurationEn: '8 - 12 Weeks Intensive Flight Safety & Hospitality Training',
    trainingLocationMs: 'RB Training Centre (RTC), Jalan Kustin, Berakas',
    trainingLocationEn: 'RB Training Centre (RTC), Jalan Kustin, Berakas',
    allowanceAndSalaryMs: 'Gaji Pokok + Elaun Penerbangan (Flying Hours) + Elaun Singgah Luar Negeri (Per Diem Layover): B$1,800 - B$3,200+/bulan.',
    allowanceAndSalaryEn: 'Basic Salary + Flight Hourly Allowance + Overseas Layover Per Diem: B$1,800 - B$3,200+/month.',
    keyBenefitsMs: [
      'Peluang melancong ke pelbagai destinasi dunia (London, Tokyo, Melbourne, Dubai, Seoul, dsb.).',
      'Elaun hotel 5-bintang dan makan minum semasa singgah di luar negara.',
      'Tiket diskaun penerbangan konsesi (ID90) untuk diri dan ahli keluarga terdekat.'
    ],
    keyBenefitsEn: [
      'Global travel to premier international destinations (London, Tokyo, Melbourne, Dubai, Seoul, etc.).',
      '5-star hotel accommodation and comprehensive layover allowances abroad.',
      'Generous staff airline concession travel tickets (ID90/ID50) for crew and immediate family.'
    ],
    careerProgressionMs: [
      'Junior Cabin Crew ➔ Senior Cabin Crew',
      'Flight Purser / Inflight Service Manager',
      'Cabin Crew Line Trainer / Inflight Performance Executive'
    ],
    careerProgressionEn: [
      'Junior Cabin Crew ➔ Senior Cabin Crew',
      'Flight Purser / Inflight Service Manager',
      'Cabin Crew Line Trainer / Inflight Performance Executive'
    ],
    descriptionMs: 'Duta barisan hadapan kebangsaan yang menyediakan perkhidmatan keselamatan penerbangan bertaraf 4-bintang dan layanan mesra khas Brunei kepada tetamu antarabangsa.',
    descriptionEn: 'The frontline ambassadors of Brunei Darussalam delivering 4-star inflight safety, emergency management, and warm Bruneian hospitality to international guests.',
    wawasanAlignmentMs: 'Sektor Pelancongan Antarabangsa & Perkhidmatan Berkualiti Tinggi.',
    wawasanAlignmentEn: 'Tourism & International Service Quality Pillar.',
    officialPortalUrl: 'https://www.flyroyalbrunei.com/brunei/en/careers/',
    portalNameMs: 'Pengambilan Krew Kabin RB',
    portalNameEn: 'RB Cabin Crew Recruitment',
    recommendedRiasec: ['S', 'E', 'A']
  },

  // 5. Royal Brunei Police Force (RBPF)
  {
    id: 'rbpf-konstabel',
    titleMs: 'Konstabel Pasukan Polis Diraja Brunei (RBPF)',
    titleEn: 'Royal Brunei Police Force (RBPF) Police Constable',
    organizationMs: 'Pasukan Polis Diraja Brunei (PPDB / RBPF)',
    organizationEn: 'Royal Brunei Police Force (RBPF)',
    sector: 'defense',
    sectorNameMs: 'Pertahanan & Keselamatan',
    sectorNameEn: 'Defense & Security',
    badgeColor: 'bg-sky-800 text-white',
    entryType: 'direct_o_level',
    entryTypeLabelMs: 'Kemasukan Terus Lepasan O-Level',
    entryTypeLabelEn: 'Direct Post-O Level Intake',
    minCredits: 2,
    coreRequirementsMs: [
      'Warganegara Brunei Darussalam (Rakyat Jati).',
      'Minimum 2 - 4 Kelulusan O-Level termasuk Bahasa Melayu.',
      'Umur 18 hingga 28 tahun semasa pendaftaran.',
      'Rekod kelakuan bersih tanpa sebarang sabitan jenayah.'
    ],
    coreRequirementsEn: [
      'Brunei Darussalam Citizen (Rakyat Jati).',
      'Minimum 2 - 4 O-Level Passes/Credits including Bahasa Melayu.',
      'Age between 18 and 28 years old at recruitment.',
      'Clean background check with zero criminal record.'
    ],
    physicalRequirementsMs: [
      'Ketinggian minimum Lelaki: 160 cm | Wanita: 155 cm.',
      'Lulus ujian kecergasan fizikal dan pemeriksaan kesihatan mata/pendengaran.'
    ],
    physicalRequirementsEn: [
      'Minimum height Male: 160 cm | Female: 155 cm.',
      'Pass standard physical fitness and vision/hearing medical checks.'
    ],
    trainingDurationMs: '6 - 9 Bulan Latihan Asas Kepolisan & Undang-undang',
    trainingDurationEn: '6 - 9 Months Basic Police & Legal Training',
    trainingLocationMs: 'Pusat Latihan Polis Gadong, Bandar Seri Begawan',
    trainingLocationEn: 'Police Training Centre, Gadong, Bandar Seri Begawan',
    allowanceAndSalaryMs: 'Gaji Skim Perkhidmatan Awam (JPA C1/C2): B$1,100 - B$1,750/bulan + Elaun Khas Kepolisan.',
    allowanceAndSalaryEn: 'Public Service Salary Scale (JPA C1/C2): B$1,100 - B$1,750/month + Police Duty Allowances.',
    keyBenefitsMs: [
      'Jawatan tetap dalam Perkhidmatan Awam Kerajaan Brunei.',
      'Kemudahan perumahan kuarters polis dan perubatan percuma.',
      'Peluang menyertai unit khas (Cawangan Khas, Marin Polis, Unit Simpanan Gurkha/PGA, Siasatan Forensik).'
    ],
    keyBenefitsEn: [
      'Permanent pensionable appointment in Brunei Public Service.',
      'Government police housing quarters and free medical coverage.',
      'Specialist units: Criminal Investigation, Marine Police, Traffic, Cybercrime, Forensics.'
    ],
    careerProgressionMs: [
      'Konstabel Percubaan ➔ Konstabel Tetap',
      'Lans Koperal ➔ Koperal ➔ Sarjan ➔ Sarjan Mejar',
      'Peluang temuduga kenaikan pangkat ke Inspektor Polis Percubaan bagi yang mempunyai kredit akademik/kecemerlangan rekod.'
    ],
    careerProgressionEn: [
      'Probationary Constable ➔ Police Constable',
      'Lance Corporal ➔ Corporal ➔ Sergeant ➔ Station Sergeant',
      'Promotion path to Probationary Inspector via internal board review.'
    ],
    descriptionMs: 'Menegakkan undang-undang, membanteras jenayah, menyiasat kes keselamatan, dan memastikan keamanan ketenteraman awam di seluruh mukim dan daerah di Brunei.',
    descriptionEn: 'Enforce laws, prevent and investigate crime, maintain community safety, and ensure rule of law across all districts of Brunei Darussalam.',
    wawasanAlignmentMs: 'Kestabilan Politik & Keselamatan Komuniti.',
    wawasanAlignmentEn: 'Rule of Law, Community Safety & Social Stability.',
    officialPortalUrl: 'https://police.gov.bn',
    portalNameMs: 'Portal Pengambilan Polis Diraja Brunei',
    portalNameEn: 'Royal Brunei Police Force Recruitment',
    recommendedRiasec: ['S', 'C', 'E']
  },

  // 6. Maritime & Energy - BGC Deck / Engine Cadet
  {
    id: 'bgc-marine-cadet',
    titleMs: 'Kadet Pegawai Maritim Kapal LNG (BGC Deck / Engine Cadet)',
    titleEn: 'Brunei Gas Carriers (BGC) Maritime Cadet Officer',
    organizationMs: 'Brunei Gas Carriers Sdn Bhd (BGC / BMPC)',
    organizationEn: 'Brunei Gas Carriers Sdn Bhd (BGC)',
    sector: 'maritime_energy',
    sectorNameMs: 'Maritim, Minyak & Gas',
    sectorNameEn: 'Maritime, Oil & Gas',
    badgeColor: 'bg-sky-900 text-white',
    entryType: 'cadetship',
    entryTypeLabelMs: 'Tajaan Penuh / Skim Kadet Maritim',
    entryTypeLabelEn: 'Fully Sponsored Maritime Cadetship',
    minCredits: 4,
    coreRequirementsMs: [
      'Warganegara Brunei Darussalam (Rakyat Jati).',
      'Minimum 4 - 5 Kredit O-Level termasuk English Language (Gred C6+), Mathematics D (Gred C6+), dan Physics / Science.',
      'Seterusnya mengikuti latihan di Akademi Maritim (cth. Singapore Maritime Academy / Akedemi Laut Malaysia - ALAM) tajaan BGC.',
      'Kecergasan mental dan fizikal untuk pelayaran laut antarabangsa.'
    ],
    coreRequirementsEn: [
      'Brunei Darussalam Citizen (Rakyat Jati).',
      'Minimum 4 - 5 O-Level Credits including English Language (C6+), Mathematics D (C6+), and Physics / Science.',
      'Progress to sponsored maritime academy training (e.g. Singapore Maritime Academy / ALAM) under BGC scholarship.',
      'Strong mental and physical stamina for international open-sea voyages.'
    ],
    physicalRequirementsMs: [
      'Pemeriksaan Kesihatan Maritim Piawaian Antarabangsa (ENG1 / IMO Medical).',
      'Penglihatan warna sempurna (Ujian tanglung untuk navigasi lampu kapal malam).'
    ],
    physicalRequirementsEn: [
      'Pass International Maritime Health Standard (ENG1 / IMO Medical).',
      'Perfect color vision (Lantern test for nighttime navigation light recognition).'
    ],
    trainingDurationMs: '3 - 4 Tahun (Akademi Maritim + 12 Bulan Latihan Laut Di Atas Kapal LNG)',
    trainingDurationEn: '3 - 4 Years (Maritime Academy + 12 Months Sea-Time on LNG Tankers)',
    trainingLocationMs: 'Akademi Maritim Bertauliah & Kapal-kapal LNG Brunei Gas Carriers (Pelayaran Antarabangsa)',
    trainingLocationEn: 'Accredited Maritime Academy & BGC LNG Fleet (Worldwide Trading)',
    allowanceAndSalaryMs: 'Yuran & Elaun Tajaan Penuh Semasa Kadet: B$600 - B$1,200/bulan ➔ Pegawai Laut (3rd Officer / 4th Engineer): B$3,800 - B$6,500/bulan ➔ Kapten Kapal / Ketua Jurutera: B$14,000 - B$22,000+/bulan.',
    allowanceAndSalaryEn: 'Full Tuition & Cadet Allowance: B$600 - B$1,200/month ➔ Sea Officer (3rd Mate / 4th Eng): B$3,800 - B$6,500/month ➔ Ship Master / Chief Engineer: B$14,000 - B$22,000+/month.',
    keyBenefitsMs: [
      'Sijil Perakuan Kecekapan Antarabangsa (Certificate of Competency - CoC Class 1 Master / Chief Engineer).',
      'Mengemudi armada kapal pengangkut Gas Asli Cecair (LNG) berteknologi tinggi.',
      'Jadual kerja pusingan laut (contoh: 3 bulan di laut, 3 bulan cuti bergaji penuh di Brunei).'
    ],
    keyBenefitsEn: [
      'International Certificate of Competency (CoC Class 1 Master Mariner / Chief Engineer).',
      'Command state-of-the-art liquefied natural gas (LNG) carrier vessels.',
      'Balanced rotation work schedules (e.g., 3 months on-board, 3 months fully paid leave at home).'
    ],
    careerProgressionMs: [
      'Deck / Engine Cadet ➔ Pegawai Navigasi (3rd / 2nd Officer)',
      'Ketua Pegawai (Chief Officer) / Jurutera Pertama (2nd Engineer)',
      'Nakhoda Kapal (Captain / Master Mariner) / Ketua Jurutera (Chief Engineer)'
    ],
    careerProgressionEn: [
      'Deck / Engine Cadet ➔ Navigation Officer (3rd / 2nd Officer)',
      'Chief Officer / Second Engineer',
      'Ship Master (Captain) / Chief Engineer'
    ],
    descriptionMs: 'Mengurus dan mengemudi kapal-kapal tangki LNG Brunei mengangkut sumber tenaga gas asli dari Lumut ke Jepun, Korea, Taiwan dan pasaran antarabangsa.',
    descriptionEn: 'Navigate and operate Brunei’s modern LNG fleet, safely delivering natural gas energy cargo from Lumut LNG terminal to key international markets.',
    wawasanAlignmentMs: 'Kemandirian Industri Maritim & Kluster Minyak & Gas.',
    wawasanAlignmentEn: 'Maritime Energy Infrastructure & Economic Diversification.',
    officialPortalUrl: 'https://bgc.com.bn',
    portalNameMs: 'Portal Pengambilan Kadet Brunei Gas Carriers',
    portalNameEn: 'BGC Maritime Cadetship Portal',
    recommendedRiasec: ['R', 'I', 'C']
  },

  // 7. Healthcare & Paramedical (PAPRSB IHS / MoH)
  {
    id: 'moh-nursing-paramedic',
    titleMs: 'Penolong Jururawat & Paramedik Kecemasan (MoH / PAPRSB IHS)',
    titleEn: 'Assistant Nurse & Emergency Paramedic Trainee',
    organizationMs: 'Kementerian Kesihatan (Ministry of Health / PAPRSB IHS)',
    organizationEn: 'Ministry of Health (MoH / PAPRSB IHS)',
    sector: 'public_health',
    sectorNameMs: 'Perkhidmatan Kesihatan & Komuniti',
    sectorNameEn: 'Healthcare & Public Health',
    badgeColor: 'bg-emerald-600 text-white',
    entryType: 'o_level_training',
    entryTypeLabelMs: 'Laluan O-Level + Diploma Kesihatan',
    entryTypeLabelEn: 'O-Level + Healthcare Diploma Pathway',
    minCredits: 4,
    coreRequirementsMs: [
      'Minimum 4 Kredit O-Level termasuk Bahasa Melayu, English Language (C6+), Mathematics, dan Biology / Combined Science.',
      'Seterusnya mengikuti program Diploma in Health Sciences (Nursing / Paramedic) di PAPRSB IHS UBD atau Politeknik Brunei.',
      'Sifat belas kasihan, tenang di bawah tekanan, dan komited terhadap kesihatan pesakit.'
    ],
    coreRequirementsEn: [
      'Minimum 4 O-Level Credits including Bahasa Melayu, English Language (C6+), Mathematics, and Biology / Combined Science.',
      'Progress to Diploma in Health Sciences (Nursing / Paramedic) at PAPRSB IHS UBD or Politeknik Brunei.',
      'High empathy, composure under critical emergency conditions, and dedication to patient care.'
    ],
    physicalRequirementsMs: [
      'Pemeriksaan perubatan penuh hospital dan suntikan imunisasi Hepatitis B.',
      'Daya ketahanan fizikal untuk giliran shif bertugas 24-jam di wad kecemasan.'
    ],
    physicalRequirementsEn: [
      'Full hospital medical examination and Hepatitis B vaccination.',
      'Physical endurance for 24-hour shift rotations and emergency ambulance response.'
    ],
    trainingDurationMs: '3 Tahun (Diploma Kesihatan Bersekutu BDQF Tahap 5)',
    trainingDurationEn: '3 Years (BDQF Level 5 Allied Health Diploma)',
    trainingLocationMs: 'PAPRSB Institut Sains Kesihatan (UBD) / Politeknik Brunei & Hospital RIPAS / Hospital Pengiran Muda Mahkota Al-Muhtadee Billah Tutong',
    trainingLocationEn: 'PAPRSB IHS UBD / PB School of Health Sciences & RIPAS / PMMPMHAMB Hospital Tutong',
    allowanceAndSalaryMs: 'Elaun Pelajar Kerajaan Semasa Latihan: B$45 - B$100/bulan ➔ Gaji Jururawat/Paramedik (JPA B2/C2): B$1,800 - B$3,100+/bulan + Elaun Bahaya & Shif.',
    allowanceAndSalaryEn: 'Government Student Allowance: B$45 - B$100/month ➔ Staff Nurse/Paramedic Salary (JPA B2/C2): B$1,800 - B$3,100+/month + Hazard & Shift Allowances.',
    keyBenefitsMs: [
      'Jawatan tetap berpencen dalam Perkhidmatan Awam Kementerian Kesihatan.',
      'Peluang melanjutkan ijazah Sarjana Muda dan pengkhususan klinikal (ICU, Pediatrik, Kardiologi).',
      'Khidmat mulia membantu menyelamatkan nyawa masyarakat di hospital dan pusat kesihatan tempatan.'
    ],
    keyBenefitsEn: [
      'Permanent pensionable appointment within Ministry of Health.',
      'Clear pathway to Bachelor of Nursing Degree and clinical specialization (ICU, Pediatrics, Cardiology).',
      'Noble lifelong calling serving community health across Tutong and nationwide hospitals.'
    ],
    careerProgressionMs: [
      'Staff Nurse / Paramedik Kecemasan ➔ Jururawat Kanan (Senior Staff Nurse)',
      'Ketua Jururawat (Nursing Sister / Matron) / Pegawai Paramedik Kanan',
      'Pengurus Perkhidmatan Kejururawatan Hospital (Chief Nursing Officer)'
    ],
    careerProgressionEn: [
      'Staff Nurse / Emergency Paramedic ➔ Senior Staff Nurse',
      'Nursing Sister / Clinical Nurse Specialist',
      'Hospital Matron / Chief Nursing Officer'
    ],
    descriptionMs: 'Memberikan rawatan perubatan kecemasan, penjagaan rawatan pesakit kritikal di hospital, dan khidmat ambulans kecemasan 991 di seluruh Brunei.',
    descriptionEn: 'Deliver vital frontline acute emergency medical care, intensive hospital ward nursing, and rapid 991 ambulance response across Brunei Darussalam.',
    wawasanAlignmentMs: 'Kualiti Kehidupan & Perkhidmatan Kesihatan Awam.',
    wawasanAlignmentEn: 'World-Class Healthcare & High Quality of Life Pillar.',
    officialPortalUrl: 'https://moh.gov.bn',
    portalNameMs: 'Portal Pengambilan Kementerian Kesihatan',
    portalNameEn: 'Ministry of Health Career Opportunities',
    recommendedRiasec: ['S', 'I', 'R']
  }
];
