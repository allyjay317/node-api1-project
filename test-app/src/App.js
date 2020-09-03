import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/User';
import Axios from 'axios';
import { Button, TextField } from '@material-ui/core';

function App() {
  const [users, setUsers] = useState([])
  const [adding, setAdding] = useState(false)
  const [newUser, setNewUser] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res)
        setUsers(res.data)
      })
  }, [])

  const handleChange = e => setNewUser({ ...newUser, [e.target.name]: e.target.value })
  const addNewUser = e => {
    e.preventDefault()
    Axios.post('http://localhost:5000/api/users', newUser)
      .then(res => {
        console.log(res)
        setAdding(false)
        setNewUser({})
        setError('')
        setUsers([...users, res.data])
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.message || err.response.data.errorMessage)
      })
  }

  const editUser = res => {
    setUsers(users.map(user => user.id === res.id ? res : user))
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="App">
      <Button onClick={() => setAdding(!adding)}>{adding ? 'Cancel' : 'Add New User'}</Button>
      {adding ? (
        <form onSubmit={addNewUser}>
          <TextField name='name' label='name' onChange={handleChange} value={newUser.name} />
          <TextField name='bio' label='bio' onChange={handleChange} value={newUser.bio} />
          <Button onClick={addNewUser}>Add!</Button>
        </form>
      ) : <></>}
      {error && <p>{error}</p>}
      {users.map(user => <User user={user} edit={editUser} remove={deleteUser} error={setError} />)}


    </div>

  );
}

export default App;
