import { signInWithDiscord } from './actions'

export default function LoginPage() {
    return (
        <button onClick={signInWithDiscord} >Login</button>
    )
}