export type BirdInfo = {
  name: string;
  scientificName: string;
  habitat: string;
  image: string;
};

export type AudioQuestionContent = {
  id: number;
  audio: string;
  options: string[];
  correct: number;
  explanation: string;
  birdInfo: BirdInfo;
};

export type VisualQuestionContent = {
  id: number;
  image: string;
  colors: string[];
  correctColors: string[];
  explanation: string;
  birdInfo: BirdInfo;
};

export type LogicQuestionContent = {
  id: number;
  birds: { name: string; image: string }[];
  habitats: { name: string; description: string }[];
  correctMatches: { bird: string; habitat: string }[];
};

export type TextQuizQuestionContent = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  birdInfo: BirdInfo;
};

export type QuestionContent =
  | AudioQuestionContent
  | VisualQuestionContent
  | LogicQuestionContent
  | TextQuizQuestionContent;

export type Game = {
  id: number;
  title: string;
  type: "audio" | "visual" | "logic" | "text_quiz";
  description: string;
  questions: QuestionContent[];
};

export type GameData = {
  [key: number]: Game;
};