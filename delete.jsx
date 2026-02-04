import { useDb } from './DbContext';
import "./login_form.css";
import {useState, useEffect} from "react";

function LoginScreen({ onClose, onSuccess }) {
    const [delete_screen, SetDeleteScreen] = useState("form")
    const [email_login, setEmail_login] = useState("");
    const [password_login, setPassword_delete] = useState("");
    const db = useDb();

    function delete() {
        fetch("", {
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({}),
            "method": "POST"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message == "success") {
                db.run("DELETE FROM cart_tbl");
                db.run("DELETE FROM account_tbl");
                db.run("DELETE FROM order_tbl");
                sessionStorage.setItem("mode", null);
                setDeletedScreen("success");
            } else {
                setDeletedScreen("failed");
            }
    }

    return (
      <>
      {login === "loading" && (<LoadingScreen />)}
      {login === "failure" && (<Error onErrorClose={() => SetDeleteScreen("form")}/>)}
      {login === "success" && (<Success onSuccessClose={() => onSuccess}/>)}
      {login === "form" && (
        <div id="delete_form_container">
  <div id="delete_form">
        <h1>Delete account</h1>
        <p>Please fill in your password to delete your account.</p>
        <hr/>
            
        <label htmlFor="" className="label_login">Password</label>
        <br />
        <input type="password" name="" className="delete_input" placeholder="password" onChange={(e) => setPassword_delete(e.target.value)} />
        <br />
        
        <div id="button_group_login">
            <button className="btn_login" id="cancel_login_btn" onClick={() => onClose}>Cancel</button>
            <button className="btn_login" id="login_submit_btn" onClick={() => delete()}>Delete</button>
        </div>
   </div>
  </div>
      )};
    </>
    );
}

export default LoginScreen;
