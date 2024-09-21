import React, { useEffect } from 'react'
import styles from './accountDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'

function AccountDetails() {


    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const token = sessionStorage.getItem('token')
            if (!token) {
                console.log('No token found');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/api/users/signup-requests/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(response.data.tempUser)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [id])


    const approveTempUser = async () => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            await axios.post(`http://localhost:3001/api/users/signup-requests/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            navigate('/accounts-management/signup-requests')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTempUser = async () => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/api/users/signup-requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            navigate('/accounts-management/signup-requests')
        } catch (error) {
            console.log(error)
        }
    }


    if (!user) return (<div>Loading ...</div>)

    return (
        <div className={styles.page_container}>
            <div className={styles.account_details_page}>

                <div className={styles.user_card}>
                    <div className={styles.user_img}>
                        {/* <img src={nouser} alt="" /> */}
                    </div>

                    <div className={styles.user_details}>
                        <div className={styles.field}>Username:&nbsp;&nbsp;<span>{user.username}</span></div>
                        <div className={styles.field}>Email:&nbsp;&nbsp;<span>{user.email}</span></div>
                        <div className={styles.field}>Phone number:&nbsp;&nbsp;<span>{user.tel}</span></div>
                        <div className={styles.field}>Service:&nbsp;&nbsp;<span>{user.jobTitle}</span></div>
                        <div className={styles.field}>Signed up at:&nbsp;&nbsp;<span>{user.createdAt ? format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</span></div>
                    </div>
                </div>


                <div className={styles.buttons_container}>
                    <button className={styles.approve} onClick={approveTempUser}>Approve</button>
                    <button className={styles.delete} onClick={deleteTempUser}>Delete</button>
                </div>


            </div>
        </div>
    )
}

export default AccountDetails