import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Download } from "lucide-react"

const educationalContent = [
  {
    id: 1,
    title: "Guía Interactiva de Aves",
    type: "Guía Digital",
    description:
      "Aprende a identificar las 50 especies más comunes de Nicaragua con sonidos, imágenes y características.",
    image: "/interactive-bird-guide-nicaragua-species-identific.jpg",
    difficulty: "Principiante",
    duration: "30 min",
    accessibility: true,
  },
  {
    id: 2,
    title: "Juego de Memoria: Cantos de Aves",
    type: "Juego Educativo",
    description:
      "Desarrolla tu oído musical identificando los cantos únicos de cada especie. Perfecto para niños y adultos.",
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Fácil",
    duration: "15 min",
    accessibility: true,
  },
  {
    id: 3,
    title: "Simulador de Ecosistemas",
    type: "Simulación",
    description:
      "Explora cómo las aves interactúan en diferentes ecosistemas nicaragüenses y aprende sobre conservación.",
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermedio",
    duration: "45 min",
    accessibility: false,
  },
]

const achievements = [
  { name: "Primer Avistamiento", icon: "🔍", description: "Registra tu primera observación" },
  { name: "Explorador", icon: "🗺️", description: "Visita 5 reservas diferentes" },
  { name: "Experto en Cantos", icon: "🎵", description: "Identifica 20 especies por su canto" },
  { name: "Conservacionista", icon: "🌱", description: "Participa en 3 eventos de conservación" },
]

export function EducationalSection() {
  return (
    <section id="educacion" className="py-16">
      <div className="container-fluid px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
            <BookOpen className="w-3 h-3 mr-1" />
            Educación
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Aprende Jugando</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Recursos educativos inclusivos diseñados para todas las edades y capacidades cognitivas.
          </p>
        </div>

        {/* Educational Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {educationalContent.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={content.image || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-500 text-white">{content.type}</Badge>
                </div>
                {content.accessibility && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-emerald-500 text-white text-xs">Accesible</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{content.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dificultad:</span>
                  <Badge variant="outline" className="text-xs">
                    {content.difficulty}
                  </Badge>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-medium">{content.duration}</span>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    <Play className="w-3 h-3 mr-1" />
                    Jugar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-card rounded-lg p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Sistema de Logros</h3>
            <p className="text-muted-foreground">
              Desbloquea insignias mientras aprendes y contribuyes a la conservación
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-4">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold mb-1">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2 text-emerald-800 dark:text-emerald-200">
              Características de Accesibilidad
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300">
              Diseñado para ser inclusivo y accesible para personas con discapacidades cognitivas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Navegación simplificada</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Instrucciones claras y visuales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Retroalimentación positiva</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Ritmo adaptable</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Contenido multimedia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Soporte de lectura en voz alta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
