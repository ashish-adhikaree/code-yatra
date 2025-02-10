import EditProfile from "./components/edit-profile-dialog";
import { createClient } from "@/lib/utils/supabase/server";
import ErrorBanner from "@/components/shared/error-banner";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProfilePic from "./components/profile-pic";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data: userProfile, error: user_error } = await supabase
            .from("user_profiles")
            .select("*, users_badges(badge_id(*)), users_categories(category_id(*))")
            .eq("auth_user_id", user.id)
            .maybeSingle();

        if (user_error) {
            return (
                <div className="max-w-container">
                    <ErrorBanner type="error">
                        <div>Something Went Wrong</div>
                    </ErrorBanner>
                </div>
            );
        }
        if (!userProfile) {
            return (
                <div className="max-w-container">
                    <ErrorBanner type="error">User doesn&apos;t exist</ErrorBanner>
                </div>
            );
        }

        const { data: categories, error: categoriesFetchError } = await supabase
            .from("volunteering_categories")
            .select("*");

        return (
            <div className="max-w-container">
                <div className="flex flex-col py-6">
                    <div className="flex flex-row justify-center items-center gap-20">
                        <ProfilePic user={userProfile} />

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-2xl">{userProfile.fullname}</h4>
                                <EditProfile user={userProfile} categories={categories}>
                                    <Button variant="ghost" size="icon">
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                </EditProfile>
                            </div>

                            <div className="flex justify-between items-center gap-10 w-fit">
                                <div className="font-extralight">
                                    <p className="font-semibold">{userProfile.total_volunteering_hours}</p>
                                    <p className="text-sm">volunteering hours</p>
                                </div>
                                <div className="font-extralight">
                                    <p className="font-semibold">{userProfile.total_volunteering_points}</p>{" "}
                                    <p className="text-sm">points</p>
                                </div>
                                <div className="font-extralight">
                                    <p className="font-semibold">{userProfile.total_events_attended}</p>
                                    <p className="text-sm">events attended</p>
                                </div>
                            </div>

                            <div className="flex">
                                <p>{userProfile?.bio}</p>
                            </div>

                            {userProfile.users_categories.length > 0 ? (
                                <div className="flex gap-2 flex-wrap">
                                    {userProfile.users_categories.map((category, index) => (
                                        <TooltipProvider key={index}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className="px-2 py-1 border border-primary/30 rounded-md text-xs leading-none uppercase">
                                                        {category.category_id.title}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-[min(90vw,200px)]">{category.category_id.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            ) : null}
                            {userProfile.users_badges.length > 0 ? (
                                <div>
                                    <h5 className="font-medium text-lg">Achievements</h5>
                                    {userProfile.users_badges.map((badge, index) => (
                                        <TooltipProvider key={index}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span>{badge.badge_id.title}</span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-[min(90vw,200px)]">{badge.badge_id.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Certificates
                    <div className="w-full flex flex-col gap-10 mt-5">
                        <div className="w-full flex flex-row gap-5 justify-center items-center">
                            <h4>Certificates</h4>
                            <hr className="w-full border border-white/10"></hr>
                        </div>

                        <div className="flex flex-wrap gap-10 pb-40">
                            <div className="py-32 px-40 bg-red-500">Certificate 1</div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}
