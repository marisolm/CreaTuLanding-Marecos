import { getProducts } from "../../data/data.js";
import { useState, useEffect } from "react";  
import ItemList from "../ItemList/ItemList.jsx";

const ItemListContainer = ({ saludo }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    
        getProducts()
          .then((response) => {
            setProducts(response);
        })
        .catch((error) => {
            console.error("Error fetching products: ", error);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    return (
        <div className="itemListContainer">
            <h2>{saludo}</h2>
            {
                loading === true ? <div>Cargando productos...</div> : <ItemList products={products} />
            }
        </div>
    );
};

export default ItemListContainer;
