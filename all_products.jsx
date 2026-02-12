import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "./database.jsx";
import "./all_products.css";

function Product_all() {
  const db = useDb();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    if (!db) return;

    const res = db.exec("SELECT * FROM products");
    if (res.length > 0) {
      setResult(res[0].values);
    }
  }, [db]);

  return (
    <>
      {screen === null && (
        <>
          <div id="search_header">
            <button id="back_button" onClick={() => navigate("/")}>
              <i className="fa fa-arrow-left"></i>
            </button>

            <h2>Shop</h2>

            <form>
              <input type="text" placeholder="Search..." />
              <button type="submit" id="search_btn">
                <i className="fa fa-search"></i>
              </button>
            </form>

            <p id="cart" onClick={() => navigate("/cart")}>
              <i className="fa fa-shopping-cart"></i>
            </p>
          </div>

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
      )}
    </>
  );
}

export default Product_all;