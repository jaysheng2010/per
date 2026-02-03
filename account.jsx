import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./DbContext";
import "./account.css";
import OrderTracking from "./order_tracking.jsx";
import Contact from "./contact.jsx";
function Account() {
    const [show_screen, setScreen] = useState(null);
    const [show_order, setOrderTracking] = useState(false);
    const [show_order_home, setOrderHome] = useState(false);
    const [opacity_order_home, setOrderHomeOpacity] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date_joined, setDate] = useState("");
    const db = useDb();

    useEffect(() => {
        let result;
        result = db.exec("SELECT * FROM account")[0].values[0];
        setEmail(result[0]);
        setPhone(result[1]);
        setDate(result[2]);
        setOrdered(result[3])
    },[]);

   return (
      <>
      {show_screen === "contact" && <Contact onClose={() => setScreen(null)} />}
      {show_screen === "order_tracking" && <OrderTracking onClose={() => setScreen(null)} />}
 <div id="account_details_container" style={{display: show_order_home ? "flex":"none", opacity: opacity_order_home ? 0.1:1}}>
    <div>
      <p id="account_back_button"><i className="fa fa-arrow-left"></i></p>
    </div>
    <div id="account_details">
        <div>
            <img src="https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
        </div>

        <div id="account_details_info_container">
            <p className="account_details_info">Email: {email}</p>
            <p className="account_details_info">Phone number: {phone}</p>
            <p className="account_details_info">Date joined: {date_joined}</p>
        </div>
    </div>

    <div id="icons_container_account">
        <div onClick={() => {setScreen("order_tracking")}}>
            <img src="https://cdn-icons-png.flaticon.com/512/1356/1356594.png" alt="" />
            <p>Orders</p>
        </div>

        <div onClick={() => {setScreen("contact")}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2HzeB2ipoHLHusA57HlWRciAPgvoyKwdNQ&s" alt="" />
            <p>Contact us</p>
        </div>
    </div>
    
    <div id="account_details_btn_div">
      <button id="account_details_btn_reset" className="account_details_btn">Reset Password</button>
      <button id="account_details_btn_del" className="account_details_btn">Delete</button>
   </div>
</div>
  </>
    );
}

export default Account;
