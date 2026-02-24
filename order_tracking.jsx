import { useState, useMemo } from "react";
import { useDb } from "./DbContext";
import "./order_tracking.css";

function OrderTracking({ onClose }) {
  const [changed, setChanged] = useState(false);
  const db = useDb();

  // Read from DB (derived data, not state)
  const order_list = useMemo(() => {
    return db.exec("SELECT * FROM order_tbl")[0]?.values || [];
  }, [db, changed]);

  const product = useMemo(() => {
    return db.exec("SELECT * FROM product_tbl")[0]?.values || [];
  }, [db]);

  function cancel_order(id) {
    fetch("", {
      body: JSON.stringify({ order_id: id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "success") {
          db.run("DELETE FROM order_tbl WHERE order_id = ?", [id]);
          setChanged(prev => !prev);
        } else {
          alert("Failed to cancel order.");
        }
      });
  }

  // Safe derived structure
  const ordered = useMemo(() => {
    return order_list.map(item => {
      const newItem = structuredClone(item);

      newItem[1] = item[1].map(v => {
        const found = product.find(p => p[0] === v[0]);
        return found ? [...v, found[3]] : v;
      });

      return newItem;
    });
  }, [order_list, product]);

  return (
    <div id="order-tracking_page">
      <div id="order_tracking_back">
        <p id="account_back_button" onClick={onClose}>
          <i className="fa fa-arrow-left"></i>
        </p>
      </div>

      {ordered.map(item => (
        <div className="each_order" key={item[0]}>
          <div className="date_order">
            <h2>{item[2]}</h2>
            <p onClick={() => cancel_order(item[0])}>
              Cancel order
            </p>
          </div>

          {item[1].map(element => (
            <div
              className="each_ordered_item"
              key={element[0]}
            >
              <div className="item_info">
                <img src={element[2]} alt={item[0]} />
                <div>
                  <p>{element[0]}</p>
                  <p>{element[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderTracking;
