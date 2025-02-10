import { Metadata } from "next";
import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import CreateEventForm from "./create-event-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOrganizationDetails } from "../../actions";

export const metadata: Metadata = {
    title: "Create Event",
    description: "Create a new event for your organization",
    keywords: "create, event, organization",
};

export default async function CreateEvent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { organization, error, loggedInUser } = await getOrganizationDetails({ id, supabaseClient: supabase });
    const { data: categories, error: categoriesFetchError } = await supabase
        .from("volunteering_categories")
        .select("*");

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

    if (organization.status !== "approved") {
        if (organization.status === "suspended") {
            return (
                <div className="max-w-container">
                    <ErrorBanner type="error">Organization is suspended.</ErrorBanner>
                </div>
            );
        }
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">Organization is not approved to create event.</ErrorBanner>
            </div>
        );
    }

    if (!isAuthor) {
        return (
            <div className="max-w-container">
                <ErrorBanner type="error">You are not authorized to create event.</ErrorBanner>
            </div>
        );
    }

    return (
        <div className="max-w-container max-w-5xl space-y-4">
            <Link
                className="flex items-center gap-2 text-sm hover:bg-muted pr-2 rounded-md w-fit transition-all ease-in-out"
                href={`/organizations/${organization.id}`}  
            >
                <ArrowLeft className="h-6 w-6" />
                <p>Back</p>
            </Link>
            <CreateEventForm organization={organization} categories={categories} />
        </div>
    );
}
