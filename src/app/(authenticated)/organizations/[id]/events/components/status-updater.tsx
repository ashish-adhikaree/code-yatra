"use client";

import ErrorBanner from "@/components/shared/error-banner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/utils/supabase/client";

export function UpdateStatus(stats: any) {
    async function accept() {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("event_signups")
            .update({ status: stats })
            .eq("some_column", "someValue")
            .select();
    }

    return (
        <div className="flex gap-2">
            <Button>Accept</Button>
            <Button variant={"outline"}>Decline</Button>
        </div>
    );
}
