'use client'

import { signInWithDiscord } from './actions'
import { Button } from "~/components/ui/button"
import { DiscIcon as Discord } from 'lucide-react'

export function LoginButton() {
    return (
        <Button
            onClick={() => signInWithDiscord()}
            className="w-full"
        >
            <Discord className="w-5 h-5 mr-2" />
            Sign in with Discord
        </Button>
    )
}

