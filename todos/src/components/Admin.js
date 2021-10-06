import { Card } from "@material-ui/core";
import { Box, Button, CardContent, Icon, SvgIcon } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }
function MyComponent()
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/user/info",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            console.log(items);
            
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
    return(
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
              <CardContent sx={{color:"white"}}>PROJECTS</CardContent>
          <Button onClick >
              <Link to="/todo/project/addproject">
              <Icon sx={{ fontSize: 30 , color:'white'}}>add_circle</Icon></Link>
          </Button>
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>         
          </Box></Box>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
        {items.map(item => (
        <li style={{minWidth:"50vw"}} key={item.id}>
        <Box style={{ width:'100vw',display:"flex",justifyContent:'center',margin:'10px'}}>
         <Card style={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent>
        <form>
        <h6>{item["email"]}</h6>
        <input type="checkbox" checked = {item["is_active"]}></input>
        </form></CardContent></Card></Box></li>) )}
        </div></ul></div></>
        );
}


export default function Admin()

{    
     return (MyComponent());
}