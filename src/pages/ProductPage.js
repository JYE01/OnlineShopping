import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Link, useParams } from "react-router-dom";
import './Home.css';
import './ProductPage.css';

const ProductPage = () => {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track the index of related products to display
  
    useEffect(() => {
      // Fetch the current product
      axios.get(`http://localhost/connect.php?product=${name}`)
        .then((res) => {
          if (res.data.length > 0) {
            setProduct(res.data[0]);
            // Fetch related products of the same type
            axios.get(`http://localhost/connect.php?type=${res.data[0].type}`)
              .then((relatedRes) => {
                setRelatedProducts(relatedRes.data.slice(0, 10)); 
              })
              .catch((err) => console.error("Error fetching related products:", err));
          }
        })
        .catch((err) => console.error(err));
    }, [name]);

    // Handle "Next" button click
    const nextProduct = () => {
        if (currentIndex < relatedProducts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Handle "Previous" button click
    const prevProduct = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="home-container" style={{ padding: "20px" }}>
            <div className="title-search-container">
                <SearchBar />
            </div>
            {product ? (
            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
            ) : (
            <p>Loading product...</p>
            )}

            {/* You may also like section */}
            {relatedProducts.length > 0 && (
                <div className="related-products">
                    <h3>You may also like</h3>
                    <div className="related-products-scroll">
                        <button 
                            onClick={prevProduct} 
                            disabled={currentIndex === 0} 
                            className="prev-button"
                        >
                            &lt; Prev
                        </button>

                        <div className="product-cards-container">
                            {relatedProducts.slice(currentIndex, currentIndex + 5).map((relatedProduct) => (
                                <Link to={`/product/${encodeURIComponent(relatedProduct.name)}`}
                                    className="product-card" 
                                    key={relatedProduct.id}
                                    style = {{textDecoration: "none", color: "black"}}
                                >
                                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                                    <h4>{relatedProduct.name}</h4>
                                    <p>Price: ${relatedProduct.price}</p>
                                </Link>
                            ))}
                        </div>

                        <button 
                            onClick={nextProduct} 
                            disabled={currentIndex + 3 >= relatedProducts.length} 
                            className="next-button"
                        >
                            Next &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>    
    );
};
  
export default ProductPage;
