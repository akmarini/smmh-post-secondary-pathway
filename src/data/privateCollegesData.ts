export interface PrivateProgramme {
  id: string;
  name: string;
  nameMs?: string;
  nameEn?: string;
  level: 'Foundation' | 'BDQF Level 3' | 'BDQF Level 4' | 'BDQF Level 5 (Diploma)' | 'Top-up Degree (Level 6)';
  bdqfLevelNumber: 3 | 4 | 5 | 6;
  fieldCategory: 'it_computing' | 'business_finance' | 'hospitality_culinary' | 'creative_media' | 'accounting';
  duration: string;
  durationMs: string;
  durationEn: string;
  minCredits: number;
  minCreditNoteMs: string;
  minCreditNoteEn: string;
  awardingBody: string;
  intakeMonths: string;
  overviewMs: string;
  overviewEn: string;
  keyModulesMs: string[];
  keyModulesEn: string[];
  careerOutcomesMs: string[];
  careerOutcomesEn: string[];
  nextProgressionMs: string;
  nextProgressionEn: string;
}

export interface PrivateInstitution {
  id: string;
  name: string;
  nameMs: string;
  nameEn: string;
  shortName: string;
  badge: string;
  established: string;
  campusLocationMs: string;
  campusLocationEn: string;
  accreditationMs: string;
  accreditationEn: string;
  descriptionMs: string;
  descriptionEn: string;
  highlightsMs: string[];
  highlightsEn: string[];
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  programmes: PrivateProgramme[];
}

