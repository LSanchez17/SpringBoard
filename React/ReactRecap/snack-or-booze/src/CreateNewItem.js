import React, { useState } from 'react';
import "./FoodMenu.css";


const CreateNewItem = () => {
    const [formData, setFormData] = useState([]);

  const handleSubmit = () => {
      //submit form
      return;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='form-control'>
        <div className='form-group'>
          <label htmlFor='id'>id:</label>
          <input type='text' name='id' id='id' required></input>

          <label htmlFor='name'>name:</label>
          <input type='text' name='name' id='name' required></input>
          
          <label htmlFor='description'>description:</label>
          <input type='text' name='description' id='description' required></input>
          
          <label htmlFor='recipe'>recipe:</label>
          <input type='text' name='recipe' id='recipe' required></input>

          <label htmlFor='serve'>serve:</label>
          <input type='text' name='serve' id='serve' required></input>

          <label htmlFor='type'>Snack or Drink:</label>
          <input type='text' name='type' id='type' required></input>

          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewItem;
