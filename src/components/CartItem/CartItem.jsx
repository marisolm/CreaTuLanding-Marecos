import React from 'react'

const CartItem  = ({ productCart, deleteProduct }) => {
  return (
    <div className="product-cart" key={productCart.id}>
        <img src={productCart.image} alt={productCart.name} width={100}/>
        <p>{productCart.name}</p>
        <p>Cantidad: {productCart.quantity}</p>
        <p>Precio unitario: ${productCart.price}</p>
        <p>Precio: ${productCart.price * productCart.quantity}</p>
        <button onClick={() => deleteProduct(productCart.id)}>Eliminar</button>
    </div>
  )
}

export default CartItem;
