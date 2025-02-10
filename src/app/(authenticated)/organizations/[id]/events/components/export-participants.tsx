"use client";

import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/utils/supabase/types";
import { FileUp } from "lucide-react";

export const convertArrOfObjToCSV = (data: Record<any, any>[]) => {
    const header = Object.keys(data[0]).join(",") + "\n";

    const rows = data
        .map((obj) => {
            return Object.values(obj)
                .map((val) => {
                    if (typeof val === "string") {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                })
                .join(",");
        })
        .join("\n");

    return header + rows;
};

interface UserProfile extends Tables<"user_profiles">{
    users_categories: {
        category_id: {
            title: string;
        };
    }[]
}

export default function ExportParticipants({
    participants,
    userProfiles,
}: {
    participants: Tables<"event_signups">[];
    userProfiles: UserProfile[];
}) {
    function exportToCSV() {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            convertArrOfObjToCSV(
                participants
                    .map((participant) => {
                        const userProfile = userProfiles.find(
                            (userProfile) => userProfile.auth_user_id === participant.user_id
                        );
                        if (!userProfile) return null;
                        return {
                            user_id: participant.user_id,
                            name: userProfile.fullname,
                            total_points: userProfile.total_volunteering_points,
                            volunteering_hours: userProfile.total_volunteering_hours,
                            total_events_attended: userProfile.total_events_attended,
                            status: participant.status,
                            interested_categories: userProfile.users_categories.map((category) => category.category_id.title).join(","),
                        };
                    })
                    .filter((val) => val != null)
            );

        const encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }

    return (
        <div>
            <Button onClick={() => exportToCSV()} size="sm" variant="secondary">
                <FileUp />
                <p>Export to CSV</p>
            </Button>
        </div>
    );
}
