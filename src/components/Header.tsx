import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Settings,
  CheckCircle2,
  Copy,
  ChevronDown,
} from 'lucide-react';
import { SchoolHeaderInfo } from '../types';

interface HeaderProps {
  headerInfo: SchoolHeaderInfo;
  onOpenSettings: () => void;
  onExportDocx: (mode: 'full' | 'soal_only' | 'kunci_only') => void;
  onExportDoc: (mode: 'full' | 'soal_only' | 'kunci_only') => void;
  onPrint: () => void;
  onCopyAllText: () => void;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  headerInfo,
  onOpenSettings,
  onExportDocx,
  onExportDoc,
  onPrint,
  onCopyAllText,
  isCopied,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Brand & Left Info */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
          Σ
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-base sm:text-lg tracking-tight text-[#1E293B]">
            MathGen Studio
          </span>
          <span className="hidden sm:inline-block text-xs text-[#94A3B8]">/</span>
          <span className="hidden sm:inline-block text-xs font-medium text-[#64748B]">
            Volume Bangun Ruang Kelas 6
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] rounded-full text-xs font-medium text-[#64748B]">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>30 Soal Siap Unduh</span>
        </div>

        {/* Copy All */}
        <button
          id="btn-copy-all"
          type="button"
          onClick={onCopyAllText}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors"
          title="Salin Seluruh Teks Soal & Pembahasan"
        >
          {isCopied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Salin Teks</span>
            </>
          )}
        </button>

        {/* Kop Setting */}
        <button
          id="btn-edit-kop"
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors"
          title="Pengaturan Kop Sekolah & Dokumen"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kop Dokumen</span>
        </button>

        {/* Print Button */}
        <button
          id="btn-print-view"
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors"
          title="Cetak atau Simpan PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cetak</span>
        </button>

        {/* Minimalist Dark Download Action Button with Dropdown */}
        <div className="relative">
          <button
            id="btn-download-dropdown"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-2 bg-[#1E293B] text-white px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-black transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Download .DOCX</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-50">
                <div className="px-3.5 py-1.5 border-b border-[#E2E8F0]">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Format Dokumen Word
                  </p>
                </div>

                <div className="p-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      onExportDocx('full');
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F1F5F9] text-[#1E293B] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Lengkap (Soal + Kunci + Solusi)</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] px-1.5 py-0.5 rounded">
                      .docx
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onExportDocx('soal_only');
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F1F5F9] text-[#1E293B] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Lembar Soal Siswa (Ujian)</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded">
                      .docx
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onExportDocx('kunci_only');
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F1F5F9] text-[#1E293B] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kunci & Pembahasan Saja</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#F1F5F9] text-[#64748B] px-1.5 py-0.5 rounded">
                      .docx
                    </span>
                  </button>
                </div>

                <div className="my-1 border-t border-[#E2E8F0] px-3.5 py-1">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Format Alternatif Legacy
                  </p>
                </div>

                <div className="p-1">
                  <button
                    type="button"
                    onClick={() => {
                      onExportDoc('full');
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#FEF3C7] text-[#92400E] rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-amber-600" />
                      <span>Unduh File .doc Standar</span>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                      .doc
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
