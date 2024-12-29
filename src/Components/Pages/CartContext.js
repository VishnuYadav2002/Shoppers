import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart data from the API (product_id and quantity)
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/cartdata');
                if (!response.ok) {
                    console.error('Failed to fetch cart data:', response.statusText);
                    return;
                }

                const data = await response.json();
                console.log('Cart Data:', data); // Log the cart data
                const cartItemsData = data.data || [];
                setCartItems(cartItemsData); // Save only product_id and quantity
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, []); // Run once when the component mounts

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
    };

    const deleteFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/deleteCart?product_id=${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                removeFromCart(productId);
            } else {
                console.error('Failed to delete item from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
