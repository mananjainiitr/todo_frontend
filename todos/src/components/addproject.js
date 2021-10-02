import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, ButtonBase, Dialog, Typography } from '@mui/material';
import {  MenuItem } from '@material-ui/core';

function Myform()
{   
    var member =[];
    
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var project = document.getElementById("projtitle").value;
      var wiki = document.getElementById("wiki").value;
      const tokenid = localStorage.getItem("token");
  
      axios.post("http://localhost:8000/todo/viewsets/project/",{
        "projtitle": project,
        "wiki": wiki,
        "creator": 2,
        "member": member},{
        headers: { 'Authorization':tokenid,}}
        
      ).then(function (response) {
        console.log(response);
    })}

    

    function handleMember(e)
    {   
        console.log(e.target.checked);
          if(e.target.checked)
          {
          member.push(e.target.value);
          }
          else{
            member = member.filter(function(item) {
                return item !== e.target.value
            })
          }
          console.log(member);
        console.log(e.target.checked);
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);

    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/data/data",{
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
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return(
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
        <form id = "form" onSubmit = {e => HandleSub(e)}>
            <TextField style={{width:'50vw'}}type = "text"id = "projtitle" name = "projtitle" placeholder = "project title" /><br/>
            <TextField style={{width:'50vw'}} type = "text"id = "wiki" name = "wiki" placeholder = "wiki" />
            {items.map(item => (
                <li>
                <Typography sx={{color:'#2185d0'}} variant="h7" component="div">{item["email"]+" : "}<input id = {item["id"]} type = "checkbox" value = {item["id"]} onChange = {(e) => handleMember(e)}></input></Typography><br/></li>
            ))}
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div>
    )
}}

export default function  Addproject() {
    return(
        Myform()
    )
}
