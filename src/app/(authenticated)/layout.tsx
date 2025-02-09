import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

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
        return (
            <div className="space-y-4">
                <Header />
                <div className="min-h-[60vh]">
                {children}
                </div>
                <Footer />
            </div>
        );
    }
    return redirect("/login");
}