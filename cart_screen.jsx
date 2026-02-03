import { useState, useEffect } from "react";
import Cart from './cart.jsx';
import CartWithout from './cart_without_account.jsx';

function CartScreen() {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("mode") === "registered") {
            setLogin(true);
        }
    }, [])
    return login ? <Cart /> : <CartWithout />;
}

export default CartScreen;
