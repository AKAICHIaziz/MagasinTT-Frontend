import React, { useEffect, useState } from 'react';
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css'
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import Accordion from '../Accordion/Accordion';
import { FaUsers } from "react-icons/fa6";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";



function Sidebar() {

  const [user, setUser] = useState({ role: '', name: '' });
  const [test, setTest] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/api/users/getUsernameAndJob', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser({
          jobTitle: response.data.jobTitle,
          username: response.data.username,
          isAdmin: response.data.isAdmin,
          isStoreAdmin: response.data.isStoreAdmin
        });
        if (response.data.test) {
          setTest(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  const isActive = (link) => location.pathname.startsWith(link);

  const accountsManagementItems = [
    <div onClick={() => handleLinkClick('/accounts-management/users')} className={`${styles.inner_item} ${isActive('/accounts-management/users') ? styles.acc_active : ''}`}><FaUsers className={styles.ico} />Users list</div>,
    <div onClick={() => handleLinkClick('/accounts-management/signup-requests')} className={`${styles.inner_item} ${isActive('/accounts-management/signup-requests') ? styles.acc_active : ''}`}><FaPersonCircleQuestion className={styles.ico} />Signup requests</div>
  ];

  const BONManagementItems = [
    <div onClick={() => handleLinkClick('/bon-management/add')} className={`${styles.inner_item} ${isActive('/bon-management/add') ? styles.acc_active : ''}`}><FaPersonCircleQuestion className={styles.ico} />Add BON</div>,
    <div onClick={() => handleLinkClick('/bon-management/in')} className={`${styles.inner_item} ${isActive('/bon-management/in') ? styles.acc_active : ''}`}><FaPersonCircleQuestion className={styles.ico} />BON d'entrer</div>,
    <div onClick={() => handleLinkClick('/bon-management/out')} className={`${styles.inner_item} ${isActive('/bon-management/out') ? styles.acc_active : ''}`}><FaPersonCircleQuestion className={styles.ico} />BON de sortie</div>
  ];

  if (!user.isStoreAdmin) {
    return null;
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.items}>

        {user.isStoreAdmin && (<div className={`${styles.left} ${isActive('/dashboard') ? styles.left_active : ''}`}><div className={`${styles.item} ${isActive('/dashboard') ? styles.active : ''}`} onClick={() => handleLinkClick('/dashboard')}><MdDashboard className={styles.ico} /><p>Dashboard</p></div></div>)}

        {user.isStoreAdmin && (<div className={`${styles.left} ${isActive('/products') ? styles.left_active : ''}`}><div className={`${styles.item} ${isActive('/products') ? styles.active : ''}`} onClick={() => handleLinkClick('/products')}><MdInventory className={styles.ico} /><p>Products management</p></div></div>)}

        {user.isAdmin && (
          <Accordion
            title="Accounts management"
            link="/accounts-management/users"
            contents={accountsManagementItems}
          />
        )}

        {user.isStoreAdmin && (
          <Accordion
            title="BON management"
            link="/bon-management/in"
            contents={BONManagementItems}
          />
        )}

        {user.isStoreAdmin && (<div className={`${styles.left} ${isActive('/requests') ? styles.left_active : ''}`}><span className={`${styles.item} ${isActive('/requests') ? styles.active : ''}`} onClick={() => handleLinkClick('/requests')}><FaPersonCircleQuestion className={styles.ico} /><p>Requests</p></span></div>)}

        {user.isStoreAdmin && (<div className={`${styles.left} ${isActive('/chat') ? styles.left_active : ''}`}><span className={`${styles.item} ${isActive('/chat') ? styles.active : ''}`} onClick={() => handleLinkClick('/chat')}><IoIosChatboxes className={styles.ico} /><p>Chat</p></span></div>)}

        {user.isStoreAdmin && (<div className={`${styles.left} ${isActive('/profile') ? styles.left_active : ''}`}><span className={`${styles.item} ${isActive('/profile') ? styles.active : ''}`} onClick={() => handleLinkClick('/profile')}><MdAccountCircle className={styles.ico} /><p>My profile</p></span></div>)}

      </div>
      <div className={styles.logout} onClick={logout}>
        <IoLogOut className={styles.logout_icon} />
        <p>Log Out</p>
      </div>
    </div>
  )
}

export default Sidebar