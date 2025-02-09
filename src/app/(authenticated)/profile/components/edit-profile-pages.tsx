"use client";

import SubmitButton from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateUser } from "../action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";

export default function EditProfile({
  user,
  children,
}: {
  user: {
    id:number,
    auth_user_id:string,
    fullname: string;
    bio: string | null;
    latitude: number;
    longitude: number;
    radius_in_km: number;
    created_at:string,
    updated_at:string,
    available_dates:Array<string>,
    total_volunteering_hours:number,
    total_volunteering_points:number,
    total_events_attended:number,
  };
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const data = new FormData();
  if (user) {
    data.append("fullname", user.fullname);
    data.append("bio", user.bio || "");
    data.append("longitude",String(user.longitude));
    data.append("latitude", String(user.latitude));
    data.append("radius_in_km", String(user.radius_in_km));
  }
  // Handle form submission with `useActionState`
  const [state, editUserProfile] = useActionState(updateUser, {
    payload: data,
  });

  

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      router.refresh();
    }

  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <PencilIcon />
            <p>Edit Profile</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>
            Enter the following details and click Update to save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={editUserProfile} className="space-y-6">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="fullname">Full Name*</Label>
              <Input
                type="text"
                id="fullname"
                name="fullname"
                defaultValue={state?.payload?.get("fullname") as string}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                typeof="text"
                id="bio"
                name="bio"
                defaultValue={user?.bio || ""}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                type="number"
                id="latitude"
                name="latitude"
                defaultValue={user?.latitude}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                defaultValue={user?.longitude}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="latitude">Radius</Label>
              <Input
                type="number"
                id="radius"
                name="radius"
                defaultValue={user?.radius_in_km}
              />
            </div>
            <input type="hidden" name="id" value={user.id}/>

            {state?.generalErrorMessage && (
              <p className="text-red-500 text-xs">
                {state.generalErrorMessage}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end mt-6 gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton>Save</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
