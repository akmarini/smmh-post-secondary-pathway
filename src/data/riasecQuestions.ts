import { RiasecQuestion, RiasecDimension, CareerSuggestion } from '../types';

export const RIASEC_DIMENSION_INFO: Record<
  RiasecDimension,
  {
    nameMs: string;
    nameEn: string;
    color: string;
    accentColor: string;
    descriptionMs: string;
    descriptionEn: string;
    icon: string;
  }
> = {
  R: {
    nameMs: 'Realistik (Realistic)',
    nameEn: 'Realistic',
    color: 'bg-emerald-700 text-white',
    accentColor: '#047857',
    descriptionMs: 'Cenderung kepada kemahiran fizikal, peralatan teknikal, kejuruteraan, dan aktiviti amali.',
    descriptionEn: 'Prefers hands-on, practical, mechanical, tools, and technical activities.',
    icon: 'Wrench'
  },
  I: {
    nameMs: 'Investigatif (Investigative)',
    nameEn: 'Investigative',
    color: 'bg-blue-700 text-white',
    accentColor: '#1d4ed8',
    descriptionMs: 'Gemar menyelidik, menganalisis data saintifik, menyelesaikan masalah logik dan teknologi maklumat.',
    descriptionEn: 'Enjoys scientific inquiry, data analysis, solving abstract logical problems and IT.',
    icon: 'Microscope'
  },
  A: {
    nameMs: 'Artistik (Artistic)',
    nameEn: 'Artistic',
    color: 'bg-amber-600 text-white',
    accentColor: '#d97706',
    descriptionMs: 'Kreatif, imaginatif, meminati seni visual, reka bentuk multimedia, penulisan, dan kebudayaan.',
    descriptionEn: 'Creative, expressive, interested in design, multimedia, writing, and cultural arts.',
    icon: 'Palette'
  },
  S: {
    nameMs: 'Sosial (Social)',
    nameEn: 'Social',
    color: 'bg-rose-700 text-white',
    accentColor: '#be123c',
    descriptionMs: 'Suka membantu masyarakat, mendidik, memberi khidmat kaunseling, dan kebajikan komuniti.',
    descriptionEn: 'Prefers assisting people, teaching, counseling, healthcare, and community service.',
    icon: 'Users'
  },
  E: {
    nameMs: 'Berdaya Usaha (Enterprising)',
    nameEn: 'Enterprising',
    color: 'bg-purple-700 text-white',
    accentColor: '#7e22ce',
    descriptionMs: 'Memiliki sifat kepimpinan, keusahawanan, bijak berunding, memotivasikan orang dan berniaga.',
    descriptionEn: 'Leadership-driven, entrepreneurial, persuasive, project management, and business.',
    icon: 'Briefcase'
  },
  C: {
    nameMs: 'Konvensional (Conventional)',
    nameEn: 'Conventional',
    color: 'bg-slate-700 text-white',
    accentColor: '#334155',
    descriptionMs: 'Teratur, teliti dengan rekod, meminati pengurusan data, perakaunan, dan prosedur sistematis.',
    descriptionEn: 'Organized, detail-oriented with records, accounting, banking, and systematic procedures.',
    icon: 'ClipboardCheck'
  }
};

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // Realistic (R) - Questions 1 to 4
  {
    id: 1,
    category: 'R',
    categoryNameMs: 'Realistik',
    categoryNameEn: 'Realistic',
    statementMs: 'Saya suka membaiki atau memasang peralatan elektronik, kenderaan, atau perkakas mekanikal di rumah.',
    statementEn: 'I enjoy repairing or assembling electronics, vehicles, or mechanical equipment at home.'
  },
  {
    id: 2,
    category: 'R',
    categoryNameMs: 'Realistik',
    categoryNameEn: 'Realistic',
    statementMs: 'Saya lebih selesa bekerja di luar bangunan atau di makmal amali/bengkel kejuruteraan berbanding duduk di pejabat.',
    statementEn: 'I prefer working outdoors, in practical labs, or in engineering workshops rather than in an office.'
  },
  {
    id: 3,
    category: 'R',
    categoryNameMs: 'Realistik',
    categoryNameEn: 'Realistic',
    statementMs: 'Saya mahir menggunakan alatan pertukangan, instrumen teknikal, atau peralatan lukisan pelan reka bentuk.',
    statementEn: 'I am skilled at using carpentry tools, technical instruments, or drafting blueprints.'
  },
  {
    id: 4,
    category: 'R',
    categoryNameMs: 'Realistik',
    categoryNameEn: 'Realistic',
    statementMs: 'Saya berminat dalam industri tenaga, pembinaan marin, atau teknologi pertanian moden di Tutong.',
    statementEn: 'I am interested in the energy industry, marine construction, or modern agro-technology in Tutong.'
  },

  // Investigative (I) - Questions 5 to 8
  {
    id: 5,
    category: 'I',
    categoryNameMs: 'Investigatif',
    categoryNameEn: 'Investigative',
    statementMs: 'Saya suka menyelesaikan soalan matematik, eksperimen sains, dan teka-teki logik yang mencabar minda.',
    statementEn: 'I enjoy solving math problems, conducting science experiments, and tackling complex logic puzzles.'
  },
  {
    id: 6,
    category: 'I',
    categoryNameMs: 'Investigatif',
    categoryNameEn: 'Investigative',
    statementMs: 'Saya gemar membaca artikel penyelidikan tentang perubatan, biologi, atau teknologi kecerdasan buatan (AI).',
    statementEn: 'I enjoy reading research about medicine, biology, or artificial intelligence (AI) technology.'
  },
  {
    id: 7,
    category: 'I',
    categoryNameMs: 'Investigatif',
    categoryNameEn: 'Investigative',
    statementMs: 'Saya suka menganalisis data, membuat graf, dan mencari punca sebenar sesuatu masalah teknikal.',
    statementEn: 'I like analyzing data, creating graphs, and finding the root cause of technical or scientific problems.'
  },
  {
    id: 8,
    category: 'I',
    categoryNameMs: 'Investigatif',
    categoryNameEn: 'Investigative',
    statementMs: 'Saya berminat untuk mempelajari pengaturcaraan komputer (coding) dan keselamatan siber.',
    statementEn: 'I am interested in learning computer programming (coding) and cybersecurity.'
  },

  // Artistic (A) - Questions 9 to 12
  {
    id: 9,
    category: 'A',
    categoryNameMs: 'Artistik',
    categoryNameEn: 'Artistic',
    statementMs: 'Saya suka melukis, mereka bentuk grafik, mengedit video digital, atau mengambil gambar fotografi yang kreatif.',
    statementEn: 'I enjoy drawing, graphic designing, digital video editing, or taking creative photographs.'
  },
  {
    id: 10,
    category: 'A',
    categoryNameMs: 'Artistik',
    categoryNameEn: 'Artistic',
    statementMs: 'Saya gemar menulis cerita, sajak, skrip drama, atau menghasilkan kandungan media sosial yang unik.',
    statementEn: 'I enjoy writing stories, poetry, scripts, or producing unique social media content.'
  },
  {
    id: 11,
    category: 'A',
    categoryNameMs: 'Artistik',
    categoryNameEn: 'Artistic',
    statementMs: 'Saya menghargai seni bina tradisional Melayu Brunei, kraf tangan tempatan, muzik, atau reka bentuk fesyen.',
    statementEn: 'I appreciate traditional Bruneian Malay arts, local handicrafts, music, or fashion design.'
  },
  {
    id: 12,
    category: 'A',
    categoryNameMs: 'Artistik',
    categoryNameEn: 'Artistic',
    statementMs: 'Saya lebih suka tugasan terbuka yang memerlukan idea asli berbanding peraturan yang terlalu kaku.',
    statementEn: 'I prefer open-ended creative tasks requiring original thinking over rigid, repetitive rules.'
  },

  // Social (S) - Questions 13 to 16
  {
    id: 13,
    category: 'S',
    categoryNameMs: 'Sosial',
    categoryNameEn: 'Social',
    statementMs: 'Saya suka mengajar dan menerangkan konsep pelajaran kepada rakan sekelas yang memerlukan bantuan.',
    statementEn: 'I enjoy teaching and explaining lesson concepts to classmates who need assistance.'
  },
  {
    id: 14,
    category: 'S',
    categoryNameMs: 'Sosial',
    categoryNameEn: 'Social',
    statementMs: 'Saya seorang pendengar yang prihatin dan gemar memberi nasihat atau dorongan moral kepada orang lain.',
    statementEn: 'I am an attentive listener and like offering advice or moral encouragement to others.'
  },
  {
    id: 15,
    category: 'S',
    categoryNameMs: 'Sosial',
    categoryNameEn: 'Social',
    statementMs: 'Saya berminat menyertai aktiviti sukarelawan, khidmat masyarakat, dan program belia di Daerah Tutong.',
    statementEn: 'I am interested in joining volunteer work, community service, and youth initiatives in Tutong.'
  },
  {
    id: 16,
    category: 'S',
    categoryNameMs: 'Sosial',
    categoryNameEn: 'Social',
    statementMs: 'Saya tertarik dengan kerjaya dalam bidang kejururawatan, perguruan, bimbingan kaunseling, atau kesihatan awam.',
    statementEn: 'I am drawn to careers in nursing, teaching, counseling guidance, or public healthcare.'
  },

  // Enterprising (E) - Questions 17 to 20
  {
    id: 17,
    category: 'E',
    categoryNameMs: 'Berdaya Usaha',
    categoryNameEn: 'Enterprising',
    statementMs: 'Saya gemar memimpin kumpulan dalam projek sekolah dan memotivasikan ahli untuk mencapai sasaran.',
    statementEn: 'I enjoy leading school project teams and motivating members to achieve project goals.'
  },
  {
    id: 18,
    category: 'E',
    categoryNameMs: 'Berdaya Usaha',
    categoryNameEn: 'Enterprising',
    statementMs: 'Saya yakin bercakap di hadapan khalayak ramai, berdebat, atau membuat pembentangan idea projek.',
    statementEn: 'I feel confident speaking in public, debating, or presenting project pitches to an audience.'
  },
  {
    id: 19,
    category: 'E',
    categoryNameMs: 'Berdaya Usaha',
    categoryNameEn: 'Enterprising',
    statementMs: 'Saya berminat untuk memulakan perniagaan sendiri atau menjana pendapatan melalui jualan produk/perkhidmatan.',
    statementEn: 'I am interested in starting my own business venture or generating income through sales/services.'
  },
  {
    id: 20,
    category: 'E',
    categoryNameMs: 'Berdaya Usaha',
    categoryNameEn: 'Enterprising',
    statementMs: 'Saya suka merancang strategi pemasaran dan meyakinkan orang lain untuk bersetuju dengan pandangan saya.',
    statementEn: 'I like planning marketing strategies and persuading others to agree with my viewpoints.'
  },

  // Conventional (C) - Questions 21 to 24
  {
    id: 21,
    category: 'C',
    categoryNameMs: 'Konvensional',
    categoryNameEn: 'Conventional',
    statementMs: 'Saya sangat mementingkan kekemasan, ketepatan rekod, dan jadual waktu yang teratur dalam tugasan harian.',
    statementEn: 'I prioritize neatness, record precision, and maintaining well-organized schedules daily.'
  },
  {
    id: 22,
    category: 'C',
    categoryNameMs: 'Konvensional',
    categoryNameEn: 'Conventional',
    statementMs: 'Saya suka mengira perbelanjaan, menguruskan buku akaun wang simpanan, atau membuat senarai inventori.',
    statementEn: 'I like tracking expenditures, managing financial logbooks, or creating itemized inventories.'
  },
  {
    id: 23,
    category: 'C',
    categoryNameMs: 'Konvensional',
    categoryNameEn: 'Conventional',
    statementMs: 'Saya selesa bekerja dengan prosedur standard (SOP), borang rasmi, dan pengurusan pangkalan data berkomputer.',
    statementEn: 'I feel comfortable adhering to standard operating procedures (SOPs), official forms, and database filing.'
  },
  {
    id: 24,
    category: 'C',
    categoryNameMs: 'Konvensional',
    categoryNameEn: 'Conventional',
    statementMs: 'Saya berminat dengan perkhidmatan perbankan, audit kewangan, pentadbiran awam, atau logistik penghantaran.',
    statementEn: 'I am interested in banking services, financial auditing, public administration, or logistics delivery.'
  }
];

