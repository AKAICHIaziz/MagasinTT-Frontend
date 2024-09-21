import React from 'react'
import styles from './flyer.module.css'

import { BiSupport } from "react-icons/bi";
import { AiOutlineSafety } from "react-icons/ai";
import { IoFlashOutline } from "react-icons/io5";
import { PiHandshake } from "react-icons/pi";

function Flyer() {
    return (
        <div className={styles.flyer_component}>

            <div className={styles.flyer}>
            </div>

            <div className={styles.after_flyer}>
                <div className={styles.after}>
                    <BiSupport className={styles.after_icon} />
                    <div className={styles.after_text}>
                        <div className={styles.after_title}>Responsive</div>
                        <div className={styles.after_desc}>Customer service avaible 24/7</div>
                    </div>
                </div>
                <div className={styles.after}>
                    <AiOutlineSafety className={styles.after_icon} />
                    <div className={styles.after_text}>
                        <div className={styles.after_title}>Secure</div>
                        <div className={styles.after_desc}>Customer service avaible 24/7</div>
                    </div>
                </div>
                <div className={styles.after}>
                    <IoFlashOutline className={styles.after_icon} />
                    <div className={styles.after_text}>
                        <div className={styles.after_title}>Fast sevice</div>
                        <div className={styles.after_desc}>Customer service avaible 24/7</div>
                    </div>
                </div>
                <div className={styles.after}>
                    <PiHandshake className={styles.after_icon} />
                    <div className={styles.after_text}>
                        <div className={styles.after_title}>Transparent</div>
                        <div className={styles.after_desc}>Customer service avaible 24/7</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Flyer