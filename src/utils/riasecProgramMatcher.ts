import { SubjectGrade, PathwayOption, RiasecDimension } from '../types';
import { evaluatePathways, calculateCredits } from '../data/pathwayRules';
import { RIASEC_DIMENSION_INFO } from '../data/riasecQuestions';

export interface RiasecEligibleProgram {
  pathwayId: string;
  institutionNameMs: string;
  institutionNameEn: string;
  status: 'eligible' | 'conditional' | 'not_eligible';
  statusLabelMs: string;
  statusLabelEn: string;
  matchedTraits: RiasecDimension[];
  matchedTraitsLabelMs: string;
  matchedTraitsLabelEn: string;
  programsMs: string[];
  programsEn: string[];
  minCredits: number;
  entrySummaryMs: string;
  entrySummaryEn: string;
}

// Program catalog by institution and RIASEC dimension
const INSTITUTION_RIASEC_CATALOG: Record<string, Record<RiasecDimension, { ms: string[]; en: string[] }>> = {
  'ptet-sixth-form': {
    R: {
      ms: ['Aliran Sains Tulen (Physics & Mathematics)', 'Aliran Reka Bentuk & Teknologi (D&T)'],
      en: ['Pure Science Stream (Physics & Mathematics)', 'Design & Technology Stream']
    },
    I: {
      ms: ['Aliran Sains Tulen (Physics, Chemistry, Biology & Add Maths)', 'Aliran Sains Alam Sekitar & Geografi'],
      en: ['Pure Science Stream (Physics, Chemistry, Biology & Add Maths)', 'Environmental Science & Geography Stream']
    },
    A: {
      ms: ['Aliran Sastera & Kesenian (Art & Design)', 'Aliran Kesusasteraan Melayu & English Literature'],
      en: ['Arts & Design Stream (Art & Design)', 'Malay & English Literature Stream']
    },
    S: {
      ms: ['Aliran Kemanusiaan & Sains Sosial (Sociology & History)', 'Aliran Syariah & Pengetahuan Ugama Islam (IRK)'],
      en: ['Humanities & Social Sciences (Sociology & History)', 'Syariah & Islamic Religious Knowledge (IRK) Stream']
    },
    E: {
      ms: ['Aliran Ekonomi & Pengajian Perniagaan (Economics & Business Studies)', 'Aliran Hubungan Antarabangsa & Pengurusan'],
      en: ['Economics & Business Studies Stream', 'International Relations & Management Track']
    },
    C: {
      ms: ['Aliran Perakaunan & Statistik (Accounting & Mathematics)', 'Aliran Sains Komputer & Analisis Data'],
      en: ['Accounting & Statistics Stream (Accounting & Mathematics)', 'Computer Science & Data Analysis Track']
    }
  },
  'politeknik-brunei': {
    R: {
      ms: [
        'Diploma in Mechanical Engineering (School of Science & Engineering, Lumut)',
        'Diploma in Electrical & Electronic Engineering',
        'Diploma in Civil Engineering & Construction Management',
        'Diploma in Telecommunications & Systems Engineering'
      ],
      en: [
        'Diploma in Mechanical Engineering (School of Science & Engineering, Lumut)',
        'Diploma in Electrical & Electronic Engineering',
        'Diploma in Civil Engineering & Construction Management',
        'Diploma in Telecommunications & Systems Engineering'
      ]
    },
    I: {
      ms: [
        'Diploma in Science Technology (Laboratory Sciences)',
        'Diploma in Environmental Health & Safety (School of Health Sciences)',
        'Diploma in Health Sciences (Medical Laboratory)'
      ],
      en: [
        'Diploma in Science Technology (Laboratory Sciences)',
        'Diploma in Environmental Health & Safety (School of Health Sciences)',
        'Diploma in Health Sciences (Medical Laboratory)'
      ]
    },
    A: {
      ms: [
        'Diploma in Digital Media & Web Design (School of ICT)',
        'Diploma in Architecture & Spatial Design'
      ],
      en: [
        'Diploma in Digital Media & Web Design (School of ICT)',
        'Diploma in Architecture & Spatial Design'
      ]
    },
    S: {
      ms: [
        'Diploma in Health Sciences (Nursing) - PAPRSB IHS UBD Campus',
        'Diploma in Physiotherapy & Rehabilitation',
        'Diploma in Midwifery & Community Healthcare'
      ],
      en: [
        'Diploma in Health Sciences (Nursing) - PAPRSB IHS UBD Campus',
        'Diploma in Physiotherapy & Rehabilitation',
        'Diploma in Midwifery & Community Healthcare'
      ]
    },
    E: {
      ms: [
        'Diploma in Business Studies & Marketing Management (Ong Sum Ping)',
        'Diploma in Human Capital & Logistics Operations',
        'Diploma in Entrepreneurship & International Trade'
      ],
      en: [
        'Diploma in Business Studies & Marketing Management (Ong Sum Ping)',
        'Diploma in Human Capital & Logistics Operations',
        'Diploma in Entrepreneurship & International Trade'
      ]
    },
    C: {
      ms: [
        'Diploma in Accounting & Financial Technology (Ong Sum Ping)',
        'Diploma in Business Information Systems & Database Management',
        'Diploma in Public Administration & Corporate Governance'
      ],
      en: [
        'Diploma in Accounting & Financial Technology (Ong Sum Ping)',
        'Diploma in Business Information Systems & Database Management',
        'Diploma in Public Administration & Corporate Governance'
      ]
    }
  },
  'ibte-diploma': {
    R: {
      ms: [
        'Diploma in Marine Engineering (Akademi Maritim Brunei - Jefri Bolkiah Campus)',
        'Diploma in Nautical Studies (Akademi Maritim Brunei - Jefri Bolkiah Campus)',
        'Diploma in Control & Automation Engineering (Jefri Bolkiah Campus)',
        'Diploma in Agricultural Technology (Agro-Technology Campus Wasan)'
      ],
      en: [
        'Diploma in Marine Engineering (Brunei Maritime Academy - Jefri Bolkiah Campus)',
        'Diploma in Nautical Studies (Brunei Maritime Academy - Jefri Bolkiah Campus)',
        'Diploma in Control & Automation Engineering (Jefri Bolkiah Campus)',
        'Diploma in Agricultural Technology (Agro-Technology Campus Wasan)'
      ]
    },
    I: {
      ms: [
        'Diploma in Refinery Operator / Process Engineering (Jefri Bolkiah Campus)',
        'Diploma in Information & Communication Technology (Sultan Saiful Rijal & Jefri Bolkiah)'
      ],
      en: [
        'Diploma in Refinery Operator / Process Engineering (Jefri Bolkiah Campus)',
        'Diploma in Information & Communication Technology (Sultan Saiful Rijal & Jefri Bolkiah)'
      ]
    },
    A: {
      ms: [
        'Diploma in Culinary Arts & Food Heritage (Sultan Saiful Rijal Campus)',
        'Diploma in Hospitality Management & Event Experience (Sultan Saiful Rijal Campus)'
      ],
      en: [
        'Diploma in Culinary Arts & Food Heritage (Sultan Saiful Rijal Campus)',
        'Diploma in Hospitality Management & Event Experience (Sultan Saiful Rijal Campus)'
      ]
    },
    S: {
      ms: [
        'Diploma in Hospitality Management & Guest Services (Sultan Saiful Rijal Campus)',
        'Diploma in Maritime Navigation & Crew Safety Management (Jefri Bolkiah Campus)'
      ],
      en: [
        'Diploma in Hospitality Management & Guest Services (Sultan Saiful Rijal Campus)',
        'Diploma in Maritime Navigation & Crew Safety Management (Jefri Bolkiah Campus)'
      ]
    },
    E: {
      ms: [
        'Diploma in Business & Financial Services (Business Campus Gadong)',
        'Diploma in Port Operations & Nautical Shipping Logistics (Jefri Bolkiah Campus)'
      ],
      en: [
        'Diploma in Business & Financial Services (Business Campus Gadong)',
        'Diploma in Port Operations & Nautical Shipping Logistics (Jefri Bolkiah Campus)'
      ]
    },
    C: {
      ms: [
        'Diploma in Financial Services & Accounting Analytics (Business Campus Gadong)',
        'Diploma in Data Systems & Process Operations (Jefri Bolkiah Campus)'
      ],
      en: [
        'Diploma in Financial Services & Accounting Analytics (Business Campus Gadong)',
        'Diploma in Data Systems & Process Operations (Jefri Bolkiah Campus)'
      ]
    }
  },
  'ibte-hntec': {
    R: {
      ms: [
        'HNTec in Automotive Technology & Heavy Vehicles (Mechanical Campus Tungku)',
        'HNTec in Mechanical Engineering & Manufacturing (Mechanical & Jefri Bolkiah)',
        'HNTec in Building Services & Geomatics (Nakhoda Ragam Campus)',
        'HNTec in Agrotechnology & Crop Production (Agro-Technology Campus Wasan)',
        'HNTec in Aircraft Maintenance Engineering (Airframe & Engine / Avionics) (Sultan Saiful Rijal)'
      ],
      en: [
        'HNTec in Automotive Technology & Heavy Vehicles (Mechanical Campus Tungku)',
        'HNTec in Mechanical Engineering & Manufacturing (Mechanical & Jefri Bolkiah)',
        'HNTec in Building Services & Geomatics (Nakhoda Ragam Campus)',
        'HNTec in Agrotechnology & Crop Production (Agro-Technology Campus Wasan)',
        'HNTec in Aircraft Maintenance Engineering (Airframe & Engine / Avionics) (Sultan Saiful Rijal)'
      ]
    },
    I: {
      ms: [
        'HNTec in Laboratory Science & Quality Testing (Agro-Technology Campus Wasan)',
        'HNTec in Information Technology & Computer Networking (Sultan Saiful Rijal & Jefri Bolkiah)'
      ],
      en: [
        'HNTec in Laboratory Science & Quality Testing (Agro-Technology Campus Wasan)',
        'HNTec in Information Technology & Computer Networking (Sultan Saiful Rijal & Jefri Bolkiah)'
      ]
    },
    A: {
      ms: [
        'HNTec in Interior Design & Digital Craft (Nakhoda Ragam Campus)',
        'HNTec in Electronics and Media Technology (Sultan Saiful Rijal Campus)'
      ],
      en: [
        'HNTec in Interior Design & Digital Craft (Nakhoda Ragam Campus)',
        'HNTec in Electronics and Media Technology (Sultan Saiful Rijal Campus)'
      ]
    },
    S: {
      ms: [
        'HNTec in Hospitality Operations & Culinary Arts (Sultan Saiful Rijal Campus)',
        'HNTec in Travel & Tourism Operations (Sultan Saiful Rijal Campus)'
      ],
      en: [
        'HNTec in Hospitality Operations & Culinary Arts (Sultan Saiful Rijal Campus)',
        'HNTec in Travel & Tourism Operations (Sultan Saiful Rijal Campus)'
      ]
    },
    E: {
      ms: [
        'HNTec in Business Management & Marketing (Business Campus Gadong)',
        'HNTec in Office Administration & Retail Operations (Business Campus Gadong)'
      ],
      en: [
        'HNTec in Business Management & Marketing (Business Campus Gadong)',
        'HNTec in Office Administration & Retail Operations (Business Campus Gadong)'
      ]
    },
    C: {
      ms: [
        'HNTec in Business Accounting (Business Campus Gadong)',
        'HNTec in Information & Library Studies (Sultan Saiful Rijal Campus)'
      ],
      en: [
        'HNTec in Business Accounting (Business Campus Gadong)',
        'HNTec in Information & Library Studies (Sultan Saiful Rijal Campus)'
      ]
    }
  },
  'ibte-ntec': {
    R: {
      ms: [
        'NTec in Light Vehicle Mechanics & Body Repair (Mechanical Campus Tungku)',
        'NTec in Welding & Metal Fabrication (Mechanical & Sultan Bolkiah Campuses)',
        'NTec in Building Craft - Carpentry & Plumbing (Nakhoda Ragam Campus)'
      ],
      en: [
        'NTec in Light Vehicle Mechanics & Body Repair (Mechanical Campus Tungku)',
        'NTec in Welding & Metal Fabrication (Mechanical & Sultan Bolkiah Campuses)',
        'NTec in Building Craft - Carpentry & Plumbing (Nakhoda Ragam Campus)'
      ]
    },
    I: {
      ms: [
        'NTec in Crop Production & Aquaculture (Agro-Technology Campus Wasan)',
        'NTec in Industrial Machining & Measurement (Mechanical Campus Tungku)'
      ],
      en: [
        'NTec in Crop Production & Aquaculture (Agro-Technology Campus Wasan)',
        'NTec in Industrial Machining & Measurement (Mechanical Campus Tungku)'
      ]
    },
    A: {
      ms: [
        'NTec in Building Craft & Painting Decorating (Nakhoda Ragam Campus)'
      ],
      en: [
        'NTec in Building Craft & Painting Decorating (Nakhoda Ragam Campus)'
      ]
    },
    S: {
      ms: [
        'NTec in Culinary Skills & Food Preparation (Sultan Saiful Rijal Campus)',
        'NTec in Food & Beverage Operations (Sultan Saiful Rijal Campus)'
      ],
      en: [
        'NTec in Culinary Skills & Food Preparation (Sultan Saiful Rijal Campus)',
        'NTec in Food & Beverage Operations (Sultan Saiful Rijal Campus)'
      ]
    },
    E: {
      ms: ['NTec in Retail Sales & Customer Operations (Business Campus Gadong)'],
      en: ['NTec in Retail Sales & Customer Operations (Business Campus Gadong)']
    },
    C: {
      ms: ['NTec in Business Administration & Office Support (Business Campus Gadong)'],
      en: ['NTec in Business Administration & Office Support (Business Campus Gadong)']
    }
  },
  'private-colleges': {
    R: {
      ms: ['Diploma in Information & Network Technology (Micronet International College)'],
      en: ['Diploma in Information & Network Technology (Micronet International College)']
    },
    I: {
      ms: ['Diploma in Software Engineering & Cyber Security (Micronet)'],
      en: ['Diploma in Software Engineering & Cyber Security (Micronet)']
    },
    A: {
      ms: ['Diploma in Creative Multimedia & Digital Graphic Design (LCB / Kolej IGS)'],
      en: ['Diploma in Creative Multimedia & Digital Graphic Design (LCB / Kolej IGS)']
    },
    S: {
      ms: ['Diploma in Hospitality & Tourism Management (Laksamana College of Business)'],
      en: ['Diploma in Hospitality & Tourism Management (Laksamana College of Business)']
    },
    E: {
      ms: [
        'Diploma in Business Management & Marketing (LCB / CCCT / Kolej IGS)',
        'Diploma in International Business & Entrepreneurship'
      ],
      en: [
        'Diploma in Business Management & Marketing (LCB / CCCT / Kolej IGS)',
        'Diploma in International Business & Entrepreneurship'
      ]
    },
    C: {
      ms: [
        'Certified Accounting Technician (CAT / ACCA FIA) - BICPA-FTMS Accountancy Academy',
        'Diploma in Accounting & Business Administration (Cosmopolitan College)'
      ],
      en: [
        'Certified Accounting Technician (CAT / ACCA FIA) - BICPA-FTMS Accountancy Academy',
        'Diploma in Accounting & Business Administration (Cosmopolitan College)'
      ]
    }
  },
  'direct-careers': {
    R: {
      ms: [
        'Skim Rekrut Angkatan Bersenjata Diraja Brunei (ABDB) / Pasukan Polis Diraja Brunei (PPDB)',
        'Skim Kadet Pelaut BGC (Brunei Gas Carriers Deck & Engine Cadet)'
      ],
      en: [
        'Royal Brunei Armed Forces (RBAF) / Royal Brunei Police Force (RBPF) Recruitment',
        'Brunei Gas Carriers (BGC) Deck & Engine Cadetship Scheme'
      ]
    },
    I: {
      ms: ['Skim Perantis Teknikal Industri & Kawalan Kualiti Sektor Minyak & Gas'],
      en: ['Industrial Technical Apprenticeship & Oil/Gas Sector Quality Inspection']
    },
    A: {
      ms: ['Industri Kreatif Tempatan, Produksi Media Digital & Keusahawanan Seni'],
      en: ['Local Creative Media Production & Digital Artistry Entrepreneurship']
    },
    S: {
      ms: ['Skim Perkhidmatan Pelanggan Perhotelan & Khidmat Masyarakat'],
      en: ['Hospitality Customer Service & Community Assistance Scheme']
    },
    E: {
      ms: [
        'Program Usahawan Belia PKS (DARe - Darussalam Enterprise)',
        'Skim Kadet Perkhidmatan Penerbangan Royal Brunei Airlines'
      ],
      en: [
        'SME Youth Entrepreneurship Programme (DARe - Darussalam Enterprise)',
        'Royal Brunei Airlines Commercial Aviation Services Trainee Scheme'
      ]
    },
    C: {
      ms: ['Pembantu Tadbir & Sokongan Kerani Sektor Korporat / Swasta'],
      en: ['Corporate Office Administration & Data Entry Clerkship']
    }
  }
};

