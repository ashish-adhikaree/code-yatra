import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Suspense } from "react";
import Leaderboard from "./components/leaderboard";
import EventCard from "./components/event-card";

export default async function Home() {
    const supabase = await createClient();
    const { data: events, error: event_error } = await supabase
        .from("events")
        .select("*, events_categories(category_id(title))")
        .eq("status", "open")
        .order("created_at", { ascending: false });

    if (event_error) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">Couldn&apos;t fetch events.</ErrorBanner>;
            </div>
        );
    }

    if (!events || events.length == 0) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="warning">No events found.</ErrorBanner>;
            </div>
        );
    }

    return (
        <div className="max-w-container">
            <div>
                <div className="">
                    <p className="text-xl font-medium">Welcome Back!</p>
                    <p className="text-muted-foreground">Here are the list of the upcoming events</p>
                </div>

                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-4 lg:gap-10 mt-10 ">
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-medium block lg:hidden">Events</h3>
                        <div className="space-y-4">
                            {events.map((event, index) => (
                                <EventCard key={index} event={event} />
                            ))}
                        </div>
                    </div>

<<<<<<< HEAD

                    <div className="grid lg:grid-cols-3 gap-4 lg:gap-10 mt-10">
                    {/* Cards */}
                        <div className=" h-[200vh] col-span-2">
                            {
                                events.map((currentElement,index)=>(
                                    <Card key={index} className="w-full flex flex-col px-5">

                                        <div className="flex flex-col justify-start items-start">
                                        <CardHeader>
                                            <CardTitle className='text-2xl'>{currentElement.title}</CardTitle>
                                        </CardHeader>
                                        
                                        <CardContent>
                                            <div className="flex flex-col justify-start items-start gap-2">
                                                <p className="text-md"> {new Date(currentElement.start_date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year:"numeric",
                                                })}</p>
                                                <p className="text-md">{currentElement.location}</p>
                                            </div>

                                            <CardDescription className="text-sm text-white/50 pt-10">{currentElement.description}</CardDescription>
                                        </CardContent>
                                    </div>

                                    <div className="flex justify-end items-start pb-10">
                                    <Button className="p-6 text-lg">Apply <ArrowRight/></Button>
                                    </div>
                                </Card>
                                ))
                            }

                        </div>

=======
>>>>>>> 9cfc610b89cee5dd30b4ab167a812eeac99f1002
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
