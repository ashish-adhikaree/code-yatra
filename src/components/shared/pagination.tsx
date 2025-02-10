"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Spinner from "@public/spinner.gif";
import Image from "next/image";

function NavigationButton({ goToPage, children }: { goToPage: number; children: string }) {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    function goTo(newPage: number) {
        setLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    }

    useEffect(() => {
        setLoading(false);
    }, [searchParams]);

    return (
        <Button disabled={loading} variant="outline" onClick={() => goTo(goToPage)}>
            {loading ? (
                <>
                    <Image src={Spinner} className="h-5 w-5" alt="loading" fetchPriority="high" />
                    &nbsp;&nbsp;
                </>
            ) : null}
            {children}
        </Button>
    );
}

export default function Pagination({ currentSize, page, size }: { currentSize: number; page: number; size: number }) {
    if (!(page !== 1 && currentSize == 0) && currentSize != size) return;

    return (
        <div className="flex items-center gap-2 justify-center py-6 flex-wrap">
            {page != 1 ? <NavigationButton goToPage={page - 1}>Previous</NavigationButton> : null}
            {page !== 1 && currentSize == 0 ? null : <NavigationButton goToPage={page + 1}>Next</NavigationButton>}
        </div>
    );
}
