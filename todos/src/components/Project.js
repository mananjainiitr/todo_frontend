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
import { Box, Pagination  } from '@mui/material';

import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import Deleteproject from './deleteproject';
import Header from './Header';
import Addproject from './addproject';
import AddprojectComp from './addProjComponent';
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
import ProjectDisplay from './projectdisplay';
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
function projectReq(number)
{
    console.log(number)
   
   return(<ProjectDisplay key ={number} number={number}/>)
   
}
function MyComponent() {
    var width = "52vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // var pageCount ;
    const [page, setPage] = React.useState(1);
    const [pageCount, setpageCount] = React.useState(1);
    const handleChange = (event, value) => {

        setPage(value);
        // setIsLoaded(false);
        
    };
    // MyComponent()
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project?page="+page,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            
            setItems(result['data']['results']);
            items = result['data']['results'];
            setpageCount(result['data']['count']);
            console.log(pageCount);
            console.log(items);
            setIsLoaded(true);
            console.log(isLoaded);
            
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
        <div>

        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>PROJECTS</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
             {isactive && <Link style={{textDecoration:"none",color:"black"}} to="/todo/project/addproject"><h3>ADD ➕</h3></Link>}
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
          <div style={{maxWidth:"100vw",overflowX:"hidden",height:"85vh",listStyleType:'None',overflowY:"scroll",margin:'1vw'}}>
          
          <Grid container spacing={2} style={{justifyContent:"space-between"}}>
              <div>
              <div style = {{position:"fixed"}}>
          {addprojfunc(isactive)}    </div></div>
          {/* <AddprojectComp /> */}
          <div>
          {projectReq(page)}  
          <Box style = {{width:width}}>
          <Typography style={{marginLeft:'10px'}}>Page: {page}</Typography>
          <Pagination count={Math.ceil(pageCount/5)} page={page} onChange={handleChange} /><br/><br/></Box></div>
         </Grid>
        
         
         
          </div>
        </ul></div></div>
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
