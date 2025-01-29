'use server';
import { cookies } from 'next/headers';

export default async function getCustomerOrders() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        
        const response = await fetch("http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//orderDetails/getcustomerorders", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch orders:', response.statusText);
            return false;
        }

        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error('Error while fetching orders:', error);
        return false;
    }
}
