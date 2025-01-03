import { LoginButton } from "./login-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-black">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>
        <LoginButton />
      </div>
    </div>
  );
}
