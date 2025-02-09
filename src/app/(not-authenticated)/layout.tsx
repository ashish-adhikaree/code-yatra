import { createClient } from "@/lib/utils/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import AuthPageImage from "@public/assets/auth-page-image.jpg"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
  }

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

    return <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="w-full h-full">
            <Image src={AuthPageImage} className="w-full h-full object-cover" alt="People Volunteering" width={1000} height={1000} />
        </div>
        <div className="flex items-center px-4 lg:px-8 h-full w-full">
            {children}
        </div>
    </div>
      
}