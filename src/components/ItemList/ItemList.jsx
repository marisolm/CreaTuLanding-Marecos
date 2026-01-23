import Item from "../Item/Item.jsx";

const ItemList = ({ products }) => {
    return (   
        <div>
            {
                products.map((product) => (
                    <Item key={product.id} product={product}></Item>
                ))
            }
        </div>
    );
}

export default ItemList;