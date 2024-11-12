'use client';
import React, { useEffect, useState } from 'react';
import fetchCustomer from '../../lib/fetchCustomer';
import editCustomer from '../../lib/editCustomer';

export default function EditAccount() {
    const temp = {};
    temp.firstName = '';
    temp.lastName = '';
    temp.email = '';
    const [user, setUser] = useState(temp);  // This is to store the user data

    useEffect(() => {
        //async function to fetch user data
        const fetchCustomerData = async () => {
            try {
                const fetchedUser = await fetchCustomer();  
                setUser(fetchedUser);  // Update state with the fetched user data
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomerData();  // Call the async function inside useEffect
    }, []);  // Empty dependency array means it will run only once, when the component mounts

    
    const handleSaveChanges = async () => {
        try {
            await editCustomer(user); // Call editCustomer with updated user data
            setOriginalUser(user); // Update originalUser to match saved data
        } catch (error) {
            console.error('Error saving customer data:', error);
        }
    };

    

    const handleInputChange = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };

    const handleDiscardChanges = () => {
        setUser(originalUser); // Reset user data to the original fetched data
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20%' }}>

                {/* Name Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                        }}
                    />
                    
                </div>

                {/* Last Name Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                        }}
                    />
                    
                </div>

                {/* Email Box */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            textAlign: 'center',
                            border: 'black',
                        }}
                    />
                    
                </div>

                {/* Save and Discard Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                        <button
                            onClick={handleSaveChanges()}
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
                

                {/* Delete Account Button */}
                <button
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
