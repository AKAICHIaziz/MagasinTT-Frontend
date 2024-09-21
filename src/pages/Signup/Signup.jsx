import styles from './signup.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [cin, setCin] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('')
  // const [image, setImage] = useState('')

  const navigate = useNavigate();


  const handleRegister = (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:3001/api/signup', { email, username, jobTitle, tel, cin, password })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
        });
        setEmail('')
        setUsername('')
        setJobTitle('')
        setCin('')
        setPassword('')
        setTel('')
        setTimeout(() => navigate('/login'), 4000);
      })
      .catch((error) => {
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  }


  return (
    <div className={styles.signup_page}>
      <div className={styles.signup_container}>
        <div className={styles.signup_image}>
          <div className={styles.text}>Signup</div>
        </div>
        <div className={styles.signup_form}>
          <form onSubmit={handleRegister} className={styles.form}>

            <div className={styles.text_form}>
              <h1 className={styles.h1}>Create an account</h1>
              <p className={styles.p}>And wait for the admin to approve your account</p>
            </div>

            <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

            <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            
            <input className={styles.input} type="text" value={tel} onChange={(e) => setTel(e.target.value)} placeholder='Phone number' />

            <input className={styles.input} type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder='Service or Job Title' />

            <input className={styles.input} type="text" value={cin} onChange={(e) => setCin(e.target.value)} placeholder='CIN' />

            <input className={styles.input} type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

            {/* <input type="file" value={image}/> */}

            <button className={styles.button} type='submit'>Register</button>

            <Link to={'/login'} className={styles.button2} type='submit'>Log in</Link>

          </form>
        </div>
      </div>

      <ToastContainer style={{ width: 'auto', minWidth: '400px' }} />

    </div>
  )
}

export default Signup