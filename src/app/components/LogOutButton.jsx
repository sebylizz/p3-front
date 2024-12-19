'use client'; // Mark this as a Client Component

import React, { useCallback } from 'react';

export default function LogOutButton({ onLogout }) {

    const handleLogout = useCallback(async (e) => {
        e.preventDefault(); 

        await onLogout();

        window.location.href = '/'; 
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
