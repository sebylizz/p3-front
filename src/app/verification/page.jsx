'use client';

import verifyFetcher from '../lib/verifyFetcher';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Verification() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            const response = await verifyFetcher(token);
            if (response.success === true) {
                alert("Verified!");
            } else {
                alert("Verification failed.");
            }
            window.location.href = '/';
        };

        if (token) {
            verifyToken();
        }
    }, [token]);

    return null;
}
