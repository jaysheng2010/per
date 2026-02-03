import { useDb } from './DbContext';
import "./signup.css";
import {useState, useEffect} from "react";
import Success from "./success.jsx";
import Error from "./error.jsx";
import Loading from "./loading.jsx";
import LoginScreen from './login_form.jsx';

function SignUp({ onClose, onSuccess }) {
    const [sign_up, setSignUp] = useState("sign-up");
    const [email_signup, setEmail_signup] = useState("");
    const [password_signup, setPassword_signup] = useState("");
    const [password_repeated_signup, setPassword_repeated_signup] = useState("");
    const [phone_no, setPhone_No] = useState("");
    const db = useDb();

    function sign_up() {
      if (password_signup != password_repeated_signup) {
        alert("Passwords must be the same.");
        return;
      }
      setSignUp("loading");
      fetch("", {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        credentials: "include",
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
            let date_joined = JSON.parse(data.date_joined);
            db.run("INSERT INTO account VALUES (?,?,?)", [email_signup, phone_no, date_joined]);
            sessionStorage.setItem("mode", "registered");
            setSignUp("success");
         } else {
           setSignUp("failed");
         }
      })
      .catch(err => {
         setSignUp("failed"); 
      })
    }

    return (
      <>
       {sign_up === "login" && <LoginScreen />}
       {sign_up === "loading" && <Loading />}
       {sign_up === "success" && <Success onSuccessClose={() => onSuccess()} />}
       {sign_up === "failed" && <Error onErrorClose={() => setSignUp("sign-up")} />}
       {sign_up === "sign-up" && (<div id="signup_form_container">
    <div id="sign_up_form">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label for="" className="label_sign_up">Email</label>
        <br />
        <input type="text" name="" className="sign_up_input" autoComplete="email" placeholder="user@example.com" onChange={(e) => setEmail_signup(e.target.value)}/>
        <br />

        <label for="" className="label_sign_up">Password</label>
        <br />
        <input type="password" name="" className="sign_up_input" placeholder="password" onChange={(e) => setPassword_signup(e.target.value)}/>
        <br />

        <label for="" className="label_sign_up">Repeat password</label>
        <br />
        <input type="password" name="" className="sign_up_input" placeholder="repeat password" onChange={(e) => setPassword_repeated_signup(e.target.value)}/>
        <br />

        <label for="" className="label_sign_up">Phone number</label>
        <br />
        <input type="tel"  name="phone"  pattern="^\+?[0-9]{7,15}$"  placeholder="+1234567890"  className="sign_up_input" onChange={(e) => setPhone_No(e.target.value)} required/>
        <br />

        <input type="checkbox" name="" id="" />
        <label for="">Remember me</label>

        <p>By creating an account you agree to our Terms & Privacy.</p>
       
        <p>If you already have an account please login <a href="#" onClick={() => setSignUp("login")}>here</a>.</p>

        <div id="button_group_signup">
            <button className="btn_signup" id="cancel_signup_btn" onClick={() => onClose}>Cancel</button>
            <button className="btn_signup" id="signup_submit_btn" onClick={() => sign_up(email_signup, password_signup, password_repeated_signup)}>Sign Up</button>
        </div>
    </div>
  </div>)}
 </>
    );
}

export default SignUp();
