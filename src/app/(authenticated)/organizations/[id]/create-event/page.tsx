import { Metadata } from "next";
import { getOrganizationDetails } from "../page";
import ErrorBanner from "@/components/shared/error-banner";
import { createClient } from "@/lib/utils/supabase/server";
import CreateEventForm from "./create-event-form";

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

    return <div className="max-w-container">
        <CreateEventForm organization={organization} categories={categories} />
    </div>;
}
