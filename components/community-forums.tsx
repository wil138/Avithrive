import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Pin, TrendingUp, HelpCircle, Camera, MapPin } from "lucide-react"

const forumCategories = [
  {
    id: 1,
    name: "Identificación de Aves",
    description: "Ayuda para identificar especies avistadas",
    icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
    topics: 234,
    posts: 1567,
    lastActivity: "hace 15 min",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 2,
    name: "Fotografía de Aves",
    description: "Técnicas, equipos y consejos fotográficos",
    icon: <Camera className="h-5 w-5 text-purple-500" />,
    topics: 189,
    posts: 892,
    lastActivity: "hace 32 min",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 3,
    name: "Ubicaciones y Rutas",
    description: "Mejores lugares para avistar especies",
    icon: <MapPin className="h-5 w-5 text-emerald-500" />,
    topics: 156,
    posts: 743,
    lastActivity: "hace 1 hora",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: 4,
    name: "Principiantes",
    description: "Guías y consejos para nuevos avituristas",
    icon: <Users className="h-5 w-5 text-orange-500" />,
    topics: 98,
    posts: 456,
    lastActivity: "hace 2 horas",
    color: "bg-orange-50 border-orange-200",
  },
]

const recentTopics = [
  {
    id: 1,
    title: "¿Alguien ha visto Quetzales en Mombacho últimamente?",
    category: "Ubicaciones y Rutas",
    author: {
      name: "Carlos Mendoza",
      avatar: "/placeholder.svg?key=carlos",
      level: "Avanzado",
    },
    replies: 12,
    views: 89,
    lastReply: "hace 20 min",
    isPinned: false,
    isHot: true,
  },
  {
    id: 2,
    title: "Configuración de cámara para fotografía de colibríes",
    category: "Fotografía de Aves",
    author: {
      name: "María González",
      avatar: "/placeholder.svg?key=maria",
      level: "Experta",
    },
    replies: 8,
    views: 156,
    lastReply: "hace 45 min",
    isPinned: true,
    isHot: false,
  },
  {
    id: 3,
    title: "Ave pequeña con pecho amarillo - ¿qué especie es?",
    category: "Identificación de Aves",
    author: {
      name: "Ana Rodríguez",
      avatar: "/placeholder.svg?key=ana",
      level: "Principiante",
    },
    replies: 15,
    views: 203,
    lastReply: "hace 1 hora",
    isPinned: false,
    isHot: true,
  },
  {
    id: 4,
    title: "Guía completa: Qué llevar en tu primera excursión",
    category: "Principiantes",
    author: {
      name: "Elena Vargas",
      avatar: "/placeholder.svg?key=elena",
      level: "Experta",
    },
    replies: 23,
    views: 445,
    lastReply: "hace 3 horas",
    isPinned: true,
    isHot: false,
  },
]

export function CommunityForums() {
  return (
    <div className="space-y-6">
      {/* Forum Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Categorías del Foro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forumCategories.map((category) => (
              <Card key={category.id} className={`cursor-pointer hover:shadow-md transition-shadow ${category.color}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex space-x-4">
                          <span>{category.topics} temas</span>
                          <span>{category.posts} mensajes</span>
                        </div>
                        <span>{category.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Topics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Temas Recientes</CardTitle>
          <Button>Crear nuevo tema</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  {topic.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                  {topic.isHot && <TrendingUp className="h-4 w-4 text-red-500" />}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={topic.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {topic.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className="font-semibold hover:text-emerald-600 transition-colors">{topic.title}</h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                    <span>por {topic.author.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {topic.author.level}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm font-semibold">{topic.replies}</div>
                  <div className="text-xs text-gray-500">respuestas</div>
                </div>

                <div className="text-center">
                  <div className="text-sm font-semibold">{topic.views}</div>
                  <div className="text-xs text-gray-500">vistas</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Última respuesta</div>
                  <div className="text-sm">{topic.lastReply}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
