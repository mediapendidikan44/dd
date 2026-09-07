export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sukar';

export type ShapeCategory =
  | 'Kubus'
  | 'Balok'
  | 'Tabung'
  | 'Prisma Segitiga'
  | 'Limas Segiempat'
  | 'Kerucut'
  | 'Bola'
  | 'Gabungan & Kontekstual';

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  difficulty: DifficultyLevel;
  category: ShapeCategory;
  questionText: string;
  formula: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: {
    diketahui: string[];
    ditanya: string;
    langkah: string[];
    kesimpulan: string;
  };
}

export interface SchoolHeaderInfo {
  schoolName: string;
  subject: string;
  grade: string;
  semester: string;
  topic: string;
  academicYear: string;
  timeAllocation: string;
  teacherName: string;
}
