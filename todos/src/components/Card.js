import axios from 'axios'

import React, { useState, useEffect } from 'react';

import {  Box  } from '@mui/material';
import { Link,  useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';

import TextField from '@material-ui/core/TextField';
import Deletecard from './deletecard';
import Header from './Header';
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
import AddlistComp from './addListComp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCardComp from './addCardComp';
import ListData from './listData';
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
      <Link to="/todo/project">
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon></Link>
    );
  }
  function addcardfunc(isactive)
{
    if (!(isactive))
    {
        return (<AddlistComp />)
    }
}
function MyComponent() {
    var width = "50vw";
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
      axios.get("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/id/"+id2+"/card",{
        headers: { 'Authorization':tokenid,}
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
      if (isactive)
      {
        width = "100vw"
      }
      return (
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
        <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>Cards</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
              <Link style={{textDecoration:"none",color:"black"}} to={"/todo/project/id/"+id1+"/list/id/"+id2+"/addcard"}><h3>ADD ➕</h3></Link>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
       
          {/* <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
          {items.map(item => (
            <li key={item.id}>
                <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
                 <Card sx={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
                     <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{item['cardtitle']}</Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">{item['desc']}</Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">Start Date : {DateAndTimePickers(item['start_date'],"Start date :")}</Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">Due Date : {DateAndTimePickers(item['due_date'],'Due Date :')}</Typography>
                     <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'None'}} to={"/todo/project/id/"+id1+"/list/id/"+id2+"/cards"}>View Assigned Members</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+id1+"/list/id/"+id2+"/cards/id/"+item.id}>Update</Link></Button> 
                     <Deletecard id1={id1} id2={id2} id3={item.id}/>
                     </CardActions>
                     <Typography variant="body2"><h5>Created By : {item['creator']['name']}</h5></Typography>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          ))}
          </div> */}
          <div style={{height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
          <Grid container spacing={2} style={{justifyContent:"space-between"}}>
          {addcardfunc(isactive)}
          <div style={{minwidth:width,flexWrap:"wrap"}}>
            <h3 style={{paddingLeft:'10px'}}>List Details</h3>
            <ListData id1={id1} id2={id2} />
            <h3 style={{paddingLeft:'10px'}}>Cards</h3>
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
                     <Typography style={{fontSize:"11px",color:"#2185d0"}}>By : {item['creator']['name']}<Typography type="date" >{item['due_date'].slice(0,10)}</Typography></Typography>
                     <br></br>
                     <Grid container spacing={4}>{item['assigned_member'].map(
                       member=>(
                        <Button sx={{ border: 1 }} style={{backgroundColor:"#FFFFF",marginLeft:"2px"}} varient="contained">{member["name"]}</Button>
                       )
                     )}</Grid>
                     </Typography> </Grid>
                     <br></br>
                     <br></br>
                     <Grid container spacing={2}>
                     <Button variant="contained" style={{backgroundColor:"#ACD1AF"}}size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+id1+"/list/id/"+id2+"/cards/id/"+item.id}>Update</Link></Button>
                     <Deletecard id1={id1} id2={id2} id3={item.id}/></Grid>
                     {/* <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions> */}
                     </CardContent>

                     </Card></Box>
              
            </li>
          ))}</div></Grid>
          </div>
        </ul></div></>
      );
    }
  }

  export default function Cards()

  {    
    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
     console.log("hi");
       return (MyComponent());
  }