import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/Home" className="text-white text-xl font-bold">
          Online Shopping Mall
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-blue-600 md:bg-transparent w-full md:w-auto transition-all ${
            isOpen ? "top-16 left-0 p-4" : "hidden md:flex"
          }`}
        >
          <li>
            <Link to="/Meat" className="text-white block p-2 hover:bg-blue-500">
              Meat
            </Link>
          </li>
          <li>
            <Link to="/FruitVeg" className="text-white block p-2 hover:bg-blue-500">
              Fruit & Veg
            </Link>
          </li>
          <li>
            <Link to="/Dairy" className="text-white block p-2 hover:bg-blue-500">
              Dairy
            </Link>
          </li>
          <li>
            <Link to="/Fridge" className="text-white block p-2 hover:bg-blue-500">
              Fridge
            </Link>
          </li>
          <li>
            <Link to="/Bakery" className="text-white block p-2 hover:bg-blue-500">
              Bakery
            </Link>
          </li>
          <li>
            <Link to="/LifeStyle" className="text-white block p-2 hover:bg-blue-500">
              Home & Lifestyle
            </Link>
          </li>
          <li>
            <Link to="/Baby" className="text-white block p-2 hover:bg-blue-500">
              Baby
            </Link>
          </li>
          <li>
            <Link to="/Pet" className="text-white block p-2 hover:bg-blue-500">
              Pet
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
