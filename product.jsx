import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./DbContext";
import "./product.css";

function Product() {
  const [fetched, setFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const db = useDb();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("");
        const data = await response.json();

        setProductList(data.products);

        data.products.forEach(item => {
          db.run(
            "INSERT OR IGNORE INTO products (name, quantity, price, image, description) VALUES (?,?,?,?,?)",
            [item[0], item[1], item[2], item[3],item[4]]
          );
        });

        setFetched(true);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }

    if (!fetched) {
      getData();
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
