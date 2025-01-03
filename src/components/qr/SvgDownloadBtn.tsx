"use client";

import React from "react";
import DownloadBtn from "./DownloadBtn";

import { CodeIcon, Download } from "lucide-react";
import { downloadSVG } from "@/lib/utils";

type PropsT = {
    qrRef: React.RefObject<SVGSVGElement | null> | null;
    logo?: string;
    iconOnly?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SvgDownloadBtn({
    qrRef,
    logo,
    iconOnly = false,
}: PropsT) {
    const handleDownload = () => {
        if (!qrRef) return;

        downloadSVG(qrRef, logo || null);
    };

    return (
        <DownloadBtn qrRef={qrRef} logo={logo} onDownload={handleDownload}>
            {iconOnly ? (
                <>
                    <CodeIcon />
                </>
            ) : (
                <>
                    <Download />
                    <div>Svg</div>
                </>
            )}
        </DownloadBtn>
    );
}
