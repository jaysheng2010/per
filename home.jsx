import { useDb } from './DbContext';
import "./home.css";
import Product from "./product.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const [show_menu, isShow] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {isShow(show_menu => !show_menu);};
    const [show_login, setLogin] = useState(true);
    const [mode, setMode] = useState(true);

    useEffect(() => {
      setMode(localStorage.getItem("mode"));
    }, []);

    useEffect(() => {
      setLogin(mode === "login");
    }, [mode]);

    function login(email, password) {
      fetch("", {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        credentials: true,
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      })
      .then(response => response.json())
      .then(data => {
         
      })
    }

    function sign_up(email, password, repeated_password) {
      if (password != repeated_password) {
        alert("Passwords must be the same.");
        return;
      }
      fetch("", {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        credentials: true,
        body: JSON.stringify({
          "email": email,
          "password": password,
          "repeated_password": repeated_password
        })
      })
      .then(response => response.json())
      .then(data => {
        
      })
    }

    return (
        <div id="homepage">
         <nav className="navbar">
    <div className="logo">Company name</div>

    {/* Hamburger Icon */}
    <div className="hamburger" onClick={toggleMenu} style={{display: show_menu ? 'flex':'none'}}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    
  </nav>
  
  <img src="https://img.freepik.com/free-photo/front-view-expensive-perfume-light-table-scent_140725-148388.jpg?semt=ais_hybrid&w=740&q=80" id="mobile_homepage_img" />

        <div id="navigation_bar">
            <div id="company_name">Company name</div>
            <div id="space"></div>
            <div className="btn_home">Home</div>
            <div className="btn_home" onClick={() => navigate(show_login ? "/login" : "/signup")}>{show_login ? "Login":"Sign up"}</div>
            <div id="order_btn" onClick={() => navigate("/mainpage")}>Order</div>
        </div>

        <div id="menu" style={{display: show_menu ?  "block":"none"}}>
            <div className="menu_list close" onClick={() => isShow(false)}>✕</div>
            <div className="menu_list" onClick={() => navigate(show_login ? "/login" : "/signup")}>{show_login ? "Login":"Sign up"}</div>
            <div className="menu_list">Home</div>
            <div className="menu_list">Order</div>
        </div>

        <div id="second">
            <div id="details">
                <h1 className="homepage_words">The Best Perfume</h1>
                <h2 className="homepage_words">Ever Lasting</h2>
                <br/>
                <br/>
                <p className="homepage_words">Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </p>
                <br/>
                <br/>
                <br/>
                <button onClick="cart()">Shop now</button>
            </div>
            <div id="image_container_home">
                <img id="image_perfume" src="https://img.freepik.com/premium-vector/perfume-bottle-round-shape-different-color-smoke-like-fragrance-is-coming-out_1310466-873.jpg" />
            </div>
        </div>

        <div id="featured_header"><h1>Featured products</h1></div>       
        <br/>
        <Product />
    </div>
    );
}

export default Home

{/*async function fetch_data() {
  fetch("")
  .then(response => response.json)
  .then(data => {
    return data
  })
}

function 

function render_products(name, price, img_link) {
  return 
}

function password(e) {

}
function fetch_personal() {
    fetch("", {
    method: "POST",
    body: {"email": email, "password": password_login},
    headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json)
    .then(data => {
       return data["email"], data["phone_no"], data["date_joined"], data["cart_token"]
     })
}

function personal() {
  email, phone_number, date_joined, cart_token = fetch_personal();
  sessionStorage.setItem("cart_token", cart_token);
  sessionStorage.setItem("email", email);
  navigate("/personal", {state: { email: {email}, phone_no: {phone_number}, date_joined={date_joined} } });
}

function personal_cart() {
  fetch("", {
    method: "POST",
    body: {"email": sessionStorage.getItem("email"), "cart_key": sessionStorage.getItem("cart_token")},
    headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
  .then(data => {
    var cartdata = data["cart"];
    navigate("/cart", {state: {cartdata: {cartdata}} });
  })
}
  */}

{/*
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/about")}>
      Go to About page
    </button>
  );
}

export default Home;

navigate("/about", { state: { name: "John" } });


import { useLocation } from "react-router-dom";

function About() {
  const { state } = useLocation();

  return <h1>Hello {state?.name}</h1>;
}
*/}