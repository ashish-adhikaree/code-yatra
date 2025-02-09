"use client";
import { signup } from "@/app/(not-authenticated)/login/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/shared/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useActionState } from "react";

export default function SignupForm() {
    const [state, signupAction] = useActionState(signup, undefined);

    return (
        <Card className="max-h-[70vh] overflow-y-auto">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Enter your details and create an account.</CardDescription>
            </CardHeader>
            <form action={signupAction}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            defaultValue={state?.payload?.get("email") as string}
                        />
                        {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            defaultValue={state?.payload?.get("password") as string}
                            required
                        />
                        {state?.errors?.password && <p className="text-red-500 text-xs">{state.errors.password[0]}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="confirm_password"
                            name="confirm_password"
                            defaultValue={state?.payload?.get("confirm_password") as string}
                            type="password"
                            required
                        />
                        {state?.errors?.confirm_password && (
                            <p className="text-red-500 text-xs">{state.errors.confirm_password}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="terms" name="terms" defaultChecked={!!state?.payload?.get("terms")} required />
                        <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </Label>
                    </div>
                    {state?.generalErrorMessage && <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>}
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                    <p className="text-xs pb-2">
                        Already have an account?{" "}
                        <Link className="underline" href="/login">
                            Login
                        </Link>
                    </p>
                    <SubmitButton>Create an account</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    );
}
