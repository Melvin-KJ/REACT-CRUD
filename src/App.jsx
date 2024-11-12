import { useState } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';

function App() {
  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn">
          <PlusCircle size={16}>
            <span>Add</span>
          </PlusCircle>
        </button>
      </div>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Melvin</td>
            <td>melvinxyz@gmail.com</td>
            <td>Frontend Developer</td>
            <td>123, MG Road, Kochi, Kerala</td>
            <td>
              <button className="btn ml2">
                <Edit size={16}></Edit>
                <span>Edit</span>
              </button>
              <button className="btn ml2">
                <Trash2 size={16}></Trash2>
                <span>Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
