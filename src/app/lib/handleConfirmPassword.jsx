import matchPassword from "./matchPassword";
export default async function handlePasswordConfirmation({
    password,
    action,
    successMessage = "Success", 
  }) {
    try {
      const isPasswordValid = await matchPassword(password); 
      if (isPasswordValid) {
        await action(); 
        alert(successMessage); 
      } else {
        alert("Password is incorrect. Action aborted."); 
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      alert("An error occurred while verifying the password."); 
    }
  }
  