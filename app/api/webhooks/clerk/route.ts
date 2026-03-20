import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/db/prisma";

type ClerkUserCreatedEvent = {
    type: "user.created";
    data: {
        id: string;
        email_addresses: { email_address: string }[];
        first_name: string | null;
        last_name: string | null;
        image_url: string;
    };
};

type ClerkUserDeletedEvent = {
    type: "user.deleted";
    data: {
        id: string;
    };
};

type ClerkWebhookEvent = ClerkUserCreatedEvent | ClerkUserDeletedEvent;

export async function POST(req: Request) {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error("Missing CLERK_WEBHOOK_SECRET");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return Response.json(
            { error: "Missing svix headers" },
            { status: 400 },
        );
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let event: ClerkWebhookEvent;

    try {
        event = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as ClerkWebhookEvent;
    } catch {
        return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "user.created") {
        await prisma.user.create({
            data: {
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address,
                name: `${event.data.first_name ?? ""} ${event.data.last_name ?? ""}`.trim(),
                imageUrl: event.data.image_url,
            },
        });
    }

    if (event.type === "user.deleted") {
        await prisma.user.delete({
            where: { clerkId: event.data.id },
        });
    }

    return Response.json({ received: true });
}
