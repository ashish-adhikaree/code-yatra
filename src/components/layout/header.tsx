"use client";
import Link from "next/link";
import { Building, House, LogOut, SquareChartGantt, Trophy, UserRound } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { logout } from "@/app/(not-authenticated)/login/actions";
import { usePathname } from "next/navigation";

const NAVLINKS = [
    {
        label: "Home",
        url: "/",
        icon: House,
    },
    {
        label: "organizations",
        url: "/organizations",
        icon: Building,
    },
    {
        label: "leaderboard",
        url: "/leaderboard",
        icon: Trophy,
    },
  
];

export default function Header() {
    const [_, logoutAction] = useActionState(logout, undefined);
    const pathName = usePathname();
    return (
    <header className="bg-black/10 sticky top-0 z-50 backdrop-blur-sm">
      
        <div className=" max-w-container flex items-center justify-between gap-4 border-b">
            <Link href="/">Logo</Link>
            <div className="flex items-center">
                {NAVLINKS.map(({ label, url, icon: Icon }, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={url}
                                    key={index}
                                    className={cn("px-6 py-4 hover:bg-muted/50 border-b-[3px] border-transparent", pathName == url ? "text-primary border-b-primary" : "")}
                                >
                                    <Icon />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="capitalize">{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="mt-2 p-0 overflow-clip">
                        <div className="flex flex-col">
                            <Link
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "rounded-none justify-start  focus-visible:ring-0"
                                )}
                                href="/profile"
                            >
                                <UserRound />
                                <p>Profile</p>
                            </Link>
                            <form action={logoutAction} className="w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full rounded-none justify-start focus-visible:ring-0"
                                >
                                    <LogOut />
                                    <p>Logout</p>
                                </Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </header>
    );
}
