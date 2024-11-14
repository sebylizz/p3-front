'use server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode';

export default async function isTokenValid() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('token')
    if (hasCookie != true) {
        return false // no token found, return false
    } 
    else {
        try {
            const decodedToken = jwtDecode(cookieStore.get('token')?.value);
            const currentTime = Date.now() / 1000;
            //return true if token is not expired and false if it is
            return decodedToken.exp > currentTime; 
          } catch (error) {
            console.error('Error decoding token:', error);
            return false; //if error return false
          }
    }
    
}
