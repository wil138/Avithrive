import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, MapPin, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const globalRankings = [
  {
    rank: 1,
    user: {
      name: "Elena Vargas",
      username: "@elena_birds",
      avatar: "/placeholder.svg?key=elena",
      location: "Managua",
    },
    points: 4250,
    species: 287,
    excursions: 45,
    badges: ["Experta", "Fotógrafa", "Guía"],
  },
  {
    rank: 2,
    user: {
      name: "Roberto Silva",
      username: "@roberto_aviturista",
      avatar: "/placeholder.svg?key=roberto",
      location: "Granada",
    },
    points: 3890,
    species: 245,
    excursions: 38,
    badges: ["Experto", "Explorador", "Conservacionista"],
  },
  {
    rank: 3,
    user: {
      name: "María González",
      username: "@maria_birds",
      avatar: "/placeholder.svg?key=maria",
      location: "Matagalpa",
    },
    points: 3650,
    species: 234,
    excursions: 42,
    badges: ["Experta", "Educadora"],
  },
  {
    rank: 4,
    user: {
      name: "Carlos Mendoza",
      username: "@carlos_aviturista",
      avatar: "/placeholder.svg?key=carlos",
      location: "León",
    },
    points: 3420,
    species: 198,
    excursions: 35,
    badges: ["Avanzado", "Fotógrafo"],
  },
  {
    rank: 5,
    user: {
      name: "Ana Rodríguez",
      username: "@ana_naturaleza",
      avatar: "/placeholder.svg?key=ana",
      location: "Estelí",
    },
    points: 3180,
    species: 189,
    excursions: 29,
    badges: ["Avanzada", "Principiante del Año"],
  },
]

const regionalRankings = [
  { region: "Managua", leader: "Elena Vargas", points: 4250, participants: 342 },
  { region: "Granada", leader: "Roberto Silva", points: 3890, participants: 298 },
  { region: "Matagalpa", leader: "María González", points: 3650, participants: 267 },
  { region: "León", leader: "Carlos Mendoza", points: 3420, participants: 234 },
  { region: "Estelí", leader: "Ana Rodríguez", points: 3180, participants: 189 },
]

const monthlyAchievements = [
  {
    user: "Elena Vargas",
    achievement: "Primera en avistar Quetzal Resplandeciente este mes",
    points: 500,
    date: "15 Nov 2024",
  },
  {
    user: "Roberto Silva",
    achievement: "Completó excursión nocturna en Los Guatuzos",
    points: 300,
    date: "12 Nov 2024",
  },
  {
    user: "María González",
    achievement: "Fotografió 25 especies diferentes en una semana",
    points: 400,
    date: "10 Nov 2024",
  },
]

export function CommunityRankings() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global">Ranking Global</TabsTrigger>
          <TabsTrigger value="regional">Por Región</TabsTrigger>
          <TabsTrigger value="achievements">Logros del Mes</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Avituristas de Nicaragua
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalRankings.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12">{getRankIcon(entry.rank)}</div>

                    <Avatar className="h-12 w-12">
                      <AvatarImage src={entry.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {entry.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{entry.user.name}</h4>
                        <div className="flex space-x-1">
                          {entry.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{entry.user.username}</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {entry.user.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{entry.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">puntos</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold">{entry.species}</div>
                      <div className="text-xs text-gray-500">especies</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold">{entry.excursions}</div>
                      <div className="text-xs text-gray-500">excursiones</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalRankings.map((region) => (
              <Card key={region.region}>
                <CardHeader>
                  <CardTitle className="text-lg">{region.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Líder regional:</span>
                      <span className="font-semibold">{region.leader}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Puntos:</span>
                      <span className="font-semibold text-emerald-600">{region.points.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Participantes:</span>
                      <span className="font-semibold">{region.participants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Logros Destacados de Noviembre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.user}</h4>
                      <p className="text-sm text-gray-600">{achievement.achievement}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">+{achievement.points}</div>
                      <div className="text-xs text-gray-500">puntos</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
