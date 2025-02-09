import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/utils/supabase/types";
import { getParsedPaginationParams } from "@/lib/zod-schemas/shared";
import DeleteEvent from "../../../components/delete-event";
import ParticipantsList from "../components/participants-list";
import { EventStatus } from "@/app/(authenticated)/components/event-card";
import ParticipantsCount from "@/app/(authenticated)/components/participants-count";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EventsLocation from "../components/events-locations";

export async function getOrganizationDetails(params: { id: string; supabaseClient?: SupabaseClient<Database> }) {
    const supabase = params.supabaseClient || (await createClient());
    const {
        data: { user: loggedInUser },
    } = await supabase.auth.getUser();
    if (!loggedInUser) {
        redirect("/login");
    }

    const { data: organization, error } = await supabase
        .from("organizations_profiles")
        .select(
            `
    *,
    users_organizations!inner(user_id)
  `
        )
        .eq("id", parseInt(params.id, 10))
        .maybeSingle();

    return { organization, error, loggedInUser };
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ ["event-id"]: string; id: string }>;
    searchParams: Promise<{ page?: string; size?: string }>;
}) {
    const parsedSearchParams = getParsedPaginationParams(await searchParams) ?? { page: 0, size: 10 };
    const supabase = await createClient();
    const { data: event, error } = await supabase
        .from("events")
        .select("*, events_categories(category_id(title))")
        .eq("id", parseInt((await params)["event-id"]))
        .maybeSingle();

    if (error) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">
                    Something went wrong while fetching the event. Please retry later.
                </ErrorBanner>
            </div>
        );
    }
    if (!event) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">Event doesn&apos;t exist.</ErrorBanner>
            </div>
        );
    }

    const categories = event.events_categories.map((category) => category.category_id.title);

    // const isAuthor = organization.users_organizations.some((user) => user.user_id === loggedInUser.id);
    const isAuthor = true;
    return (
        <div className="max-w-container space-y-4">
            <div className="space-y-2">
                <Link
                    className="flex items-center gap-2 text-sm hover:bg-muted pr-2 rounded-md w-fit transition-all ease-in-out"
                    href={`/organizations/${(await params).id}`}
                >
                    <ArrowLeft className="h-6 w-6" />
                    <p>Back</p>
                </Link>
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                        <EventStatus>{event.status}</EventStatus>
                        {event.required_volunteers != 0 && (
                            <span className="px-2 py-[2px] border rounded-md text-xs leading-none uppercase bg-secondary">
                                {event.required_volunteers} volunteers required
                            </span>
                        )}
                        <ParticipantsCount eventId={event.id} />
                    </div>
                    {isAuthor ? (
                        <div className="flex items-center gap-2 flex-wrap">
                            <DeleteEvent id={event.id} />
                        </div>
                    ) : null}
                </div>
                <div>
                    <h1 className="text-lg font-medium">{event.title}</h1>
                    <p className="text-muted-foreground max-w-lg">{event.description}</p>
                    <div className="flex items-center gap-2 text-muted-foreground w-fit py-2">
                        <MapPin className="h-6 w-6" />
                        <p className="text-sm">{event.location}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="px-0">View exact location</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Exact Location of the event</DialogTitle>
                                <DialogDescription>
                                    This is the exact location of the event. Please reach out to the organizer for more
                                    details.
                                </DialogDescription>
                                <div>
                                    <EventsLocation
                                        latitude={event.latitude}
                                        longitude={event.longitude}
                                        radiusInKm={event.radius_in_km}
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
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
                {/* <ParticipantsList organization={event} searchParams={parsedSearchParams} /> */}
            </div>
        </div>
    );
}
