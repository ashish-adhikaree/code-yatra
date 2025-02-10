import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import ApplyEventForm from "./apply-event-form";
import { Tables } from "@/lib/utils/supabase/types";

export default async function ApplyToEvent({
    eventId,
    status,
}: {
    eventId: number;
    status: Tables<"events">["status"];
}) {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return redirect("/login");
    }

    const { data: user_signup, error: user_signup_error } = await supabase
        .from("event_signups")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (user_signup_error) {
        return <ErrorBanner type="error">Couldn&apos;t fetch signups.</ErrorBanner>;
    }

    return (
        <div className="pt-2">
            {user_signup ? (
                <ErrorBanner>
                    {user_signup.status == "pending"
                        ? "You have already applied to this event!"
                        : user_signup.status == "rejected"
                        ? "Sorry, you haven't been selected this time. Don't feel demotivated, there are plenty of opportunities waiting for you!"
                        : "You have already been accepted to this event!"}
                </ErrorBanner>
            ) : status == "open" ? (
                <div className="flex flex-col gap-2 bg-muted/40 p-4 rounded-md border border-foreground/10">
                    <p>You haven&apos;t applied to this event yet!</p>
                    <ApplyEventForm eventId={eventId} />
                </div>
            ) : (
                <ErrorBanner type="error">The event is not open for applications.</ErrorBanner>
            )}
        </div>
    );
}
