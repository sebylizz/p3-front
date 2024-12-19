'use client'
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import verifyPayment from '../lib/verifyPayment';

export default function SuccessPage() {
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const sessionId = params.get("session_id");
    const [answer, setAnswer] = useState({});

    useEffect(() => {
        const fetchStatus = async () => {
            const response = await verifyPayment(sessionId);
            setAnswer(response);
            setLoading(false);

        };

        fetchStatus();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold text-center">
                    Verifying payment...
                    <br />
                </h1>
            </div>
        );
    } else {
        if (answer.error) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-semibold text-center">
                        Payment failed: {answer.error}
                        <br />
                    </h1>
                </div>
            );
        } else {
            return (
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-semibold text-center">
                        Order placed successfully!
                        <br />
                    </h1>
                </div>
            );
        }
    }
}
