import './NavBar.css';
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
    return (
        <nav className="nav">

            <div className="nav-brand">
                <img id="logo" src="./src/img/logo.png" alt="Logo" />
            </div>

            <ul className="nav-list">
                <li className="nav-item">Productos</li>
                <li className="nav-item">Promociones</li> 
                <li className="nav-item">Contacto</li>
            </ul>

            <CartWidget />
        </nav>
    )
}

export default NavBar;  