import './App.css';
import { Routes, Route } from "react-router-dom";
import MainLayout from './pages/MainLayout';
import Home from "./pages/Home"
import Account from "./pages/Account";
import ProductAdmin from "./pages/ProductAdmin"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path = "/Home" element ={<Home />} />
        <Route path = "/Account" element ={<Account />} />
        <Route path = "/ProductAdmin" element ={<ProductAdmin />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
