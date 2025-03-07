"use client";
import { useState, useEffect } from "react";
import cartSender from "../../lib/cartSender";
import fetchCustomer from "../../lib/fetchCustomer";
import { useCart } from "../../context/cartContext";
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
    });

    useEffect(() => {
        async function loadCustomerData() {
            const customer = await fetchCustomer();
            if (customer) {
                setFormData({
                    firstName: customer.firstName || "",
                    lastName: customer.lastName || "",
                    address: customer.address || "",
                    postalCode: customer.postalCode || "",
                    phoneNumber: customer.phoneNumber || "",
                    email: customer.email || "",
                });
            }
        }
        loadCustomerData();
    }, []);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const sessionId = await cartSender(formData, cart);

            if (sessionId === -1) {
                alert("Failed to create payment session");
                setLoading(false);
                return;
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51QA8WbCZh5mI9KbJuYzOgvILXehId4peiz0SZfAXviiEDTQpw9MJmUAfuQLgNY0NboEvnJTVO2bsbJ1RIHpaP9xQ00LmbXX7vj");
                if (stripe) {
                    const result = await stripe.redirectToCheckout({ sessionId: sessionId });
                    if (result.error) {
                        alert(`Error redirecting to checkout: ${result.error.message}`);
                    }
                } else {
                    alert("Stripe failed to load.");
                    setLoading(false);
                }
                // const stripe = await loadStripe("pk_test_51QA8WbCZh5mI9KbJuYzOgvILXehId4peiz0SZfAXviiEDTQpw9MJmUAfuQLgNY0NboEvnJTVO2bsbJ1RIHpaP9xQ00LmbXX7vj");
                // if (stripe) {
                //     // Check if in test mode based on environment variable Cypress
                //     if (Cypress.env("NODE_ENV")) {

                //         // Skip Stripe redirect and simulate success
                //         alert("In test mode, payment would be processed now.");
                //         setLoading(false);
                //         // Simulate success: Directly navigate to success page
                //         window.location.href = "/success?session_id=mock_session_id";
                //     } else {
                //         const result = await stripe.redirectToCheckout({ sessionId: sessionId });
                //         if (result.error) {
                //             alert(`Error redirecting to checkout: ${result.error.message}`);
                //         }
                //     }
                // } else {
                //     alert("Stripe failed to load.");
                //     setLoading(false);
                // }
            } else {
                alert("Failed to retrieve payment session");
                setLoading(false);
            }
        } catch (error) {
            alert("Payment error: " + error.message);
            console.error("Payment error:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold text-center">
                    Please pay via Stripe to confirm payment.
                    <br />
                </h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Delivery Address */}
                <div>
                    <label htmlFor="address" className="block text-gray-700">Delivery Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Pay Button */}
                <button
                    type="submit"
                    className={`w-full py-2 mt-4 rounded ${loading ? "bg-gray-400" : "bg-black text-white"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    );
}
