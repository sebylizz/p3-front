'use client';
import React, { useEffect, useState } from 'react';
import fetchCustomer from '../../lib/fetchCustomer';
import editCustomer from '../../lib/editCustomer';
import deleteAccount from '../../lib/deleteAccount';
import logOut from '../../lib/logOut';
import { useRouter } from 'next/navigation';
import { Modal, Typography } from '@mui/material';

export default function EditAccount() {
    const temp = { firstName: '', lastName: '', email: '', id: null };
    const [user, setUser] = useState(temp);  // This is to store the user data
    const [originalUser, setOriginalUser] = useState(temp);  // This is to store the original fetched data
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteButton = async () => {
        try {
            let confirmation = await deleteAccount(user.id);
            if (confirmation) {
                logOut().then(() => router.push("/"));
                alert("your account has been deleted");
            }
        } catch (error) {
            alert("error deleting account");
            console.error('error deleting account: ', error);
        }
    }

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const fetchedUser = await fetchCustomer();
                setUser(fetchedUser);  // Update state with the fetched user data
                setOriginalUser(fetchedUser);
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
            <h1 style={{ marginBottom: '20px', color: 'black', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', padding: '2%' }}>
                Edit your Account information here
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '5%' }}>

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
                        }}
                    />
                </div>

                {/* Save and Discard Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={handleSaveChanges}
                        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#FB923C', color: 'white', borderRadius: '8px' }}
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDiscardChanges}
                        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'black', color: 'white', borderRadius: '8px' }}
                    >
                        Discard Changes
                    </button>
                </div>

                {/* Delete Account Button */}
                <button
                    onClick={handleOpen}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        marginTop: '40%',
                        width: '100%',
                        borderRadius: '8px'
                    }}
                >
                    Delete Account
                </button>
                {/* Modal checkbox to ensure no missclick */}
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        margin: '50px auto',
                        textAlign: 'center',
                        marginTop: '20%'
                    }}>
                        <h2 style={{ color: 'red', padding: '10px' }}>Are you sure you want to delete your account?</h2>
                        <button
                            onClick={handleDeleteButton}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: 'red',
                                color: 'white',
                                width: '100%',
                                borderRadius: '8px'
                            }}> Confirm
                        </button>
                        <button
                            onClick={handleClose}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: 'black',
                                color: 'white',
                                marginTop: '10px',
                                width: '100%',
                                borderRadius: '8px'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
