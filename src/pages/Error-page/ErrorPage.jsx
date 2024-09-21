import React, { useEffect } from 'react';
import styles from './errorPage.module.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/404');
  }, [navigate]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.error_page}>
      <h1 className={styles.four_zero_four}>404</h1>
      <div className={styles.background_img}></div>
      <div className={styles.text}>
        <h1>Look like you're lost</h1>
        <p>The page that you're looking for is not found!</p>
        <div className={styles.button} onClick={goBack}>Go Back</div>
      </div>
    </div>
  );
}

export default ErrorPage;
