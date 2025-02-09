import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "@/lib/utils/supabase/types";
import EventCard from "../../components/event-card";
import Pagination from "@/components/shared/pagination";

export default async function OrganizationEventsList({
    isAuthor,
    organization,
    searchParams,
}: {
    isAuthor: boolean;
    organization: Tables<"organizations_profiles">;
    searchParams: { page: number; size: number };
}) {
    const supabase = await createClient();
    const { data: events, error } = await supabase
        .from("events")
        .select("*, events_categories(category_id(title))")
        .eq("organization_id", organization.id)
        .range(searchParams.page * searchParams.size, (searchParams.page + 1) * searchParams.size - 1)
        .order("created_at", { ascending: false });
    if (error) {
        return (
            <ErrorBanner type="error">Something went wrong while fetching the events. Please retry later.</ErrorBanner>
        );
    }
    if (!events || events.length === 0) {
        return <ErrorBanner type="error">No events found.</ErrorBanner>;
    }
    return (
        <div className="space-y-4 pt-6">
            {events.map((event) => (
                <EventCard key={event.id} event={event} isAuthor={isAuthor} />
            ))}
            <Pagination currentSize={events.length} size={searchParams.size} page={searchParams.page + 1} />
        </div>
    );
}
