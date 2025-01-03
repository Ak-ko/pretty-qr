"use client";

import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { List, LogOut, Plus, QrCodeIcon, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const items = [
    {
        title: "New QR",
        url: "/",
        icon: Plus,
    },
    {
        title: "Your QR Codes",
        url: "/qr-codes",
        icon: List,
    },
    {
        title: "Trash",
        url: "#",
        icon: Trash,
    },
];

export function AppSidebar() {
    const { signOut } = useClerk();

    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut({ redirectUrl: "/sign-in" });
    };

    return (
        <Sidebar>
            <SidebarHeader className="relative z-1 py-5 bg-sidebar-header">
                <div className="flex items-center gap-3 justify-center">
                    <QrCodeIcon />
                    <h1 className="font-bold">Pretty QR</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 py-2">
                            {items.map((item) => (
                                <SidebarMenuItem
                                    className="my-1"
                                    key={item.title}
                                >
                                    <SidebarMenuButton
                                        className="py-5"
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="relative z-1">
                <Button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700"
                >
                    <div className="flex items-center gap-2">
                        <LogOut color="white" />
                        <span className="text-white font-bold">Logout</span>
                    </div>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
