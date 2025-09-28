import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star, Camera, Binary as Binoculars } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Excursion {
  id: number
  title: string
  location: string
  difficulty: string
  duration: string
  price: string
  rating: number
  reviews: number
  image: string
  species: string[]
  description: string
  highlights: string[]
  groupSize: string
}

interface ExcursionCardProps {
  excursion: Excursion
}

export function ExcursionCard({ excursion }: ExcursionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "fácil":
        return "bg-green-100 text-green-800"
      case "intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full">
            <Image src={excursion.image || "/placeholder.svg"} alt={excursion.title} fill className="object-cover" />
            <div className="absolute top-4 left-4">
              <Badge className={getDifficultyColor(excursion.difficulty)}>{excursion.difficulty}</Badge>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-lg font-bold text-emerald-600">{excursion.price}</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{excursion.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{excursion.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {excursion.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {excursion.groupSize}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {excursion.rating} ({excursion.reviews})
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-700 mb-4 text-pretty">{excursion.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Binoculars className="h-4 w-4 mr-2" />
                Especies que puedes avistar:
              </h4>
              <div className="flex flex-wrap gap-2">
                {excursion.species.map((species) => (
                  <Badge key={species} variant="outline" className="text-xs">
                    {species}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Destacados:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {excursion.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Link href={`/excursiones/${excursion.id}/reservar`} className="flex-1">
                <Button className="w-full">Reservar excursión</Button>
              </Link>
              <Button variant="outline" size="icon">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
