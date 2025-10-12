"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Game, QuestionContent, AudioQuestionContent, VisualQuestionContent, LogicQuestionContent, TextQuizQuestionContent } from "@/types/game";

interface ExplanationScreenProps {
  gameType: Game["type"];
  currentQuestion: QuestionContent;
  selectedAnswer: number | null;
  selectedColors: string[];
  matches: { [key: string]: string };
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const ExplanationScreen: React.FC<ExplanationScreenProps> = ({
  gameType,
  currentQuestion,
  selectedAnswer,
  selectedColors,
  matches,
  onNextQuestion,
  isLastQuestion,
}) => {
  let isCorrect = false;

  if (gameType === "audio" || gameType === "text_quiz") {
    const q = currentQuestion as AudioQuestionContent | TextQuizQuestionContent;
    isCorrect = selectedAnswer === q.correct;
  } else if (gameType === "visual") {
    const q = currentQuestion as VisualQuestionContent;
    isCorrect =
      selectedColors.length === q.correctColors.length &&
      selectedColors.every((color) => q.correctColors.includes(color));
  } else if (gameType === "logic") {
    const q = currentQuestion as LogicQuestionContent;
    isCorrect = q.correctMatches.every((match) => matches[match.bird] === match.habitat);
  }

  const birdInfo = (currentQuestion as AudioQuestionContent | VisualQuestionContent | TextQuizQuestionContent).birdInfo;

  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          {isCorrect ? (
            <div className="text-emerald-600">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">¡Correcto!</h3>
            </div>
          ) : (
            <div className="text-red-600">
              <XCircle className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Incorrecto</h3>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              {(currentQuestion as any).explanation}
            </p>

            {birdInfo && (
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                <img
                  src={birdInfo.image || "/placeholder.svg"}
                  alt={birdInfo.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{birdInfo.name}</h4>
                  <p className="text-sm italic text-gray-600">{birdInfo.scientificName}</p>
                  <p className="text-sm text-gray-600">{birdInfo.habitat}</p>
                </div>
              </div>
            )}
          </div>

          <Button onClick={onNextQuestion} className="w-full" size="lg">
            {isLastQuestion ? "Ver Resultados" : "Siguiente Pregunta"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExplanationScreen;