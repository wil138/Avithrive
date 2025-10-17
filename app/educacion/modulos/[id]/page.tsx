"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, Award, FileText, Video, Link as LinkIcon, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for educational modules (should ideally come from a centralized source)
const learningModulesData = {
  1: {
    id: 1,
    title: "Aves Endémicas de Nicaragua",
    description: "Conoce las especies únicas de nuestro país, su hábitat y estado de conservación. Este módulo te sumergirá en la riqueza aviar nicaragüense.",
    duration: "15 min",
    level: "Principiante",
    completed: true,
    image: "/guardabarranco-bird-nicaragua.jpg",
    content: [
      { type: "text", title: "Introducción", data: "Nicaragua es hogar de una impresionante diversidad de aves, incluyendo varias especies endémicas que no se encuentran en ningún otro lugar del mundo. Este módulo te guiará a través de las más destacadas." },
      { type: "video", title: "Video: El Guardabarranco", data: "https://www.youtube.com/embed/4R8OIvvxlN0" }, // Placeholder video
      { type: "text", title: "Especies Clave", data: "Exploraremos el Guardabarranco, el Momoto Cejiazul y otras aves emblemáticas, detallando sus características y la importancia de su conservación." },
    ],
    resources: [
      { name: "Guía de Aves Endémicas (PDF)", url: "https://lynxeds.info/sites/default/files/pdfs/Lynx%20Edicions%20-%20Checklist%20of%20the%20One-country%20%20Endemic%20Birds%20%20of%20the%20World.pdf", type: "pdf" },
      { name: "PLAN DE MANEJO DE LA RESERVA NATURAL COMPLEJO VOLCÁNICO MOMOTOMBO", url: "https://www.renida.net.ni/renida/marena/RENP01M665s.pdf", type: "link" },
    ],
    instructor: {
      name: "Dr. Elena Ríos",
      title: "Bióloga Ornitóloga",
      avatar: "/placeholder.svg?key=instructor_elena",
    },
  },
  2: {
    id: 2,
    title: "Conservación y Protección",
    description: "Aprende sobre la importancia de proteger las aves y sus hábitats, y cómo puedes contribuir a su conservación. Un paso esencial para todo aviturista responsable.",
    duration: "20 min",
    level: "Intermedio",
    completed: true,
    image: "/great-green-macaw-parrot-nicaragua-endangered.jpg",
    content: [
      { type: "text", title: "Amenazas Actuales", data: "La deforestación, el cambio climático y la caza ilegal son algunas de las principales amenazas para las aves en Nicaragua." },
      { type: "text", title: "Estrategias de Conservación", data: "Descubre los esfuerzos de organizaciones locales e internacionales para proteger a las especies en peligro y restaurar sus ecosistemas." },
      { type: "video", title: "Guacamaya verde", data: "https://www.youtube.com/embed/Pif8RmbIUj8" }, // Placeholder video
    ],
    resources: [
      { name: "Informe de Conservación (PDF)", url: "https://corpoguajira.gov.co/wp/wp-content/uploads/2017/07/INFORME-FINAL-GUACAMAYA.pdf", type: "pdf" },
      { name: "Organizaciones de Conservación", url: "http://www.bio-nica.info/ALAS/HistoriaALAS.htm", type: "link" },
    ],
    instructor: {
      name: "Biol. Carlos Mendoza",
      title: "Especialista en conservación",
      avatar: "/placeholder.svg?key=instructor2",
    },
  },
  3: {
    id: 3,
    title: "Técnicas de Observación",
    description: "Mejora tus habilidades de avistamiento con consejos prácticos y técnicas avanzadas para identificar aves en el campo. Conviértete en un observador experto.",
    duration: "25 min",
    level: "Avanzado",
    completed: false,
    image: "/placeholder.svg?key=observacion",
    content: [
      { type: "text", title: "Equipo Esencial", data: "Binoculares, telescopios, guías de campo y ropa adecuada son fundamentales para una observación exitosa." },
      { type: "text", title: "Estrategias de Avistamiento", data: "Aprende a acercarte a las aves sin molestarlas, a usar el camuflaje natural y a interpretar sus comportamientos." },
      { type: "video", title: "Tutorial: Uso de Binoculares", data: "https://www.youtube.com/embed/_vi_usL5XQo" }, // Placeholder video
    ],
    resources: [
      { name: "Checklist de Aves de Nicaragua (PDF)", url: "https://mlr.com.ni/wp-content/uploads/2021/06/Catalogo-de-Aves-MLR.pdf", type: "pdf" },
      { name: "Consejos para Fotografía de Aves", url: "https://digital-photography-school.com/10-incredible-bird-photography-tips-beginners/", type: "link" },
    ],
    instructor: {
      name: "Roberto Silva",
      title: "Fotógrafo de naturaleza",
      avatar: "/placeholder.svg?key=instructor3",
    },
  },
  4: {
    id: 4,
    title: "Identificación por Plumaje",
    description: "Guía detallada para reconocer aves por sus patrones de plumaje, tamaño y forma. Desarrolla tu ojo para los detalles y mejora tu capacidad de identificación.",
    duration: "18 min",
    level: "Principiante",
    completed: false,
    image: "/placeholder.svg?key=plumaje",
    content: [
      { type: "text", title: "Morfología Aviar", data: "Conoce las diferentes partes del cuerpo de un ave y cómo el plumaje varía entre especies, sexos y edades." },
      { type: "text", title: "Patrones y Colores", data: "Aprende a identificar patrones clave, como barras alares, manchas oculares y colores distintivos que te ayudarán a diferenciar aves similares." },
    ],
    resources: [
      { name: "Atlas de Plumajes (PDF)", url: "https://tagusringinggroup.weebly.com/uploads/1/9/5/1/19518165/atlas_aves_aragon_2.pdf", type: "pdf" },
    ],
    instructor: {
      name: "Juan Pérez",
      title: "Guía de campo",
      avatar: "/placeholder.svg?key=instructor5",
    },
  },
  5: {
    id: 5,
    title: "Ecología Aviar",
    description: "Estudio de los ecosistemas y el comportamiento de las aves. Comprende cómo las aves interactúan con su entorno y su papel en la naturaleza.",
    duration: "30 min",
    level: "Intermedio",
    completed: false,
    image: "/placeholder.svg?key=ecologia",
    content: [
      { type: "text", title: "Nicho Ecológico", data: "Explora cómo las aves ocupan diferentes nichos ecológicos, desde depredadores hasta dispersores de semillas." },
      { type: "text", title: "Migración y Reproducción", data: "Aprende sobre los fascinantes viajes migratorios de las aves y sus complejos rituales de cortejo y reproducción." },
    ],
    resources: [
      { name: "Las aves migratorias (PDF)", url: "https://www.biodiversidad.gob.mx/media/1/ciencia-ciudadana/documentos/naturalia_aves.pdf", type: "pdf" },
    ],
    instructor: {
      name: "Dra. Laura Gómez",
      title: "Ecóloga aviar",
      avatar: "/placeholder.svg?key=instructor6",
    },
  },
};

const ModuleDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const module = learningModulesData[Number(id) as keyof typeof learningModulesData];

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Módulo no encontrado</h1>
          <Button onClick={() => router.push("/educacion")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Educación
          </Button>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "principiante":
        return "bg-green-100 text-green-800"
      case "intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "avanzado":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/educacion")}
              className="text-white hover:bg-white/20"
              aria-label="Volver a la página de Educación"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Educación
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-emerald-100">{module.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Module Overview */}
          <Card>
            <CardHeader>
              <img
                src={module.image || "/placeholder.svg"}
                alt={`Imagen del módulo ${module.title}`}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <CardTitle className="text-2xl">{module.title}</CardTitle>
              <p className="text-gray-600">{module.description}</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Duración: {module.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <Badge className={getLevelColor(module.level)}>{module.level}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span>Instructor: {module.instructor.name}</span>
              </div>
            </CardContent>
          </Card>

          {/* Module Content */}
          <Card>
            <CardHeader>
              <CardTitle>Contenido del Módulo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {module.content.map((item, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  {item.type === "text" && <p className="text-gray-700">{item.data}</p>}
                  {item.type === "video" && (
                    <div className="aspect-video w-full mt-4">
                      <iframe
                        src={item.data}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                        aria-label={`Video sobre ${item.title}`}
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources */}
          {module.resources && module.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recursos Adicionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {module.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label={`Descargar o ver recurso: ${resource.name}`}
                  >
                    {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                    {resource.type === "video" && <Video className="h-5 w-5 text-blue-500" />}
                    {resource.type === "link" && <LinkIcon className="h-5 w-5 text-purple-500" />}
                    <span className="font-medium text-emerald-700 hover:underline">{resource.name}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Instructor Info */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre el Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={module.instructor.avatar || "/placeholder.svg"} alt={`Avatar de ${module.instructor.name}`} />
                <AvatarFallback>{module.instructor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{module.instructor.name}</h3>
                <p className="text-gray-600">{module.instructor.title}</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button onClick={() => router.push("/educacion")} className="bg-emerald-600 hover:bg-emerald-700 text-white" aria-label="Finalizar módulo y volver a Educación">
              <Award className="h-4 w-4 mr-2" />
              Finalizar Módulo y Volver
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;