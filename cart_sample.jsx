import "./cart_sample.css";
function Cart_sample() {
    return (
        <div id="cart_screen">
<div id="cart_header_item">
        <button onClick={() => navigate("/")}>←</button>
        <p>Back</p>
      </div>

<p id="your_cart_subtitle">Your cart</p>

<table>
  <tbody>
    <tr className="_items">
        <td colSpan="3">
            <div className="cart_row">

                <div className="cart_items">
                    <img src="https://png.pngtree.com/png-vector/20250319/ourmid/pngtree-elegant-pink-perfume-bottle-for-women-clipart-illustration-png-image_15771804.png"/>
                    <div>
                        <p>Name</p>
                        <br/>
                        <p className="remove_btn">Remove</p>
                    </div>
                </div>
              <div className="all_amount_container"> 
                <div className="amount_container">
                    <div className="add_minus_btn">−</div>
                    <div className="amount">12</div>
                    <div className="add_minus_btn">+</div>
                </div>
                <div className="subtotal">RM12.00</div>
              </div>

            </div>
        </td>
    </tr>

    <tr className="_items">
        <td colSpan="3">
            <div className="cart_row">

                <div className="cart_items">
                    <img src="https://png.pngtree.com/png-vector/20250319/ourmid/pngtree-elegant-pink-perfume-bottle-for-women-clipart-illustration-png-image_15771804.png"/>
                    <div>
                        <p>Name</p>
                        <br/>
                        <p className="remove_btn">Remove</p>
                    </div>
                </div>
              <div className="all_amount_container"> 
                <div className="amount_container">
                    <div className="add_minus_btn">−</div>
                    <div className="amount">12</div>
                    <div className="add_minus_btn">+</div>
                </div>
                <div className="subtotal">RM12.00</div>
              </div>

            </div>
        </td>
    </tr>
    </tbody>
</table>

<div id="total_price">
    <div>
        <p>Total: RM24.00</p>
        <button>Place order</button>
    </div>
</div>
</div>
    );
}

export default Cart_sample;