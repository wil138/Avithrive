"use client"

import React, { useMemo, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card } from "@/components/ui/card"

interface Excursion {
  id: number
  title: string
  location: string
  difficulty?: string
  duration?: string
  price?: string
  rating?: number
  reviews?: number
}

interface ExcursionMapProps {
  excursions: Excursion[]
}

function getCoords(location: string): [number, number] {
  const loc = (location || "").toLowerCase()
  if (loc.includes("granada")) return [11.9315, -85.9569]
  if (loc.includes("chinandega")) return [12.6294, -87.1576]
  if (loc.includes("matagalpa")) return [12.9167, -85.9167]
  if (loc.includes("río san juan") || loc.includes("rio san juan")) return [11.0833, -84.8333]
  if (loc.includes("masaya")) return [11.9670, -86.0946]
  if (loc.includes("estel")) return [13.0849, -86.3533]

  // Fallback: center of Nicaragua
  return [12.865416, -85.207229]
}

export function ExcursionMap({ excursions }: ExcursionMapProps) {
  const [selectedExcursion, setSelectedExcursion] = useState<number | null>(null)

  const points = useMemo(
    () => excursions.map((e) => ({ ...e, coords: getCoords(e.location) })),
    [excursions]
  )

  const center: [number, number] = points.length ? points[0].coords : [12.865416, -85.207229]

  const createIcon = (selected = false) =>
    L.divIcon({
      className: "",
      html: `<div style="width:18px;height:18px;background:${selected ? "#065f46" : "#059669"};border-radius:50%;box-shadow:0 0 0 4px rgba(5,150,105,0.12);"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })

  return (
    <div className="space-y-4">
      <div className="w-full h-72">
        <MapContainer center={center} zoom={7} scrollWheelZoom={true} className="w-full h-full rounded-lg shadow-xl">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((p) => (
            <Marker
              key={p.id}
              position={p.coords}
              icon={createIcon(selectedExcursion === p.id)}
              eventHandlers={{
                click: () => setSelectedExcursion(p.id),
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">{p.location}</div>
                  {p.price && <div className="text-sm">Precio: {p.price}</div>}
                  {p.rating !== undefined && <div className="text-sm">⭐ {p.rating}</div>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Lista de ubicaciones */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">Reservas disponibles:</h4>
        {excursions.map((excursion) => (
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
