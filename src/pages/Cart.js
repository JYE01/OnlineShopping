import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (!existingItem) {
      acc.push({ ...item });
    } 
    return acc;
  }, []);

  const itemCounts = groupedItems.map((item) => {
    const count = cart.filter((cartItem) => cartItem.name === item.name).length;
    return {
      ...item,
      count,
    };
  });

  const totalItems = cart.length;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {groupedItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {itemCounts.map((item, index) => (
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
                <p>Added to cart: {item.count}</p>
              </div>
            </div>
          ))}
          <div className="total-items">
            <h3>Total items in cart: {totalItems}</h3>
          </div>
        </div>
      )}
      <button className="place-order-button" onClick={() => navigate("/Order")}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;
