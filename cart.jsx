import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDb } from './DbContext';


function Cart() {

    const [cart_data, isCart] = useState([]);
    const db = useDb();
    const {state} = useLocation();

function add_one(name, quantity) {
    quantity = quantity + 1;
    if (check_quantity(name, quantity, "add")) {
        db.run("UPDATE cart SET quantity = ? WHERE name = ?", [quantity, name]);
    } else {
        return;
    }
}

function minus_one(name, quantity) {
    quantity = quantity - 1;
    if (quantity <= 0) {
        return;
    } else {
        db.run("UPDATE cart SET quantity = ? WHERE name = ?", [quantity, name])
    }
}

function check_quantity(name, quantity, query) {
    let current_quantity = db.exec("SELECT quantity FROM cart WHERE name = ?", [name])[0].values[0][0];
    let product_quantity;
    if (query == "add") {
        product_quantity = db.exec("SELECT quantity FROM products WHERE name = ?", [name])[0].values[0][0];
        return current_quantity > quantity || product_quantity >= quantity
    } else if (query == "substract") {
        quantity = quantity - 1;
        if (current_quantity != 0 || quantity > 0) {
            return true
        } else {
            return false
        }
    }
}

function delete_cart(name) {
    db.run("DELETE FROM cart WHERE name = ?", [name])
}

function fetch_client_cart(name, quantity, query_command) {
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
            isCart(result[0].values);
        }
    })
}

function total() {
    let sum = 0;
    let result = db.exec("SELECT * FROM cart")[0].values;
    result.forEach(element => {
        let product_price = db.exec("SELECT price FROM products WHERE name = ?", [element[0]])[0].values[0][0];
        sum += element[1] * product_price;
    });
    return sum;
}

function subtotal(name, quantity) {
    let sum = 0;
    let product_price = db.exec("SELECT price FROM products WHERE name = ?", [name])[0].values[0][0];
    return sum += quantity * product_price 
}

function add_substarct(product_name, product_quantity, bs) {
    let newQuantity = 0;
    if (check_quantity(product_name, product_quantity, bs) == true) {
        if (bs == "add") {
            newQuantity = quantity + 1;
            fetch_client_cart(product_name, product_quantity, "update")
        } else if (bs == "substract") {
            newQuantity = quantity - 1;
            fetch_client_cart(product_name, product_quantity, "update")
        }
    }
}

    useEffect(() => {
  const mode = localStorage.getItem("mode") === "true";
  if (!mode) {
    const result = db.exec("SELECT * FROM cart");
    setCart(result[0]?.values || []);
  } else {
    setCart(state?.cart_data || []);
  }
}, []);
    
    return(
        <div id="cart_screen">
          <div id="cart_header">
             <p><i className="fa fa-arrow-left"></i></p>
          </div>
              <p id="your_cart_subtitle">Your cart</p>
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
                        <p className="remove_btn" onClick={() => mode ?  delete_cart(item[0]) : fetch_client_cart(item[0], item[1], "delete")}>Remove</p>
                    </div>
                </div>
              <div className="all_amount_container"> 
                <div className="amount_container">
                    <div className="add_minus_btn" onClick={() => mode ? add_one(item[0], item[1]) : add_substarct(item[0], item[1], "substract")}>−</div>
                    <div className="amount">{item[1]}</div>
                    <div className="add_minus_btn" onClick={() => mode ? minus_one(item[0], item[1]) : add_substarct(item[0], item[1], "add")}>+</div>
                </div>
                <div className="subtotal">{subtotal(item[0], item[1])}</div>
              </div>
            </div>
        </td>
    </tr>  
    )};
</table>
<div id="total_price">
    <div>
        <p>Total: RM{total()}</p>
        <button>Place order</button>
    </div>
</div>
</div>
    );
}

export default Cart;