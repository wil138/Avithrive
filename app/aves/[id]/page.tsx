"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Heart,
  Eye,
  EyeOff,
  Volume2,
  MapPin,
  Camera,
  Calendar,
  Users,
  Star,
  Share2,
  Download,
} from "lucide-react"

// Mock data - in real app this would come from API
const birdDetails = {
  1: {
    id: 1,
    commonName: "Guardabarranco",
    scientificName: "Eumomota superciliosa",
    family: "Momotidae",
    order: "Coraciiformes",
    images: ["/guardabarranco-bird-nicaragua.jpg", "/guardabarranco-nest.jpg", "/guardabarranco-flying.jpg"],
    habitat: "Bosque seco",
    region: "Todo el país",
    rarity: "Común",
    status: "Residente",
    description:
      "El Guardabarranco es el ave nacional de Nicaragua, conocida por su cola distintiva en forma de raqueta y sus colores vibrantes. Habita en bosques secos y áreas abiertas, donde excava túneles en barrancos para anidar.",
    detailedDescription:
      "Esta hermosa ave pertenece a la familia Momotidae y es endémica de América Central. Su nombre proviene de su hábito de anidar en barrancos, excavando túneles de hasta un metro de profundidad. Los adultos miden entre 34-38 cm de longitud y pesan aproximadamente 65 gramos.",
    physicalCharacteristics: {
      length: "34-38 cm",
      weight: "65 g",
      wingspan: "45-50 cm",
      colors: ["Verde esmeralda", "Azul turquesa", "Marrón canela", "Negro"],
      sexualDimorphism: "Mínimo - ambos sexos similares",
    },
    behavior: {
      diet: "Insectos, pequeños reptiles, frutas",
      nesting: "Túneles en barrancos de tierra",
      breeding: "Marzo a julio",
      social: "Parejas o grupos pequeños",
    },
    distribution: {
      global: "México a Costa Rica",
      nicaragua: "Todo el territorio nacional",
      altitude: "0-1,200 msnm",
      habitat: ["Bosque seco tropical", "Áreas abiertas con árboles", "Bordes de bosque"],
    },
    conservation: {
      status: "Preocupación menor (LC)",
      threats: ["Deforestación", "Pérdida de hábitat"],
      population: "Estable",
    },
    bestSpots: ["Reserva Natural Volcán Masaya", "Parque Nacional Saslaya", "Reserva Silvestre Privada Domitila"],
    seasonality: {
      resident: true,
      breeding: "Marzo-Julio",
      bestMonths: ["Abril", "Mayo", "Junio"],
    },
    photos: 234,
    recordings: 12,
    sightings: 1250,
    lastSeen: "hace 2 días",
  },
}

export default function BirdDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSeen, setIsSeen] = useState(true)

  const birdId = Number.parseInt(params.id as string)
  const bird = birdDetails[birdId as keyof typeof birdDetails]

  if (!bird) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ave no encontrada</h1>
          <Button onClick={() => router.push("/aves")}>Volver al catálogo</Button>
        </div>
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
              onClick={() => router.push("/aves")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{bird.commonName}</h1>
              <p className="text-xl italic text-emerald-100">{bird.scientificName}</p>
              <p className="text-emerald-200">
                {bird.family} • {bird.order}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30">{bird.rarity}</Badge>
              <Badge className="bg-white/20 text-white border-white/30">{bird.status}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={bird.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${bird.commonName} - Imagen ${currentImageIndex + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />

                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      {bird.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setIsFavorite(!isFavorite)}>
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setIsSeen(!isSeen)}>
                      {isSeen ? <Eye className="h-4 w-4 text-emerald-600" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 border-t">
                  <div className="flex gap-2 overflow-x-auto">
                    {bird.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? "border-emerald-500" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Miniatura ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="physical">Físico</TabsTrigger>
                <TabsTrigger value="behavior">Comportamiento</TabsTrigger>
                <TabsTrigger value="distribution">Distribución</TabsTrigger>
                <TabsTrigger value="conservation">Conservación</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">{bird.description}</p>
                    <p className="text-gray-700 leading-relaxed">{bird.detailedDescription}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="physical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Características Físicas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">Longitud</p>
                        <p className="text-gray-600">{bird.physicalCharacteristics.length}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Peso</p>
                        <p className="text-gray-600">{bird.physicalCharacteristics.weight}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Envergadura</p>
                        <p className="text-gray-600">{bird.physicalCharacteristics.wingspan}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Colores</p>
                      <div className="flex flex-wrap gap-2">
                        {bird.physicalCharacteristics.colors.map((color) => (
                          <Badge key={color} variant="outline">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">Dimorfismo Sexual</p>
                      <p className="text-gray-600">{bird.physicalCharacteristics.sexualDimorphism}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comportamiento y Ecología</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900">Dieta</p>
                      <p className="text-gray-600">{bird.behavior.diet}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Anidación</p>
                      <p className="text-gray-600">{bird.behavior.nesting}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Época de Reproducción</p>
                      <p className="text-gray-600">{bird.behavior.breeding}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Comportamiento Social</p>
                      <p className="text-gray-600">{bird.behavior.social}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="distribution" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución y Hábitat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900">Distribución Global</p>
                      <p className="text-gray-600">{bird.distribution.global}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">En Nicaragua</p>
                      <p className="text-gray-600">{bird.distribution.nicaragua}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Altitud</p>
                      <p className="text-gray-600">{bird.distribution.altitude}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Hábitats Preferidos</p>
                      <div className="flex flex-wrap gap-2">
                        {bird.distribution.habitat.map((habitat) => (
                          <Badge key={habitat} variant="secondary">
                            {habitat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mapa de Distribución</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-8 text-center">
                      <MapPin className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
                      <p className="text-gray-600">Mapa interactivo de distribución</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Próximamente: mapa detallado con avistamientos recientes
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conservation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estado de Conservación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900">Estado UICN</p>
                      <Badge className="bg-green-100 text-green-800">{bird.conservation.status}</Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Población</p>
                      <p className="text-gray-600">{bird.conservation.population}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Amenazas</p>
                      <div className="flex flex-wrap gap-2">
                        {bird.conservation.threats.map((threat) => (
                          <Badge key={threat} variant="destructive">
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Fotografías</span>
                  </div>
                  <span className="font-semibold">{bird.photos}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Grabaciones</span>
                  </div>
                  <span className="font-semibold">{bird.recordings}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Avistamientos</span>
                  </div>
                  <span className="font-semibold">{bird.sightings}</span>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    Último avistamiento: <span className="font-medium">{bird.lastSeen}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Best Viewing Spots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Mejores Lugares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bird.bestSpots.map((spot, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium">{spot}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seasonality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Temporalidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Mejores meses para observar</p>
                  <div className="flex flex-wrap gap-1">
                    {bird.seasonality.bestMonths.map((month) => (
                      <Badge key={month} className="bg-emerald-100 text-emerald-800">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Época de reproducción</p>
                  <p className="text-sm text-gray-600">{bird.seasonality.breeding}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Ficha
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Unirse a Grupo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
