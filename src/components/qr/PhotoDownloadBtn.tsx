"use client";

import React, { useMemo } from "react";
import DownloadBtn from "./DownloadBtn";

import { Download, ImageIcon } from "lucide-react";
import { downloadPNGorJPG } from "@/lib/utils";

type PropsT = {
    qrRef: React.RefObject<SVGSVGElement | null> | null;
    logo?: string;
    iconOnly?: boolean;
    format: "image/png" | "image/jpeg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PhotoDownloadBtn({
    qrRef,
    logo,
    format,
    iconOnly = false,
}: PropsT) {
    const handleDownload = () => {
        if (!qrRef) return;

        downloadPNGorJPG(qrRef, format, logo || null);
    };

    const getDownloadTitle = useMemo(
        () => (format === "image/jpeg" ? "JPG" : "PNG"),
        [format]
    );

    return (
        <DownloadBtn qrRef={qrRef} logo={logo} onDownload={handleDownload}>
            {iconOnly ? (
                <>
                    <ImageIcon />
                </>
            ) : (
                <>
                    <Download />
                    <div>{getDownloadTitle}</div>
                </>
            )}
        </DownloadBtn>
    );
}
