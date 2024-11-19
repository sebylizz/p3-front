"use client"
import React from 'react';
import { useCart } from '../context/cartContext'; // Assuming you already have the CartContext set up.
import { useProducts } from '../context/productContext'; // Fetching products to get information by ID.

export default function CartPage() {
  const { cart, setCart } = useCart();  // Cart context to manage cart data
  const { products } = useProducts();   // Fetching all products data

  // Function to increase the quantity of a product
  const increaseQuantity = (productId) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrease the quantity of a product
  const decreaseQuantity = (productId) => {
    setCart(prevCart => 
      prevCart.reduce((newCart, item) => {
        if (item.productId === productId) {
          if (item.quantity > 1) {
            // If quantity is greater than 1, decrement it
            newCart.push({ ...item, quantity: item.quantity - 1 });
          }
          // If quantity is 1, omit the item (remove it)
        } else {
          newCart.push(item); // Keep other items unchanged
        }
        return newCart;
      }, [])
    );
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product.price * item.quantity);
    }, 0).toFixed(2); // Format to two decimal places
  };

  // Render each product in the cart
  const renderCartItems = () => {
    return cart.map((item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return null; // If product doesn't exist (could happen on refresh), skip.
      return (
        <div key={item.productId} className="flex justify-between items-center border-b py-4">
          {/* Left Side: Product Info */}
          <div className="flex items-center">
            <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover mr-4" />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </div>

          {/* Right Side: Quantity Management */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => decreaseQuantity(item.productId)} 
              className="text-xl text-gray-500"
            >
              -
            </button>
            <p className="text-lg">{item.quantity}</p>
            <button 
              onClick={() => increaseQuantity(item.productId)} 
              className="text-xl text-gray-500"
            >
              +
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto p-8 flex gap-8">
      {/* Left Side: Cart Items */}
      <div className="w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          renderCartItems()
        )}
      </div>

      {/* Right Side: Summary & Checkout */}
      <div className="w-1/4">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        {/* Discount Code Input */}
        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700">Discount Code</label>
          <input 
            type="text" 
            id="discount" 
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter discount code"
          />
        </div>

        {/* Total Price */}
        <div className="mb-4">
          <p className="font-semibold">Total Price:</p>
          <p className="text-2xl">${calculateTotal()}</p>
          {/* Total Price Breakdown (Equation) */}
          <p className="text-sm text-gray-500">
            {cart.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <span key={index}>
                  {product.name} x {item.quantity} ${product.price * item.quantity}
                  {index < cart.length - 1 && ' + '}
                </span>
              );
            })}
          </p>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-black text-white py-2 mt-4 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
}
