import React, { useState } from 'react';
import {
  X,
  School,
  Download,
  RotateCcw,
} from 'lucide-react';
import { SchoolHeaderInfo } from '../types';
import { defaultSchoolHeader } from '../data/soalData';

interface DocxSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerInfo: SchoolHeaderInfo;
  onSaveHeaderInfo: (info: SchoolHeaderInfo) => void;
  onExportDocx: (mode: 'full' | 'soal_only' | 'kunci_only') => void;
  onExportDoc: (mode: 'full' | 'soal_only' | 'kunci_only') => void;
}

export const DocxSettingsModal: React.FC<DocxSettingsModalProps> = ({
  isOpen,
  onClose,
  headerInfo,
  onSaveHeaderInfo,
  onExportDocx,
  onExportDoc,
}) => {
  const [formState, setFormState] = useState<SchoolHeaderInfo>(headerInfo);
  const [exportMode, setExportMode] = useState<'full' | 'soal_only' | 'kunci_only'>('full');

  if (!isOpen) return null;

  const handleChange = (field: keyof SchoolHeaderInfo, val: string) => {
    setFormState((prev) => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setFormState(defaultSchoolHeader);
    onSaveHeaderInfo(defaultSchoolHeader);
  };

  const handleDownloadDocx = () => {
    onSaveHeaderInfo(formState);
    onExportDocx(exportMode);
    onClose();
  };

  const handleDownloadDoc = () => {
    onSaveHeaderInfo(formState);
    onExportDoc(exportMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#F1F5F9] text-[#1E293B] border border-[#E2E8F0] flex items-center justify-center">
              <School className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1E293B]">
                Pengaturan Kop Dokumen Word
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Atur identitas lembar soal sebelum diunduh (.docx / .doc)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#1E293B] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-[#64748B] mb-1">
              Nama Satuan Pendidikan / Sekolah
            </label>
            <input
              type="text"
              value={formState.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
              placeholder="Contoh: SD NEGERI NUSANTARA"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#64748B] mb-1">
                Mata Pelajaran
              </label>
              <input
                type="text"
                value={formState.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#64748B] mb-1">
                Kelas / Semester
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formState.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
                  placeholder="VI (Enam)"
                />
                <input
                  type="text"
                  value={formState.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
                  placeholder="Genap"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#64748B] mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={formState.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
                placeholder="2024 / 2025"
              />
            </div>

            <div>
              <label className="block font-medium text-[#64748B] mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={formState.timeAllocation}
                onChange={(e) => handleChange('timeAllocation', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
                placeholder="90 Menit"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#64748B] mb-1">
              Topik / Materi Pokok
            </label>
            <input
              type="text"
              value={formState.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#3B82F6] text-[#1E293B]"
              placeholder="Volume Bangun Ruang"
            />
          </div>

          {/* Opsi Konten Yang Diunduh */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
              Pilihan Konten Dokumen
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setExportMode('full')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  exportMode === 'full'
                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#1E40AF] font-medium'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                <div className="text-xs font-semibold">Lengkap</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Soal + Kunci + Solusi</div>
              </button>

              <button
                type="button"
                onClick={() => setExportMode('soal_only')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  exportMode === 'soal_only'
                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#1E40AF] font-medium'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                <div className="text-xs font-semibold">Lembar Soal</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Tanpa kunci jawaban</div>
              </button>

              <button
                type="button"
                onClick={() => setExportMode('kunci_only')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  exportMode === 'kunci_only'
                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#1E40AF] font-medium'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                <div className="text-xs font-semibold">Kunci Saja</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">Pegangan guru</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="px-6 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Standar</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadDoc}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#92400E] bg-[#FEF3C7] hover:bg-[#FDE68A] rounded-md transition-colors"
              title="Unduh format .doc"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh .doc</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadDocx}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#1E293B] hover:bg-black rounded-md transition-colors"
              title="Unduh format .docx"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh .docx</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
