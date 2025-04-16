import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = cart.length;

  useEffect(() => {
    axios
      .get("http://localhost/connect.php?random=true")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRelatedProducts(response.data.slice(0, 10));
        } else {
          console.error("Expected array but got:", typeof response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      });
  }, []);  

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

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="total-items">
              <h3>{totalItems} Differrent items in cart</h3>
            </div>
          </div>
          <button className="place-order-button" onClick={() => navigate("/Order")}>
            Place Order
          </button>
        </>
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
    </div>
  );
};

export default Cart;
