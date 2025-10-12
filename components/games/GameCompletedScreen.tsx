"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface GameCompletedScreenProps {
  gameTitle: string;
  score: number;
  totalQuestions: number;
  onRestartGame: () => void;
}

const GameCompletedScreen: React.FC<GameCompletedScreenProps> = ({
  gameTitle,
  score,
  totalQuestions,
  onRestartGame,
}) => {
  const router = useRouter();
  const finalScorePercentage = Math.round((score / (totalQuestions * 100)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">¡Juego Completado!</CardTitle>
          <p className="text-gray-600">Has terminado "{gameTitle}"</p>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{finalScorePercentage}%</div>
            <p className="text-gray-600">Puntuación Final</p>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <div>
                <div className="font-semibold">{score}</div>
                <div className="text-gray-500">Puntos</div>
              </div>
              <div>
                <div className="font-semibold">{totalQuestions}</div>
                <div className="text-gray-500">Preguntas</div>
              </div>
            </div>
          </div>

          {finalScorePercentage >= 80 && (
            <Alert className="bg-emerald-50 border-emerald-200">
              <Trophy className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                ¡Excelente trabajo! Has ganado la insignia de "{gameTitle}"
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button onClick={onRestartGame} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="h-4 w-4 mr-2" />
              Jugar de Nuevo
            </Button>
            <Button onClick={() => router.push("/educacion")} className="flex-1">
              Volver a Educación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameCompletedScreen;