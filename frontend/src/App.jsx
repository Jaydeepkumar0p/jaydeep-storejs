import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import { useAuthStore } from './zustand/authStore'
import Profile from './pages/admin/Profile'
import UserList from './pages/admin/UserList'
import CategoryList from './pages/admin/CategoryList'
import Product from './pages/admin/Product'
import Allproduct from './pages/admin/Allproduct'
import EditProduct from './pages/admin/EditProduct'
import Shop from './component/Shop'
import Productdetails from './component/Productdetails'
import Cart from './component/Cart'
import Checkout from './component/Checkout'
import PaymentFailed from './component/PaymentFailed'
import PaymentSuccess from './component/PaymentSuccess'
import HomePage from './pages/HomePage'
import About from './pages/About'
import AdminOrderList from './pages/admin/AdminOrderList'
import MyOrdersPage from './pages/admin/MyOrdersPage'

const App = () => {
  const { user } = useAuthStore()
  return (
    <div className='text-3xl font-bold underline'>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path='/login' element={!user ? <Login/>:<Navigate to="/" replace/>} />
          <Route path='/register' element={!user ?<SignUp/>:<Navigate to="/" replace/>} />
          <Route path="/mineorders" element={<MyOrdersPage />} />
          {user && <Route path='/profile' element={<Profile/>} />}
        </Routes>
        <Routes>
          <Route path='/admin/userlist' element={<UserList/>} />
           <Route path='/admin/category' element={<CategoryList/>} />
           <Route path="/admin/productlist" element={<Product/>} />
           <Route path="/admin/allproductslist" element={<Allproduct/>} />
           <Route path="/admin/updateProduct" element={<EditProduct/>} />
           <Route path="/admin/orderlist"element={<AdminOrderList/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/checkout" element ={<Checkout/>}/>
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App
