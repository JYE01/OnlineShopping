import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="topnav">
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>

        <Link to="/Home" className="logo-link">
          <img src="UTSLogo.png" alt="Home Logo" className="logo" />
        </Link>

        <div className="nav-left">
          <Link to="/Meat" className={location.pathname === "/Meat" ? "active" : ""}>Meat</Link>
          <Link to="/FruitVeg" className={location.pathname === "/FruitVeg" ? "active" : ""}>Fruit & Veg</Link>
          <Link to="/Dairy" className={location.pathname === "/Dairy" ? "active" : ""}>Dairy</Link>
          <Link to="/Freezer" className={location.pathname === "/Freezer" ? "active" : ""}>Freezer</Link>
          <Link to="/Bakery" className={location.pathname === "/Bakery" ? "active" : ""}>Bakery</Link>
          <Link to="/LifeStyle" className={location.pathname === "/LifeStyle" ? "active" : ""}>Home & Lifestyle</Link>
          <Link to="/Baby" className={location.pathname === "/Baby" ? "active" : ""}>Baby</Link>
          <Link to="/Pet" className={location.pathname === "/Pet" ? "active" : ""}>Pet</Link>
        </div>

        <div className="nav-right">
          <Link to="/Account" className={location.pathname === "/Account" ? "active" : ""}>
            <User size={18} style={{ verticalAlign: "middle", marginRight: "5px" }} />
            <span className="hide-on-mobile">Account</span>
          </Link>
          <Link to="/Cart" className={location.pathname === "/Cart" ? "active" : ""}>
            <ShoppingCart size={18} style={{ verticalAlign: "middle", marginRight: "5px" }} />
            <span className="hide-on-mobile">Cart</span>
          </Link>
        </div>
      </div>

      <div className={`nav-mobile-dropdown ${isOpen ? "show" : ""}`}>
        <Link to="/Meat" className={location.pathname === "/Meat" ? "active" : ""}>Meat</Link>
        <Link to="/FruitVeg" className={location.pathname === "/FruitVeg" ? "active" : ""}>Fruit & Veg</Link>
        <Link to="/Dairy" className={location.pathname === "/Dairy" ? "active" : ""}>Dairy</Link>
        <Link to="/Freezer" className={location.pathname === "/Freezer" ? "active" : ""}>Freezer</Link>
        <Link to="/Bakery" className={location.pathname === "/Bakery" ? "active" : ""}>Bakery</Link>
        <Link to="/LifeStyle" className={location.pathname === "/LifeStyle" ? "active" : ""}>Home & Lifestyle</Link>
        <Link to="/Baby" className={location.pathname === "/Baby" ? "active" : ""}>Baby</Link>
        <Link to="/Pet" className={location.pathname === "/Pet" ? "active" : ""}>Pet</Link>
      </div>
    </>
  );
};

export default Navbar;
