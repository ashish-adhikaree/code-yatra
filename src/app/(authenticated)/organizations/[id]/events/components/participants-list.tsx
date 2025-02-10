import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "@/lib/utils/supabase/types";
import ExportParticipants from "./export-participants";

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
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">
                    Something went wrong while fetching the participants. Please retry later.
                </ErrorBanner>
            </div>
        );
    }
    if (!participants || participants.length == 0) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="warning">No participants found.</ErrorBanner>
            </div>
        );
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
            <div className="max-w-container">
                <ErrorBanner type="error">
                    Something went wrong while fetching the participants. Please retry later.
                </ErrorBanner>
            </div>
        );
    }
    if (!userProfiles || userProfiles.length == 0) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="warning">No participants found.</ErrorBanner>
            </div>
        );
    }
    return (
        <div className="py-2">
            <div className="flex items-center gap-2 justify-between">
                <h2 className="text-lg font-medium">Participants</h2>
                <ExportParticipants participants={participants} userProfiles={userProfiles} />
            </div>
            {participants.map((participant) => {
                const userProfile = userProfiles.find((up) => up.auth_user_id === participant.user_id);
                if (!userProfile) return;
                return (
                    <article key={participant.id} className="">
                        <h3>{userProfile.fullname}</h3>
                        {/* <p>{userProfile}</p> */}
                    </article>
                );
            })}
        </div>
    );
}
