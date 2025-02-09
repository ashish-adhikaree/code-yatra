import ErrorBanner from "@/components/shared/error-banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/utils/supabase/server";
import { error } from "console";
import { Trophy, TrophyIcon } from "lucide-react";

export default async function  Podium() { 
    const supabase = await createClient();
    const {data:user,error:user_errors} = await supabase
    .from("user_profiles")
    .select("*")
    .order("total_volunteering_points", { ascending: false });

    if(user_errors){
        <ErrorBanner type="error">Something went wrong!</ErrorBanner>
    }

    if(!user || user.length === 0){
        <ErrorBanner type="warning">Failed to fetch the user</ErrorBanner>
    }
    const secondRank = user[1];
    const firstRank  = user[0];
    const ThirdRank = user[2];
    console.log(secondRank);
    console.log(firstRank)
    console.log(ThirdRank);

    return (
        
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          
            <div className="w-full flex justify-start items-start">
                <h4 className="text-2xl">Top Volunteers</h4>
            </div>
            <div className="flex flex-row justify-center place-items-center gap-8 mt-20">
            {/* Podium */}
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                    <TrophyIcon size={42}/>
                    <div className="flex flex-col justify-center items-center pt-5">
                        <h4>{secondRank.fullname}</h4>
                        <p>{secondRank.total_volunteering_hours} points</p>
                    </div>
                </div>
            <div
                className="rounded-md min-h-72 min-w-32 backdrop-blur-3xl flex flex-row justify-center items-center "
                style={{
                    background: "linear-gradient(to top,  transparent 30%, #383838)"
                }}
            >
                <p className="text-8xl">{2}</p>
            </div>
            </div>
            <div
                className="rounded-md min-h-96 min-w-32 backdrop-blur-3xl"
                style={{
                    background: "linear-gradient(to top,  transparent 30%, #383838)"
                }}
            >
                First Place
            </div>

            <div
                className="rounded-md min-h-60 min-w-32 backdrop-blur-3xl"
                style={{
                    background: "linear-gradient(to top,  transparent 30%, #383838)"
                }}
            >
                Third Place
            </div>

            </div>



        </div>
    );
}
