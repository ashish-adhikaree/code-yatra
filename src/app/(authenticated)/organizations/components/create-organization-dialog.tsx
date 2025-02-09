"use client";

import { useActionState, useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createOrganization, updateOrganization } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CreateOrganizationDialog({
    organization,
    children,
}: {
    organization?: { id: number; title: string; description: string | null };
    children?: React.ReactNode;
}) {
    const defaultFormData = new FormData();
    if (organization) {
        defaultFormData.append("title", organization.title);
        defaultFormData.append("description", organization.description || "");
    }
    const [open, setOpen] = useState(false);
    const [state, createOrganizationAction] = useActionState(
        organization ? updateOrganization : createOrganization,
        organization ? { payload: defaultFormData } : undefined
    );
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            router.refresh();
        }
    }, [state]);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children ? (
                        children
                    ) : (
                        <Button>
                            <Plus />
                            <p>Create Organization</p>
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new organization</DialogTitle>
                        <DialogDescription>
                            Enter the following details and click create to create a new organization.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={createOrganizationAction} className="space-y-6">
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="title">Title*</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={state?.payload?.get("title") as string}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={state?.payload?.get("description") as string}
                                />
                            </div>
                            {organization ? (
                                <>
                                    <input name="id" value={organization.id} type="hidden"></input>
                                </>
                            ) : null}
                            {state?.generalErrorMessage && (
                                <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end mt-6 gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <SubmitButton>{organization ? "Update" : "Create"}</SubmitButton>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
