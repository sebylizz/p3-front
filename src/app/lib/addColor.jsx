import getJWT from "./getJWT";

async function addColor(colorData) {
    try {
        const token = await getJWT();

        const response = await fetch("http://localhost:8080/colors/addColor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify(colorData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add product with status ${response.status}`);
        }
        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export default addColor;