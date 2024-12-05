'use server'

import { cookies } from 'next/headers';

export default async function getJWT() {
    try {
        const cs = await cookies().get('token');
        return cs;
    } catch (error) {
        console.error("Error getting token: " + error);
        return null;
    }
}
