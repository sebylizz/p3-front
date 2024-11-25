"use server"
import { cookies } from 'next/headers';

export default async function deleteAccount(Id) {
    console.log("delete Account called with Id " + Id);
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        const response = await fetch('http://localhost:8080/customers/deleteCustomer?Id='+Id, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token.value}`
            },
        });
        if (!response.ok) {
            return false;
        } 
    } catch (error) {
        console.error('Error login:', error);
        return false
    }
    return true;
}