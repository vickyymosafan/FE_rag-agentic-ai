import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsagePage() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monitor system usage and API budget. (Coming soon)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
