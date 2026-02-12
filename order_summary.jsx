import "./order_sum.css";
function OrderSummary() {
  return (
    <div id="order">
            <div id="address_container">
               <h1>Billing information</h1>
               <div id="address">
                <div>
                    <label htmlFor="address">Address</label>
                    <br/>
                    <input type="text" placeholder="address"/>
                    <br/>
                    <label htmlFor="address">Postal code</label>
                    <br/>
                    <input type="text" pattern="[1-9]\d{4}" title="Enter a valid 5-digit Malaysian postcode" placeholder="42800"/>
                    <br/>
                    <label htmlFor="address">City</label>
                    <br/>
                    <input type="text" placeholder="Selangir"/>
                </div>
                <div>
                    <label htmlFor="address" placeholder="other">Jalan</label>
                    <br />
                    <input type="text"/>
                    <br/>
                    <label htmlFor="address">Other</label>
                    <br/>
                    <input type="text" placeholder="other"/>
                    <br/>
                    <label htmlFor="address">Other</label>
                    <br/>
                    <input type="text" placeholder="other"/>
                </div>
               </div>
               <button className="confirm_btn" id="wide">Confirm</button>
            </div>
            

            <div id="price">
                <div id="price_details">
                    <div className="right_upper">
                        <p className="light_p">Price:</p>
                        <p className="right_upper_right">RM12.00</p>
                    </div>
                    <div className="right_upper">
                        <p className="light_p">Shipping fee:</p>
                        <p class="right_upper_right">RM12.00</p>
                    </div>
                    <div className="right_upper">
                        <p className="bold_sized">Total:</p>
                        <p className="right_upper_right" id="total">RM12.00</p>
                    </div>
                </div>

                <div id="order_items">
                    <div>
                        <img src="https://img.freepik.com/free-vector/vector-3d-realistic-perfume-bottle-women-shiny-glass-container-with-pink-liquid_33099-1226.jpg?semt=ais_user_personalization&w=740&q=80" alt="" />
                        <div>
                            <p className="items_name">Name</p>
                            <p className="items_name">Qty: 2</p>
                        </div>
                        <p className="order_items_each_price">RM12.00</p>
                    </div>
                    <br/>
                    <div>
                        <img src="https://img.freepik.com/free-vector/vector-3d-realistic-perfume-bottle-women-shiny-glass-container-with-pink-liquid_33099-1226.jpg?semt=ais_user_personalization&w=740&q=80" alt="" />
                        <div>
                            <p className="items_name">Name</p>
                            <p className="items_name">Qty: 2</p>
                        </div>
                        <p className="order_items_each_price">RM12.00</p>
                    </div>
                    <br/>
                    <div>
                        <img src="https://img.freepik.com/free-vector/vector-3d-realistic-perfume-bottle-women-shiny-glass-container-with-pink-liquid_33099-1226.jpg?semt=ais_user_personalization&w=740&q=80" alt="" />
                        <div>
                            <p className="items_name">Name</p>
                            <p className="items_name">Qty: 2</p>
                        </div>
                        <p className="order_items_each_price">RM12.00</p>
                    </div>
                </div>
            </div>
            <button className="confirm_btn" id="narrow">Confirm</button>
        </div>
  );
}

export default OrderSummary;