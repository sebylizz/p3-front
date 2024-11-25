"use server";

import { cookies } from "next/headers";

export default async function setCart(cart) {
  /*try {
    cookies().set("cart", JSON.stringify(cart), {
      httpOnly: false, // Accessible via client-side JS
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 2, // 2 days
      path: "/", // Ensure the cookie is accessible across all routes
    });
  } catch (error) {
    console.error("Error setting cart cookie:", error);
  }*/
}
