import { createClient } from "@/lib/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ErrorBanner from "@/components/shared/error-banner";
import { Medal, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Leaderboard() {
    const supabase = await createClient();
    const { data: users_profiles, error: user_error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("total_volunteering_points", { ascending: false })
        .limit(3);

    if (user_error) {
        return <ErrorBanner type="error">Couldn&apos;t fetch users.</ErrorBanner>;
    }

    if (!users_profiles || users_profiles.length == 0) {
        return <ErrorBanner type="warning">No users found.</ErrorBanner>;
    }

    const rankSuffix = ["st", "nd", "rd"];
    const rankClassName = [
        "bg-yellow-600/10 text-yellow-600 border-yellow-600/30",
        "bg-gray-500/10 text-gray-400 border-gray-600/30",
        "bg-amber-800/10 text-amber-800 border-amber-800/30",
    ];

    return (
        <div className="w-full bg-muted/40 rounded-md border border-foreground/10 p-4 lg:sticky lg:top-20 h-fit">
            <div className="w-full flex justify-start pb-5">
                <h5 className="text-lg font-medium">Leaderboard</h5>
            </div>
            {users_profiles.map((user, index) => (
                <div key={index} className="w-full flex flex-col justify-center items-center gap-4">
                    <Link
                        href={`/users/${user.id}`}
                        className="w-full flex flex-row justify-between items-center p-2 hover:bg-muted rounded-md transition-colors ease-in-out duration-300"
                    >
                        <div className="flex flex-row justify-center items-center gap-5">
                            <p
                                className={cn(
                                    "border h-12 w-12 rounded-full flex items-center justify-center font-bold",
                                    rankClassName[index] || ""
                                )}
                            >
                                {index + 1}
                                <span className="text-sm">{rankSuffix[index]}</span>
                            </p>
                            <div className="space-y-1">
                                <h5>{user.fullname}</h5>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <p>{user.total_volunteering_points}pts</p>|<p>{user.total_volunteering_hours}hrs</p>
                                    | <p>{user.total_events_attended} events</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
