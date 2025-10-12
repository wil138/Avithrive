"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import React from "react";
import { AudioQuestionContent } from "@/types/game";

interface AudioQuestionProps {
  question: AudioQuestionContent;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

const AudioQuestion: React.FC<AudioQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  // Placeholder for audio playback logic
  const playAudio = () => {
    console.log("Playing audio:", question.audio);
    // In a real app, you would use an <audio> element or a library to play the sound.
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <Volume2 className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Escucha el canto</h3>
        <Button variant="outline" className="mb-6 bg-transparent" onClick={playAudio}>
          <Volume2 className="h-4 w-4 mr-2" />
          Reproducir Audio
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

export default AudioQuestion;