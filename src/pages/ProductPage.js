import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import './Home.css';
import './ProductPage.css';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
      axios.get(`http://localhost/connect.php?product=${name}`)
        .then((res) => {
          if (res.data.length > 0) {
            const currentProduct = res.data[0];
            setProduct(res.data[0]);
            axios.get(`http://localhost/connect.php?type=${res.data[0].type}&random=true`)
              .then((relatedRes) => {
                const filtered = relatedRes.data.filter(item => item.id !== currentProduct.id);
                setRelatedProducts(filtered.slice(0, 10));
              })
              .catch((err) => console.error("Error fetching related products:", err));
          }
        })
        .catch((err) => console.error(err));
    }, [name]);

    const nextProduct = () => {
        if (currentIndex < relatedProducts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevProduct = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantityToAdd < product?.quantity) {
            setQuantityToAdd(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantityToAdd > 1) {
            setQuantityToAdd(prev => prev - 1);
        }
    };    

    const handleAddToCart = () => {
        if (quantityToAdd > product.quantity) {
            toast.error("Not enough stock available!");
          } else {
            addToCart(product, quantityToAdd);
            toast.success(`${product.name} added to cart!`);
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
                <h2 style={{textAlign:'left'}}>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>
                    Quantity: {product.quantity} —{" "}
                    {product.quantity > 0 ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
                    ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
                    )}
                </p>
                <div className="quantity-cart-wrapper">
                    <div className="quantity-controls">
                        <button onClick={decreaseQuantity} className="quantity-btn">−</button>
                        <input 
                            type="number" 
                            value={quantityToAdd} 
                            onChange={(e) => {
                                const stringValue = e.target.value;
                                if (stringValue === '') {
                                    setQuantityToAdd('');
                                    return;
                                }
                            
                                const value = parseInt(stringValue, 10);
                                if (!isNaN(value)) {
                                    const limit = Math.max(1, Math.min(value, product?.quantity));
                                    setQuantityToAdd(limit);
                                }
                            }}//avoid minus and exceeded numbers
                            min="1"
                            max={product?.quantity}
                            className="quantity-display"
                        />
                        <button onClick={increaseQuantity} className="quantity-btn">+</button>
                    </div>
                    {product.quantity > 0 ? (
                        <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                            Add {quantityToAdd} to Cart
                        </button>
                        ) : (
                        <button className="add-to-cart" style={{ backgroundColor: "red"}} disabled>
                            Unavailable
                        </button>
                    )}
                </div>
            </div>
            ) : (
            <p>Loading product...</p>
            )}

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
            <ToastContainer />
        </div>    
    );
};
  
export default ProductPage;
