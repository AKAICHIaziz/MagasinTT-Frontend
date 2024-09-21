import React from 'react';
import styles from './productModal.module.css'; // Styles for modal

function ProductModal({ isOpen, product, onClose }) {
    if (!isOpen || !product) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <div className={styles.container}>
                    <img src={product.image} alt={product.name} className={styles.modalImage} />
                    <div className={styles.details}>
                        <h2>{product.name}</h2>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Reference:</strong> {product.ref}</p>
                        <p><strong>Availability:</strong> {product.isAvailable ? 'Available' : 'Out of Stock'}</p>
                        <p><strong>Price:</strong> {product.price} USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