// Local Brunei Career Mapping database aligned with Wawasan Brunei 2035
export const BRUNEI_CAREER_MAP: Record<string, CareerSuggestion[]> = {
  // Combinations starting with R
  R: [
    {
      titleMs: 'Jurutera Minyak, Gas & Tenaga Boleh Baharu (Brunei Shell Petroleum / TotalEnergies)',
      titleEn: 'Petroleum & Renewable Energy Engineer (BSP / TotalEnergies)',
      sector: 'Industri Minyak, Gas & Tenaga Hijau',
      wawasan2035Goal: 'Matlamat 3: Ekonomi Dinamik & Mampan',
      descriptionMs: 'Membangunkan teknologi pengekstrakan tenaga mampan dan pengurusan loji industri termaju di Brunei.',
      descriptionEn: 'Developing sustainable energy extraction technologies and managing advanced industrial processing plants across Brunei.',
      institutions: ['Politeknik Brunei (School of Science & Engineering)', 'PTET (Aliran Sains Fizik)', 'IBTE Jefri Bolkiah Campus']
    },
    {
      titleMs: 'Pakar Penyelenggaraan Sistem Mekanikal & Automotif Termaju',
      titleEn: 'Advanced Automotive & Mechanical Diagnostics Specialist',
      sector: 'Kejuruteraan & Pengangkutan Darat/Laut',
      wawasan2035Goal: 'Matlamat 1: Rakyat Berpendidikan & Berkemahiran Tinggi',
      descriptionMs: 'Menyediakan khidmat kepakaran diagnostik kenderaan moden dan logistik jentera berat di Brunei.',
      descriptionEn: 'Providing technical expertise in modern automotive diagnostics, heavy machinery systems, and logistics fleet maintenance.',
      institutions: ['IBTE Mechanical Campus (Tungku)', 'IBTE Jefri Bolkiah Campus']
    },
    {
      titleMs: 'Teknologis Agro-Industri & Keselamatan Makanan (Hab Pertanian Tutong)',
      titleEn: 'Agro-Industrial Technologist & Food Security Officer (Tutong)',
      sector: 'Pertanian Moden & Bio-Teknologi',
      wawasan2035Goal: 'Matlamat 3: Sara Diri Makanan & Kepelbagaian Ekonomi',
      descriptionMs: 'Menguruskan sistem hidroponik, rumah hijau pintar, dan pengeluaran makanan berkualiti tinggi di Daerah Tutong.',
      descriptionEn: 'Managing smart hydroponic greenhouses, commercial bio-farming, and high-yield food production systems in Tutong District.',
      institutions: ['IBTE Agro-Technology Campus (Wasan)', 'Politeknik Brunei (Science)']
    }
  ],

  // Combinations starting with I
  I: [
    {
      titleMs: 'Pakar Keselamatan Siber & Jurutera Rangkaian (BruCERT / ITXSS / UNN)',
      titleEn: 'Cybersecurity Analyst & Network Engineer (BruCERT / ITXSS / UNN)',
      sector: 'Teknologi Maklumat & Ekonomi Digital',
      wawasan2035Goal: 'Matlamat 3: Ekonomi Digital & Inovasi Pintar',
      descriptionMs: 'Melindungi infrastruktur rangkaian digital negara daripada ancaman keselamatan dan menguruskan telekomunikasi bersepadu.',
      descriptionEn: 'Safeguarding national digital infrastructure against cyber threats and managing unified enterprise telecommunications.',
      institutions: ['Politeknik Brunei (School of ICT)', 'PTET (Computing/Maths)', 'IBTE Nakhoda Ragam Campus']
    },
    {
      titleMs: 'Pegawai Makmal Klinikal & Penyelidik Bioperubatan (Hospital Tutong PMMPMHAMB / RIPAS)',
      titleEn: 'Clinical Laboratory Scientist & Biomedical Researcher (PMMPMHAMB Hospital Tutong)',
      sector: 'Perkhidmatan Kesihatan & Penyelidikan Perubatan',
      wawasan2035Goal: 'Matlamat 2: Kualiti Kehidupan yang Tinggi',
      descriptionMs: 'Menjalankan ujian diagnostik mikrobiologi dan penyelidikan patologi bagi menyokong rawatan pesakit.',
      descriptionEn: 'Conducting advanced microbiological diagnostic procedures and pathology research to support patient therapeutic outcomes.',
      institutions: ['Politeknik Brunei (School of Health Sciences)', 'PTET (Biologi & Kimia)']
    },
    {
      titleMs: 'Saintis Data & Pembangun Sistem Kecerdasan Buatan (AI)',
      titleEn: 'Data Scientist & AI Solutions Developer',
      sector: 'Penyelidikan Teknologi & Transformasi Digital',
      wawasan2035Goal: 'Matlamat 1 & 3: Modal Insan Berdaya Saing Global',
      descriptionMs: 'Menganalisis maklumat analitik raya bagi perancangan dasar strategik kerajaan dan automasi perniagaan moden.',
      descriptionEn: 'Architecting big-data analytics models for government strategic policy development and modern enterprise automation.',
      institutions: ['Politeknik Brunei (School of ICT)', 'PTET (A-Level Maths & Computing)']
    }
  ],

  // Combinations starting with A
  A: [
    {
      titleMs: 'Pengarah Kreatif Multimedia & Animasi Digital (Hab Kreatif Brunei)',
      titleEn: 'Creative Multimedia Director & Digital Animator',
      sector: 'Industri Kreatif & Penyiaran Digital',
      wawasan2035Goal: 'Matlamat 3: Kepelbagaian Industri Kreatif & Media',
      descriptionMs: 'Menghasilkan kandungan animasi 3D, reka bentuk visual komersial, dan penerbitan video berimpak tinggi.',
      descriptionEn: 'Directing 3D animation projects, commercial visual branding, and high-impact digital broadcasting content.',
      institutions: ['IBTE Nakhoda Ragam Campus (HNTec Media)', 'Politeknik Brunei (Digital Media)']
    },
    {
      titleMs: 'Kurator Warisan Budaya & Arkitek Landskap Eko-Pelancongan Tutong',
      titleEn: 'Cultural Heritage Curator & Eco-Tourism Landscape Architect',
      sector: 'Pelancongan, Kebudayaan & Pemeliharaan Warisan',
      wawasan2035Goal: 'Matlamat 2: Memelihara Identiti & Warisan Melayu Islam Beraja (MIB)',
      descriptionMs: 'Memperkasa tarikan eko-pelancongan Tasik Merimbun dan pemuliharaan seni warisan di Daerah Tutong.',
      descriptionEn: 'Developing eco-tourism conservation initiatives at Tasek Merimbun and preserving indigenous cultural heritage in Tutong.',
      institutions: ['IBTE Sultan Saiful Rijal (Hospitality & Tourism)', 'PTET (Art & Humanities)']
    },
    {
      titleMs: 'Pereka Pengalaman Pengguna (UI/UX Designer) & Pemasar Kandungan',
      titleEn: 'UI/UX Interface Designer & Digital Content Strategist',
      sector: 'Teknologi & Reka Bentuk Aplikasi Pintar',
      wawasan2035Goal: 'Matlamat 1: Kemahiran Reka Bentuk Abad Ke-21',
      descriptionMs: 'Mereka bentuk antara muka laman web dan aplikasi pintar kerajaan serta sektor perbankan tempatan.',
      descriptionEn: 'Designing user-friendly interfaces for government e-services and mobile banking platforms across Brunei.',
      institutions: ['Politeknik Brunei (Digital Media & ICT)', 'IBTE Media Arts']
    }
  ],

  // Combinations starting with S
  S: [
    {
      titleMs: 'Pegawai Kaunseling Kerjaya & Kebajikan Komuniti Daerah Tutong',
      titleEn: 'Career Guidance Counselor & Community Welfare Officer',
      sector: 'Pendidikan & Perkhidmatan Sosial Awam',
      wawasan2035Goal: 'Matlamat 1: Pembangunan Sahsiah & Potensi Belia',
      descriptionMs: 'Membimbing generasi muda dalam pemilihan laluan pendidikan dan menyediakan sokongan psikososial komuniti.',
      descriptionEn: 'Guiding youths through post-secondary academic transitions and providing holistic psychosocial community counseling.',
      institutions: ['PTET (Aliran Sastera & Kemanusiaan)', 'Politeknik Brunei']
    },
    {
      titleMs: 'Jururawat Kesihatan Awam & Fisioterapi (Kementerian Kesihatan Brunei)',
      titleEn: 'Public Health Nurse & Physiotherapist (Ministry of Health Brunei)',
      sector: 'Penjagaan Kesihatan & Kebajikan Masyarakat',
      wawasan2035Goal: 'Matlamat 2: Kualiti Kesihatan & Kehidupan Rakyat Terjamin',
      descriptionMs: 'Memberikan rawatan perubatan langsung, rehabilitasi fizikal, dan penyuluhan kesihatan di klinik masyarakat.',
      descriptionEn: 'Delivering direct clinical nursing care, physical rehabilitation therapies, and preventative community healthcare.',
      institutions: ['Politeknik Brunei (School of Health Sciences - Diploma in Nursing/Physiotherapy)']
    },
    {
      titleMs: 'Pendidik Profesional (Guru Sekolah / Tenaga Pengajar TVET)',
      titleEn: 'Professional Educator (School Teacher / TVET Technical Instructor)',
      sector: 'Institusi Pendidikan Rendah, Menengah & Teknikal',
      wawasan2035Goal: 'Matlamat 1: Rakyat Berpendidikan Tinggi & Berilmu',
      descriptionMs: 'Mendidik anak bangsa dengan ilmu pengetahuan moden berlandaskan nilai-nilai Melayu Islam Beraja (MIB).',
      descriptionEn: 'Educating future generations in academic and technical vocations grounded in national Malay Islamic Monarchy (MIB) values.',
      institutions: ['PTET (Tingkatan Enam)', 'Politeknik Brunei / IBTE']
    }
  ],

  // Combinations starting with E
  E: [
    {
      titleMs: 'Pengurus Operasi Perniagaan & Usahawan Perdagangan Antarabangsa',
      titleEn: 'Business Operations Manager & International Trade Entrepreneur',
      sector: 'Perdagangan, Logistik & Perniagaan E-Dagang',
      wawasan2035Goal: 'Matlamat 3: PKS Berdaya Tahan & Berdaya Saing Global',
      descriptionMs: 'Menerajui syarikat tempatan menembusi pasaran serantau dan mengurus rantaian bekalan moden.',
      descriptionEn: 'Leading local enterprises in regional market expansion and managing end-to-end modern supply chains.',
      institutions: ['Politeknik Brunei (School of Business)', 'IBTE Business Campus (Gadong)', 'PTET (Economics/Business)']
    },
    {
      titleMs: 'Pegawai Perhubungan Awam & Pengurus Acara Korporat Antarabangsa',
      titleEn: 'Corporate Public Relations & Event Operations Manager',
      sector: 'Komunikasi Korporat & Pemasaran Strategik',
      wawasan2035Goal: 'Matlamat 3: Penjenamaan Jenama Brunei di Persada Global',
      descriptionMs: 'Menyelaras sidang kemuncak perniagaan, pameran inovasi Brunei, dan strategi komunikasi media.',
      descriptionEn: 'Coordinating international business summits, Brunei industrial trade expos, and media communications strategies.',
      institutions: ['IBTE Sultan Saiful Rijal Campus', 'Politeknik Brunei (Business)']
    },
    {
      titleMs: 'Pengurus Hospitaliti & Perkhidmatan Penerbangan (Royal Brunei Airlines)',
      titleEn: 'Aviation Services & Hospitality Operations Manager (Royal Brunei)',
      sector: 'Penerbangan & Pengurusan Perkhidmatan Pelanggan',
      wawasan2035Goal: 'Matlamat 2: Khidmat Perhubungan Antarabangsa Berkualiti Tinggi',
      descriptionMs: 'Mengurus perkhidmatan penerbangan komersial dan piawaian hospitaliti pelancongan Brunei.',
      descriptionEn: 'Supervising commercial airline flight operations, passenger logistics, and high-standard hospitality services.',
      institutions: ['IBTE Sultan Saiful Rijal (Aviation/Hospitality)', 'Politeknik Brunei']
    }
  ],

  // Combinations starting with C
  C: [
    {
      titleMs: 'Akauntan Awam Bertauliah & Juruaudit Kewangan (Brunei Investment Agency - BIA)',
      titleEn: 'Chartered Public Accountant & Financial Auditor (BIA / BIBD / Baiduri)',
      sector: 'Perbankan Islam, Pelaburan & Pengauditan Kewangan',
      wawasan2035Goal: 'Matlamat 3: Kestabilan Sistem Kewangan & Ketelusan Tadbir Urus',
      descriptionMs: 'Menguruskan penyata audit kewangan berkanun, perancangan cukai korporat, dan pengurusan aset pelaburan negara.',
      descriptionEn: 'Auditing statutory financial statements, advising corporate tax compliance, and managing sovereign asset allocations.',
      institutions: ['Politeknik Brunei (Diploma in Accounting)', 'PTET (A-Level Accounting & Maths)', 'IBTE Business Campus']
    },
    {
      titleMs: 'Pegawai Tadbir & Pengurusan Dokumen Rasmi (Jabatan Perkhidmatan Awam - JPA)',
      titleEn: 'Public Administration & Compliance Officer (Civil Service Commission)',
      sector: 'Pentadbiran Awam Kerajaan Brunei',
      wawasan2035Goal: 'Matlamat 2: Tadbir Urus Awam Cekap & Berintegriti',
      descriptionMs: 'Menyelia prosedur perundangan pentadbiran, rekod keselamatan sulit kerajaan, dan pengurusan kakitangan awam.',
      descriptionEn: 'Administering statutory civil service procedures, government document security protocols, and human capital records.',
      institutions: ['Politeknik Brunei (School of Business)', 'IBTE Business Campus']
    },
    {
      titleMs: 'Pakar Pengurusan Rangkaian Logistik & Kawalan Inventori Pintar',
      titleEn: 'Smart Supply Chain & Inventory Operations Specialist (Muara Port)',
      sector: 'Logistik Pelabuhan, Perkapalan & Perdagangan Bebas',
      wawasan2035Goal: 'Matlamat 3: Hab Logistik Serantau & Hubungan Maritim',
      descriptionMs: 'Mengoptimumkan aliran kontena kargo, kawalan stok gudang berkomputer, dan pelepasan kastam import-eksport.',
      descriptionEn: 'Optimizing container terminal movements, automated warehouse storage, and international trade customs clearance.',
      institutions: ['IBTE Nakhoda Ragam Campus', 'Politeknik Brunei (Logistics)']
    }
  ]
};

