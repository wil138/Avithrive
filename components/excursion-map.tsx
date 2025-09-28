"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation } from "lucide-react"

interface Excursion {
  id: number
  title: string
  location: string
  difficulty: string
  price: string
  rating: number
}

interface ExcursionMapProps {
  excursions: Excursion[]
}

export function ExcursionMap({ excursions }: ExcursionMapProps) {
  const [selectedExcursion, setSelectedExcursion] = useState<number | null>(null)

  // Coordenadas aproximadas de las reservas en Nicaragua
  const locations = [
    { id: 1, name: "Volcán Mombacho", lat: 11.8267, lng: -85.9847, region: "Granada" },
    { id: 2, name: "Estero Padre Ramos", lat: 12.7833, lng: -87.4167, region: "Chinandega" },
    { id: 3, name: "Cerro Apante", lat: 12.9167, lng: -85.9167, region: "Matagalpa" },
    { id: 4, name: "Los Guatuzos", lat: 11.0833, lng: -84.8333, region: "Río San Juan" },
  ]

  return (
    <div className="space-y-4">
      {/* Mapa placeholder - En producción se usaría Mapbox o Google Maps */}
      <div className="relative h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/nicaragua-map-outline.jpg')] bg-center bg-no-repeat bg-contain opacity-20" />

        {/* Marcadores de ubicación */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
              selectedExcursion === location.id ? "scale-125 z-10" : "hover:scale-110"
            }`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
            onClick={() => setSelectedExcursion(selectedExcursion === location.id ? null : location.id)}
          >
            <div className={`relative ${selectedExcursion === location.id ? "text-emerald-600" : "text-emerald-500"}`}>
              <MapPin className="h-8 w-8 drop-shadow-lg" fill="currentColor" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <Badge variant="secondary" className="text-xs">
                  {location.region}
                </Badge>
              </div>
            </div>
          </div>
        ))}

        {/* Leyenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span>Reservas naturales</span>
          </div>
        </div>

        {/* Brújula */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Navigation className="h-5 w-5 text-gray-600" />
        </div>
      </div>

      {/* Lista de ubicaciones */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">Reservas disponibles:</h4>
        {excursions.map((excursion, index) => (
          <Card
            key={excursion.id}
            className={`p-3 cursor-pointer transition-colors ${
              selectedExcursion === excursion.id ? "bg-emerald-50 border-emerald-200" : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedExcursion(selectedExcursion === excursion.id ? null : excursion.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-medium text-sm">{excursion.title}</h5>
                <p className="text-xs text-gray-600">{excursion.location}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-emerald-600">{excursion.price}</div>
                <div className="text-xs text-gray-500">★ {excursion.rating}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
