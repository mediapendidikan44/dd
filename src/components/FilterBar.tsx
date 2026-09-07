import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Eye,
  EyeOff,
  GraduationCap,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import { ShapeCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  viewMode: 'review' | 'student';
  onViewModeChange: (mode: 'review' | 'student') => void;
  expandAllExplanations: boolean;
  onToggleExpandAll: () => void;
  totalFiltered: number;
  totalAll: number;
  onReset: () => void;
}

const CATEGORIES: (ShapeCategory | 'Semua')[] = [
  'Semua',
  'Kubus',
  'Balok',
  'Tabung',
  'Prisma Segitiga',
  'Limas Segiempat',
  'Kerucut',
  'Bola',
  'Gabungan & Kontekstual',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  expandAllExplanations,
  onToggleExpandAll,
  totalFiltered,
  totalAll,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5 mb-6">
      {/* Top row: Mode Switcher & Expand/Collapse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg self-start">
          <button
            id="tab-mode-review"
            type="button"
            onClick={() => onViewModeChange('review')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'review'
                ? 'bg-white text-[#1E293B] shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Mode Guru / Telaah</span>
          </button>
          <button
            id="tab-mode-student"
            type="button"
            onClick={() => onViewModeChange('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'student'
                ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mode Latihan Siswa</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'review' && (
            <button
              id="btn-toggle-all-explanations"
              type="button"
              onClick={onToggleExpandAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors"
            >
              {expandAllExplanations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Sembunyikan Semua Kunci</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Buka Semua Pembahasan</span>
                </>
              )}
            </button>
          )}

          {(selectedDifficulty !== 'Semua' ||
            selectedCategory !== 'Semua' ||
            searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Reset semua filter"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Middle row: Search & Difficulty Pills */}
      <div className="flex flex-col md:flex-row md:items-center gap-2.5">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-soal"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nomor, rumus, kata kunci soal (contoh: kubus, bola, liter)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#3B82F6] transition-all text-[#1E293B] placeholder-[#94A3B8]"
          />
        </div>

        {/* Difficulty filter buttons */}
        <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-[#94A3B8] font-medium mr-1 hidden sm:inline">
            Tingkat:
          </span>
          {['Semua', 'Mudah', 'Sedang', 'Sukar'].map((diff) => {
            const isActive = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                type="button"
                onClick={() => onDifficultyChange(diff)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? diff === 'Mudah'
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : diff === 'Sedang'
                      ? 'bg-amber-500 text-white font-semibold shadow-xs'
                      : diff === 'Sukar'
                      ? 'bg-rose-500 text-white font-semibold shadow-xs'
                      : 'bg-[#1E293B] text-white font-semibold shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9]'
                }`}
              >
                {diff === 'Semua' ? 'Semua Tingkat' : diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Category filter scrollable pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5 pb-1 scrollbar-thin">
        <span className="text-xs text-[#94A3B8] font-medium mr-1 shrink-0 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          Bangun:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 text-xs rounded-md shrink-0 transition-colors ${
                isActive
                  ? 'bg-[#EFF6FF] text-[#1E40AF] font-semibold border border-[#BFDBFE]'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Status Filter Count */}
      <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1">
        <span>
          Menampilkan <strong className="text-[#1E293B]">{totalFiltered}</strong> dari <strong className="text-[#1E293B]">{totalAll}</strong> butir soal
        </span>
        {totalFiltered < totalAll && (
          <span className="text-amber-600 font-medium">
            (Filter sedang aktif)
          </span>
        )}
      </div>
    </div>
  );
};
