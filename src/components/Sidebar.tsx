import React, { useState } from 'react';
import { SchoolHeaderInfo, Question, DifficultyLevel } from '../types';
import { Calculator, X, Settings } from 'lucide-react';

interface SidebarProps {
  headerInfo: SchoolHeaderInfo;
  questions: Question[];
  activeDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  headerInfo,
  questions,
  activeDifficulty,
  onSelectDifficulty,
  onOpenSettings,
}) => {
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const countByDifficulty: Record<DifficultyLevel, number> = {
    Mudah: questions.filter((q) => q.difficulty === 'Mudah').length,
    Sedang: questions.filter((q) => q.difficulty === 'Sedang').length,
    Sukar: questions.filter((q) => q.difficulty === 'Sukar').length,
  };

  return (
    <aside className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-[#E2E8F0] p-5 sm:p-6 space-y-6 shrink-0 lg:overflow-y-auto">
      {/* Configuration Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Configuration
          </h3>
          <button
            type="button"
            onClick={onOpenSettings}
            className="text-[11px] font-medium text-[#3B82F6] hover:text-[#1E40AF] transition-colors inline-flex items-center gap-1"
          >
            <Settings className="w-3 h-3" />
            <span>Edit Kop</span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">
              Topic
            </label>
            <div className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs sm:text-sm text-[#1E293B] font-medium">
              {headerInfo.topic}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">
              Level & Satuan
            </label>
            <div className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs sm:text-sm text-[#1E293B]">
              Kelas {headerInfo.grade} • {headerInfo.schoolName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Total Questions
              </label>
              <div className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs sm:text-sm text-[#1E293B] font-mono font-medium">
                {questions.length} Soal
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Alokasi Waktu
              </label>
              <div className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs sm:text-sm text-[#1E293B]">
                {headerInfo.timeAllocation}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Balance Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Difficulty Balance
          </h3>
          {activeDifficulty !== 'Semua' && (
            <button
              type="button"
              onClick={() => onSelectDifficulty('Semua')}
              className="text-[11px] text-[#3B82F6] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Mudah */}
          <div
            onClick={() =>
              onSelectDifficulty(activeDifficulty === 'Mudah' ? 'Semua' : 'Mudah')
            }
            className={`cursor-pointer p-2 rounded-lg transition-all ${
              activeDifficulty === 'Mudah'
                ? 'bg-[#F1F5F9] ring-1 ring-[#3B82F6]'
                : 'hover:bg-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#1E293B] mb-1.5">
              <span className="font-medium">Mudah (Easy)</span>
              <span className="font-mono text-[#64748B]">
                {countByDifficulty.Mudah} Soal (33%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full" />
            </div>
          </div>

          {/* Sedang */}
          <div
            onClick={() =>
              onSelectDifficulty(activeDifficulty === 'Sedang' ? 'Semua' : 'Sedang')
            }
            className={`cursor-pointer p-2 rounded-lg transition-all ${
              activeDifficulty === 'Sedang'
                ? 'bg-[#F1F5F9] ring-1 ring-[#3B82F6]'
                : 'hover:bg-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#1E293B] mb-1.5">
              <span className="font-medium">Sedang (Medium)</span>
              <span className="font-mono text-[#64748B]">
                {countByDifficulty.Sedang} Soal (33%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-full" />
            </div>
          </div>

          {/* Sukar */}
          <div
            onClick={() =>
              onSelectDifficulty(activeDifficulty === 'Sukar' ? 'Semua' : 'Sukar')
            }
            className={`cursor-pointer p-2 rounded-lg transition-all ${
              activeDifficulty === 'Sukar'
                ? 'bg-[#F1F5F9] ring-1 ring-[#3B82F6]'
                : 'hover:bg-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#1E293B] mb-1.5">
              <span className="font-medium">Sukar (Hard / HOTS)</span>
              <span className="font-mono text-[#64748B]">
                {countByDifficulty.Sukar} Soal (33%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Note Callout */}
      <div className="p-4 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
        <p className="text-xs leading-relaxed text-[#1E40AF]">
          <strong>Note:</strong> 30 soal telah digenerate secara otomatis dengan distribusi kurikulum Merdeka & K13 dengan proporsi tingkat kesulitan merata.
        </p>
      </div>

      {/* Rumus Quick View Button */}
      <div>
        <button
          type="button"
          onClick={() => setShowFormulaModal(true)}
          className="w-full py-2.5 px-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#1E293B] flex items-center justify-center gap-2 transition-colors"
        >
          <Calculator className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Lihat Ringkasan Rumus Volume</span>
        </button>
      </div>

      {/* Modal Ringkasan Rumus Volume */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="text-sm sm:text-base font-semibold text-[#1E293B]">
                  Rumus Volume Bangun Ruang Kelas 6 SD
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFormulaModal(false)}
                className="text-[#94A3B8] hover:text-[#1E293B] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">1. Kubus</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = s³</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">s = panjang rusuk kubus</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">2. Balok</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = p × l × t</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">p = panjang, l = lebar, t = tinggi</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">3. Tabung (Silinder)</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = π × r² × t</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">r = jari-jari alas, t = tinggi</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">4. Prisma Segitiga</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = (1/2 × a × t) × T</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Luas alas segitiga × tinggi prisma</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">5. Limas Segiempat</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = 1/3 × Luas Alas × t</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Alas persegi: 1/3 × s² × t</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">6. Kerucut</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = 1/3 × π × r² × t</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">1/3 dari volume tabung</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">7. Bola</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 font-bold">V = 4/3 × π × r³</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Setengah bola = 2/3 × π × r³</div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <div className="font-semibold text-xs text-[#1E293B]">8. Konversi Satuan</div>
                  <div className="text-[11px] text-[#64748B] mt-1 space-y-0.5">
                    <div>• 1 m³ = 1.000 liter = 1.000 dm³</div>
                    <div>• 1 dm³ = 1 liter = 1.000 cm³</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end">
              <button
                type="button"
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-1.5 text-xs font-medium text-[#1E293B] bg-white border border-[#E2E8F0] rounded-lg hover:bg-[#F1F5F9] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
