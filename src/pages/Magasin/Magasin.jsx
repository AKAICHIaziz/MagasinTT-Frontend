import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './magasin.module.css';
import { BiCategory } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import Cart from '../../components/Cart/Cart';
import Dotdotdot from 'react-dotdotdot';
import { FaRegEye } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import ProductModal from '../../components/modal/ProductModal';



function Magasin() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tout');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/api/products/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 204) {
                    setError('No products available');
                } else {
                    setProducts(response.data.products);
                }
            } catch (err) {
                setError('Error fetching products');
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleBasketClick = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleAddToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
        toast.success('Product added to cart', { autoClose: 500 });
    };

    const handleDeleteFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
        toast.success('Product removed from cart', { autoClose: 1000 });
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const filteredProducts = selectedCategory === 'Tout'
        ? products
        : products.filter(product => product.category === selectedCategory);



    return (
        <div className={styles.magasin_page}>
            <div className={styles.navbar}>
                <div className={styles.items}>
                    <div className={styles.all} onClick={() => handleCategorySelect('Tout')}>
                        <BiCategory className={styles.icon} />
                        <span>Tout</span>
                    </div>
                    <div className={styles.item} onClick={() => handleCategorySelect('informatique')}>
                        <span>Informatique</span>
                    </div>
                    <div className={styles.item} onClick={() => handleCategorySelect('bureautique')}>
                        <span>Bureautique</span>
                    </div>
                    <div className={styles.item} onClick={() => handleCategorySelect('stockage')}>
                        <span>Stockage</span>
                    </div>
                    <div className={styles.item} onClick={() => handleCategorySelect('réseau')}>
                        <span>Réseau</span>
                    </div>
                    <div className={styles.item} onClick={() => handleCategorySelect('special')}>
                        <span>Matérielle spéciale</span>
                    </div>
                </div>
                <div className={styles.basket} onClick={handleBasketClick}>
                    My cart
                    <FaCartShopping className={styles.basket_icon} />
                </div>
            </div>

            <div className={styles.content}>
                {error ? (
                    <div>{error}</div>
                ) :
                    (
                        filteredProducts.map(product => (
                            <div key={product._id} className={styles.product_card}>
                                <div className={styles.img}>
                                    <img src={product.image} alt="" />
                                    <div className={styles.right}>
                                        <FaRegEye className={styles.view} onClick={() => handleOpenModal(product)} />
                                        <MdOutlineShoppingCart className={styles.add_to_cart} onClick={() => handleAddToCart(product)} />
                                    </div>
                                </div>
                                <div className={styles.text}>
                                    <p className={styles.prod_name}>{product.name}</p>
                                    <p className={styles.short_desc}>
                                        <Dotdotdot clamp={3}>
                                            {product.description}
                                        </Dotdotdot></p>
                                    <p className={styles.ref}>réf: <span>{product.ref}</span></p>
                                    <p className={styles.avaibility}>Avaible</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            <ToastContainer />
            <Cart
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                cartItems={cartItems}
                onDelete={handleDeleteFromCart}
            />
            <ProductModal
                isOpen={isModalOpen}
                product={selectedProduct}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default Magasin;
