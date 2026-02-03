import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDb } from './DbContext';


function Cart() {
    const [cart_data, setCart] = useState([]);
    const [total_sum, setTotal] = useState("");
    const navigate = useNavigate();
    const db = useDb();

    useEffect(() => {
     const result = db.exec("SELECT * FROM cart");
     if (result[0]?.values?.length) {
       setCart(result[0].values);
     }
    }, []);

    useEffect(() => {
      let sum = 0;
      cart_data.forEach(item => {
        sum += subtotal(item[0], item[1]);
      });
      setTotal(sum);
    }, [cart_data]);

       {/*Logged in mode*/}
      function fetch_client_cart(name, quantity, query_command) {
        if (quantity < 0) {
          return;
        }
        fetch("", {
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
             "product_name": name,
             "quantity": quantity,
             "query": query_command
          }),
          method: "POST",
         credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
          if (data["message"] == "Success") {
            if (query_command == "insert") {
                db.run("INSERT INTO cart VALUES (?,?)", []);
            } else if (query_command == "update") {
                db.run("UPDATE cart SET quantity = ? WHERE name = ?", [quantity, name]);
            } else if (query_command == "delete") {
                db.run("DELETE FROM cart WHERE name = ?", [name]);
            }
            const result = db.exec("SELECT * FROM cart");
            setCart(result[0].values);
          }
        })
        .catch(error => {
          alert(`Error on ${query_command} cart.`);
        })
      }

      function subtotal(name, quantity) {
        const result = db.exec("SELECT price FROM products WHERE name = ?", [name]);
        if (!result[0]?.values[0]?.[0]) return 0; // fallback
        const product_price = result[0].values[0][0];
        return quantity * product_price; 
      }

      function order() {
        let cart_data;
        cart_data = db.exec("SELECT name, quantity FROM cart")[0].values;
        fetch("", {
          headers: {"Content-Type":"application/json"},
          method: "POST",
          body: JSON.stringify({"order_items": cart_data})
        })
        .then(response => response.json())
        .then(data => {
          window.location.href = `/token=${data.token}`;
        })
      }
    
    return(
        <div id="cart_screen">
          <div id="cart_header">
             <p onClick={() => navigate("/home")}><i className="fa fa-arrow-left"></i></p>
          </div>
              <p id="your_cart_subtitle">Your cart</p>
      {cart_data.length === 0 ? (
      <p>Your cart is empty 😢</p>
    ) : (
<table>
    {cart_data.map( (item) =>  
      <tr className="_items" key={item[0]}>
        <td colSpan="3">
            <div className="cart_row">
                <div className="cart_items">
                    <img src={item[3]} />
                    <div>
                        <p>{item[0]}</p>
                        <br />
                        <p className="remove_btn" onClick={() => fetch_client_cart(item[0], item[1], "delete")}>Remove</p>
                    </div>
                </div>
              <div className="all_amount_container"> 
                <div className="amount_container">
                    <div className="add_minus_btn" onClick={() => fetch_client_cart(item[0], item[1] - 1, "update")}>−</div>
                    <div className="amount">{item[1]}</div>
                    <div className="add_minus_btn" onClick={() => fetch_client_cart(item[0], item[1] + 1, "update")}>+</div>
                </div>
                <div className="subtotal">{subtotal(item[0], item[1])}</div>
              </div>
            </div>
        </td>
    </tr>  
    )}
</table>
)}
<div id="total_price">
    <div>
        <p>Total: RM{total_sum}</p>
        <button onClick={() => order()} disabled={cart_data.length === 0}>Place order</button>
    </div>
</div>
</div>
    );
}

export default Cart;