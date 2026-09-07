import React from 'react';
import { Award, RotateCcw } from 'lucide-react';
import { Question } from '../types';

interface StudentScoreBannerProps {
  questions: Question[];
  studentAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onResetAnswers: () => void;
}

export const StudentScoreBanner: React.FC<StudentScoreBannerProps> = ({
  questions,
  studentAnswers,
  onResetAnswers,
}) => {
  const totalQuestions = questions.length;
  const answeredIds = Object.keys(studentAnswers).map(Number);
  const totalAnswered = answeredIds.length;

  let correctCount = 0;
  answeredIds.forEach((id) => {
    const q = questions.find((item) => item.id === id);
    if (q && studentAnswers[id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const scorePercentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#1E293B] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
          <Award className="w-5 h-5 text-[#3B82F6]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#1E293B]">Mode Latihan Mandiri</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EFF6FF] text-[#1E40AF]">
              Interaktif
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Pilih opsi jawaban untuk melihat evaluasi instan dan pembahasan langkah.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap self-end sm:self-auto">
        <div className="flex items-center gap-3 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
          <div className="text-center">
            <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
              Terjawab
            </span>
            <span className="text-xs font-semibold text-[#1E293B]">
              {totalAnswered}/{totalQuestions}
            </span>
          </div>

          <div className="w-px h-5 bg-[#E2E8F0]" />

          <div className="text-center">
            <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
              Benar
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {correctCount}
            </span>
          </div>

          <div className="w-px h-5 bg-[#E2E8F0]" />

          <div className="text-center">
            <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
              Skor
            </span>
            <span className="text-xs font-bold text-[#1E293B]">
              {scorePercentage}
            </span>
          </div>
        </div>

        {totalAnswered > 0 && (
          <button
            type="button"
            onClick={onResetAnswers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Ulangi</span>
          </button>
        )}
      </div>
    </div>
  );
};
