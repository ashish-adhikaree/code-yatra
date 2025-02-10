"use client";

import { useActionState, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addFullName } from "./add-dialog-action";
import SubmitButton from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";

export default function AddFullNameDialog() {
    const [open, _] = useState(true);
    const [state, addFullNameAction] = useActionState(addFullName, undefined);
    return (
        <div>
            <Dialog open={open} onOpenChange={() => {}}>
                <DialogTrigger className="hidden">
                    Open
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Fullname to continue</DialogTitle>
                        <DialogDescription className="hidden">
                            Please add your fullname to continue to dashboard.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={addFullNameAction}>
                        <div className="space-y-1">
                            <Input
                                className="*:"
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                defaultValue={state?.payload?.get("fullname") as string}
                            />

                            {state?.errors?.fullname && (
                                <p className="text-red-500 text-xs">{state.errors.fullname[0]}</p>
                            )}
                            {state?.generalErrorMessage && (
                                <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end mt-6 gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <SubmitButton>Submit</SubmitButton>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
