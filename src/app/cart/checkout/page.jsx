"use client";
import { useState, useEffect } from "react";
import cartSender from "../../lib/cartSender.js";
import { useCart } from "../../context/cartContext";
import fetchCustomer from "../../lib/fetchCustomer.js";

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

    const [fetchedCustomer, setFetchedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stripePaymentLink, setStripePaymentLink] = useState("");

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const fetchedUser = await fetchCustomer();
                setFetchedCustomer(fetchedUser);
                setFormData({
                    firstName: fetchedUser.firstName || "",
                    lastName: fetchedUser.lastName || "",
                    address: fetchedUser.address || "",
                    postalCode: fetchedUser.postalCode || "",
                    phoneNumber: fetchedUser.phoneNumber || "",
                    email: fetchedUser.email || "",
                });
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomerData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const stripeLink = await cartSender(cart);
            if (stripeLink) {
                if (stripeLink.includes("stripe")) {
                    setStripePaymentLink(stripeLink);
                    window.open(stripeLink, "_blank"); 
                } else {
                    setError("Invalid payment link. Please try again."); 
                    setLoading(false); 
                }
            } else {
                alert("Failed to retrieve payment link");
                setLoading(false); 
            }
        } catch (error) {
            alert("An error occurred while processing your payment.");
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
                    {stripePaymentLink && (
                        <a
                            href={stripePaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Click here if you were not redirected.
                        </a>
                    )}
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

                {/* Address */}
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
                    className={`w-full py-2 mt-4 rounded ${
                        loading ? "bg-gray-400" : "bg-black text-white"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    );
}
