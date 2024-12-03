import getJWT from "./getJWT";

async function addProduct(productData) {
    try {
        const token = await getJWT();
        console.log("JWT Token:", token);

        const response = await fetch("http://localhost:8080/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.value}`,
            },
            body: JSON.stringify(productData),
        });


        console.log("Response:", response);


        if (!response.ok) {
            throw new Error(`Failed to add product with status ${response.status}`);
        }


        const responseText = await response.text();
        console.log("Response Text:", responseText);

        const responseData = responseText ? JSON.parse(responseText) : null;
        console.log("Response Data:", responseData);


        return responseData?.productId;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

export default addProduct;
