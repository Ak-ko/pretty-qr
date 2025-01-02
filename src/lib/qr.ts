import { createSupabaseClient } from "@/utils/supabase/server";
import { useSession } from "@clerk/nextjs";

type SaveQRT = {
    user_id: string;
    link: string;
    photo: string;
};

export default function qrCRUD() {
    const { session } = useSession();

    const createQR = async (payload: SaveQRT) => {
        const clerkToken = await session?.getToken({
            template: "supabase",
        });

        const db = createSupabaseClient(clerkToken);

        try {
            const { data, error } = await db.from("qr").insert([
                {
                    user_id: payload?.user_id,
                    link: payload?.link,
                    photo: payload?.photo,
                },
            ]);

            if (error) {
                return {
                    data: null,
                    error,
                };
            }

            return {
                data,
            };
        } catch (e) {
            throw e;
        }
    };

    return {
        createQR,
    };
}
