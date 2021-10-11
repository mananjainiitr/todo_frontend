import React, { useState , useEffect} from 'react';
import { Button, CardActions, CardContent, Pagination, Typography } from '@mui/material';
import { Avatar, Card, Grid, useMediaQuery} from "@material-ui/core";
// import Avatar from '@mui/material/Avatar';
import { Box  } from '@mui/material';

import axios from 'axios';
import { Link } from 'react-router-dom';

import DashProjDisplay from './dashProjDisplay';
import Header from './Header';
import AddprojectComp from './addProjComponent';
import UserProfile from './userprofile';
import DashCards from './dashcard';


function projReq(number)
{
    console.log(number+"b")
  return ( <DashProjDisplay key={number} number={number}/>)
}
function ProjectComp(name , email , year , is_admin) {
    
    var width = "40vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    const [pageCount, setpageCount] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    console.log(tokenid);
    useEffect(() => {
      axios.get("http://localhost:8000/todo/dashbord/project",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            setpageCount(result['data']['count']);
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
      return (<>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>DASHBOARD</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
              <h3>Profile&nbsp;</h3>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
          <div style={{height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
          <Grid container spacing={2} style={{justifyContent:"space-between"}}>
          <UserProfile  name={name} email={email} year={year} is_admin={is_admin} />
          <div style={{width:"100vw"}}>
              <Grid container spacing={2} style={{justifyContent:"space-evenly"}}>
           <div style={{width:width}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>DASHBOARD</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
              <h3>Project&nbsp;</h3>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
         
          </Box>
          {projReq(page)}
          <Box style = {{width:width}}>
          <Typography style={{marginLeft:'10px'}}>Page: {page}</Typography>
          <Pagination count={Math.ceil(pageCount/5)} page={page} onChange={handleChange} /><br/><br/></Box></div>
          
          <DashCards /></Grid>
          </div>
          </Grid>
          </div>
        </ul></div></>
      );
    }
  }
  export default function ProjectDash(props) {
    return(
      ProjectComp(props.name,props.email,props.year,props.is_admin)
    );
  }
