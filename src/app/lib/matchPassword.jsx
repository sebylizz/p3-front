import getJWT from "./getJWT";
const matchPassword = async (password) => {
    try {
      const token = await getJWT();
      const response = await fetch("http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//customers/matchPassword", {
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
  
      return await response.json(); 
    } catch (error) {
      console.error("Error matching password:", error);
      throw error;
    }
  };

  export default matchPassword;