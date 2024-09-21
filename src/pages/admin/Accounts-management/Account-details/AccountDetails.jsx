import React, { useEffect, useState } from 'react';
import styles from './accountDetails.module.css';
import { format } from 'date-fns';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AccountDetails() {
    const [user, setUser] = useState(null);
    const [count, setCount] = useState();
    const { id } = useParams() 

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3001/api/users/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (err) {
                console.log(err)
            }
        };

        fetchUserData();
    }, [id]);


    useEffect(() => {
        const fetchCount = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3001/api/requests/all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCount(response.data);
            } catch (err) {
                console.log(err)
            }
        };

        fetchCount();
    }, [id]);





    if (!user || !count) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.account_detail_page}>
                <div className={styles.user_card}>
                    <div className={styles.user_img}>
                        {/* <img src={nouser} alt="" /> */}
                    </div>

                    <div className={styles.user_details}>
                        <div className={styles.field}>Username:&nbsp;&nbsp;<span>{user.username}</span></div>
                        <div className={styles.field}>Email:&nbsp;&nbsp;<span>{user.email}</span></div>
                        <div className={styles.field}>Phone number:&nbsp;&nbsp;<span>{user.tel}</span></div>
                        <div className={styles.field}>Service:&nbsp;&nbsp;<span>{user.jobTitle}</span></div>
                        <div className={styles.field}>Joined at:&nbsp;&nbsp;<span>{user.createdAt ? format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</span></div>
                        <div className={styles.field}>Last updated at:&nbsp;&nbsp;<span>{user.updatedAt ? format(new Date(user.updatedAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</span></div>
                    </div>
                </div>

                <div className={styles.more_info}>
                    <div className={styles.more}>More infos</div>
                    <div className={styles.title}>My Requests</div>
                    <div className={styles.table_container}>
                        <div className={styles.table}>
                            
                            <div className={styles.titles}>
                                <div className={styles.item}>Total</div>
                                <div className={styles.item}>Approved </div>
                                <div className={styles.item}>Pending </div>
                                <div className={styles.item}>Rejected </div>
                            </div>
                            <div className={styles.items}>
                                <div className={styles.item}>{count.requestCount}</div>
                                <div className={styles.item}>{count.approvedCount}</div>
                                <div className={styles.item}>{count.pendingCount}</div>
                                <div className={styles.item}>{count.rejectedCount}</div>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </div>
    );
}

export default AccountDetails;
