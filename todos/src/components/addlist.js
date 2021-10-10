import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, Icon, Link, Typography } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Header from './Header';
import { CardContent } from '@material-ui/core';
function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }

function Myform()

 {  const tokenid = localStorage.getItem("token");   
    const { id } = useParams();
    
    function HandleSub(e)
    {
    //   e.preventDefault();
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
  
      axios.post("http://localhost:8000/todo/viewsets/project/id/"+id+"/list/",{
        "listtitle": list,
        "desc": desc,
        "is_completed": is_completed,
        
        "due_date":due_date},
        {
        headers: { 'Authorization':tokenid,}}
        
      ).then(function (response) {
        console.log(response);
        window.location.reload();
    }).catch(function (erro) {
        console.log((erro.message).slice(-3));
        if((erro.message).slice(-3)==400)
        {
        console.log(document.getElementById("err").innerHTML = '<h3>ERROR: PLEASE ENTER UNIQUE TITLE NAME</h3>');
        }
        else{
         console.log(document.getElementById("err").innerHTML = '<h3>ERROR: Some error has occured </h3>');
        }
       });
}

      return(
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',backgroundColor:'#f2f4f7',margin:'0px'}}>
          <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:'53vw'}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>ADD PROJECTS</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
          <Link style={{textDecoration:"none",color:"black"}} href={"/todo/project/id/"+id+"/list"}><h3>Back</h3></Link>
          </Box></Box></Box>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
            
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
             
            
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
            <TextField style={{width:'50vw'}}type = "text"id = "listtitle" name = "listtitle" placeholder = "list title" /><br/>
            <TextField style={{width:'50vw'}} type = "text"id = "desc" name = "desc" placeholder = "list desc." /><br/>
            
            <TextField id="due_date"type = "datetime-local"/><br/>
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div></ul></div></>
    )
}

export default function  Addlist() {
    return(
        Myform()
    )
}