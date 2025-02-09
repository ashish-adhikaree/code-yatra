import { createClient } from "@/lib/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ErrorBanner from "@/components/shared/error-banner";
import { Medal, TrophyIcon } from "lucide-react";
import Link from "next/link";

export default async function Leaderboard() {
    const supabase = await createClient();
    const { data: users_profiles, error: user_error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("total_volunteering_points", { ascending: false })
        .limit(4);

    if (user_error) {
        return <ErrorBanner type="error">Couldn&apos;t fetch users.</ErrorBanner>;
    }

    if (!users_profiles || users_profiles.length == 0) {
        return <ErrorBanner type="warning">No users found.</ErrorBanner>;
    }

    return (
        <div className="w-full bg-muted/40 rounded-md border border-foreground/10 p-4">
            {users_profiles.map((user, index) => (
                <div key={index} className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex justify-start">
                        <h5 className="text-lg font-medium">Leaderboards</h5>
                    </div>
                    <Link
                        href={`/users/${user.id}`}
                        className="w-full flex flex-row justify-between items-center p-2 hover:bg-muted rounded-md transition-colors ease-in-out duration-300"
                    >
                        <div className="flex flex-row justify-center items-center gap-5">
                            <TrophyIcon className="h-8 w-8" />
                            <div className="space-y-2">
                                <h5>{user.fullname}</h5>
                                <div className="flex items-center gap-2">
                                    <Medal className="h-5 w-5" />
                                    <p>{user.total_volunteering_points}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
