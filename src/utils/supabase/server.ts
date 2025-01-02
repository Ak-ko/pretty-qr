import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(token?: string | null) {
    const headers: any = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            },
        }
    );

    return supabase;
}
