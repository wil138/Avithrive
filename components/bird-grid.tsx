"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Heart, Volume2, MapPin, Camera, Star, Calendar } from "lucide-react"
import Image from "next/image"

export const birds = [
  {
    id: 1,
    commonName: "Guardabarranco",
    scientificName: "Eumomota superciliosa",
    image: "/guardabarranco-bird-nicaragua-national.jpg",
    habitat: "Bosque seco",
    region: "Todo el país",
    rarity: "Común",
    status: "Residente",
    type: "Endémica regional",
    description: "Ave nacional de Nicaragua, conocida por su cola en forma de raqueta y colores vibrantes.",
    colors: ["Verde", "Azul", "Marrón"],
    size: "Mediano",
    audio: true,
    photos: 234,
    lastSeen: "hace 2 días",
    bestMonths: ["Abril", "Mayo", "Junio"],
    conservationStatus: "LC",
  },
  {
    id: 2,
    commonName: "Quetzal Resplandeciente",
    scientificName: "Pharomachrus mocinno",
    image: "/quetzal-bird-green-red-guatemala-nicaragua.jpg",
    habitat: "Bosque nuboso",
    region: "Matagalpa, Jinotega",
    rarity: "Rara",
    status: "Residente",
    type: "Endémica regional",
    description: "Una de las aves más hermosas del mundo, símbolo de libertad en Mesoamérica.",
    colors: ["Verde", "Rojo"],
    size: "Grande",
    audio: true,
    photos: 89,
    lastSeen: "hace 1 semana",
    bestMonths: ["Marzo", "Abril", "Mayo"],
    conservationStatus: "NT",
  },
  {
    id: 3,
    commonName: "Tucán Pico Iris",
    scientificName: "Ramphastos sulfuratus",
    image: "/toucan-colorful-beak-tropical-bird.jpg",
    habitat: "Bosque húmedo",
    region: "RACCS, Río San Juan",
    rarity: "Poco común",
    status: "Residente",
    type: "Nativa",
    description: "Tucán de gran tamaño con pico multicolor característico.",
    colors: ["Negro", "Amarillo", "Multicolor"],
    size: "Grande",
    audio: true,
    photos: 156,
    lastSeen: "hace 5 días",
    bestMonths: ["Febrero", "Marzo", "Abril"],
    conservationStatus: "LC",
  },
  {
    id: 4,
    commonName: "Colibrí Garganta Rubí",
    scientificName: "Archilochus colubris",
    image: "/ruby-throated-hummingbird-red-green.jpg",
    habitat: "Jardines, bosque",
    region: "Todo el país",
    rarity: "Común",
    status: "Migratoria",
    type: "Migratoria",
    description: "Pequeño colibrí migratorio con garganta roja brillante en los machos.",
    colors: ["Verde", "Rojo"],
    size: "Muy pequeño",
    audio: false,
    photos: 445,
    lastSeen: "ayer",
    bestMonths: ["Octubre", "Noviembre", "Diciembre", "Enero"],
    conservationStatus: "LC",
  },
  {
    id: 5,
    commonName: "Lapa Verde",
    scientificName: "Ara ambiguus",
    image: "/great-green-macaw-parrot-nicaragua-endangered.jpg",
    habitat: "Bosque húmedo",
    region: "RACCS, Río San Juan",
    rarity: "Endémica",
    status: "Residente",
    type: "Endémica nacional",
    description: "Guacamayo en peligro de extinción, una de las especies más emblemáticas.",
    colors: ["Verde", "Rojo", "Azul"],
    size: "Muy grande",
    audio: true,
    photos: 67,
    lastSeen: "hace 2 semanas",
    bestMonths: ["Enero", "Febrero", "Marzo"],
    conservationStatus: "EN",
  },
  {
    id: 6,
    commonName: "Pájaro Campana",
    scientificName: "Procnias tricarunculatus",
    image: "/three-wattled-bellbird-white-brown.jpg",
    habitat: "Bosque nuboso",
    region: "Matagalpa, Jinotega",
    rarity: "Rara",
    status: "Residente",
    type: "Nativa",
    description: "Ave conocida por su canto metálico que puede escucharse a kilómetros.",
    colors: ["Blanco", "Marrón"],
    size: "Mediano",
    audio: true,
    photos: 23,
    lastSeen: "hace 3 semanas",
    bestMonths: ["Abril", "Mayo"],
    conservationStatus: "VU",
  },
  {
    id: 7,
    commonName: "Momoto Cejiazul",
    scientificName: "Aspatha gularis",
    image: "/blue-crowned-motmot-nicaragua-endemic.jpg",
    habitat: "Bosque húmedo montano",
    region: "Norte de Nicaragua",
    rarity: "Endémica",
    status: "Residente",
    type: "Endémica nacional",
    description: "Especie endémica de Nicaragua, habita únicamente en los bosques montanos del norte.",
    colors: ["Azul", "Verde", "Negro"],
    size: "Mediano",
    audio: true,
    photos: 45,
    lastSeen: "hace 1 semana",
    bestMonths: ["Marzo", "Abril", "Mayo"],
    conservationStatus: "EN",
  },
  {
    id: 8,
    commonName: "Reinita Migratoria",
    scientificName: "Setophaga ruticilla",
    image: "/american-redstart-warbler-migratory.jpg",
    habitat: "Bosques mixtos",
    region: "Todo el país (temporal)",
    rarity: "Común",
    status: "Migratoria",
    type: "Migratoria",
    description: "Pequeña reinita que migra desde Norteamérica durante el invierno.",
    colors: ["Negro", "Naranja", "Blanco"],
    size: "Pequeño",
    audio: true,
    photos: 178,
    lastSeen: "hace 3 días",
    bestMonths: ["Octubre", "Noviembre", "Diciembre", "Enero", "Febrero"],
    conservationStatus: "LC",
  },
]

