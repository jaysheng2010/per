import "./home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";
import Product from "./product.jsx";
import LoginScreen from "./login_form.jsx";
import Contact from "./contact.jsx";
import Reset from "./reset_password.jsx";
import Delete from "./delete.jsx";

function Home() {
  const db = useDb();
  const [show_menu, isShow] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    isShow(show_menu => !show_menu);
  };

  const [add_screen, setAddScreen] = useState(null);
  const [show_login_menu, setLoginMenu] = useState(true);

  // ✅ derived state (no useEffect needed)
  const home_opacity = add_screen === null;

  function close_screen() {
    setAddScreen(null);
  }

  function success() {
    setLoginMenu(false);
    close_screen();
  }

  useEffect(() => {
    if (sessionStorage.getItem("mode") == "registered") {
      setLoginMenu(false);
      console.log("Logged in");
    }
  }, []);


if (!db) {
  return <h1>Waiting for DB...</h1>;
}

  return (
    <>
    
      <div id="homepage" style={{ opacity: home_opacity ? 1 : 0.1 }}>
        <nav className="navbar">
          <div className="logo">RNA</div>

          <div
            className="hamburger"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        <img
          src="https://img.freepik.com/free-photo/front-view-expensive-perfume-light-table-scent_140725-148388.jpg?semt=ais_hybrid&w=740&q=80"
          id="mobile_homepage_img"
        />

        <div id="navigation_bar">
          <img id="company_name" src="https://i.ibb.co/PvxwZS3f/Re-DNA-Logo-Confirmed-removebg-preview.png" />
          
          <div id="nav_center_buttons">
            <div className="btn_home">Home</div>
            <div
            className="btn_home"
            onClick={() => setAddScreen("login")}
            style={{ display: show_login_menu ? "block" : "none" }}
            >
             Login
            </div>

            <div id="contatc_us_btn" className="btn_home" onClick={() => setAddScreen("contact")}>Contact</div>

            {!show_login_menu && ( <div id="dropdown"> <div className="dropdown-toggle">Account ▾</div> <div className="dropdown-menu"> <div className="dropdown-item" onClick={() => setAddScreen("reset")}> Reset </div> <div className="dropdown-item" onClick={() => setAddScreen("delete")}> Delete </div> </div> </div> )}
          </div>

          <div id="order_btn" onClick={() => navigate("/all")}>
            Order
          </div>
        </div>

        <div
          id="menu"
          style={{ display: show_menu ? "block" : "none" }}
        >
          <div className="menu_list close" onClick={() => isShow(false)}>
            ✕
          </div>
          <div
            className="menu_list"
            onClick={() => setAddScreen("login")}
            style={{ display: show_login_menu ? "block" : "none" }}
          >
            Login
          </div>
          <div className="menu_list">Home</div>
          <div
            className="menu_list"
            onClick={() => navigate("/all")}
          >
            Menu
          </div>
          <div
            className="menu_list"
            onClick={() => navigate("/cart")}
          >
            Cart
          </div>
          <div
            className="menu_list"
            onClick={() => setAddScreen("contact")}
          >
            Contact
          </div>
          <div
            className="menu_list"
            onClick={() => navigate("/order")}
          >
            Your order
          </div>
          <div
            className="menu_list"
            onClick={() => setAddScreen("reset")}
            style={{ display: show_login_menu ? "none" : "block" }}
          >
            Reset
          </div>
          <div
            className="menu_list"
            onClick={() => setAddScreen("delete")}
            style={{ display: show_login_menu ? "none" : "block" }}
          >
            Delete
          </div>
        </div>

        <div id="second">
          <div id="details">
            <h1 className="homepage_words">The Best Perfume</h1>
            <h2 className="homepage_words">Rewrite Your Aura</h2>
            <br />
            <br />
            <p className="homepage_words">
              ReDNA is a fragrance brand built on rewriting identity,
              celebrating self-expression, individuality, and confidence
              through scent.
            </p>
            <br />
            <p className="homepage_words">
              We only support Malaysia's orders.
            </p>
            <br />
            <br />
            <button onClick={() => navigate("/all")}>
              Purchase
            </button>
          </div>

          <div id="image_container_home">
            <img
              id="image_perfume"
              src="https://img.freepik.com/premium-vector/perfume-bottle-round-shape-different-color-smoke-like-fragrance-is-coming-out_1310466-873.jpg"
            />
          </div>
        </div>

        <div id="featured_header">
          <h1>Featured products</h1>
        </div>
        <Product />
      </div>
      {add_screen === "login" && <LoginScreen onClose={() => close_screen()} onSuccess={() => success()} />}
      {add_screen === "contact" && <Contact onClose={() => close_screen()} />}
      {add_screen === "reset" && <Reset onClose={() => close_screen()} onSuccess={() => success()} />}
      {add_screen === "delete" && <Delete onClose={() => close_screen()} onSuccess={() => success()} />}
    </>
  );
}

export default Home;
