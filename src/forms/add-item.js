import React, { useState } from 'react';

const AddItemForm = props => {

  const itemFormInitial = { id: null, name: '', category: '', completed: '' };
  const [item, setItem] = useState(itemFormInitial);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <form onSubmit={event => {
      event.preventDefault();
      if (!item.name || !item.category || !item.completed) return;
      props.addItem(item);
      setItem(itemFormInitial);
    }}>
      <label>Name</label>
      <input type="text" name="name" value={item.name} onChange={handleInputChange}/>
      <label>Category</label>
      <input type="text" name="category" value={item.category} onChange={handleInputChange}/>
      <label>Completed</label>
      <input type="text" name="completed" value={item.completed} onChange={handleInputChange}></input>
      <button type="button" className="btn btn-success add-button">Add New Item</button>
    </form>
  );
}

export default AddItemForm;
