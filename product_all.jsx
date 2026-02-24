import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from './DbContext';
import "./item_detail.css";


function Product_all() {
     const db = useDb();
     const navigate = useNavigate();
     const [products, setProducts] = useState(() => {
         const res = db.exec("SELECT * FROM products");
         return res?.length ? res[0].values : [];
     });
     const [searchTerm, setSearchTerm] = useState("");

     function handleSearch() {
         const res = db.exec("SELECT * FROM products WHERE name LIKE ?", [`%${searchTerm}%`]);
         setProducts(res?.length ? res[0].values : []);
         if (res?.length === 0) {
            setSearchTerm(null);
         }
     }

    return (
        <>
          <div id="search_header">
            <button id="back_button"><i className="fa fa-arrow-left"/></button>
            <h2>Shop</h2>
            <form onSubmit={handleSearch}>
              <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)}/>
               <button type="button" id="search_btn" onClick={handleSearch}><i className="fa fa-search"/></button>
            </form>
            <p id="cart"><i className="fa fa-shopping-cart"/></p>
        </div>

        {searchTerm === null && <p id="no_result">No results found.</p>}
        <div id="items_list">
        {products.map(element => (
        <div key={element[0]} id="items_container" onClick={() => navigate("/", {state: {
            name: element[0],
            price: element[2],
            quantity: element[1],
            img_link: element[3],
            description: element[4]
        }})}>
            <div className="items">
                <img src={element[3]} alt={element[0]} className="product_image" />
                <p>{element[0]}</p>
                <b>RM{parseFloat(element[2])}</b>
                <img src="https://www.clker.com/cliparts/t/x/J/U/4/G/four-star-rating-black-hi.png" className="star_review" alt="" />    
            </div>
        </div>
        ))}
        </div>
        </>
    );
}

export default Product_all;
