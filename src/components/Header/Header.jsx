import React from 'react'
import styles from './header.module.css'

import { AiOutlineCopyright } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";

function Header() {
  return (
    <div className={styles.info}>

      <div className={styles.left_side}>
        <div className={styles.company}>
          <AiOutlineCopyright className={styles.icon} />
          <span>Tunisie Telecom</span>
        </div>

        <div className={styles.phone}>
          <AiOutlinePhone className={styles.icon} />
          <span>+216 00 000 000</span>
        </div>
      </div>

      <div className={styles.right_side}>
        <div className={styles.language}>
          <AiOutlineGlobal className={styles.icon} />
          <span>English</span>
        </div>
      </div>



    </div>
  )
}

export default Header