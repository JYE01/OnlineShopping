import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");
  const orderNumber = `ORD-${Date.now()}`;

  const groupedItems = cart.reduce((acc, item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  const validateCardDetails = () => {
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      toast.warn("Please fill in all card details.", { autoClose: 3000 });
      return false;
    }
    if (cardNumber.length < 12 || cardNumber.length > 19) {
      toast.warn("Card number is invalid.", { autoClose: 3000 });
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.warn("Expiry should be in MM/YY format.", { autoClose: 3000 });
      return false;
    }
    if (cvv.length !== 3) {
      toast.warn("CVV should be 3 digits.", { autoClose: 3000 });
      return false;
    }
    return true;
  };

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.warn("Please enter a delivery address!", { autoClose: 3000 });
      return;
    }

    if (!validateCardDetails()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost/connect.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "place_order",
          email,
          orderNumber,
          items: groupedItems,
          delivery: address,
          payment: {
            cardNumber,
            expiry,
            cvv,
          },
        }),
      });
      
      const rawText = await res.text();
      console.log("Raw response:", rawText);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        data = {};
      }
      console.log("Parsed data:", data);
     //const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Order placed successfully!", { autoClose: 3000 });
        setCart([]);
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error(data.message || "Order failed!", { autoClose: 3000 });
      }
    } catch (err) {
      setLoading(false);
      toast.error("Server error. Please try again later.", { autoClose: 3000 });
    }
  };

  return (
    <div className="order-form-container">
      <ToastContainer />
      <h2>Checkout</h2>

      {groupedItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {groupedItems.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.count}
                  <img src={item.image}/>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-details">
            <label>
              Delivery Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            <h3>Payment Info</h3>
            <label>
              Card Number:
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
              />
            </label>
            <label>
              Expiry (MM/YY):
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
              />
            </label>

            <button onClick={handleOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
