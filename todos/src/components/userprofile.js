import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, Icon, Link, Typography } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Header from './Header';
import { Card, useMediaQuery } from '@material-ui/core';
function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }
function myfunc(is_admin){
    
      if(is_admin)
      {

          return(<Button style={{backgroundColor:"rgb(25, 118, 210)",color:"white"}}><Link href ="/todo/user/info" style={{textDecoration:"none",color:"white"}}>Admin</Link></Button>)
      }

}

function Myform(name,email,year,is_admin)

 {   var width = "35vw";
 const isactive = useMediaQuery("(max-width : 830px)")
   if (isactive){
       width = '100vw'
   }

      return(
             
        <div style={{width:"100vw",padding:"2vw",display:"flex",justifyContent:"center"}} >
        <Card style={{padding:'20px',width:width}}>
        <div style={{textAlign:"left"}}>
        <h3>Profile</h3> 
        <Typography>NAME : {name}</Typography>
        <Typography>EMAIL : {email}</Typography>
        <Typography>YEAR : {year}</Typography>
        {myfunc(is_admin)}</div>
        </Card>
        </div>
    )
}

export default function  UserProfile(props) {
    return(
        Myform(props.name,props.email,props.year,props.is_admin)
    )
}