"use client"

import { useState, useEffect } from "react"
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
  Weight,
} from "lucide-react"
// Load birds data from public/birds.json at runtime (client-side fetch)

// Use shared birds array (catalog) as source; page will apply safe fallbacks for missing nested fields

export default function BirdDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSeen, setIsSeen] = useState(true)

  const birdId = Number.parseInt(params.id as string)
  const [raw, setRaw] = useState<any | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  // fetch birds.json then find by id
  useEffect(() => {
    let mounted = true
    fetch('/birds.json')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return
        const found = Array.isArray(data) ? data.find((b: any) => Number(b.id) === birdId) : undefined
        setRaw(found)
      })
      .catch(() => setRaw(undefined))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [birdId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    )
  }

  // adapter: create a consistent richer bird object with safe defaults for the page
  const bird = raw
    ? {
        id: raw.id,
        commonName: raw.commonName,
        scientificName: raw.scientificName || "",
        family: (raw as any).family || "",
        order: (raw as any).order || "",
        images: Array.isArray(raw.images) && raw.images.length ? raw.images : raw.image ? [raw.image] : ["/placeholder.svg"],
        habitat: raw.habitat || "",
        region: raw.region || "",
        rarity: raw.rarity || "",
        status: raw.status || "",
        description: raw.description || "",
        detailedDescription: (raw as any).detailedDescription || raw.description || "",
        physicalCharacteristics: (raw as any).physicalCharacteristics || {
          length: "-",
          weight: "-",
          wingspan: "-",
          colors: raw.colors || [],
          sexualDimorphism: "-",
        },
        behavior: (raw as any).behavior || {
          diet: "-",
          nesting: "-",
          breeding: "-",
          social: "-",
        },
        distribution: (raw as any).distribution || {
          global: "-",
          nicaragua: raw.region || "-",
          altitude: "-",
          habitat: raw.habitat ? [raw.habitat] : [],
        },
        conservation: (raw as any).conservation || {
          status: raw.conservationStatus || "-",
          threats: (raw as any).conservation?.threats || [],
          population: (raw as any).conservation?.population || "-",
        },
        bestSpots: (raw as any).bestSpots || [],
        seasonality: (raw as any).seasonality || {
          resident: true,
          breeding: "-",
          bestMonths: raw.bestMonths || [],
        },
        photos: raw.photos || 0,
        recordings: (raw as any).recordings || 0,
        sightings: (raw as any).sightings || 0,
        lastSeen: raw.lastSeen || "",
      }
    : undefined

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
                    className="w-full h-96 object-contain rounded-t-lg"
                  />

                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      {bird.images.map((_: string, index: number) => (
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
                    {bird.images.map((image: string, index: number) => (
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
                        {bird.physicalCharacteristics.colors.map((color: string) => (
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
                        {bird.distribution.habitat.map((habitat: string) => (
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
                        {bird.conservation.threats.map((threat: string) => (
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
                  {bird.bestSpots.map((spot: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg">
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
                    {bird.seasonality.bestMonths.map((month: string) => (
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
