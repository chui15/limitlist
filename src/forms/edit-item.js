import React, { useState, useEffect } from 'react';

const EditItemForm = props => {
  const [item, setItem] = useState(props.currentItem);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({...item, [name]: value });
  };

  useEffect(() => {
    setItem(props.currentItem);
  }, [props]);

  return (
    <form onSubmit={event => {
      event.preventDefault();
      props.updateItem(item.id, item);
    }}>
      <label>Name</label>
      <input type="text" name="name" value={item.name} onChange={handleInputChange} />
      <label>Category</label>
      <input type="text" name="category" value={item.category} onChange={handleInputChange} />
      <label>Completed</label>
      <input type="text" name="completed" value={item.completed} onChange={handleInputChange} />
      <button type="button" className="btn btn-primary edit-button">Update List Item</button>
      <button type="button" className="btn btn-secondary edit-button" onClick={() => props.setEditing(false)}>
        Cancel
      </button>
    </form>
  )
}

export default EditItemForm;
