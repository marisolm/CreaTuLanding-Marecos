import './App.css'
import NavBar from './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'; 



function App() {

  const saludar = () => {
    alert ("Hola mundo");
  };


  return (
    <div>
      <NavBar />
      <ItemListContainer saludo={"Hola mundo"} despedida={"Adiós mundo"} />
    </div>
    )
}

export default App
