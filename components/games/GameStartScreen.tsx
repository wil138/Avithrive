"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface GameStartScreenProps {
  title: string;
  description: string;
  questionsCount: number;
  onStartGame: () => void;
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({
  title,
  description,
  questionsCount,
  onStartGame,
}) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-4">{title}</CardTitle>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-bold text-lg">{questionsCount}</div>
              <div className="text-sm text-gray-600">Preguntas</div>
            </div>
            <div>
              <div className="font-bold text-lg">30s</div>
              <div className="text-sm text-gray-600">Por pregunta</div>
            </div>
            <div>
              <div className="font-bold text-lg">100</div>
              <div className="text-sm text-gray-600">Puntos máx.</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Button onClick={onStartGame} className="w-full" size="lg">
          Comenzar Juego
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameStartScreen;