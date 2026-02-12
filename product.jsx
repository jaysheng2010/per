import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";
import "./product.css";

function Product() {
  const [fetched, setFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const db = useDb();

  useEffect(() => {

    if (!db) return;
    console.log("Database is ready:", db);          // ✅ WAIT for db
    if (fetched) return; 

    async function getData() {
      try {
        const response = await fetch("http://192.168.0.224:5002/product");
        const data = await response.json();

        setProductList(data.products);

        data.products.forEach(item => {
          db.run(
            "INSERT OR IGNORE INTO products (name, quantity, price, img_link, description) VALUES (?,?,?,?,?)",
            [item[0], item[1], item[2], item[3],item[4]]
          );
        });
        setFetched(true);
        sessionStorage.setItem("fetched", "true");
      } catch (err) {
        console.error("Failed to fetch products", err);
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

    if (!fetched && sessionStorage.getItem("fetched") !== "true" || productList.length === 0) {
      getData();
    } else {
      deriveData();
    }
  }, [fetched, db]);

  return (
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
  );
}

export default Product;
