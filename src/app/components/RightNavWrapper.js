// src/app/components/RightNavWrapper.js
import RightNav from './RightNav';  // Client Component
import loggedIn from '../lib/isLoggedIn';  // Server-side login check

// RightNavWrapper is a server component that checks login status
export default async function RightNavWrapper() {
  // Fetch login status on the server side
  const isLoggedIn = await loggedIn();

  // Return RightNav, passing isLoggedIn as a prop to the client-side component
  return <RightNav isLoggedIn={isLoggedIn} />;
}
