"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import React from "react";
import { TextQuizQuestionContent } from "@/types/game";

interface TextQuizQuestionProps {
  question: TextQuizQuestionContent;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

const TextQuizQuestion: React.FC<TextQuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer === index ? "default" : "outline"}
            className="h-16 text-lg"
            onClick={() => onSelectAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TextQuizQuestion;