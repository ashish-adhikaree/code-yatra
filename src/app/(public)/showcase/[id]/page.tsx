import EditProfile from "@/app/(authenticated)/profile/components/edit-profile-dialog";
import ProfilePic from "@/app/(authenticated)/profile/components/profile-pic";
import ErrorBanner from "@/components/shared/error-banner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/utils/supabase/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { PencilIcon } from "lucide-react";
import { redirect } from "next/navigation";

 const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();


    const {data:{user},error:authError} = await supabase.auth.getUser();
    if(authError || !user) return redirect("/login");

    console.log("Auth User Id:",user.id)
    console.log(id)
 
    const { data: userProfile, error: user_error } = await supabase
      .from("user_profiles")
      .select("*, users_badges(badge_id(*)), users_categories(category_id(*))")
      .eq("id", parseInt(id))
      .maybeSingle();

      if (user.id === userProfile?.auth_user_id) {
        redirect("/profile");
      }
      console.log("Auth User Id:",user.id)
      console.log(userProfile?.auth_user_id)

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
        <div className="flex flex-col justify-center items-center py-6">
          <div className="flex flex-col justify-center items-center">
            <ProfilePic user={userProfile} />

            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center gap-4 mt-4">
                <h4 className="font-semibold text-2xl">
                  {userProfile.fullname}
                </h4>
              </div>

              <div className="flex justify-between items-center gap-10 w-fit py-3">
                <div className="font-extralight flex flex-col justify-center items-center gap-2">
                  <p className="font-semibold">
                    {userProfile.total_volunteering_hours}
                  </p>
                  <p className="text-sm">volunteering hours</p>
                </div>
                <hr className="h-12 rotate-180 border border-white/20"></hr>
                <div className="font-extralight flex flex-col justify-center items-center gap-2">
                  <p className="font-semibold">
                    {userProfile.total_volunteering_points}
                  </p>{" "}
                  <p className="text-sm">points</p>
                </div>
                <hr className="h-12 rotate-180 border border-white/20"></hr>
                <div className="font-extralight flex flex-col justify-center items-center gap-2">
                  <p className="font-semibold">
                    {userProfile.total_events_attended}
                  </p>
                  <p className="text-sm">events attended</p>
                </div>
              </div>

              {userProfile.users_categories.length > 0 ? (
                <div className="flex gap-2 flex-wrap py-3">
                  {userProfile.users_categories.map((category, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="px-2 py-1 border border-primary/30 rounded-md text-xs leading-none uppercase">
                            {category.category_id.title}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-[min(90vw,200px)]">
                            {category.category_id.description}
                          </p>
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
                          <p className="max-w-[min(90vw,200px)]">
                            {badge.badge_id.description}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ) : null}

              <p className="max-w-xl text-center text-muted-foreground pb-20">
                {userProfile?.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Page