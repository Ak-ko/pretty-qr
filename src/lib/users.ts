import { createSupabaseClient } from "@/utils/supabase/server";

type CreateUserT = {
    user_id: string;
    email: string;
};

export default function userCRUD() {
    const createUser = async (payload: CreateUserT) => {
        const db = createSupabaseClient();

        try {
            const { data, error } = await db.from("users").insert([
                {
                    user_id: payload?.user_id,
                    email: payload?.email,
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
        createUser,
    };
}
