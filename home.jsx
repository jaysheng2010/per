import { useDb } from './DbContext';
import "./home.css";
import LoginScreen from './login_form.jsx';
import SignUpScreen from './sign_up.jsx';
import Product from "./product.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const db = useDb();
    const [show_menu, isShow] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {isShow(show_menu => !show_menu);};
    const [add_screen, setAddScreen] = useState(null);
    const [show_login_menu, setLoginMenu] = useState(true);
    const [home_opacity, setHomeOpacity] = useState(true);


   function close_screen() {
      setAddScreen(null);
   }

   function success() {
     setLoginMenu(false);
     close_screen();
   }

   useEffect(() => {
      if (add_screen == null) {
        setHomeOpacity(true);
      } else {
        setHomeOpacity(false);
      }
   }, [add_screen])

   useEffect(() => {
     if (sessionStorage.getItem("mode") == "registered") {
        setLoginMenu(false);
     }
   },[])


    return (
      <>
        <div id="homepage" style={{opacity: home_opacity ? 1 : 0.1}}>
         <nav className="navbar">
    <div className="logo">RNA</div>

    {/* Hamburger Icon */}
    <div className="hamburger" onClick={toggleMenu} style={{display: show_menu ? 'flex':'none'}}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    
  </nav>
  
  <img src="https://img.freepik.com/free-photo/front-view-expensive-perfume-light-table-scent_140725-148388.jpg?semt=ais_hybrid&w=740&q=80" id="mobile_homepage_img" />

        <div id="navigation_bar">
            <div id="company_name">RNA</div>
            <div id="space"></div>
            <div className="btn_home">Home</div>
            <div className="btn_home" onClick={() => setAddScreen("login")} style={{display: show_login_menu ?  "block":"none"}}>Login</div>
            <div id="order_btn" onClick={() => navigate("/mainpage")}>Order</div>
        </div>

        <div id="menu" style={{display: show_menu ?  "block":"none"}}>
            <div className="menu_list close" onClick={() => isShow(false)}>✕</div>
            <div className="menu_list" onClick={() => setAddScreen("login")} style={{display: show_login_menu ?  "block":"none"}}>Login</div>
            <div className="menu_list">Home</div>
            <div className="menu_list" onClick={() => navigate("/mainpage")}>Order</div>
        </div>

        <div id="second">
            <div id="details">
                <h1 className="homepage_words">The Best Perfume</h1>
                <h2 className="homepage_words">Rewrite Your Aura</h2>
                <br/>
                <br/>
                <p className="homepage_words">ReDNA is a fragrance brand built on rewriting identity, celebrating self-expression, individuality, and confidence through scent.</p>
                <br/>
                <p className="homepage_words">We only support Malaysia's orders.</p>
                <br/>
                <br/>
                <button onClick={() => navigate("/mainpage")}>Shop now</button>
            </div>
            <div id="image_container_home">
                <img id="image_perfume" src="https://img.freepik.com/premium-vector/perfume-bottle-round-shape-different-color-smoke-like-fragrance-is-coming-out_1310466-873.jpg" />
            </div>
        </div>

        <div id="featured_header"><h1>Featured products</h1></div>       
        <br/>
        <Product />
    </div>
    {add_screen === "login" && <LoginScreen onClose={() => close_screen()} onSuccess={() => success()} />}
    {add_screen === "sign_up" && <SignUpScreen onClose={() => close_screen()} onSuccess={() => success()} />}
  </>
    );
}

export default Home;
