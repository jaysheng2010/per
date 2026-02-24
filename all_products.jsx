import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";
import "./all_products.css";

function Product_all() {
  const db = useDb();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Load all products initially
  useEffect(() => {
    if (!db) return;

    async function fetchData() {
      try {
        const response = await fetch("http://192.168.0.230:5002/product");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        // Clear existing products before inserting new ones
        db.run("DELETE FROM products");

        data.products.forEach(item => {
          db.run(
            "INSERT INTO products (name, quantity, price, img_link, description) VALUES (?,?,?,?,?)",
            [item[0], item[1], item[2], item[3], item[4]]
          );
        });

        sessionStorage.setItem("fetched", "true");
      } catch (err) {
        console.error("Failed to fetch products", err);
      }

      const res = db.exec("SELECT * FROM products");
      if (res.length > 0) {
        setResult(res[0].values);
      }
    }

    fetchData();
  }, [db]);

  // Debounced search effect
  useEffect(() => {
    if (!db) return;

    if (!searchTerm.trim()) {
      const res = db.exec("SELECT * FROM products");
      setResult(res.length ? res[0].values : []);
      setNoResults(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const res = db.exec("SELECT * FROM products WHERE name LIKE ?", [
        `%${searchTerm}%`,
      ]);
      if (res.length > 0) {
        setResult(res[0].values);
        setNoResults(false);
      } else {
        setResult([]);
        setNoResults(true);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, db]);

  return (
    <>
      <div id="search_header">
        <button id="back_button" onClick={() => navigate("/")}>
          <i className="fa fa-arrow-left"></i>
        </button>

        <h2>Shop</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" id="search_btn">
            <i className="fa fa-search"></i>
          </button>
        </form>

        <p id="cart" onClick={() => navigate("/cart")}>
          <i className="fa fa-shopping-cart"></i>
        </p>
      </div>

      {noResults && <p id="no_result">No results found.</p>}

      <div id="items_container">
        {result.map((element, index) => (
          <div
            key={index}
            className="items"
            onClick={() =>
              navigate("/item", {
                state: {
                  name: element[0],
                  quantity: element[1],
                  price: element[2],
                  img_link: element[3],
                  description: element[4],
                },
              })
            }
          >
            <img
              src={element[3]}
              alt={element[0]}
              className="product_image"
            />
            <p>{element[0]}</p>
            <b>RM{parseFloat(element[2]).toFixed(2)}</b>
            <img
              src="https://www.clker.com/cliparts/t/x/J/U/4/G/four-star-rating-black-hi.png"
              className="star_review"
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Product_all;
