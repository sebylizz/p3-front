'use server'
import { cookies } from 'next/headers'

export default async function create(input) {
    const cookieStore = await cookies()

    cookieStore.set({
        name: 'token',
        value: input
    })
}
