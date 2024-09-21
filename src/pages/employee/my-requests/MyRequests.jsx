import React, { useEffect, useState } from 'react'
import styles from './myRequests.module.css'
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function MyRequests() {

    const [requests, setRequests] = useState([]);
    const navigate = useNavigate()

    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const employeeId = decodedToken.id

    useEffect(() => {
        const fetchRequests = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/api/requests/all',

                    {
                        params: {
                            id: employeeId,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                setRequests(response.data.requests);
            } catch (err) {
                console.log('Error fetching requests:', err);
            }
        }
        fetchRequests()
    }, [])

    const handleClick = (id) => {
        navigate(`/my-requests/${id}`);
    };

    return (
        <div className={styles.page_container}>
            <div className={styles.container}>

                <div className={styles.page_title}>Your requests:</div>

                <div className={styles.table_container}>

                    <div className={styles.table}>

                        <div className={styles.titles}>
                            <div className={styles.elem}>
                                <p className={styles.title}>Request ID</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.title}>Products</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.title}>Request date</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.title}>Status</p>
                            </div>
                        </div>

                        {
                            requests.map((request) => (
                                <div className={styles.requests} key={request._id} onClick={() => handleClick(request._id)}>
                                    <div className={styles.elem}>
                                        <p className={styles.content}>{request._id}</p>
                                    </div>
                                    <div className={styles.elem}>
                                        <p className={styles.content}>{request.ProdNum}</p>
                                    </div>
                                    <div className={styles.elem}>
                                        <p className={styles.content}>{request.createdAt ? format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</p>
                                    </div>
                                    <div className={styles.elem}>
                                        <p className={`${styles.content} ${styles[request.status.toLowerCase()]}`}>{request.status}</p>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyRequests