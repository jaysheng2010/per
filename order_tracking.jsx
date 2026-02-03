import { useState, useEffect, useMemo } from "react";
import { useDb } from "./DbContext";
import "./order_tracking.css";

function OrderTracking({ onClose }) {
  const [order_list, setOrdered] = useState([]);
  const [product, setProduct] = useState([]);
  const [changed, setChanged] = useState(false);
  const db = useDb();

  // Load data
  useEffect(() => {
    setOrdered(db.exec("SELECT * FROM order_tbl")[0].values);
    setProduct(db.exec("SELECT * FROM product_tbl")[0].values);
  }, [changed, db]);

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

  // Derive data safely (replaces mutating `ordered()`)
  const ordered = useMemo(() => {
    return order_list.map(item => {
      const newItem = structuredClone(item);

      // item[1] = ordered products
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
            <p onClick={() => cancel_order(item[0])}>Cancel order</p>
          </div>

          {item[1].map(element => (
            <div className="each_ordered_item" key={element[0]}>
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
