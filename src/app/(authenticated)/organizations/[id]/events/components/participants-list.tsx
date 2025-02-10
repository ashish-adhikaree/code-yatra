import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "@/lib/utils/supabase/types";
import ExportParticipants from "./export-participants";
import { CustomTable } from "./table";
import COLUMNS from "./participants-column-def";

export default async function ParticipantsList({ event }: { event: Tables<"events"> }) {
    const supabase = await createClient();
    const { data: participants, error } = await supabase.from("event_signups").select("*").eq("event_id", event.id);

    if (error) {
        return (
            <ErrorBanner type="error">
                Something went wrong while fetching the participants. Please retry later.
            </ErrorBanner>
        );
    }
    if (!participants || participants.length == 0) {
        return <ErrorBanner type="warning">No participants found.</ErrorBanner>;
    }

    const { data: userProfiles, error: errorUserProfiles } = await supabase
        .from("user_profiles")
        .select("*, users_categories(category_id(title))")
        .in(
            "auth_user_id",
            participants.map((p) => p.user_id)
        );

    if (errorUserProfiles) {
        return (
            <ErrorBanner type="error">
                Something went wrong while fetching the participants. Please retry later.
            </ErrorBanner>
        );
    }
    if (!userProfiles || userProfiles.length == 0) {
        return <ErrorBanner type="warning">No participants found.</ErrorBanner>;
    }
    return (
        <div className="py-2">
            <CustomTable
                data={Array.from(
                    new Set(
                        participants
                            .map((participant) => {
                                const userProfile = userProfiles.find((up) => up.auth_user_id === participant.user_id);
                                if (!userProfile) return null;
                                return {
                                    id: participant.id,
                                    fullname: userProfile.fullname || "Unknown",
                                    volunteeringHours: userProfile.total_volunteering_hours || 0,
                                    points: userProfile.total_volunteering_points || 0,
                                    events: userProfile.total_events_attended || 0,
                                    categories: userProfile.users_categories
                                        ? userProfile.users_categories.map((c) => c.category_id.title)
                                        : [],
                                    status: participant.status,
                                    createdAt: participant.created_at,
                                    eventStatus: event.status,
                                };
                            })
                            .filter((val) => val != null)
                    )
                )}
                columns={COLUMNS}
                heading="Participants"
                actions={<ExportParticipants participants={participants} userProfiles={userProfiles} />}
                totalItems={participants.length}
            />
        </div>
    );
}
