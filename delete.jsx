import { useDb } from './database.jsx';
import "./delete.css";
import {useState, useEffect} from "react";
import Success from "./success.jsx";
import Error from "./error.jsx";
import LoadingScreen from "./loading.jsx";

function DeleteScreen({ onClose, onSuccess }) {
    const [delete_screen, setDeletedScreen] = useState("form")
    const [password_login, setPassword_delete] = useState("");
    const [error_message, setErrorMessage] = useState("");
    const db = useDb();

    function handleDelete() {
        const result = db.exec("SELECT email FROM account");

        if (!result.length || !result[0].values.length) {
          setErrorMessage("No account found.");
          setDeletedScreen("failure");
          return;
        }

        if (password_login == "" || password_login == null) {
          setErrorMessage("Password cannot be empty.");
          setDeletedScreen("failure");
          return;
        }

        let delete_email = result[0].values[0][0];
        setDeletedScreen("loading");
        fetch("http://192.168.0.224:5002/delete_account", {
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({"password":password_login, "email":delete_email}),
            "method": "POST"
        })
        .then(response => {
            if (!response.ok) {
                setDeletedScreen("failure");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.message == "success") {
                db.run("DELETE FROM cart");
                db.run("DELETE FROM account");
                db.run("DELETE FROM orders");
                sessionStorage.setItem("mode", null);
                setDeletedScreen("success");
            } else {
                setErrorMessage(data.message);
                setDeletedScreen("failure");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            setDeletedScreen("failure");
        });
    }

    return (
      <>
      {delete_screen === "loading" && (<LoadingScreen />)}
      {delete_screen === "failure" && (<Error onErrorClose={() => setDeletedScreen("form") } ErrorMessage={error_message}/>)}
      {delete_screen === "success" && (<Success onSuccessClose={onSuccess}/>)}
      {delete_screen === "form" && (
        <div id="delete_form_container">
  <div id="delete_form">
        <h1>Delete account</h1>
        <p>Please fill in your password to delete your account.</p>
        <hr/>
            
        <label htmlFor="" id="label_delete">Password</label>
        <br />
        <input type="password" name="" id="delete_input" placeholder="password" onChange={(e) => setPassword_delete(e.target.value)} />
        <br />
        
        <div id="button_group_delete">
            <button className="btn_login" id="cancel_delete_btn" onClick={onClose}>Cancel</button>
            <button className="btn_login" id="submit_delete_btn" onClick={() => handleDelete()}>Delete</button>
        </div>
   </div>
  </div>
      )};
    </>
    );
}

export default DeleteScreen;
