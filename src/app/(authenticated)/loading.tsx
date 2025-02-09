"use client";

import Spinner from "@public/spinner.gif";
import Image from "next/image";
export default function Loading() {
    return (
        <div className="py-4 flex items-center justify-center">
            <Image src={Spinner} className="h-5 w-5" alt="loading" fetchPriority="high" />
            &nbsp;&nbsp;
        </div>
    );
}
