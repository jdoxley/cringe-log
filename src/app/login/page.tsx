import { LoginButton } from "./login-button"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen text-black">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>
                <LoginButton />
            </div>
        </div>
    )
}

