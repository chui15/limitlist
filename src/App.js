import React, { useState } from 'react';
import ItemTable from './tables/item-table';
import AddItemForm from './forms/add-item';
import EditItemForm from './forms/edit-item';
import useDarkMode from 'use-dark-mode';
import DarkModeToggle from 'react-dark-mode-toggle';
import './index.css';

const App = () => {

  const listData = [
    { id: 1, name: 'Go to Seattle', category: 'Travel', completed: 'yes' },
    { id: 2, name: 'Make ram-don', category: 'Cooking', completed: 'no' },
    { id: 3, name: 'Watch Parasite', category: 'Personal', completed: 'yes' },
  ];

  const [items, setItems] = useState(listData);

  const addItem = item => {
    item.id = items.length + 1;
    setItems([...items, item]);
  };

  const deleteItem = itemID => {
    setEditing(false);
    setItems(items.filter(item => item.id !== itemID));
  }

  const [editing, setEditing] = useState(false);

  const initialForm = { id: null, name: '', category: '', completed: '' };

  const [currentItem, setCurrentItem] = useState(initialForm);

  const editItem = item => {
    setEditing(true);
    setCurrentItem({ id: item.id, name: item.name, category: item.category, completed: item.completed });
  }

  const updateItem = (itemID, updatedItem) => {
    setEditing(false);
    setItems(items.map(item => (item.id === itemID ? updatedItem : item)));
  }

  const darkMode = useDarkMode(false);

  return (
    <div className="container">
      <div className="row justify-content-end toggle">
        <DarkModeToggle
          onChange={darkMode.toggle}
          checked={darkMode.value}
          size={70}
          onClick={darkMode.enable}
        />
      </div>
      <div className="row justify-content-center">
        <h1>Limit List</h1>
      </div>
      <div className="row justify-content-center">
        <p>
          Limit List helps you manage your personal bucket list. With Limit List, the
          possibilities are limitless.
        </p>
      </div>
      <div className="row list-row">
        <div className="col-4 add-edit">
          {editing ? (
            <div>
              <h3>Edit Item</h3>
              <EditItemForm
                editing={editing}
                setEditing={setEditing}
                currentItem={currentItem}
                updateItem={updateItem}
              />
            </div>
          ) : (
            <div>
              <h3>Add New List Item</h3>
              <AddItemForm addItem={addItem} />
            </div>
          )}
        </div>
        <div className="col-8 list-items">
          <h3>My Personal Bucket List</h3>
          <ItemTable
            items={items}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
