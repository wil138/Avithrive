import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, Star, Award } from "lucide-react"

const stats = [
  {
    icon: <Eye className="h-6 w-6 text-emerald-600" />,
    label: "Especies vistas por ti",
    value: "127",
    total: "342",
    percentage: 37,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    icon: <MapPin className="h-6 w-6 text-blue-600" />,
    label: "Regiones exploradas",
    value: "8",
    total: "15",
    percentage: 53,
    color: "bg-blue-100 text-blue-800",
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-600" />,
    label: "Especies raras avistadas",
    value: "12",
    total: "45",
    percentage: 27,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    icon: <Award className="h-6 w-6 text-purple-600" />,
    label: "Especies endémicas",
    value: "3",
    total: "8",
    percentage: 38,
    color: "bg-purple-100 text-purple-800",
  },
]

export function BirdStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
              <Badge className={stat.color}>{stat.percentage}%</Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {stat.value}
                <span className="text-lg text-gray-500">/{stat.total}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
