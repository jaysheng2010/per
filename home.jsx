import { useDb } from './DbContext';
import "./home.css";
import Product from "./product.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const db = useDb();
    const [show_menu, isShow] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {isShow(show_menu => !show_menu);};
    const [show_login, setLogin] = useState(true);
    const [show_signup, setSignUp] = useState(true);
    const [mode, setMode] = useState(true);

    const [show_loading, setLoading] = useState(false);
    const [show_failed, setFailed] = useState(false);
    const [show_success, setSuccess] = useState(false);

    const [email_signup, setEmail_signup] = useState("");
    const [password_signup, setPassword_signup] = useState("");
    const [password_repeated_signup, setPassword_repeated_signup] = useState("");
    const [phone_no, setPhone_No] = useState("");

    const [home_opacity, setHomeOpacity] = useState(true);

    useEffect(() => {
      setMode(localStorage.getItem("mode"));
    }, []);

    useEffect(() => {
      setLogin(mode === "login");
    }, [mode]);

    function login(email, password) {
      setLoading(true);
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
         if (data.message == "success") {
            setSuccess(true);
            cart_data = JSON.parse(data.cartdata);

            const itemsArray = Object.entries(data.catdata);
            itemsArray.forEach(([name, qty]) => {
               image = db.exec("SELECT img_link FROM products WHERE name = ? ", [name]).values[0];
               db.run("INSERT INTO cart VALUES (?,?,?)", [name, qty, image]);
            });

            const account_list = Object.entries(JSON.parse(data.account));
            db.run("INSERT INTO account VALUES (?,?,?)", [account_list[0], account_list[1], account_list[2]]);

            const order_list = Object.entries(JSON.parse(data.order));
            order_list.forEach((order_id, order_items) => {
              db.run("INSERT INTO order VALUES (?,?)", [order_id, order_items]);
            });
         } else {
           setFailed(true);
         }
      })
    }

    function sign_up(email, password, repeated_password) {
      if (password != repeated_password) {
        alert("Passwords must be the same.");
        return;
      }
      setLoading(true);
      fetch("", {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        credentials: true,
        body: JSON.stringify({
          "email": email_signup,
          "password": password_signup,
          "repeated_password": password_repeated_signup,
          "phone_no": phone_no
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message == "success") {
            setSuccess(true);
            let date_joined = JSON.parse(data.date_joined)
            db.run("INSERT INTO account VALUES (?,?,?)", [email_signup, phone_no, date_joined]);
         } else {
           setFailed(true);
         }
      })
      setLoading(false);
    }


    useEffect(() => {
      if (show_login == true) {
        setHomeOpacity(false);
        setLogin(true);
        setSignUp(false);
      } else {
        setHomeOpacity(true);
        setLogin(false);
        setSignUp(false);
      }
    }, [show_login])

    useEffect(() => {
      if (show_login == true) {
        setHomeOpacity(false);
        setLogin(false);
        setSignUp(true);
      } else {
        setHomeOpacity(true);
        setLogin(false);
        setSignUp(false);
      }
    }, [show_signup])


    useEffect(() => {
      if (show_failed == true) {
        setHomeOpacity(false);
        setLogin(false);
        setSignUp(false);
      } else {
        setHomeOpacity(true);
      }
    }, [show_failed])

    useEffect(() => {
      if (show_success == true) {
        setHomeOpacity(false);
        setLogin(false);
        setSignUp(false);
      } else {
        setHomeOpacity(true);
      }
    }, [show_success])

    useEffect(() => {
      if (show_loading == true) {
        setHomeOpacity(false);
        setLogin(false);
        setSignUp(false);
      } else {
        setHomeOpacity(true);
      }
    }, [show_loading])


    return (
      <>
        <div id="homepage" style={{opacity: home_opacity ? 1 : 0.1}}>
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
            <div className="btn_home" onClick={() => setLogin(true)}>Login</div>
            <div id="order_btn" onClick={() => navigate("/mainpage")}>Order</div>
        </div>

        <div id="menu" style={{display: show_menu ?  "block":"none"}}>
            <div className="menu_list close" onClick={() => isShow(false)}>✕</div>
            <div className="menu_list" onClick={() => setLogin(true)}>Login</div>
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


<div id="login_htmlForm_container" style={{display: login_screen ? "flex":"none"}}>
  <div id="login_htmlForm">
        <h1>Login</h1>
        <p>Please fill in this htmlForm to log in.</p>
        <hr/>
            
        <label htmlFor="" className="label_login">Email</label>
        <br />
        <input type="text" className="login_input" placeholder="email_login" onChange={(e) => setEmail_login(e.target.value)} />
        <br />
        <label htmlFor="" className="label_login">Password</label>
        <br />
        <input type="password" name="" className="login_input" placeholder="password" onChange={(e) => setPassword_login(e.target.value)} />
        <br />

        <input type="checkbox" name="" id="" />
        <label htmlFor="">Remember me</label>
        <p>If you have not created an account please sign up <a href="#" onClick={() => setSignUp(true)}>here</a>.</p>
        
        <p><a href="#">Forgot password?</a></p>
        
        <div id="button_group_login">
            <button className="btn_login" id="cancel_login_btn" onClick={() => setLoginScreen(false)}>Cancel</button>
            <button className="btn_login" id="login_submit_btn" onClick={login()}>Login</button>
        </div>
   </div>
  </div>


  <div id="signup_form_container">
    <div id="sign_up_form">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label for="" class="label_sign_up">Email</label>
        <br />
        <input type="text" name="" class="sign_up_input" autocomplete="email" placeholder="user@example.com" onChange={(e) => setEmail_signup(e.target.value)}/>
        <br />

        <label for="" class="label_sign_up">Password</label>
        <br />
        <input type="password" name="" class="sign_up_input" placeholder="password" onChange={(e) => setPassword_signup(e.target.value)}/>
        <br />

        <label for="" class="label_sign_up">Repeat password</label>
        <br />
        <input type="password" name="" class="sign_up_input" placeholder="repeat password" onChange={(e) => setPassword_repeated_signup(e.target.value)}/>
        <br />

        <label for="" class="label_sign_up">Phone number</label>
        <br />
        <input type="tel"  name="phone"  pattern="^\+?[0-9]{7,15}$"  placeholder="+1234567890"  class="sign_up_input" onChange={(e) => setPhone_No(e.target.value)} required/>
        <br />

        <input type="checkbox" name="" id="" />
        <label for="">Remember me</label>

        <p>By creating an account you agree to our Terms & Privacy.</p>
       
        <p>If you already have an account please login <a href="#" onClick={() => setLogin(true)}>here</a>.</p>

        <div id="button_group_signup">
            <button class="btn_signup" id="cancel_signup_btn" onClick={() => setSignUp(false)}>Cancel</button>
            <button class="btn_signup" id="signup_submit_btn" onClick={sign_up()}>Sign Up</button>
        </div>
    </div>
  </div>


  <div id="login_signup_loading_container" class="login_container" style={{display: show_loading ? "flex":"none"}}>
    <div id="login_signup_loading">
         <img src="https://media1.tenor.com/m/Pq1cZiuhlEEAAAAC/rajinikanth.gif" alt="loading" style="width: 40px; height: 40px;"/>
         <p>Loading ...</p>
    </div>
  </div>

<div id="login_signup_failed_container" class="login_container" style={{display: show_failed ? "flex":"none"}}>
    <div id="login_signup_failed">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2pcBiB5mWS_hJxDZQEvBMNsakG3P4GygTQ&s" alt="loading" style="width: 90px; height: 90px;"/>
      <h2>Failed</h2>
      <p>Could not find email</p>
      <button onClick={() => setFailed(false)}>close</button>
    </div>
</div>

<div id="login_signup_success_container" class="login_container" style={{display: show_success ? "flex":"none"}}>
    <div id="login_signup_success">
         <img src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif" alt="loading" style="width: 80px; height: 80px;"/>
      <h2>Success!</h2>
      <button onClick={() => setSuccess(false)}>close</button>
    </div>
</div>
  </>
    );
}

export default Home
