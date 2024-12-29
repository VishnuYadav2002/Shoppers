import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { FaTrashAlt } from 'react-icons/fa'; // Import a trash icon
import './style.css'; // Optional: Add CSS for better styling

const Cart = () => {
    const { cartItems, deleteFromCart } = useCart(); // Use deleteFromCart from context
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    // Function to fetch product data for each item in the cart
    useEffect(() => {
        const fetchProductDetails = async (productId) => {
            try {
                const response = await fetch(`http://localhost:8081/api/item/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(`Product Data for Product ID ${productId}:`, data); // Log the product data
                    return data.itemName && data.itemName[0] ? data.itemName[0] : null; // Ensure the product data is available
                } else {
                    console.error(`Failed to fetch item data for product ID ${productId}`);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                return null;
            }
        };

        // Fetch product details for each cart item
        const fetchAllProducts = async () => {
            setLoading(true); // Set loading to true before fetching data
            const productDetails = await Promise.all(
                cartItems.map(async (item) => {
                    const productData = await fetchProductDetails(item.product_id);
                    return { ...item, product: productData }; // Merge product details with cart item
                })
            );
            setProducts(productDetails.filter((item) => item.product !== null)); // Filter out any null products
            setLoading(false); // Set loading to false once the data is fetched
        };

        fetchAllProducts();
    }, [cartItems]); // Refetch whenever cartItems change

    const handleDelete = async (productId) => {
        try {
            await deleteFromCart(productId); // Invoke deleteFromCart, which also updates the state
        } catch (error) {
            console.error('Error deleting item from cart:', error); // Handle any errors that occur during deletion
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="cart-page">
                    <h3>Your Cart</h3>
                    <p>Loading your cart items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="cart-page">
                <h3>Your Cart</h3>
                {products.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className="cart-table" border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.product ? (
                                            item.product.photo ? (
                                                <img 
                                                    src={`http://localhost:8081/upload/images/${item.product.photo}`} 
                                                    width={100} 
                                                    alt={item.product.name} 
                                                />
                                            ) : (
                                                <span>Image not available</span>
                                            )
                                        ) : (
                                            <span>Product unavailable</span>
                                        )}
                                    </td>
                                    <td>{item.product ? item.product.name : 'Product unavailable'}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.product ? item.product.discount_price : 'N/A'}</td>
                                    <td>₹{item.product ? item.product.discount_price * item.quantity : 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(item.product ? item.product.id : item.product_id)} // Pass item.product.id or item.product_id
                                            className="delete-btn"
                                            aria-label={`Delete ${item.product ? item.product.name : 'item'}`}
                                        >
                                            <FaTrashAlt style={{ color: 'red', cursor: 'pointer' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Cart;
