import { signInWithDiscord } from './actions'

export default function LoginPage() {
    return (
        <form action={signInWithDiscord}>
            <button formAction={signInWithDiscord}>Login</button>
        </form>
    )
}