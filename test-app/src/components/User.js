import React, { useState } from 'react'
import { Card, CardHeader, Typography, CardContent, CardActionArea, TextField, Button } from '@material-ui/core'
import Axios from 'axios'
import { default as Delete } from '@material-ui/icons/Cancel'

const User = ({ user, edit, remove, error }) => {
  const [editing, setEditing] = useState(false)
  const [edited, setEdited] = useState({ ...user })
  const handleChange = e => {
    setEdited({ ...edited, [e.target.name]: e.target.value })
  }
  const editUser = e => {
    e.preventDefault()
    Axios.put(`http://localhost:5000/api/users/${user.id}`, edited)
      .then(res => {
        setEditing(false)
        edit(res.data)
      })
      .catch(err => {
        error(err.response.data.message || err.response.data.errorMessage)
      })
  }

  const deleteUser = e => {
    e.stopPropagation()
    Axios.delete(`http://localhost:5000/api/users/${user.id}`)
      .then(res => {
        setEditing(false)
        remove(user.id)
      })
      .catch(err => {
        error(err.response.data.message || err.response.data.errorMessage)
      })

  }

  const styles = {
    largeIcon: {
      width: 100,
      height: 100
    }
  }


  return (
    <Card>
      {!editing ? (
        <CardActionArea onClick={() => setEditing(true)}>
          <Typography variant='h2' style={{ position: 'relative' }}>
            {user.name}
            <Delete style={{ position: 'absolute', right: '25%' }} onClick={deleteUser} fontSize='large' />
          </Typography>
          <Typography variant='p'>
            {user.bio}
          </Typography>

        </CardActionArea>)
        : (
          <CardContent>
            <TextField name='name' value={edited.name} onChange={handleChange} />
            <TextField name='bio' value={edited.bio} onChange={handleChange} />
            <Button onClick={editUser}>Save</Button>
            <Button onClick={() => setEditing(false)}>Cancel</Button>
          </CardContent>
        )}

    </Card>
  )
}

export default User