import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { env } from "~/env"
import { createClient } from "~/utils/supabase/client"

export default function LoginPage() {
    return (
        <form action={signInWithDiscord}>
            <button formAction={signInWithDiscord}>Login</button>
        </form>
    )
}

export async function signInWithDiscord() {
    const supabase = await createClient()
    console.log(env.NEXT_PUBLIC_URL)
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo: `${env.NEXT_PUBLIC_URL}/auth/callback` } })
    if (error) {
        console.log(error)
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}