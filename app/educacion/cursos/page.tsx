"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Lock, Award, Download, Globe } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Fundamentos de Aviturismo en Nicaragua",
    description: "Curso introductorio sobre las aves de Nicaragua, técnicas básicas de observación y conservación.",
    level: "Principiante",
    duration: "4 semanas",
    lessons: 16,
    students: 1250,
    rating: 4.8,
    reviews: 89,
    price: "Gratuito",
    instructor: {
      name: "Dr. María Elena Vásquez",
      title: "Ornitóloga especializada",
      avatar: "/placeholder.svg?key=instructor1",
      experience: "15 años de experiencia",
    },
    image: "/guardabarranco-bird-nicaragua.jpg",
    progress: 0,
    enrolled: false,
    certificate: true,
    accessibility: ["Audio descriptivo", "Subtítulos", "Ritmo adaptable"],
    topics: [
      "Introducción a la ornitología",
      "Aves endémicas de Nicaragua",
      "Técnicas de observación",
      "Equipos básicos",
      "Conservación y ética",
    ],
  },
  {
    id: 2,
    title: "Aves Endémicas y de Conservación Especial",
    description: "Estudio profundo de las especies endémicas y en peligro de extinción de Nicaragua.",
    level: "Intermedio",
    duration: "6 semanas",
    lessons: 24,
    students: 680,
    rating: 4.9,
    reviews: 45,
    price: "$29",
    instructor: {
      name: "Biol. Carlos Mendoza",
      title: "Especialista en conservación",
      avatar: "/placeholder.svg?key=instructor2",
      experience: "12 años en conservación",
    },
    image: "/great-green-macaw-parrot-nicaragua-endangered.jpg",
    progress: 35,
    enrolled: true,
    certificate: true,
    accessibility: ["Audio descriptivo", "Subtítulos", "Alto contraste"],
    topics: [
      "Especies endémicas nacionales",
      "Estados de conservación",
      "Amenazas y protección",
      "Programas de conservación",
      "Monitoreo poblacional",
    ],
  },
  {
    id: 3,
    title: "Fotografía de Aves Avanzada",
    description: "Técnicas profesionales para capturar imágenes espectaculares de aves en su hábitat natural.",
    level: "Avanzado",
    duration: "8 semanas",
    lessons: 32,
    students: 420,
    rating: 4.7,
    reviews: 67,
    price: "$49",
    instructor: {
      name: "Roberto Silva",
      title: "Fotógrafo de naturaleza",
      avatar: "/placeholder.svg?key=instructor3",
      experience: "20 años fotografiando aves",
    },
    image: "/quetzal-bird-green-red-guatemala-nicaragua.jpg",
    progress: 0,
    enrolled: false,
    certificate: true,
    accessibility: ["Descripciones detalladas", "Ejemplos paso a paso"],
    topics: [
      "Equipos profesionales",
      "Técnicas de acercamiento",
      "Composición y luz",
      "Ética en fotografía",
      "Post-procesamiento",
    ],
  },
  {
    id: 4,
    title: "Guía Certificado de Aviturismo",
    description: "Programa completo para convertirse en guía profesional de aviturismo certificado por INTUR.",
    level: "Profesional",
    duration: "12 semanas",
    lessons: 48,
    students: 180,
    rating: 5.0,
    reviews: 23,
    price: "$99",
    instructor: {
      name: "Lic. Ana Patricia López",
      title: "Directora de Turismo Sostenible",
      avatar: "/placeholder.svg?key=instructor4",
      experience: "25 años en turismo",
    },
    image: "/cloud-forest-mountain-nicaragua-birds.jpg",
    progress: 0,
    enrolled: false,
    certificate: true,
    certification: "Certificación oficial INTUR",
    accessibility: ["Completa accesibilidad", "Múltiples formatos"],
    topics: [
      "Marco legal del turismo",
      "Técnicas de guiado",
      "Primeros auxilios",
      "Gestión de grupos",
      "Emprendimiento turístico",
    ],
  },
  {
    id: 5,
    title: "Identificación de Aves por Plumaje",
    description: "Aprende a identificar aves por sus patrones de plumaje, tamaño y forma.",
    level: "Principiante",
    duration: "3 semanas",
    lessons: 12,
    students: 900,
    rating: 4.5,
    reviews: 70,
    price: "Gratuito",
    instructor: {
      name: "Juan Pérez",
      title: "Guía de campo",
      avatar: "/placeholder.svg?key=instructor5",
      experience: "10 años de experiencia",
    },
    image: "/placeholder.svg?key=plumaje",
    progress: 0,
    enrolled: false,
    certificate: false,
    accessibility: ["Visual", "Descripciones detalladas"],
    topics: [
      "Morfología de las aves",
      "Patrones de coloración",
      "Diferencias entre especies",
      "Guías de campo",
      "Uso de binoculares",
    ],
  },
  {
    id: 6,
    title: "Ecología y Comportamiento Aviar",
    description: "Explora la ecología, el comportamiento y las interacciones de las aves en sus ecosistemas.",
    level: "Intermedio",
    duration: "5 semanas",
    lessons: 20,
    students: 550,
    rating: 4.7,
    reviews: 30,
    price: "$35",
    instructor: {
      name: "Dra. Laura Gómez",
      title: "Ecóloga aviar",
      avatar: "/placeholder.svg?key=instructor6",
      experience: "18 años de investigación",
    },
    image: "/placeholder.svg?key=ecologia",
    progress: 0,
    enrolled: false,
    certificate: true,
    accessibility: ["Subtítulos", "Ejemplos visuales"],
    topics: [
      "Nicho ecológico",
      "Migración de aves",
      "Reproducción y crianza",
      "Comunicación aviar",
      "Impacto humano",
    ],
  },
]

