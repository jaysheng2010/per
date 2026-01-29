import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home.jsx"
//import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/personal" element={<Account />} />
        {/*
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App
