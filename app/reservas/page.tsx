"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  MessageCircle,
  Star,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

// Mock reservations data
const mockReservations = [
  {
    id: 1,
    excursion: "Reserva Natural Volcán Mombacho",
    location: "Granada, Nicaragua",
    date: "15 de diciembre, 2024",
    time: "6:00 AM",
    duration: "6 horas",
    participants: 2,
    guide: {
      name: "María Elena Vásquez",
      avatar: "/placeholder.svg?key=guide2",
      rating: 5.0,
    },
    total: 130,
    status: "confirmada",
    confirmationCode: "AVI-2024-001234",
    image: "/volcanic-forest-canopy-nicaragua.jpg",
  },
  {
    id: 2,
    excursion: "Reserva Natural Estero Padre Ramos",
    location: "Chinandega, Nicaragua",
    date: "8 de enero, 2025",
    time: "7:00 AM",
    duration: "4 horas",
    participants: 1,
    guide: {
      name: "Carlos Mendoza",
      avatar: "/placeholder.svg?key=guide1",
      rating: 4.9,
    },
    total: 45,
    status: "pendiente",
    confirmationCode: "AVI-2024-001235",
    image: "/mangrove-estuary-birds-nicaragua.jpg",
  },
  {
    id: 3,
    excursion: "Reserva Natural Cerro Apante",
    location: "Matagalpa, Nicaragua",
    date: "20 de noviembre, 2024",
    time: "5:30 AM",
    duration: "8 horas",
    participants: 3,
    guide: {
      name: "Roberto Silva",
      avatar: "/placeholder.svg?key=guide3",
      rating: 4.7,
    },
    total: 165,
    status: "completada",
    confirmationCode: "AVI-2024-001230",
    image: "/cloud-forest-mountain-nicaragua-birds.jpg",
  },
]

export default function ReservasPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("todas")

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Inicia sesión</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">Necesitas una cuenta para ver tus reservas</p>
            <div className="space-y-2">
              <Button onClick={() => router.push("/login")} className="w-full">
                Iniciar Sesión
              </Button>
              <Button onClick={() => router.push("/registro")} variant="outline" className="w-full">
                Crear Cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-emerald-100 text-emerald-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "completada":
        return "bg-blue-100 text-blue-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="h-4 w-4" />
      case "pendiente":
        return <AlertCircle className="h-4 w-4" />
      case "completada":
        return <CheckCircle className="h-4 w-4" />
      case "cancelada":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filterReservations = (status: string) => {
    if (status === "todas") return mockReservations
    return mockReservations.filter((reservation) => reservation.status === status)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mis Reservas</h1>
          <p className="text-xl text-emerald-100">Gestiona tus excursiones de aviturismo</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todas">Todas ({mockReservations.length})</TabsTrigger>
            <TabsTrigger value="confirmada">Confirmadas ({filterReservations("confirmada").length})</TabsTrigger>
            <TabsTrigger value="pendiente">Pendientes ({filterReservations("pendiente").length})</TabsTrigger>
            <TabsTrigger value="completada">Completadas ({filterReservations("completada").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-6">
              {filterReservations(activeTab).length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 mb-4">No tienes reservas en esta categoría</p>
                    <Button onClick={() => router.push("/excursiones")}>Explorar excursiones</Button>
                  </CardContent>
                </Card>
              ) : (
                filterReservations(activeTab).map((reservation) => (
                  <Card key={reservation.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/4">
                        <div
                          className="h-48 md:h-full bg-gray-200 bg-cover bg-center"
                          style={{ backgroundImage: `url(${reservation.image})` }}
                        />
                      </div>

                      <div className="md:w-3/4">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl mb-2">{reservation.excursion}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {reservation.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {reservation.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {reservation.time}
                                </div>
                              </div>
                            </div>

                            <Badge className={getStatusColor(reservation.status)}>
                              {getStatusIcon(reservation.status)}
                              <span className="ml-1 capitalize">{reservation.status}</span>
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={reservation.guide.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {reservation.guide.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{reservation.guide.name}</p>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-xs">{reservation.guide.rating}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {reservation.participants} participante{reservation.participants > 1 ? "s" : ""}
                              </span>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-lg">${reservation.total}</p>
                              <p className="text-xs text-gray-500">Código: {reservation.confirmationCode}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            {reservation.status === "confirmada" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Contactar Guía
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </Button>
                              </>
                            )}

                            {reservation.status === "completada" && (
                              <Button size="sm" variant="outline">
                                <Star className="h-4 w-4 mr-2" />
                                Calificar Experiencia
                              </Button>
                            )}

                            {reservation.status === "pendiente" && (
                              <Button size="sm" variant="outline">
                                Ver Detalles
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
