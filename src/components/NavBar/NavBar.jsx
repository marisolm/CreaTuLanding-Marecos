import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
    return (
        <nav className="nav">

            <div className="nav-brand">
                <img src="" alt="" />
            </div>

            <ul className="nav-list">
                <li className="nav-item">Teclado</li>
                <li className="nav-item">Mouse</li> 
                <li className="nav-item">Microfonos</li>
            </ul>

            <CartWidget />
        </nav>
    )
}

export default NavBar;  