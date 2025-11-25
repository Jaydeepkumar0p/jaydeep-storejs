import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import { useAuthStore } from './zustand/authStore'
import Profile from './pages/admin/Profile'
import UserList from './pages/admin/UserList'
import Category from './pages/admin/CategoryList'
import Product from './pages/admin/Product'
import Allproduct from './pages/admin/Allproduct'
import EditProduct from './pages/admin/EditProduct'
import Shop from './component/Shop'
import Productdetails from './component/Productdetails'
import Cart from './component/Cart'
import Checkout from "./component/Checkout";
import PaymentFailed from './component/PaymentFailed'
import PaymentSuccess from './component/PaymentSuccess'
import HomePage from './pages/HomePage'
import About from './pages/About'
import AdminOrderList from './pages/admin/Adminorderlist'
import MyOrdersPage from './pages/admin/MyOrdersPage'

const App = () => {
  const { user } = useAuthStore()
  
  // Helper function to check auth and redirect
  const requireAuth = (element) => {
    return user ? element : <Navigate to="/login" replace />
  }

  // Helper function for admin routes only
  const requireAdmin = (element) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    if (user.role !== 'admin') {
      return <Navigate to="/" replace />
    }
    return element
  }

  return (
    <div className='text-3xl font-bold underline'>
      <Router>
        <Navigation/>
        <Routes>
          {/* Public routes - accessible to everyone */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path='/login' element={!user ? <Login/> : <Navigate to="/" replace />} />
          <Route path='/register' element={!user ? <SignUp/> : <Navigate to="/" replace />} />
          
          {/* Protected user routes - require login */}
          <Route path='/shop' element={requireAuth(<Shop/>)} /> {/* Now requires login */}
          <Route path="/mineorders" element={requireAuth(<MyOrdersPage />)} />
          <Route path='/profile' element={requireAuth(<Profile/>)} />
          <Route path="/cart" element={requireAuth(<Cart/>)} />
          <Route path="/checkout" element={requireAuth(<Checkout/>)} />
          <Route path="/payment-success" element={requireAuth(<PaymentSuccess />)} />
          <Route path="/payment-failed" element={requireAuth(<PaymentFailed />)} />
          
          {/* Admin only routes - require admin role */}
          <Route path='/admin/userlist' element={requireAdmin(<UserList/>)} />
          <Route path='/admin/category' element={requireAdmin(<Category/>)} />
          <Route path="/admin/productlist" element={requireAdmin(<Product/>)} />
          <Route path="/admin/allproductslist" element={requireAdmin(<Allproduct/>)} />
          <Route path="/admin/updateProduct" element={requireAdmin(<EditProduct/>)} />
          <Route path="/admin/orderlist" element={requireAdmin(<AdminOrderList/>)} />
        </Routes>
      </Router>
    </div>
  )
}

export default App