"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, Trophy, Star } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl text-foreground">Avithrive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Inicio
          </Link>
          <Link href="/aves" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Aves
          </Link>
          <Link href="/excursiones" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Excursiones
          </Link>
          <Link href="/comunidad" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Comunidad
          </Link>
          <Link href="/educacion" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Educación
          </Link>
          <Link href="/sobre-nosotros" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Nosotros
          </Link>
        </nav>

        {/* User Profile & Actions */}
        <div className="flex items-center space-x-4">
          {/* Gamification Elements */}
          <div className="hidden lg:flex items-center space-x-3">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
              <Trophy className="w-3 h-3 mr-1" />
              Nivel 5
            </Badge>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
              <Star className="w-3 h-3 mr-1" />
              1,250 pts
            </Badge>
          </div>

          <Link href="/perfil">
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all">
              <AvatarImage src="/birdwatcher-profile.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Inicio
            </Link>
            <Link href="/aves" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Aves
            </Link>
            <Link href="/excursiones" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Excursiones
            </Link>
            <Link href="/comunidad" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Comunidad
            </Link>
            <Link href="/educacion" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Educación
            </Link>
            <Link href="/sobre-nosotros" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Nosotros
            </Link>
            <Link href="/perfil" className="block text-sm font-medium hover:text-emerald-600 transition-colors">
              Mi Perfil
            </Link>
            <div className="flex items-center space-x-3 pt-3 border-t">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                <Trophy className="w-3 h-3 mr-1" />
                Nivel 5
              </Badge>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                <Star className="w-3 h-3 mr-1" />
                1,250 pts
              </Badge>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
