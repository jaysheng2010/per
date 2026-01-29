import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./DbContext";
import "./account.css";
function Account() {
    const [show_contact, setContact] = useState(false);
    const [show_order, setOrderTracking] = useState(false);
    const [show_order_home, setOrderHome] = useState(false);
    const [opacity_order_home, setOrderHomeOpacity] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date_joined, setDate] = useState("");
    const [ordered, setOrdered] = useState([])
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
 <div id="account_details_container" style={{display: show_order_home ? "flex":"none", opacity: opacity_order_home ? 0.1:1;}}>
    <div>
      <p id="account_back_button"><i classNameName="fa fa-arrow-left"></i></p>
    </div>
    <div id="account_details">
        <div>
            <img src="https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
        </div>

        <div id="account_details_info_container">
            <p classNameName="account_details_info">Email: {email}</p>
            <p classNameName="account_details_info">Phone number: {phone}</p>
            <p classNameName="account_details_info">Date joined: {date_joined}</p>
        </div>
    </div>

    <div id="icons_container_account">
        <div onClick={() => {setOrderTracking(true)}}>
            <img src="https://cdn-icons-png.flaticon.com/512/1356/1356594.png" alt="" />
            <p>Orders</p>
        </div>

        <div onClick={() => {setContact(true)}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2HzeB2ipoHLHusA57HlWRciAPgvoyKwdNQ&s" alt="" />
            <p>Contact us</p>
        </div>
    </div>
    
    <div id="account_details_btn_div">
      <button id="account_details_btn_reset" classNameName="account_details_btn">Reset Password</button>
      <button id="account_details_btn_del" classNameName="account_details_btn">Delete</button>
   </div>
</div>

    <div id="contact_page_container" style={{display: show_contact ? "":""}}>
  <div id="contact_page">
    <h2>Contact information</h2>
    <p classNameName="icon_contact"><i classNameName="fa fa-envelope"></i></p>
    <p>dvesk@</p>
    <p classNameName="icon_contact"><i classNameName="fa fa-phone"></i></p>
    <p>0121234567</p>
    <p classNameName="icon_contact"><i classNameName="fa fa-instagram"></i></p>
    <p>@xxx</p>
    <p id="feel_free">Feel free to contact us if you have any issues.</p>
    <br />
    <button onClick={() => {setContact(false)}}>close</button>
  </div>
</div>


<div id="order-tracking_page" style={{display: show_order ? "":""}}>
    <div id="order_tracking_back">
      <p id="account_back_button" onClick={() => {setOrderTracking(false)}}><i className="fa fa-arrow-left"></i></p>
    </div>
    {ordered.map( (item) => (
          <div className="each_order" key={item[0]}>
        <div className="date_order">
            <h2>{item[0]}</h2>
            <p>Cancel order</p>
        </div>
        {item[1].map( (each) => (
        <div className="each_ordered_item" key={each[0]}>
            <div className="item_info">
                <img src="https://via.placeholder.com/100" alt="" />
                <div>
                    <p>{each[0]}</p>
                    <p>{each[1]}</p>
                </div>
            </div>
        </div>
       ))}
     ))}
   </div>
  </>
    );
}

export default Account;
