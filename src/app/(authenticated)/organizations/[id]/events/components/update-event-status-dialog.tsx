"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useActionState, useEffect, useState } from "react";
import { updateEventStatus } from "../../action";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/shared/submit-button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpdateEventStatus({
    children,
    eventId,
    status,
}: {
    children?: React.ReactNode;
    eventId: number;
    status: "open" | "closed" | "completed";
}) {
    const formData = new FormData();
    formData.append("status", status);
    const [state, updateEventStatusAction] = useActionState(updateEventStatus, {
        payload: formData,
    });
    const [open, setOpen] = useState(false);
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
                            <PencilIcon />
                            <p>Update Status</p>
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Event Status</DialogTitle>
                        <DialogDescription>Fill up the form below to update the event status</DialogDescription>
                    </DialogHeader>
                    <form action={updateEventStatusAction}>
                        <input type="hidden" name="id" value={eventId} />
                        <div className="space-y-2">
                            <Label htmlFor="status">Status*</Label>
                            <Select name="status" required defaultValue={state?.payload?.get("status") as string}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="z-[400]">
                                    <SelectItem value="open">Open (Receiving applications)</SelectItem>
                                    <SelectItem value="closed">Closed (No more receiving applications)</SelectItem>
                                    <SelectItem value="completed">Completed </SelectItem>
                                </SelectContent>
                            </Select>
                            {state?.errors?.status && <p className="text-red-500 text-xs">{state.errors.status}</p>}
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
        </div>
    );
}
