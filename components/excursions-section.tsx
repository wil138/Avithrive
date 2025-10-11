import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star, Filter } from "lucide-react"

const excursions = [
  {
    id: 1,
    title: "Amanecer en Volcán Mombacho",
    location: "Reserva Natural Volcán Mombacho",
    duration: "6 horas",
    difficulty: "Moderado",
    price: "$45",
    rating: 4.8,
    reviews: 124,
    maxParticipants: 12,
    currentParticipants: 8,
    image: "/mombacho-volcano-sunrise-mist-forest-birds.jpg",
    highlights: ["Quetzal Resplandeciente", "Guardabarranco", "Tucán Pico Iris"],
    nextDate: "18 Dic 2024",
  },
  {
    id: 2,
    title: "Manglar de Estero Padre Ramos",
    location: "Reserva Natural Estero Padre Ramos",
    duration: "4 horas",
    difficulty: "Fácil",
    price: "$35",
    rating: 4.9,
    reviews: 89,
    maxParticipants: 15,
    currentParticipants: 12,
    image: "/mangrove-estuary-birds-herons-nicaragua-coast.jpg",
    highlights: ["Garza Tricolor", "Ibis Blanco", "Martín Pescador"],
    nextDate: "20 Dic 2024",
  },
  {
    id: 3,
    title: "Bosque Nuboso de Miraflor",
    location: "Reserva Natural Miraflor",
    duration: "8 horas",
    difficulty: "Difícil",
    price: "$65",
    rating: 4.7,
    reviews: 67,
    maxParticipants: 10,
    currentParticipants: 6,
    image: "/cloud-forest-miraflor-mist-mountains-birds-nicarag.jpg",
    highlights: ["Quetzal", "Colibrí Esmeralda", "Tangara Dorada"],
    nextDate: "25 Dic 2024",
  },
]

export function ExcursionsSection() {
  return (
    <section id="excursiones" className="py-16">
      <div className="container-fluid px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            <MapPin className="w-3 h-3 mr-1" />
            Excursiones
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Aventuras Guiadas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explora los ecosistemas más diversos de Nicaragua con guías expertos locales.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button variant="outline" size="sm">
            <Filter className="w-3 h-3 mr-1" />
            Todos
          </Button>
          <Button variant="outline" size="sm">
            Fácil
          </Button>
          <Button variant="outline" size="sm">
            Moderado
          </Button>
          <Button variant="outline" size="sm">
            Difícil
          </Button>
          <Button variant="outline" size="sm">
            Bosque
          </Button>
          <Button variant="outline" size="sm">
            Costa
          </Button>
          <Button variant="outline" size="sm">
            Montaña
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {excursions.map((excursion) => (
            <Card key={excursion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={excursion.image || "/placeholder.svg"}
                  alt={excursion.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${
                      excursion.difficulty === "Fácil"
                        ? "bg-emerald-500 text-white"
                        : excursion.difficulty === "Moderado"
                          ? "bg-amber-500 text-white"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {excursion.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-900 font-bold">{excursion.price}</Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{excursion.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{excursion.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{excursion.rating}</span>
                    <span className="text-muted-foreground">({excursion.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>{excursion.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>
                      {excursion.currentParticipants}/{excursion.maxParticipants}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Especies destacadas:</p>
                  <div className="flex flex-wrap gap-1">
                    {excursion.highlights.map((species, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Próxima fecha: <span className="font-medium">{excursion.nextDate}</span>
                </div>

                <Button className="w-full">Reservar Excursión</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline">
            Ver Todas las Excursiones
          </Button>
        </div>
      </div>
    </section>
  )
}
