"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Camera, MapPin, MoreHorizontal } from "lucide-react"
import Image from "next/image"

const posts = [
  {
    id: 1,
    user: {
      name: "María González",
      username: "@maria_birds",
      avatar: "/placeholder.svg?key=user1",
      level: "Experta",
      points: 2450,
    },
    content:
      "¡Increíble avistamiento de Quetzal Resplandeciente en Cerro Apante! Después de 3 horas de caminata, finalmente pude fotografiar a esta hermosa especie. La paciencia valió la pena.",
    image: "/placeholder.svg?key=quetzal",
    location: "Cerro Apante, Matagalpa",
    species: "Quetzal Resplandeciente",
    timestamp: "hace 2 horas",
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: "Carlos Mendoza",
      username: "@carlos_aviturista",
      avatar: "/placeholder.svg?key=user2",
      level: "Avanzado",
      points: 1890,
    },
    content:
      "Mañana temprano en Volcán Mombacho. El canto de los tucanes al amanecer es simplemente mágico. Compartiendo algunas fotos de la excursión de hoy.",
    image: "/placeholder.svg?key=toucan",
    location: "Volcán Mombacho, Granada",
    species: "Tucán Pico Iris",
    timestamp: "hace 5 horas",
    likes: 32,
    comments: 8,
    shares: 5,
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: "Ana Rodríguez",
      username: "@ana_naturaleza",
      avatar: "/placeholder.svg?key=user3",
      level: "Intermedia",
      points: 1250,
    },
    content:
      "¡Logré completar mi primera lista de 50 especies! Gracias a la comunidad por todos los consejos. El Guardabarranco fue el número 50 - qué mejor ave nacional para cerrar esta meta.",
    image: "/placeholder.svg?key=guardabarranco",
    location: "Reserva Natural Chocoyero, Managua",
    species: "Guardabarranco",
    timestamp: "hace 1 día",
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: true,
  },
]

export function CommunityPosts() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2, 3]))

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?key=currentuser" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button variant="outline" className="w-full justify-start text-gray-500 bg-transparent">
                Comparte tu último avistamiento...
              </Button>
            </div>
            <Button size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {post.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{post.user.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {post.user.level}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{post.user.username}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-gray-700 mb-4 text-pretty">{post.content}</p>

            {post.image && (
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.species}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-black/70 text-white">{post.species}</Badge>
                </div>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{post.location}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(post.id)}
                  className={likedPosts.has(post.id) ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                  {post.likes + (likedPosts.has(post.id) && !post.isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  {post.shares}
                </Button>
              </div>
              <div className="text-xs text-gray-500">{post.user.points} puntos</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
