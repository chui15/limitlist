import React from 'react';

const ItemTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Completed</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.items.length > 0 ? (
        props.items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.completed}</td>
            <td>
              <button type="button" className="btn btn-info action-button" onClick={() => props.editItem(item)}>Edit</button>
              <button type="button" className="btn btn-danger action-button" onClick={() => props.deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
          <tr>
            <td colSpan={3}>No Items</td>
          </tr>
      )}
    </tbody>
  </table>
)

export default ItemTable;
