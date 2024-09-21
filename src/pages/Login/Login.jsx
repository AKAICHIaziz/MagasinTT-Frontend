import React, { useState } from 'react'
import styles from './login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [cin, setCin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/api/login', { cin, password })
      const token = response.data.token
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 4000,
      });
      setCin('')
      setPassword('')

      const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('tokenExpiration', expirationTime);
      
      navigate('/profile')
      window.location.reload()
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <form onSubmit={handleLogin} className={styles.form}>

            <div className={styles.text_form}>
              <h1 className={styles.h1}>Log in to your account</h1>
              <p className={styles.p}>Log in to your account and </p>
            </div>

            <input className={styles.input} type="text" value={cin} onChange={(e) => setCin(e.target.value)} placeholder='CIN' />

            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

            <button className={styles.button} type='submit'>Log in</button>

            <Link to={'/signup'} className={styles.button2} type='submit'>Register</Link>

          </form>
        </div>
        <div className={styles.login_image}>
          <div className={styles.text}>Login</div>
        </div>
      </div>

      <ToastContainer style={{ width: 'auto', minWidth: '400px' }} />

    </div>
  )
}

export default Login