import Cart from "./cart.jsx";
import CartWithout from "./cart_without_account.jsx";

function CartScreen() {
  let login = false;
  if (sessionStorage.getItem("mode") == "registered") {
    login = true;
  } else {
    login = false;
  }

  return login ? <Cart /> : <CartWithout />;
}

export default CartScreen;