import React, { useState, useEffect } from 'react'
import styles from './myRequest.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";



function MyRequest() {

    const { id } = useParams();
    const [request, setRequest] = useState(null)
    const [products, setProducts] = useState(null)


    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const employeeId = decodedToken.id


    useEffect(() => {
        const fetchBon = async () => {

            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.post(`http://localhost:3001/api/requests/all/${id}`,
                    {
                        id: employeeId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRequest(response.data.request);
                setProducts(response.data.products)
            } catch (err) {
                console.log('Error fetching bons:', err);
            }
        };

        fetchBon();
    }, [id]);


    if (!request) return (<div>Loading ...</div>)

    return (
        <div className={styles.page_container}>
            <div className={styles.request_page}>

                <div className={styles.request_id}>
                    <div className={styles.req}>
                        Request id: <span>{request._id}</span>
                    </div>
                    <div className={styles.status}>Status:&nbsp;&nbsp;&nbsp;<span className={`${styles.status} ${styles[request.status.toLowerCase()]}`}>{request.status}</span></div>
                </div>

                <div className={styles.header}>Request details</div>

                <div className={styles.products_details}>
                    <div className={styles.table}>
                        <div className={styles.titles1}>
                            <div className={styles.prod_img}>Img</div>
                            <div className={styles.name}>Product name</div>
                            <div className={styles.ref}>Reference</div>
                            <div className={styles.quantity}>Quantity</div>
                        </div>
                        {
                            products.map((prod) => (
                                <div className={styles.titles2} key={prod.requestedProduct._id}>
                                    <div className={styles.prod_img}><div className={styles.img}></div></div>
                                    <div className={styles.name}>{prod.product.name}</div>
                                    <div className={styles.ref}>{prod.product.ref}</div>
                                    <div className={styles.quantity}><input type="text" value={prod.requestedProduct.quantity} className={styles.input} /><FaRegEdit className={styles.edit} /></div>
                                </div>
                            ))
                        }
                    </div>
                </div>



            </div>
        </div >
    )
}

export default MyRequest