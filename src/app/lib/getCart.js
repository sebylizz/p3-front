"use server";

import { cookies } from "next/headers";

export default async function getCart() {
  try {
    const cartCookie = cookies().get("cart");
    if (cartCookie) {
      return JSON.parse(cartCookie.value); // Parse and return cart
    }
    return []; // Default empty cart if no cookie exists
  } catch (error) {
    console.error("Error reading cart cookie:", error);
    return []; // Fallback to empty cart on error
  }
}
