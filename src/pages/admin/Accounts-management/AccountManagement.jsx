import React, { useEffect, useState } from 'react';
import styles from './accountManagement.module.css';
import axios from 'axios';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom'


function AccountManagement() {
  const [users, setusers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setusers(response.data.users);
      } catch (err) {
        console.log('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleClick = (id) => {
    navigate(`/accounts-management/${id}`);
  };


  return (
    <div className={styles.page_container}>
      <div className={styles.AccountManagement_page}>
        <div className={styles.page_title}>
          Accounts management
          {/* <div className={styles.link} onClick={() => navigate('/accounts-management/signup-requests')}> Signup requests </div> */}
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
            <div className={styles.status}>
              <p className={styles.title}>Status</p>
            </div>
          </div>

          {
            users.map((user) => (
              <div className={styles.user_container} onClick={() => handleClick(user._id)}>
                <div className={styles.user_image}>
                  <p className={styles.content}>img</p>
                </div>
                <div className={styles.user_username}>
                  <p className={styles.content}>{user.username}</p>
                </div>
                <div className={styles.user_email}>
                  <p className={styles.content}>{user.email}</p>
                </div>
                <div className={styles.user_service}>
                  <p className={styles.content}>{user.jobTitle}</p>
                </div>
                <div className={styles.user_status}>
                  <p className={styles.status_container}>
                    <GoDotFill className={styles.dot} />
                    <p>online</p>
                  </p>
                </div>
              </div>
            ))
          }

          {/* {bons.map((bon) => (
            <div className={styles.bon_container} key={bon._id}>
              <div className={styles.elem}>
                <p className={styles.content}>{bon.NumBon}</p>
              </div>
              <div className={styles.elem}>
                <p className={styles.content}>{bon.NumProd}</p>
              </div>
              <div className={styles.elem}>
                <p className={styles.content}>0TND</p>
              </div>
              <div className={styles.elem}>
                <p className={styles.content}>{bon.createdAt ? format(new Date(bon.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
