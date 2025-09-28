import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Share2, Calendar, Users, MapPin } from "lucide-react"

const communityPosts = [
  {
    id: 1,
    author: "Elena Vargas",
    avatar: "/female-birdwatcher-profile.jpg",
    time: "Hace 3 horas",
    location: "Reserva Natural Estero Padre Ramos",
    content: "¡Increíble avistamiento de una Garza Tricolor en el manglar! Es la primera vez que veo una en esta zona.",
    image: "/tricolor-heron-mangrove-nicaragua.jpg",
    likes: 24,
    comments: 8,
    species: "Garza Tricolor",
  },
  {
    id: 2,
    author: "Roberto Jiménez",
    avatar: "/male-nature-photographer-profile.jpg",
    time: "Hace 1 día",
    location: "Parque Nacional Volcán Masaya",
    content: "Familia de Chocoyos Verde disfrutando del amanecer. La paciencia valió la pena para esta toma.",
    image: "/green-parrots-family-sunrise-volcanic-landscape.jpg",
    likes: 45,
    comments: 12,
    species: "Chocoyo Verde",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Conteo de Aves Migratorias",
    date: "15 Dic 2024",
    time: "6:00 AM",
    location: "Laguna de Apoyo",
    participants: 23,
    maxParticipants: 30,
  },
  {
    id: 2,
    title: "Taller de Fotografía de Aves",
    date: "22 Dic 2024",
    time: "8:00 AM",
    location: "Reserva Natural Volcán Mombacho",
    participants: 15,
    maxParticipants: 20,
  },
]

export function CommunitySection() {
  return (
    <section id="comunidad" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Users className="w-3 h-3 mr-1" />
            Comunidad
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Conecta con Otros Observadores</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comparte tus avistamientos, aprende de expertos y participa en eventos de conservación.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Posts */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Publicaciones Recientes</h3>

            {communityPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{post.author}</h4>
                        <Badge variant="outline" className="text-xs">
                          {post.species}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{post.time}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{post.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm">{post.content}</p>

                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Avistamiento de ave"
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-emerald-500">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Próximos Eventos</h3>

            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {event.participants}/{event.maxParticipants} participantes
                    </span>
                  </div>

                  <Button className="w-full mt-4" size="sm">
                    Unirse al Evento
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              Ver Todos los Eventos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
