import { cookies } from 'next/headers'

export default async function account() {

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const response = await fetch('http://localhost:8080/login/users-allowed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
        'Authorization': 'Bearer ' + token.value
      },

    });
    if (!response.ok) {
      return "not logged in";
    } else {
      const tmp = await response.text();
      return tmp;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
