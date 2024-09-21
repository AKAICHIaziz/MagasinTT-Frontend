import React, { useEffect, useState } from 'react';
import styles from './bon.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FaFilePdf } from "react-icons/fa";




function Bon() {
    const { NumBon } = useParams();
    const [bon, setBon] = useState(null);
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchBon = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/api/bons/all/${NumBon}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBon(response.data.bon);
            } catch (err) {
                console.log('Error fetching bons:', err);
            }
        };

        fetchBon();
    }, [NumBon]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/api/products/get-by-bon/${NumBon}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data.products);
            } catch (err) {
                console.log('Error fetching bons:', err);
            }
        };

        fetchProducts();
    }, [NumBon]);

    if (!bon) {
        return <div>Loading...</div>; // Show a loading message while the data is being fetched
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.bon_page}>

                <div className={styles.bonDetails}>
                    <div className={styles.div}>Reference:&nbsp;&nbsp;&nbsp;<span className={styles.span}>{NumBon}</span></div>
                    <div className={styles.div}> db ID:&nbsp;&nbsp;&nbsp;<span className={styles.span}>{bon._id}</span></div>
                    <div className={styles.div}> Entry date:&nbsp;&nbsp;&nbsp;<span className={styles.span}>{bon.createdAt ? format(new Date(bon.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</span></div>
                    <button className={styles.download}><FaFilePdf />Download PDF</button>
                </div>

                <div className={styles.title}>Products list</div>

                <div className={styles.products_container}>

                    {
                        products.map((product) => (
                            <div className={styles.product} key={product._id}>

                                <img className={styles.prod_img} src={product.image} alt="" />

                                <div className={styles.container}>

                                    <div className={styles.details}>

                                        <div className={styles.details_left}>
                                            <div className={styles.name}>•&nbsp;{product.name}</div>
                                            <div className={styles.left}>•&nbsp;{product.category}</div>
                                            <div className={styles.left}>•&nbsp;{product.ref}</div>
                                        </div>

                                        <div className={styles.details_right}>
                                            <div className={styles.right}>•&nbsp;{product.maker}</div>
                                            <div className={styles.right}>•&nbsp;{product.provider}</div>
                                            <div className={styles.right}>•&nbsp;{product.qte} total</div>
                                        </div>

                                    </div>

                                    <div className={styles.description}>
                                        {product.description}
                                    </div>

                                </div>



                            </div>
                        ))
                    }

                </div>


            </div>
        </div>
    );
}

export default Bon;
