import Link from "next/link";
import { Button } from "../ui/button";


const NAVLINKS = [
    {
        label: "organizations",
        url: "/organizations",
    }
]

export default function Header(){
    return <header className="max-w-container py-2">
        <Link href="/">Logo</Link>
       
    </header>
}