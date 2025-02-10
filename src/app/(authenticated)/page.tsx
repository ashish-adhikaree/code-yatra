import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Suspense } from "react";
import Leaderboard from "./components/leaderboard";
import EventCard from "./components/event-card";

export default async function Home() {
    const supabase = await createClient();
    const { data: events, error: event_error } = await supabase
        .from("events")
        .select("*, events_categories(category_id(title)), organizations_profiles(id, title)")
        .eq("status", "open")
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-container">
            <div>
                {event_error ? (
                    <div className="lg:col-span-2">
                        <ErrorBanner type="error">Couldn&apos;t fetch events.</ErrorBanner>
                    </div>
                ) : null}

                <div className="">
                    <p className="text-xl font-medium">Welcome Back!</p>
                    <p className="text-muted-foreground">Here are the list of the upcoming events</p>
                </div>

                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-4 lg:gap-10 mt-10 ">
                    {events && events.length > 0 ? (
                        <>
                            <div className="lg:col-span-2">
                                <h3 className="text-lg font-medium block lg:hidden">Events</h3>
                                <div className="space-y-4">
                                    {events.map((event, index) => (
                                        <EventCard key={index} event={event} />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="lg:col-span-2">
                            <ErrorBanner type="warning">No open events found.</ErrorBanner>
                        </div>
                    )}

                    <div className="w-full">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Leaderboard />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
