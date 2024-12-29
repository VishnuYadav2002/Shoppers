import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Header from "./Components/Header/header";
import ProductPage from './Components/Pages/Product';
import { CartProvider } from './Components/Pages/CartContext';
import Home from "./Components/Home/home";
import Cart from './Components/Pages/Cart'

function App() {
  return (
    
    <CartProvider>
    <Router>
      <Header/>
      <Routes>
         <Route path='/' element={  <Home/>}/>
         <Route path='/ProductPage' element={ <ProductPage/>} />
         <Route path='/cart' element={<Cart/>} />
      </Routes>
    </Router>
    </CartProvider>
  
  
  );
}

export default App;
