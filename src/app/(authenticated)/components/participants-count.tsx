import { createClient } from "@/lib/utils/supabase/server";

export default async function ParticipantsCount({ eventId }: { eventId: number }) {
    const supabase = await createClient();
    const {
        data: participants,
        count,
        error,
    } = await supabase.from("event_signups").select("*", { count: "exact" }).eq("event_id", eventId);
    if (error) {
        return null;
    }
    return <div className="text-xs uppercase text-primary">{count} interested</div>;
}
