import {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDb } from './database.jsx';
import "./item_detail.css";

function Details() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [add_num, Add] = useState(1);
    const db = useDb();

    function insert_cart(name, quantity) {
      const result = db.exec("SELECT name FROM cart");

      if (result.length > 0) {
        const names = result[0].values.map(row => row[0]);
        if (names.includes(name)) {
           alert("Item already in cart.");
          return; 
        }
      }

      let token = db.exec("SELECT token FROM account")[0].values[0][0];

       fetch("http://192.168.0.230:5002/cart", {
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
             "product_name": name,
             "quantity": quantity,
             "query": "insert",
             "token": token
          }),
          method: "POST"
        })
        .then(response => response.json())
        .then(data => {
          if (data["message"] == "success") {
            let image = db.exec("SELECT img_link FROM products WHERE name = ? ", [name])[0].values[0][0];
            db.run("INSERT INTO cart VALUES (?,?,?)", [name, quantity, image]);
          } else {
            alert("Error on adding items.");
          }
        })
     }

    function add_quantity() {
        if (add_num >= state?.quantity) {
            return;
        }
        Add(Math.max(1, add_num + 1));
    }

    function minus_quantity() {
        if (add_num <= 1) {
            return;
        }
        Add(Math.min(state?.quantity, add_num - 1));
    }

    return (
        <div id="add_cart_screen">
          <div id="web_header_item">
            <button onClick={() => navigate("/")}>←</button>
            <p>Back</p>
          </div>
          <br />
          <div id="add_to_cart_container">
             <img src={state?.img_link} alt="" />
          <div>
        <h1>{state?.name}</h1>
        <p>{state?.description}</p>
        <p>Quantity left: {state?.quantity}</p>
        <b>RM{state?.price}</b>
        <div id="quantity_selector_add_cart">
            <div>
                <button onClick={() => minus_quantity()}>−</button>
                <p>{add_num}</p>
                <button onClick={() => add_quantity()}>+</button>
            </div>
            <button onClick={() => insert_cart(state?.name, add_num)} disabled={!state}>Add to cart</button>
        </div>
    </div>
</div>
</div>
    );
}

export default Details;