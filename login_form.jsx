import SignUpScreen from './sign_up.jsx';
import LoadingScreen from './loading.jsx';
import ErrorScreen from './error.jsx';
import Success from './success.jsx';
import Reset from './reset_password.jsx';
import { useDb } from './database.jsx';
import "./login_form.css";
import {useState, useEffect} from "react";

function LoginScreen({ onClose, onSuccess }) {
    const [login, setLoginScreen] = useState("form")
    const [email_login, setEmail_login] = useState("");
    const [password_login, setPassword_login] = useState("");
    const [error_message, setErrorMessage] = useState("");
    const db = useDb();

    function handleLogin() {
      let cart_data;
      let image;
      setLoginScreen("loading");
      fetch("http://192.168.0.224:5002/login", {
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
               image = db.exec("SELECT img_link FROM products WHERE name = ? ", [name])[0].values[0][0];
               db.run("INSERT INTO cart VALUES (?,?,?)", [name, qty, image]);
            });

            const account_list = data.account;
            console.log("Account List:", account_list);
            db.run("INSERT INTO account VALUES (?,?,?,?)", [account_list[0], account_list[1], account_list[2], account_list[3]]);

            sessionStorage.setItem("mode", "registered");

            const order_list = data.orderdata;
            if (order_list == null || order_list.length === 0) {
               setLoginScreen("success");
               return;
            }
            order_list.forEach((order_id, order_items) => {
              db.run("INSERT INTO orders VALUES (?,?,?)", [order_id, order_items, new Date().toISOString()]);
            });
            setLoginScreen("success");
         } else {
           setLoginScreen("failure");
           setErrorMessage(data.message);
         }
      })
      .catch((error) => {
         console.error("Error:", error);
         setLoginScreen("failure");
      })
    }

    return (
      <>
      {login === "sign-up" && (<SignUpScreen onClose={onClose} onSuccess={onSuccess} />)}
      {login === "loading" && (<LoadingScreen />)}
      {login === "failure" && (<ErrorScreen onErrorClose={() => setLoginScreen("form")} ErrorMessage={error_message}/>)}
      {login === "success" && (<Success onSuccessClose={onSuccess}/>)}
      {login === "reset" && (<Reset onClose={onClose}/>)}
      {login === "form" && (
        <div id="login_form_container">
  <div id="login_form">
        <h1>Login</h1>
        <p>Please fill in this form to log in.</p>
        <hr/>
            
        <label htmlFor="" className="label_login">Email</label>
        <br />
        <input type="text" className="login_input" placeholder="email_login" onChange={(e) => setEmail_login(e.target.value)} />
        <br />
        <label htmlFor="" className="label_login">Password</label>
        <br />
        <input type="password" name="" className="login_input" placeholder="password" onChange={(e) => setPassword_login(e.target.value)} />
        <br />

        <p>If you have not created an account please sign up <a href="#" onClick={() => setLoginScreen("sign-up")}>here</a>.</p>
        
        <p onClick={() => setLoginScreen("reset")}><a href="#">Forgot password?</a></p>
        
        <div id="button_group_login">
            <button className="btn_login" id="cancel_login_btn" onClick={onClose}>Cancel</button>
            <button className="btn_login" id="login_submit_btn" onClick={() => handleLogin()}>Login</button>
        </div>
   </div>
  </div>
      )}
    </>
    )
}

export default LoginScreen;