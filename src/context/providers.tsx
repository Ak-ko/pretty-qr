import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <ClerkProvider>
            <SidebarProvider>{children}</SidebarProvider>
        </ClerkProvider>
    );
}
