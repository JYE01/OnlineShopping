import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

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
    }
  }, [navigate]);

  console.log(userData);

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div>
      <h2>Welcome, {userData.name || userData.email}</h2>
      <p>Email: {userData.email}</p>
      <p>Account ID: {userData.id}</p>
      {/* You can add more user details here */}
    </div>
  );
};

export default Account;
