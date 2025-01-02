import AppNavBar from "@/components/AppNavBar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <AppSidebar />
            <main className="w-full">
                <AppNavBar />
                <div className="sm:px-10 px-5 py-5">{children}</div>
            </main>
        </>
    );
}
