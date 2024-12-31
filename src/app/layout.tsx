import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import AppNavBar from "@/components/AppNavBar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "QR Code Generator",
    description: "qr code generator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full">
                        <AppNavBar />
                        <div className="sm:px-10 px-5 py-5">{children}</div>
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
