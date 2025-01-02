import userCRUD from "@/lib/users";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    console.log("CLERK WEBHOOK RECIEVED");
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    const { createUser } = userCRUD();

    if (!SIGNING_SECRET) {
        throw new Error(
            "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing Svix headers", {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error: Could not verify webhook:", err);
        return new Response("Error: Verification error", {
            status: 400,
        });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses } = evt.data;

        if (!id || !email_addresses) {
            return new Response("Something went wrong", { status: 400 });
        }

        const user = {
            user_id: id,
            email: email_addresses[0]?.email_address,
        };

        await createUser(user);
        console.log("CLERK WEBHOOK DONE");
    }

    return new Response("Webhook received", { status: 200 });
}
