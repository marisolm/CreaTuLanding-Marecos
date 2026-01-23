const products = [
    { 
        id: 1, 
        name: "Producto 1", 
        description: "Descripción del producto 1", 
        stock: 30, 
        image: '/image/cuero1.jpg',
        price: 100,
        category: 'categoria1'
    },
    { 
        id: 2, 
        name: "Producto 2", 
        description: "Descripción del producto 2", 
        stock: 20, 
        image: '/image/cuero2.jpg',
        price: 200,
        category: 'categoria2'
    },
    { 
        id: 3, 
        name: "Producto 3", 
        description: "Descripción del producto 3", 
        stock: 10, 
        image: '/image/cuero3.jpg',
        price: 300,
        category: 'categoria3'
    },
];


export const getProducts = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 3000);
    });
};