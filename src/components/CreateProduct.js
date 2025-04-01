import React, { useState } from 'react'

const CreateProduct = () => {
  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
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
              <label>In stock: </label>
              </th>
              <td>
              <input type = "text" name = "inStock" onChange={handleChange} />
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