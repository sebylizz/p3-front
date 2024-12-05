'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import verifyPayment from "../lib/verifyPayment.js";

function VerifyPaymentComponent() {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState({});
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchStatus = async () => {
      if (sessionId) {
        setLoading(true);
        try {
          const response = await verifyPayment(sessionId);
          setAnswer(response);
        } catch (error) {
          console.error("Error verifying payment:", error);
          setAnswer({ error: "An unexpected error occurred" });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
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
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {answer.error ? (
        <h1 className="text-2xl font-semibold text-center">
          Payment failed: {answer.error}
          <br />
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold text-center">
          Order placed successfully!
          <br />
        </h1>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading search parameters...</p>}>
      <VerifyPaymentComponent />
    </Suspense>
  );
}
