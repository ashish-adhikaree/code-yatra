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
import { PencilIcon, XIcon } from "lucide-react";
import { Tables } from "@/lib/utils/supabase/types";
import ProfileFormMap from "./profile-map";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface User extends Tables<"user_profiles"> {
    users_badges: {
        badge_id: {
            title: string;
            description: string | null;
        };
    }[];
    users_categories: {
        category_id: {
            id: number;
            title: string;
            description: string | null;
        };
    }[];
}
export default function EditProfile({
    user,
    children,
    categories,
}: {
    user: User;
    children?: React.ReactNode;
    categories: Tables<"volunteering_categories">[] | null;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [radiusInKm, setRadiusInKm] = useState(1);

    const data = new FormData();
    if (user) {
        data.append("fullname", user.fullname || "");
        data.append("bio", user.bio || "");
        data.append("longitude", String(user.longitude));
        data.append("latitude", String(user.latitude));
        data.append("radius_in_km", String(user.radius_in_km));
        user.users_categories.forEach((category) => {
            if (category?.category_id.id) {
                data.append("categories[]", category.category_id.id.toString());
            }
        });
    }

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
                    <DialogDescription>Enter the following details and click Update to save changes.</DialogDescription>
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
                            {state?.errors?.fullname && <p className="text-red-500 text-xs">{state.errors.fullname}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                typeof="text"
                                id="bio"
                                name="bio"
                                defaultValue={state?.payload?.get("bio") as string}
                            />
                            {state?.errors?.bio && <p className="text-red-500 text-xs">{state.errors.bio}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="required_volunteers">Interested Categories*</Label>
                            <div className="flex flex-wrap gap-2 items-center">
                                {categories?.map((category) => {
                                    return (
                                        <div key={category.id} className="relative cursor-pointer">
                                            <Checkbox
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                id={category.id.toString()}
                                                name="categories[]"
                                                value={category.id.toString()}
                                                defaultChecked={
                                                    !!state?.payload
                                                        ?.getAll("categories[]")
                                                        ?.includes(category.id.toString())
                                                }
                                            />
                                            <div className="flex items-center text-sm px-3 py-1 rounded-xl gap-4 border categories-chip">
                                                <label htmlFor={category.id.toString()}>{category.title}</label>
                                                <XIcon className="h-4 w-4 group-has-checked:inline hidden pointer-events-none" />
                                            </div>
                                        </div>
                                    );
                                })}
                                {state?.errors?.categories && (
                                    <p className="text-red-500 text-xs">{state.errors.categories}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            {user.users_categories.map((category, index) => {
                                return (
                                    <div key={index} className="hidden">
                                        <input type="hidden" name="current_categories[]" value={category.category_id.id} />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="radius_in_km">
                                Radius in Km{" "}
                                <span className="text-xs">
                                    (You will be notified of events that are happening within this radius)
                                </span>
                            </Label>
                            <Input
                                type="string"
                                id="radius_in_km"
                                name="radius_in_km"
                                onChange={(e) => setRadiusInKm(parseFloat(e.target.value) || 1)}
                                defaultValue={(state?.payload?.get("radius_in_km") as string) || radiusInKm}
                                required
                            />
                            {state?.errors?.radius_in_km && (
                                <p className="text-red-500 text-xs">{state.errors.radius_in_km}</p>
                            )}
                        </div>
                        <ProfileFormMap radiusInKm={radiusInKm} />
                        <input type="hidden" name="id" value={user.id} />
                        {state?.generalErrorMessage && (
                            <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-end mt-6 gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <SubmitButton>Update</SubmitButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
