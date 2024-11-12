import { useState } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { PlusCircle, Edit, Trash2 } from 'react-feather';

function App() {

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn" onClick={onOpenModal}>
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

      <Modal open={open} onClose={onCloseModal} center>
        <h2>Add User</h2>
        <div className="form">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="role">Role</label>
          <input type="text" name="role" />
          <label htmlFor="address">Address</label>
          <textarea name="address" id="" cols="30" rows="4"></textarea>
          <button className='btn'>Submit</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
