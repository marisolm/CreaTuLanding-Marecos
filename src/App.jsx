import './App.css'
import NavBar from './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'; 
import ContadorContainer from './EJ/ContadorContainer.jsx';


function App() {

  const saludar = () => {
    alert ("Hola mundo");
  };


  return (
    <div>
      <NavBar />
      <ItemListContainer saludo={"Hola mundo"} despedida={"Adiós mundo"} saludar={saludar} />
      <ContadorContainer />
    </div>
    )
}

export default App
