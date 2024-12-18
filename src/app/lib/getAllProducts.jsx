import getJWT from "./getJWT";

async function allProducts() {
    try {
        const token = await getJWT();
        const response = await fetch("http://localhost:8080/products/getAllAdmin", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token?.value}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

export default allProducts;
