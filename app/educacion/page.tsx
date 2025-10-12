"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accessibility,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Gamepad2,
  Globe,
  GraduationCap,
  Hand,
  Headphones,
  Lightbulb,
  Link as LinkIcon,
  Lock,
  Palette,
  Play,
  Star,
  Target,
  TextCursorInput,
  Trophy,
  User,
  Users,
  Video,
  Volume2,
} from "lucide-react"
import Link from "next/link"

export default function EducacionPage() {
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
      title: "Adivina el Ave",
      description: "Responde preguntas sobre características y datos curiosos de aves nicaragüenses",
      difficulty: "Fácil",
      type: "Quiz",
      icon: Lightbulb,
      points: 60,
      completed: false,
      accessibility: ["Textual", "Cognitivo"],
    },
    {
      id: 5,
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
      id: 1,
      title: "Aves Endémicas de Nicaragua",
      description: "Conoce las especies únicas de nuestro país, su hábitat y estado de conservación.",
      duration: "15 min",
      level: "Principiante",
      completed: true,
      image: "/guardabarranco-bird-nicaragua.jpg",
    },
    {
      id: 2,
      title: "Conservación y Protección",
      description: "Aprende sobre la importancia de proteger las aves y sus hábitats, y cómo puedes contribuir a su conservación.",
      duration: "20 min",
      level: "Intermedio",
      completed: true,
      image: "/great-green-macaw-parrot-nicaragua-endangered.jpg",
    },
    {
      id: 3,
      title: "Técnicas de Observación",
      description: "Mejora tus habilidades de avistamiento con consejos prácticos y técnicas avanzadas para identificar aves en el campo.",
      duration: "25 min",
      level: "Avanzado",
      completed: false,
      image: "/placeholder.svg?key=observacion",
    },
    {
      id: 4,
      title: "Identificación por Plumaje",
      description: "Guía detallada para reconocer aves por sus patrones de plumaje, tamaño y forma.",
      duration: "18 min",
      level: "Principiante",
      completed: false,
      image: "/placeholder.svg?key=plumaje",
    },
    {
      id: 5,
      title: "Ecología Aviar",
      description: "Estudio de los ecosistemas y el comportamiento de las aves.",
      duration: "30 min",
      level: "Intermedio",
      completed: false,
      image: "/placeholder.svg?key=ecologia",
    },
  ]

  const accessibilityFeatures = [
    {
      icon: Headphones,
      title: "Audio Descriptivo",
      description: "Descripciones detalladas de imágenes y contenido visual para usuarios con discapacidad visual.",
    },
    {
      icon: Palette,
      title: "Alto Contraste y Temas",
      description: "Colores y contrastes optimizados, y opciones de temas para mejor visibilidad y preferencias de usuario.",
    },
    {
      icon: Clock,
      title: "Ritmo Adaptable",
      description: "Velocidad de juego y lectura ajustable según necesidades cognitivas y de aprendizaje.",
    },
    {
      icon: TextCursorInput,
      title: "Tamaño de Texto Ajustable",
      description: "Permite a los usuarios aumentar o disminuir el tamaño del texto para una lectura más cómoda.",
    },
    {
      icon: Hand,
      title: "Navegación por Teclado",
      description: "Funcionalidad completa de la interfaz utilizando solo el teclado, sin necesidad de ratón.",
    },
    {
      icon: Target,
      title: "Instrucciones Claras",
      description: "Explicaciones paso a paso con lenguaje simple y ayudas visuales para facilitar la comprensión.",
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
                  <Progress value={60} className="mb-2" aria-label="Progreso al siguiente nivel" />
                  <div className="text-sm text-emerald-200">Progreso al Nivel 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8" aria-label="Navegación principal de Educación">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Juegos Interactivos
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Módulos Educativos
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
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
                              <IconComponent className="h-6 w-6 text-emerald-600" aria-hidden="true" />
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
                            <div className="p-1 bg-green-100 rounded-full" aria-label="Juego completado">
                              <Trophy className="h-4 w-4 text-green-600" aria-hidden="true" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 text-pretty">{game.description}</CardDescription>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
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
                        <Link href={`/educacion/juegos/${game.id}`} aria-label={`Comenzar juego ${game.title}`}>
                          <Button className="w-full" variant={game.completed ? "outline" : "default"}>
                            <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                            {game.completed ? "Jugar de Nuevo" : "Comenzar Juego"}
                          </Button>
                        </Link>
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

            <div className="grid md:grid-cols-2 gap-6">
              {learningModules.map((module) => (
                <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={module.image || "/placeholder.svg"}
                    alt={`Imagen del módulo ${module.title}`}
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-emerald-800">{module.title}</h3>
                      {module.completed && <Badge className="bg-green-100 text-green-800">Completado</Badge>}
                    </div>
                    <p className="text-gray-600 mb-3 text-pretty">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{module.level}</span>
                      </div>
                    </div>
                    <Link href={`/educacion/modulos/${module.id}`} aria-label={`Acceder al módulo ${module.title}`}>
                      <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                        {module.completed ? "Revisar Módulo" : "Comenzar Módulo"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Link to CursosPage */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                  <CardTitle className="text-2xl text-emerald-800 mb-2">Explora Nuestros Cursos y Certificaciones</CardTitle>
                  <CardDescription className="text-gray-700">
                    Accede a una amplia gama de cursos especializados y obtén certificaciones oficiales para avanzar en tu pasión por el aviturismo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/educacion/cursos" aria-label="Ver todos los cursos y certificaciones">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Ver Cursos y Certificaciones
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
                            <IconComponent className="h-6 w-6 text-blue-600" aria-hidden="true" />
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
                      <label htmlFor="game-speed" className="font-medium">Velocidad de Juego</label>
                      <select id="game-speed" className="px-3 py-1 border rounded-md" aria-label="Seleccionar velocidad de juego">
                        <option>Lenta</option>
                        <option>Normal</option>
                        <option>Rápida</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="text-size" className="font-medium">Tamaño de Texto</label>
                      <select id="text-size" className="px-3 py-1 border rounded-md" aria-label="Seleccionar tamaño de texto">
                        <option>Pequeño</option>
                        <option>Normal</option>
                        <option>Grande</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="high-contrast" className="font-medium">Contraste Alto</label>
                      <input type="checkbox" id="high-contrast" className="w-4 h-4" aria-label="Activar contraste alto" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="audio-description" className="font-medium">Audio Descriptivo</label>
                      <input type="checkbox" id="audio-description" className="w-4 h-4" aria-label="Activar audio descriptivo" />
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" aria-label="Guardar configuración de accesibilidad">Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}