/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then((data) => {
        setUsers(data)
      })
  })

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user)
    fetch('http://localhost:5000/users',{
      method:'POST', 
      headers:{
        "Content-Type": "application/json",
        },
        body : JSON.stringify(user)
    })
    .then (response=> response.json ())
    .then ((data)=> 
    {
      const newUsers = [...users, data];
      setUsers(newUsers);
      form.reset()
    }
    )

  }

  return (
    <>
      <h1>Hello World</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <input type="text" name="email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <h1>Total Data {users.length}</h1>
      <div>
        {
          users.map(user => <p key={user.id}>
            {user.id} : {user.name} : {user.email}
          </p>)
        }
      </div>


    </>
  )
}

export default App
