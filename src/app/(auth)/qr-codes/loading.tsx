"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function QrCodesLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {Array(4)
                .fill(null)
                ?.map((_, indx) => (
                    <Skeleton
                        key={indx}
                        className="w-full bg-gray-200  h-[200px] rounded-xl"
                    />
                ))}
        </div>
    );
}
