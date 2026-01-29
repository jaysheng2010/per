import {useState, useLocation} from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from './DbContext';
import "./item_detail.css";


function Product_all() {
    let result;
    const db = useDb();
    useEffect(() => {
       result = db.exec("SELECT * FROM products")[0].values;
    });

    return (
        <>
          <div id="search_header">
            <button id="back_button"><i class="fa fa-arrow-left"></i></button>
            <h2>Shop</h2>
            <form>
              <input type="text" placeholder="Search..." />
               <button type="submit" id="search_btn"><i class="fa fa-search"></i></button>
            </form>
            <p id="cart"><i class="fa fa-shopping-cart"></i></p>
        </div>
        {result.forEach(element => {
        <div id="items_container" onClick={() => navigate("/", {state: {
            name: element[0],
            price: element[2],
            quantity: element[1],
            img_link: element[3],
            description: element[4]
        }})}>
            <div class="items">
                <img src={element[3]} alt={element[0]} class="product_image" />
                <p>{element[0]}</p>
                <b>RM{parseFloat(element[1])}</b>
                <img src="https://www.clker.com/cliparts/t/x/J/U/4/G/four-star-rating-black-hi.png" class="star_review" alt="" />    
            </div>
        </div>
        })}
        </>
    );
}

export default Product_all;
