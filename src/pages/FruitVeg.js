import React, { useEffect, useState } from "react";
import axios from "axios";

const FruitVeg = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productType = "FruitVeg"; 
    
    axios
      .get(`http://localhost/connect.php?type=${productType}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Fruit & Vegetables</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FruitVeg;
