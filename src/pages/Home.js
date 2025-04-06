import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 18;

  useEffect(() => {
    const productType = ""; 
    
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

  return (
    <div className="home-container">
      <div className="title-search-container">
        <h1 className="title">🛒 Supermarket - Shop Online</h1>
        <SearchBar />
      </div>
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <Link to={`/product/${encodeURIComponent(product.name)}`} className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-quantity">Stock: {product.quantity}</p>
            <button className="add-to-cart">Add to Cart</button>
          </Link>
        ))}
      </div>
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

export default Home;
