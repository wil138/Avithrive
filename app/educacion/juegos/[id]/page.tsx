"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Volume2, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react"

// Mock game data
const gameData = {
  1: {
    id: 1,
    title: "Identifica el Canto",
    type: "audio",
    description: "Escucha y reconoce los cantos de aves nicaragüenses",
    questions: [
      {
        id: 1,
        audio: "/placeholder.svg?key=audio1",
        options: ["Guardabarranco", "Quetzal", "Tucán", "Colibrí"],
        correct: 0,
        explanation: "El Guardabarranco tiene un canto distintivo con notas melodiosas y repetitivas.",
        birdInfo: {
          name: "Guardabarranco",
          scientificName: "Eumomota superciliosa",
          habitat: "Bosque seco tropical",
          image: "/guardabarranco-bird-nicaragua.jpg",
        },
      },
      {
        id: 2,
        audio: "/placeholder.svg?key=audio2",
        options: ["Lapa Verde", "Pájaro Campana", "Tucán Pico Iris", "Momoto"],
        correct: 1,
        explanation: "El Pájaro Campana produce un sonido metálico único que puede escucharse a kilómetros.",
        birdInfo: {
          name: "Pájaro Campana",
          scientificName: "Procnias tricarunculatus",
          habitat: "Bosque nuboso",
          image: "/three-wattled-bellbird-white-brown.jpg",
        },
      },
      {
        id: 3,
        audio: "/placeholder.svg?key=audio3",
        options: ["Colibrí Garganta Rubí", "Reinita", "Tangara", "Vireo"],
        correct: 0,
        explanation: "Los colibríes producen un zumbido característico con sus alas que baten muy rápidamente.",
        birdInfo: {
          name: "Colibrí Garganta Rubí",
          scientificName: "Archilochus colubris",
          habitat: "Jardines y bosques",
          image: "/ruby-throated-hummingbird-red-green.jpg",
        },
      },
    ],
  },
  2: {
    id: 2,
    title: "Memoria de Colores",
    type: "visual",
    description: "Memoriza los patrones de colores de diferentes especies",
    questions: [
      {
        id: 1,
        image: "/quetzal-bird-green-red-guatemala-nicaragua.jpg",
        colors: ["Verde", "Rojo", "Blanco", "Dorado"],
        correctColors: ["Verde", "Rojo"],
        explanation: "El Quetzal Resplandeciente es famoso por su plumaje verde esmeralda y pecho rojo brillante.",
        birdInfo: {
          name: "Quetzal Resplandeciente",
          scientificName: "Pharomachrus mocinno",
          habitat: "Bosque nuboso",
        },
      },
      {
        id: 2,
        image: "/toucan-colorful-beak-tropical-bird.jpg",
        colors: ["Negro", "Amarillo", "Azul", "Verde", "Rojo"],
        correctColors: ["Negro", "Amarillo", "Azul", "Verde", "Rojo"],
        explanation: "El Tucán Pico Iris tiene uno de los picos más coloridos del reino animal.",
        birdInfo: {
          name: "Tucán Pico Iris",
          scientificName: "Ramphastos sulfuratus",
          habitat: "Bosque húmedo tropical",
        },
      },
    ],
  },
  3: {
    id: 3,
    title: "Rompecabezas de Hábitats",
    type: "logic",
    description: "Conecta cada ave con su hábitat natural",
    questions: [
      {
        id: 1,
        birds: [
          { name: "Guardabarranco", image: "/guardabarranco-bird-nicaragua.jpg" },
          { name: "Quetzal", image: "/quetzal-bird-green-red-guatemala-nicaragua.jpg" },
          { name: "Lapa Verde", image: "/great-green-macaw-parrot-nicaragua-endangered.jpg" },
        ],
        habitats: [
          { name: "Bosque seco", description: "Áreas con poca precipitación" },
          { name: "Bosque nuboso", description: "Montañas con neblina constante" },
          { name: "Bosque húmedo", description: "Selva tropical lluviosa" },
        ],
        correctMatches: [
          { bird: "Guardabarranco", habitat: "Bosque seco" },
          { bird: "Quetzal", habitat: "Bosque nuboso" },
          { bird: "Lapa Verde", habitat: "Bosque húmedo" },
        ],
      },
    ],
  },
}

export default function JuegoPage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [matches, setMatches] = useState<{ [key: string]: string }>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)

  const gameId = Number.parseInt(params.id as string)
  const game = gameData[gameId as keyof typeof gameData]

  useEffect(() => {
    if (isPlaying && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isPlaying, showExplanation])

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Juego no encontrado</h1>
          <Button onClick={() => router.push("/educacion")}>Volver a Educación</Button>
        </div>
      </div>
    )
  }

  const currentQ = game.questions[currentQuestion]
  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / (game.questions.length * 2)) * 100

  const handleAnswer = () => {
    let isCorrect = false

    if (game.type === "audio") {
      isCorrect = selectedAnswer === currentQ.correct
    } else if (game.type === "visual") {
      isCorrect =
        selectedColors.length === currentQ.correctColors.length &&
        selectedColors.every((color) => currentQ.correctColors.includes(color))
    } else if (game.type === "logic") {
      const correctMatches = currentQ.correctMatches
      isCorrect = correctMatches.every((match) => matches[match.bird] === match.habitat)
    }

    if (isCorrect) {
      setScore(score + 100)
    }

    setShowExplanation(true)
    setIsPlaying(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < game.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setSelectedColors([])
      setMatches({})
      setShowExplanation(false)
      setTimeLeft(30)
      setIsPlaying(true)
    } else {
      setGameCompleted(true)
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setSelectedColors([])
    setMatches({})
    setShowExplanation(false)
    setScore(0)
    setGameCompleted(false)
    setTimeLeft(30)
    setIsPlaying(true)
  }

  const startGame = () => {
    setIsPlaying(true)
  }

  if (gameCompleted) {
    const finalScore = Math.round((score / (game.questions.length * 100)) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-800">¡Juego Completado!</CardTitle>
            <p className="text-gray-600">Has terminado "{game.title}"</p>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{finalScore}%</div>
              <p className="text-gray-600">Puntuación Final</p>
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <div>
                  <div className="font-semibold">{score}</div>
                  <div className="text-gray-500">Puntos</div>
                </div>
                <div>
                  <div className="font-semibold">{game.questions.length}</div>
                  <div className="text-gray-500">Preguntas</div>
                </div>
              </div>
            </div>

            {finalScore >= 80 && (
              <Alert className="bg-emerald-50 border-emerald-200">
                <Trophy className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800">
                  ¡Excelente trabajo! Has ganado la insignia de "{game.title}"
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button onClick={restartGame} variant="outline" className="flex-1 bg-transparent">
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
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/educacion")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Educación
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              <p className="text-emerald-100">{game.description}</p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm text-emerald-200">Puntos</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!isPlaying && currentQuestion === 0 ? (
          // Game Start Screen
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">{game.title}</CardTitle>
              <p className="text-gray-600 mb-6">{game.description}</p>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-lg">{game.questions.length}</div>
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
              <Button onClick={startGame} className="w-full" size="lg">
                Comenzar Juego
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Game Content
          <div className="max-w-4xl mx-auto">
            {/* Progress and Timer */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Pregunta {currentQuestion + 1} de {game.questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Tiempo:</span>
                  <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>{timeLeft}s</Badge>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {!showExplanation ? (
              // Question Content
              <Card>
                <CardContent className="p-8">
                  {game.type === "audio" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                          <Volume2 className="h-12 w-12 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Escucha el canto</h3>
                        <Button variant="outline" className="mb-6 bg-transparent">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Reproducir Audio
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {currentQ.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? "default" : "outline"}
                            className="h-16 text-lg"
                            onClick={() => setSelectedAnswer(index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {game.type === "visual" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">¿Qué colores ves en esta ave?</h3>
                        <div className="max-w-md mx-auto mb-6">
                          <img
                            src={currentQ.image || "/placeholder.svg"}
                            alt="Ave para identificar"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {currentQ.colors.map((color, index) => (
                          <Button
                            key={index}
                            variant={selectedColors.includes(color) ? "default" : "outline"}
                            onClick={() => {
                              if (selectedColors.includes(color)) {
                                setSelectedColors(selectedColors.filter((c) => c !== color))
                              } else {
                                setSelectedColors([...selectedColors, color])
                              }
                            }}
                          >
                            {color}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {game.type === "logic" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-center mb-6">
                        Conecta cada ave con su hábitat natural
                      </h3>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4">Aves</h4>
                          <div className="space-y-3">
                            {currentQ.birds.map((bird, index) => (
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
                            {currentQ.habitats.map((habitat, index) => (
                              <div key={index} className="p-3 border rounded-lg">
                                <div className="font-medium">{habitat.name}</div>
                                <div className="text-sm text-gray-600">{habitat.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Simplified matching interface */}
                      <div className="space-y-3">
                        {currentQ.birds.map((bird) => (
                          <div key={bird.name} className="flex items-center gap-4">
                            <span className="w-32 font-medium">{bird.name}</span>
                            <select
                              className="flex-1 p-2 border rounded"
                              value={matches[bird.name] || ""}
                              onChange={(e) => setMatches({ ...matches, [bird.name]: e.target.value })}
                            >
                              <option value="">Selecciona un hábitat</option>
                              {currentQ.habitats.map((habitat) => (
                                <option key={habitat.name} value={habitat.name}>
                                  {habitat.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center mt-8">
                    <Button
                      onClick={handleAnswer}
                      disabled={
                        (game.type === "audio" && selectedAnswer === null) ||
                        (game.type === "visual" && selectedColors.length === 0) ||
                        (game.type === "logic" && Object.keys(matches).length < currentQ.birds.length)
                      }
                      size="lg"
                    >
                      Confirmar Respuesta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Explanation Screen
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    {(game.type === "audio" && selectedAnswer === currentQ.correct) ||
                    (game.type === "visual" &&
                      selectedColors.length === currentQ.correctColors.length &&
                      selectedColors.every((color) => currentQ.correctColors.includes(color))) ||
                    (game.type === "logic" &&
                      currentQ.correctMatches.every((match) => matches[match.bird] === match.habitat)) ? (
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
                      <p className="text-gray-700 mb-4">{currentQ.explanation}</p>

                      {currentQ.birdInfo && (
                        <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                          <img
                            src={currentQ.birdInfo.image || "/placeholder.svg"}
                            alt={currentQ.birdInfo.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold">{currentQ.birdInfo.name}</h4>
                            <p className="text-sm italic text-gray-600">{currentQ.birdInfo.scientificName}</p>
                            <p className="text-sm text-gray-600">{currentQ.birdInfo.habitat}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button onClick={nextQuestion} className="w-full" size="lg">
                      {currentQuestion < game.questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
