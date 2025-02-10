import { ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/utils/supabase/types";
import ParticipantsCount from "./participants-count";
import { Suspense } from "react";

export function EventStatus({ children }: { children: Tables<"events">["status"] }) {
    let className = "px-2 py-[2px] border rounded-md text-xs leading-none uppercase ";

    switch (children) {
        case "open":
            className += "bg-blue-500/10 text-blue-500 border-blue-500/30";
            break;
        case "completed":
            className += "bg-green-500/10 text-green-500 border-green-500/30";
            break;
        case "closed":
            className += "bg-orange-500/10 text-orange-500 border-orange-500/30";
            break;
    }

    return <span className={className}>{children}</span>;
}

interface Event extends Tables<"events"> {
    events_categories: {
        category_id: {
            title: string;
        };
    }[];
    organizations_profiles: {
        id: number;
        title: string;
    };
}

export default function EventCard({ event, isAuthor }: { event: Event; isAuthor?: boolean }) {
    const categories = event.events_categories.map((category) => category.category_id.title);
    return (
        <Link className="block" href={`/organizations/${event.organization_id}/events/${event.id}`}>
            <article className="w-full bg-muted/40 p-4 rounded-md border border-foreground/10 space-y-4">
                <div className="flex items-center gap-2 justify-between flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        <EventStatus>{event.status}</EventStatus>
                        <span className="px-2 py-[2px] border rounded-md text-xs leading-none uppercase bg-secondary">
                            {event.required_volunteers} Volunteers
                        </span>
                    </div>
                    <Suspense fallback={null}>
                        <ParticipantsCount eventId={event.id} />
                    </Suspense>
                </div>
                <div>
                    <p className="text-muted-foreground text-sm">
                        {format(event.start_date, "do MMM yyyy, hh:mm b")} to{" "}
                        {format(event.end_date, "do MMM yyyy, hh:mm b")}
                    </p>
                    <h5 className="text-lg font-medium text-primary">{event.title}</h5>
                    <Link href={`/organizations/${event.organization_id}`} className="text-sm">{event.organizations_profiles.title}</Link>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="flex gap-2">
                    {categories.map((category) => (
                        <span
                            key={category}
                            className="px-2 py-1 border border-primary/30 rounded-md text-xs leading-none uppercase"
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground w-fit">
                        <MapPin className="h-6 w-6" />
                        <p className="text-sm">
                            {event.location.slice(0, 50)}
                            {event.location.length > 50 ? "..." : ""}
                        </p>
                    </div>
                    <Button className="group">
                        Apply{" "}
                        <ArrowRight className="group-hover:translate-x-1 transition-all ease-in-out duration-300" />
                    </Button>
                </div>
            </article>
        </Link>
    );
}
