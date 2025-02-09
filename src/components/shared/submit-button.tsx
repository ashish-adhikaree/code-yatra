'use client'

import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "../ui/button"
import Spinner from "@public/spinner.gif"
import Image from "next/image"

interface PROPS extends ButtonProps {
    children?: string
}
export default function SubmitButton({ children, ...props }: PROPS) {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending} {...props}>
        {pending ?
            <>
                <Image src={Spinner} className="h-5 w-5" alt="loading" fetchPriority="high" />&nbsp;&nbsp;
            </> : null}
        {children ? children : 'Submit'}
    </Button>
}