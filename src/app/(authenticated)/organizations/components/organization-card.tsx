import { Tables } from "@/lib/utils/supabase/types";
import CreateOrganizationDialog from "./create-organization-dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrganizationStatus({ children }: { children: Tables<"organizations_profiles">["status"] }) {
    let className = "px-2 py-[2px] border rounded-md text-xs leading-none uppercase ";

    switch (children) {
        case "pending":
            className += "bg-blue-500/10 text-blue-500 border-blue-500/30";
            break;
        case "approved":
            className += "bg-green-500/10 text-green-500 border-green-500/30";
            break;
        case "rejected":
            className += "bg-red-500/10 text-red-500 border-red-500/30";
            break;
        case "suspended":
            className += "bg-orange-500/10 text-orange-500 border-orange-500/30";
            break;
    }

    return <span className={className}>{children}</span>;
}

export default function OrganizationCard({ organization }: { organization: Tables<"organizations_profiles"> }) {
    return (
        <article className="bg-muted/40 px-4 pt-3 pb-4 rounded-md border border-foreground/10">
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <OrganizationStatus>{organization.status}</OrganizationStatus>
                    {organization.total_events_organized != 0 && (
                        <span className="px-2 py-[2px] border rounded-md text-xs leading-none uppercase bg-secondary">
                            {organization.total_events_organized} events
                        </span>
                    )}
                </div>
                <CreateOrganizationDialog organization={organization}>
                    <Button className="p-1 h-fit w-fit" size="icon" variant="ghost">
                        <PencilIcon />
                    </Button>
                </CreateOrganizationDialog>
            </div>
            <Link className="block" href={`/organizations/${organization.id}`}>
                <h5 className="font-medium">{organization.title}</h5>
                <p className="text-muted-foreground text-sm">{organization.description}</p>
            </Link>
        </article>
    );
}
