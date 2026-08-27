import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory cohort repository (Starts empty / cleared for real school records)
let cohortData: Array<{
  id: string;
  studentName: string;
  icNumber: string;
  studentClass: string;
  totalCredits: number;
  bmGrade: string;
  engGrade: string;
  mathGrade: string;
  otherGrades: Array<{ subject: string; grade: string }>;
  riasecCode: string;
  primaryTrait: string;
  topCareers: string[];
  firstChoicePathway: string;
  secondChoicePathway: string;
  passportCompleted: boolean;
  checklistCompletedCount: number;
  checklistTotal: number;
  submittedAt: string;
}> = [];

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    school: "Sekolah Menengah Muda Hashim (SMMH)",
    location: "Tutong, Brunei Darussalam",
    version: "2.0.0"
  });
});

app.get("/api/cohort", (_req, res) => {
  res.json({
    success: true,
    count: cohortData.length,
    data: cohortData
  });
});

app.delete("/api/cohort", (_req, res) => {
  cohortData = [];
  res.json({
    success: true,
    message: "Semua rekod kohort berjaya dikosongkan / All cohort records cleared.",
    count: 0,
    data: []
  });
});

app.post("/api/cohort/clear", (_req, res) => {
  cohortData = [];
  res.json({
    success: true,
    message: "Semua rekod kohort berjaya dikosongkan / All cohort records cleared.",
    count: 0,
    data: []
  });
});

app.post("/api/cohort", (req, res) => {
  try {
    const studentEntry = req.body;
    if (!studentEntry || !studentEntry.studentName) {
      return res.status(400).json({ success: false, message: "Nama pelajar diperlukan / Student name is required." });
    }

    const existingIndex = cohortData.findIndex(
      (item) =>
        (item.icNumber && item.icNumber === studentEntry.icNumber) ||
        (item.studentName.toLowerCase() === studentEntry.studentName.toLowerCase() && item.studentClass === studentEntry.studentClass)
    );

    const recordWithMeta = {
      ...studentEntry,
      id: studentEntry.id || `SMMH-2026-${String(cohortData.length + 1).padStart(3, "0")}`,
      submittedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      cohortData[existingIndex] = {
        ...cohortData[existingIndex],
        ...recordWithMeta
      };
    } else {
      cohortData.unshift(recordWithMeta);
    }

    res.json({
      success: true,
      message: "Rekod pelajar berjaya disimpan dalam sistem kohort SMMH.",
      data: recordWithMeta
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Gemini AI Counselor Advisor API (Server-side)
app.post("/api/ai-counselor", async (req, res) => {
  try {
    const { studentName, studentClass, totalCredits, bmGrade, engGrade, mathGrade, riasecCode, topCareers, dreamPathway } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a comprehensive structured local advising guidance if API key is not yet set
      return res.json({
        success: true,
        source: "local-rule-engine",
        advice: `Salam sejahtera ${studentName || "pelajar SMMH"}. Berdasarkan keputusan O-Level anda (${totalCredits} Kredit: BM ${bmGrade}, BI ${engGrade}, Math ${mathGrade}) dan kod personaliti RIASEC ${riasecCode || "SIA"}, anda mempunyai potensi yang sangat baik untuk meneruskan hala tuju ke institusi lepasan menengah di Negara Brunei Darussalam. Pastikan anda menyemak tarikh pendaftaran HECAS/BPTV dan berbincang dengan kaunselor SMMH serta ibu bapa anda untuk memilih bidang yang selaras dengan Wawasan Brunei 2035.`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Anda adalah Guru Kaunselor Kerjaya dan Akademik Sekolah Menengah Muda Hashim (SMMH), Tutong, Negara Brunei Darussalam.
Berikan nasihat peribadi yang memberi dorongan, profesional, dan berstruktur dalam Bahasa Melayu (dengan istilah pendidikan Brunei rasmi seperti PTET, Politeknik Brunei, IBTE HNTec, HECAS, Wawasan Brunei 2035, BDQF/MKPK).

Maklumat Pelajar:
- Nama: ${studentName || "Pelajar SMMH"}
- Kelas: ${studentClass || "Tahun 5"}
- Jumlah Kredit O-Level: ${totalCredits} Kredit (Gred BM: ${bmGrade}, BI: ${engGrade}, Matematik: ${mathGrade})
- Kod RIASEC: ${riasecCode}
- Cadangan Kerjaya RIASEC: ${Array.isArray(topCareers) ? topCareers.join(", ") : topCareers}
- Pilihan/Hasrat Pelajar: ${dreamPathway || "Tidak dinyatakan"}

Format Maklum Balas:
1. Analisis Ringkas Kekuatan Akademik & Minat (2 ayat)
2. Cadangan Laluan Utama & Pelan Sandaran (Institusi Brunei: PTET / Politeknik Brunei / IBTE mengikut kelayakan)
3. Pesanan Kaunselor untuk persediaan permohonan dan sokongan keluarga (1-2 ayat).

Sila berikan jawapan dalam Bahasa Melayu yang mesra, membina semangat, dan padat (maksimum 180 patah perkataan).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      source: "gemini-ai",
      advice: response.text
    });
  } catch (error: any) {
    console.error("AI Counselor endpoint error:", error);
    res.json({
      success: true,
      source: "fallback",
      advice: "Nasihat Kaunselor SMMH: Utamakan syarat khas kemasukan (termasuk gred Bahasa Melayu dan Bahasa Inggeris). Sila berjumpa Guru Kaunselor di Bilik Kaunseling SMMH untuk sesi bimbingan individu yang lebih terperinci."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SMMH Hala Tuju Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
