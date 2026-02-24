import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";
import ErrorScreen from "./error.jsx";
import "./product.css";

function Product() {
  const [productList, setProductList] = useState([]);
  const [screen, setScreen] = useState(null);
  const navigate = useNavigate();
  const db = useDb();

  useEffect(() => {

    if (!db) return;
    console.log("Database is ready:", db);          // ✅ WAIT for db to be ready before using it

    async function getData() {
      setScreen("loading");
      try {
        const response = await fetch("http://192.168.0.230:5002/product");
        const data = await response.json();

        if (!response.ok) {
          setScreen("error");
          throw new Error(data.message || "Failed to fetch products");
        }

        setProductList(data.products);

        data.products.forEach(item => {
          db.run(
            "INSERT OR IGNORE INTO products (name, quantity, price, img_link, description) VALUES (?,?,?,?,?)",
            [item[0], item[1], item[2], item[3],item[4]]
          );
        });
        sessionStorage.setItem("fetched", "true");
        setScreen(null);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setScreen("error");
      }
    }

    function deriveData() {
        let data = db.exec("SELECT * FROM products");
        if (data.length > 0) {
          let products = [];
          data[0].values.forEach(row => {
            products.push(row);
          }); 
          setProductList(products);
        } else {
          console.log("No products found in the database.");
          setProductList([]);
        }
    }

    if (sessionStorage.getItem("fetched") !== "true" || productList.length === 0) {
      getData();
    } else {
      deriveData();
    }
  }, [db]);

  return (
    <>
    {screen === "error" && (<ErrorScreen onErrorClose={() => window.location.href="/"} ErrorMessage="Failed to fetch products. Please try again later." />)}
    {screen === "loading" && (<div className="loading">Loading products...</div>)}
    {screen === null && (
    <div id="featured_containers">
      {productList.map(item => (
        <div className="featured_items" key={item[0]}>
          <img src={item[3]} alt={item[0]} />
          <p>{item[0]}</p>
          <p>{item[1]}</p>
          <button
            onClick={() =>
              navigate("/item", {
                state: {
                  name: item[0],
                  price: item[2],
                  quantity: item[1],
                  img_link: item[3],
                  description: item[4]
                }
              })
            }
          >
            Buy now
          </button>
        </div>
      ))}
    </div>
    )}
    </>
  );
}

export default Product;
