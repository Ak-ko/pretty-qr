"use client";

import React, { ChangeEvent, useState } from "react";
import qrCRUD from "@/lib/qr";
import Empty from "@/components/EmptyUi";
import { useDebounce } from "@uidotdev/usehooks";

import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Image, Trash } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

export default function QRCodesPage() {
    const { getAllQR } = qrCRUD();
    const { session } = useSession();
    const [query, setQuery] = useState("");
    const debounceQuery = useDebounce(query, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const { data, isFetched } = useQuery({
        queryKey: ["qr-codes", debounceQuery],
        queryFn: async () => {
            const clerkToken = await session?.getToken({
                template: "supabase",
            });

            if (!clerkToken && !session?.user) {
                return [];
            }

            const res = await getAllQR({
                token: clerkToken as string,
                user_id: session?.user?.id as string,
                query: debounceQuery,
            });
            return res?.data;
        },
        enabled: !!session,
    });

    return (
        <main>
            <div className="max-w-md mb-11">
                <Input
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search Here..."
                    className="w-full"
                />
            </div>
            {isFetched && data?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {data?.map((qr) => (
                        <Card key={qr.id}>
                            <CardContent className="p-5">
                                <div className="relative">
                                    {qr?.link && (
                                        <QRCodeSVG
                                            value={qr.link}
                                            size={180}
                                            imageSettings={{
                                                ...(qr?.photo && {
                                                    src: qr?.photo,
                                                    width: 80,
                                                    height: 50,
                                                    excavate: false,
                                                }),
                                            }}
                                        />
                                    )}
                                    <div className=" absolute top-0 right-0 flex flex-col gap-2">
                                        <Button
                                            title="SVG"
                                            size={"sm"}
                                            className="svgBtn flex items-center gap-2 justify-center"
                                        >
                                            <Code />
                                        </Button>

                                        <Button
                                            title="PNG"
                                            size={"sm"}
                                            className="flex items-center gap-2 justify-center"
                                        >
                                            <Image />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center justify-between w-full">
                                    <p className="line-clamp-2">{qr.link}</p>
                                    <div>
                                        <Button
                                            size={"icon"}
                                            className="flex items-center justify-center bg-red-500 hover:bg-red-700"
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Empty />
            )}
        </main>
    );
}
