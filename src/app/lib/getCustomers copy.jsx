import getJWT from "./getJWT";
async function customerFetcher(offset = 0, limit = 10) {
  try {
    const token = await getJWT();
    console.log(token);
    const response = await fetch(
      `http://localhost:8080/customers/getcustomers?offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token?.value}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const { customers, total } = await response.json(); 
    return { customers, total }; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}

export default customerFetcher;
