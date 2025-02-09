import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | The Codeblooded",
        default: "The Codeblooded",
    },
    description: "Developed by the Codeblooded.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased h-screen dark`}>
                <div className="w-full max-w-5xl mx-auto  px-2">{children}</div>
            </body>
        </html>
    );
}