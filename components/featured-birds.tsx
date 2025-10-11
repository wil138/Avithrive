import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Heart, Share2 } from "lucide-react"

const featuredBirds = [
  {
    id: 1,
    name: "Guardabarranco",
    scientificName: "Eumomota superciliosa",
    status: "Ave Nacional",
    location: "Reserva Natural Volcán Mombacho",
    image: "/guardabarranco-nicaragua-national-bird-colorful.jpg",
    rarity: "Común",
    lastSeen: "Hace 2 horas",
  },
  {
    id: 2,
    name: "Quetzal Resplandeciente",
    scientificName: "Pharomachrus mocinno",
    status: "En Peligro",
    location: "Reserva Natural Miraflor",
    image: "/quetzal-bird-green-red-tropical-nicaragua.jpg",
    rarity: "Muy Raro",
    lastSeen: "Hace 1 día",
  },
  {
    id: 3,
    name: "Tucán Pico Iris",
    scientificName: "Ramphastos sulfuratus",
    status: "Protegida",
    location: "Reserva Indio Maíz",
    image: "/toucan-colorful-beak-tropical-bird-nicaragua.jpg",
    rarity: "Poco Común",
    lastSeen: "Hace 5 horas",
  },
]

export function FeaturedBirds() {
  return (
    <section id="aves" className="py-16">
      <div className="container-fluid px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
            <Camera className="w-3 h-3 mr-1" />
            Especies Destacadas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Aves de Nicaragua</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubre la increíble diversidad de aves que habitan en nuestros bosques, montañas y costas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBirds.map((bird) => (
            <Card key={bird.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={bird.image || "/placeholder.svg"} alt={bird.name} className="w-full h-72 object-cover px-2" />
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${
                      bird.rarity === "Muy Raro"
                        ? "bg-red-500 text-white"
                        : bird.rarity === "Poco Común"
                          ? "bg-amber-500 text-white"
                          : "bg-emerald-500 text-white"
                    }`}
                  >
                    {bird.rarity}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{bird.name}</CardTitle>
                <p className="text-sm text-muted-foreground italic">{bird.scientificName}</p>
                <Badge variant="outline" className="w-fit text-xs">
                  {bird.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{bird.location}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Último avistamiento:</span>
                  <span className="font-medium">{bird.lastSeen}</span>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Explorar Todas las Especies
          </Button>
        </div>
      </div>
    </section>
  )
}
