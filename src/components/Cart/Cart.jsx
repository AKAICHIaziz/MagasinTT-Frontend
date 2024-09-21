import React from 'react';
import styles from './cart.module.css';
import { FaWindowClose } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCartShopping } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function Cart({ isOpen, onClose, cartItems, onDelete }) {
    const navigate = useNavigate();

    const handleOrderDetailsClick = () => {
        navigate('/order-details', { state: { orderItems: cartItems } }); // Pass the cart items to the order detail page
    };

    return (
        <div className={`${styles.cart_container} ${isOpen ? styles.open : ''}`}>
            <div className={styles.top}>
                <FaWindowClose className={styles.close_btn} onClick={onClose} />
            </div>
            <div className={styles.content}>
                <h2>Cart Items</h2>
                <div className={styles.cart_items}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className={styles.cart_item}>
                                <div className={styles.cart_image}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={styles.cart_details}>
                                    <p className={styles.cart_name}>{item.name}</p>
                                    <p className={styles.cart_ref}>réf: {item.ref}</p>
                                </div>
                                <MdDelete
                                    className={styles.delete}
                                    onClick={() => onDelete(item._id)} // Pass the item's ID for deletion
                                />
                            </div>
                        ))
                    ) : (
                        <p>No items in the cart.</p>
                    )}
                </div>
                <div className={styles.button} onClick={handleOrderDetailsClick}>
                    <FaCartShopping className={styles.icon} />
                    <p>Order Details</p>
                </div>
            </div>
        </div>
    );
}

export default Cart;
