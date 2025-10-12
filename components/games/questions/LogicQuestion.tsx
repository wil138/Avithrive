"use client";

import React from "react";
import { LogicQuestionContent } from "@/types/game";

interface LogicQuestionProps {
  question: LogicQuestionContent;
  matches: { [key: string]: string };
  onMatchChange: (birdName: string, habitatName: string) => void;
}

const LogicQuestion: React.FC<LogicQuestionProps> = ({
  question,
  matches,
  onMatchChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center mb-6">
        Conecta cada ave con su hábitat natural
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-4">Aves</h4>
          <div className="space-y-3">
            {question.birds.map((bird, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <img
                  src={bird.image || "/placeholder.svg"}
                  alt={bird.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="font-medium">{bird.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Hábitats</h4>
          <div className="space-y-3">
            {question.habitats.map((habitat, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="font-medium">{habitat.name}</div>
                <div className="text-sm text-gray-600">{habitat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {question.birds.map((bird) => (
          <div key={bird.name} className="flex items-center gap-4">
            <span className="w-32 font-medium">{bird.name}</span>
            <select
              className="flex-1 p-2 border rounded"
              value={matches[bird.name] || ""}
              onChange={(e) => onMatchChange(bird.name, e.target.value)}
              aria-label={`Seleccionar hábitat para ${bird.name}`}
            >
              <option value="">Selecciona un hábitat</option>
              {question.habitats.map((habitat) => (
                <option key={habitat.name} value={habitat.name}>
                  {habitat.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogicQuestion;