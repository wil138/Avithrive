"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, BookOpen, Gamepad2, Volume2, Eye, Brain, Users, Star, Trophy, Target } from "lucide-react"

export default function EducacionPage() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [userProgress, setUserProgress] = useState({
    gamesCompleted: 12,
    totalGames: 20,
    points: 850,
    level: 3,
    badges: 8,
  })

  const educationalGames = [
    {
      id: 1,
      title: "Identifica el Canto",
      description: "Escucha y reconoce los cantos de aves nicaragüenses",
      difficulty: "Fácil",
      type: "Audio",
      icon: Volume2,
      points: 50,
      completed: true,
      accessibility: ["Auditivo", "Cognitivo"],
    },
    {
      id: 2,
      title: "Memoria de Colores",
      description: "Memoriza los patrones de colores de diferentes especies",
      difficulty: "Medio",
      type: "Visual",
      icon: Eye,
      points: 75,
      completed: true,
      accessibility: ["Visual", "Memoria"],
    },
    {
      id: 3,
      title: "Rompecabezas de Hábitats",
      description: "Conecta cada ave con su hábitat natural",
      difficulty: "Medio",
      type: "Lógica",
      icon: Brain,
      points: 100,
      completed: false,
      accessibility: ["Cognitivo", "Lógico"],
    },
    {
      id: 4,
      title: "Aventura Grupal",
      description: "Juego colaborativo para identificar aves en equipo",
      difficulty: "Difícil",
      type: "Colaborativo",
      icon: Users,
      points: 150,
      completed: false,
      accessibility: ["Social", "Colaborativo"],
    },
  ]

  const learningModules = [
    {
      title: "Aves Endémicas de Nicaragua",
      description: "Conoce las especies únicas de nuestro país",
      duration: "15 min",
      level: "Principiante",
      completed: true,
    },
    {
      title: "Conservación y Protección",
      description: "Aprende sobre la importancia de proteger las aves",
      duration: "20 min",
      level: "Intermedio",
      completed: true,
    },
    {
      title: "Técnicas de Observación",
      description: "Mejora tus habilidades de avistamiento",
      duration: "25 min",
      level: "Avanzado",
      completed: false,
    },
  ]

  const accessibilityFeatures = [
    {
      icon: Volume2,
      title: "Audio Descriptivo",
      description: "Descripciones detalladas de imágenes y contenido visual",
    },
    {
      icon: Eye,
      title: "Alto Contraste",
      description: "Colores y contrastes optimizados para mejor visibilidad",
    },
    {
      icon: Brain,
      title: "Ritmo Adaptable",
      description: "Velocidad de juego ajustable según necesidades cognitivas",
    },
    {
      icon: Target,
      title: "Instrucciones Claras",
      description: "Explicaciones paso a paso con lenguaje simple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Centro de Educación Aviturista</h1>
            <p className="text-xl text-emerald-100 mb-8 text-pretty max-w-3xl mx-auto">
              Aprende sobre las aves de Nicaragua a través de juegos interactivos, módulos educativos y experiencias
              accesibles para todos
            </p>

            {/* User Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userProgress.gamesCompleted}</div>
                  <div className="text-sm text-emerald-200">Juegos Completados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userProgress.points}</div>
                  <div className="text-sm text-emerald-200">Puntos Ganados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Nivel {userProgress.level}</div>
                  <div className="text-sm text-emerald-200">Aviturista</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userProgress.badges}</div>
                  <div className="text-sm text-emerald-200">Insignias</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Progress value={60} className="mb-2" />
                  <div className="text-sm text-emerald-200">Progreso al Nivel 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Juegos Interactivos
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Módulos Educativos
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Accesibilidad
            </TabsTrigger>
          </TabsList>

          {/* Interactive Games */}
          <TabsContent value="games">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Juegos Educativos</h2>
              <p className="text-gray-600 mb-8 text-pretty">
                Aprende mientras juegas con nuestra colección de juegos diseñados para diferentes estilos de aprendizaje
                y necesidades de accesibilidad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {educationalGames.map((game) => (
                (() => {
                  const IconComponent = game.icon
                  return (
                    <Card key={game.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                              <IconComponent className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{game.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    game.difficulty === "Fácil"
                                      ? "secondary"
                                      : game.difficulty === "Medio"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {game.difficulty}
                                </Badge>
                                <Badge variant="outline">{game.type}</Badge>
                              </div>
                            </div>
                          </div>
                          {game.completed && (
                            <div className="p-1 bg-green-100 rounded-full">
                              <Trophy className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 text-pretty">{game.description}</CardDescription>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{game.points} puntos</span>
                          </div>
                          <div className="flex gap-1">
                            {game.accessibility.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full" variant={game.completed ? "outline" : "default"}>
                          <Play className="h-4 w-4 mr-2" />
                          {game.completed ? "Jugar de Nuevo" : "Comenzar Juego"}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })()
              ))}
            </div>
          </TabsContent>

          {/* Educational Modules */}
          <TabsContent value="modules">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Módulos de Aprendizaje</h2>
              <p className="text-gray-600 mb-8 text-pretty">
                Contenido educativo estructurado para aprender sobre las aves de Nicaragua de manera progresiva y
                comprensiva.
              </p>
            </div>

            <div className="space-y-6">
              {learningModules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-emerald-800">{module.title}</h3>
                          {module.completed && <Badge className="bg-green-100 text-green-800">Completado</Badge>}
                        </div>
                        <p className="text-gray-600 mb-3 text-pretty">{module.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {module.duration}</span>
                          <span>📊 {module.level}</span>
                        </div>
                      </div>
                      <div className="ml-6">
                        <Button variant={module.completed ? "outline" : "default"}>
                          {module.completed ? "Revisar" : "Comenzar"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Accessibility Features */}
          <TabsContent value="accessibility">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Características de Accesibilidad</h2>
              <p className="text-gray-600 mb-8 text-pretty">
                Nuestra plataforma está diseñada para ser inclusiva y accesible para personas con diferentes capacidades
                cognitivas y físicas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {accessibilityFeatures.map((feature, index) => (
                (() => {
                  const IconComponent = feature.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-emerald-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-pretty">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })()
              ))}
            </div>

            {/* Accessibility Settings */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-emerald-800">Configuración de Accesibilidad</CardTitle>
                <CardDescription>Personaliza tu experiencia de aprendizaje según tus necesidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Velocidad de Juego</span>
                      <select className="px-3 py-1 border rounded-md">
                        <option>Lenta</option>
                        <option>Normal</option>
                        <option>Rápida</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tamaño de Texto</span>
                      <select className="px-3 py-1 border rounded-md">
                        <option>Pequeño</option>
                        <option>Normal</option>
                        <option>Grande</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Contraste Alto</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Audio Descriptivo</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6">Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