export const PRIVATE_INSTITUTIONS_DATA: PrivateInstitution[] = [
  {
    id: 'ccct',
    name: 'Cosmopolitan College of Commerce & Technology (CCCT)',
    nameMs: 'Cosmopolitan College of Commerce & Technology (CCCT)',
    nameEn: 'Cosmopolitan College of Commerce & Technology (CCCT)',
    shortName: 'CCCT',
    badge: 'Perniagaan, IT & Media Kreatif',
    established: '2004',
    campusLocationMs: 'Jaya Setia Square, Berakas, Brunei Darussalam',
    campusLocationEn: 'Jaya Setia Square, Berakas, Brunei Darussalam',
    accreditationMs: 'Diiktiraf BDQF & Majlis Kebangsaan Pengiktirafan Kelayakan (MKPK), Kementerian Pendidikan Brunei.',
    accreditationEn: 'Accredited by BDQF & National Accreditation Council (MKPK), Ministry of Education Brunei.',
    descriptionMs: 'CCCT ialah antara kolej swasta terkemuka di Brunei yang menawarkan program Foundation, Sijil dan Diploma BDQF Tahap 4 & 5 dalam bidang Teknologi Maklumat, Pengkomputeran, Perniagaan, Perakaunan, dan Media Kreatif dengan laluan kemasukan yang anjal.',
    descriptionEn: 'CCCT is a leading private college in Brunei offering Foundation, Certificate, and BDQF Level 4 & 5 Diplomas in Information Technology, Computing, Business Administration, Accounting, and Creative Multimedia with flexible entry pathways.',
    highlightsMs: [
      'Laluan kemasukan terbuka bermula dari 1 hingga 4 Kredit O-Level',
      'Makmal komputer moden, studio multimedia, dan perisian industri terkini',
      'Penempatan latihan industri (internship) bersama syarikat korporat tempatan',
      'Laluan artikulasi terus ke tahun akhir Ijazah Sarjana Muda di UK / institusi rakan kongsi'
    ],
    highlightsEn: [
      'Accessible entry pathways starting from 1 to 4 O-Level Credits',
      'State-of-the-art computer labs, multimedia suites, and industry-standard software',
      'Structured industry internship placements with leading local corporate firms',
      'Direct articulation routes into final year Bachelor Degree programmes at UK partner universities'
    ],
    contactEmail: 'info@cosmopolitan.edu.bn',
    contactPhone: '+673 234 3866 / +673 234 3867',
    websiteUrl: 'https://www.cosmopolitan.edu.bn',
    programmes: [
      {
        id: 'ccct-found-it',
        name: 'Foundation Certificate in Information Technology',
        nameMs: 'Sijil Asas Teknologi Maklumat (Foundation in IT)',
        nameEn: 'Foundation Certificate in Information Technology',
        level: 'Foundation',
        bdqfLevelNumber: 3,
        fieldCategory: 'it_computing',
        duration: '1 Tahun (2 Semester)',
        durationMs: '1 Tahun (2 Semester)',
        durationEn: '1 Year (2 Semesters)',
        minCredits: 1,
        minCreditNoteMs: '1 Kredit O-Level dalam mana-mana mata pelajaran atau tamat Tahun 11 SMMH.',
        minCreditNoteEn: '1 O-Level Credit in any subject or Year 11 secondary school completion.',
        awardingBody: 'CCCT / Pearson BTEC & BDQF Level 3',
        intakeMonths: 'Mac & September',
        overviewMs: 'Program persediaan asas yang komprehensif bagi pelajar yang ingin membina kemahiran asas dalam perkakasan komputer, pengaturcaraan asas, pembangunan laman web, dan aplikasi perkantoran.',
        overviewEn: 'A preparatory foundation programme designed for school leavers to acquire fundamental skills in computing hardware, basic coding, web creation, and essential office productivity tools.',
        keyModulesMs: [
          'Pengenalan kepada Sistem Komputer & Rangkaian',
          'Asas Pembangunan Web (HTML/CSS)',
          'Asas Logik Pengaturcaraan',
          'Kemahiran Komunikasi Profesional & IT'
        ],
        keyModulesEn: [
          'Introduction to Computer Systems & Networking',
          'Fundamentals of Web Development (HTML/CSS)',
          'Programming Logic & Problem Solving',
          'Professional IT Communication Skills'
        ],
        careerOutcomesMs: [
          'Pembantu Sokongan IT Junior',
          'Pengendali Data Komputer',
          'Kelayakan menyambung ke Diploma BDQF Tahap 4/5 di CCCT'
        ],
        careerOutcomesEn: [
          'Junior IT Support Assistant',
          'Computer Operations Clerk',
          'Eligible for direct progression to Level 4/5 Diplomas at CCCT'
        ],
        nextProgressionMs: 'Layak terus menyambung ke Diploma in Information Technology (BDQF Level 5) di CCCT.',
        nextProgressionEn: 'Direct progression into Diploma in Information Technology (BDQF Level 5) at CCCT.'
      },
      {
        id: 'ccct-dip-it',
        name: 'Diploma in Information Technology (BDQF Level 5)',
        nameMs: 'Diploma Teknologi Maklumat (BDQF Tahap 5)',
        nameEn: 'Diploma in Information Technology (BDQF Level 5)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'it_computing',
        duration: '2 - 2.5 Tahun',
        durationMs: '2 - 2.5 Tahun',
        durationEn: '2 - 2.5 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Matematik atau Sains Komputer) ATAU Lulus Foundation in IT CCCT.',
        minCreditNoteEn: '4 O-Level Credits (including Mathematics or Computing) OR Pass CCCT Foundation in IT.',
        awardingBody: 'CCCT / Pearson BTEC HND / BDQF Level 5',
        intakeMonths: 'Mac, Julai & Oktober',
        overviewMs: 'Program diploma bertaraf antarabangsa yang melatih pelajar dalam pengaturcaraan perisian (Java/Python), pangkalan data SQL, keselamatan siber, pentadbiran pelayan, dan pembangunan aplikasi mudah alih.',
        overviewEn: 'Internationally recognized diploma training students in software engineering (Java/Python), SQL databases, cyber security principles, server administration, and mobile app development.',
        keyModulesMs: [
          'Pembangunan Perisian Berorientasikan Objek',
          'Pengurusan Pangkalan Data & SQL',
          'Pentadbiran Rangkaian & Keselamatan Siber',
          'Pembangunan Aplikasi Web & Mudah Alih',
          'Latihan Industri Praktikal (3 Bulan)'
        ],
        keyModulesEn: [
          'Object-Oriented Software Development',
          'Database Management Systems & SQL',
          'Network Administration & Cybersecurity',
          'Web & Mobile App Engineering',
          'Practical Industry Internship (3 Months)'
        ],
        careerOutcomesMs: [
          'Juruteknik Rangkaian Komputer',
          'Pembangun Web & Perisian Junior',
          'Pentadbir Pangkalan Data',
          'Penganalisis Sokongan IT Sektor Awam & Swasta'
        ],
        careerOutcomesEn: [
          'Computer Network Technician',
          'Junior Software / Web Developer',
          'Database Support Administrator',
          'IT Systems Support Analyst'
        ],
        nextProgressionMs: 'Menyambung ke Tahun Akhir (Top-Up Year) Ijazah Sarjana Muda BSc (Hons) Computing di universiti UK atau universiti tempatan.',
        nextProgressionEn: 'Articulate into Final Year (Top-Up) BSc (Hons) Computing at UK partner universities or local universities.'
      },
      {
        id: 'ccct-found-biz',
        name: 'Foundation Certificate in Business Administration',
        nameMs: 'Sijil Asas Pentadbiran Perniagaan (Foundation in Business)',
        nameEn: 'Foundation Certificate in Business Administration',
        level: 'Foundation',
        bdqfLevelNumber: 3,
        fieldCategory: 'business_finance',
        duration: '1 Tahun',
        durationMs: '1 Tahun',
        durationEn: '1 Year',
        minCredits: 1,
        minCreditNoteMs: '1 Kredit O-Level dalam mana-mana subjek atau lepasan Tahun 11 SMMH.',
        minCreditNoteEn: '1 O-Level Credit in any subject or Year 11 school leaver.',
        awardingBody: 'CCCT / BDQF Level 3',
        intakeMonths: 'Mac & September',
        overviewMs: 'Mendedahkan pelajar kepada konsep perniagaan moden, komunikasi korporat, pemasaran asas, perakaunan perniagaan dan kemahiran pengurusan pejabat.',
        overviewEn: 'Introduces students to contemporary commerce concepts, corporate communications, fundamental marketing, business numeracy, and office management skills.',
        keyModulesMs: [
          'Prinsip Perniagaan & Pengurusan',
          'Asas Pemasaran & Perkhidmatan Pelanggan',
          'Asas Perakaunan & Kewangan Perniagaan',
          'Komunikasi Perniagaan & Penulisan Laporan'
        ],
        keyModulesEn: [
          'Principles of Business & Management',
          'Marketing Fundamentals & Customer Care',
          'Introductory Accounting & Business Finance',
          'Business Communications & Report Writing'
        ],
        careerOutcomesMs: [
          'Pembantu Tadbir Perniagaan',
          'Kerani Khidmat Pelanggan',
          'Pembantu Operasi Runcit / Pemasaran'
        ],
        careerOutcomesEn: [
          'Administrative Business Assistant',
          'Customer Support Clerk',
          'Retail / Operations Assistant'
        ],
        nextProgressionMs: 'Menyambung ke Diploma in Business Administration (BDQF Level 5) di CCCT.',
        nextProgressionEn: 'Direct entry into Diploma in Business Administration (BDQF Level 5) at CCCT.'
      },
      {
        id: 'ccct-dip-biz',
        name: 'Diploma in Business Administration (BDQF Level 5)',
        nameMs: 'Diploma Pentadbiran Perniagaan (BDQF Tahap 5)',
        nameEn: 'Diploma in Business Administration (BDQF Level 5)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'business_finance',
        duration: '2 Tahun',
        durationMs: '2 Tahun',
        durationEn: '2 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Bahasa Melayu / Bahasa Inggeris / Matematik) ATAU Lulus Foundation Business.',
        minCreditNoteEn: '4 O-Level Credits (including BM / English / Mathematics) OR Pass Foundation in Business.',
        awardingBody: 'CCCT / Pearson BTEC / BDQF Level 5',
        intakeMonths: 'Mac, Julai & Oktober',
        overviewMs: 'Menyediakan graduan berdaya saing dalam pengurusan sumber manusia, perancangan strategik perniagaan, pemasaran digital, undang-undang perniagaan, dan kewangan korporat.',
        overviewEn: 'Equips graduates with competitive acumen in human resource management, strategic business planning, digital marketing, commercial law, and corporate finance.',
        keyModulesMs: [
          'Pengurusan Sumber Manusia & Gelagat Organisasi',
          'Pemasaran Digital & E-Dagang',
          'Kewangan Korporat & Pengurusan Belanjawan',
          'Keusahawanan & Perancangan Perniagaan Baru',
          'Projek Penyelidikan & Latihan Industri'
        ],
        keyModulesEn: [
          'Human Resource Management & Organizational Behavior',
          'Digital Marketing & E-Commerce Strategies',
          'Corporate Finance & Budgetary Control',
          'Entrepreneurship & New Venture Planning',
          'Applied Research Project & Industrial Attachment'
        ],
        careerOutcomesMs: [
          'Eksekutif Pentadbiran & Operasi',
          'Eksekutif Pemasaran & Media Sosial',
          'Pegawai Khidmat Pelanggan Bank & Korporat',
          'Usahawan Perusahaan Mikro, Kecil & Sederhana (PMKS)'
        ],
        careerOutcomesEn: [
          'Administrative & Operations Executive',
          'Marketing & Social Media Executive',
          'Bank / Corporate Customer Relationship Officer',
          'MSME Business Entrepreneur'
        ],
        nextProgressionMs: 'Menyambung ke Ijazah Sarjana Muda BA (Hons) Business Administration di universiti tempatan atau luar negara.',
        nextProgressionEn: 'Progress to Final Year BA (Hons) Business Management / Administration degrees at local or overseas universities.'
      },
      {
        id: 'ccct-dip-multimedia',
        name: 'Diploma in Creative Multimedia & Digital Media (BDQF Level 5)',
        nameMs: 'Diploma Multimedia Kreatif & Media Digital (BDQF Tahap 5)',
        nameEn: 'Diploma in Creative Multimedia & Digital Media (BDQF Level 5)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'creative_media',
        duration: '2 - 2.5 Tahun',
        durationMs: '2 - 2.5 Tahun',
        durationEn: '2 - 2.5 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (Kredit Seni / Komputer / Bahasa adalah satu kelebihan).',
        minCreditNoteEn: '4 O-Level Credits (Credits in Art / Computing / Languages advantageous).',
        awardingBody: 'CCCT / BDQF Level 5',
        intakeMonths: 'Mac & Oktober',
        overviewMs: 'Program kreatif yang menggabungkan reka bentuk grafik digital, animasi 2D/3D, penyuntingan video sinematik, kesan visual (VFX), dan reka bentuk UX/UI interaktif.',
        overviewEn: 'A hands-on creative curriculum combining digital graphic design, 2D/3D animation, cinematic video production, visual effects (VFX), and interactive UX/UI design.',
        keyModulesMs: [
          'Reka Bentuk Grafik Digital (Photoshop, Illustrator)',
          'Animasi 2D & 3D (Blender / Maya)',
          'Produksi Video Digital & Suntingan Audio',
          'Reka Bentuk Pengalaman Pengguna (UI/UX Design)',
          'Portfolio Kreatif & Latihan Industri'
        ],
        keyModulesEn: [
          'Digital Graphic Design (Photoshop, Illustrator)',
          '2D & 3D Computer Animation (Blender / Maya)',
          'Digital Video Production & Sound Editing',
          'UI/UX User Experience Design',
          'Creative Showreel Portfolio & Industrial Placement'
        ],
        careerOutcomesMs: [
          'Pereka Grafik & Pereka Jenama',
          'Penyunting Video & Pencipta Kandungan Digital',
          'Artis Animasi 3D & Ilustrator',
          'Pereka Antara Muka UI/UX'
        ],
        careerOutcomesEn: [
          'Graphic & Brand Identity Designer',
          'Video Editor & Digital Content Producer',
          '3D Animator & Digital Illustrator',
          'UI/UX Interface Designer'
        ],
        nextProgressionMs: 'Menyambung ke Ijazah Sarjana Muda BA (Hons) Creative Media / Digital Animation di institusi luar negara atau universiti rakan kongsi.',
        nextProgressionEn: 'Progress to BA (Hons) Creative Media / Digital Animation degrees overseas or with university partners.'
      }
    ]
  },
  {
    id: 'micronet',
    name: 'Micronet International College',
    nameMs: 'Micronet International College',
    nameEn: 'Micronet International College',
    shortName: 'Micronet',
    badge: 'Pakar IT, Komputer & Keselamatan Siber',
    established: '1989',
    campusLocationMs: 'Kampus Jerudong & Kampus Bandar Seri Begawan',
    campusLocationEn: 'Jerudong Campus & Bandar Seri Begawan Campus',
    accreditationMs: 'Diiktiraf BDQF, MKPK Brunei, Pearson BTEC (UK), dan NCC Education (UK).',
    accreditationEn: 'Accredited by BDQF, MKPK Brunei, Pearson BTEC (UK), and NCC Education (UK).',
    descriptionMs: 'Micronet International College merupakan perintis pendidikan komputer dan teknologi maklumat di Brunei dengan pengalaman lebih 35 tahun, menawarkan kelayakan Pearson BTEC & NCC Education UK dari peringkat Sijil, Diploma hingga Laluan Ijazah.',
    descriptionEn: 'Micronet International College is a pioneer of computer and IT education in Brunei with over 35 years of educational heritage, offering Pearson BTEC & NCC Education UK qualifications from Certificate, Diploma to Degree routes.',
    highlightsMs: [
      'Pusat latihan rasmi BTEC UK & NCC Education di Brunei',
      'Laluan ijazah terus melalui kerjasama universiti berprestij UK (University of Essex, University of Sunderland)',
      'Makmal rangkaian CISCO, server room, dan kemudahan ujian perisian berdedikasi',
      'Graduan berkemahiran tinggi yang diiktiraf industri tempatan dan serantau'
    ],
    highlightsEn: [
      'Official accredited UK BTEC & NCC Education centre in Brunei',
      'Direct degree progression through prestige UK university partnerships (University of Essex, University of Sunderland)',
      'Dedicated CISCO network labs, server suites, and software testing environments',
      'High graduate employability recognized across local telecommunications and IT sectors'
    ],
    contactEmail: 'info@micronet.com.bn',
    contactPhone: '+673 265 1111 (Jerudong) / +673 223 4025 (Bandar)',
    websiteUrl: 'https://www.micronet.com.bn',
    programmes: [
      {
        id: 'micro-btec-l3',
        name: 'Pearson BTEC Level 3 International Diploma in Information Technology',
        nameMs: 'Pearson BTEC Tahap 3 Diploma Antarabangsa dalam Teknologi Maklumat',
        nameEn: 'Pearson BTEC Level 3 International Diploma in Information Technology',
        level: 'BDQF Level 4',
        bdqfLevelNumber: 4,
        fieldCategory: 'it_computing',
        duration: '1 - 1.5 Tahun',
        durationMs: '1 - 1.5 Tahun',
        durationEn: '1 - 1.5 Years',
        minCredits: 1,
        minCreditNoteMs: '1 hingga 3 Kredit O-Level atau tamat persekolahan Tahun 11 SMMH.',
        minCreditNoteEn: '1 to 3 O-Level Credits or successful completion of Year 11 SMMH.',
        awardingBody: 'Pearson BTEC (UK) / BDQF Level 4',
        intakeMonths: 'Januari, April & Ogos',
        overviewMs: 'Program asas teknikal yang intensif merangkumi perkakasan sistem, sistem pengendalian Windows/Linux, reka bentuk web, sokongan teknikal komputer dan pengaturcaraan permulaan.',
        overviewEn: 'An intensive technical foundation curriculum covering computer systems, Windows/Linux operating systems, web design, IT technical troubleshooting, and foundational programming.',
        keyModulesMs: [
          'Sistem Komputer & Perkakasan',
          'Komunikasi Data & Asas Rangkaian',
          'Pengaturcaraan Komputer Asas',
          'Pembangunan Laman Web & Multimedia'
        ],
        keyModulesEn: [
          'Computer Systems & Hardware Architecture',
          'Data Communications & Networking Essentials',
          'Foundations of Computer Programming',
          'Website Development & Digital Media'
        ],
        careerOutcomesMs: [
          'Juruteknik Meja Bantuan IT',
          'Pembantu Penyelenggaraan Komputer',
          'Layak terus ke BTEC Level 5 HND di Micronet'
        ],
        careerOutcomesEn: [
          'IT Helpdesk Technician',
          'Computer Maintenance Assistant',
          'Direct progression to BTEC Level 5 HND at Micronet'
        ],
        nextProgressionMs: 'Lulus dengan cemerlang membolehkan kemasukan terus ke Pearson BTEC Level 5 HND in Computing di Micronet.',
        nextProgressionEn: 'Seamless progression into Pearson BTEC Level 5 Higher National Diploma (HND) in Computing at Micronet.'
      },
      {
        id: 'micro-btec-hnd-se',
        name: 'Pearson BTEC Level 5 Higher National Diploma (HND) in Computing (Software Engineering)',
        nameMs: 'Pearson BTEC Tahap 5 HND Pengkomputeran (Kejuruteraan Perisian)',
        nameEn: 'Pearson BTEC Level 5 Higher National Diploma (HND) in Computing (Software Engineering)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'it_computing',
        duration: '2 Tahun',
        durationMs: '2 Tahun',
        durationEn: '2 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Matematik) ATAU Lulus BTEC Level 3 Diploma.',
        minCreditNoteEn: '4 O-Level Credits (including Mathematics) OR Pass in BTEC Level 3 Diploma.',
        awardingBody: 'Pearson BTEC (UK) / BDQF Level 5',
        intakeMonths: 'Januari, Mei & Ogos',
        overviewMs: 'Kelayakan peringkat tinggi berprestij yang menfokuskan kepada pembangunan sistem perisian berskala besar, seni bina aplikasi awan (Cloud), pangkalan data berstruktur, dan metodologi Agile.',
        overviewEn: 'A flagship high-level qualification focusing on enterprise software engineering, cloud architecture, structured database administration, and Agile development methodologies.',
        keyModulesMs: [
          'Struktur Data & Algoritma Pengaturcaraan',
          'Pembangunan Aplikasi Perusahaan (Enterprise Java / C#)',
          'Seni Bina Pengkomputeran Awan (Cloud Computing)',
          'Keselamatan Maklumat & Audit Sistem',
          'Projek Pembangunan Perisian Industri'
        ],
        keyModulesEn: [
          'Data Structures & Algorithms',
          'Enterprise Software Development (Java / C#)',
          'Cloud Computing Architecture & Virtualization',
          'Information Security & Systems Auditing',
          'Industry Capstone Software Project'
        ],
        careerOutcomesMs: [
          'Jurutera Perisian (Software Engineer)',
          'Pembangun Aplikasi Web Full-Stack',
          'Penganalisis Sistem Komputer',
          'Pentadbir Pangkalan Data Korporat'
        ],
        careerOutcomesEn: [
          'Software Engineer / Application Developer',
          'Full-Stack Web Developer',
          'Systems Analyst',
          'Corporate Database Administrator'
        ],
        nextProgressionMs: 'Menyambung terus ke Tahun Akhir (Final Year Top-Up) Ijazah Sarjana Muda BSc (Hons) Computer Science / Software Engineering di universiti terkemuka di UK (cth. University of Essex / Sunderland).',
        nextProgressionEn: 'Direct entry into Final Year Top-Up BSc (Hons) Computer Science / Software Engineering degrees at leading UK universities (e.g. University of Essex / Sunderland).'
      },
      {
        id: 'micro-btec-hnd-cyber',
        name: 'Pearson BTEC Level 5 Higher National Diploma in Computing (Network Engineering & Cyber Security)',
        nameMs: 'Pearson BTEC Tahap 5 HND Pengkomputeran (Kejuruteraan Rangkaian & Keselamatan Siber)',
        nameEn: 'Pearson BTEC Level 5 Higher National Diploma in Computing (Network Engineering & Cyber Security)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'it_computing',
        duration: '2 Tahun',
        durationMs: '2 Tahun',
        durationEn: '2 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Matematik atau Fizik) ATAU Lulus BTEC Level 3.',
        minCreditNoteEn: '4 O-Level Credits (including Mathematics or Physics) OR Pass in BTEC Level 3.',
        awardingBody: 'Pearson BTEC (UK) / BDQF Level 5',
        intakeMonths: 'Januari, Mei & Ogos',
        overviewMs: 'Mengkhusus dalam konfigurasi perkakasan suis dan router, keselamatan rangkaian korporat, ujian penembusan (penetration testing), forensik digital dan mitigasi serangan siber.',
        overviewEn: 'Specializes in routing and switching configuration, corporate perimeter security, ethical penetration testing, digital forensics, and incident response mitigation.',
        keyModulesMs: [
          'Protokol Rangkaian Lanjutan & Pengurusan Suis/Router',
          'Keselamatan Rangkaian & Kriptografi',
          'Sistem Pengendalian Pelayan Linux & Windows Server',
          'Forensik Digital & Pertahanan Siber',
          'Latihan Penempatan Industri Rangkaian'
        ],
        keyModulesEn: [
          'Advanced Network Protocols & Switching/Routing',
          'Network Security & Applied Cryptography',
          'Linux & Windows Server Enterprise Administration',
          'Digital Forensics & Defensive Cybersecurity',
          'Industry Network Operations Internship'
        ],
        careerOutcomesMs: [
          'Jurutera Rangkaian & Infrastruktur IT',
          'Penganalisis Keselamatan Siber (Cybersecurity Analyst)',
          'Pentadbir Pelayan & Pusat Data',
          'Pegawai Keselamatan Maklumat Syarikat Telekomunikasi'
        ],
        careerOutcomesEn: [
          'Network & IT Infrastructure Engineer',
          'Cybersecurity Analyst / SOC Specialist',
          'Server & Data Centre Administrator',
          'Information Security Officer in Telco / Financial Sectors'
        ],
        nextProgressionMs: 'Menyambung ke Ijazah Sarjana Muda BSc (Hons) Cyber Security & Networking (Tahun Akhir Top-Up di UK).',
        nextProgressionEn: 'Progress to Final Year Top-Up BSc (Hons) Cyber Security & Networking in the UK.'
      }
    ]
  },
  {
    id: 'lcb',
    name: 'Laksamana College of Business (LCB)',
    nameMs: 'Laksamana College of Business (LCB)',
    nameEn: 'Laksamana College of Business (LCB)',
    shortName: 'LCB',
    badge: 'Perniagaan, Hospitaliti, Masakan & IT (Chester UK)',
    established: '2003',
    campusLocationMs: 'KM 1.7 Jalan Tutong, Bandar Seri Begawan',
    campusLocationEn: 'KM 1.7 Jalan Tutong, Bandar Seri Begawan',
    accreditationMs: 'Kerjasama rasmi bersama University of Chester (UK), Pearson BTEC, dan diiktiraf BDQF / MKPK Brunei.',
    accreditationEn: 'Official partnership with University of Chester (UK), Pearson BTEC, and accredited by BDQF / MKPK Brunei.',
    descriptionMs: 'Laksamana College of Business (LCB) merupakan kolej antarabangsa terkemuka di Brunei yang menawarkan program pendidikan tinggi UK merangkumi Perniagaan, Hospitaliti, Kulinari, Pelancongan, dan Sains Komputer dengan pilihan ijazah penuh 3+0 dari University of Chester UK.',
    descriptionEn: 'Laksamana College of Business (LCB) is a premier international higher education college in Brunei offering UK qualifications in Business, Hospitality, Culinary Arts, Tourism, and Computer Science with complete 3+0 UK Degree pathways from University of Chester.',
    highlightsMs: [
      'Peluang melanjutkan pengajian Ijazah Sarjana Muda penuh UK (University of Chester 3+0) di Brunei',
      'Dapur latihan kulinari komersial standard industri dan suite hotel latihan',
      'Program latihan industri berprestij di hotel 5 bintang tempatan dan antarabangsa',
      'Laluan fleksibel dari peringkat Foundation, BTEC Level 3 hingga Level 5 HND'
    ],
    highlightsEn: [
      'Direct pathway to complete a full UK Bachelor’s Degree (University of Chester 3+0) locally in Brunei',
      'Commercial-grade culinary training kitchens and operational hospitality simulation suites',
      'Prestigious internship placements in luxury 5-star hotels and international corporations',
      'Flexible progression ladder from Foundation, BTEC Level 3 to Level 5 HND'
    ],
    contactEmail: 'enquiries@lcb.edu.bn',
    contactPhone: '+673 223 8816 / +673 223 8818',
    websiteUrl: 'https://www.lcb.edu.bn',
    programmes: [
      {
        id: 'lcb-ifp',
        name: 'International Foundation Programme (University of Chester UK)',
        nameMs: 'Program Asas Antarabangsa (University of Chester UK)',
        nameEn: 'International Foundation Programme (University of Chester UK)',
        level: 'Foundation',
        bdqfLevelNumber: 3,
        fieldCategory: 'business_finance',
        duration: '1 Tahun',
        durationMs: '1 Tahun',
        durationEn: '1 Year',
        minCredits: 3,
        minCreditNoteMs: '3 Kredit O-Level (termasuk Bahasa Inggeris atau Matematik).',
        minCreditNoteEn: '3 O-Level Credits (including English or Mathematics).',
        awardingBody: 'University of Chester (UK) / LCB',
        intakeMonths: 'Februari & September',
        overviewMs: 'Program persediaan ijazah universiti UK yang melengkapkan pelajar dengan kemahiran penyelidikan akademik, statistik perniagaan, komunikasi bahasa Inggeris lanjutan, dan pemikiran kritikal.',
        overviewEn: 'A fast-track UK university preparatory qualification equipping students with academic research methods, business statistics, advanced English proficiency, and critical analysis.',
        keyModulesMs: [
          'Bahasa Inggeris untuk Tujuan Akademik (EAP)',
          'Statistik & Kaedah Kuantitatif Perniagaan',
          'Asas Ekonomi & Persekitaran Perniagaan Global',
          'Kajian Organisasi & Pengurusan Projek'
        ],
        keyModulesEn: [
          'English for Academic Purposes (EAP)',
          'Business Statistics & Quantitative Methods',
          'Foundations of Economics & Global Business Environment',
          'Organizational Studies & Project Management'
        ],
        careerOutcomesMs: [
          'Kelayakan terus masuk ke Tahun 1 Ijazah Sarjana Muda BA (Hons) University of Chester di LCB'
        ],
        careerOutcomesEn: [
          'Guaranteed progression to Year 1 Bachelor Degrees (BA/BSc Hons) at University of Chester / LCB'
        ],
        nextProgressionMs: 'Kemasukan terus ke Tahun 1 program Ijazah Sarjana Muda University of Chester di LCB (Business, Accounting, Marketing, Hospitality, CS).',
        nextProgressionEn: 'Direct entry into Year 1 University of Chester Bachelor Degree programmes at LCB.'
      },
      {
        id: 'lcb-hnd-hosp',
        name: 'Pearson BTEC Level 5 Higher National Diploma in Hospitality Management',
        nameMs: 'Pearson BTEC Tahap 5 HND Pengurusan Hospitaliti',
        nameEn: 'Pearson BTEC Level 5 Higher National Diploma in Hospitality Management',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'hospitality_culinary',
        duration: '2 Tahun',
        durationMs: '2 Tahun',
        durationEn: '2 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level ATAU Lulus BTEC Level 3 / Foundation.',
        minCreditNoteEn: '4 O-Level Credits OR Pass in BTEC Level 3 / Foundation.',
        awardingBody: 'Pearson BTEC (UK) / BDQF Level 5',
        intakeMonths: 'Februari & September',
        overviewMs: 'Melatih pemimpin dan pengurus masa depan dalam operasi hotel bertaraf dunia, pengurusan acara (event management), perkhidmatan makanan & minuman mewah (F&B), dan perhubungan tetamu VIP.',
        overviewEn: 'Trains future leaders and managers in world-class hotel operations, luxury food and beverage management, corporate event staging, and VIP guest relations.',
        keyModulesMs: [
          'Operasi Pejabat Hadapan & Pengurusan Penginapan',
          'Pengurusan Makanan & Minuman Mewah',
          'Perancangan & Pengurusan Acara Antarabangsa',
          'Pemasaran Hospitaliti & Pelancongan Lestari',
          'Latihan Penempatan Hotel 5 Bintang (6 Bulan)'
        ],
        keyModulesEn: [
          'Front Office Operations & Accommodation Management',
          'Luxury Food & Beverage Services Management',
          'International Event Staging & Leadership',
          'Hospitality Marketing & Sustainable Tourism',
          '5-Star Luxury Hotel Internship (6 Months)'
        ],
        careerOutcomesMs: [
          'Eksekutif Operasi Hotel & Resort',
          'Pengurus Acara & Persidangan (Event Manager)',
          'Penyelia Restoran & Perkhidmatan Jamuan',
          'Pegawai Perhubungan Tetamu Antarabangsa (Guest Relations)'
        ],
        careerOutcomesEn: [
          'Hotel & Resort Operations Executive',
          'Conference & Event Manager',
          'F&B Restaurant & Banqueting Supervisor',
          'VIP Guest Relations Specialist'
        ],
        nextProgressionMs: 'Menyambung ke Tahun Akhir BA (Hons) International Tourism Management / Hospitality di University of Chester UK.',
        nextProgressionEn: 'Progress to Final Year BA (Hons) International Tourism Management / Hospitality at University of Chester UK.'
      },
      {
        id: 'lcb-culinary-l3',
        name: 'Pearson BTEC International Level 3 Diploma in Culinary Arts',
        nameMs: 'Pearson BTEC Tahap 3 Diploma Seni Kulinari & Gastronomi',
        nameEn: 'Pearson BTEC International Level 3 Diploma in Culinary Arts',
        level: 'BDQF Level 4',
        bdqfLevelNumber: 4,
        fieldCategory: 'hospitality_culinary',
        duration: '1.5 Tahun',
        durationMs: '1.5 Tahun',
        durationEn: '1.5 Years',
        minCredits: 1,
        minCreditNoteMs: '1 hingga 3 Kredit O-Level atau minat mendalam dalam masakan profesional.',
        minCreditNoteEn: '1 to 3 O-Level Credits or proven passion for professional gastronomy.',
        awardingBody: 'Pearson BTEC (UK) / LCB',
        intakeMonths: 'Februari & September',
        overviewMs: 'Program masakan profesional intensif yang mengajar teknik memasak klasik Eropah dan Asia, pembuatan pastri & roti, keselamatan makanan HACCP, dan pengurusan dapur komersial.',
        overviewEn: 'An intensive professional culinary qualification teaching classical European & Asian culinary arts, patisserie & bakery, HACCP food hygiene, and kitchen brigade management.',
        keyModulesMs: [
          'Teknik Masakan Klasik & Kontemporari',
          'Seni Pastri, Roti & Pencuci Mulut',
          'Keselamatan Makanan HACCP & Sanitasi Dapur',
          'Pengurusan Kos Makanan & Menu Kejuruteraan',
          'Amali Dapur Komersial Restoran'
        ],
        keyModulesEn: [
          'Classical & Contemporary Cooking Techniques',
          'Art of Pastry, Bakery & Desserts',
          'HACCP Food Safety & Kitchen Hygiene Standards',
          'Food Costing & Menu Engineering',
          'Commercial Restaurant Kitchen Practicals'
        ],
        careerOutcomesMs: [
          'Chef Profesional (Commis Chef / Demi Chef de Partie)',
          'Pakar Pastri & Roti (Pastry Chef)',
          'Penyelia Katering Korporat',
          'Pengusaha Restoran & Kafe Gastronomi'
        ],
        careerOutcomesEn: [
          'Professional Chef (Commis / Demi Chef de Partie)',
          'Pastry & Bakery Artisan',
          'Corporate Catering Supervisor',
          'Café & Culinary Entrepreneur'
        ],
        nextProgressionMs: 'Menyambung ke Pearson BTEC Level 5 HND in Culinary Arts / Hospitality Management.',
        nextProgressionEn: 'Progress to Pearson BTEC Level 5 HND in Culinary Arts / Hospitality Management.'
      },
      {
        id: 'lcb-hnd-biz',
        name: 'Pearson BTEC Level 5 Higher National Diploma in Business (Accounting / Marketing / HR)',
        nameMs: 'Pearson BTEC Tahap 5 HND Perniagaan (Perakaunan / Pemasaran / Sumber Manusia)',
        nameEn: 'Pearson BTEC Level 5 Higher National Diploma in Business (Accounting / Marketing / HR)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'business_finance',
        duration: '2 Tahun',
        durationMs: '2 Tahun',
        durationEn: '2 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Bahasa Inggeris & Matematik) ATAU Lulus IFP/BTEC L3.',
        minCreditNoteEn: '4 O-Level Credits (including English & Mathematics) OR Pass IFP/BTEC L3.',
        awardingBody: 'Pearson BTEC (UK) / BDQF Level 5',
        intakeMonths: 'Februari & September',
        overviewMs: 'Program perniagaan berprestij tinggi yang menyediakan kepakaran praktikal dalam membuat keputusan perniagaan, analisis kewangan, kepimpinan organisasi dan strategi pasaran global.',
        overviewEn: 'A high-calibre business qualification delivering applied expertise in commercial decision-making, financial reporting, organizational leadership, and international market strategy.',
        keyModulesMs: [
          'Pelaporan Kewangan & Pengurusan Kos',
          'Pengurusan Strategik & Kepimpinan Korporat',
          'Pemasaran Antarabangsa & Jenama Global',
          'Undang-undang Komersial & Etika Perniagaan'
        ],
        keyModulesEn: [
          'Financial Reporting & Cost Management',
          'Strategic Management & Corporate Leadership',
          'International Marketing & Global Branding',
          'Commercial Law & Business Ethics'
        ],
        careerOutcomesMs: [
          'Eksekutif Kewangan & Perakaunan',
          'Pengurus Akaun Jenama & Pemasaran',
          'Pegawai Operasi Korporat & Perbankan',
          'Penganalisis Perniagaan'
        ],
        careerOutcomesEn: [
          'Finance & Accounting Executive',
          'Brand & Marketing Account Manager',
          'Banking & Corporate Operations Officer',
          'Commercial Business Analyst'
        ],
        nextProgressionMs: 'Menyambung terus ke Tahun Akhir Ijazah Sarjana Muda BA (Hons) Business Administration / Accounting & Finance University of Chester di LCB.',
        nextProgressionEn: 'Direct progression into Final Year BA (Hons) Business Administration / Accounting & Finance (University of Chester UK) at LCB.'
      }
    ]
  },
  {
    id: 'kolej-igs',
    name: 'Kolej International Graduate Studies (Kolej IGS)',
    nameMs: 'Kolej International Graduate Studies (Kolej IGS)',
    nameEn: 'Kolej International Graduate Studies (Kolej IGS)',
    shortName: 'Kolej IGS',
    badge: 'Seni Kreatif, Komunikasi Massa & IT',
    established: '2002',
    campusLocationMs: 'Setia Kenangan Complex, Kiulap, Bandar Seri Begawan',
    campusLocationEn: 'Setia Kenangan Complex, Kiulap, Bandar Seri Begawan',
    accreditationMs: 'Diiktiraf BDQF & Majlis Kebangsaan Pengiktirafan Kelayakan (MKPK), Kementerian Pendidikan Brunei.',
    accreditationEn: 'Accredited by BDQF & National Accreditation Council (MKPK), Ministry of Education Brunei.',
    descriptionMs: 'Kolej IGS dikenali dengan kekuatannya dalam bidang media kreatif, seni reka grafik, penyiaran, komunikasi massa, pengiklanan dan teknologi maklumat dengan penekanan kepada kemahiran amali industri.',
    descriptionEn: 'Kolej IGS is widely recognized for creative media, graphic design, broadcasting, mass communication, advertising, and information technology with hands-on studio learning.',
    highlightsMs: [
      'Studio penyiaran audio-visual dan makmal reka bentuk grafik Apple Mac terkini',
      'Peluang pameran karya kreatif pelajar di peringkat kebangsaan',
      'Kurikulum fleksibel untuk pelajar dari 1 hingga 4 Kredit O-Level',
      'Program latihan amali industri di stesen televisyen, radio, dan agensi pengiklanan'
    ],
    highlightsEn: [
      'Audio-visual broadcasting studios and state-of-the-art Apple Mac design suites',
      'Regular public showcase exhibitions for student design portfolios',
      'Flexible progressive curriculum accommodating 1 to 4 O-Level credits',
      'Industry internship attachments with TV networks, radio stations, and media agencies'
    ],
    contactEmail: 'info@kolejigs.edu.bn',
    contactPhone: '+673 223 8701 / +673 223 8702',
    websiteUrl: 'https://www.kolejigs.edu.bn',
    programmes: [
      {
        id: 'igs-cert-art',
        name: 'Certificate in Art & Design / Graphic Design',
        nameMs: 'Sijil Reka Bentuk Seni & Grafik (BDQF Tahap 3/4)',
        nameEn: 'Certificate in Art & Design / Graphic Design (BDQF Level 3/4)',
        level: 'BDQF Level 3',
        bdqfLevelNumber: 3,
        fieldCategory: 'creative_media',
        duration: '1 Tahun',
        durationMs: '1 Tahun',
        durationEn: '1 Year',
        minCredits: 1,
        minCreditNoteMs: '1 Kredit O-Level dalam mana-mana subjek (Kredit Seni atau Lukisan dialu-alukan).',
        minCreditNoteEn: '1 O-Level Credit in any subject (Art / Design credit welcomed).',
        awardingBody: 'Kolej IGS / BDQF Level 3',
        intakeMonths: 'Januari & Julai',
        overviewMs: 'Asas ilustrasi digital, teori warna, tipografi, gubahan reka bentuk visual dan penguasaan perisian kreatif seperti Adobe Illustrator dan Photoshop.',
        overviewEn: 'Foundation in digital illustration, color theory, typography, visual layout composition, and mastery of Adobe Creative Cloud software.',
        keyModulesMs: [
          'Asas Seni Halus & Ilustrasi Visual',
          'Tipografi & Reka Bentuk Susun Atur',
          'Pengimejan Digital & Manipulasi Foto',
          'Penyediaan Portfolio Reka Bentuk'
        ],
        keyModulesEn: [
          'Foundations of Fine Art & Visual Illustration',
          'Typography & Editorial Layout Design',
          'Digital Imaging & Photo Manipulation',
          'Creative Portfolio Preparation'
        ],
        careerOutcomesMs: [
          'Pembantu Pereka Grafik',
          'Ilustrator Digital Junior',
          'Layak terus ke Diploma BDQF Tahap 5 Kolej IGS'
        ],
        careerOutcomesEn: [
          'Junior Graphic Designer',
          'Digital Illustrator Assistant',
          'Progression to Level 5 Diplomas at Kolej IGS'
        ],
        nextProgressionMs: 'Menyambung ke Diploma in Graphic Design & Digital Media (BDQF Level 5) di Kolej IGS.',
        nextProgressionEn: 'Progress to Diploma in Graphic Design & Digital Media (BDQF Level 5) at Kolej IGS.'
      },
      {
        id: 'igs-dip-masscomm',
        name: 'Diploma in Electronic Media & Broadcasting / Mass Communication (BDQF Level 5)',
        nameMs: 'Diploma Media Elektronik, Penyiaran & Komunikasi Massa (BDQF Tahap 5)',
        nameEn: 'Diploma in Electronic Media & Broadcasting / Mass Communication (BDQF Level 5)',
        level: 'BDQF Level 5 (Diploma)',
        bdqfLevelNumber: 5,
        fieldCategory: 'creative_media',
        duration: '2.5 Tahun',
        durationMs: '2.5 Tahun',
        durationEn: '2.5 Years',
        minCredits: 4,
        minCreditNoteMs: '4 Kredit O-Level (termasuk Bahasa Melayu atau Bahasa Inggeris).',
        minCreditNoteEn: '4 O-Level Credits (including Malay or English).',
        awardingBody: 'Kolej IGS / BDQF Level 5',
        intakeMonths: 'Januari & Julai',
        overviewMs: 'Membangunkan kemahiran profesional dalam penulisan skrip penyiaran, penerbitan program TV/Radio, kewartawanan multimedia, dan pengurusan media sosial korporat.',
        overviewEn: 'Develops professional competence in broadcast scriptwriting, TV/Radio studio production, multimedia journalism, podcasting, and corporate public relations.',
        keyModulesMs: [
          'Penerbitan Studio TV & Radio Komersial',
          'Kewartawanan Digital & Penulisan Media',
          'Perhubungan Awam (Public Relations) & Komunikasi Korporat',
          'Pemasaran Kandungan Media Sosial & Penstriman',
          'Latihan Penempatan Industri Penyiaran'
        ],
        keyModulesEn: [
          'TV Studio & Commercial Radio Production',
          'Digital Journalism & Feature Writing',
          'Public Relations & Corporate Communications',
          'Social Media Content Strategy & Podcasting',
          'Broadcasting Industry Field Attachment'
        ],
        careerOutcomesMs: [
          'Penerbit & Penyunting Rancangan TV/Radio',
          'Pegawai Perhubungan Awam (PR) & Komunikasi',
          'Wartawan Media Digital & Pengurus Media Sosial',
          'Juruhebah & Penyampai Konten'
        ],
        careerOutcomesEn: [
          'TV/Radio Production Assistant & Editor',
          'Public Relations (PR) & Media Relations Officer',
          'Digital Journalist & Social Media Manager',
          'Broadcaster / Multimedia Content Creator'
        ],
        nextProgressionMs: 'Menyambung ke Ijazah Sarjana Muda Komunikasi Massa (BA Hons) di universiti rakan kongsi atau tempatan.',
        nextProgressionEn: 'Progress to BA (Hons) Mass Communication degrees at partner universities.'
      }
    ]
  },
  {
    id: 'bicpa-ftms',
    name: 'BICPA-FTMS Accountancy Academy',
    nameMs: 'Akademi Perakaunan BICPA-FTMS',
    nameEn: 'BICPA-FTMS Accountancy Academy',
    shortName: 'BICPA-FTMS',
    badge: 'Perakaunan Profesional (ACCA / FIA / CAT)',
    established: '1993',
    campusLocationMs: 'Bandar Seri Begawan, Brunei Darussalam',
    campusLocationEn: 'Bandar Seri Begawan, Brunei Darussalam',
    accreditationMs: 'Pusat pembelajaran bertauliah ACCA (Association of Chartered Certified Accountants UK) & BDQF.',
    accreditationEn: 'Accredited learning provider for ACCA (Association of Chartered Certified Accountants UK) & BDQF.',
    descriptionMs: 'BICPA-FTMS Accountancy Academy merupakan institusi khusus perakaunan profesional yang menyediakan laluan pantas dari lepasan O-Level ke kelayakan Akauntan Bertauliah antarabangsa (ACCA / FIA).',
    descriptionEn: 'BICPA-FTMS Accountancy Academy is a specialist professional accounting academy providing a fast-track pathway from O-Level completion directly to Chartered Certified Accountant credentials (ACCA / FIA).',
    highlightsMs: [
      'Laluan terpantas untuk menjadi Akauntan Bertauliah Berkanun (Chartered Accountant) antarabangsa',
      'Bahan pembelajaran rasmi ACCA UK dan tenaga pengajar berpengalaman industri audit',
      'Peluang penempatan kerjaya tinggi di firma audit terkemuka (Big 4) dan institusi perbankan Brunei',
      'Kelayakan yang diiktiraf di lebih 180 negara di seluruh dunia'
    ],
    highlightsEn: [
      'The fastest direct route to become an internationally recognized Chartered Accountant',
      'Official ACCA UK study materials and experienced audit practitioners as tutors',
      'High recruitment demand across Big 4 audit firms and Brunei financial institutions',
      'Globally respected credentials recognized in over 180 countries'
    ],
    contactEmail: 'admin@bicpa-ftms.com',
    contactPhone: '+673 223 2345',
    websiteUrl: 'https://www.bicpa-ftms.com',
    programmes: [
      {
        id: 'bicpa-fia',
        name: 'ACCA Foundations in Accountancy (FIA / CAT)',
        nameMs: 'ACCA Foundations in Accountancy (FIA / Sijil Juruteknik Perakaunan)',
        nameEn: 'ACCA Foundations in Accountancy (FIA / Certified Accounting Technician)',
        level: 'BDQF Level 4',
        bdqfLevelNumber: 4,
        fieldCategory: 'accounting',
        duration: '1 - 1.5 Tahun',
        durationMs: '1 - 1.5 Tahun',
        durationEn: '1 - 1.5 Years',
        minCredits: 3,
        minCreditNoteMs: '3 hingga 5 Kredit O-Level (Kredit dalam Matematik dan Bahasa Inggeris adalah disyorkan).',
        minCreditNoteEn: '3 to 5 O-Level Credits (Credits in Mathematics and English strongly recommended).',
        awardingBody: 'ACCA (United Kingdom) / BDQF Level 4 & 5',
        intakeMonths: 'Januari & Julai',
        overviewMs: 'Kelayakan asas perakaunan antarabangsa yang melatih pelajar dalam perakaunan kewangan, perakaunan pengurusan kos, audit, percukaian dan etika profesional.',
        overviewEn: 'An entry-level global accounting suite covering financial accounting, cost and management accounting, auditing, taxation principles, and professional business ethics.',
        keyModulesMs: [
          'FA1 & FA2: Perekodan Transaksi Kewangan & Penyelenggaraan Rekod Kewangan',
          'MA1 & MA2: Maklumat Pengurusan Kos & Pembuatan Keputusan',
          'FBT: Perniagaan & Teknologi Perakaunan',
          'FFA: Perakaunan Kewangan Lanjutan',
          'FMA: Perakaunan Pengurusan Lanjutan'
        ],
        keyModulesEn: [
          'FA1 & FA2: Recording Financial Transactions & Maintaining Financial Records',
          'MA1 & MA2: Management Information & Cost Decision Making',
          'FBT: Business and Technology',
          'FFA: Financial Accounting',
          'FMA: Management Accounting'
        ],
        careerOutcomesMs: [
          'Juruteknik Perakaunan (Accounting Technician)',
          'Pembantu Juruaudit (Audit Assistant)',
          'Eksekutif Akaun Belum Terima / Bayar (AP/AR Clerk)',
          'Kemasukan terus ke Peringkat Profesional Penuh ACCA'
        ],
        careerOutcomesEn: [
          'Accounting Technician / Assistant Accountant',
          'Junior Audit Associate in CPA firms',
          'Accounts Payable / Receivable Specialist',
          'Direct entry to ACCA Applied Skills & Professional exams'
        ],
        nextProgressionMs: 'Menyambung terus ke Peperiksaan Profesional ACCA (Applied Skills & Strategic Professional) untuk menjadi Akauntan Bertauliah (Chartered Accountant).',
        nextProgressionEn: 'Direct progression into ACCA Applied Skills & Strategic Professional qualifications to attain Chartered Accountant status.'
      }
    ]
  }
];
