import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
function MyComponent() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    var token = localStorage.getItem("token");
    const search = useLocation().search;
    const projid = new URLSearchParams(search).get('project');
    const listid = new URLSearchParams(search).get('list');
    console.log(projid);
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project/id/"+projid+"/list/id/"+listid+"/card",{
        headers: { 'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',}
      })
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            // console.log(items);
            
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        <ul>
          {items.map(item => (
            <li key={item.id}>
                <a href = {"/project/id/"+item.id+"/list"} >
              {item['cardtitle']}</a>
            </li>
          ))}
        </ul>
      );
    }
  }

  export default function Card()

  {    
    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
     console.log("hi");
       return (MyComponent());
  }