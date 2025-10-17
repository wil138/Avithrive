import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, MessageSquare, Camera } from "lucide-react"
import { CommunityRankings } from "@/components/community-rankings"
import { CommunityPosts } from "@/components/community-posts"
import { CommunityEvents } from "@/components/community-events"
import { CommunityForums } from "@/components/community-forums"

export default function ComunidadPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Comunidad Avithrive</h1>
          <p className="text-xl text-blue-100 max-w-2xl text-pretty">
            Conecta con otros apasionados de las aves, comparte tus avistamientos y participa en eventos comunitarios
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-blue-200 text-sm">Avituristas activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15,632</div>
              <div className="text-blue-200 text-sm">Avistamientos registrados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">342</div>
              <div className="text-blue-200 text-sm">Especies documentadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">28</div>
              <div className="text-blue-200 text-sm">Eventos este mes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Publicaciones
            </TabsTrigger>
            <TabsTrigger value="rankings" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Rankings
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Foros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <Suspense fallback={<div>Cargando publicaciones...</div>}>
              <CommunityPosts />
            </Suspense>
          </TabsContent>

          <TabsContent value="rankings" className="space-y-6">
            <Suspense fallback={<div>Cargando rankings...</div>}>
              <CommunityRankings />
            </Suspense>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Suspense fallback={<div>Cargando eventos...</div>}>
              <CommunityEvents />
            </Suspense>
          </TabsContent>

          <TabsContent value="forums" className="space-y-6">
            <Suspense fallback={<div>Cargando foros...</div>}>
              <CommunityForums />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
