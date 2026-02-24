import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";

function Cart() {
  const [cart_data, setCart] = useState([]);
  const [total_sum, setTotal] = useState("");
  const [button_work, setButton_work] = useState(false);
  const navigate = useNavigate();
  const db = useDb();

  function subtotal(name, quantity) {
    const result = db.exec(
      "SELECT price FROM products WHERE name = ?",
      [name]
    );
    if (!result[0]?.values[0]?.[0]) return 0;
    const product_price = result[0].values[0][0];
    return quantity * product_price;
  }

  function subtotal_render(name, quantity) {
    const result = db.exec(
      "SELECT price FROM products WHERE name = ?",
      [name]
    );
    if (!result[0]?.values[0]?.[0]) return "Not available";
    const product_price = result[0].values[0][0];
    let total_sub = quantity * product_price;
    return "RM" + String(total_sub);
  }

  useEffect(() => {
    const result = db.exec("SELECT * FROM cart");
    if (result.length > 0) {
      setCart(result[0].values);
    } else {
      setCart([]);
    }
  }, [db]);

  useEffect(() => {
    let sum = 0;
    cart_data.forEach(item => {
      sum += subtotal(item[0], item[1]);
    });
    setTotal(String(sum));
  }, [cart_data, db]);

  function fetch_client_cart(name, quantity, query_command) {

    if (sessionStorage.getItem("mode") != "registered") {
      alert("Please login to continue.");
      return;
    }

    if (quantity < 1) return;

    let token = db.exec("SELECT token FROM account")[0].values[0][0];
    setButton_work(true);

    fetch("http://192.168.0.230:5002/cart", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "product_name": name,
        "quantity": quantity,
        "query": query_command,
        "token": token
      }),
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        if (data["message"] === "success") {
          if (query_command === "add" || query_command === "minus") {
            db.run(
              "UPDATE cart SET quantity = ? WHERE name = ?",
              [quantity, name]
            );
          } else if (query_command === "delete") {
            db.run(
              "DELETE FROM cart WHERE name = ?",
              [name]
            );
          }
          const result = db.exec("SELECT * FROM cart");
          if (result.length > 0) {
            setCart(result[0].values);
          } else {
            setCart([]);
          }
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert(`Error on ${query_command} cart.`);
      });
      setButton_work(false);
  }

  function order() {
    const result = db.exec("SELECT name, quantity FROM cart");
    if (result.length === 0) return;
    const cart_data = result[0].values[0];
    setButton_work(true);

    fetch("http://192.168.0.230:5003/order_first", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ "order_items": cart_data })
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = `http://192.168.0.230:5003/render_order?token=${data.token}`;
      })
      .catch(() => {
        alert("Error on placing order.");
      });
      setButton_work(false);
  }

  return (
    <div id="cart_screen">
      <div id="cart_header_item">
        <button onClick={() => navigate("/")}>←</button>
        <p>Back</p>
      </div>


      <p id="your_cart_subtitle">Your cart</p>

      {cart_data.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <table>
          <tbody>
            {cart_data.map(item => (
              <tr className="_items" key={item[0]}>
                <td colSpan="3">
                  <div className="cart_row">
                    <div className="cart_items">
                      <img src={item[2]} alt="" />
                      <div>
                        <p>{item[0]}</p>
                        <br />
                        <p
                          className="remove_btn"
                          onClick={() =>
                            fetch_client_cart(
                              item[0],
                              item[1],
                              "delete"
                            )
                          }
                          disabled={button_work}
                        >
                          Remove
                        </p>
                      </div>
                    </div>

                    <div className="all_amount_container">
                      <div className="amount_container">
                        <div
                          className="add_minus_btn"
                          onClick={() =>
                            fetch_client_cart(
                              item[0],
                              item[1] - 1,
                              "minus"
                            )
                          }
                          disabled={button_work}
                        >
                          −
                        </div>

                        <div className="amount">{item[1]}</div>

                        <div
                          className="add_minus_btn"
                          onClick={() =>
                            fetch_client_cart(
                              item[0],
                              item[1] + 1,
                              "add"
                            )
                          }
                          disabled={button_work}
                        >
                          +
                        </div>
                      </div>

                      <div className="subtotal">
                        {subtotal_render(item[0], item[1])}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div id="total_price">
        <div>
          <p>Total: RM{total_sum}</p>
          <button
            onClick={() => {
              order();
            }}
            disabled={cart_data.length === 0 || button_work}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
