import { createSupabaseClient } from "@/utils/supabase/server";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";

type SaveQRT = {
    user_id: string;
    link: string;
    photo: string;
    token: string;
};

type GetAllQR = {
    token: string;
    user_id: string;
    query: string;
};

export default function qrCRUD() {
    const [submitting, setSubmitting] = useState(false);

    const createQR = async (payload: SaveQRT) => {
        setSubmitting(true);

        const db = createSupabaseClient(payload?.token);

        try {
            const { data, error } = await db.from("qr").insert([
                {
                    user_id: payload?.user_id,
                    link: payload?.link,
                    photo: payload?.photo,
                },
            ]);

            if (error) {
                setSubmitting(false);
                return {
                    data: null,
                    error,
                };
            }

            setSubmitting(false);

            return {
                data,
            };
        } catch (e) {
            throw e;
        }
    };

    const getAllQR = async (payload?: GetAllQR) => {
        try {
            const db = createSupabaseClient(payload?.token);

            const { data, error } = await db
                .from("qr")
                .select("*")
                .eq("user_id", payload?.user_id)
                .ilike("link", `%${payload?.query}%`);
            if (error) {
                return {
                    data: null,
                    error,
                };
            }

            return {
                data,
            };
        } catch (e) {}
    };

    return {
        createQR,
        getAllQR,
        submitting,
    };
}
