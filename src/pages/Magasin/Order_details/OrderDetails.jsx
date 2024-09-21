import React, { useState } from 'react';
import styles from './orderDetails.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify';


function OrderDetails() {
    const location = useLocation();
    const navigate = useNavigate()
    const { orderItems } = location.state || { orderItems: [] };
    const [quantities, setQuantities] = useState(orderItems.map(() => 1));
    const [reasons, setReasons] = useState(orderItems.map(() => ""));

    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const employeeId = decodedToken.id
    const employeeName = decodedToken.username

    const handleQuantityChange = (index, newQuantity) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = newQuantity;
        setQuantities(updatedQuantities);
    };

    const handleReasonChange = (index, newReason) => {
        const updatedReasons = [...reasons];
        updatedReasons[index] = newReason;
        setReasons(updatedReasons);
    };

    const handleSendRequest = async () => {
        try {
            const products = orderItems.map((item, index) => ({
                productId: item._id,
                quantity: quantities[index],
                reason: reasons[index]
            }));

            await axios.post(
                'http://localhost:3001/api/requests/create-request',
                {
                    employeeId,
                    employeeName,
                    products
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            console.log(employeeName)

            toast.success("Order is sent successfully", {
                autoClose: 1000
            })
            setTimeout(() => navigate('/magasin'), 1000);


        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={styles.page_container}>
            <div className={styles.order_page}>

                <h2>Order Details</h2>

                <div className={styles.order_items}>
                    {orderItems.length > 0 && (
                        orderItems.map((item, index) => (
                            <div key={index} className={styles.order_item}>
                                <div className={styles.order}>
                                    <img src={item.image} alt={item.name} />
                                    <div className={styles.order_details}>
                                        <p className={styles.order_name}>{item.name}</p>
                                        <p className={styles.order_ref}>réf: {item.ref}</p>
                                    </div>
                                </div>
                                <div className={styles.qte}>
                                    <TextField
                                        label="Quantity"
                                        variant="standard"
                                        fullWidth
                                        value={quantities[index]}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        className={styles.qte_input}
                                    />
                                </div>
                                <div className={styles.reason}>
                                    <TextField
                                        value={reasons[index]}
                                        onChange={(e) => handleReasonChange(index, e.target.value)}
                                        label="Why are you ordering this item?"
                                        multiline
                                        maxRows={5}
                                        fullWidth
                                        className={styles.reason_input}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.button_container}>
                    <div className={styles.button} onClick={handleSendRequest}>Send request</div>
                </div>

            </div>
            <ToastContainer style={{ width: 'auto', minWidth: '400px' }} />
        </div>
    );
}

export default OrderDetails;
