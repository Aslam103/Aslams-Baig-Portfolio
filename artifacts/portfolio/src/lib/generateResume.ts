import { jsPDF } from "jspdf";
import { resumeData } from "@/data/resume";

const PAGE_W = 210; // A4 width mm
const PAGE_H = 297; // A4 height mm
const MARGIN_X = 14;
const MAX_W = PAGE_W - MARGIN_X * 2;

export function generateResumePdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 16;

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - 12) {
      doc.addPage();
      y = 16;
    }
  };

  const setFont = (size: number, weight: "normal" | "bold" = "normal") => {
    doc.setFont("helvetica", weight);
    doc.setFontSize(size);
  };

  const writeWrapped = (text: string, size: number, weight: "normal" | "bold" = "normal", lineHeight = 1.35) => {
    setFont(size, weight);
    const lines = doc.splitTextToSize(text, MAX_W);
    const lh = (size * lineHeight) / 2.83465;
    for (const line of lines) {
      ensureSpace(lh);
      doc.text(line, MARGIN_X, y);
      y += lh;
    }
  };

  const sectionHeading = (label: string) => {
    y += 2.5;
    ensureSpace(8);
    setFont(11, "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(label.toUpperCase(), MARGIN_X, y);
    y += 1.5;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
    y += 4;
    doc.setTextColor(40, 40, 40);
  };

  const bullet = (text: string) => {
    setFont(10);
    const lines = doc.splitTextToSize(text, MAX_W - 4);
    const lh = (10 * 1.35) / 2.83465;
    ensureSpace(lh * lines.length);
    doc.text("•", MARGIN_X, y);
    doc.text(lines, MARGIN_X + 4, y);
    y += lh * lines.length;
  };

  // ---------- HEADER ----------
  doc.setTextColor(15, 15, 15);
  setFont(20, "bold");
  doc.text(resumeData.name, MARGIN_X, y);
  y += 7;

  setFont(11, "bold");
  doc.setTextColor(60, 60, 60);
  doc.text(resumeData.title, MARGIN_X, y);
  y += 5;

  setFont(9.5);
  doc.setTextColor(80, 80, 80);
  const contactLine1 = `${resumeData.contact.location}  |  ${resumeData.contact.phone}  |  ${resumeData.contact.email}`;
  doc.text(contactLine1, MARGIN_X, y);
  y += 4.2;
  const contactLine2 = `${resumeData.contact.github}  |  ${resumeData.contact.company}`;
  doc.text(contactLine2, MARGIN_X, y);
  y += 4;

  doc.setDrawColor(120, 120, 120);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  y += 5;

  // ---------- SUMMARY ----------
  sectionHeading("Professional Summary");
  writeWrapped(resumeData.summary, 10);

  // ---------- CORE COMPETENCIES ----------
  sectionHeading("Core Competencies");
  setFont(10);
  const cols = 2;
  const colW = MAX_W / cols;
  const lh = (10 * 1.4) / 2.83465;
  const items = resumeData.coreCompetencies;
  const rows = Math.ceil(items.length / cols);
  ensureSpace(rows * lh);
  for (let i = 0; i < items.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN_X + col * colW;
    const yy = y + row * lh;
    doc.text(`•  ${items[i]}`, x, yy);
  }
  y += rows * lh + 1;

  // ---------- TECHNICAL SKILLS ----------
  sectionHeading("Technical Skills");
  for (const group of resumeData.technicalSkills) {
    setFont(10, "bold");
    const labelW = doc.getTextWidth(`${group.group}: `);
    const groupLine = `${group.group}: ${group.items.join(", ")}`;
    const lines = doc.splitTextToSize(groupLine, MAX_W);
    const blockLh = (10 * 1.4) / 2.83465;
    ensureSpace(lines.length * blockLh);
    // First write the bold label
    doc.setFont("helvetica", "bold");
    doc.text(`${group.group}:`, MARGIN_X, y);
    // Then the items in normal weight, wrapped
    doc.setFont("helvetica", "normal");
    const itemsText = group.items.join(", ");
    const itemLines = doc.splitTextToSize(itemsText, MAX_W - labelW);
    doc.text(itemLines[0] ?? "", MARGIN_X + labelW, y);
    y += blockLh;
    for (let i = 1; i < itemLines.length; i++) {
      ensureSpace(blockLh);
      doc.text(itemLines[i], MARGIN_X, y);
      y += blockLh;
    }
    y += 0.6;
  }

  // ---------- EXPERIENCE ----------
  sectionHeading("Professional Experience");
  for (const exp of resumeData.experience) {
    ensureSpace(12);
    setFont(10.5, "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(exp.role, MARGIN_X, y);
    setFont(9.5);
    doc.setTextColor(90, 90, 90);
    const periodW = doc.getTextWidth(exp.period);
    doc.text(exp.period, PAGE_W - MARGIN_X - periodW, y);
    y += 4.6;

    setFont(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`${exp.company}  —  ${exp.location}`, MARGIN_X, y);
    y += 4.4;

    doc.setTextColor(40, 40, 40);
    for (const b of exp.bullets) bullet(b);
    y += 1.5;
  }

  // ---------- KEY PROJECTS ----------
  sectionHeading("Key Projects");
  for (const p of resumeData.projects) {
    ensureSpace(10);
    setFont(10.5, "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(p.name, MARGIN_X, y);
    y += 4.4;
    setFont(9.5);
    doc.setTextColor(90, 90, 90);
    const stackLines = doc.splitTextToSize(`Stack: ${p.stack}`, MAX_W);
    for (const sl of stackLines) {
      ensureSpace(4);
      doc.text(sl, MARGIN_X, y);
      y += 4;
    }
    doc.setTextColor(40, 40, 40);
    for (const b of p.bullets) bullet(b);
    y += 1.4;
  }

  // ---------- EDUCATION ----------
  sectionHeading("Education");
  for (const ed of resumeData.education) {
    ensureSpace(8);
    setFont(10, "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(ed.degree, MARGIN_X, y);
    y += 4.2;
    setFont(9.5);
    doc.setTextColor(80, 80, 80);
    const detail = ed.detail ? `${ed.institution}  —  ${ed.detail}` : ed.institution;
    doc.text(detail, MARGIN_X, y);
    y += 4.6;
  }

  // ---------- CERTIFICATIONS ----------
  sectionHeading("Certifications");
  for (const c of resumeData.certifications) bullet(c);

  // ---------- LANGUAGES ----------
  sectionHeading("Languages");
  setFont(10);
  doc.setTextColor(40, 40, 40);
  doc.text(resumeData.languages.join("  •  "), MARGIN_X, y);
  y += 6;

  return doc;
}

export function downloadResumePdf(filename = "Mirza_Aslam_Baig_Resume.pdf") {
  const doc = generateResumePdf();
  doc.save(filename);
}
