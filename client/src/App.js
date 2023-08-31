import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/HomePage/HomePage";
import Detail from "./components/PokemonDetail/Detail";
import Formulario from "./components/PokemonCreate/PokemonCreate";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/pokemons" element={<Formulario/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App