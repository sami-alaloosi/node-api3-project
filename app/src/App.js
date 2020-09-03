import React, {useState, useEffect} from 'react';
import {Link, Route, Switch} from "react-router-dom"
import Post from "./Post"
import User from "./User"
import axios from "axios"
import './App.css';

const App = () => {
  

  return (
    <div className="App">
     
        

        <Switch>
        <Route  path="/Post">
        <Link to="/User" > USERS </Link>
         <Link to="/Post" > POSTS </Link>
          <Post />
        </Route>

        <Route path="/User">
        <Link to="/User" > USERS </Link>
         <Link to="/Post" > POSTS </Link>
          <User />
        </Route>

       

        </Switch>
        
      
    </div>
  );
}

export default App;
