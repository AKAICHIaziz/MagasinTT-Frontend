import React, { useEffect, useState } from 'react';
import styles from './requests.module.css';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Requests() {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/requests/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedRequests = response.data.requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setRequests(sortedRequests);
      } catch (err) {
        console.log('Error fetching requests:', err);
      }
    };
    fetchRequests();
  }, []);

  const handleClick = (id) => {
    navigate(`/requests/${id}`);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.requests_page}>
        <div className={styles.page_title}>
          Product requests
        </div>

        <div className={styles.bons_container}>

          <div className={styles.bon_container_title}>
            <div className={styles.elem}>
              <p className={styles.bon_title}>Request ID</p>
            </div>
            <div className={styles.elem}>
              <p className={styles.bon_title}>Products</p>
            </div>
            <div className={styles.elem}>
              <p className={styles.bon_title}>Employee name</p>
            </div>
            <div className={styles.elem}>
              <p className={styles.bon_title}>Request date</p>
            </div>
            <div className={styles.elem}>
              <p className={styles.bon_title}>Status</p>
            </div>
          </div>

          {
            requests.map((request) => (
              <div className={styles.bon_container} key={request._id} onClick={() => handleClick(request._id)}>
                <div className={styles.elem}>
                  <p className={styles.content}>{request._id}</p>
                </div>
                <div className={styles.elem}>
                  <p className={styles.content}>{request.ProdNum}</p>
                </div>
                <div className={styles.elem}>
                  <p className={styles.content}>{request.employeeName}</p>
                </div>
                <div className={styles.elem}>
                  <p className={styles.content}>{request.createdAt ? format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</p>
                </div>
                <div className={styles.elem}>
                  <p className={`${styles.content} ${styles[request.status.toLowerCase()]}`}>{request.status}</p>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default Requests;
