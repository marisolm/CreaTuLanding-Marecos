import { useContext } from "react"
import CartItem from "../CartItem/CartItem"
import { CartContext } from "../../context/CartContext"
import { BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router";
import "./Cart.css"

export const Cart = () => {
    const { cart , totalPrice, deleteCart, deleteProduct } = useContext(CartContext);
    
    if (cart.length === 0) {
        return (
            <div>
                <h2>El carrito está vacío</h2>
                <Link to="/">Volver a la tienda</Link>
            </div>
        )
    }
    return (
        <div>
            {cart.map(productCart => (
                <CartItem key={productCart.id} productCart={productCart} deleteProduct={deleteProduct}/>
            ))}

            <h3>Total: ${totalPrice()}</h3>
            <button onClick={deleteCart}><BsTrash3Fill/>Vaciar carrito</button>
            <p/>
            <Link className="link-button" to="/checkout">Finalizar mi compra</Link>
        </div>
    )
}

export default Cart;