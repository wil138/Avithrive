"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  Users,
  MapPin,
  Star,
  Shield,
  Camera,
  Utensils,
  Car,
  Tent,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useAuth } from "@/contexts/auth-context"

// Mock data - in real app this would come from API
const excursionDetails = {
  1: {
    id: 1,
    title: "Reserva Natural Volcán Mombacho",
    location: "Granada, Nicaragua",
    difficulty: "Intermedio",
    duration: "6 horas",
    basePrice: 45,
    image: "/volcanic-forest-canopy-nicaragua.jpg",
    description: "Explora el bosque nuboso del volcán Mombacho y descubre especies endémicas en este ecosistema único.",
    includes: ["Guía especializado", "Transporte", "Equipo de observación", "Seguro de accidentes"],
    availableGuides: [
      {
        id: 1,
        name: "Carlos Mendoza",
        experience: "8 años",
        specialties: ["Aves endémicas", "Fotografía de naturaleza"],
        rating: 4.9,
        reviews: 156,
        languages: ["Español", "Inglés"],
        certification: "Guía certificado INTUR",
        avatar: "/placeholder.svg?key=guide1",
        priceModifier: 0,
      },
      {
        id: 2,
        name: "María Elena Vásquez",
        experience: "12 años",
        specialties: ["Ornitología", "Educación ambiental", "Bosques nubosos"],
        rating: 5.0,
        reviews: 203,
        languages: ["Español", "Inglés", "Francés"],
        certification: "Bióloga especializada",
        avatar: "/placeholder.svg?key=guide2",
        priceModifier: 15,
      },
      {
        id: 3,
        name: "Roberto Silva",
        experience: "5 años",
        specialties: ["Aves migratorias", "Canopy tours"],
        rating: 4.7,
        reviews: 89,
        languages: ["Español", "Inglés"],
        certification: "Guía local certificado",
        avatar: "/placeholder.svg?key=guide3",
        priceModifier: -5,
      },
    ],
    additionalServices: [
      {
        id: 1,
        name: "Almuerzo típico nicaragüense",
        description: "Comida tradicional preparada por familias locales",
        price: 12,
        icon: Utensils,
      },
      {
        id: 2,
        name: "Transporte desde Managua",
        description: "Transporte ida y vuelta desde hoteles en Managua",
        price: 25,
        icon: Car,
      },
      {
        id: 3,
        name: "Equipo fotográfico profesional",
        description: "Cámara y lentes especializados para fotografía de aves",
        price: 20,
        icon: Camera,
      },
      {
        id: 4,
        name: "Camping nocturno",
        description: "Experiencia de camping con observación nocturna",
        price: 35,
        icon: Tent,
      },
    ],
    availableDates: [
      new Date(2024, 11, 15),
      new Date(2024, 11, 16),
      new Date(2024, 11, 18),
      new Date(2024, 11, 20),
      new Date(2024, 11, 22),
      new Date(2024, 11, 23),
      new Date(2024, 11, 25),
    ],
  },
}

