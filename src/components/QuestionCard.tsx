import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  viewMode: 'review' | 'student';
  isExplanationExpanded: boolean;
  selectedStudentAnswer?: 'A' | 'B' | 'C' | 'D';
  onSelectStudentAnswer?: (questionId: number, answer: 'A' | 'B' | 'C' | 'D') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  viewMode,
  isExplanationExpanded,
  selectedStudentAnswer,
  onSelectStudentAnswer,
}) => {
  const [localExpanded, setLocalExpanded] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  // If localExpanded is set, use it; otherwise follow global expand state
  const isExpanded = localExpanded !== null ? localExpanded : isExplanationExpanded;

  const handleCopy = () => {
    const text = `No. ${question.id}\n${question.questionText}\n\n` +
      question.options.map((o) => `${o.key}. ${o.text}`).join('\n') +
      `\n\nKunci Jawaban: ${question.correctAnswer}\nPembahasan:\n` +
      `• Rumus: ${question.formula}\n` +
      `• Diketahui: ${question.explanation.diketahui.join(', ')}\n` +
      `• Ditanya: ${question.explanation.ditanya}\n` +
      `• Langkah:\n${question.explanation.langkah.map((l) => '  - ' + l).join('\n')}\n` +
      `• Kesimpulan: ${question.explanation.kesimpulan}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyStyles = {
    Mudah: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Sedang: 'bg-amber-50 text-amber-700 border-amber-200',
    Sukar: 'bg-rose-50 text-rose-700 border-rose-200',
  }[question.difficulty];

  const hasAnswered = selectedStudentAnswer !== undefined;
  const isCorrect = selectedStudentAnswer === question.correctAnswer;

  return (
    <article
      id={`soal-card-${question.id}`}
      className="bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all overflow-hidden"
    >
      {/* Header Soal */}
      <div className="px-4 sm:px-5 py-3 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2.5 bg-[#F8FAFC]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-6 h-6 rounded bg-[#1E293B] text-white flex items-center justify-center font-mono font-bold text-xs">
            {question.id}
          </span>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${difficultyStyles}`}
          >
            {question.difficulty}
          </span>

          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
            {question.category}
          </span>

          {viewMode === 'student' && hasAnswered && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Benar
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3 text-rose-700" />
                  Kunci: {question.correctAnswer}
                </>
              )}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            title="Salin soal ini"
            className="p-1 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Konten Soal */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Teks Soal */}
        <p className="text-sm sm:text-base font-normal text-[#1E293B] leading-relaxed">
          {question.questionText}
        </p>

        {/* Pilihan Jawaban */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {question.options.map((opt) => {
            const isOptionSelected = selectedStudentAnswer === opt.key;
            const isOptionCorrect = opt.key === question.correctAnswer;

            let optionStyle =
              'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] border-[#E2E8F0]';

            if (viewMode === 'review') {
              if (isOptionCorrect && isExpanded) {
                optionStyle =
                  'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE] font-medium';
              }
            } else if (viewMode === 'student') {
              if (hasAnswered) {
                if (isOptionCorrect) {
                  optionStyle =
                    'bg-emerald-50 text-emerald-900 border-emerald-300 font-medium';
                } else if (isOptionSelected && !isCorrect) {
                  optionStyle =
                    'bg-rose-50 text-rose-900 border-rose-200 line-through opacity-80';
                } else {
                  optionStyle = 'bg-[#F8FAFC] text-[#94A3B8] opacity-60 border-[#E2E8F0]';
                }
              } else if (isOptionSelected) {
                optionStyle =
                  'bg-[#EFF6FF] text-[#1E40AF] border-[#3B82F6] font-medium';
              }
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={viewMode === 'student' && hasAnswered}
                onClick={() =>
                  viewMode === 'student' &&
                  onSelectStudentAnswer &&
                  onSelectStudentAnswer(question.id, opt.key)
                }
                className={`flex items-start text-left p-2.5 rounded-lg border transition-all ${optionStyle} ${
                  viewMode === 'student' && !hasAnswered ? 'cursor-pointer hover:border-[#CBD5E1]' : ''
                }`}
              >
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 mr-2.5 mt-0.5 ${
                    isOptionCorrect && (isExpanded || (viewMode === 'student' && hasAnswered))
                      ? 'bg-emerald-600 text-white'
                      : isOptionSelected && viewMode === 'student' && !isCorrect && hasAnswered
                      ? 'bg-rose-600 text-white'
                      : 'bg-white border border-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-xs sm:text-sm leading-normal">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Toggle Pembahasan */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setLocalExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3B82F6] hover:text-[#1E40AF] transition-colors py-0.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {isExpanded ? 'Tutup Pembahasan' : 'Kunci & Langkah Penyelesaian'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Kotak Pembahasan Langkah Lengkap */}
        {isExpanded && (
          <div className="mt-2.5 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="font-semibold text-[#1E293B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                Kunci Jawaban: {question.correctAnswer}
              </span>
              <span className="font-mono text-[11px] bg-white border border-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded font-medium">
                Rumus: {question.formula}
              </span>
            </div>

            {/* Diketahui & Ditanya */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded border border-[#E2E8F0]">
              <div>
                <span className="font-medium text-[#64748B] block mb-0.5">Diketahui:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[#1E293B]">
                  {question.explanation.diketahui.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium text-[#64748B] block mb-0.5">Ditanya:</span>
                <p className="text-[#1E293B]">{question.explanation.ditanya}</p>
              </div>
            </div>

            {/* Langkah Penyelesaian */}
            <div>
              <span className="font-medium text-[#64748B] block mb-1 text-[11px]">
                Langkah Perhitungan:
              </span>
              <div className="space-y-1">
                {question.explanation.langkah.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-[11px] font-mono bg-white p-2 rounded border border-[#E2E8F0] text-[#1E293B]"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F1F5F9] text-[#64748B] font-sans font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kesimpulan */}
            <div className="p-2.5 bg-[#EFF6FF] rounded border border-[#DBEAFE] text-[11px] text-[#1E40AF] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
              <span>{question.explanation.kesimpulan}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
