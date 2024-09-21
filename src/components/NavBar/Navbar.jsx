import React, { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdChatboxes } from "react-icons/io";





function Navbar() {
  const [user, setUser] = useState({ role: '', name: '' });
  const [test, setTest] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigate = useNavigate();

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = (path) => {
    setDropdownVisible(!dropdownVisible);
    navigate(path);
  };

  const toggleNotoficationContainer = () => {
    setNotificationVisible(!notificationVisible)
  }

  const logout = () => {
    sessionStorage.clear()
    setDropdownVisible(!dropdownVisible);
    navigate('/')
  }

  return (
    <div className={styles.navbar}>

      <div className={styles.logo} onClick={() => handleLinkClick('/')}>Magasin-TT</div>

      {test && (
        <div className={styles.container}>

          <div className={styles.notification} onClick={toggleNotoficationContainer}><FaBell /></div>

          <div className={`${styles.notification_container} ${notificationVisible ? styles.show : ''}`}>Notification</div>

          <div className={styles.user} onClick={toggleDropdown}>
            <div className={styles.left}>
              <div className={styles.pdp}></div>
              <div className={styles.user_info}>
                <span className={styles.user_role}>{user.jobTitle}</span>
                <span className={styles.user_name}>{user.username}</span>
              </div>
            </div>
            {!user.isStoreAdmin && !user.isAdmin && test && <IoIosArrowDown className={styles.open_side_bar} />}
          </div>
        </div>
      )}

      {!user.isStoreAdmin && !user.isAdmin && test && (<div className={`${styles.dropdown_menu} ${dropdownVisible ? styles.show : ''}`}>
        <div className={styles.menu_item} onClick={() => handleLinkClick('/magasin')}><FaShoppingBasket />Magasin</div>
        <div className={styles.menu_item} onClick={() => handleLinkClick('/my-requests')}><FaClipboardQuestion />My requests</div>
        <div className={styles.menu_item} onClick={() => handleLinkClick('/chat')}><IoMdChatboxes />My requests</div>
        <div className={styles.menu_item} onClick={() => handleLinkClick('/profile')}><FaUser className={styles.icon} />Profile</div>
        <div className={styles.menu_item} onClick={logout}>Log out</div>
      </div>)}

    </div>

  );
}

export default Navbar;
