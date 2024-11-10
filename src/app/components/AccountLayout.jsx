// components/AccountLayout.jsx
import React from 'react';
import LogOutButton from './LogOutButton';

export default function AccountLayout({ userName, onEdit = '/account/edit', onViewOrders = '/account/orders', onLogout }) {
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            {/* Display user's name */}
            <header style={{ marginBottom: '20px' }}>
                <h1>Welcome, {userName}</h1>
            </header>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <form action={onEdit} method="GET">
                    <button
                        type="submit"
                        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}
                    >
                        Edit Account
                    </button>
                </form>

                <form action={onViewOrders} method="GET">
                    <button
                        type="submit"
                        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}
                    >
                        View Previous Orders
                    </button>
                </form>

                {/* Pass onLogout as a prop to LogOutButton */}
                <LogOutButton onLogout={onLogout} />
            </div>
        </div>
    );
}
