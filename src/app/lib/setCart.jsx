"use server";

import { cookies } from "next/headers";

export default async function setCart(cart) {
    const cs = await cookies();
    try {
        cs.set("cart", JSON.stringify(cart), {
            httpOnly: false, 
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 2, // 2 days
            path: "/", 
        });
    } catch (error) {
        console.error("Error setting cart cookie:", error);
    }
}
