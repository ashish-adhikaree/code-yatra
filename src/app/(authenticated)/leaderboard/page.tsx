import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { TrophyIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default async function Podium() {
    const supabase = await createClient();
    const { data: users, error: user_errors } = await supabase
        .from("user_profiles")
        .select("*")
        .order("total_volunteering_points", { ascending: false });

    if (user_errors) {
        return <ErrorBanner type="error">Something went wrong!</ErrorBanner>;
    }

    if (!users || users.length === 0) {
        return <ErrorBanner type="warning">Failed to fetch the user</ErrorBanner>;
    }
    const secondRank = users[1];
    const firstRank = users[0];
    const thirdRank = users[2];

    return (
        <div className="container mx-auto flex flex-col items-center justify-center">
            <div className="w-full flex flex-col justify-center items-center gap-10">
                <div className="flex flex-row justify-center place-items-center gap-16 mt-20">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <TrophyIcon size={42} className="text-gray-400" />
                            <div className="flex flex-col justify-center items-center pt-5">
                                <h4>{secondRank.fullname}</h4>
                                <div className="flex items-center flex-wrap gap-1 text-muted-foreground pt-3">
                                    <p className="">{secondRank.total_volunteering_points}pts</p>|
                                    <p>{secondRank.total_volunteering_hours}hrs</p>|{" "}
                                    <p>{secondRank.total_events_attended} events</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md min-h-72 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center bg-gradient-to-b from-gray-400 to-transparent">
                            <p className="text-5xl">
                                2<span className="text-base">nd</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <TrophyIcon size={42} className="text-yellow-400" />
                            <div className="flex flex-col justify-center items-center pt-5">
                                <h4>{firstRank.fullname}</h4>
                                <div className="flex items-center flex-wrap gap-1 text-muted-foreground pt-3">
                                    <p className="">{firstRank.total_volunteering_points}pts</p>|
                                    <p>{firstRank.total_volunteering_hours}hrs</p>|{" "}
                                    <p>{firstRank.total_events_attended} events</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md min-h-96 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center bg-gradient-to-b from-yellow-400 to-transparent">
                            <p className="text-5xl">
                                1<span className="text-base">st</span>
                            </p>
                        </div>
                    </div>

                    {thirdRank ? (
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="flex flex-col justify-center items-center">
                                <TrophyIcon size={42} className="text-amber-600" />
                                <div className="flex flex-col justify-center items-center pt-5">
                                    <h4>{thirdRank.fullname}</h4>
                                    <div className="flex items-center flex-wrap gap-1 text-muted-foreground pt-3">
                                        <p className="">{thirdRank.total_volunteering_points}pts</p>|
                                        <p>{thirdRank.total_volunteering_hours}hrs</p>|{" "}
                                        <p>{thirdRank.total_events_attended} events</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-md min-h-60 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center bg-gradient-to-b from-amber-600 to-transparent">
                                <p className="text-5xl">
                                    3<span className="text-base">rd</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <div className="w-full pb-32">
                {users.length > 3 && (
                    <Table className="w-full justify-evenly">
                        <TableHeader className="hidden">
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Total Points</TableHead>
                                <TableHead>Total Hours Completed</TableHead>
                                <TableHead>Total Events Attended</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((users, index) => {
                                if (index < 3) return;
                                return (
                                    <TableRow key={index} className="even:bg-muted">
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{users.fullname}</TableCell>
                                        <TableCell>{users.total_volunteering_points} points</TableCell>
                                        <TableCell>{users.total_volunteering_hours.toFixed(2)}hrs</TableCell>
                                        <TableCell>{users.total_events_attended} events</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
