import React from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const downloadSVG = (
    svgRef: React.RefObject<SVGSVGElement | null> | null,
    logoURL: string | null
) => {
    if (!svgRef || !svgRef.current) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svgRef.current);

    if (logoURL) {
        const embedLogoInSVG = async (logoURL: string) => {
            const response = await fetch(logoURL);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64data = reader.result as string;

                const logoImageTag = `
                    <image href="${base64data}" x="36%" y="36%" width="30%" height="30%" />
                `;

                const modifiedSvgData = svgData.replace(
                    "</svg>",
                    `${logoImageTag}</svg>`
                );

                const svgBlob = new Blob([modifiedSvgData], {
                    type: "image/svg+xml;charset=utf-8",
                });

                const url = URL.createObjectURL(svgBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "qrcode.svg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            reader.readAsDataURL(blob);
        };

        embedLogoInSVG(logoURL);
    } else {
        const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const downloadPNGorJPG = (
    svgRef: React.RefObject<SVGSVGElement | null> | null,
    format: "image/png" | "image/jpeg",
    logoURL: string | null
) => {
    if (!svgRef || !svgRef?.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
            ctx.drawImage(img, 0, 0);

            if (logoURL) {
                const logoImage = new Image();
                logoImage.onload = () => {
                    const logoSize = img.width * 0.2;
                    const logoX = img.width / 2 - logoSize / 2;
                    const logoY = img.height / 2 - logoSize / 2;
                    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
                    const dataUrl = canvas.toDataURL(format);
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = `qrcode.${
                        format === "image/png" ? "png" : "jpg"
                    }`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                logoImage.src = logoURL;
            } else {
                const dataUrl = canvas.toDataURL(format);
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `qrcode.${
                    format === "image/png" ? "png" : "jpg"
                }`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
};
