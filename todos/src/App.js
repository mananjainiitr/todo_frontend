import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import todos from  "components/todos";
// import Button from './components/button';
import Login from './components/Login';
import Project from './components/Project';
import List from './components/List';
import Card from './components/Card';
import Addproject from './components/addproject';
import  Header  from './components/Header';
export default function App() {
  return (<Router>
      <Header />
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/todo/login">Login</Link>
            </li>
            <li>
              <Link to="/todo/project">Project</Link>
            </li>
            <li>
              <Link to="/todo/addproject">Add Project</Link>
            </li>
            <li>
              <Link to="/todo/users">Users</Link>
            </li>
          </ul>
        </nav> */}
        <Switch> 
          <Route path="/todo/project/id/:id/list">
          <List />
        </Route> 
        <Route path="/todo/login">
          <Login />
        </Route>
        <Route path="/todo/project">
          <Project />
        </Route>
        {/* <Route path="/todo/users">
          <Button />
        </Route> */}
       
        <Route path="/todo/card">
          <Card />
        </Route> 
        <Route path="/todo/addproject">
          <Addproject />
        </Route> 
        <Route path="/">
          
        </Route>
      </Switch>
    </div>
  </Router>
);
}  
