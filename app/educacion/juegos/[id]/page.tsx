"use client";

import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import GameHeader from "@/components/games/GameHeader";
import GameStartScreen from "@/components/games/GameStartScreen";
import GameCompletedScreen from "@/components/games/GameCompletedScreen";
import QuestionDisplay from "@/components/games/QuestionDisplay";
import ExplanationScreen from "@/components/games/ExplanationScreen";
import { useGameLogic } from "@/hooks/use-game-logic";
import { gameData } from "@/lib/game-data";

export default function JuegoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const gameId = Number.parseInt(params.id as string);
  const game = gameData[gameId];

  const {
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    selectedColors,
    setSelectedColors,
    matches,
    setMatches,
    showExplanation,
    score,
    gameCompleted,
    timeLeft,
    isPlaying,
    progress,
    handleAnswer,
    nextQuestion,
    restartGame,
    startGame,
  } = useGameLogic(game);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Juego no encontrado</h1>
          <button onClick={() => router.push("/educacion")} className="text-blue-500 hover:underline">
            Volver a Educación
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <GameCompletedScreen
        gameTitle={game.title}
        score={score}
        totalQuestions={game.questions.length}
        onRestartGame={restartGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHeader title={game.title} description={game.description} score={score} />

      <div className="container mx-auto px-4 py-8">
        {!isPlaying && currentQuestionIndex === 0 && !showExplanation ? (
          <GameStartScreen
            title={game.title}
            description={game.description}
            questionsCount={game.questions.length}
            onStartGame={startGame}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Progress and Timer */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Pregunta {currentQuestionIndex + 1} de {game.questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Tiempo:</span>
                  <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>{timeLeft}s</Badge>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {currentQuestion && !showExplanation ? (
              <QuestionDisplay
                gameType={game.type}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                matches={matches}
                setMatches={setMatches}
                onConfirmAnswer={handleAnswer}
              />
            ) : (
              currentQuestion && (
                <ExplanationScreen
                  gameType={game.type}
                  currentQuestion={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  selectedColors={selectedColors}
                  matches={matches}
                  onNextQuestion={nextQuestion}
                  isLastQuestion={currentQuestionIndex === game.questions.length - 1}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}