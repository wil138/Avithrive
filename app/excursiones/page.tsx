import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"
import { ExcursionMap } from "@/components/excursion-map"
import { ExcursionCard } from "@/components/excursion-card"

const excursions = [
  {
    id: 1,
    title: "Reserva Natural Volcán Mombacho",
    location: "Granada, Nicaragua",
    difficulty: "Intermedio",
    duration: "6 horas",
    price: "$45",
    rating: 4.8,
    reviews: 124,
    image: "/volcanic-forest-canopy-nicaragua.jpg",
    species: ["Quetzal", "Tucán", "Colibrí", "Guardabarranco"],
    description: "Explora el bosque nuboso del volcán Mombacho y descubre especies endémicas en este ecosistema único.",
    highlights: ["Canopy tour", "Senderos interpretativos", "Mirador panorámico"],
    groupSize: "4-12 personas",
  },
  {
    id: 2,
    title: "Reserva Natural Estero Padre Ramos",
    location: "Chinandega, Nicaragua",
    difficulty: "Fácil",
    duration: "4 horas",
    price: "$35",
    rating: 4.6,
    reviews: 89,
    image: "/mangrove-estuary-birds-nicaragua.jpg",
    species: ["Ibis", "Garza", "Pelícano", "Martín Pescador"],
    description: "Navegación por manglares para observar aves acuáticas y especies migratorias.",
    highlights: ["Paseo en kayak", "Observación de aves acuáticas", "Ecosistema de manglar"],
    groupSize: "2-8 personas",
  },
  {
    id: 3,
    title: "Reserva Natural Cerro Apante",
    location: "Matagalpa, Nicaragua",
    difficulty: "Avanzado",
    duration: "8 horas",
    price: "$55",
    rating: 4.9,
    reviews: 156,
    image: "/cloud-forest-mountain-nicaragua-birds.jpg",
    species: ["Quetzal Resplandeciente", "Pájaro Campana", "Tangara", "Colibrí Garganta Rubí"],
    description: "Caminata desafiante por bosque nuboso con oportunidad de avistar el esquivo Quetzal Resplandeciente.",
    highlights: ["Bosque nuboso", "Especies endémicas", "Fotografía especializada"],
    groupSize: "3-6 personas",
  },
  {
    id: 4,
    title: "Refugio de Vida Silvestre Los Guatuzos",
    location: "Río San Juan, Nicaragua",
    difficulty: "Fácil",
    duration: "5 horas",
    price: "$40",
    rating: 4.7,
    reviews: 98,
    image: "/wetland-wildlife-refuge-nicaragua.jpg",
    species: ["Lapa Verde", "Tucán Pico Iris", "Mono Aullador", "Caimán"],
    description: "Excursión fluvial por humedales tropicales con abundante vida silvestre.",
    highlights: ["Navegación fluvial", "Vida silvestre diversa", "Humedales tropicales"],
    groupSize: "6-15 personas",
  },
  {
    id: 5,
    title: "Parque Nacional Volcán Masaya",
    location: "Masaya, Nicaragua",
    difficulty: "Intermedio",
    duration: "6 horas",
    price: "$50",
    rating: 4.5,
    reviews: 110,
    image: "https://www.visitcentroamerica.com/wp-content/uploads/2025/04/Masaya-Volcano-National-Park-Nicaragua-03.webp",
    species: ["Búho Cornudo", "Crested Guan", "Colibrí Cola de Espátula", "Halcón Peregrino"],
    description: "Explora el volcán activo y sus alrededores, hogar de diversas especies de aves rapaces y endémicas.",
    highlights: ["Cráter del volcán", "Aves rapaces", "Paisajes volcánicos"],
    groupSize: "4-10 personas",

  },
  {
    id: 6,
    title: "Reserva Natural Laguna de Apoyo",
    location: "Granada, Nicaragua",
    difficulty: "Fácil",
    duration: "4 horas",
    price: "$30",
    rating: 4.6,
    reviews: 75,
    image: "https://www.marena.gob.ni/wp-content/uploads/2022/09/01-1024x683.jpg",
    species: ["Garza Azul", "Cotorra", "Martín Pescador", "Trogón"],
    description: "Paseo relajante alrededor de la laguna volcánica con oportunidades para observar aves acuáticas y forestales.",
    highlights: ["Paseo en bote", "Aves acuáticas", "Senderos naturales"],
    groupSize: "2-10 personas",
  },
  {
    id: 7,
    title: "Reserva Natural Miraflor",
    location: "Estelí, Nicaragua",
    difficulty: "Avanzado",
    duration: "7 horas",
    price: "$60",
    rating: 4.9,
    reviews: 140,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/5a/5f/01/reserva-natural-miraflor.jpg?w=1200&h=-1&s=1",
    species: ["Quetzal", "Pájaro Campana", "Tangara Multicolor", "Colibrí Esmeralda"],
    description: "Caminata por bosques montañosos ricos en biodiversidad, ideal para avistamiento de aves endémicas.",
    highlights: ["Bosque montañoso", "Especies endémicas", "Fotografía de aves"],
    groupSize: "3-8 personas",
  },
  {
    id: 8,
    title: "Refugio de Vida Silvestre Chocoyero-El Brujo",
    location: "Granada, Nicaragua",
    difficulty: "Fácil",
    duration: "5 horas",
    price: "$35",
    rating: 4.7,
    reviews: 85,
    image: "https://vianica.com/files/imgi/550/5016.jpg",
    species: ["Chocoyo", "Guaraguao", "Colibrí Cola de Espátula", "Trogón"],
    description: "Excursión por senderos bien mantenidos en un refugio cercano a la ciudad, ideal para familias.",
    highlights: ["Cascadas", "Aves locales", "Senderos accesibles"],
    groupSize: "2-12 personas",
  },
  {
    id: 9,
    title: "Reserva Natural Indio Maíz",
    location: "Río San Juan, Nicaragua",
    difficulty: "Avanzado",
    duration: "9 horas",
    price: "$70",
    rating: 5.0,
    reviews: 160,
    image: "https://www.mapanicaragua.com/wp-content/uploads/2020/06/Reserva-Indio-Maiz-Nicaragua.jpg",
    species: ["Guacamayo Rojo", "Tucán Pico Iris", "Mono Araña", "Caimán Negro"],
    description: "Aventura en una de las reservas más grandes y biodiversas de Nicaragua, hogar de especies raras y exóticas.",
    highlights: ["Selva tropical", "Especies raras", "Aventura ecológica"],
    groupSize: "4-10 personas",
  }
]

