import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    console.log(email);

    if (!email) {
      navigate('/Login');
    } else {
      fetch("http://localhost/connect.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'get_user', email })
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.success) {
            setUserData(data.user);
          } else {
            console.error(data.message);
            navigate('/Login');
          }
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });

        fetch("http://localhost/connect.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ action: 'get_order', email })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setOrders(data.orders);
            } else {
              console.error(data.message);
            }
          })
          .catch(err => {
            console.error('Error fetching order data:', err);
          });
    }
  }, [navigate]);

  console.log(userData);

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/Home');
  };

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div className="account-container">
      <div className="user-card">
        <h2>Welcome, {userData.firstName || userData.email}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Account ID:</strong> {userData.id}</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <h3 className="sub-heading">Orders</h3>
        {orders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4 style={{color: 'red'}}>Order #{order.orderNumber}</h4>
              <p><strong>Paid:</strong> ${order.totalPrice}</p>
              <p><strong>Delivery:</strong> {order.delivery}</p>
              <div className="items-container">
                {order.items.map((item, i) => (
                  <div key={i} className="item-card">
                    <div className="item-info">
                      <p><strong>{item.name}</strong></p>
                      <p>Price: ${item.price}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p><strong>Order date:</strong> {order.created_at}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Account;
