"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/lib/utils/supabase/types";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";

export default function CreateEventForm({
    organization,
    categories,
}: {
    organization: Tables<"organizations_profiles">;
    categories: Tables<"volunteering_categories">[] | null;
}) {
    const [state, createEventAction] = useActionState(undefined, undefined);
    
    return (
        <form action={createEventAction} className="space-y-6">
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="title">Title*</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={state?.payload?.get("title") as string}
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={state?.payload?.get("description") as string}
                    />
                </div>
                {organization ? (
                    <>
                        <input name="id" value={organization.id} type="hidden"></input>
                    </>
                ) : null}
                {state?.generalErrorMessage && <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>}
            </div>
        </form>
    );
}
