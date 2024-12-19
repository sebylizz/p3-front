'use server'

import { cookies } from 'next/headers';

export default async function getJWT() {
    const cs = await cookies();
    return cs.get('token');
}
