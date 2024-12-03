import getJWT from "./getJWT";
async function addCustomerAdmin(data) {
  try {
    const token = await getJWT();
    console.log(token);
    const response = await fetch(
      "http://localhost:8080/customers/addCustomerAdmin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || `Failed with status ${response.status}`);
    }


    if (response.status === 201) {
      console.log("Customer added successfully");
      return { message: "Customer added successfully" };
    }


    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() };
    }
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
}

export default addCustomerAdmin;
