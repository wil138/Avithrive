"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  Home,
  Bird,
  MapPin,
  Users,
  GraduationCap,
  Info,
  User,
  Trophy,
  Star,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/aves", label: "Aves", icon: Bird },
  { href: "/excursiones", label: "Excursiones", icon: MapPin },
  { href: "/comunidad", label: "Comunidad", icon: Users },
  { href: "/educacion", label: "Educación", icon: GraduationCap },
  { href: "/sobre-nosotros", label: "Nosotros", icon: Info },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-sidebar-foreground">Avitravel</span>
            </Link>
          </div>

          {user ? (
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">Observador Nivel {user.level}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  Nivel {user.level}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {user.points}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-sidebar-border">
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {user && (
              <Link
                href="/perfil"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/perfil"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <User className="h-4 w-4" />
                <span>Mi Perfil</span>
              </Link>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-3" />
                  Modo Claro
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-3" />
                  Modo Oscuro
                </>
              )}
            </Button>

            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
