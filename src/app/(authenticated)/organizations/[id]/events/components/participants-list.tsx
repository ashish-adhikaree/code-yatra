import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "@/lib/utils/supabase/types";

export default async function ParticipantsList({
    event,
    searchParams,
}: {
    event: Tables<"events">;
    searchParams: { page: number; size: number };
}) {
    const supabase = await createClient();
    const { data: participants, error } = await supabase.from("event_signups").select("*").eq("event_id", event.id);

    if (error) {
        return <div className="max-w-container">
            <ErrorBanner type="error">Something went wrong while fetching the participants. Please retry later.</ErrorBanner>
        </div>;
    }
    if (!participants || participants.length == 0) {
        return <div className="max-w-container">
            <ErrorBanner type="warning">No participants found.</ErrorBanner>
        </div>;
    }

    return <div>
        <h2>Participants</h2>
    </div>;
}
