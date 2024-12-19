'use server';

import getJWT from "./getJWT";

export default async function fetchCustomer(){
    try {

        const token = await getJWT();
        const response = await fetch("http://localhost:8080/customers/getsinglecustomer", {
            method: 'GET',
            headers: { 
                'Accept': '*/*',
                'Authorization': `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            return false;
        }

        const customer = await response.json();
        return customer
    } catch (error){
        console.log('Error: ', error);
        return false;
    }
}
