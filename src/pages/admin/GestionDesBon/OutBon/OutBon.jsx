
import styles from './outBon.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function OutBon() {
    const [bons, setBons] = useState([]);
    const navigate = useNavigate()

    // useEffect(() => {
    //     const fetchBons = async () => {
    //         const token = sessionStorage.getItem('token');
    //         if (!token) {
    //             console.log('No token found');
    //             return;
    //         }
    //         try {
    //             const response = await axios.get('http://localhost:3001/api/bons/all', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setBons(response.data.bons);
    //         } catch (err) {
    //             console.log('Error fetching bons:', err);
    //         }
    //     };

    //     fetchBons();
    // }, []);

    const handleClick = (NumBon) => {
        navigate(`/bon-management/out/${NumBon}`);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.page_title}>
                    BON management/ BON de sorties
                </div>

                <div className={styles.bons_container}>

                    <div className={styles.bon_container_title}>
                        <div className={styles.elem}>
                            <p className={styles.bon_title}>Réference du bon</p>
                        </div>
                        <div className={styles.elem}>
                            <p className={styles.bon_title}>Employee ID</p>
                        </div>
                        <div className={styles.elem}>
                            <p className={styles.bon_title}>Employee username</p>
                        </div>
                        <div className={styles.elem}>
                            <p className={styles.bon_title}>Nombre de produits</p>
                        </div>
                        <div className={styles.elem}>
                            <p className={styles.bon_title}>Date</p>
                        </div>
                    </div>

                    {/* {bons.map((bon) => (
                        <div className={styles.bon_container} key={bon._id} onClick={() => handleClick(bon.NumBon)}>
                            <div className={styles.elem}>
                                <p className={styles.content}>{bon.NumBon}</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.content}>id</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.content}>username</p>
                            </div>
                            <div className={styles.elem}>
                                <p className={styles.content}>{bon.NumProd}</p>
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

export default OutBon