import { useState, useEffect } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { PlusCircle, Edit, Trash2 } from 'react-feather';

function App() {
  const blankUser = {
    name: '',
    email: '',
    role: '',
    address: '',
  };

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(blankUser);
  const [userdata, setUserdata] = useState([]);
  const [action, setAction] = useState('Add');
  const [editIndex, setEditIndex] = useState(null);

  //Fetch users from API
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) =>
        setUserdata(
          data.filter(
            (user) => user.name && user.email && user.role && user.address
          )
        )
      )
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
  };
  const addUser = () => {
    //form validation to check if all fields are filled out before allowing submission
    if (!user.name || !user.email || !user.role || !user.address) {
      alert('Please fill in all fields');
      return;
    }
    //add new user to the server
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUserdata([...userdata, newUser]);
        setUser(blankUser);
        onCloseModal();
      });
  };

  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = userdata[index];
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };

  const updateUser = () => {
    // Update user on the server

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        const newUsers = userdata.map((u) =>
          u.id === updatedUser.id ? updatedUser : u
        );
        setUserdata(newUsers);
        setUser(blankUser);
        setEditIndex(null);
        onCloseModal();
      });
  };

  const deleteUser = (index) => {
    const userId = userdata[index].id;
    fetch(`http://localhost:3001/users/${userId}`, {
      method: 'DELETE',
    }).then(() => {
      setUserdata(userdata.filter((_, i) => i !== index));
    });
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn btn-p" onClick={onOpenModal}>
          <PlusCircle size={16}>
            <span>Add</span>
          </PlusCircle>
        </button>
      </div>
      <hr />
      {/* <p>{JSON.stringify(userdata)}</p> */}

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
          {userdata.length > 0 &&
            userdata.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="btn ml2" onClick={() => editUser(index)}>
                      <Edit size={16}></Edit>
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn ml2"
                      onClick={() => deleteUser(index)}
                    >
                      <Trash2 size={16}></Trash2>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        {/* <p>{JSON.stringify(user)}</p> */}
        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            name="name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name="email"
          />
          <label htmlFor="role">Role</label>
          <input
            type="text"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            name="role"
          />
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            id=""
            cols="30"
            rows="4"
          ></textarea>
          {action === 'Add' && (
            <button className="btn" onClick={addUser}>
              Submit
            </button>
          )}
          {action === 'Edit' && (
            <button className="btn" onClick={updateUser}>
              Update
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
