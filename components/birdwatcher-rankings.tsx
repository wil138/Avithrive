import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

const topBirdwatchers = [
  {
    id: 1,
    name: "María González",
    location: "Managua",
    points: 2850,
    level: 8,
    speciesCount: 127,
    avatar: "/female-birdwatcher-profile.jpg",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "Granada",
    points: 2640,
    level: 7,
    speciesCount: 115,
    avatar: "/male-birdwatcher-profile.jpg",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    location: "León",
    points: 2420,
    level: 7,
    speciesCount: 108,
    avatar: "/female-nature-guide-profile.jpg",
  },
]

export function BirdwatcherRankings() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
            <Trophy className="w-3 h-3 mr-1" />
            Rankings
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Observadores Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conoce a los observadores de aves más activos de nuestra comunidad y sus increíbles logros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {topBirdwatchers.map((birdwatcher, index) => (
            <Card
              key={birdwatcher.id}
              className={`relative overflow-hidden ${index === 0 ? "ring-2 ring-amber-400 shadow-lg" : ""}`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 px-3 py-1 text-xs font-bold rounded-bl-lg">
                  #1
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  {index === 0 && <Trophy className="w-6 h-6 text-amber-500 mb-2" />}
                  {index === 1 && <Medal className="w-6 h-6 text-gray-400 mb-2" />}
                  {index === 2 && <Award className="w-6 h-6 text-amber-600 mb-2" />}
                </div>

                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={birdwatcher.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {birdwatcher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <CardTitle className="text-lg">{birdwatcher.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{birdwatcher.location}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Nivel</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    {birdwatcher.level}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Puntos</span>
                  <span className="font-bold text-emerald-600">{birdwatcher.points.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Especies</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="font-semibold">{birdwatcher.speciesCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
