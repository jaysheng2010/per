import React from "react";
import CartScreen from "./cart_screen.jsx";
import Details from "./item_detail.jsx";
import Home from "./home.jsx";
import Product_all from "./all_products.jsx";
import OrderSummary from "./order_summary.jsx";
import Cart_sample from "./cart_sample.jsx";  
import './App.css';

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/item" element={<Details />} />
      <Route path="/all" element={<Product_all />} />
      <Route path="/summary" element={<Cart_sample />} />
    </Routes>
  );
}

export default App;