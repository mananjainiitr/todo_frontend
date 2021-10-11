import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import {  Box, Pagination  } from '@mui/material';
import { Link, Redirect, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';

import TextField from '@material-ui/core/TextField';
import DashCardDisplay from './dashCardDisplay';
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
  function cardReq(number)
{
    console.log("a"+number)
  return ( <DashCardDisplay key={number} number={number}/>)
}
  
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
function MyComponent(name , email , year , is_admin) {
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
    var token = localStorage.getItem("token");
    const { id1 } = useParams();
    const { id2 }= useParams();
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:8000/todo/dashbord/card",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            setpageCount(result['data']['count']);
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
        if(isactive){
            width = "100vw"
        }
      return (
        <div style={{width:width}}>
        {/* <Header token={tokenid}/> */}
        <div style={{width:width}}><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px',width:width}}>
        {/* <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}> */}
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>DASHBOARD</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
          <h3>Card&nbsp;</h3>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box>
          {/* </Box> */}
        <div style={{height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
        <Grid container spacing={2} style={{justifyContent:"space-between"}}>
        {/* <UserProfile name={name} email={email} year={year} is_admin={is_admin} /> */}
        <div>
          {cardReq(page)}
          <Box style = {{width:width}}>
          <Typography style={{marginLeft:'10px'}}>Page: {page}</Typography>
          <Pagination count={Math.ceil(pageCount/5)} page={page} onChange={handleChange} /><br/><br/></Box></div>

        </Grid>
        </div>
      </ul></div></div>
      );
    }
  }

  export default function DashCards(props)

  {    
    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
    //  console.log("hi");
       return (MyComponent(props.name,props.email,props.year,props.is_admin));
  }