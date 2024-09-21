import React from 'react'
import styles from './home.module.css'
import tt from '../../assets/tt3.png'

function Home() {
  return (
    <div className={styles.home_page}>

      <div className={styles.text}>
        <div className={styles.title}>
          Welcome to TT-Inventory.
        </div>
        <div className={styles.desc}>
          Welcome to the internal inventory system of Tunisie Telecom. Our platform simplifies the management of equipment and resources for all our employees. Whether you need to track device usage, check resource availability, or request new equipment, our system is designed to meet your needs quickly and efficiently. With this intuitive solution, we aim to enhance transparency, accountability, and efficiency within our organization. Explore the features and discover how we make your daily tasks easier at Tunisie Telecom.        </div>
        <div className={styles.buttons}>
          <a href='/login' className={styles.login}>Login</a >
          <a href='/signup' className={styles.signup}>Register</a >
        </div>
      </div>

      <div className={styles.image}>
        <img src={tt} alt="" className={styles.img} />
      </div>


    </div>
  )
}

export default Home