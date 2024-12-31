import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppNavBar() {
    return (
        <nav className="w-full border-b h-[50px] flex items-center gap-2">
            <div className="ml-auto px-5">
                <SidebarTrigger variant={"secondary"} />
            </div>
        </nav>
    );
}
