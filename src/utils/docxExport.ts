import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  PageBreak,
} from 'docx';
import saveAs from 'file-saver';
import { Question, SchoolHeaderInfo } from '../types';

export type ExportMode = 'full' | 'soal_only' | 'kunci_only';

export async function exportToDocx(
  questions: Question[],
  headerInfo: SchoolHeaderInfo,
  mode: ExportMode = 'full'
) {
  const children: (Paragraph | Table)[] = [];

  // 1. KOP SURAT / DOKUMEN UJIAN
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: headerInfo.schoolName.toUpperCase(),
          bold: true,
          size: 28, // 14pt
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `ASESMEN MATEMATIKA KELAS ${headerInfo.grade.toUpperCase()}`,
          bold: true,
          size: 24, // 12pt
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: `MATERI: ${headerInfo.topic.toUpperCase()} - TAHUN AJARAN ${headerInfo.academicYear}`,
          italics: true,
          size: 20, // 10pt
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Tabel Identitas Ujian
  const borderNone = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: borderNone,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: borderNone,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Mata Pelajaran : ', bold: true, font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: headerInfo.subject, font: 'Times New Roman', size: 20 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Kelas / Semester: ', bold: true, font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: `${headerInfo.grade} / ${headerInfo.semester}`, font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: borderNone,
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Waktu Pengerjaan : ', bold: true, font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: headerInfo.timeAllocation, font: 'Times New Roman', size: 20 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Nama Siswa      : .......................................', font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  children.push(headerTable);

  // Garis pemisah kop
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 180 },
      border: {
        bottom: { color: '000000', size: 12, style: BorderStyle.SINGLE },
      },
      children: [],
    })
  );

  // Petunjuk Umum
  if (mode !== 'kunci_only') {
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: 'PETUNJUK PENGERJAAN:',
            bold: true,
            font: 'Times New Roman',
            size: 20,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 60 },
        bullet: { level: 0 },
        children: [
          new TextRun({
            text: 'Tuliskan nama lengkap Anda pada kolom yang telah disediakan.',
            font: 'Times New Roman',
            size: 20,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 60 },
        bullet: { level: 0 },
        children: [
          new TextRun({
            text: 'Bacalah setiap soal dengan teliti dan cermat sebelum menjawab.',
            font: 'Times New Roman',
            size: 20,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 180 },
        bullet: { level: 0 },
        children: [
          new TextRun({
            text: 'Pilihlah salah satu jawaban A, B, C, atau D yang paling benar.',
            font: 'Times New Roman',
            size: 20,
          }),
        ],
      })
    );
  }

  // Bagian Soal
  if (mode === 'full' || mode === 'soal_only') {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 180 },
        children: [
          new TextRun({
            text: 'SOAL PILIHAN GANDA (30 BUTIR)',
            bold: true,
            font: 'Times New Roman',
            size: 24,
          }),
        ],
      })
    );

    questions.forEach((q, index) => {
      // Teks Soal
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: `${index + 1}. `,
              bold: true,
              font: 'Times New Roman',
              size: 22,
            }),
            new TextRun({
              text: q.questionText,
              font: 'Times New Roman',
              size: 22,
            }),
            new TextRun({
              text: `  [Tingkat: ${q.difficulty} - ${q.category}]`,
              italics: true,
              size: 18,
              color: '555555',
              font: 'Times New Roman',
            }),
          ],
        })
      );

      // Pilihan Jawaban A, B, C, D
      q.options.forEach((opt) => {
        children.push(
          new Paragraph({
            indent: { left: 400 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `${opt.key}.  `,
                bold: true,
                font: 'Times New Roman',
                size: 21,
              }),
              new TextRun({
                text: opt.text,
                font: 'Times New Roman',
                size: 21,
              }),
            ],
          })
        );
      });
    });
  }

  // Bagian Kunci Jawaban & Pembahasan Lengkap
  if (mode === 'full' || mode === 'kunci_only') {
    if (mode === 'full') {
      // Halaman baru untuk kunci & pembahasan
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 180, after: 80 },
        children: [
          new TextRun({
            text: 'KUNCI JAWABAN & PEMBAHASAN LENGKAP',
            bold: true,
            size: 26,
            font: 'Times New Roman',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `MATEMATIKA KELAS VI - MATERI VOLUME BANGUN RUANG (30 SOAL)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );

    // Tabel Ringkasan Kunci Jawaban (5 kolom x 6 baris)
    const tableRows: TableRow[] = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'No.', bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Kunci', bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tingkat', bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'No.', bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Kunci', bold: true })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tingkat', bold: true })] })] }),
        ],
      }),
    ];

    for (let i = 0; i < 15; i++) {
      const q1 = questions[i];
      const q2 = questions[i + 15];
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: `${q1.id}` })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q1.correctAnswer, bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ text: q1.difficulty })] }),
            new TableCell({ children: [new Paragraph({ text: `${q2.id}` })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q2.correctAnswer, bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ text: q2.difficulty })] }),
          ],
        })
      );
    }

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: tableRows,
      })
    );

    children.push(
      new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: 'PEMBAHASAN DETAIL LANGKAH PENGERJAAN:',
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );

    questions.forEach((q) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: `Soal Nomor ${q.id} (Kunci: ${q.correctAnswer}) - [${q.difficulty} | ${q.category}]`,
              bold: true,
              color: '1E3A8A',
              size: 20,
              font: 'Times New Roman',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: 'Rumus: ', bold: true, font: 'Times New Roman', size: 19 }),
            new TextRun({ text: q.formula, italics: true, font: 'Times New Roman', size: 19 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: 'Diketahui: ', bold: true, font: 'Times New Roman', size: 19 }),
            new TextRun({ text: q.explanation.diketahui.join(', '), font: 'Times New Roman', size: 19 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: 'Ditanya: ', bold: true, font: 'Times New Roman', size: 19 }),
            new TextRun({ text: q.explanation.ditanya, font: 'Times New Roman', size: 19 }),
          ],
        })
      );

      // Langkah-langkah
      q.explanation.langkah.forEach((step) => {
        children.push(
          new Paragraph({
            indent: { left: 300 },
            spacing: { after: 20 },
            children: [
              new TextRun({ text: '•  ' + step, font: 'Times New Roman', size: 19 }),
            ],
          })
        );
      });

      // Kesimpulan
      children.push(
        new Paragraph({
          spacing: { before: 20, after: 100 },
          children: [
            new TextRun({ text: q.explanation.kesimpulan, bold: true, font: 'Times New Roman', size: 19 }),
          ],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName =
    mode === 'soal_only'
      ? 'Soal_Volume_Bangun_Ruang_Kelas_6_Siswa.docx'
      : mode === 'kunci_only'
      ? 'Kunci_dan_Pembahasan_Volume_Bangun_Ruang_Kelas_6.docx'
      : 'Soal_dan_Pembahasan_Volume_Bangun_Ruang_Kelas_6_Lengkap.docx';

  saveAs(blob, fileName);
}

/**
 * Export ke format .doc (Word HTML XML Blob)
 * Ini memastikan 100% kompatibilitas instan jika pengguna meminta format khusus file .doc
 */
export function exportToLegacyDoc(
  questions: Question[],
  headerInfo: SchoolHeaderInfo,
  mode: ExportMode = 'full'
) {
  let contentHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Soal Matematika Kelas 6</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; color: #000; }
        h1 { font-size: 14pt; text-align: center; margin: 2px 0; text-transform: uppercase; font-weight: bold; }
        h2 { font-size: 12pt; text-align: center; margin: 2px 0; font-weight: bold; }
        h3 { font-size: 11pt; text-align: center; margin: 2px 0; font-style: italic; }
        .divider { border-bottom: 2px solid #000; margin: 10px 0 15px 0; }
        table.meta { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        table.meta td { padding: 3px 6px; font-size: 11pt; vertical-align: top; }
        .instructions { background: #f4f4f4; padding: 8px 12px; margin-bottom: 15px; border-left: 3px solid #333; }
        .question-block { margin-bottom: 14px; page-break-inside: avoid; }
        .question-text { font-weight: bold; margin-bottom: 4px; }
        .options { margin-left: 20px; }
        .option { margin-bottom: 3px; }
        .badge { font-size: 9pt; color: #555; font-style: italic; }
        .page-break { page-break-before: always; }
        table.key-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
        table.key-table th, table.key-table td { border: 1px solid #000; padding: 5px 8px; text-align: center; font-size: 10pt; }
        .pembahasan-item { margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 8px; }
      </style>
    </head>
    <body>
      <h1>${headerInfo.schoolName}</h1>
      <h2>ASESMEN MATEMATIKA KELAS ${headerInfo.grade.toUpperCase()}</h2>
      <h3>MATERI: ${headerInfo.topic.toUpperCase()} - TAHUN AJARAN ${headerInfo.academicYear}</h3>
      <div class="divider"></div>

      <table class="meta">
        <tr>
          <td style="width: 55%;">
            <strong>Mata Pelajaran:</strong> ${headerInfo.subject}<br>
            <strong>Kelas / Semester:</strong> ${headerInfo.grade} / ${headerInfo.semester}
          </td>
          <td style="width: 45%;">
            <strong>Alokasi Waktu:</strong> ${headerInfo.timeAllocation}<br>
            <strong>Nama Siswa:</strong> ....................................................
          </td>
        </tr>
      </table>
  `;

  if (mode !== 'kunci_only') {
    contentHtml += `
      <div class="instructions">
        <strong>PETUNJUK PENGERJAAN:</strong>
        <ol style="margin: 4px 0 4px 20px; padding: 0;">
          <li>Tuliskan nama lengkap Anda pada kolom yang telah disediakan.</li>
          <li>Bacalah setiap soal dengan teliti dan cermat sebelum menjawab.</li>
          <li>Pilihlah salah satu jawaban A, B, C, atau D yang paling tepat!</li>
        </ol>
      </div>

      <h3 style="text-align: left; font-style: normal; font-weight: bold; margin-top: 15px;">I. SOAL PILIHAN GANDA (30 BUTIR)</h3>
    `;

    questions.forEach((q, idx) => {
      contentHtml += `
        <div class="question-block">
          <div class="question-text">${idx + 1}. ${q.questionText} <span class="badge">[Tingkat: ${q.difficulty} - ${q.category}]</span></div>
          <div class="options">
            ${q.options
              .map(
                (opt) =>
                  `<div class="option"><strong>${opt.key}.</strong> ${opt.text}</div>`
              )
              .join('')}
          </div>
        </div>
      `;
    });
  }

  if (mode === 'full' || mode === 'kunci_only') {
    if (mode === 'full') {
      contentHtml += `<div class="page-break"></div>`;
    }

    contentHtml += `
      <h2 style="margin-top: 20px;">KUNCI JAWABAN & PEMBAHASAN LENGKAP</h2>
      <h3>MATERI VOLUME BANGUN RUANG - KELAS 6</h3>

      <h4 style="margin-top: 15px; margin-bottom: 5px;">TABEL KUNCI JAWABAN:</h4>
      <table class="key-table">
        <tr style="background-color: #eaeaea;">
          <th>No</th><th>Kunci</th><th>Tingkat</th>
          <th>No</th><th>Kunci</th><th>Tingkat</th>
        </tr>
    `;

    for (let i = 0; i < 15; i++) {
      const q1 = questions[i];
      const q2 = questions[i + 15];
      contentHtml += `
        <tr>
          <td>${q1.id}</td><td><strong>${q1.correctAnswer}</strong></td><td>${q1.difficulty}</td>
          <td>${q2.id}</td><td><strong>${q2.correctAnswer}</strong></td><td>${q2.difficulty}</td>
        </tr>
      `;
    }

    contentHtml += `</table>`;

    contentHtml += `<h4 style="margin-top: 20px; margin-bottom: 10px;">PEMBAHASAN LANGKAH PENGERJAAN:</h4>`;

    questions.forEach((q) => {
      contentHtml += `
        <div class="pembahasan-item">
          <div><strong>Nomor ${q.id} (Kunci: ${q.correctAnswer}) - [${q.difficulty} | ${q.category}]</strong></div>
          <div><em>Rumus:</em> ${q.formula}</div>
          <div><em>Diketahui:</em> ${q.explanation.diketahui.join(', ')}</div>
          <div><em>Ditanya:</em> ${q.explanation.ditanya}</div>
          <div style="margin-top: 4px;">
            <strong>Langkah:</strong>
            <ul style="margin: 2px 0 4px 20px; padding: 0;">
              ${q.explanation.langkah.map((s) => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <div><strong>Kesimpulan:</strong> ${q.explanation.kesimpulan}</div>
        </div>
      `;
    });
  }

  contentHtml += `
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', contentHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const fileName =
    mode === 'soal_only'
      ? 'Soal_Volume_Bangun_Ruang_Kelas_6_Siswa.doc'
      : mode === 'kunci_only'
      ? 'Kunci_dan_Pembahasan_Volume_Bangun_Ruang_Kelas_6.doc'
      : 'Soal_dan_Pembahasan_Volume_Bangun_Ruang_Kelas_6_Lengkap.doc';

  saveAs(blob, fileName);
}
