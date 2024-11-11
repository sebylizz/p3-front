//fetch customer information for account edit
'use server';
import { cookies } from 'next/headers';

export default async function fetchCustomer(){
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        const response = await fetch('http://localhost:8080/customers/getsinglecustomer', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        if (!response.ok) {
            return false;
        }

        const customer = response.json();
        return customer
    } catch (error){
        console.log('Error: ', error);
        return false;
    }
}