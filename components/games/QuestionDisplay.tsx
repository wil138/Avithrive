"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AudioQuestion from "./questions/AudioQuestion";
import VisualQuestion from "./questions/VisualQuestion";
import LogicQuestion from "./questions/LogicQuestion";
import TextQuizQuestion from "./questions/TextQuizQuestion";
import { Game, QuestionContent, AudioQuestionContent, VisualQuestionContent, LogicQuestionContent, TextQuizQuestionContent } from "@/types/game";

interface QuestionDisplayProps {
  gameType: Game["type"];
  currentQuestion: QuestionContent;
  selectedAnswer: number | null;
  setSelectedAnswer: (index: number) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  matches: { [key: string]: string };
  setMatches: (matches: { [key: string]: string }) => void;
  onConfirmAnswer: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  gameType,
  currentQuestion,
  selectedAnswer,
  setSelectedAnswer,
  selectedColors,
  setSelectedColors,
  matches,
  setMatches,
  onConfirmAnswer,
}) => {
  const isAnswerSelected = () => {
    if (gameType === "audio" || gameType === "text_quiz") {
      return selectedAnswer !== null;
    }
    if (gameType === "visual") {
      return selectedColors.length > 0;
    }
    if (gameType === "logic") {
      const q = currentQuestion as LogicQuestionContent;
      return Object.keys(matches).length === q.birds.length && Object.values(matches).every(val => val !== "");
    }
    return false;
  };

  return (
    <Card>
      <CardContent className="p-8">
        {gameType === "audio" && (
          <AudioQuestion
            question={currentQuestion as AudioQuestionContent}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        )}
        {gameType === "visual" && (
          <VisualQuestion
            question={currentQuestion as VisualQuestionContent}
            selectedColors={selectedColors}
            onSelectColor={(color) => {
              if (selectedColors.includes(color)) {
                setSelectedColors(selectedColors.filter((c) => c !== color));
              } else {
                setSelectedColors([...selectedColors, color]);
              }
            }}
          />
        )}
        {gameType === "logic" && (
          <LogicQuestion
            question={currentQuestion as LogicQuestionContent}
            matches={matches}
            onMatchChange={(birdName, habitatName) => setMatches({ ...matches, [birdName]: habitatName })}
          />
        )}
        {gameType === "text_quiz" && (
          <TextQuizQuestion
            question={currentQuestion as TextQuizQuestionContent}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        )}

        <div className="flex justify-center mt-8">
          <Button onClick={onConfirmAnswer} disabled={!isAnswerSelected()} size="lg">
            Confirmar Respuesta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;