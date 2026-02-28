import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount.jsx";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { Link } from "react-router";


const ItemDetail = ({ product }) => {
    const { addProduct } = useContext(CartContext);
    const [itemAdded , setItemAdded] = useState(false);

    const addToCart = (count) => { 
        const newProduct = {...product, quantity:count};
        addProduct(newProduct);
        setItemAdded(true);
   };

    return (
        <div className="item-detail">
            <div className="detail-image-container">
                <img className="detail-image" src={product.image} alt={product.name}/>
            </div>
            <div className="detail-info-container">
                <div>
                    <p className="detail-title">{product.name}</p>
                    <p className="detail-description">{product.description}</p>
                </div>
                {
                    product.stock <= 0 ?  (
                        <div><p className="detail-stock">Producto agotado</p></div>
                    ) : (
                        <><div><p className="detail-price">Precio: ${product.price}</p></div>
                        {
                            itemAdded ? (
                                <div>
                                <p className="added-message">Producto agregado al carrito</p>
                                <Link className="link-button" to="/cart">Ir al carrito</Link>
                                </div>
                            ) : ( 
                                <ItemCount stock={product.stock} addToCart={addToCart} />
                            )
                        }
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default ItemDetail;