import React from 'react';
import { Question, SchoolHeaderInfo } from '../types';

interface PrintViewProps {
  questions: Question[];
  headerInfo: SchoolHeaderInfo;
}

export const PrintView: React.FC<PrintViewProps> = ({ questions, headerInfo }) => {
  return (
    <div className="print-only p-8 max-w-4xl mx-auto text-black font-serif">
      {/* KOP UJIAN */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wider">{headerInfo.schoolName}</h1>
        <h2 className="text-lg font-bold uppercase">ASESMEN MATEMATIKA KELAS {headerInfo.grade}</h2>
        <h3 className="text-sm italic">
          MATERI: {headerInfo.topic.toUpperCase()} - TAHUN AJARAN {headerInfo.academicYear}
        </h3>

        <div className="grid grid-cols-2 text-xs text-left mt-4 pt-2 border-t border-black">
          <div>
            <p><strong>Mata Pelajaran:</strong> {headerInfo.subject}</p>
            <p><strong>Kelas / Semester:</strong> {headerInfo.grade} / {headerInfo.semester}</p>
          </div>
          <div>
            <p><strong>Waktu:</strong> {headerInfo.timeAllocation}</p>
            <p><strong>Nama Siswa:</strong> .....................................................</p>
          </div>
        </div>
      </div>

      {/* PETUNJUK */}
      <div className="mb-6 text-xs bg-slate-100 p-3 border border-slate-300">
        <p className="font-bold mb-1">PETUNJUK PENGERJAAN:</p>
        <ol className="list-decimal list-inside space-y-0.5">
          <li>Tuliskan nama lengkap pada kolom yang telah disediakan.</li>
          <li>Bacalah setiap soal dengan teliti dan pilih salah satu jawaban A, B, C, atau D.</li>
          <li>Kerjakan secara teliti dan periksa kembali sebelum dikumpulkan.</li>
        </ol>
      </div>

      {/* 30 SOAL */}
      <h4 className="font-bold text-sm mb-4">SOAL PILIHAN GANDA (30 BUTIR):</h4>
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-item text-xs">
            <p className="font-bold mb-1.5 leading-relaxed">
              {idx + 1}. {q.questionText}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 ml-4">
              {q.options.map((opt) => (
                <div key={opt.key}>
                  <span className="font-bold">{opt.key}.</span> {opt.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* KUNCI & PEMBAHASAN LEMBAR PENDIDIK */}
      <div className="page-break pt-8">
        <div className="text-center border-b border-black pb-2 mb-4">
          <h2 className="text-base font-bold uppercase">KUNCI JAWABAN & PEMBAHASAN LENGKAP</h2>
          <p className="text-xs italic">Materi: Volume Bangun Ruang Kelas 6 SD (30 Soal)</p>
        </div>

        {/* Tabel Kunci */}
        <table className="w-full text-xs border border-black border-collapse mb-6 text-center">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-1">No</th>
              <th className="border border-black p-1">Kunci</th>
              <th className="border border-black p-1">Tingkat</th>
              <th className="border border-black p-1">No</th>
              <th className="border border-black p-1">Kunci</th>
              <th className="border border-black p-1">Tingkat</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, i) => {
              const q1 = questions[i];
              const q2 = questions[i + 15];
              return (
                <tr key={i}>
                  <td className="border border-black p-1">{q1.id}</td>
                  <td className="border border-black p-1 font-bold">{q1.correctAnswer}</td>
                  <td className="border border-black p-1">{q1.difficulty}</td>
                  <td className="border border-black p-1">{q2.id}</td>
                  <td className="border border-black p-1 font-bold">{q2.correctAnswer}</td>
                  <td className="border border-black p-1">{q2.difficulty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Detail Pembahasan */}
        <h4 className="font-bold text-xs mb-2">RINGKASAN PEMBAHASAN SETIAP NOMOR:</h4>
        <div className="space-y-3 text-xs">
          {questions.map((q) => (
            <div key={q.id} className="border-b border-slate-300 pb-2">
              <p className="font-bold">
                {q.id}. Kunci: {q.correctAnswer} ({q.difficulty} - {q.category})
              </p>
              <p className="italic text-slate-700">Rumus: {q.formula}</p>
              <p>Diketahui: {q.explanation.diketahui.join(', ')}</p>
              <p>Langkah: {q.explanation.langkah.join(' -> ')}</p>
              <p className="font-semibold text-slate-800">{q.explanation.kesimpulan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
