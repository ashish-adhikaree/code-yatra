import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

export default function ErrorBanner({
    children,
    className,
    type,
}: {
    children: React.ReactNode;
    className?: string;
    type?: "error" | "warning";
}) {
    return (
        <div
            className={cn(
                "flex items-start gap-2  px-6 py-2 rounded-md border ",
                type == "error"
                    ? "bg-red-500/10 text-red-500 border-red-500/30"
                    : "bg-orange-500/10 text-orange-500 border-orange-500/30",
                className ? className : ""
            )}
        >
            <TriangleAlert />
            {children}
        </div>
    );
}
