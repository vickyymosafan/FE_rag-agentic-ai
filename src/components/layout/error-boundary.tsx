"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center h-full p-6">
            <Card className="max-w-sm">
              <CardContent className="p-6 text-center space-y-3">
                <p className="text-sm font-medium">Something went wrong</p>
                <p className="text-xs text-muted-foreground">
                  {this.state.error?.message ?? "An unexpected error occurred"}
                </p>
                <Button
                  size="sm"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Try again
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}
