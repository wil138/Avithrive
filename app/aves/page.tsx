"use client"

import { Suspense, useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Grid, List } from "lucide-react"
import { BirdGrid } from "@/components/bird-grid"
import { BirdFilters } from "@/components/bird-filters"
import { BirdStats } from "@/components/bird-stats"

export default function AvesPage() {
  const [allBirds, setAllBirds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch('/birds.json')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return
        setAllBirds(data || [])
      })
      .catch(() => setAllBirds([]))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])
  const [search, setSearch] = useState("")
  const [habitat, setHabitat] = useState<string | null>(null)
  const [rarity, setRarity] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [seenBirds, setSeenBirds] = useState<Set<number>>(new Set([1, 3, 4]))
  const [favoriteBirds, setFavoriteBirds] = useState<Set<number>>(new Set([1, 2]))

  const toggleSeen = (id: number) => {
    setSeenBirds((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  const toggleFavorite = (id: number) => {
    setFavoriteBirds((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  const filteredBirds = useMemo(() => {
    let list = [...allBirds]

    // Apply BirdFilters categories (region, colors, size)
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (!values || values.length === 0) return
      // status handled separately below
      if (key === "status") return
      list = list.filter((b) => {
        const val = (b as any)[key]
        if (Array.isArray(val)) {
          return values.every((v) => val.includes(v))
        }
        if (typeof val === "string") {
          return values.some((v) => val.toLowerCase().includes(v.toLowerCase()))
        }
        return true
      })
    })

    // Handle status filter (Vista, Pendiente, Favorita)
    const statusFilters = activeFilters["status"]
    if (statusFilters && statusFilters.length > 0) {
      list = list.filter((b) => {
        // if any status filter passes the bird, keep it
        return statusFilters.some((st) => {
          if (st === "Vista") return seenBirds.has(b.id)
          if (st === "Favorita") return favoriteBirds.has(b.id)
          if (st === "Pendiente") return !seenBirds.has(b.id)
          return true
        })
      })
    }

    if (habitat && habitat !== "all") {
      const normalized = habitat.replace(/-/g, " ").toLowerCase()
      list = list.filter((b) => b.habitat?.toLowerCase().includes(normalized))
    }

    if (rarity && rarity !== "all") {
      // map UI values to dataset rarity text
      const mapRarity = (r: string) => {
        switch (r) {
          case "comun":
            return "Común"
          case "poco-comun":
            return "Poco común"
          case "rara":
            return "Rara"
          case "endemica":
            return "Endémica"
          default:
            return r
        }
      }
      const wanted = mapRarity(rarity)
      list = list.filter((b) => b.rarity === wanted)
    }

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (b) => b.commonName.toLowerCase().includes(q) || b.scientificName.toLowerCase().includes(q),
      )
    }

    if (sortBy) {
      if (sortBy === "name") list.sort((a, b) => a.commonName.localeCompare(b.commonName))
      if (sortBy === "name-desc") list.sort((a, b) => b.commonName.localeCompare(a.commonName))
      if (sortBy === "rarity") list.sort((a, b) => a.rarity.localeCompare(b.rarity))
    }

    return list
  }, [search, habitat, rarity, sortBy, activeFilters, allBirds, seenBirds, favoriteBirds])

  const count = filteredBirds.length

  return (
    <div className="min-h-scree">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Catálogo de Aves de Nicaragua</h1>
          <p className="text-xl text-green-100 max-w-2xl text-pretty">
            Descubre las 342 especies de aves documentadas en nuestro país, desde el majestuoso Quetzal hasta el
            colorido Guardabarranco
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Bird Statistics */}
        <Suspense fallback={<div>Cargando estadísticas...</div>}>
          <BirdStats />
        </Suspense>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Especies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
                    placeholder="Buscar por nombre común o científico..."
                    className="pl-10"
                  />
                </div>
              </div>

              <Select onValueChange={(v) => setHabitat(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Hábitat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los hábitats</SelectItem>
                  <SelectItem value="bosque-nuboso">Bosque nuboso</SelectItem>
                  <SelectItem value="bosque-seco">Bosque seco</SelectItem>
                  <SelectItem value="manglar">Manglar</SelectItem>
                  <SelectItem value="humedal">Humedal</SelectItem>
                  <SelectItem value="volcanico">Volcánico</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setRarity(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Rareza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las especies</SelectItem>
                  <SelectItem value="comun">Común</SelectItem>
                  <SelectItem value="poco-comun">Poco común</SelectItem>
                  <SelectItem value="rara">Rara</SelectItem>
                  <SelectItem value="endemica">Endémica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Suspense fallback={<div>Cargando filtros...</div>}>
              <BirdFilters onChange={(f) => setActiveFilters(f)} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{count} especies encontradas</h2>
            <p className="text-gray-600">Mostrando resultados filtrados</p>
          </div>

          <div className="flex items-center gap-2">
            <Select onValueChange={(v) => setSortBy(v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="name-desc">Nombre Z-A</SelectItem>
                <SelectItem value="rarity">Rareza</SelectItem>
                <SelectItem value="habitat">Hábitat</SelectItem>
                <SelectItem value="recently-seen">Visto recientemente</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button variant="ghost" size="sm" className="rounded-r-none">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-l-none">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bird Grid */}
        <Suspense fallback={<div>Cargando catálogo de aves...</div>}>
          <BirdGrid
            items={filteredBirds}
            seenBirds={seenBirds}
            favoriteBirds={favoriteBirds}
            onToggleSeen={toggleSeen}
            onToggleFavorite={toggleFavorite}
          />
        </Suspense>
      </div>
    </div>
  )
}
