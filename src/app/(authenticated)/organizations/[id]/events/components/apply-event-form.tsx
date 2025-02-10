"use client";
import SubmitButton from "@/components/shared/submit-button";
import { applyToEvent } from "../../action";
import { useActionState } from "react";
import ErrorBanner from "@/components/shared/error-banner";

export default function ApplyEventForm({ eventId }: { eventId: number }) {
    const [state, applyToEventAction] = useActionState(applyToEvent, undefined);
    return (
        <div className="space-y-2">
            {state?.generalErrorMessage && <ErrorBanner type="error">{state.generalErrorMessage}</ErrorBanner>}
            <form action={applyToEventAction}>
                <input type="hidden" name="event_id" value={eventId} />
                <SubmitButton>Apply</SubmitButton>
            </form>
        </div>
    );
}