export default function ReservarExcursionPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedGuide, setSelectedGuide] = useState<number>()
  const [participants, setParticipants] = useState(1)
  const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set())
  const [specialRequests, setSpecialRequests] = useState("")
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
  })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const excursionId = Number.parseInt(params.id as string)
  const excursion = excursionDetails[excursionId as keyof typeof excursionDetails]

  if (!excursion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Excursión no encontrada</h1>
          <Button onClick={() => router.push("/excursiones")}>Volver a excursiones</Button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Inicia sesión para reservar</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">Necesitas una cuenta para realizar reservas</p>
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

  const selectedGuideData = excursion.availableGuides.find((g) => g.id === selectedGuide)
  const guidePrice = selectedGuideData ? selectedGuideData.priceModifier : 0
  const servicesPrice = Array.from(selectedServices).reduce((total, serviceId) => {
    const service = excursion.additionalServices.find((s) => s.id === serviceId)
    return total + (service ? service.price : 0)
  }, 0)
  const totalPrice = (excursion.basePrice + guidePrice + servicesPrice) * participants

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId)
      } else {
        newSet.add(serviceId)
      }
      return newSet
    })
  }

  const handleSubmitReservation = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, this would make an API call to create the reservation
    console.log("Reservation data:", {
      excursionId,
      userId: user.id,
      date: selectedDate,
      guideId: selectedGuide,
      participants,
      services: Array.from(selectedServices),
      specialRequests,
      contactInfo,
      totalPrice,
    })

    setIsSubmitting(false)
    router.push(`/reservas/confirmacion/${Date.now()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/excursiones")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a excursiones
            </Button>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Reservar Excursión</h1>
            <p className="text-xl text-emerald-100">{excursion.title}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Date and Guide Selection */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Selecciona fecha y guía
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-base font-semibold">Fecha de la excursión</Label>
                    <div className="mt-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              !excursion.availableDates.some(
                                (availableDate) => availableDate.toDateString() === date.toDateString(),
                              )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <Label htmlFor="participants" className="text-base font-semibold">
                      Número de participantes
                    </Label>
                    <Select
                      value={participants.toString()}
                      onValueChange={(value) => setParticipants(Number.parseInt(value))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} persona{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guide Selection */}
                  <div>
                    <Label className="text-base font-semibold">Selecciona tu guía</Label>
                    <div className="mt-2 space-y-3">
                      {excursion.availableGuides.map((guide) => (
                        <div
                          key={guide.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedGuide === guide.id
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedGuide(guide.id)}
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={guide.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {guide.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{guide.name}</h4>
                                <div className="flex items-center gap-2">
                                  {guide.priceModifier !== 0 && (
                                    <Badge variant={guide.priceModifier > 0 ? "secondary" : "outline"}>
                                      {guide.priceModifier > 0 ? "+" : ""}${guide.priceModifier}
                                    </Badge>
                                  )}
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="text-sm font-medium">{guide.rating}</span>
                                    <span className="text-sm text-gray-500 ml-1">({guide.reviews})</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">{guide.experience} de experiencia</p>

                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-emerald-600">{guide.certification}</span>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-2">
                                {guide.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="outline" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {guide.languages.map((language) => (
                                  <Badge key={language} variant="secondary" className="text-xs">
                                    {language}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full" disabled={!selectedDate || !selectedGuide}>
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Additional Services */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Servicios adicionales</CardTitle>
                  <p className="text-sm text-gray-600">Personaliza tu experiencia con servicios complementarios</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {excursion.additionalServices.map((service) => {
                    const Icon = service.icon
                    return (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedServices.has(service.id)
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center">
                            <Checkbox
                              checked={selectedServices.has(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                            />
                          </div>

                          <Icon className="h-6 w-6 text-emerald-600 mt-1" />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{service.name}</h4>
                              <Badge variant="secondary">${service.price}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Atrás
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continuar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                  <p className="text-sm text-gray-600">Datos necesarios para la excursión</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Teléfono de contacto *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+505 8888-8888"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact">Contacto de emergencia *</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Nombre completo"
                        value={contactInfo.emergencyContact}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="emergencyPhone">Teléfono de emergencia *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        placeholder="+505 8888-8888"
                        value={contactInfo.emergencyPhone}
                        onChange={(e) => setContactInfo((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Solicitudes especiales</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Alergias, necesidades dietéticas, limitaciones físicas, etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Al continuar, aceptas nuestros términos y condiciones de reserva y política de cancelación.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Atrás
                    </Button>
                    <Button
                      onClick={handleSubmitReservation}
                      className="flex-1"
                      disabled={
                        !contactInfo.phone ||
                        !contactInfo.emergencyContact ||
                        !contactInfo.emergencyPhone ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Reservation Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{excursion.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{excursion.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {participants} participante{participants > 1 ? "s" : ""}
                    </span>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span>{format(selectedDate, "PPP", { locale: es })}</span>
                    </div>
                  )}
                </div>

                {selectedGuideData && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Guía seleccionado</h4>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedGuideData.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedGuideData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{selectedGuideData.name}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs">{selectedGuideData.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedServices.size > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Servicios adicionales</h4>
                      <div className="space-y-1">
                        {Array.from(selectedServices).map((serviceId) => {
                          const service = excursion.additionalServices.find((s) => s.id === serviceId)
                          return service ? (
                            <div key={serviceId} className="flex justify-between text-sm">
                              <span>{service.name}</span>
                              <span>${service.price}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Precio base ({participants} persona{participants > 1 ? "s" : ""})
                    </span>
                    <span>${excursion.basePrice * participants}</span>
                  </div>

                  {selectedGuideData && selectedGuideData.priceModifier !== 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Guía especializado</span>
                      <span>
                        {selectedGuideData.priceModifier > 0 ? "+" : ""}$
                        {selectedGuideData.priceModifier * participants}
                      </span>
                    </div>
                  )}

                  {servicesPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Servicios adicionales</span>
                      <span>${servicesPrice * participants}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Incluye: {excursion.includes.join(", ")}</p>
                  <p>• Cancelación gratuita hasta 24h antes</p>
                  <p>• Confirmación inmediata</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
