import { useState, useEffect } from "react";

function CartScreen() {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("mode") === "registered") {
            setLogin(true);
        }
    })
    return login ? <Cart /> : <CartWithout />;
}

export default CartScreen;