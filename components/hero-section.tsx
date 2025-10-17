"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, Users, Award } from "lucide-react"


export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/nicaragua-tropical-forest-with-colorful-birds-guar.jpg"
          alt="Bosque tropical de Nicaragua con aves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" />
            Descubre Nicaragua
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight font-family-roboto">
            Aventura, Naturaleza y<span className="text-emerald-400 font-family-roboto"> Conservación</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto text-pretty">
            Únete a la comunidad de observadores de aves más grande de Nicaragua. Explora, aprende y contribuye a la
            conservación de nuestra biodiversidad.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 py-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">2,500+ Observadores</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">350+ Especies</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">50+ Reservas</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              onClick={() => {
                const excursionesSection = document.getElementById("excursiones")
                if (excursionesSection) {
                  excursionesSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Explorar Excursiones
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-white/10"
              asChild
            >
              <a
                href="_blank"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-transparent"
              >
                <Play className="w-4 h-4" />
                <span>Ver Video</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
