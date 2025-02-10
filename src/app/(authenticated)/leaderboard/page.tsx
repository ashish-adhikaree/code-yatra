import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { TrophyIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Podium() {
    const supabase = await createClient();
    const { data: user, error: user_errors } = await supabase
        .from("user_profiles")
        .select("*")
        .order("total_volunteering_points", { ascending: false });

    if (user_errors) {
        return <ErrorBanner type="error">Something went wrong!</ErrorBanner>;
    }

    if (!user || user.length === 0 || user === null) {
        return <ErrorBanner type="warning">Failed to fetch the user</ErrorBanner>;
    }
    const secondRank = user[1];
    const firstRank = user[0];
    const ThirdRank = user[2];

    return (
        <div className="container mx-auto flex flex-col items-center justify-center">
            <div className="w-full flex justify-start items-start">
                <h4 className="text-2xl">Top Volunteers</h4>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-10">
                <div className="flex flex-row justify-center place-items-center gap-16 mt-20">
                    {/* Podium */}

                    {/* Second Place */}
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <TrophyIcon size={42} className="text-muted-foreground" />
                            <div className="flex flex-col justify-center items-center pt-5">
                                <h4>{secondRank.fullname}</h4>
                                <p>{secondRank.total_volunteering_hours} points</p>
                            </div>
                        </div>
                        <div
                            className="rounded-md min-h-72 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center "
                            style={{
                                background: "linear-gradient(to top,  transparent 30%, #383838)",
                            }}
                        >
                            <p className="text-5xl">2nd</p>
                        </div>
                    </div>

                    {/* First Place */}
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <TrophyIcon size={42} className="text-yellow-600" />
                            <div className="flex flex-col justify-center items-center pt-5">
                                <h4>{firstRank.fullname}</h4>
                                <p>{firstRank.total_volunteering_hours} points</p>
                            </div>
                        </div>

                        <div
                            className="rounded-md min-h-96 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center "
                            style={{
                                background: "linear-gradient(to top,  transparent 30%, #383838)",
                            }}
                        >
                            <p className="text-5xl">1st</p>
                        </div>
                    </div>

                    {/* Third Place */}
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <TrophyIcon size={42} className="text-amber-800" />
                            <div className="flex flex-col justify-center items-center pt-5">
                                <h4>{ThirdRank?.fullname !== undefined ? ThirdRank?.fullname : "No user Found!"}</h4>
                                <p>
                                    {ThirdRank?.total_volunteering_points !== undefined
                                        ? ThirdRank?.total_volunteering_points
                                        : null}{" "}
                                    points
                                </p>
                            </div>
                        </div>
                        <div
                            className="rounded-md min-h-60 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center "
                            style={{
                                background: "linear-gradient(to top,  transparent 20%, #383838)",
                            }}
                        >
                            <p className="text-5xl">3rd</p>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {user?.length > 4 && (
                        <Table className="w-full justify-evenly">
                            <TableCaption>A list of Volunteers ranking based on their points.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rank</TableHead>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Total Points</TableHead>
                                    <TableHead>Total Hours Completed</TableHead>
                                    <TableHead>Total Events Attended</TableHead>
                                </TableRow>
                            </TableHeader>
                            {user.map((users, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell className="font-medium">{index}</TableCell>
                                        <TableCell>{users.fullname}</TableCell>
                                        <TableCell>{users.total_volunteering_points}</TableCell>
                                        <TableCell>{users.total_volunteering_hours}</TableCell>
                                        <TableCell>{users.total_events_attended}</TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}
