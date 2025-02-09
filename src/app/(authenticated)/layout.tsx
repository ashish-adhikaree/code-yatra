import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import AddFullNameDialog from "./components/add-fullname-dialog";

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
        const { data: userProfile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("auth_user_id", user.id)
            .single();
        return (
            <div className="space-y-4">
                <Header />
                <div className="min-h-[60vh]">{userProfile?.fullname ? children: <AddFullNameDialog/>}</div>
                <Footer />
            </div>
        );
    }
    return redirect("/login");
}
