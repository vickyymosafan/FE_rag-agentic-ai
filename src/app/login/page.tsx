import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">RAG Academic AI</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Academic Document Assistant
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="mahasiswa@univ.ac.id" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Sign In</Button>
          <p className="text-xs text-center text-muted-foreground">
            Demo: login sebagai mahasiswa atau admin
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
