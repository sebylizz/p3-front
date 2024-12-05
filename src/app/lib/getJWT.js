'use server'

import { cookies } from 'next/headers';

export default async function getJWT() {
    const cs = await cookies().get('token');
    return cs;
}
