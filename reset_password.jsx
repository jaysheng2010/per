import { useState } from "react";
import "./reset_password.css";
import Success from "./success.jsx";
import Error from "./error.jsx";

function Reset({ onClose }) {
    const [email, setEmail] = useState("");
    const [screen, setScreen] = useState(null);
    function send_reset() {
        fetch("", {
            method: "POST",
            heaaders: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email})
        })
        .then(response => response.json())
        .then(data => {
            if (data.message == "success") {
                setScreen("success");
            } else {
                setScreen("failed");
            }
        })
    }
    return (
        <>
        {screen === "success" && <Success onClose={onClose} />}
        {screen === "failed" && <Error onClose={onClose} />}
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
