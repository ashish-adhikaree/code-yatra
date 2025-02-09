import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import editProfile from "./components/edit-profile-pages";
import EditProfile from "./components/edit-profile-pages";
import { createClient } from "@/lib/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
} = await supabase.auth.getUser();

if (user) {
    const { data: userProfile, error:user_error} = await supabase
        .from("user_profiles")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

  if(user_error){
    <div>Something Went Wrong</div>
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start items-start mt-10">
        {/* Profile Pictures */}
        <div className="flex flex-row justify-center items-center  lg:ml-40 gap-20">
          {/* Profile Picture */}
          <div>
            <Avatar className="h-32 w-32 rounded-full">
              <AvatarImage
                className="h-full w-full object-cover"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>Profile Picture</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-start items-center gap-10">
              <h4 className="font-semibold text-2xl">{userProfile?.fullname}</h4>
              <EditProfile user={userProfile}/>
            </div>

            {/* Information  */}
            <div className="flex flex-row justify-between items-center gap-10">
              <h4 className="text-lg font-extralight">
                <span className="font-semibold">{userProfile?.total_volunteering_hours}</span> hours
              </h4>
              <h4 className="text-lg font-extralight">
                <span className="font-semibold">{userProfile?.total_volunteering_points}</span> points
              </h4>
              <h4 className="text-lg font-extralight">
                <span className="font-semibold">{userProfile?.total_events_attended}</span> events attended
              </h4>
            </div>

            {/* Bio */}
            <div className="flex">
              <p>{userProfile?.bio}</p>
            </div>
          </div>
        </div>

        {/* Organizations */}
        <div className="w-full flex flex-row justify-center items-center mt-20 gap-5 lg:gap-20">

            <div className="flex flex-col justify-center items-center gap-3 ">
              <div>
                  <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage
                    className="h-full w-full object-cover"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>Profile Picture</AvatarFallback>
                </Avatar>
              </div>

              <div>
                <p>Organization Name</p>
              </div>

            </div>

            <div className="flex flex-col justify-center items-center gap-3 ">
              <div>
                  <Avatar className="h-16 w-16 rounded-full">
                  <AvatarImage
                    className="h-full w-full object-cover"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>Profile Picture</AvatarFallback>
                </Avatar>
              </div>

              <div>
                <p>Organization Name</p>
              </div>

            </div>
          
        </div>

        {/* Certificates */}
        <div className="w-full flex flex-col gap-10 mt-5">

          <div className="w-full flex flex-row gap-5 justify-center items-center">
            <h4>Certificates</h4>
            <hr className="w-full border border-white/10"></hr>
          </div>

          <div className="flex flex-wrap gap-10 pb-40">

            <div className="py-32 px-40 bg-red-500">
                 Certificate 1
            </div>
          

          </div>

        </div>
      </div>
    </div>
  );
}
}