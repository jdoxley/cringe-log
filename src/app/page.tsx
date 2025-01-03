import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Link from "next/link"
import { Frown } from 'lucide-react'

export default function IntroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Frown className="w-8 h-8" />
            Cringe Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-4 animate-fade-in">
            Welcome to Cringe Tracker
          </h2>
          <p className="text-center text-muted-foreground animate-fade-in-delay">
            Track, analyze, and overcome your cringiest moments!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/messages">Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

