"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Users, Clock, Download, Share2, MessageCircle } from "lucide-react"

export default function ConfirmacionReservaPage() {
  const params = useParams()
  const router = useRouter()
  const reservationId = params.id

  // Mock reservation data - in real app this would come from API
  const reservation = {
    id: reservationId,
    excursion: "Reserva Natural Volcán Mombacho",
    location: "Granada, Nicaragua",
    date: "15 de diciembre, 2024",
    time: "6:00 AM",
    duration: "6 horas",
    participants: 2,
    guide: "María Elena Vásquez",
    total: 130,
    status: "Confirmada",
    confirmationCode: "AVI-2024-001234",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">¡Reserva Confirmada!</CardTitle>
          <p className="text-gray-600">Tu excursión ha sido reservada exitosamente</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Reservation Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Código de confirmación</span>
              <Badge variant="secondary" className="font-mono">
                {reservation.confirmationCode}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{reservation.excursion}</p>
                  <p className="text-gray-600">{reservation.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{reservation.date}</p>
                  <p className="text-gray-600">{reservation.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{reservation.participants} participantes</p>
                  <p className="text-gray-600">Guía: {reservation.guide}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{reservation.duration}</p>
                  <p className="text-gray-600">Total: ${reservation.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Información importante</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Llega 15 minutos antes de la hora programada</li>
              <li>• Trae ropa cómoda y zapatos para caminar</li>
              <li>• No olvides protector solar y repelente</li>
              <li>• Se recomienda traer agua y snacks</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              Contactar Guía
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => router.push("/reservas")} variant="outline" className="flex-1">
              Ver mis reservas
            </Button>
            <Button onClick={() => router.push("/excursiones")} className="flex-1">
              Explorar más excursiones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
