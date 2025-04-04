import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import './navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="topnav">
      <div className="nav-left">
        <Link to="/Home" className={location.pathname === "/Home" ? "active" : ""}>Home</Link>
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
          <User size={20} style={{ verticalAlign: "middle", marginRight: "5px" }} />
          Account
        </Link>
        <Link to="/Cart" className={location.pathname === "/Cart" ? "active" : ""}>
          <ShoppingCart size={20} style={{ verticalAlign: "middle", marginRight: "5px" }} />
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
