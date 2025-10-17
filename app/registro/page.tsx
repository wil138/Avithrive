"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { Bird, Eye, EyeOff } from "lucide-react"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    const age = Number(formData.age || 0)
    const result = await register(formData.email, formData.password, formData.name, age, formData.phone)
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error ?? "Error al crear la cuenta. Intenta de nuevo.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
            <img src="icono_negativo.svg" alt="" className="h-10 w-auto"/>
          </div>
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>Únete a la comunidad de observadores de aves de Nicaragua</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Tu edad"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Tu número de teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                Acepto los{" "}
                <Link href="/terminos" className="text-emerald-600 hover:text-emerald-700">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/privacidad" className="text-emerald-600 hover:text-emerald-700">
                  política de privacidad
                </Link>
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-8">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
