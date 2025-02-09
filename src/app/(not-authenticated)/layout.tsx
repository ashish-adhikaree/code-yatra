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
        return redirect("/");
    }

    return children;
}