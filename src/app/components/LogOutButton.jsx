'use client'; // Mark this as a Client Component

import React, { useCallback } from 'react';

export default function LogOutButton({ onLogout }) {

    const handleLogout = useCallback(async (e) => {
        e.preventDefault(); // Prevent form submission behavior

        // Call the onLogout function (which deletes the token)
        await onLogout();

        // Now handle redirection on the client-side
        window.location.href = '/'; // Redirect to the login page after logging out
    }, [onLogout]);

    return (
        <button
            type="button"
            style={{
                padding: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '8px'
            }}
            onClick={handleLogout}
        >
            Log Out
        </button>
    );
}
