// src/components/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from './productDetails.module.css';
import { FaArrowLeft } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3001/api/products/all/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetails_page}>
      <div className={styles.container}>

        <div className={styles.top}>
          <Link to='/products' className={styles.button1}>
            <FaArrowLeft />
            Go back
          </Link>
        </div>

        <div className={styles.product_details}>
          <div className={styles.prod_img_container}>
            <img src={product.image} alt="" className={styles.prod_img} />
          </div>

          <div className={styles.prod_details}>
            <div className={styles.prod_name}>{product.name}</div>
            <div className={styles.prod_ref}>Reference -&nbsp;&nbsp;&nbsp;{product.ref}</div>
            <div className={styles.prod_desc}>{product.description}</div>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.titles}>

            <div className={styles.title}>Brand</div>
            <div className={styles.title}>Category</div>
            <div className={styles.title}>Supplier</div>
            <div className={styles.title}>Total quantity</div>
            <div className={styles.title}>In stock</div>

          </div>
          <div className={styles.items}>
            <div className={styles.item}>{product.maker}</div>
            <div className={styles.item}>{product.category}</div>
            <div className={styles.item}>{product.provider}</div>
            <div className={styles.item}>{product.quantity}</div>
            <div className={styles.item}>15</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
