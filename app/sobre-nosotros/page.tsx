"use client"
// Los iconos sí vienen de lucide-react
import { Heart, Users, Leaf, Globe, Award, Target, Eye, Lightbulb } from "lucide-react"

// Link se importa de Next
import Link from "next/link"

// Los demás componentes de tu UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

 
export default function SobreNosotrosPage() {
  const teamMembers = [
  {
    name: "Juleysi Sandino",
    role: "Marketing",
    description: "Apasionada por el marketing digital, enfocada en estrategias creativas y comunicación clara.",
    image: "/professional-woman-educator-nicaragua.jpg",
  },
  {
    name: "Ashley Putoy",
    role: "Comunicadora",
    description: "Interesada en la comunicación efectiva, con ganas de aportar claridad y conexión.",
    image: "/professional-woman-educator-nicaragua.jpg",
  },
  {
    name: "Steven Blandon",
    role: "Diseño",
    description: "Motivado por crear experiencias visuales simples y atractivas.",
    image: "/professional-man-developer-nicaragua.jpg",
  },
  {
    name: "Whilton Verrio",
    role: "Desarrollo Web y Estructura",
    description: "Enfocado en el diseño y la estructura de páginas web.",
    image: "/professional-man-developer-nicaragua.jpg",
  },
  {
    name: "Javier Castro",
    role: "Base de Datos",
    description: "Interesado en bases de datos y la organización de la información.",
    image: "/professional-man-developer-nicaragua.jpg",
  },
]


  const values = [
    {
      icon: Leaf,
      title: "Conservación",
      description: "Protegemos y preservamos la biodiversidad aviaria de Nicaragua para futuras generaciones.",
    },
    {
      icon: Users,
      title: "Inclusión",
      description: "Creamos experiencias accesibles para personas de todas las capacidades y edades.",
    },
    {
      icon: Globe,
      title: "Sostenibilidad",
      description: "Promovemos el turismo responsable que beneficia a las comunidades locales.",
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Compartimos nuestro amor por las aves y la naturaleza nicaragüense.",
    },
  ]

  const achievements = [
    { number: "500+", label: "Especies Documentadas" },
    { number: "2,000+", label: "Avituristas Activos" },
    { number: "50+", label: "Reservas Naturales" },
    { number: "15", label: "Comunidades Beneficiadas" },
  ]

  const partnerships = [
    "Ministerio del Ambiente y los Recursos Naturales (MARENA)",
    "Instituto Nicaragüense de Turismo (INTUR)",
    "Fundación Cocibolca",
    "Universidad Nacional Autónoma de Nicaragua (UNAN)",
    "Red de Reservas Silvestres Privadas de Nicaragua",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Sobre Avithrive</h1>
            <p className="text-xl text-emerald-100 mb-8 text-pretty max-w-3xl mx-auto">
              Somos una plataforma innovadora que conecta a los amantes de las aves con la rica biodiversidad de
              Nicaragua, promoviendo el turismo sostenible y la educación inclusiva.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-emerald-800">Nuestra Misión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-pretty">
                Democratizar el acceso al aviturismo en Nicaragua a través de una plataforma digital innovadora que
                combina gamificación, educación inclusiva y turismo sostenible, conectando a observadores de aves de
                todos los niveles con la extraordinaria biodiversidad de nuestro país.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600 rounded-lg">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-teal-800">Nuestra Visión</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-pretty">
                Ser la plataforma líder en Centroamérica para el aviturismo sostenible, reconocida por nuestra
                innovación tecnológica, compromiso con la inclusión y contribución significativa a la conservación de
                las aves y el desarrollo de las comunidades locales.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-pretty">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">Nuestros Logros</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-emerald-100">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">Nuestro Equipo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-emerald-800 mb-1">{member.name}</h3>
                  <Badge className="mb-3">{member.role}</Badge>
                  <p className="text-gray-600 text-sm text-pretty">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Nuestra Historia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-emerald max-w-none">
              <p className="text-gray-500 mb-4 text-pretty">
                Avithrive nació en 2025 de la pasión compartida por las aves y el deseo de hacer el aviturismo más
                accesible para todos los nicaragüenses y visitantes. Nuestro equipo multidisciplinario, compuesto por
                biólogos, educadores, guías locales y desarrolladores tecnológicos, identificó la necesidad de una
                plataforma que no solo conectara a los observadores de aves con los mejores sitios del país, sino que
                también promoviera la conservación y la inclusión.
              </p>
              <p className="text-gray-500 mb-4 text-pretty">
                Comenzamos documentando las rutas aviturísticas más importantes de Nicaragua, desde los bosques nubosos
                de Matagalpa hasta los humedales de la costa del Pacífico. Trabajamos de la mano con comunidades
                locales, guías experimentados y organizaciones de conservación para crear una experiencia auténtica y
                sostenible.
              </p>
              <p className="text-gray-500 text-pretty">
                Hoy, Avithrive es más que una plataforma de aviturismo: es una comunidad vibrante de más de 2,000
                observadores de aves que comparten su pasión, aprenden juntos y contribuyen activamente a la
                conservación de las más de 500 especies de aves que habitan en nuestro hermoso país.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Partnerships */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">Nuestros Aliados</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-center  mb-6 text-pretty">
                Trabajamos en colaboración con organizaciones líderes en conservación, turismo y educación:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {partnerships.map((partner, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                    <Award className="h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">{partner}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Misión</h2>
            <p className="text-xl text-emerald-100 mb-6 text-pretty">
              Sé parte de la comunidad aviturística más grande de Nicaragua y contribuye a la conservación de nuestras
              aves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button size="lg" variant="secondary">
                  Crear Cuenta
                </Button>
              </Link>.
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Contactanos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
