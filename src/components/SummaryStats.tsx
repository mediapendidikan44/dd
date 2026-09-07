import React, { useState } from 'react';
import {
  PieChart,
  Layers,
  Sparkles,
  HelpCircle,
  X,
  Calculator,
  ChevronRight,
} from 'lucide-react';
import { Question, DifficultyLevel } from '../types';

interface SummaryStatsProps {
  questions: Question[];
  activeDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({
  questions,
  activeDifficulty,
  onSelectDifficulty,
}) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const countByDifficulty: Record<DifficultyLevel, number> = {
    Mudah: questions.filter((q) => q.difficulty === 'Mudah').length,
    Sedang: questions.filter((q) => q.difficulty === 'Sedang').length,
    Sukar: questions.filter((q) => q.difficulty === 'Sukar').length,
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Distribusi Tingkat Kesukaran (Merata 1 : 1 : 1)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Total 30 butir soal pilihan ganda kurikulum kelas 6 SD dengan tingkat kesukaran berimbang sesuai standar asesmen nasional.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowFormulaModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors self-start md:self-auto"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Lihat Ringkasan Rumus</span>
        </button>
      </div>

      {/* Grid 3 Kartu Kesukaran */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {/* Mudah */}
        <button
          type="button"
          onClick={() =>
            onSelectDifficulty(activeDifficulty === 'Mudah' ? 'Semua' : 'Mudah')
          }
          className={`text-left p-3.5 rounded-xl border transition-all ${
            activeDifficulty === 'Mudah'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
              : 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Level 1: Mudah (C1 - C2)
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
              {countByDifficulty.Mudah} Soal (33.3%)
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2">
            Penerapan rumus dasar langsung (kubus, balok, tabung, kerucut, limas, konversi liter/m³).
          </p>
        </button>

        {/* Sedang */}
        <button
          type="button"
          onClick={() =>
            onSelectDifficulty(activeDifficulty === 'Sedang' ? 'Semua' : 'Sedang')
          }
          className={`text-left p-3.5 rounded-xl border transition-all ${
            activeDifficulty === 'Sedang'
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200'
              : 'bg-slate-50 hover:bg-blue-50/50 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Level 2: Sedang (C3)
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">
              {countByDifficulty.Sedang} Soal (33.3%)
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2">
            Mencari rusuk/tinggi jika volume diketahui, isi sebagian (3/4, 2/3), susunan balok & kubus.
          </p>
        </button>

        {/* Sukar */}
        <button
          type="button"
          onClick={() =>
            onSelectDifficulty(activeDifficulty === 'Sukar' ? 'Semua' : 'Sukar')
          }
          className={`text-left p-3.5 rounded-xl border transition-all ${
            activeDifficulty === 'Sukar'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
              : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Level 3: Sukar / HOTS (C4 - C5)
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
              {countByDifficulty.Sukar} Soal (33.3%)
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-full w-full rounded-full" />
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2">
            Bangun gabungan, debit pengisian, kenaikan air benda tenggelam, silinder pipa, ruang sisa.
          </p>
        </button>
      </div>

      {/* Modal Ringkasan Rumus Volume */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Ringkasan Rumus Volume Bangun Ruang Kelas 6 SD
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">1. Kubus</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = s × s × s = s³</div>
                  <div className="text-xs text-slate-600 mt-1">s = panjang rusuk kubus</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">2. Balok</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = p × l × t</div>
                  <div className="text-xs text-slate-600 mt-1">p = panjang, l = lebar, t = tinggi</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">3. Tabung (Silinder)</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = π × r² × t</div>
                  <div className="text-xs text-slate-600 mt-1">r = jari-jari, t = tinggi, π ≈ 22/7 atau 3,14</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">4. Prisma Segitiga</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = (1/2 × a × t_alas) × T</div>
                  <div className="text-xs text-slate-600 mt-1">Luas alas segitiga × tinggi prisma (T)</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">5. Limas Segiempat</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = 1/3 × Luas Alas × t</div>
                  <div className="text-xs text-slate-600 mt-1">Jika alas persegi: V = 1/3 × s² × t</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">6. Kerucut</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = 1/3 × π × r² × t</div>
                  <div className="text-xs text-slate-600 mt-1">Sepertiga dari volume tabung berukuran sama</div>
                </div>

                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="font-bold text-sm text-blue-900">7. Bola</div>
                  <div className="text-sm font-mono text-blue-700 mt-1 font-semibold">V = 4/3 × π × r³</div>
                  <div className="text-xs text-slate-600 mt-1">Setengah bola = 2/3 × π × r³</div>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="font-bold text-sm text-amber-900">8. Konversi Satuan Volume</div>
                  <div className="text-xs text-slate-700 mt-1 space-y-1">
                    <div>• 1 m³ = 1.000 dm³ = 1.000 liter</div>
                    <div>• 1 dm³ = 1 liter = 1.000 cm³ = 1.000 ml</div>
                    <div>• 1 cm³ = 1 cc = 1 ml</div>
                    <div>• Debit = Volume / Waktu</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