const certifications = [
  {
    id: 1,
    title: "Aviturista Básico",
    description: "Conocimientos fundamentales sobre aves de Nicaragua",
    requirements: ["Completar curso de Fundamentos", "Aprobar examen final"],
    badge: "/placeholder.svg?key=badge1",
    earned: true,
    date: "15 de noviembre, 2024",
  },
  {
    id: 2,
    title: "Especialista en Conservación",
    description: "Experto en especies endémicas y conservación",
    requirements: ["Completar curso de Aves Endémicas", "Proyecto de conservación"],
    badge: "/placeholder.svg?key=badge2",
    earned: false,
    progress: 35,
  },
  {
    id: 3,
    title: "Guía Certificado INTUR",
    description: "Certificación oficial para guías de aviturismo",
    requirements: ["Completar programa profesional", "Examen práctico", "Evaluación en campo"],
    badge: "/placeholder.svg?key=badge3",
    earned: false,
    progress: 0,
  },
  {
    id: 4,
    title: "Identificador de Aves Avanzado",
    description: "Habilidad para identificar aves complejas por plumaje, canto y comportamiento.",
    requirements: ["Completar curso de Identificación por Plumaje", "Examen de campo", "Portafolio de avistamientos"],
    badge: "/placeholder.svg?key=badge4",
    earned: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Experto en Ecología Aviar",
    description: "Dominio de los principios ecológicos y el comportamiento de las aves.",
    requirements: ["Completar curso de Ecología y Comportamiento", "Presentación de investigación"],
    badge: "/placeholder.svg?key=badge5",
    earned: false,
    progress: 0,
  },
]

export default function CursosPage() {
  const [selectedLevel, setSelectedLevel] = useState("todos")
  const [activeTab, setActiveTab] = useState("cursos")

  const filteredCourses =
    selectedLevel === "todos" ? courses : courses.filter((course) => course.level.toLowerCase() === selectedLevel)

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "principiante":
        return "bg-green-100 text-green-800"
      case "intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "avanzado":
        return "bg-orange-100 text-orange-800"
      case "profesional":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academia de Aviturismo</h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Cursos especializados y certificaciones oficiales para convertirte en un experto aviturista
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cursos" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cursos Disponibles
            </TabsTrigger>
            <TabsTrigger value="certificaciones" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cursos">
            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedLevel === "todos" ? "default" : "outline"}
                  onClick={() => setSelectedLevel("todos")}
                  size="sm"
                >
                  Todos los niveles
                </Button>
                <Button
                  variant={selectedLevel === "principiante" ? "default" : "outline"}
                  onClick={() => setSelectedLevel("principiante")}
                  size="sm"
                >
                  Principiante
                </Button>
                <Button
                  variant={selectedLevel === "intermedio" ? "default" : "outline"}
                  onClick={() => setSelectedLevel("intermedio")}
                  size="sm"
                >
                  Intermedio
                </Button>
                <Button
                  variant={selectedLevel === "avanzado" ? "default" : "outline"}
                  onClick={() => setSelectedLevel("avanzado")}
                  size="sm"
                >
                  Avanzado
                </Button>
                <Button
                  variant={selectedLevel === "profesional" ? "default" : "outline"}
                  onClick={() => setSelectedLevel("profesional")}
                  size="sm"
                >
                  Profesional
                </Button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {course.price}
                      </Badge>
                    </div>
                    {course.enrolled && course.progress > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progreso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{course.instructor.name}</p>
                        <p className="text-xs text-gray-600">{course.instructor.title}</p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{course.lessons} lecciones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{course.students} estudiantes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>
                          {course.rating} ({course.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Topics Preview */}
                    <div>
                      <p className="font-medium text-sm mb-2">Temas principales:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.topics.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Accessibility Features */}
                    <div>
                      <p className="font-medium text-sm mb-2">Accesibilidad:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.accessibility.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {course.enrolled ? (
                        <Link href={`/educacion/cursos/${course.id}`} className="flex-1">
                          <Button className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Continuar Curso
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/educacion/cursos/${course.id}`} className="flex-1">
                          <Button className="w-full">Inscribirse</Button>
                        </Link>
                      )}
                      <Button variant="outline" size="icon">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>

                    {course.certificate && (
                      <div className="flex items-center gap-2 text-sm text-emerald-600">
                        <Award className="h-4 w-4" />
                        <span>Incluye certificado de finalización</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificaciones">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">Certificaciones Disponibles</h2>
              <p className="text-gray-600 max-w-3xl">
                Obtén certificaciones oficiales que validen tus conocimientos y habilidades en aviturismo. Estas
                certificaciones son reconocidas por instituciones turísticas y de conservación.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card
                  key={cert.id}
                  className={`relative overflow-hidden ${cert.earned ? "border-emerald-200 bg-emerald-50" : ""}`}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {cert.earned ? (
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Lock className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Requisitos:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {cert.earned ? (
                      <div className="text-center">
                        <Badge className="bg-emerald-100 text-emerald-800 mb-2">Obtenida el {cert.date}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Globe className="h-4 w-4 mr-2" />
                            Verificar
                          </Button>
                        </div>
                      </div>
                    ) : (cert.progress ?? 0) > 0 ? (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progreso</span>
                          <span>{cert.progress}%</span>
                        </div>
                        <Progress value={cert.progress} className="mb-2" />
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Continuar
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Bloqueada
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}