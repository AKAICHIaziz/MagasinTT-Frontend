import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './request.module.css'

function Request() {

    const { id } = useParams();
    console.log(id)
    const [request, setRequest] = useState(null);
    const [products, setProducts] = useState([])
    const [user, setUser] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRequests = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.post(`http://localhost:3001/api/requests/all/${id}`,
                    {
                        id: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                console.log(response.data)
                setRequest(response.data.request);
                setProducts(response.data.products)
                setUser(response.data.user)
            } catch (err) {
                console.log('Error fetching bons:', err);
            }
        };

        fetchRequests();
    }, [id]);


    const handleReject = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            await axios.post(
                `http://localhost:3001/api/requests/reject`,
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/bon-management/requests');
        } catch (err) {
            console.log('Error rejecting request:', err);
        }
    };

    const handleApprove = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            await axios.post(
                `http://localhost:3001/api/requests/approve`,
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/bon-management/requests');
        } catch (err) {
            console.log('Error rejecting request:', err);
        }
    };

    if (!request || !user) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles.page_container}>
            <div className={styles.request_page}>

                <div className={styles.request_id}>
                    <div className={styles.req}>
                        Request id: <span>{request._id}</span>
                    </div>
                    {
                        request.status === 'pending' ? (
                            <div className={styles.buttons}>
                                <button className={styles.reject} onClick={handleReject}>Reject</button>
                                <button className={styles.approve} onClick={handleApprove}>Approve</button>
                            </div>
                        ) : request.status === 'rejected' ? (
                            <div className={styles.rejected}>Rejected at {request.updatedAt}</div>
                        ) : request.status === 'approved' ? (
                            <div className={styles.approved}>Approved at {request.updatedAt}</div>
                        ) : null
                    }
                </div>

                <div className={styles.header}>Request details</div>

                <div className={styles.products_details}>
                    <div className={styles.table}>
                        <div className={styles.titles1}>
                            <div className={styles.prod_img}>Img</div>
                            <div className={styles.name}>Product name</div>
                            <div className={styles.quantity}>Qte</div>
                            <div className={styles.reason}>Reason</div>
                        </div>
                        {
                            products.map((prod) => (
                                <div className={styles.titles2} key={prod.requestedProduct._id}>
                                    <div className={styles.prod_img}><img src={prod.product.image} alt="" /></div>
                                    <div className={styles.name}>{prod.product.name}</div>
                                    <div className={styles.quantity}>{prod.requestedProduct.quantity}</div>
                                    <div className={styles.reason}>{prod.requestedProduct.reason}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className={styles.header}>Employee details</div>

                <div className={styles.user_details}>
                    <div className={styles.table2}>

                        <div className={styles.detail_container}>
                            <div className={styles.detail_title}>Employee name</div>
                            <div className={styles.detail}>{user.username}</div>
                        </div>
                        <div className={styles.detail_container}>
                            <div className={styles.detail_title}>Phone number</div>
                            <div className={styles.detail}>{user.tel}</div>
                        </div>
                        <div className={styles.detail_container}>
                            <div className={styles.detail_title}>Email</div>
                            <div className={styles.detail}>{user.email}</div>
                        </div>
                        <div className={styles.detail_container}>
                            <div className={styles.detail_title}>Service</div>
                            <div className={styles.detail}>{user.jobTitle}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Request