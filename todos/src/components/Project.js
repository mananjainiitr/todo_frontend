import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
// import { CardContent} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box  } from '@mui/material';

import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import Deleteproject from './deleteproject';
import Header from './Header';
import Addproject from './addproject';
import AddprojectComp from './addProjComponent';
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
// import LoadingButton from '@mui/lab/LoadingButton';
function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }
function addprojfunc(isactive)
{
    if (!(isactive))
    {
        return (<AddprojectComp />)
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
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            console.log(items);
            
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
       if(isactive)
       {
           width = '100vw';
       }
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>PROJECTS</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
              <Link style={{textDecoration:"none",color:"black"}} to="/todo/project/addproject"><h3>ADD ➕</h3></Link>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
          <div style={{height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
          <Grid container spacing={2} style={{justifyContent:"space-between"}}>
          {addprojfunc(isactive)}    
          {/* <AddprojectComp /> */}
          <div style={{minwidth:"50vw",flexWrap:"wrap"}}>
            {items.map(item => (
            <li style={{width:width}} key={item.id}>
                <Box sx={{ minwidth:width,display:"flex",justifyContent:'right',margin:'0px'}}>
                <Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>
                 <Card sx={{minWidth:width,maxWidth:"800px",margin:'0px'}}><CardContent> 
                 <Grid container spacing={2}>
                     <Avatar style={{backgroundColor:"#1976d2",fontSize:"70px",width:"100px",height:"100px",margin:"20px"}} variant="rounded">
                     {((item['projtitle']).slice(0,1)).toUpperCase()}
                     </Avatar>  
                     <Typography style={{padding:"20px"}} sx={{color:'#2185d0'}} variant="h4" component="div">{item['projtitle']}
                     <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary"component="h1" variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: item['wiki']}}></Typography>
                     {/* <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary">Wiki : {item['wiki']}</Typography> */}
                     
                     <Typography style={{fontSize:"11px"}}>Creator : {item['creator']['name']}</Typography></Typography> </Grid>
                     {/* <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions> */}
                     </CardContent>
                     </Card></Link><br></br></Box><br></br>
              
            </li>
          ))}</div></Grid>
          </div>
        </ul></div></>
      );
    }
  }
  

  export default function Project()

  {    
    
    const search = useLocation().search;
    const userName = new URLSearchParams(search).get('Token');
    if(userName){
    localStorage.setItem("token",userName)}
   
    
            console.log(localStorage.getItem("token"));
       return (MyComponent());
  }
