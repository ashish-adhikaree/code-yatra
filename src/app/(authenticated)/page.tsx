import ErrorBanner from "@/components/shared/error-banner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/utils/supabase/server";
import { ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Leaderboard from "./components/leaderboard";

export default async function Home() {
    const supabase = await createClient();
    const { data: events, error: event_error } = await supabase.from("events").select("*");

    if (event_error) {
        return <ErrorBanner type="error">Couldn&apos;t fetch events.</ErrorBanner>;
    }

    if (!events || events.length == 0) {
        return <ErrorBanner type="warning">No events found.</ErrorBanner>;
    }

    return (
        <div className="max-w-container">
            <div>
                <div className="">
                    <h4 className="text-xl font-medium">Welcome Back!</h4>
                    <h6 className="text-muted-foreground">Here are the list of the upcoming events</h6>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 lg:gap-10 mt-10 ">
                    <div className="col-span-2 space-y-4">
                        {events.map((event, index) => (
                            <article
                                key={index}
                                className="w-full bg-muted/40 p-4 rounded-md border border-foreground/10 space-y-4"
                            >
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        {format(event.start_date, "do MMM yyyy, hh:mm b")} to{" "}
                                        {format(event.start_date, "do MMM yyyy, hh:mm b")}
                                    </p>
                                    <h5 className="text-lg font-medium">{event.title}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 text-muted-foreground w-fit">
                                        <MapPin className="h-6 w-6" />
                                        <p className="text-sm">
                                            {event.location.slice(0, 50)}
                                            {event.location.length > 50 ? "..." : ""}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/organizations/${event.organization_id}/events/${event.id}`}
                                        className={cn(buttonVariants(), "group")}
                                    >
                                        Apply{" "}
                                        <ArrowRight className="group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* LeaderBoards */}

                    <div className="grid-cols-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Leaderboard />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
