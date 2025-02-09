import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { createClient } from "@/lib/utils/supabase/server";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="space-y-4">
            <Header user={user} />
            {children}
            <Footer />
        </div>
    );
}
