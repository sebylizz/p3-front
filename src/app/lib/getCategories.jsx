'use server';

export default async function getCategories(){
    try {
        const response = await fetch('http://localhost:8080/categories/getCategories');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error: ', error);
    }
}