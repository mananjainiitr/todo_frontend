import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import {  Box  } from '@mui/material';
import { Link, Redirect, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';

import TextField from '@material-ui/core/TextField';
import Deletecard from './deletecard';
import Header from './Header';
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
import AddCardComp from './addCardComp';
import ListData from './listData';
import UserProfile from './userprofile';
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });
  
  function DateAndTimePickers(datee , typee) {
    const { type } = typee
    // console.log("dat"+datee);

    let str = datee
    str = str.slice(0,16);
    console.log(str);
  
    return (
      <form noValidate>
        <TextField
          id="datetime-local"
          label = { type }
          type="datetime-local"
          defaultValue= {str}
        />
      </form>
    );
  }
  
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
function MyComponent(number) {
    var width = "40vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    var token = localStorage.getItem("token");
    const { id1 } = useParams();
    const { id2 }= useParams();
    const tokenid = localStorage.getItem("token");
    
    useEffect(() => {
        axios.get("http://localhost:8000/todo/dashbord/card/?page="+number,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            // console.log(items);
            // setpageCount(result['data']['count']);
            
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
        if(isactive){
            width = "100vw"
        }
      return (
        <>
        
        <div style={{minwidth:width,flexWrap:"wrap"}}>
          
         
          {items.map(item => (
          <li style={{minwidth:width,margin:"0px"}} key={item.id}>
              <Box style={{ minwidth:width,display:"flex",justifyContent:'right',margin:'2px',padding:"0px"}}>
              
               <Card style={{minWidth:width,maxWidth:"800px",margin:'0px',padding:"8px"}}><CardContent style = {{padding:"8px"}}> 
               <Grid container spacing={2}>
               <Avatar style={{backgroundColor:"#1976d2",fontSize:"70px",width:"100px",height:"100px",margin:"20px"}} variant="rounded">
                   {((item['cardtitle']).slice(0,1)).toUpperCase()}
                   </Avatar>
                   <Typography style={{padding:"20px",color:"black"}} sx={{color:'#2185d0'}} variant="h5" component="div">{item['cardtitle']}
                   <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary">Desc : {item['desc']}</Typography>
                   <Typography style={{fontSize:"11px",color:"black"}}>By : {item['creator']['name']}<Typography type="date" >{item['due_date'].slice(0,10)}</Typography></Typography>
                   <br></br>
                   </Typography> </Grid>
                  
            
                   {/* <CardActions>
                   <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                   <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                   <Deleteproject id={item.id} />
                   </CardActions> */}
                   </CardContent>

                   </Card></Box>
            
          </li>
        ))}</div></>
      );
    }
  }

  export default function DashCardDisplay(props)

  {    
    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
    //  console.log("hi");
       return (MyComponent(props.number));
  }