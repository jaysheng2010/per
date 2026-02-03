import SignUpScreen from './sign_up.jsx';
import { useDb } from './DbContext';
import "./login_form.css";
import {useState, useEffect} from "react";

function LoginScreen({ onClose, onSuccess }) {
    const [login, SetLoginScreen] = useState("form")
    const [email_login, setEmail_login] = useState("");
    const [password_login, setPassword_login] = useState("");
    const db = useDb();

    function login() {
      let cart_data;
      let image;
      setLoginScreen("loading");
      fetch("", {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          "email": email_login,
          "password": password_login
        })
      })
      .then(response => response.json())
      .then(data => {
         if (data.message == "success") {
            const itemsArray = Object.entries(JSON.parse(data.cartdata));
            itemsArray.forEach(([name, qty]) => {
               image = db.exec("SELECT img_link FROM products WHERE name = ? ", [name]).values[0];
               db.run("INSERT INTO cart VALUES (?,?,?)", [name, qty, image]);
            });

            const account_list = Object.entries(JSON.parse(data.account));
            db.run("INSERT INTO account VALUES (?,?,?)", [account_list[0], account_list[1], account_list[2]]);

            const order_list = Object.entries(JSON.parse(data.orderdata));
            order_list.forEach((order_id, order_items) => {
              db.run("INSERT INTO order VALUES (?,?)", [order_id, order_items]);
            });
            sessionStorage.setItem("mode", "registered");
            setLoginScreen("success");
         } else {
           SetLoginScreen("error");
         }
      })
    }

    return (
      <>
      {login === "sign-up" && (<SignUpScreen onClose={onClose} onSuccess={onSuccess} />)}
      {login === "loading" && (<LoadingScreen />)}
      {login === "failure" && (<Error onErrorClose={() => SetLoginScreen("form")}/>)}
      {login === "success" && (<Success onSuccessClose={() => onSuccess}/>)}
        {login === "reset" && (<Reset onClose={() => onClose}/>)}
      {login === "form" && (
        <div id="login_form_container">
  <div id="login_form">
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
        <p>If you have not created an account please sign up <a href="#" onClick={() => setLoginScreen("sign-up")}>here</a>.</p>
        
        <p onClick={() => setLoginScreen("reset")}><a href="#">Forgot password?</a></p>
        
        <div id="button_group_login">
            <button className="btn_login" id="cancel_login_btn" onClick={() => onClose}>Cancel</button>
            <button className="btn_login" id="login_submit_btn" onClick={() => login()}>Login</button>
        </div>
   </div>
  </div>
      )};
    </>
    );
}

export default LoginScreen;