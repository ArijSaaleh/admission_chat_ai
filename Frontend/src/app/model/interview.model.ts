export interface Interview {
    candidate: string;
    questions: { question: string, answer: string }[];
    submitted: boolean;
    createdAt: Date;
  }
  