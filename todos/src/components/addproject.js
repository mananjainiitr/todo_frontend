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
    useEffect(() => {
      axios.post("http://localhost:8000/todo/viewsets/project/",{
        "projtitle": "hiici",
        "wiki": "hiii",
        "creator": 2,
        "member": [2]},{
        headers: { 'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',}}
        
      ).then(function (response) {
        console.log(response);
    })}, [])
    return ("jrnjnr");}
    //     .then(
    //       (result) => {
    //         setIsLoaded(true);
    //         setItems(result['data']['results']);
    //         items = result['data']['results'];
    //         console.log(items);
            
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )
    // }, [])
  
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         //   <p>{items[1]['projtitle']}</p>
//         //   <p>hi</p>
//         <ul>
//           {items.map(item => (
//             <li key={item.id}>
//                 <a href = {"/list/?project="+item.id} >
//               {item['projtitle']}</a>
//             </li>
//           ))}
//         </ul>
//       );
//     }
//   }


  export default function Addproject()

  {   
     
    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');

    // localStorage.setItem("token",userName)
            // console.log(e);
    //    return (
    //        <form method="POST" action='addproject' id = "formpost">
    //            <input name = 'projtitle' id =  'projtitle' />
    //            <input name = 'wiki' id =  'wiki' />
    //            <div className="col-sm-10">
    //            <select name="creator">      
    //            <option value="2" selected="">admin@gmail.com</option>
    //            <option value="3">manan_j@ma.iitr.ac.in</option>
    //             </select>
    //             </div>
    //             <div className="col-sm-10">
    //             <select  name="member" multiple>
    //             <option value="2" selected="">admin@gmail.com</option>
    //             <option value="3">manan_j@ma.iitr.ac.in</option>
    //             </select>
    //             </div>
    //             <input type = 'submit'></input>
    //         </form>
    //    );
    return("nufcn");
  }
