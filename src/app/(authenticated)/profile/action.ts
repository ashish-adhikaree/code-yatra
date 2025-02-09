"use server"

import {EditProfileState} from "@/lib/interface";
import { createClient } from "@/lib/utils/supabase/server";
import { EditProfileSchema } from "@/lib/zod-schemas/user";

import { redirect } from "next/navigation";


export async function updateUser(
  state: EditProfileState,
  formData: FormData
){
  try {
      const supabase = await createClient();
      const {
          data: { user },
      } = await supabase.auth.getUser();
      
      const validatedFields = EditProfileSchema.safeParse({
                  fullname: formData.get("fullname"),
                  bio: formData.get("bio"),
                  latitude:formData.get("latitude"),
                  longitude:formData.get('longitude'),
                  radius_in_km:formData.get("radius_in_km"),
             });

        if(!validatedFields.success){
          return {
            errors:validatedFields.error.format(),
            payload:formData,

          }
        }

        if (!user) return redirect("/login");

          const { error } = await supabase
              .from("user_profiles")
               .update({
                  fullname: validatedFields.data.fullname,
                   longitude:validatedFields.data.longitude,
                   latitude:validatedFields.data.latitude,
                   radius_in_km:validatedFields.data.radius_in_km,
                  bio:validatedFields.data.bio,
                })
              .eq("id", parseInt(formData.get("id") as string)); // Assuming 'id' is passed in form data
          if (error) {
                return {
                  success: false,
                  generalErrorMessage: error.message,
                  payload: formData,
                };
              }
      return {
          success: true,
      };
  } catch (err: any) {
      console.log(err);
      return {
          generalErrorMessage: err.message || "Something went wrong. Please try again.",
          payload: formData,
      };
  }
}
