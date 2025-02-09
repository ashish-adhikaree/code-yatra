import { Metadata } from "next";
import CreateOrganizationDialog from "./components/create-organization-dialog";
import { getParsedPaginationParams } from "@/lib/zod-schemas/shared";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import ErrorBanner from "@/components/shared/error-banner";
import OrganizationCard from "./components/organization-card";

export const metadata: Metadata = {
    title: "Organizations",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; size?: string }> }) {
    const queryParams = await searchParams;
    const parsedParams = getParsedPaginationParams(queryParams) ?? { page: 0, size: 10 };
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: organizations, error } = await supabase
        .from("users_organizations")
        .select("*,organization_id(*)")
        .eq("user_id", user.id)
        .range(parsedParams.page * parsedParams.size, (parsedParams.page + 1) * parsedParams.size);

    return (
        <div className="max-w-container space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-lg font-medium">Your Organizations</h1>
                <CreateOrganizationDialog />
            </div>
            {!error ? (
                <div>
                    {organizations && organizations.length > 0 ? (
                        <div className="grid grid-cols-4 gap-6">
                            {organizations.map((organization, index) => {
                                return <OrganizationCard key={index} organization={organization.organization_id} />;
                            })}
                        </div>
                    ) : (
                        <ErrorBanner type="warning">
                          {parsedParams.page === 0 ? "You have not created any organizations yet." : "No more organizations to show."}
                        </ErrorBanner>
                    )}
                </div>
            ) : (
                <ErrorBanner>Error fetching organizations list.</ErrorBanner>
            )}
        </div>
    );
}
