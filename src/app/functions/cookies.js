'use server'
import { cookies } from 'next/headers'

export default async function create(input) {
  console.log(input);
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'token',
    value: input
  })
}