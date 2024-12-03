import getJWT from "./getJWT";
async function updateCustomer(customerData, updatedCustomer) {
  const token = await getJWT();
  console.log(token);
  try {
    const response = await fetch(
      `http://localhost:8080/customers/updateCustomer/${customerData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token?.value}`
        },
        body: JSON.stringify(updatedCustomer),
      }
    );

    if (response.ok) {
      console.log("Customer updated successfully!");
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("Failed to update customer:", errorText);
      return { success: false, message: errorText };
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
}

export default updateCustomer;