export function calculateRiasecCode(answers: Record<number, number>): {
  code: string;
  scores: Record<RiasecDimension, number>;
  dominantTraits: RiasecDimension[];
  careerSuggestions: CareerSuggestion[];
} {
  const scores: Record<RiasecDimension, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0
  };

  RIASEC_QUESTIONS.forEach((q) => {
    const ans = answers[q.id] || 0;
    scores[q.category] += ans;
  });

  const dimensions: RiasecDimension[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  
  // Sort dimensions descending by score
  dimensions.sort((a, b) => scores[b] - scores[a]);

  const dominantTraits = dimensions.slice(0, 3);
  const code = dominantTraits.join('');

  // Primary trait career suggestions, supplemented by secondary
  const primaryTrait = dominantTraits[0] || 'R';
  const secondaryTrait = dominantTraits[1] || 'I';

  const primarySuggestions = BRUNEI_CAREER_MAP[primaryTrait] || BRUNEI_CAREER_MAP['R'];
  const secondarySuggestions = BRUNEI_CAREER_MAP[secondaryTrait] || BRUNEI_CAREER_MAP['I'];

  const combinedSuggestions = [
    primarySuggestions[0],
    primarySuggestions[1] || secondarySuggestions[0],
    secondarySuggestions[0] || primarySuggestions[2]
  ].filter(Boolean);

  return {
    code,
    scores,
    dominantTraits,
    careerSuggestions: combinedSuggestions
  };
}
