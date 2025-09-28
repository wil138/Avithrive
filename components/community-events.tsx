import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Clock, Camera, Award, Binary as Binoculars } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Gran Conteo de Aves de Invierno",
    type: "Concurso",
    date: "2025-12-15",
    time: "06:00 AM",
    location: "Reserva Natural Volcán Mombacho",
    organizer: {
      name: "Elena Vargas",
      avatar: "/placeholder.svg?key=elena",
    },
    participants: 24,
    maxParticipants: 30,
    difficulty: "Intermedio",
    description:
      "Únete al conteo anual de aves migratorias. Competencia amistosa para identificar la mayor cantidad de especies en 6 horas.",
    prizes: ["Binoculares profesionales", "Guía de aves de Nicaragua", "Certificado de participación"],
    requirements: ["Binoculares propios", "Experiencia básica en identificación", "Registro previo obligatorio"],
  },
  {
    id: 2,
    title: "Caminata Nocturna: Aves Rapaces",
    type: "Excursión",
    date: "2025-11-28",
    time: "07:00 PM",
    location: "Refugio de Vida Silvestre Los Guatuzos",
    organizer: {
      name: "Roberto Silva",
      avatar: "/placeholder.svg?key=roberto",
    },
    participants: 8,
    maxParticipants: 12,
    difficulty: "Avanzado",
    description: "Experiencia única para observar búhos, lechuzas y otras aves nocturnas en su hábitat natural.",
    requirements: ["Linterna con luz roja", "Ropa oscura", "Experiencia en caminatas nocturnas"],
  },
  {
    id: 3,
    title: "Taller de Fotografía de Aves",
    type: "Educativo",
    date: "2025-12-02",
    time: "08:00 AM",
    location: "Centro de Visitantes Chocoyero",
    organizer: {
      name: "María González",
      avatar: "/placeholder.svg?key=maria",
    },
    participants: 15,
    maxParticipants: 20,
    difficulty: "Principiante",
    description: "Aprende técnicas básicas y avanzadas para fotografiar aves en su entorno natural.",
    requirements: ["Cámara digital o smartphone", "Ganas de aprender"],
  },
]

const pastEvents = [
  {
    id: 4,
    title: "Festival de Aves Migratorias",
    date: "2024-10-15",
    participants: 45,
    winner: "Carlos Mendoza",
    species: 67,
    photos: 234,
  },
  {
    id: 5,
    title: "Maratón de Avistamiento",
    date: "2025-09-22",
    participants: 32,
    winner: "Ana Rodríguez",
    species: 89,
    photos: 156,
  },
]

export function CommunityEvents() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "Concurso":
        return <Award className="h-5 w-5 text-yellow-500" />
      case "Excursión":
        return <Binoculars className="h-5 w-5 text-emerald-500" />
      case "Educativo":
        return <Camera className="h-5 w-5 text-blue-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getEventIcon(event.type)}
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <Badge variant="outline">{event.type}</Badge>
                        <Badge className={getDifficultyColor(event.difficulty)}>{event.difficulty}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button>Unirse al evento</Button>
                </div>

                <p className="text-gray-700 mb-4 text-pretty">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants}/{event.maxParticipants} participantes
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {event.organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">Organizado por {event.organizer.name}</span>
                    </div>
                  </div>
                </div>

                {event.requirements && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Requisitos:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.prizes && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Premios:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {event.prizes.map((prize, index) => (
                        <li key={index} className="flex items-center">
                          <Award className="h-3 w-3 mr-2 text-yellow-500" />
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Pasados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString("es-ES")} • {event.participants} participantes
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">Ganador: {event.winner}</div>
                  <div className="text-xs text-gray-600">
                    {event.species} especies • {event.photos} fotos
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
