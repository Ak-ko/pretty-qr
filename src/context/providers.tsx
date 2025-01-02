"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";

type ProvidersProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
        <ClerkProvider>
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>{children}</SidebarProvider>
            </QueryClientProvider>
        </ClerkProvider>
    );
}