export function BirdGrid({
  items,
  seenBirds: externalSeenBirds,
  favoriteBirds: externalFavoriteBirds,
  onToggleSeen,
  onToggleFavorite,
}: {
  items?: typeof birds
  seenBirds?: Set<number>
  favoriteBirds?: Set<number>
  onToggleSeen?: (id: number) => void
  onToggleFavorite?: (id: number) => void
}) {
  const displayed = items ?? birds

  const [internalSeen, setInternalSeen] = useState<Set<number>>(new Set([1, 3, 4]))
  const [internalFav, setInternalFav] = useState<Set<number>>(new Set([1, 2]))

  const seenBirds = externalSeenBirds ?? internalSeen
  const favoriteBirds = externalFavoriteBirds ?? internalFav

  const toggleSeen = (birdId: number) => {
    if (onToggleSeen) return onToggleSeen(birdId)
    setInternalSeen((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(birdId)) newSet.delete(birdId)
      else newSet.add(birdId)
      return newSet
    })
  }

  const toggleFavorite = (birdId: number) => {
    if (onToggleFavorite) return onToggleFavorite(birdId)
    setInternalFav((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(birdId)) newSet.delete(birdId)
      else newSet.add(birdId)
      return newSet
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Común":
        return "bg-green-100 text-green-800 border-green-200"
      case "Poco común":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rara":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Endémica":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConservationColor = (status: string) => {
    switch (status) {
      case "LC":
        return "bg-green-100 text-green-800"
      case "NT":
        return "bg-yellow-100 text-yellow-800"
      case "VU":
        return "bg-orange-100 text-orange-800"
      case "EN":
        return "bg-red-100 text-red-800"
      case "CR":
        return "bg-red-200 text-red-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Endémica nacional":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Endémica regional":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Migratoria":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Nativa":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {displayed.map((bird) => (
        <Card
          key={bird.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative">
            <Image
              src={bird.image || "/placeholder.svg"}
              alt={bird.commonName}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />

            {/* Status Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className={getRarityColor(bird.rarity)}>{bird.rarity}</Badge>
              <Badge className={getTypeColor(bird.type)}>{bird.type}</Badge>
              {seenBirds.has(bird.id) && <Badge className="bg-emerald-100 text-emerald-800">Vista</Badge>}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => toggleFavorite(bird.id)}>
                <Heart className={`h-4 w-4 ${favoriteBirds.has(bird.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => toggleSeen(bird.id)}>
                {seenBirds.has(bird.id) ? <Eye className="h-4 w-4 text-emerald-600" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>

            {/* Audio Indicator */}
            {bird.audio && (
              <div className="absolute bottom-3 right-3">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Conservation Status */}
            <div className="absolute bottom-3 left-3">
              <Badge className={getConservationColor(bird.conservationStatus)}>{bird.conservationStatus}</Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{bird.commonName}</h3>
                <p className="text-sm italic text-gray-600">{bird.scientificName}</p>
              </div>

              <p className="text-sm text-gray-700 text-pretty line-clamp-2">{bird.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{bird.region}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Hábitat: {bird.habitat}</span>
                  <span>Tamaño: {bird.size}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 mr-1" />
                    <span>{bird.photos} fotos</span>
                  </div>
                  <span>Visto {bird.lastSeen}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Mejor época: {bird.bestMonths.slice(0, 2).join(", ")}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {bird.colors.map((color) => (
                  <Badge key={color} variant="outline" className="text-xs">
                    {color}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/aves/${bird.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    Ver detalles
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
