import React, { useState } from 'react'
import axios from 'axios'

const CreateProduct = () => {
  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost/connect.php", inputs)
      .then(response => {
        console.log("Server Response:", response.data);
        console.log(inputs);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>
              <label>Name: </label>
              </th>
              <td>
              <input type = "text" name = "name" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
              <label>Price: </label>
              </th>
              <td>
              <input type = "text" name = "price" onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <th>
              <label>Quantity: </label>
              </th>
              <td>
              <input type = "text" name = "quantity" onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <th>
              <label>Type: </label>
              </th>
              <td>
              <input type = "text" name = "type" onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td>
              <button>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default CreateProduct