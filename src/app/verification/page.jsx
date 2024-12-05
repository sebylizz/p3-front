'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import verifyFetcher from '../lib/verifyFetcher';

function VerificationComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await verifyFetcher(token);
                    if (response.success) {
                        alert("Verified!");
                    } else {
                        alert("Verification failed.");
                    }
                } catch (error) {
                    console.error("Error during verification:", error);
                    alert("An unexpected error occurred.");
                } finally {
                    window.location.href = '/';
                }
            }
        };

        verifyToken();
    }, [token]);

    return null;
}

export default function VerificationPage() {
    return (
        <React.Suspense fallback={<p>Loading verification...</p>}>
            <VerificationComponent />
        </React.Suspense>
    );
}
