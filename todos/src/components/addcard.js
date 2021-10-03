import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, ButtonBase, CardContent, Dialog, Icon, Link, Typography } from '@mui/material';
import {  MenuItem } from '@material-ui/core';
import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Header from './Header';
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

function Myform()
{   
    var member =[];
    const {id1} = useParams();
    const {id2} = useParams();
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var cardtitle = document.getElementById("cardtitle").value;
      var desc = document.getElementById("desc").value;
      var due_date= document.getElementById("due_date").value;
      var is_completed = false;
      
      const tokenid = localStorage.getItem("token");
  
      axios.post("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/id/"+id2+"/card/",{
        "cardtitle":cardtitle,
        "desc": desc,
        "due_date":due_date,
        "is_completed":is_completed,
        "list_id":id2,
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
        <>
        <Header token={tokenid}/>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
          
             <Button sx={{color:"white"}}><Link sx={{textDecoration:"none",color:"white"}} href={"/todo/project/id/"+id1+"/list/id/"+id2+"/cards"}>Cards</Link></Button>
          <Button onClick >
              <Link to="project/addproject">
              <Icon sx={{ fontSize: 30 , color:'white'}}>add_circle</Icon></Link>
          </Button>
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>         
          </Box></Box>
          <Typography sx={{color:'#2185d0',textAlign:'center'}} variant="h5" component="div">Add Card</Typography><br></br>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
             
            
        <form id = "form" onSubmit = {e => HandleSub(e)}>
            <TextField style={{width:'50vw'}}type = "text"id = "cardtitle" name = "cardtitle" placeholder = "card title" /><br/>
            <TextField style={{width:'50vw'}} type = "text"id = "desc" name = "desc" placeholder = "desc" /><br/>
            <TextField style={{width:'50vw'}} type = "datetime-local" id = "due_date" name = "desc" placeholder = "due_date" /><br/>
            
            {items.map(item => (
                <li>
                <Typography sx={{color:'#2185d0'}} variant="h7" component="div">{item["email"]+" : "}<input id = {item["id"]} type = "checkbox" value = {item["id"]} onChange = {(e) => handleMember(e)}></input></Typography><br/></li>
            ))}
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div></>
    )
}}

export default function  Addcard() {
    return(
        Myform()
    )
}
