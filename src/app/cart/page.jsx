"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useProducts } from "../context/productContext";
import quantityAddLimit from "../lib/quantityAddLimit";

export default function CartPage() {
    const router = useRouter();
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    const { products = [], isLoading: productsLoading } = useProducts();
    const [isLoading, setIsLoading] = useState(true);

    const handleIncreaseQuantity = (productId, quantity) => {
        if (quantityAddLimit(productId, quantity, products)) {
            increaseQuantity(productId);
        } else {
            alert("Cannot add more of this product. Not enough stock.");
        }
    };

    const handleCardClick = (productId, colorId) => {
        const url = `/productPage/${productId}?colorId=${colorId}`
        router.push(url);
      };

    useEffect(() => {
        if (!productsLoading) {
            setIsLoading(false);
        }
    }, [productsLoading]);

    const getCartSummary = () => {
        const cartSummary = {};
        cart.forEach((productId) => {
            cartSummary[productId] = (cartSummary[productId] || 0) + 1;
        });
        const sortedSummary = Object.fromEntries(
            Object.entries(cartSummary).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        );

        return sortedSummary;
    };

    const calculateTotal = () => {
        const cartSummary = getCartSummary();
        return Object.entries(cartSummary)
            .reduce((total, [productId, quantity]) => {
                const product = products.find((p) => String(p.id) === String(productId.split('/')[0]));
                return product ? total + (product.price / 100).toFixed(2) * quantity : total;
            }, 0)
            .toFixed(2);
    };

    const renderCartItems = () => {
        const cartSummary = getCartSummary();
        return Object.entries(cartSummary).map(([productId, quantity]) => {
            const ids = productId.split('/').map((id) => parseInt(id));
            const product = products.find((p) => (p.id) === ids[0]);
            if (!product) return null;
            product.color = product.colors.find((c) => c.id === ids[1]);
            product.variant = product.color.variants.find((v) => v.id === ids[2]);

            return (
                <div
                    key={productId}
                    className="flex justify-between items-center border-b py-4"
                >
                    <div 
                        className="flex items-center"
                        onClick={() => handleCardClick(product.id, product.color.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        
                        <img
                            src={`${product.id}/${product.color.id}/${product.color.mainImage}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-gray-500">{(product.price / 100).toFixed(2)} Kr</p>
                            <p className="text-gray-500">{product.variant.size}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => decreaseQuantity(productId)}
                            className="text-xl text-gray-500"
                        >
                            -
                        </button>
                        <p className="text-lg">{quantity}</p>
                        <button
                            onClick={() => handleIncreaseQuantity(productId, quantity)}
                            className="text-xl text-gray-500"
                        >
                            +
                        </button>
                    </div>
                </div>
            );
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 flex gap-8">
            <div className="w-3/4">
                {cart.length === 0 ? (
                    <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                        {renderCartItems()}
                    </>
                )}
            </div>
            {cart.length > 0 && (
                <div className="w-1/4">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <div className="mb-4">
                        <p className="font-semibold">Total Price:</p>
                        <p className="text-2xl">{calculateTotal()} Kr</p>
                    </div>
                    <button
                        onClick={() => router.push("/cart/checkout")}
                        className="w-full bg-black text-white py-2 mt-4 rounded"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
