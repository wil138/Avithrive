"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const filterOptions = {
  region: [
    "Managua",
    "Granada",
    "Masaya",
    "Carazo",
    "Rivas",
    "León",
    "Chinandega",
    "Estelí",
    "Madriz",
    "Nueva Segovia",
    "Jinotega",
    "Matagalpa",
    "Boaco",
    "Chontales",
    "Río San Juan",
    "RACCS",
    "RACCN",
  ],
  colors: [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Negro",
    "Blanco",
    "Gris",
    "Marrón",
    "Naranja",
    "Violeta",
    "Rosa",
    "Multicolor",
  ],
  size: ["Muy pequeño", "Pequeño", "Mediano", "Grande", "Muy grande"],
  status: ["Vista", "Pendiente", "Favorita"],
}

export function BirdFilters({
  onChange,
}: {
  onChange?: (activeFilters: Record<string, string[]>) => void
}) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  useEffect(() => {
    onChange?.(activeFilters)
  }, [activeFilters, onChange])

  const addFilter = (category: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), value],
    }))
  }

  const removeFilter = (category: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((v) => v !== value),
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({})
  }

  const hasActiveFilters = Object.values(activeFilters).some((filters) => filters.length > 0)

  return (
    <div className="space-y-4">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filtros activos:</span>
          {Object.entries(activeFilters).map(([category, values]) =>
            values.map((value) => (
              <Badge key={`${category}-${value}`} variant="secondary" className="flex items-center gap-1">
                {value}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(category, value)} />
              </Badge>
            )),
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Limpiar todo
          </Button>
        </div>
      )}

      {/* Filter Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 capitalize">
              {category === "region"
                ? "Región"
                : category === "colors"
                  ? "Color predominante"
                  : category === "size"
                    ? "Tamaño"
                    : "Estado"}
            </h4>

            {/* Dropdown (multiple) for selecting filter options */}
            <select
              multiple
              value={activeFilters[category] ?? []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value)
                setActiveFilters((prev) => {
                  const next = { ...prev, [category]: selected }
                  // Remove empty arrays to keep state clean
                  Object.keys(next).forEach((k) => {
                    if (!next[k] || next[k].length === 0) delete next[k]
                  })
                  return next
                })
              }}
              className="w-full h-24 border rounded p-2 text-sm "
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
