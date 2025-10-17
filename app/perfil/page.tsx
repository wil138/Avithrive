"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, MapPin, Calendar, Camera, Award, TrendingUp, Settings, Edit, Share2, Phone, User } from "lucide-react"

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const userProfile = {
    name: user?.name ?? "N/A",
    username: user?.username ? (user.username.startsWith('@') ? user.username : `@${user.username}`) : "N/A",
    level: user?.level ?? 1,
    title: user?.title ?? "Observador",
    points: user?.points ?? 0,
    nextLevelPoints: user?.nextLevelPoints ?? (user?.points ?? 0) + 1000,
    joinDate: user?.joinDate ?? "N/A",
    location: user?.location ?? "N/A",
    avatar: user?.avatar ?? undefined,
    phone: user?.phone ?? "N/A",
    age: user?.age ?? null,
    bio: user?.bio ?? "Perfil nuevo. Completa tu información para personalizar tu perfil.",
    stats: {
      speciesSeen: user?.stats?.speciesSeen ?? 0,
      totalSpecies: user?.stats?.totalSpecies ?? 0,
      excursionsCompleted: user?.stats?.excursionsCompleted ?? 0,
      photosShared: user?.stats?.photosShared ?? 0,
      postsCreated: user?.stats?.postsCreated ?? 0,
      helpedUsers: user?.stats?.helpedUsers ?? 0,
      identificationAccuracy: user?.stats?.identificationAccuracy ?? undefined,
    },
  }

  // Helper: generate an SVG data URL with initials (used when no avatar URL is provided)
  const generateInitialsDataUrl = (fullName: string, size = 128) => {
    const parts = (fullName || "").split(" ").filter(Boolean)
    // Use first and last name initials when available (e.g., "Roberto Silva" -> "RS").
    // If only one name is present, use its first letter.
    let initials = "N"
    if (parts.length === 1) initials = (parts[0][0] || "N").toUpperCase()
    else initials = ((parts[0][0] || "N") + (parts[parts.length - 1][0] || "A")).toUpperCase()

    const bg = "#065f46" // emerald-700
    const fg = "#ffffff"
    const fontSize = Math.round(size / 2.8)

    const svg = `<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>\n  <rect width='100%' height='100%' fill='${bg}' rx='${Math.round(size * 0.16)}'/>\n  <text x='50%' y='50%' dy='0.36em' font-family='Arial, Helvetica, sans-serif' font-size='${fontSize}' fill='${fg}' text-anchor='middle'>${initials}</text>\n</svg>`

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  // Prefer a real avatar image only when it's not a placeholder.
  // Many placeholder images include the word "placeholder" or similar query keys.
  const isPlaceholderAvatar = (url?: string) => {
    if (!url) return true
    try {
      return /placeholder/i.test(url) || url.trim() === "" || url.includes("/placeholder")
    } catch (e) {
      return true
    }
  }

  const avatarSrc = userProfile.avatar && !isPlaceholderAvatar(userProfile.avatar)
    ? userProfile.avatar
    : generateInitialsDataUrl(userProfile.name)

  const badges = user?.badges ?? [
    { name: "Primera Observación", icon: "🔍", earned: true, date: "Mar 2023" },
    { name: "Explorador", icon: "🗺️", earned: true, date: "Abr 2023" },
  ]

  const recentSightings = user?.recentSightings ?? []

  const achievements = user?.achievements ?? []

  const favoriteLocations = user?.favoriteLocations ?? []
  const specializations = user?.specializations ?? []

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50"><div className="container mx-auto px-4 py-8">Loading...</div></div>
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={avatarSrc} alt={userProfile.name} />
                <AvatarFallback className="text-2xl bg-emerald-700">
                  {(() => {
                    const parts = userProfile.name.split(" ").filter(Boolean)
                    if (parts.length === 0) return "N"
                    if (parts.length === 1) return (parts[0][0] || "N").toUpperCase()
                    const first = (parts[0][0] || "N").toUpperCase()
                    const last = (parts[parts.length - 1][0] || "A").toUpperCase()
                    return `${first}${last}`
                  })()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                  <Badge className="bg-white/20 text-white w-fit">
                    Nivel {userProfile.level} - {userProfile.title}
                  </Badge>
                </div>
                <p className="text-emerald-100 mb-2">{userProfile.username}</p>
                <p className="text-emerald-100 mb-4 text-pretty">{userProfile.bio}</p>

                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {userProfile.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Miembro desde {userProfile.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {userProfile.phone ?? "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {userProfile.points} puntos
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="mt-6 bg-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progreso al Nivel {userProfile.level + 1}</span>
                <span className="text-sm">
                  {userProfile.points}/{userProfile.nextLevelPoints}
                </span>
              </div>
              <Progress value={(userProfile.points / userProfile.nextLevelPoints) * 100} className="bg-white/20" />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="sightings">Avistamientos</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">{userProfile.stats.speciesSeen}</div>
                      <div className="text-sm text-gray-600">Especies Vistas</div>
                      <div className="text-xs text-gray-500 mt-1">de {userProfile.stats.totalSpecies} totales</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-teal-600 mb-2">
                        {userProfile.stats.excursionsCompleted}
                      </div>
                      <div className="text-sm text-gray-600">Excursiones</div>
                      <div className="text-xs text-gray-500 mt-1">Completadas</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{userProfile.stats.photosShared}</div>
                      <div className="text-sm text-gray-600">Fotos</div>
                      <div className="text-xs text-gray-500 mt-1">Compartidas</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Sightings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Avistamientos Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSightings.length === 0 ? (
                        <div className="text-center text-gray-500">No hay avistamientos recientes</div>
                      ) : (
                        recentSightings.map((sighting: any, index: number) => (
                          <div key={index} className="flex items-center gap-4 p-3rounded-lg">
                            <img
                              src={sighting.photo || "/placeholder.svg"}
                              alt={sighting.species}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-emerald-800">{sighting.species}</h4>
                              <p className="text-sm text-gray-600 italic">{sighting.scientificName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{sighting.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  sighting.rarity === "Raro"
                                    ? "destructive"
                                    : sighting.rarity === "Poco Común"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {sighting.rarity}
                              </Badge>
                              <div className="text-xs text-gray-500 mt-1">{sighting.date}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Badges Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Insignias Ganadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {badges.map((badge: any, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-center transition-all ${
                            badge.earned
                              ? "bg-emerald-100 border-2 border-emerald-300"
                              : "bg-gray-100 border-2 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="text-2xl mb-1">{badge.icon ?? '🏅'}</div>
                          <div className="text-xs font-medium">{badge.name}</div>
                          {badge.earned && <div className="text-xs text-emerald-600 mt-1">{badge.date}</div>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Estadísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Publicaciones</span>
                      <span className="font-semibold">{userProfile.stats.postsCreated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Usuarios Ayudados</span>
                      <span className="font-semibold">{userProfile.stats.helpedUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Progreso General</span>
                      <span className="font-semibold">
                        {Math.round((userProfile.stats.speciesSeen / Math.max(1, userProfile.stats.totalSpecies)) * 100)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Logros Desbloqueados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.length === 0 ? (
                      <div className="text-center text-gray-500">No hay logros registrados</div>
                    ) : (
                      achievements.map((achievement: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                          <div className="p-2 bg-emerald-600 rounded-full">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-emerald-800">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                          <Badge className="bg-emerald-600">+{achievement.points} pts</Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración de Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Panel de configuración próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
