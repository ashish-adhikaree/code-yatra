"use client";

import { Tables } from "@/lib/utils/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/client";

export default function ProfilePic({ user }: { user: Tables<"user_profiles"> }) {
    const [error, setError] = useState("");
    const router = useRouter();

    // async function uploadFile(file: File) {
    //     const supabase = createClient();
    //     const { data, error } = await supabase.storage
    //         .from(process.env.NEXT_PUBLIC_BUCKET_NAME || "")
    //         .upload(`users/${user.auth_user_id}`, file, {
    //             upsert: true,
    //         });
    //     if (error || !data) {
    //         setError(error.message || "Something went wrong");
    //         // Handle error
    //     } else {
    //         console.log(data);
    //         const { error: userUpdateError } = await supabase
    //             .from("user_profiles")
    //             .update({
    //                 profile_pic: data.fullPath,
    //             })
    //             .eq("id", user.id);
    //         if (userUpdateError) {
    //             setError(userUpdateError.message || "Something went wrong");
    //         } else {
    //             router.refresh();
    //         }
    //     }
    // }

    return (
        <div className="relative group cursor-pointer">
            <Avatar className="h-32 w-32 rounded-full">
                <AvatarImage
                    className="h-full w-full object-cover"
                    src={user.profile_pic ? user.profile_pic : "https://github.com/shadcn.png"}
                    alt="@shadcn"
                />
                <AvatarFallback>Profile Picture</AvatarFallback>
            </Avatar>
            {/* <input
                type="file"
                className="absolute inset-0 z-2"
                onChange={(e) => (e.target.files?.[0] ? uploadFile(e.target.files[0]) : null)}
            /> */}
            {/* <div className="hidden group-hover:block bg-background rounded-full border p-1 absolute bottom-4 right-5 translate-x-1/2 translate-y-1/2">
                <PencilIcon className="h-4 w-4 " />
            </div> */}
        </div>
    );
}
