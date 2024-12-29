

import React, { useState } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const { productData } = location.state || {};
    const { addToCart } = useCart(); 

    const specificationName = JSON.parse(productData.specification_name);
    const specificationDescription = JSON.parse(productData.specification_description);

    const sizeIndex = specificationName.findIndex(name => name.includes("Size"));
    const sizes = sizeIndex !== -1 ? specificationDescription[sizeIndex].split('/') : [];

    const increaseQuantity = () => setQuantity(quantity + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const totalPrice = productData.discount_price * quantity;

  
    const userId = 1; // Replace this with dynamic user ID if needed

    const handleAddToCart = async () => {
        const payload = {
            user_id: userId,
            product_id: productData.id,
            quantity,
            price: productData.discount_price,
            total_price: totalPrice,
        };

        console.log('Adding to cart with payload:', payload);

        try {
            const response = await fetch('http://localhost:8081/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Product added to cart:', result);
                addToCart(productData, quantity); // Update local cart context
            } else {
                console.error('Failed to add to cart', response.statusText);
            }
        } catch (error) {
            console.error('Error while adding to cart:', error);
        }
    };

    

    return (
        <div className="product-page">
            <div className="product-gallery">
                <img src={`http://localhost:8081/upload/images/${productData.photo}`} alt="Main Product" className="main-image" />
                <div className="thumbnail-gallery">
                    <img src={`http://localhost:8081/upload/images/${productData.thumbnail}`} alt="Thumbnail 1" />
                    <img src="https://via.placeholder.com/100" alt="Thumbnail 2" />
                    <img src="https://via.placeholder.com/100" alt="Thumbnail 3" />
                </div>
            </div>

            <div className="product-details">
                <h1>{productData.name}</h1>
                <div className="rating-stock">
                    <span>★★★★☆</span>
                    <span className="stock-status">In Stock ({productData.stock} items)</span>
                </div>
                <div className="price">
                    <span className="original-price">₹{productData.previous_price}</span>
                    <span className="discounted-price">₹{totalPrice}</span>
                </div>
                <p className="description">
                   {productData.sort_details}
                </p>
                
                <div className="product-options">
                    <label>
                        Color
                        <select>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Green</option>
                        </select>
                    </label>
                    <label>
                        Size
                        <select>
                            {sizes.map(size => (
                                <option key={size}>{size}</option>
                            ))}
                        </select>
                    </label>
                </div>
                
                <div className="quantity-control">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>

                <div className="action-buttons">
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                  
                </div>
                
                <div className="product-meta">
                    <p>Tags: {productData.tags}</p>
                    <p>SKU: {productData.sku}</p>
                </div>
                
                <div className="wishlist-compare">
                    <button>Wishlist</button>
                    <button>Compare</button>
                </div>

                <div className="share">
                    <span>Share:</span>
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-pinterest"></i></a>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
