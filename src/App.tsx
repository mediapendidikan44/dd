import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FilterBar } from './components/FilterBar';
import { QuestionCard } from './components/QuestionCard';
import { DocxSettingsModal } from './components/DocxSettingsModal';
import { StudentScoreBanner } from './components/StudentScoreBanner';
import { PrintView } from './components/PrintView';
import { defaultSchoolHeader, soalVolumeBangunRuang } from './data/soalData';
import { SchoolHeaderInfo, Question } from './types';
import { exportToDocx, exportToLegacyDoc, ExportMode } from './utils/docxExport';
import { HelpCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [questions] = useState<Question[]>(soalVolumeBangunRuang);
  const [headerInfo, setHeaderInfo] = useState<SchoolHeaderInfo>(defaultSchoolHeader);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Filters & Modes
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Semua');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'review' | 'student'>('review');
  const [expandAllExplanations, setExpandAllExplanations] = useState(false);

  // Student mode state
  const [studentAnswers, setStudentAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Difficulty match
      if (selectedDifficulty !== 'Semua' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'Semua' && q.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inText = q.questionText.toLowerCase().includes(query);
        const inCat = q.category.toLowerCase().includes(query);
        const inFormula = q.formula.toLowerCase().includes(query);
        const inId = q.id.toString() === query.trim();
        return inText || inCat || inFormula || inId;
      }
      return true;
    });
  }, [questions, selectedDifficulty, selectedCategory, searchQuery]);

  // Handlers
  const handleExportDocx = async (mode: ExportMode) => {
    try {
      showToast('Menyiapkan file .docx...');
      await exportToDocx(questions, headerInfo, mode);
      showToast('File Word (.docx) berhasil diunduh!');
    } catch (err) {
      console.error('Error exporting docx:', err);
      exportToLegacyDoc(questions, headerInfo, mode);
      showToast('File Word (.doc) berhasil diunduh!');
    }
  };

  const handleExportDoc = (mode: ExportMode) => {
    exportToLegacyDoc(questions, headerInfo, mode);
    showToast('File Word (.doc) berhasil diunduh!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    let text = `${headerInfo.schoolName}\nASESMEN MATEMATIKA KELAS ${headerInfo.grade}\nMATERI: ${headerInfo.topic}\n\n`;
    text += 'SOAL PILIHAN GANDA (30 BUTIR):\n\n';

    questions.forEach((q) => {
      text += `${q.id}. ${q.questionText} [Tingkat: ${q.difficulty} - ${q.category}]\n`;
      q.options.forEach((o) => {
        text += `   ${o.key}. ${o.text}\n`;
      });
      text += '\n';
    });

    text += '\n========================================\n';
    text += 'KUNCI JAWABAN & PEMBAHASAN:\n========================================\n\n';

    questions.forEach((q) => {
      text += `No. ${q.id} (Kunci: ${q.correctAnswer}) - [${q.difficulty} | ${q.category}]\n`;
      text += `Rumus: ${q.formula}\n`;
      text += `Diketahui: ${q.explanation.diketahui.join(', ')}\n`;
      text += `Ditanya: ${q.explanation.ditanya}\n`;
      text += 'Langkah:\n';
      q.explanation.langkah.forEach((l) => {
        text += ` - ${l}\n`;
      });
      text += `Kesimpulan: ${q.explanation.kesimpulan}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    showToast('30 soal dan pembahasan berhasil disalin ke clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSelectStudentAnswer = (questionId: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleResetStudentAnswers = () => {
    setStudentAnswers({});
    showToast('Jawaban latihan siswa direset.');
  };

  const handleResetFilters = () => {
    setSelectedDifficulty('Semua');
    setSelectedCategory('Semua');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans">
      {/* Screen View */}
      <div className="no-print flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navigation Bar */}
        <Header
          headerInfo={headerInfo}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onExportDocx={handleExportDocx}
          onExportDoc={handleExportDoc}
          onPrint={handlePrint}
          onCopyAllText={handleCopyAll}
          isCopied={isCopied}
        />

        {/* Main Workspace Layout */}
        <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Sidebar (Configuration & Difficulty Balance) */}
          <Sidebar
            headerInfo={headerInfo}
            questions={questions}
            activeDifficulty={selectedDifficulty}
            onSelectDifficulty={setSelectedDifficulty}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Right Section: Interactive Questions Canvas */}
          <section className="flex-1 bg-[#F1F5F9] p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Mode Latihan Siswa Banner (jika aktif) */}
              {viewMode === 'student' && (
                <StudentScoreBanner
                  questions={questions}
                  studentAnswers={studentAnswers}
                  onResetAnswers={handleResetStudentAnswers}
                />
              )}

              {/* Filter & Toolbar */}
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                expandAllExplanations={expandAllExplanations}
                onToggleExpandAll={() => setExpandAllExplanations(!expandAllExplanations)}
                totalFiltered={filteredQuestions.length}
                totalAll={questions.length}
                onReset={handleResetFilters}
              />

              {/* Daftar Soal */}
              {filteredQuestions.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto text-[#94A3B8] mb-3">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1E293B]">
                    Tidak ada soal yang sesuai dengan filter
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                    Coba sesuaikan kata kunci pencarian atau bersihkan filter tingkat kesukaran dan bangun ruang.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-4 px-3 py-1.5 text-xs font-medium text-[#1E40AF] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-lg transition-colors"
                  >
                    Tampilkan Semua 30 Soal
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 pb-12">
                  {filteredQuestions.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      index={index}
                      viewMode={viewMode}
                      isExplanationExpanded={expandAllExplanations}
                      selectedStudentAnswer={studentAnswers[question.id]}
                      onSelectStudentAnswer={handleSelectStudentAnswer}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Print View Component (hanya aktif saat dicetak / disimpen PDF) */}
      <PrintView questions={questions} headerInfo={headerInfo} />

      {/* Modal Pengaturan Kop Dokumen Word */}
      <DocxSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        headerInfo={headerInfo}
        onSaveHeaderInfo={setHeaderInfo}
        onExportDocx={handleExportDocx}
        onExportDoc={handleExportDoc}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-medium border border-[#334155] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
