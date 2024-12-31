"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { List, LogOut, Plus, QrCodeIcon, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useParams, usePathname } from "next/navigation";

const items = [
    {
        title: "New QR",
        url: "/",
        icon: Plus,
    },
    {
        title: "Your QR Codes",
        url: "#",
        icon: List,
    },
    {
        title: "Trash",
        url: "#",
        icon: Trash,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="py-5 bg-gray-400">
                <div className="flex items-center gap-3 justify-center">
                    <QrCodeIcon />
                    <h1 className="font-bold">Pretty QR</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="px-3 py-2">
                    {items.map((item) => (
                        <SidebarMenuItem className="my-1" key={item.title}>
                            <SidebarMenuButton
                                className="py-5"
                                asChild
                                isActive={pathname === item.url}
                            >
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <Button className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700">
                    <div className="flex items-center gap-2">
                        <LogOut />
                        <span>Logout</span>
                    </div>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
