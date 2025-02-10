import { Metadata } from "next";
import LoginForm from "./login-page";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginPage() {
    return (
        <main className="w-full max-w-lg">
            <LoginForm />
        </main>
    );
}
