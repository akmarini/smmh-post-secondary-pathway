import { jsPDF } from 'jspdf';
import { SmmhHalaTujuState, SubjectGrade, Language, RiasecDimension } from '../types';
import { calculateCredits } from '../data/pathwayRules';
import { calculateRiasecCode, RIASEC_DIMENSION_INFO } from '../data/riasecQuestions';
import { getRiasecEligiblePrograms } from './riasecProgramMatcher';

/**
 * Direct vector/text official A4 PDF generator for Student Pathway Passport.
 * Accurately reflects all on-screen passport sections in the active language (English or BM),
 * including correct School Name (Sekolah Menengah Muda Hashim), RIASEC scores & traits,
 * Career Pathways, Counseling Checklist, and Endorsements.
 */
export function generateDirectPassportPdf(state: SmmhHalaTujuState, lang: Language = 'en'): boolean {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const isEn = lang === 'en';
    const pageWidth = 210;
    const margin = 10;
    const contentWidth = pageWidth - margin * 2; // 190mm
    let y = 9;

    const profile = state.profile || {
      studentName: '',
      icNumber: '',
      studentClass: '11Sc',
      contactNumber: '',
      parentName: '',
      parentContact: '',
      targetAspirations: ''
    };

    const subjectGrades: SubjectGrade[] = Array.isArray(state.subjectGrades) ? state.subjectGrades : [];
    const credits = calculateCredits(subjectGrades);
    const riasecData = calculateRiasecCode(state.riasecAnswers || {});
    const checklist = state.checklist || {
      counselorSessionDone: false,
      specialPrereqChecked: false,
      parentDiscussed: false,
      documentsCertified: false,
      hecasAccountCreated: false,
    };

    const primaryTrait = riasecData.dominantTraits[0] || 'R';
    const secondaryTrait = riasecData.dominantTraits[1] || 'I';
    const tertiaryTrait = riasecData.dominantTraits[2] || 'A';
    
    const traitNames = riasecData.dominantTraits
      .map((t: RiasecDimension) => {
        const info = RIASEC_DIMENSION_INFO[t];
        return isEn ? info?.nameEn?.split(' ')[0] : info?.nameMs?.split(' ')[0];
      })
      .filter(Boolean)
      .join(' • ');

    const checklistItems = [
      {
        key: 'counselorSessionDone' as const,
        label: isEn 
          ? 'Completed 1-on-1 session with Career Guidance Section Counselor' 
          : 'Telah berbincang dengan Guru Kaunselor Seksyen Bimbingan Kerjaya'
      },
      {
        key: 'specialPrereqChecked' as const,
        label: isEn 
          ? 'Checked specific programme entry requirements in HECAS/PB/IBTE portals' 
          : 'Telah menyemak syarat khas kursus pilihan di portal rasmi HECAS / PB / IBTE'
      },
      {
        key: 'parentDiscussed' as const,
        label: isEn 
          ? 'Discussed pathway choices & transportation logistics with parents' 
          : 'Telah berbincang dan mendapat persetujuan daripada ibu bapa / penjaga'
      },
      {
        key: 'documentsCertified' as const,
        label: isEn 
          ? 'Certified true copies of O-Level result slip and Smart Identity Card ready' 
          : 'Dokumen salinan Sijil O-Level dan Kad Pengenalan telah disahkan benar'
      },
      {
        key: 'hecasAccountCreated' as const,
        label: isEn 
          ? 'HECAS & TVET admission portal user profile created' 
          : 'Akaun pendaftaran portal HECAS & TVET telah dicipta'
      }
    ];

    const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

    // ==========================================
    // 1. OFFICIAL PASSPORT HEADER BANNER
    // ==========================================
    doc.setFillColor(12, 74, 110); // Sky 900 (Navy)
    doc.roundedRect(margin, y, contentWidth, 21, 1.5, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('SEKOLAH MENENGAH MUDA HASHIM, TUTONG', pageWidth / 2, y + 5.5, { align: 'center' });

    doc.setFontSize(7);
    doc.setTextColor(224, 242, 254);
    doc.setFont('helvetica', 'normal');
    doc.text(isEn ? 'BRUNEI DARUSSALAM • CAREER GUIDANCE SECTION' : 'BRUNEI DARUSSALAM • SEKSYEN BIMBINGAN KERJAYA', pageWidth / 2, y + 9.2, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(251, 191, 36); // Amber Gold
    doc.setFont('helvetica', 'bold');
    doc.text(
      isEn 
        ? 'STUDENT ACADEMIC & CAREER PATHWAY PASSPORT 2026' 
        : 'PASPORT HALA TUJU AKADEMIK & KERJAYA PELAJAR 2026', 
      pageWidth / 2, 
      y + 14.5, 
      { align: 'center' }
    );

    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(224, 242, 254);
    doc.text(
      isEn 
        ? 'YEAR 2026 • YEAR 11' 
        : 'TAHUN 2026 • TAHUN 11', 
      pageWidth / 2, 
      y + 18.5, 
      { align: 'center' }
    );

    y += 24;

    // ==========================================
    // 2. SECTION A: STUDENT PROFILE & O-LEVEL CREDITS
    // ==========================================
    const secAHeight = 24;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, secAHeight, 1.2, 1.2, 'FD');

    // Section header
    doc.setFillColor(14, 116, 144); // Cyan 700
    doc.roundedRect(margin, y, contentWidth, 5, 1.2, 1.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(
      isEn 
        ? 'SECTION A: STUDENT PROFILE & O-LEVEL ACADEMIC SUMMARY' 
        : 'SEKSYEN A: PROFIL PELAJAR & RINGKASAN AKADEMIK O-LEVEL', 
      margin + 3, 
      y + 3.5
    );

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7.2);

    const r1 = y + 9;
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Full Name:' : 'Nama Penuh:', margin + 3, r1);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.studentName || (isEn ? 'Not Provided' : 'Belum Diisi'), margin + 24, r1);

    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Class:' : 'Kelas:', margin + 115, r1);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.studentClass || '11Sc', margin + 128, r1);

    const r2 = y + 14;
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'IC Number:' : 'No. Kad Pengenalan:', margin + 3, r2);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.icNumber || '-', margin + 32, r2);

    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Student Phone:' : 'Tel. Pelajar:', margin + 115, r2);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.contactNumber || '-', margin + 138, r2);

    const r3 = y + 19;
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Parent/Guardian:' : 'Ibu Bapa/Penjaga:', margin + 3, r3);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.parentName || '-', margin + 32, r3);

    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Parent Phone:' : 'Tel. Penjaga:', margin + 115, r3);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.parentContact || '-', margin + 138, r3);

    y += secAHeight + 2.5;

    // ==========================================
    // 3. O-LEVEL CREDITS & SUBJECTS TABLE
    // ==========================================
    const totalSubjectRows = Math.ceil(subjectGrades.length / 2);
    const subTableHeight = 13 + totalSubjectRows * 3.8;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, subTableHeight, 1.2, 1.2, 'FD');

    // Credit benchmark summary badge
    doc.setFillColor(238, 242, 255); // Indigo 50
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(margin + 2, y + 2, contentWidth - 4, 7, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 58, 138); // Indigo 900
    doc.text(
      isEn 
        ? `TOTAL O-LEVEL CREDITS: ${credits.totalCredits} Credit(s)` 
        : `JUMLAH KREDIT O-LEVEL: ${credits.totalCredits} Kredit`, 
      margin + 4, 
      y + 6.2
    );

    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const bmStatus = credits.bmCredit ? (isEn ? '✓ Pass Credit' : '✓ Lulus Kredit') : (isEn ? 'No Credit' : 'Belum Kredit');
    const engStatus = credits.engCredit ? (isEn ? '✓ Pass Credit' : '✓ Lulus Kredit') : (isEn ? 'No Credit' : 'Belum Kredit');
    const mathStatus = credits.mathCredit ? (isEn ? '✓ Pass Credit' : '✓ Lulus Kredit') : (isEn ? 'No Credit' : 'Belum Kredit');
    doc.text(`BM: ${bmStatus}   |   BI: ${engStatus}   |   Math: ${mathStatus}`, margin + 75, y + 6.2);

    // Subject items in 2 columns
    const col1X = margin + 3;
    const col2X = margin + 98;
    let currSubY = y + 12;

    doc.setFontSize(6.5);
    for (let i = 0; i < subjectGrades.length; i += 2) {
      const sub1 = subjectGrades[i];
      const sub2 = subjectGrades[i + 1];

      // Left column
      if (sub1) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.text(sub1.subjectName.split('(')[0].trim(), col1X, currSubY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(3, 105, 161);
        doc.text(sub1.grade || '-', col1X + 80, currSubY, { align: 'right' });
      }

      // Right column
      if (sub2) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.text(sub2.subjectName.split('(')[0].trim(), col2X, currSubY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(3, 105, 161);
        doc.text(sub2.grade || '-', col2X + 80, currSubY, { align: 'right' });
      }

      currSubY += 3.8;
    }

    y += subTableHeight + 2.5;

    // ==========================================
    // 4. SECTION B: RIASEC PERSONALITY & CAREER MATCHES
    // ==========================================
    const secBHeight = 56;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, secBHeight, 1.2, 1.2, 'FD');

    doc.setFillColor(14, 116, 144);
    doc.roundedRect(margin, y, contentWidth, 4.8, 1.2, 1.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(
      isEn 
        ? 'SECTION B: RIASEC PERSONALITY PROFILE & CAREER CHOICES' 
        : 'SEKSYEN B: PROFIL PERSONALITI RIASEC & PILIHAN KERJAYA', 
      margin + 3, 
      y + 3.4
    );

    // RIASEC Code & Dimension Scores breakdown
    const riaY = y + 8;
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? 'Holland RIASEC Code:' : 'Kod Holland RIASEC:', margin + 3, riaY);

    // Code badge
    doc.setFontSize(8.5);
    doc.setTextColor(3, 105, 161);
    const displayCode = state.riasecCode && state.riasecCode !== '---' ? state.riasecCode : riasecData.code;
    doc.text(displayCode, margin + 40, riaY);

    // Traits names
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`(${traitNames})`, margin + 52, riaY);

    // Complete RIASEC Dimension Scores breakdown
    const scores = riasecData.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    doc.setFontSize(6.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(
      `Scores:  R: ${scores.R}   I: ${scores.I}   A: ${scores.A}   S: ${scores.S}   E: ${scores.E}   C: ${scores.C}`, 
      margin + 122, 
      riaY
    );

    // 1st & 2nd Choice Pathways Boxes
    const pathWidth = (contentWidth - 6) / 2;
    const pathY = y + 11;

    // 1st Choice (Plan A)
    doc.setFillColor(240, 253, 244); // Green 50
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin + 2, pathY, pathWidth, 10.5, 1, 1, 'FD');
    doc.setTextColor(22, 101, 52); // Green 800
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? '⭐ 1ST CHOICE PATHWAY (PLAN A):' : '⭐ PILIHAN LALUAN 1 (PELAN A):', margin + 4, pathY + 3.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(6.2);
    const planALines = doc.splitTextToSize(state.firstChoicePathway || (isEn ? 'Not Selected' : 'Belum Dipilih'), pathWidth - 4);
    doc.text(planALines, margin + 4, pathY + 6.8);

    // 2nd Choice (Plan B)
    const p2X = margin + 4 + pathWidth;
    doc.setFillColor(254, 242, 242); // Rose 50
    doc.setDrawColor(254, 205, 211);
    doc.roundedRect(p2X, pathY, pathWidth, 10.5, 1, 1, 'FD');
    doc.setTextColor(159, 18, 57); // Rose 800
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text(isEn ? '🎯 2ND CHOICE PATHWAY (PLAN B):' : '🎯 PILIHAN LALUAN 2 (PELAN B):', p2X + 2, pathY + 3.2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(6.2);
    const planBLines = doc.splitTextToSize(state.secondChoicePathway || (isEn ? 'Not Selected' : 'Belum Dipilih'), pathWidth - 4);
    doc.text(planBLines, p2X + 2, pathY + 6.8);

    // Top 3 Career Matches
    const careersY = y + 23;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(12, 74, 110);
    doc.text(
      isEn ? 'TOP 3 CAREER MATCHES:' : '3 PILIHAN KERJAYA UTAMA:', 
      margin + 3, 
      careersY
    );

    const careerColWidth = (contentWidth - 6) / 3;
    const cSuggestions = riasecData.careerSuggestions.slice(0, 3);
    
    cSuggestions.forEach((c, idx) => {
      const cX = margin + 2 + idx * (careerColWidth + 1);
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(cX, careersY + 1.5, careerColWidth, 9.5, 0.8, 0.8, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      const title = isEn ? c.titleEn : c.titleMs;
      const titleLines = doc.splitTextToSize(`${idx + 1}. ${title}`, careerColWidth - 3);
      doc.text(titleLines, cX + 1.5, careersY + 4.5);

      doc.setTextColor(180, 83, 9); // Amber 700
      doc.setFontSize(5.2);
      doc.text(c.sector || 'Brunei Darussalam', cX + 1.5, careersY + 9);
    });

    // RIASEC-Matched Eligible Programmes
    const progsY = y + 35.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(12, 74, 110);
    doc.text(
      isEn 
        ? 'ELIGIBLE PROGRAMMES MATCHING RIASEC & O-LEVEL GRADES:' 
        : 'PROGRAM PENGAJIAN LAYAK DIPOHON MENGIKUT MINAT RIASEC & GRED O-LEVEL:', 
      margin + 3, 
      progsY
    );

    const eligibleRiasecList = getRiasecEligiblePrograms(state.subjectGrades, riasecData.dominantTraits);
    const validProgs = eligibleRiasecList.filter((p) => p.status === 'eligible' || p.status === 'conditional').slice(0, 3);
    const progBoxWidth = (contentWidth - 6) / (validProgs.length > 0 ? validProgs.length : 1);

    if (validProgs.length === 0) {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 2, progsY + 1.5, contentWidth - 4, 15, 0.8, 0.8, 'FD');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6);
      doc.setTextColor(100, 116, 139);
      doc.text(
        isEn 
          ? 'Complete your O-Level subject grades in the Grade Calculator to view matched eligible programmes.' 
          : 'Sila lengkapkan gred O-Level di kalkulator gred untuk memaparkan program pengajian yang layak.', 
        margin + 4, 
        progsY + 9
      );
    } else {
      validProgs.forEach((prog, pIdx) => {
        const pX = margin + 2 + pIdx * (progBoxWidth + 1);
        doc.setFillColor(prog.status === 'eligible' ? 240 : 254, prog.status === 'eligible' ? 253 : 252, prog.status === 'eligible' ? 244 : 232);
        doc.setDrawColor(prog.status === 'eligible' ? 187 : 253, prog.status === 'eligible' ? 247 : 230, prog.status === 'eligible' ? 208 : 138);
        doc.roundedRect(pX, progsY + 1.5, progBoxWidth - 1, 16.5, 0.8, 0.8, 'FD');

        doc.setTextColor(prog.status === 'eligible' ? 22 : 146, prog.status === 'eligible' ? 101 : 64, prog.status === 'eligible' ? 52 : 14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.8);
        const instName = isEn ? prog.institutionNameEn : prog.institutionNameMs;
        const shortInst = instName.length > 32 ? instName.substring(0, 30) + '...' : instName;
        doc.text(shortInst, pX + 1.5, progsY + 4.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(5.2);
        const sampleProgs = isEn ? prog.programsEn.slice(0, 2) : prog.programsMs.slice(0, 2);
        sampleProgs.forEach((sp, sIdx) => {
          const spShort = sp.length > 40 ? sp.substring(0, 38) + '...' : sp;
          doc.text(`• ${spShort}`, pX + 1.5, progsY + 8 + sIdx * 3.8);
        });

        doc.setTextColor(3, 105, 161);
        doc.setFontSize(4.8);
        doc.setFont('helvetica', 'bold');
        doc.text(
          `${isEn ? 'Match:' : 'Padanan:'} ${isEn ? prog.matchedTraitsLabelEn : prog.matchedTraitsLabelMs}`, 
          pX + 1.5, 
          progsY + 16
        );
      });
    }

    y += secBHeight + 2.5;

    // ==========================================
    // 5. SECTION C: CAREER COUNSELING READINESS CHECKLIST
    // ==========================================
    const secCHeight = 31;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, secCHeight, 1.2, 1.2, 'FD');

    doc.setFillColor(14, 116, 144);
    doc.roundedRect(margin, y, contentWidth, 5, 1.2, 1.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(
      isEn 
        ? `SECTION C: CAREER COUNSELING READINESS CHECKLIST (${completedChecklistCount}/5 Completed)` 
        : `SEKSYEN C: SENARAI SEMAK PERSEDIAAN KAUNSELING KERJAYA (${completedChecklistCount}/5 Selesai)`, 
      margin + 3, 
      y + 3.5
    );

    let checkItemY = y + 8.5;
    checklistItems.forEach((item) => {
      const isChecked = checklist[item.key];

      // Checkbox square
      doc.setDrawColor(isChecked ? 5 : 148, isChecked ? 150 : 163, isChecked ? 105 : 184);
      doc.setFillColor(isChecked ? 220 : 255, isChecked ? 252 : 255, isChecked ? 231 : 255);
      doc.rect(margin + 4, checkItemY - 2.8, 3.2, 3.2, 'FD');

      if (isChecked) {
        doc.setTextColor(22, 101, 52); // Green
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.text('✓', margin + 4.6, checkItemY - 0.4);
      }

      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', isChecked ? 'bold' : 'normal');
      doc.setFontSize(6.5);
      doc.text(item.label, margin + 9, checkItemY - 0.5);

      // Status pill on the right
      doc.setFontSize(5.8);
      if (isChecked) {
        doc.setTextColor(22, 101, 52);
        doc.text(isEn ? '[ COMPLETED ]' : '[ SELESAI ]', margin + contentWidth - 22, checkItemY - 0.5);
      } else {
        doc.setTextColor(100, 116, 139);
        doc.text(isEn ? '[ PENDING ]' : '[ BELUM ]', margin + contentWidth - 20, checkItemY - 0.5);
      }

      checkItemY += 4.3;
    });

    y += secCHeight + 2.5;

    // ==========================================
    // 6. SECTION D: ENDORSEMENT & DUAL SIGNATURES
    // ==========================================
    const secDHeight = 36;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, secDHeight, 1.2, 1.2, 'FD');

    doc.setFillColor(15, 23, 42); // Slate 900
    doc.roundedRect(margin, y, contentWidth, 5, 1.2, 1.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(
      isEn 
        ? 'SECTION D: ENDORSEMENT & DUAL SIGNATURES' 
        : 'SEKSYEN D: PERAKUAN & PENGESAHAN BERSAMA', 
      margin + 3, 
      y + 3.5
    );

    // Endorsement text
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(5.8);
    doc.setFont('helvetica', 'normal');
    const endorseMsg = isEn
      ? 'I hereby confirm that the academic target grades, RIASEC career profile, and post-secondary educational pathway choices recorded in this passport have been formulated and agreed upon collaboratively between the student, parents/guardians, and Career Guidance Counselors.'
      : 'Dengan ini saya mengesahkan bahawa sasaran akademik O-Level, profil kerjaya RIASEC, dan pilihan institusi pengajian pasca-menengah yang tercatat dalam pasport ini telah dibincangkan dan dipersetujui bersama antara pelajar, ibu bapa/penjaga, dan Seksyen Bimbingan Kerjaya Sekolah Menengah Muda Hashim Tutong.';
    
    const endorseLines = doc.splitTextToSize(endorseMsg, contentWidth - 8);
    doc.text(endorseLines, margin + 4, y + 8.5);

    // Dual Signatures Boxes
    const sigColWidth = (contentWidth - 6) / 2;
    const sigBoxesY = y + 14;

    // Left: Student Signature
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 2, sigBoxesY, sigColWidth, 16, 1, 1, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(isEn ? 'STUDENT SIGNATURE:' : 'TANDATANGAN PELAJAR:', margin + 4, sigBoxesY + 3.5);
    doc.setDrawColor(148, 163, 184);
    doc.line(margin + 4, sigBoxesY + 11, margin + sigColWidth - 4, sigBoxesY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.text(`${isEn ? 'Name' : 'Nama'}: ${profile.studentName || '..............................'}`, margin + 4, sigBoxesY + 14.5);
    const dateFormatted = new Date().toLocaleDateString(isEn ? 'en-GB' : 'ms-MY');
    doc.text(`${isEn ? 'Date' : 'Tarikh'}: ${dateFormatted}`, margin + sigColWidth - 28, sigBoxesY + 14.5);

    // Right: Parent Signature
    const pSigX = margin + 4 + sigColWidth;
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pSigX, sigBoxesY, sigColWidth, 16, 1, 1, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(isEn ? 'PARENT / GUARDIAN SIGNATURE:' : 'TANDATANGAN IBU BAPA / PENJAGA:', pSigX + 2, sigBoxesY + 3.5);
    doc.setDrawColor(148, 163, 184);
    doc.line(pSigX + 2, sigBoxesY + 11, pSigX + sigColWidth - 4, sigBoxesY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.text(`${isEn ? 'Name' : 'Nama'}: ${profile.parentName || '..............................'}`, pSigX + 2, sigBoxesY + 14.5);
    doc.text(`${isEn ? 'Date' : 'Tarikh'}: ${dateFormatted}`, pSigX + sigColWidth - 28, sigBoxesY + 14.5);

    // Stamp & Document ID Bar
    const stampY = y + secDHeight - 3;
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'bold');
    doc.text(
      isEn 
        ? 'OFFICIAL STAMP: Career Guidance Section • Sekolah Menengah Muda Hashim Tutong' 
        : 'COP RASMI: Seksyen Bimbingan Kerjaya • Sekolah Menengah Muda Hashim Tutong', 
      margin + 4, 
      stampY
    );
    const docId = `PASSPORT-${profile.icNumber ? profile.icNumber.replace(/[^a-zA-Z0-9]/g, '') : '2026-REG'}`;
    doc.text(`DOC ID: ${docId}`, margin + contentWidth - 40, stampY);

    y += secDHeight + 2;

    // Footer note
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(5.2);
    doc.setFont('helvetica', 'italic');
    doc.text(
      isEn 
        ? '* This official passport was digitally generated by Sekolah Menengah Muda Hashim Tutong Student Pathway Navigator App 2026.' 
        : '* Dokumen pasport ini dijana secara digital melalui Aplikasi Hala Tuju Kerjaya Pelajar Sekolah Menengah Muda Hashim Tutong 2026.', 
      pageWidth / 2, 
      y + 1, 
      { align: 'center' }
    );

    // ==========================================
    // SAVE & DOWNLOAD PDF
    // ==========================================
    const safeName = (profile.studentName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `Passport_Sekolah_Menengah_Muda_Hashim_Tutong_${safeName}_${dateStr}.pdf`;

    try {
      doc.save(fileName);
    } catch {
      const blob = doc.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return true;
  } catch (err) {
    console.error('PDF Generation Exception:', err);
    return false;
  }
}
