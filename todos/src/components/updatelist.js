import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, ButtonBase, CardContent, Dialog, Icon, Link, Typography } from '@mui/material';
import {  MenuItem } from '@material-ui/core';
import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import ListDetail from './listdetail';
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

function Myform()
{   
    const { id1 } = useParams();
    const { id2 } = useParams();
    
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var list = document.getElementById("listtitle").value;
      var desc = document.getElementById("desc").value;
    //   var start_date = document.getElementById("start_date").value;
      var due_date = document.getElementById("due_date").value;
      var is_completed = "false";
      console.log(list);

      
      const tokenid = localStorage.getItem("token");
    //   const id = "2";
    //   const { id } = useParams();
  
      axios.put("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/"+id2+"/",{
        "listtitle": list,
        "desc": desc,
        "is_completed": is_completed,
        
        "due_date":due_date,
        "project_id":id1,
        "creator": 2,},{
        headers: { 'Authorization':tokenid,}}
        
      ).then(function (response) {
        console.log(response);
    })}

      return(
        <div style={{height:"80vh",background:'#f2f4f7',listStyleType:'None',overflowY:"scroll"}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
          
             <Button sx={{color:"white"}}><Link sx={{textDecoration:"none",color:"white"}} href={"/todo/project/id/"+id1+"/list"}>Lists</Link></Button>
          <Button onClick >
              
              <Icon sx={{ fontSize: 30 , color:'white'}}>add_circle</Icon>
          </Button>
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>
          </Box></Box>
          <Typography sx={{color:'#2185d0',textAlign:'center'}} variant="h5" component="div">Add List</Typography><br></br>
          <ListDetail id1={id1} id2={id2}/>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
             
            
        <form id = "form" onSubmit = {e => HandleSub(e)}>
            <TextField style={{width:'50vw'}}type = "text"id = "listtitle" name = "listtitle" placeholder = "list title" /><br/>
            <TextField style={{width:'50vw'}} type = "text"id = "desc" name = "desc" placeholder = "list desc." /><br/>
            
            <TextField id="due_date"type = "datetime-local"/><br/>
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div>
    )
}

export default function  Updatelist() {
    return(
        Myform()
    )
}