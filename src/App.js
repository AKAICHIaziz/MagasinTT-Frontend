import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'

import Header from './components/Header/Header'
import Navbar from './components/NavBar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

import Magasin from './pages/Magasin/Magasin';
import MyRequests from './pages/employee/my-requests/MyRequests';
import MyRequest from './pages/employee/my-requests/my-request/MyRequest';

import ErrorPage from './pages/Error-page/ErrorPage'

import ProtectedRoute from './components/ProtectedRoute'
import Account from './pages/Account/Account';
import Products from './pages/admin/Products/Products';
import ProductDetails from './pages/admin/Products/ProductDetails/ProductDetails';
import AccountManagement from './pages/admin/Accounts-management/AccountManagement';
import AjouterBon from './pages/admin/GestionDesBon/AjouterBon/AjouterBon';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import BonEntrer from './pages/admin/GestionDesBon/BonEntrer'
import Requests from './pages/admin/GestionDesBon/Requests/Requests'
import Request from './pages/admin/GestionDesBon/Requests/Request/Request'
import OrderDetails from './pages/Magasin/Order_details/OrderDetails';
import SignupRequests from './pages/admin/Accounts-management/Signup-Requests/SignupRequests';
import AccountDetails from './pages/admin/Accounts-management/Account-details/AccountDetails';
import ReqAccountDetails from './pages/admin/Accounts-management/Signup-Requests/Account-details/AccountDetails';
import Bon from './pages/admin/GestionDesBon/Bon/Bon';

import Chat from './pages/Chat/Chat';
import OutBon from './pages/admin/GestionDesBon/OutBon/OutBon';
import OutBon2 from './pages/admin/GestionDesBon/OutBon/OutBon/OutBon';


function App() {

  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const location = useLocation()

  const setTokenExpirationTimeout = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeUntilExpiration = decodedToken.exp - currentTime;

      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          setIsTokenExpired(true);
          alert("Your session has expired. You will be logged out.");
          sessionStorage.removeItem('token');
          navigate('/login');
        }, timeUntilExpiration * 1000);
      } else {
        alert("Your session has expired. You will be logged out.");
        sessionStorage.removeItem('token');
        navigate('/login')
        location.reload();
      }
    }
  };

  useEffect(() => {
    setTokenExpirationTimeout();
  }, []);


  return (
    <div className='App'>
      {/* <Header /> */}
      <Navbar />
      <div className='layout'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/magasin' element={<ProtectedRoute element={Magasin} allowedRoles={['employee']} />} />
          <Route path='/my-requests' element={<ProtectedRoute element={MyRequests} allowedRoles={['employee']} />} />
          <Route path='/my-requests/:id' element={<ProtectedRoute element={MyRequest} allowedRoles={['employee']} />} />
          <Route path='/order-details' element={<ProtectedRoute element={OrderDetails} allowedRoles={['employee']} />} />
          <Route path='/profile' element={<ProtectedRoute element={Account} allowedRoles={['employee', 'admin', 'storeAdmin']} />} />
          <Route path='/products' element={<ProtectedRoute element={Products} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/products/:id' element={<ProtectedRoute element={ProductDetails} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/add' element={<ProtectedRoute element={AjouterBon} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/in' element={<ProtectedRoute element={BonEntrer} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/in/:NumBon' element={<ProtectedRoute element={Bon} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/out' element={<ProtectedRoute element={OutBon} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/out/:NumBon' element={<ProtectedRoute element={OutBon2} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/requests' element={<ProtectedRoute element={Requests} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/bon-management/requests/:id' element={<ProtectedRoute element={Request} allowedRoles={['storeAdmin', 'admin']} />} />
          <Route path='/accounts-management/users' element={<ProtectedRoute element={AccountManagement} allowedRoles={['admin']} />} />
          <Route path='/accounts-management/:id' element={<ProtectedRoute element={AccountDetails} allowedRoles={['admin']} />} />
          <Route path='/accounts-management/signup-requests' element={<ProtectedRoute element={SignupRequests} allowedRoles={['admin']} />} />
          <Route path='/accounts-management/signup-requests/:id' element={<ProtectedRoute element={ReqAccountDetails} allowedRoles={['admin']} />} />
          <Route path='/accounts-management/signup-requests/:id' element={<ProtectedRoute element={ReqAccountDetails} allowedRoles={['admin']} />} />
          <Route path='/chat' element={<ProtectedRoute element={Chat} allowedRoles={['admin', 'storeAdmin', 'employee']} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
