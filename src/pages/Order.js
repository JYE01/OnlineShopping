import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Order.css';

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
          items: cart,
          delivery: `${address.street}, ${address.city}, ${address.state}`,
          totalPrice: totalCartPrice.toFixed(2),
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

  const totalCartPrice = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="order-form-container">
      <ToastContainer />
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity}
                  <br></br>
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  <img src={item.image}/>
                </li>
              ))}
            </ul>
            <p><strong>Total Price: ${totalCartPrice.toFixed(2)}</strong></p>
          </div>

          <div className="order-details">
            <div className="address-section">
              <label>
                Street Address:
                <input
                  type="text"
                  value={address.street || ""}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                City / Suburb:
                <input
                  type="text"
                  value={address.city || ""}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                State / Territory:
                <select
                  value={address.state || ""}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                >
                  <option value="">Select a state</option>
                  <option value="NSW">New South Wales (NSW)</option>
                  <option value="VIC">Victoria (VIC)</option>
                  <option value="QLD">Queensland (QLD)</option>
                  <option value="WA">Western Australia (WA)</option>
                  <option value="SA">South Australia (SA)</option>
                  <option value="TAS">Tasmania (TAS)</option>
                  <option value="ACT">Australian Capital Territory (ACT)</option>
                  <option value="NT">Northern Territory (NT)</option>
                </select>
              </label>
            </div>

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
