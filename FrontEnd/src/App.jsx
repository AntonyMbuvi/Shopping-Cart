import './static/App.css'
import AddClothes from './addclothes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './Shop';
import Cloth from './cloth';
import { useState } from 'react';
import Cart from './cart';
import Home from './home';

function App() {
  const [cart, addCart] = useState([])
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home  />} />
          <Route path="/" element={<Shop  />} />
          <Route path="/addClothes" element={<AddClothes  />} />
          <Route path="/addCart/:id" element={<Cloth cart={cart} addCart={addCart}/>} />
          <Route path="/cart" element={<Cart cart={cart} addCart={addCart} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
