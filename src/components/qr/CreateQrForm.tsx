"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { QrCode } from "lucide-react";
import RequiredFormLabel from "../RequiredFormLabel";

type PropsT = {
    onSubmit: (values: z.infer<typeof qrCodeCreateValidationSchema>) => any;
};

export const qrCodeCreateValidationSchema = z.object({
    link: z
        .string({ required_error: "Link is required" })
        .min(5, { message: "Link is required." }),

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

export default function CreateQrForm({ onSubmit }: PropsT) {
    const form = useForm<z.infer<typeof qrCodeCreateValidationSchema>>({
        resolver: zodResolver(qrCodeCreateValidationSchema),
        defaultValues: {
            link: "",
            logo: null,
        },
    });

    const logo = form.watch("logo");

    return (
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
                            <FormLabel>
                                <RequiredFormLabel label="Link" />
                            </FormLabel>
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
                                                const file = e.target.files[0];
                                                field.onChange(file);
                                            }
                                        }}
                                    />

                                    {logo && (
                                        <div style={{ marginTop: "10px" }}>
                                            <img
                                                src={URL.createObjectURL(logo)}
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
                                Upload your logo here. Supported formats: PNG,
                                JPG, SVG.
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
    );
}
