import React, { useState } from 'react';

const AddItemForm = props => {

  const itemFormInitial = { id: null, name: '', category: '', completed: '' };
  const [item, setItem] = useState(itemFormInitial);

  const errorMessage = '';
  const [error, setMessage] = useState(errorMessage);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <form>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleInputChange}
      />
      <label>Category</label>
      <input
        type="text"
        name="category"
        value={item.category}
        onChange={handleInputChange}
      />
      <label>Completed</label>
      <input
        type="text"
        name="completed"
        value={item.completed}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="btn btn-success add-button"
        onClick={event => {
          event.preventDefault();
          if (!item.name || !item.category || !item.completed) {
            setMessage('All input fields must contain a value.');
            setTimeout(() => {
              setMessage('');
            }, 4000);
            return null;
          }
          props.addItem(item);
          setItem(itemFormInitial);
        }}>
        Add New Item
      </button>
      <p className="error-message">{error}</p>
    </form>
  );
}

export default AddItemForm;
