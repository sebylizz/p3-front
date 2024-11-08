'use server'
import { cookies } from 'next/headers'

export default async function isLoggedIn() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('token')
    return hasCookie
}
