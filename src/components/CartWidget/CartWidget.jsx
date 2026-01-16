import { IoCartOutline } from "react-icons/io5";

const CartWidget = () => {
    return (
        <div className="cart">
            <IoCartOutline size={50}/>
            <span className="cart-count">1</span>
        </div>
    );
}

export default CartWidget;
