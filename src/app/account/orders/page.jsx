'use client';
import React, { useEffect, useState } from 'react';
import getCustomerOrders from '../../lib/getCustomerOrders';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const fetchedOrders = await getCustomerOrders();
                setOrders(fetchedOrders || []); // Fallback to an empty array if no data
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrderData();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '20px', color: 'black', fontSize: '2rem', fontWeight: 'bold', textAlign: 'left' }}>
                {orders.length > 0 ? 'Your Orders' : 'You have no previous orders'}
            </h1>

            {orders.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                    textAlign: 'left'
                }}>
                    {/* Table Headers */}
                    <div style={{ fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '10px' }}>Order ID</div>
                    <div style={{ fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '10px' }}>Items</div>
                    <div style={{ fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '10px' }}>Total Price</div>

                    {/* Order Rows */}
                    {orders.map(order => (
                        <React.Fragment key={order.orderId}>
                            <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.orderId}</div>
                            <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.productNames || 'No items'}</div>
                            <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{`${(order.totalPrice / 100).toFixed(2)} Kr`}</div>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}
