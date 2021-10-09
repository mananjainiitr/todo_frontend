import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
// import { CardContent} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar , Box , Divider  } from '@mui/material';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
function MyComponent(id1) {
    const id = id1
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // var [email , setEmail] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project/"+id,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            
            items = result['data'];
            // email = items['creator']['email'];
            setItems(result['data']);
            // setEmail = (items['creator']['email']);
            setIsLoaded(true);
            // console.log(items['creator']['email']);
            
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
      console.log(items);
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
          
            <li key={items.id}>
                <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
                 <Card sx={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
                     <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{items['projtitle']}</Typography> 
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">{items.wiki}</Typography>
                     <Typography variant="body2">Creator : {items['creator']['email']}</Typography>
                     <Typography variant="body2">Members :</Typography>
                     {items["member"].map(item =>(
                      <Button varient="contained" style={{backgroundColor:"rgb(242, 244, 247)",margin:"3px",border:"1px solid black"}} >{item['email']}</Button>
                     ))}
                     {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">{items['member']}</Typography> */}
                     <CardActions>
                     <Button size="small"><Link sx={{textDecoration:'None'}} to={"/todo/project/id/"+items.id+"/list"}>View List</Link></Button>
                     
                     </CardActions>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          
        </ul></div>
      );
    }
  }
  export default function  Projdetail(props) {
    return(
        MyComponent(props.id)
    )
}
