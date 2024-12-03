import getJWT from "./getJWT";
const matchPassword = async (password) => {
    try {
      const token = await getJWT();
      console.log(token); // Ensure this logs a valid JWT
      const response = await fetch("http://localhost:8080/customers/matchPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token?.value}`,
        },
        body: JSON.stringify({password:password}),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to verify password.");
      }
  
      return await response.json(); // Expect a direct boolean: true/false
    } catch (error) {
      console.error("Error matching password:", error);
      throw error;
    }
  };

  export default matchPassword;