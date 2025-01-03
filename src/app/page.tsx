import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { Frown } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-center text-3xl font-bold">
            <Frown className="h-8 w-8" />
            Cringe Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="animate-fade-in mb-4 text-center text-2xl font-semibold">
            Welcome to Cringe Tracker
          </h2>
          <p className="animate-fade-in-delay text-center text-muted-foreground">
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
  );
}
