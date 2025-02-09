"use client";
import { login } from "./actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/shared/submit-button";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);
    return (
        <Card className="overflow-y-auto border-none w-full max-w-[400px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials and login to your account.</CardDescription>
            </CardHeader>
            <form action={loginAction}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={state?.payload?.get("email") as string}
                            required
                        />
                        {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            defaultValue={state?.payload?.get("password") as string}
                        />
                        {state?.errors?.password && <p className="text-red-500 text-xs">{state.errors.password[0]}</p>}
                    </div>
                    {state?.generalErrorMessage && <p className="text-red-500 text-xs">{state.generalErrorMessage}</p>}
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                    <p className="text-sm text-muted-foreground pb-2">
                        Don&apos;t have an account?{" "}
                        <Link className="underline" href="/signup">
                            Signup
                        </Link>
                    </p>
                    <SubmitButton>Login</SubmitButton>
                </CardFooter>
            </form>
        </Card>
    );
}
