import { useState , useEffect} from 'react';

// import Avatar from '@mui/material/Avatar';
import { Avatar , Box  } from '@mui/material';

import axios from 'axios';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import DashButton from './dashButton';



const styles = {
    paperContainer: {
        height:"10vh",
        width :"10vh"
    },
    

};
    function MyComponent(token) 
    {
    
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        var [items, setItems] = useState([]);
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        // const { id1 } = useParams();
        // const { id2 }= useParams();
        const tokenid = token
        useEffect(() => {
          axios.get("http://localhost:8000/todo/mydata/data",{
            headers: { 'Authorization':tokenid,}
          })
            .then(
              (result) => {
                console.log(result);
                
                setItems(result['data']['results']);
                items = result['data']['results'];
                setIsLoaded(true);
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
            <header style={{background:'#FFFFFF'}}>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'space-between',borderBottom: 1}}>
                <Box  ><h3 style= {{color:'black' , textAlign:"center"}}>Hii {items[0]['name']}</h3></Box>
                <Box  ><h3 style= {{color:'black',paddingRight :"2vw"}}>TODO</h3></Box>
                <DashButton name = {items[0]['name']}/>
                {/* <Box><Link to="/todo/dashboard/project"><Avatar sx={{height:'100px',width:'100px',right:'80px'}} src="https://ver.to/wp-content/uploads/2021/08/oscar-1018x1024.png" /></Link></Box>                */}
            </Box>
        </header>
          );
        }
    }


export default function Header(props) {
    return(
      MyComponent(props.token)
    );
  }