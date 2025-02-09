import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight } from "lucide-react";

export default async function Home() {
    const supabase = await createClient();
    const { data: events, error: event_error } = await supabase.from("events").select("*");

    const { data: users_profiles, error: user_error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("total_volunteering_points", { ascending: false })
        .limit(4);

    if (event_error) {
        <div>
            <p>Something went wrong!</p>
        </div>;
    }
    if (user_error) {
        <div>
            <p>Something went wrong!</p>
        </div>;
    }
    if (users_profiles === null) {
        <p>Something went wrong</p>;
    }
    if (events === null) {
        <div>
            <p>Something went wrong!</p>
        </div>;
    }
    return (
        <section>
            <div className="container mx-auto">
                <div className="flex flex-col">
                    {/* Header Bar */}
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col justify-start items-start gap-4">
                            <h4 className="text-2xl lg:text-5xl font-semibold">Welcome Back,User</h4>
                            <h6 className="text-white/50">Here are the list of the upcoming events</h6>
                        </div>
                        {/* Notification Icon */}
                        <div className="">{/* Notification Icon */}</div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-4 lg:gap-10 mt-10">
                        {/* Cards */}
                        <div className="col-span-2">
                            {events.map((currentElement, index) => (
                                <Card key={index} className="w-full flex flex-col px-5">
                                    <div className="flex flex-col justify-start items-start">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">{currentElement.title}</CardTitle>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex flex-col justify-start items-start gap-2">
                                                <p className="text-md">
                                                    {" "}
                                                    {new Date(currentElement.start_date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                                <p className="text-md">{currentElement.location}</p>
                                            </div>

                                            <CardDescription className="text-sm text-white/50 pt-10">
                                                {currentElement.description}
                                            </CardDescription>
                                        </CardContent>
                                    </div>

                                    <div className="flex justify-end items-start pb-10">
                                        <Button className="p-6 text-lg">
                                            Apply <ArrowRight />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* LeaderBoards */}

                        <div className="grid-cols-4">
                            <Card className="py-10">
                                {users_profiles.map((currentElement, index) => (
                                    <div key={index} className="w-full flex flex-col justify-center items-center px-8 ">
                                        <div className="w-full flex justify-start">
                                            <CardTitle className="text-lg">Leaderboards</CardTitle>
                                        </div>

                                        {/* After First Position */}
                                        <div className="w-full flex flex-row justify-between items-center border-b-2 border-b-white/10 py-3">
                                            <div className="flex flex-row justify-center items-center gap-5">
                                                {/* Avatar */}
                                                <div className="h-10 w-10 rounded-full">
                                                    <Avatar className="cursor-pointer ">
                                                        <AvatarImage
                                                            className="h-full w-full object-cover"
                                                            src="https://github.com/shadcn.png"
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex flex-col justify-start items-start">
                                                    <h5>{currentElement.fullname}</h5>
                                                    <p className="text-white/40">
                                                        {currentElement.total_volunteering_points}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4>{index + 1}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
