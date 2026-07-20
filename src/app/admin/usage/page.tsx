"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, MessagesSquare, Database, Zap } from "lucide-react"

const stats = [
  {
    title: "Total Queries",
    value: "1,847",
    change: "+12%",
    icon: MessagesSquare,
  },
  {
    title: "Cache Hit Rate",
    value: "84%",
    change: "+3%",
    icon: Zap,
  },
  {
    title: "Documents Indexed",
    value: "4",
    change: "0",
    icon: Database,
  },
  {
    title: "API Budget Used",
    value: "35%",
    change: "+5%",
    icon: BarChart3,
  },
]

const providerUsage = [
  { name: "Gemini 2.5 Flash", used: 350, limit: 1500, unit: "RPD" },
  { name: "Groq", used: 420, limit: 14400, unit: "RPD" },
  { name: "Cohere Command-A", used: 2, limit: 1000, unit: "monthly" },
  { name: "OpenRouter", used: 0, limit: 100, unit: "RPD" },
]

const recentQueries = [
  { query: "Syarat pendaftaran TA", time: "2m ago", cached: true },
  { query: "Berapa SKS untuk lulus?", time: "15m ago", cached: false },
  { query: "Jadwal KKN 2026", time: "1h ago", cached: true },
  { query: "Syarat KP semester genap", time: "3h ago", cached: true },
]

export default function AdminUsagePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Usage Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Monitor system usage and API budget
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-green-600 mt-2">{stat.change} vs yesterday</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Provider Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {providerUsage.map((provider) => {
              const percentage = (provider.used / provider.limit) * 100
              return (
                <div key={provider.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{provider.name}</span>
                    <span className="text-muted-foreground">
                      {provider.used} / {provider.limit} {provider.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentQueries.map((item) => (
              <div
                key={item.query}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="text-sm truncate">{item.query}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {item.cached && (
                    <Badge variant="secondary" className="text-[10px]">
                      Cache
                    </Badge>
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
