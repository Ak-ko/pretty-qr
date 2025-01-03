"use client";

import React, { useEffect, useRef, useState } from "react";
import CreateQrForm, {
    qrCodeCreateValidationSchema,
} from "@/components/qr/CreateQrForm";
import SaveQrBtn from "@/components/qr/SaveQrBtn";
import SvgDownloadBtn from "@/components/qr/SvgDownloadBtn";
import PhotoDownloadBtn from "@/components/qr/PhotoDownloadBtn";

import { z } from "zod";
import { QRCodeSVG } from "qrcode.react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"), {
    ssr: false,
});

export default function NewQr() {
    const [qrLink, setQrLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const qrRef = useRef<SVGSVGElement | null>(null);

    const onSubmit = (values: z.infer<typeof qrCodeCreateValidationSchema>) => {
        let link = values?.link;

        if (!values?.link?.startsWith("http")) {
            link = "https://" + values?.link;
        }

        setQrLink(link);

        if (values?.logo) {
            setImgSrc(URL.createObjectURL(values?.logo as File));
        }
    };

    useEffect(() => {
        if (!qrLink) return;

        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [qrLink, imgSrc]);

    return (
        <div>
            <CreateQrForm onSubmit={onSubmit} />

            <hr className="my-5" />

            {loading && <Loader />}

            {qrLink && !loading && (
                <div>
                    <QRCodeSVG
                        ref={qrRef}
                        value={qrLink}
                        size={180}
                        imageSettings={{
                            src: imgSrc as string,
                            width: 80,
                            height: 50,
                            excavate: false,
                        }}
                    />
                    <div className="flex items-center gap-3 mt-5">
                        <SaveQrBtn qrLink={qrLink} logo={imgSrc as string} />

                        <SvgDownloadBtn qrRef={qrRef} logo={imgSrc as string} />

                        <PhotoDownloadBtn
                            qrRef={qrRef}
                            logo={imgSrc as string}
                            format="image/png"
                        />

                        <PhotoDownloadBtn
                            qrRef={qrRef}
                            logo={imgSrc as string}
                            format="image/jpeg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
