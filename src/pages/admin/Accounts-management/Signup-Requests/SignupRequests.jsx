import React, { useEffect, useState } from 'react';
import styles from './signupRequests.module.css';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'


function SignupRequests() {
    const [tempUsers, setTempUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.get('http://localhost:3001/api/users/signup-requests', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTempUsers(response.data.tempUsers);
            } catch (err) {
                console.log('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className={styles.page_container}>
            <div className={styles.SignupRequests_page}>
                <div className={styles.page_title}>
                    Accounts management / signup requests
                    <div className={styles.link} onClick={() => navigate('/accounts-management')}> Go Back </div>
                </div>

                <div className={styles.container}>

                    <div className={styles.users_container_title}>
                        <div className={styles.image}>
                            <p className={styles.title}>User image</p>
                        </div>
                        <div className={styles.username}>
                            <p className={styles.title}>Username</p>
                        </div>
                        <div className={styles.email}>
                            <p className={styles.title}>Email</p>
                        </div>
                        <div className={styles.service}>
                            <p className={styles.title}>Service</p>
                        </div>
                        <div className={styles.date}>
                            <p className={styles.title}>Signup date</p>
                        </div>
                    </div>

                    {
                        tempUsers.map((tempUser) => (
                            <div className={styles.user_container} id={tempUser._id} onClick={() => navigate(`/accounts-management/signup-requests/${tempUser._id}`)}>
                                <div className={styles.user_image}>
                                    <p className={styles.content}>img</p>
                                </div>
                                <div className={styles.user_username}>
                                    <p className={styles.content}>{tempUser.username}</p>
                                </div>
                                <div className={styles.user_email}>
                                    <p className={styles.content}>{tempUser.email}</p>
                                </div>
                                <div className={styles.user_service}>
                                    <p className={styles.content}>{tempUser.jobTitle}</p>
                                </div>
                                <div className={styles.user_date}>
                                    <div className={styles.content}>{tempUser.createdAt ? format(new Date(tempUser.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default SignupRequests;
