export type Difficulty = 'easy' | 'medium' | 'hard';
export type RootCause = 'concept' | 'careless' | 'calculation' | 'memory' | 'other';

export type WrongQuestionRecord = {
  id: string;
  subject: string;
  topic: string;
  question: string;
  correctAnswer: string;
  studentAnswer: string;
  rootCause: RootCause;
  difficulty: Difficulty;
  tags: string[];
  notes?: string;
  createdAt: string;
  nextReviewAt?: string;
};

export const ROOT_CAUSE_OPTIONS: { label: string; value: RootCause }[] = [
  { label: '概念模糊', value: 'concept' },
  { label: '粗心疏漏', value: 'careless' },
  { label: '计算错误', value: 'calculation' },
  { label: '记忆缺失', value: 'memory' },
  { label: '其他', value: 'other' }
];

export const DIFFICULTY_OPTIONS: { label: string; value: Difficulty }[] = [
  { label: '基础', value: 'easy' },
  { label: '中等', value: 'medium' },
  { label: '拔高', value: 'hard' }
];
