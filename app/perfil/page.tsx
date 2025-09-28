"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, MapPin, Calendar, Camera, Award, TrendingUp, Settings, Edit, Share2 } from "lucide-react"

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userProfile = {
    name: "María Elena Rodríguez",
    username: "@maria_aviturista",
    level: 4,
    title: "Observadora Experta",
    points: 2850,
    nextLevelPoints: 3500,
    joinDate: "Marzo 2023",
    location: "Managua, Nicaragua",
    avatar: "/professional-woman-birdwatcher-nicaragua.jpg",
    bio: "Apasionada por las aves desde la infancia. Me especializo en aves acuáticas y rapaces. Siempre dispuesta a compartir conocimientos con nuevos avituristas.",
    stats: {
      speciesSeen: 187,
      totalSpecies: 500,
      excursionsCompleted: 23,
      photosShared: 156,
      postsCreated: 45,
      helpedUsers: 89,
    },
  }

  const badges = [
    { name: "Primera Observación", icon: "🔍", earned: true, date: "Mar 2023" },
    { name: "Explorador", icon: "🗺️", earned: true, date: "Abr 2023" },
    { name: "Fotógrafo", icon: "📸", earned: true, date: "May 2023" },
    { name: "Mentor", icon: "👥", earned: true, date: "Jun 2023" },
    { name: "Conservacionista", icon: "🌿", earned: true, date: "Jul 2023" },
    { name: "Especialista en Rapaces", icon: "🦅", earned: true, date: "Ago 2023" },
    { name: "Madrugador", icon: "🌅", earned: false, date: null },
    { name: "Aventurero Nocturno", icon: "🌙", earned: false, date: null },
  ]

  const recentSightings = [
    {
      species: "Guardabarranco",
      scientificName: "Eumomota superciliosa",
      location: "Reserva Natural Volcán Mombacho",
      date: "2024-01-15",
      photo: "/guardabarranco-bird-nicaragua.jpg",
      rarity: "Común",
    },
    {
      species: "Quetzal Resplandeciente",
      scientificName: "Pharomachrus mocinno",
      location: "Reserva Natural Miraflor",
      date: "2024-01-12",
      photo: "/quetzal-bird-nicaragua.jpg",
      rarity: "Raro",
    },
    {
      species: "Tucán Pico Iris",
      scientificName: "Ramphastos sulfuratus",
      location: "Reserva Indio Maíz",
      date: "2024-01-10",
      photo: "/toucan-bird-nicaragua.jpg",
      rarity: "Poco Común",
    },
  ]

  const achievements = [
    { title: "Primer Avistamiento", description: "Registraste tu primera observación", points: 50 },
    { title: "Explorador Dedicado", description: "Visitaste 10 reservas diferentes", points: 200 },
    { title: "Fotógrafo Experto", description: "Compartiste 100 fotografías de aves", points: 300 },
    { title: "Mentor Comunitario", description: "Ayudaste a 50 nuevos avituristas", points: 500 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                <AvatarFallback className="text-2xl bg-emerald-700">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
                    <Calendar className="h-4 w-4" />
                    Miembro desde {userProfile.joinDate}
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
                      {recentSightings.map((sighting, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
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
                      ))}
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
                      {badges.map((badge, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-center transition-all ${
                            badge.earned
                              ? "bg-emerald-100 border-2 border-emerald-300"
                              : "bg-gray-100 border-2 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="text-2xl mb-1">{badge.icon}</div>
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
                        {Math.round((userProfile.stats.speciesSeen / userProfile.stats.totalSpecies) * 100)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sightings Tab */}
          <TabsContent value="sightings">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Avistamientos</CardTitle>
                <CardDescription>Todas tus observaciones de aves registradas en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Funcionalidad de historial completo próximamente</p>
                </div>
              </CardContent>
            </Card>
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
                    {achievements.map((achievement, index) => (
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
                    ))}
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
