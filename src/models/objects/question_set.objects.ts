interface QuestionSetObj {
  title: string;
  keywords: string[];
  description: string;
  public: boolean;

  date_created: number;
  date_edited: number;

  leaderboard_time: number;
  transition_time: number;
  timed: boolean;

  questions: QuestionObj[];
}

interface QuestionObj {
  text: string;
  answer_time: number;
  options: OptionObj[];
}

interface OptionObj {
  text: string;
  points: number;
  correct: boolean;
}

export { QuestionSetObj, QuestionObj, OptionObj };
