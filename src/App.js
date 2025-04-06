import './App.css';
import { Routes, Route } from "react-router-dom";
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Account from "./pages/Account";
import ProductAdmin from "./pages/ProductAdmin"
import Baby from './pages/Baby';
import Bakery from './pages/Bakery';
import Dairy from './pages/Dairy';
import Freezer from './pages/Freezer';
import FruitVeg from './pages/FruitVeg';
import Lifestyle from './pages/Lifestyle';
import Meat from './pages/Meat';
import Pet from './pages/Pet';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element = {<Home />} />
        <Route path = "Home" element ={<Home />} />
        <Route path = "Meat" element ={<Meat />} />
        <Route path = "FruitVeg" element ={<FruitVeg />} /> 
        <Route path = "Dairy" element ={<Dairy />} />
        <Route path = "Freezer" element ={<Freezer />} />
        <Route path = "Bakery" element ={<Bakery />} />
        <Route path = "Lifestyle" element ={<Lifestyle />} />
        <Route path = "Baby" element ={<Baby />} />
        <Route path = "Pet" element ={<Pet />} />
        <Route path = "Account" element ={<Account />} />
        <Route path = "Cart" element ={<Cart />} />
        <Route path = "Product/:name" element ={<ProductPage />} />
        <Route path = "ProductAdmin" element ={<ProductAdmin />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
