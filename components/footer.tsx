import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">Avithrive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Promoviendo el turismo sostenible y la conservación de aves en Nicaragua desde 2024.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Enlaces Rápidos</h3>
            <nav className="space-y-2 text-sm">
              <a href="#inicio" className="block text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </a>
              <a href="#aves" className="block text-muted-foreground hover:text-foreground transition-colors">
                Catálogo de Aves
              </a>
              <a href="#excursiones" className="block text-muted-foreground hover:text-foreground transition-colors">
                Excursiones
              </a>
              <a href="#comunidad" className="block text-muted-foreground hover:text-foreground transition-colors">
                Comunidad
              </a>
              <a href="#educacion" className="block text-muted-foreground hover:text-foreground transition-colors">
                Educación
              </a>
            </nav>
          </div>

          {/* Conservation Partners */}
          <div className="space-y-4">
            <h3 className="font-semibold">Aliados</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Partner
                </Badge>
                <span className="text-muted-foreground">MARENA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Partner
                </Badge>
                <span className="text-muted-foreground">Fundación Cocibolca</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Partner
                </Badge>
                <span className="text-muted-foreground">INTUR</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Partner
                </Badge>
                <span className="text-muted-foreground">Audubon Society</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Managua, Nicaragua</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@Avithrave.ni</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">+505 2222-3333</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Avithrave. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Accesibilidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
