import React, {useState, useEffect} from 'react';
// import {} from "rea"
import axios from "axios"
import './App.css';

const Post = () => {
  const [users, setUsers] = useState([])
  const [addName, setAddname] = useState("")
  const [addBio, setAddBio] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updateBio, setUpdateBio] = useState("")
  const [updateID, setUpdateID] = useState("no")
  useEffect(()=>{
    axiosUsersGet()
  }, [])


 

  const axiosUsersGet = () => {
    axios.get('http://localhost:8000/api/post')
    .then(res=> setUsers(res.data))
    .catch(err=> console.log(err))
  }

  const update = (event) =>{
    const {name, value} = event.target
    if(name === "addName") {
      setAddname(value)
    } else if(name === "addBio"){
      setAddBio(value)
    } else if(name === "updateName"){
      setUpdateName(value)
    } else if(name === "updateBio"){
      setUpdateBio(value)
    }
  }

  const submitAdd = (event) =>{
    event.preventDefault()
    axios.post('http://localhost:8000/api/users', {name: addName} )
    .then(()=>{
      axiosUsersGet()
      setAddname("")
      setAddBio("")
    })
    .catch(err=> console.log(err))
  }
  
  const axiosDelete = (deleteId) =>{
    axios.delete(`http://localhost:8000/api/post/${deleteId}`)
    .then(()=> axiosUsersGet())
    .catch((err)=> console.log(err))
  }

  const submitUpdate = (event, updateID) =>{
    event.preventDefault()
    axios.put(`http://localhost:8000/api/post/${updateID}`, {text: updateName} )
    .then(()=>{
      axiosUsersGet()
      setUpdateName("")
      setUpdateBio("")
      setUpdateID("no")
    })
    .catch(err=> console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          users.map(user => {
           return <div key={user.id} className="red">
              <div>
                text: {user.text}
              </div>
              
              <button onClick={()=>axiosDelete(user.id)}>Delete</button>
              <button onClick={()=> updateID === user.id? setUpdateID("no"): setUpdateID(user.id)}>Update</button>

              <div className={user.id === updateID ? "show" : "no-show"}>
              <form onSubmit={(e)=>submitUpdate(e, updateID)} >
          <label>
            <input 
            type="text"
              name="updateName"
              id="updateName"
              placeholder="Update User Name"
              value={updateName}
              onChange={update}
            />
          </label>
          
          <button type="submit">Update User Information</button>
        </form>
              </div>
            </div>
          })
        }
        
      </header>
    </div>
  );
}

export default Post;
