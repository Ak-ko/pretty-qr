"use client";

import React, { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Loader from "@/components/Loader";
import { downloadPNGorJPG, downloadSVG } from "@/lib/utils";

const validationSchema = z.object({
    link: z
        .string({ required_error: "Link is required" })
        .min(3, { message: "Link must be at least 3 characters." })
        .startsWith("https://", {
            message: "Link should starts with https://",
        }),
    logo: z
        .instanceof(File, { message: "Logo must be a valid file." })
        .refine(
            (file) =>
                [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/svg+xml",
                ].includes(file.type),
            { message: "Logo must be an image file (PNG, JPEG, JPG, or SVG)." }
        )
        .optional()
        .nullable(),
    // .refine((file) => file.size <= 2 * 1024 * 1024, {
    //     // 2 MB size limit
    //     message: "Logo file size must be less than 2 MB.",
    // }),
});

export default function NewQr() {
    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            link: "",
            logo: null,
        },
    });

    const [qrLink, setQrLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const qrRef = useRef<SVGSVGElement | null>(null);

    const onSubmit = (values: z.infer<typeof validationSchema>) => {
        setQrLink(values.link);

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
    }, [qrLink]);

    const handleDownloadSVG = () => {
        if (!qrRef) return;

        downloadSVG(qrRef, imgSrc);
    };

    const handleDownloadPNG = () => {
        if (!qrRef) return;

        downloadPNGorJPG(qrRef, "image/png", imgSrc);
    };

    const handleDownloadJPG = () => {
        if (!qrRef) return;

        downloadPNGorJPG(qrRef, "image/jpeg", imgSrc);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    className="max-w-2xl space-y-3"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="eg: https://..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This link will be you qr code.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <div>
                                        {/* File Input */}
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                ) {
                                                    const file =
                                                        e.target.files[0];
                                                    field.onChange(file);
                                                    setPreview(
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    );
                                                }
                                            }}
                                        />

                                        {preview && (
                                            <div style={{ marginTop: "10px" }}>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "200px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Upload your logo here. Supported formats:
                                    PNG, JPG, SVG.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        <div className="flex items-center justify-center gap-2">
                            <QrCode />
                            <span>Generate</span>
                        </div>
                    </Button>
                </form>
            </Form>

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
                        <Button
                            onClick={handleDownloadSVG}
                            className="flex items-center gap-2 justify-center"
                        >
                            <Download />
                            <div>Svg</div>
                        </Button>

                        <Button
                            onClick={handleDownloadPNG}
                            className="flex items-center gap-2 justify-center"
                        >
                            <Download />
                            <div>PNG</div>
                        </Button>

                        <Button
                            onClick={handleDownloadJPG}
                            className="flex items-center gap-2 justify-center"
                        >
                            <Download />
                            <div>JPG</div>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
