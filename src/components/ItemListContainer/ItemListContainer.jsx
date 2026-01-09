const ItemListContainer = ({ saludo, despedida, saludar }) => {
    return (
        <div>
            <h2>{saludo}</h2>
            <h2>{despedida}</h2>
            <button onClick={saludar}>Saludar</button>
        </div>
    );
};

export default ItemListContainer;