export function getRiasecEligiblePrograms(
  subjectGrades: SubjectGrade[],
  dominantTraits: RiasecDimension[]
): RiasecEligibleProgram[] {
  const evaluated = evaluatePathways(subjectGrades);
  const credits = calculateCredits(subjectGrades);

  // If dominant traits are empty or default, fallback to top 2 ['R', 'I']
  const traitsToUse: RiasecDimension[] = dominantTraits.length > 0 ? dominantTraits.slice(0, 3) : ['R', 'I'];

  const results: RiasecEligibleProgram[] = [];

  evaluated.forEach((pathway) => {
    const cat = INSTITUTION_RIASEC_CATALOG[pathway.id];
    if (!cat) return;

    // Collect matched programs for dominant traits
    const msPrograms: string[] = [];
    const enPrograms: string[] = [];
    const matchedTraitsFound: RiasecDimension[] = [];

    traitsToUse.forEach((t) => {
      const entry = cat[t];
      if (entry && entry.ms.length > 0) {
        matchedTraitsFound.push(t);
        entry.ms.forEach((p) => {
          if (!msPrograms.includes(p)) msPrograms.push(p);
        });
        entry.en.forEach((p) => {
          if (!enPrograms.includes(p)) enPrograms.push(p);
        });
      }
    });

    const traitLabelsMs = matchedTraitsFound
      .map((t) => RIASEC_DIMENSION_INFO[t]?.nameMs.split(' ')[0] || t)
      .join(' & ');
    const traitLabelsEn = matchedTraitsFound
      .map((t) => RIASEC_DIMENSION_INFO[t]?.nameEn.split(' ')[0] || t)
      .join(' & ');

    results.push({
      pathwayId: pathway.id,
      institutionNameMs: pathway.institutionNameMs || pathway.nameMs,
      institutionNameEn: pathway.institutionNameEn || pathway.nameEn,
      status: pathway.status,
      statusLabelMs: pathway.statusLabelMs,
      statusLabelEn: pathway.statusLabelEn,
      matchedTraits: matchedTraitsFound,
      matchedTraitsLabelMs: traitLabelsMs || 'Umum',
      matchedTraitsLabelEn: traitLabelsEn || 'General',
      programsMs: msPrograms.slice(0, 4),
      programsEn: enPrograms.slice(0, 4),
      minCredits: pathway.minCredits,
      entrySummaryMs: `Syarat: ${pathway.minCredits} Kredit O-Level (Pelajar: ${credits.totalCredits} Kredit)`,
      entrySummaryEn: `Entry: ${pathway.minCredits} O-Level Credits (Attained: ${credits.totalCredits} Credits)`
    });
  });

  return results;
}
