import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import Home from './pages/Home'
import OrderDetail from './pages/OrderDetail'
import AddOrder from './pages/AddOrder';
import EditOrder from './pages/EditOrder'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
     <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders/add" element={<AddOrder />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id/edit" element={<EditOrder />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
