"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tables } from "@/lib/utils/supabase/types";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/utils/supabase/client";
import { useState } from "react";
import Image from "next/image";
import Spinner from "@public/spinner.gif";
import { useRouter } from "next/navigation";

function ParticipantStatus({ children }: { children: Tables<"event_signups">["status"] }) {
    let className = "w-fit border rounded-md px-2 py-1 text-xs leading-none uppercase mt-2 ";

    switch (children) {
        case "pending":
            className += "text-blue-500 bg-blue-500/10 border-blue-500/30";
            break;
        case "approved":
            className += "text-green-500 bg-green-500/10 border-green-500/30";
            break;
        case "rejected":
            className += "text-red-500 bg-red-500/10 border-red-500/30";
            break;
        case "absent":
            className += "text-gray-500 bg-gray-500/10 border-gray-500/30";
            break;
        case "attended":
            className += "text-green-500 bg-green-500/10 border-green-500/30";
            break;
        default:
    }

    return <p className={className}>{children}</p>;
}

const columnHelper = createColumnHelper<{
    id: number;
    fullname: string;
    volunteeringHours: number;
    points: number;
    events: number;
    categories: string[];
    createdAt: string;
    status: Tables<"event_signups">["status"];
}>();

const COLUMNS = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    }),
    columnHelper.accessor("id", {
        header: () => {
            return <p className="pl-5">ID</p>;
        },
        cell: ({ getValue }) => {
            const id = getValue();
            return <div className="pl-5 py-3">{id}</div>;
        },
    }),
    columnHelper.accessor("categories", {
        header: () => {
            return <p className="pl-5">Categories</p>;
        },
        cell: ({ getValue }) => {
            const categories = getValue();
            return (
                <div>
                    <div className="flex gap-2 w-full max-w-[150px] overflow-x-auto scrollbar-none">
                        {categories.length == 0 ? "—" : ""}
                        {categories.map((category, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 h-fit whitespace-nowrap border border-primary/30 rounded-md text-xs leading-none uppercase"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            );
        },
        enableSorting: false,
    }),
    columnHelper.accessor("fullname", {
        header: "Fullname",
        cell: ({ getValue, row }) => {
            return (
                <div>
                    <p className="whitespace-nowrap">{getValue()}</p>
                    <ParticipantStatus>{row.original.status}</ParticipantStatus>
                </div>
            );
        },
    }),
    columnHelper.accessor("volunteeringHours", {
        header: "Volunteering Hours",
        cell: ({ getValue }) => {
            return <div>{getValue()}</div>;
        },
    }),
    columnHelper.accessor("points", {
        header: "Points",
        cell: ({ getValue }) => {
            return <div>{getValue()}</div>;
        },
    }),
    columnHelper.accessor("events", {
        header: "Events Attended",
        cell: ({ getValue }) => {
            return <div>{getValue()}</div>;
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "Submitted on",
        cell: ({ getValue }) => {
            const createdAt = getValue();
            return <div>{createdAt ? format(createdAt, "PPpp") : "—"}</div>;
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [errorMessage, setErrorMessage] = useState("");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [loadingState, setLoadingState] = useState({
                approved: false,
                rejected: false,
                attended: false,
                absent: false,
            });

            async function handleStatusChange(status: Tables<"event_signups">["status"]) {
                const supabase = createClient();
                try {
                    setLoadingState({ ...loadingState, [status]: true });
                    const { data, error } = await supabase
                        .from("event_signups")
                        .update({ status })
                        .eq("id", row.original.id)
                        .select("*");
                    const a = await supabase.from("event_signups").select("*").eq("id", row.original.id);
                    console.log(data, "abc", row.original.id, a);
                    if (error) {
                        setErrorMessage("Something went wrong while updating the status. Please try again later.");
                    } else {
                        setErrorMessage("");
                    }
                    setLoadingState({ ...loadingState, [status]: false });
                    router.refresh();
                } catch (err: any) {
                    console.error(err);
                    setErrorMessage(
                        err.message ?? "Something went wrong while updating the status. Please try again later."
                    );
                }
            }

            return (
                <div>
                    <div className="flex gap-2">
                        {row.original.status === "pending" ? (
                            <>
                                <Button
                                    disabled={loadingState.approved}
                                    size="sm"
                                    onClick={() => handleStatusChange("approved")}
                                >
                                    {loadingState.approved ? (
                                        <>
                                            <Image
                                                src={Spinner}
                                                className="h-5 w-5"
                                                alt="loading"
                                                fetchPriority="high"
                                            />
                                            &nbsp;&nbsp;
                                        </>
                                    ) : null}
                                    Accept
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" variant={"outline"}>
                                            Decline
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently decline this
                                                volunteer&apos;s request to join the event.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <Button
                                                disabled={loadingState.rejected}
                                                variant="destructive"
                                                onClick={() => handleStatusChange("rejected")}
                                            >
                                                {loadingState.rejected ? (
                                                    <>
                                                        <Image
                                                            src={Spinner}
                                                            className="h-5 w-5"
                                                            alt="loading"
                                                            fetchPriority="high"
                                                        />
                                                        &nbsp;&nbsp;
                                                    </>
                                                ) : null}
                                                Reject
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        ) : null}
                        {row.original.status === "approved" ? (
                            <Button
                                disabled={loadingState.attended}
                                size="sm"
                                onClick={() => handleStatusChange("attended")}
                            >
                                {loadingState.attended ? (
                                    <>
                                        <Image src={Spinner} className="h-5 w-5" alt="loading" fetchPriority="high" />
                                        &nbsp;&nbsp;
                                    </>
                                ) : null}
                                Mark as Attended
                            </Button>
                        ) : null}
                        {errorMessage ? <p>{errorMessage}</p> : null}
                    </div>
                </div>
            );
        },
    }),
];

export default COLUMNS;
