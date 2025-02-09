"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/lib/utils/supabase/types";
import { Label } from "@radix-ui/react-label";
import { useActionState, useEffect, useState } from "react";
import EventFormMap from "./event-form-map";
import { createEvent } from "../action";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/shared/submit-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function CreateEventForm({
    organization,
    categories,
}: {
    organization: Tables<"organizations_profiles">;
    categories: Tables<"volunteering_categories">[] | null;
}) {
    const [state, createEventAction] = useActionState(createEvent, undefined);
    const [radiusInKm, setRadiusInKm] = useState(1);
    const router = useRouter();
    useEffect(() => {
        if (state?.success) {
            router.push(`/organizations/${organization.id}/events/${state.eventId}`);
        }
    }, [state]);

    return (
        <form action={createEventAction} className="space-y-6">
            <div>
                <h1 className="text-lg font-medium">Create a new event</h1>
                <p className="text-muted-foreground">Enter the details below to create a new event.</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title*</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={state?.payload?.get("title") as string}
                        required
                    />
                    {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={state?.payload?.get("description") as string}
                    />
                    {state?.errors?.description && <p className="text-red-500 text-xs">{state.errors.description}</p>}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date*</Label>
                        <input
                            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            type="datetime-local"
                            id="start_date"
                            name="start_date"
                            defaultValue={state?.payload?.get("start_date") as string}
                            required
                        />
                        {state?.errors?.start_date && <p className="text-red-500 text-xs">{state.errors.start_date}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date*</Label>
                        <input
                            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            type="datetime-local"
                            id="end_date"
                            name="end_date"
                            defaultValue={state?.payload?.get("end_date") as string}
                            required
                        />
                        {state?.errors?.end_date && <p className="text-red-500 text-xs">{state.errors.end_date}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="required_volunteers">Required Volunteers*</Label>
                        <Input
                            type="number"
                            id="required_volunteers"
                            name="required_volunteers"
                            defaultValue={state?.payload?.get("required_volunteers") as string}
                            required
                        />
                        {state?.errors?.required_volunteers && (
                            <p className="text-red-500 text-xs">{state.errors.required_volunteers}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="radius_in_km">Radius of the event zone* (in Km)</Label>
                        <Input
                            type="string"
                            id="radius_in_km"
                            name="radius_in_km"
                            onChange={(e) => setRadiusInKm(parseFloat(e.target.value) || 1)}
                            defaultValue={(state?.payload?.get("radius_in_km") as string) || radiusInKm}
                            required
                        />
                        {state?.errors?.radius_in_km && (
                            <p className="text-red-500 text-xs">{state.errors.radius_in_km}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="required_volunteers">Related Categories*</Label>
                    <div className="flex flex-wrap gap-2 items-center">
                        {categories?.map((category) => {
                            console.log(state?.payload?.getAll("categories[]"));
                            return (
                                <div key={category.id} className="relative cursor-pointer">
                                    <Checkbox
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        id={category.id.toString()}
                                        name="categories[]"
                                        value={category.id.toString()}
                                        defaultChecked={
                                            !!state?.payload?.getAll("categories[]")?.includes(category.id.toString())
                                        }
                                    />
                                    <div className="flex items-center text-sm px-3 py-1 rounded-xl gap-4 border categories-chip">
                                        <label htmlFor={category.id.toString()}>{category.title}</label>
                                        <XIcon className="h-4 w-4 group-has-checked:inline hidden" />
                                    </div>
                                </div>
                            );
                        })}
                        {state?.errors?.categories && <p className="text-red-500 text-xs">{state.errors.categories}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status*</Label>
                        <Select name="status" required defaultValue={state?.payload?.get("status") as string}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="z-[400]">
                                <SelectItem value="open">Open (Receiving applications)</SelectItem>
                                <SelectItem value="closed">Closed (No more receiving applications)</SelectItem>
                                <SelectItem value="completed">Completed </SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.status && <p className="text-red-500 text-xs">{state.errors.status}</p>}
                    </div>
                </div>
                <EventFormMap radiusInKm={radiusInKm} />
                <input name="organization_id" value={organization.id} type="hidden"></input>
                {state?.generalErrorMessage && <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>}
            </div>
            <SubmitButton>Create event</SubmitButton>
        </form>
    );
}
