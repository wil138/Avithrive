"use client";

import { useState, useEffect, useCallback } from "react";
import { Game, QuestionContent, AudioQuestionContent, VisualQuestionContent, LogicQuestionContent, TextQuizQuestionContent } from "@/types/game";

const QUESTION_TIME_LIMIT = 30; // seconds

export function useGameLogic(game: Game | undefined) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentQuestion = game?.questions[currentQuestionIndex];

  useEffect(() => {
    if (isPlaying && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (isPlaying && timeLeft === 0 && !showExplanation) {
      handleAnswer();
    }
  }, [timeLeft, isPlaying, showExplanation, game]); // Added game to dependencies

  const resetQuestionState = useCallback(() => {
    setSelectedAnswer(null);
    setSelectedColors([]);
    setMatches({});
    setShowExplanation(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
  }, []);

  const handleAnswer = useCallback(() => {
    if (!game || !currentQuestion) return;

    let isCorrect = false;

    if (game.type === "audio" || game.type === "text_quiz") {
      const q = currentQuestion as AudioQuestionContent | TextQuizQuestionContent;
      isCorrect = selectedAnswer === q.correct;
    } else if (game.type === "visual") {
      const q = currentQuestion as VisualQuestionContent;
      isCorrect =
        selectedColors.length === q.correctColors.length &&
        selectedColors.every((color) => q.correctColors.includes(color));
    } else if (game.type === "logic") {
      const q = currentQuestion as LogicQuestionContent;
      isCorrect = q.correctMatches.every((match) => matches[match.bird] === match.habitat);
    }

    if (isCorrect) {
      setScore((prev) => prev + 100);
    }

    setShowExplanation(true);
    setIsPlaying(false);
  }, [game, currentQuestion, selectedAnswer, selectedColors, matches]);

  const nextQuestion = useCallback(() => {
    if (!game) return;

    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
      setIsPlaying(true);
    } else {
      setGameCompleted(true);
      setIsPlaying(false);
    }
  }, [game, currentQuestionIndex, resetQuestionState]);

  const restartGame = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameCompleted(false);
    resetQuestionState();
    setIsPlaying(true);
  }, [resetQuestionState]);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    resetQuestionState();
  }, [resetQuestionState]);

  const progress = game
    ? ((currentQuestionIndex + (showExplanation ? 1 : 0)) / (game.questions.length * 2)) * 100
    : 0;

  return {
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
  };
}