import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dairy = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 18;
  const { addToCart } = useCart();

  useEffect(() => {
    const productType = "Dairy"; 
    
    axios
      .get(`http://localhost/connect.php?type=${productType}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setDisplayedProducts(response.data.slice(0, productsPerPage));
        } else {
          console.error("Error: Expected an array but got", typeof response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const loadMore = () => {
    const start = page * productsPerPage;
    const newProducts = products.slice(0, start + productsPerPage);
    setDisplayedProducts(newProducts);
    setPage(page + 1);
  };

  const showLess = () => {
    setPage(1);
    setDisplayedProducts(products.slice(0, productsPerPage));
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1); 
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="home-container">
      <div className="title-search-container">
        <h1 className="title">🥛 Dairy</h1>
        <SearchBar />
      </div>
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${encodeURIComponent(product.name)}`} className="product-link">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
              <p className="product-quantity">Quantity: {product.quantity} —{" "}
                {product.quantity > 0 ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
                )}
              </p>
            </Link>
            {product.quantity > 0 && (
              <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
      {displayedProducts.length < products.length && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
      {displayedProducts.length >= 20 && (
        <button className="show-less" onClick={showLess}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default Dairy;
