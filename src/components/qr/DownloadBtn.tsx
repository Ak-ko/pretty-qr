"use client";

import React from "react";

import { Button } from "../ui/button";

type PropsT = {
    onDownload: (
        x: React.RefObject<SVGSVGElement | null> | null,
        y?: string
    ) => any;
    qrRef: React.RefObject<SVGSVGElement | null> | null;
    logo?: string;
    children: React.ReactNode;
};

export default function DownloadBtn({
    onDownload,
    qrRef,
    logo,
    children,
}: PropsT) {
    const handleDownload = () => {
        if (!qrRef) return;

        if (logo) {
            return onDownload(qrRef);
        }

        return onDownload(qrRef, logo);
    };

    return (
        <Button
            onClick={handleDownload}
            className="flex items-center gap-2 justify-center"
        >
            {children}
        </Button>
    );
}
