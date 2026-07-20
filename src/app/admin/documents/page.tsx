import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDocumentsPage() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upload and manage academic documents. (Coming soon)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
