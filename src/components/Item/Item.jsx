const Item = ({ product }) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
            <img src={product.image} alt={product.name} />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
        </div>
    );
}

export default Item;