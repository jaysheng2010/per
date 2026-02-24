import { useNavigate } from "react-router-dom";
import "./cart_without_account.css";
function CartWithout() {
    const navigate = useNavigate();
    return (
    <div id="cart_loading_container">
       <div>
        <p>Please login or sign up an account to continue.</p>
        <button onClick={() => navigate("/")}>Back</button>
       </div>
    </div>
    );
}

export default CartWithout;