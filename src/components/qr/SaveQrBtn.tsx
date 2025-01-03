"use client";

import React from "react";
import qrCRUD from "@/lib/qr";

import { Button } from "../ui/button";
import { useSession } from "@clerk/nextjs";
import { SaveIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PropsT = {
    qrLink: string;
    logo: string;
};

export default function SaveQrBtn({ qrLink, logo }: PropsT) {
    const { session } = useSession();
    const { toast } = useToast();

    const { createQR, submitting } = qrCRUD();

    const saveQR = async () => {
        const clerkToken = await session?.getToken({
            template: "supabase",
        });

        const { error } = await createQR({
            link: qrLink as string,
            photo: logo || "",
            user_id: session?.user?.id as string,
            token: clerkToken as string,
        });

        if (error) {
            toast({
                title: "Something wrong with saving",
                variant: "destructive",
            });

            return;
        }

        toast({
            title: "Saved Successfully.",
            description: "You can check in your qr codes section.",
        });
    };
    return (
        <Button
            disabled={submitting}
            onClick={saveQR}
            className="flex items-center gap-2 justify-center"
        >
            <SaveIcon />
            <div>Save</div>
        </Button>
    );
}
