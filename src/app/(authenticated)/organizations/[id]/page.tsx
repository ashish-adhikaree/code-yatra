import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import { OrganizationStatus } from "../components/organization-card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import CreateOrganizationDialog from "../components/create-organization-dialog";
import DeleteOrganization from "../components/delete-organization";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/utils/supabase/types";
import OrganizationEventsList from "../components/organizations-events-list";
import { getParsedPaginationParams } from "@/lib/zod-schemas/shared";

export async function getOrganizationDetails(params: { id: string; supabaseClient?: SupabaseClient<Database> }) {
    const supabase = params.supabaseClient || (await createClient());
    const {
        data: { user: loggedInUser },
    } = await supabase.auth.getUser();
    if (!loggedInUser) {
        redirect("/login");
    }

    const { data: organization, error } = await supabase
        .from("organizations_profiles")
        .select(
            `
    *,
    users_organizations!inner(user_id)
  `
        )
        .eq("id", parseInt(params.id, 10))
        .maybeSingle();

    return { organization, error, loggedInUser };
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string; size?: string }>;
}) {
    const { id } = await params;
    const parsedSearchParams = getParsedPaginationParams(await searchParams) ?? { page: 0, size: 10 };
    const { organization, error, loggedInUser } = await getOrganizationDetails({ id });

    if (error) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">
                    Something went wrong while fetching the organization. Please retry later.
                </ErrorBanner>
            </div>
        );
    }
    if (!organization) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">Organization doesn&apos;t exist.</ErrorBanner>
            </div>
        );
    }

    const isAuthor = organization.users_organizations.some((user) => user.user_id === loggedInUser.id);

    return (
        <div className="max-w-container space-y-4">
            <div className="space-y-2">
                <Link
                    className="flex items-center gap-2 text-sm hover:bg-muted pr-2 rounded-md w-fit transition-all ease-in-out"
                    href="/organizations"
                >
                    <ArrowLeft className="h-6 w-6" />
                    <p>Back</p>
                </Link>
                <div className="flex items-center gap-2 justify-between flex-wrap">
                    <div className="flex items-center gap-2">
                        {isAuthor ? <OrganizationStatus>{organization.status}</OrganizationStatus> : null}
                        {organization.total_events_organized != 0 && (
                            <span className="px-2 py-[2px] border rounded-md text-xs leading-none uppercase bg-secondary">
                                {organization.total_events_organized} events
                            </span>
                        )}
                    </div>
                    {isAuthor ? (
                        <div className="flex items-center gap-2">
                            <CreateOrganizationDialog organization={organization}>
                                <Button size="icon" variant="ghost">
                                    <PencilIcon />
                                </Button>
                            </CreateOrganizationDialog>
                            <DeleteOrganization id={organization.id} />
                            <Link
                                title={
                                    organization.status == "approved"
                                        ? "Create Event"
                                        : "Wait for the organization to be approved."
                                }
                                className={cn(
                                    buttonVariants(),
                                    organization.status == "approved" ? "" : "opacity-75 cursor-not-allowed"
                                )}
                                href={
                                    organization.status == "approved"
                                        ? `/organizations/${organization.id}/create-event`
                                        : "#"
                                }
                            >
                                <PlusIcon />
                                Create Event
                            </Link>
                        </div>
                    ) : null}
                </div>
                <div>
                    <h1 className="text-lg font-medium">{organization.title}</h1>
                    <p className="text-muted-foreground max-w-lg">{organization.description}</p>
                </div>
                <OrganizationEventsList
                    isAuthor={isAuthor}
                    organization={organization}
                    searchParams={parsedSearchParams}
                />
            </div>
        </div>
    );
}
