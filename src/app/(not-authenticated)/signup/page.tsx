import { EmailIcon } from "@/components/shared/icons";
import SignupForm from "./signup-page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signuo",
};


export default async function Signup({ searchParams }: { searchParams: Promise<{ screen?: string }> }) {
    const screen = (await searchParams).screen;
    return (
        <main className="max-w-sm mx-auto py-10 lg:py-20">
            {screen == "confirm-email" ? (
                <div className="border rounded-md px-4 py-12 flex flex-col items-center gap-2 text-center">
                    <EmailIcon />
                    <h1 className="font-semibold text-primary text-lg">Confirm your email!</h1>
                    <p className="text-sm">
                        We&apos;ve sent you a confirmation email. Please confirm your email to login to the dashboard.
                    </p>
                </div>
            ) : (
                <SignupForm />
            )}
        </main>
    );
}
