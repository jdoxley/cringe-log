import { signInWithDiscord } from './actions'

export default function LoginPage() {
    return (
        <form action={signInWithDiscord}>
            <button type='submit'>Login</button>
        </form>
    )
}