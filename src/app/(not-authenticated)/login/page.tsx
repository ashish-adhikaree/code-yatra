import { Metadata } from "next";
import LoginForm from "./login-page";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginPage() {
    return (
        <main className="max-w-sm mx-auto py-10 lg:py-20">
            <LoginForm />
        </main>
    );
}
