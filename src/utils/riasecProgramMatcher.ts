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
  'ibte-hntec': {
    R: {
      ms: [
        'HNTec in Automobile Technology & Heavy Vehicles (Sultan Saiful Rijal)',
        'HNTec in Mechanical Engineering & Manufacturing (Jefri Bolkiah Campus)',
        'HNTec in Building Services & Geomatics (Nakhoda Ragam Campus)',
        'HNTec in Agrotechnology & Crop Production (Agro-Technology Campus Wasan)',
        'HNTec in Aircraft Maintenance & Avionics'
      ],
      en: [
        'HNTec in Automobile Technology & Heavy Vehicles (Sultan Saiful Rijal)',
        'HNTec in Mechanical Engineering & Manufacturing (Jefri Bolkiah Campus)',
        'HNTec in Building Services & Geomatics (Nakhoda Ragam Campus)',
        'HNTec in Agrotechnology & Crop Production (Agro-Technology Campus Wasan)',
        'HNTec in Aircraft Maintenance & Avionics'
      ]
    },
    I: {
      ms: [
        'HNTec in Laboratory Science & Quality Control (Jefri Bolkiah)',
        'HNTec in Information Technology & Network Systems (Nakhoda Ragam)'
      ],
      en: [
        'HNTec in Laboratory Science & Quality Control (Jefri Bolkiah)',
        'HNTec in Information Technology & Network Systems (Nakhoda Ragam)'
      ]
    },
    A: {
      ms: [
        'HNTec in Multimedia Technology & Graphic Design (Sultan Saiful Rijal)',
        'HNTec in Interior Design & Digital Craft (Nakhoda Ragam)'
      ],
      en: [
        'HNTec in Multimedia Technology & Graphic Design (Sultan Saiful Rijal)',
        'HNTec in Interior Design & Digital Craft (Nakhoda Ragam)'
      ]
    },
    S: {
      ms: [
        'HNTec in Hospitality & Tourism Operations (Sultan Saiful Rijal)',
        'HNTec in Culinary Arts & Food Service',
        'HNTec in Early Childhood Care & Education'
      ],
      en: [
        'HNTec in Hospitality & Tourism Operations (Sultan Saiful Rijal)',
        'HNTec in Culinary Arts & Food Service',
        'HNTec in Early Childhood Care & Education'
      ]
    },
    E: {
      ms: [
        'HNTec in Business & Marketing (Business Campus Gadong)',
        'HNTec in Retail Management & E-Commerce',
        'HNTec in Port Operations & Logistics Management'
      ],
      en: [
        'HNTec in Business & Marketing (Business Campus Gadong)',
        'HNTec in Retail Management & E-Commerce',
        'HNTec in Port Operations & Logistics Management'
      ]
    },
    C: {
      ms: [
        'HNTec in Business Accounting (Business Campus Gadong)',
        'HNTec in Office Administration & Data Records'
      ],
      en: [
        'HNTec in Business Accounting (Business Campus Gadong)',
        'HNTec in Office Administration & Data Records'
      ]
    }
  },
  'ibte-ntec': {
    R: {
      ms: [
        'NTec in Light Vehicle Mechanics & Automotive Services',
        'NTec in Welding & Fabrication (ISQ Energy Apprenticeship)',
        'NTec in Refrigeration & Air-Conditioning'
      ],
      en: [
        'NTec in Light Vehicle Mechanics & Automotive Services',
        'NTec in Welding & Fabrication (ISQ Energy Apprenticeship)',
        'NTec in Refrigeration & Air-Conditioning'
      ]
    },
    I: {
      ms: ['NTec in Industrial Operations & Measurement'],
      en: ['NTec in Industrial Operations & Measurement']
    },
    A: {
      ms: ['NTec in Building Craft & Decorative Finishing'],
      en: ['NTec in Building Craft & Decorative Finishing']
    },
    S: {
      ms: [
        'NTec in Food Preparation & Culinary Arts',
        'NTec in Hospitality & Guest Services'
      ],
      en: [
        'NTec in Food Preparation & Culinary Arts',
        'NTec in Hospitality & Guest Services'
      ]
    },
    E: {
      ms: ['NTec in Retail Sales & Customer Operations'],
      en: ['NTec in Retail Sales & Customer Operations']
    },
    C: {
      ms: ['NTec in Business & Office Support Services'],
      en: ['NTec in Business & Office Support Services']
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
