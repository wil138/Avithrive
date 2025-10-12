"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { VisualQuestionContent } from "@/types/game";

interface VisualQuestionProps {
  question: VisualQuestionContent;
  selectedColors: string[];
  onSelectColor: (color: string) => void;
}

const VisualQuestion: React.FC<VisualQuestionProps> = ({
  question,
  selectedColors,
  onSelectColor,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">¿Qué colores ves en esta ave?</h3>
        <div className="max-w-md mx-auto mb-6">
          <img
            src={question.image || "/placeholder.svg"}
            alt="Ave para identificar"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {question.colors.map((color, index) => (
          <Button
            key={index}
            variant={selectedColors.includes(color) ? "default" : "outline"}
            onClick={() => onSelectColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VisualQuestion;