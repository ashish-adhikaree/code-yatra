import { createClient } from "@/lib/utils/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import AuthPageImage from "@public/assets/auth-page-image.jpg";
import Link from "next/link";
import Logo from "@/components/shared/logo";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/");
    }

    return (
        <div className="grid lg:grid-cols-2 min-h-screen">
            <div className="w-full h-full hidden lg:block">
                <Image
                    src={AuthPageImage}
                    className="w-full h-full object-cover"
                    alt="People Volunteering"
                    width={1000}
                    height={1000}
                />
            </div>
            <div className="px-4 lg:px-8 py-4">
                <Link href="/" className="flex items-end gap-2">
                    <Logo />
                    <p className="text-xl uppercase font-medium">Voluntier</p>
                </Link>
                <div className="flex items-center h-full w-full">{children}</div>
            </div>
        </div>
    );
}
