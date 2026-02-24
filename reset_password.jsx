import { useState } from "react";
import "./reset_password.css";
import Success from "./success.jsx";
import ErrorScreen from "./error.jsx";
import LoadingScreen from "./loading.jsx";  

function Reset({ onClose }) {
    const [email, setEmail] = useState("");
    const [screen, setScreen] = useState(null);
    function send_reset() {
        if (email == "" || email == null || !email.includes("@") || !email.includes(".")) {
            setScreen("failed");
            return;
        }
        setScreen("loading");
        fetch("http://192.168.0.224:5002/reset_id", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email})
        })
        .then(response => {
            if (!response.ok) {
                setScreen("failed");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.message == "success") {
                setScreen("success");
            } else {
                setScreen("failed");
            }
        })
        .catch(error => {
            setScreen("failed");
        });
    }
    return (
        <>
        {screen === "success" && <Success onSuccessClose={onClose} />}
        {screen === "failed" && <ErrorScreen onErrorClose={onClose} ErrorMessage="Failed to send reset link. Please try again." />}
        {screen === "loading" && <LoadingScreen />}
        {screen === null && (
        <div id="reset_password_container">
          <div>
             <h1>Reset password</h1>
             <p>Enter your email so we can send you a reset link.</p>
             <div>
               <label>Email</label>
               <br />
               <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
             </div>
             <p>You will receive a reset link from your email.</p>
             <button id="send_button" onClick={send_reset}>Send</button>
             <button id="close_button" onClick={onClose}>Close</button>
           </div>
          </div>
        )}
       </>
    );
}

export default Reset;