const regions = ["Todas las regiones", "Granada", "Chinandega", "Matagalpa", "Río San Juan", "León", "Estelí"]
const difficulties = ["Todos los niveles", "Fácil", "Intermedio", "Avanzado"]
const habitats = ["Todos los hábitats", "Bosque nuboso", "Manglar", "Humedal", "Bosque seco", "Volcánico"]

export default function ExcursionesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Excursiones de Aviturismo</h1>
          <p className="text-xl text-emerald-100 max-w-2xl text-pretty">
            Descubre la increíble diversidad de aves de Nicaragua en nuestras reservas naturales
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Región</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region.toLowerCase()}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Dificultad</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel de dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty.toLowerCase()}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hábitat</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de hábitat" />
                  </SelectTrigger>
                  <SelectContent>
                    {habitats.map((habitat) => (
                      <SelectItem key={habitat} value={habitat.toLowerCase()}>
                        {habitat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar especie</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Ej: Quetzal, Tucán..." className="pl-10" />
                </div>
              </div>
            </div>

            <Button className="w-full md:w-auto">Aplicar filtros</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Excursions List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold ">{excursions.length} excursiones disponibles</h2>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor valoradas</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="duration">Duración</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {excursions.map((excursion) => (
              <ExcursionCard key={excursion.id} excursion={excursion} />
            ))}
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Mapa de Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Cargando mapa...</div>
                  }
                >
                  <ExcursionMap excursions={excursions} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
