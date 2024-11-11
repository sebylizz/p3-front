'use client';
import React, { useEffect, useState } from 'react';
import fetchCustomer from '../../lib/fetchCustomer';
//import editCustomer from '.../lib/editCustomer';

export default function EditAccount() {
    
    const [user, setUser] = useState(null);  // This is to store the user data
    const [isEditing, setIsEditing] = useState({
        name: false,
        lastname: false,
        email: false
    });

    useEffect(() => {
        // Create an async function to fetch user data
        const fetchCustomerData = async () => {
            try {
                // Assuming fetchCustomer is a function that fetches user data
                const fetchedUser = await fetchCustomer();  
                setUser(fetchedUser);  // Update state with the fetched user data
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomerData();  // Call the async function inside useEffect
    }, []);  // Empty dependency array means it will run only once, when the component mounts

    

    const handleEdit = (field) => {
        setIsEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleSaveChanges = () => {
        // Logic for saving changes
        setIsEditing({ name: false, lastname: false, email: false });
    };

    const handleDiscardChanges = () => {
        // Logic for discarding changes
        setIsEditing({ name: false, lastname: false, email: false });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20%' }}>

                {/* Name Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        value={user.firstName}
                        readOnly={!isEditing.name}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                            backgroundColor: isEditing.name ? 'white' : '#f0f0f0',
                            border: isEditing.name ? '1px solid #000' : 'none'
                        }}
                    />
                    <button onClick={() => handleEdit('name')} className="account-edit-editbutton">
                        Edit
                    </button>
                </div>

                {/* Last Name Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        value={user.lastName}
                        readOnly={!isEditing.lastname}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                            backgroundColor: isEditing.lastname ? 'white' : '#f0f0f0',
                            border: isEditing.lastname ? '1px solid #000' : 'none'
                        }}
                    />
                    <button onClick={() => handleEdit('lastname')} className="account-edit-editbutton">
                        Edit
                    </button>
                </div>

                {/* Email Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="email"
                        value={user.email}
                        readOnly={!isEditing.email}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                            backgroundColor: isEditing.email ? 'white' : '#f0f0f0',
                            border: isEditing.email ? '1px solid #000' : 'none'
                        }}
                    />
                    <button onClick={() => handleEdit('email')} className="account-edit-editbutton">
                        Edit
                    </button>
                </div>

                {/* Save and Discard Buttons */}
                {(isEditing.name || isEditing.lastname || isEditing.email) && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                        <button
                            onClick={handleSaveChanges}
                            style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'green', color: 'white' }}
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleDiscardChanges}
                            style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'gray', color: 'white' }}
                        >
                            Discard Changes
                        </button>
                    </div>
                )}

                {/* Delete Account Button */}
                <button
                    onClick={() => alert('Delete Account Logic Here')}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        marginTop: '30px'
                    }}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
