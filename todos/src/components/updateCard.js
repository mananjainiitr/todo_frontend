import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, Icon, Link, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Carddetail from './cardDetail';
import Header from './Header';
import { CardContent, Switch } from '@material-ui/core';
import Member from './member';
function HomeIcon(props) {
    return (
      <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }

function Myform()
{   var mem=[];
    var member =[];
    const {id1} = useParams();
    const {id2} = useParams();
    const {id3} = useParams();
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var cardtitle = document.getElementById("cardtitle").value;
      var desc = document.getElementById("desc").value;
      var due_date= document.getElementById("due_date").value;
      var is_completed = document.getElementById("check").checked;
      var people = []
      var mem = document.getElementById("one").value;
      people = mem.split(",")
      console.log(people);
      
      const tokenid = localStorage.getItem("token");
  
      axios.put("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/id/"+id2+"/card/"+id3+"/",{
        "cardtitle":cardtitle,
        "desc": desc,
        "due_date":due_date,
        "is_completed":is_completed,
        "member_pk2": people},{
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
      items.map(item => (
                
        mem.push({"title":item["email"],"year":item["id"]})
        
    ))
      return(
        <>
          <Header token={tokenid}/>
          <div><ul style={{padding:'0px',backgroundColor:'#f2f4f7',margin:'0px'}}>
          <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:'53vw'}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>Update Card</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
          <Link style={{textDecoration:"none",color:"black"}} href={"/todo/project/id/"+id1+"/list/id/"+id2+"/cards"}><h3>Back</h3></Link>
          </Box></Box></Box>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
            
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
        <div style={{background:'#f2f4f7',height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
          <Carddetail id1={id1} id2={id2} id3={id3} />
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
             
            
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
            <TextField style={{width:'50vw'}}type = "text"id = "cardtitle" name = "cardtitle" placeholder = "card title" /><br/>
            <TextField style={{width:'50vw'}} type = "text"id = "desc" name = "desc" placeholder = "desc" /><br/>
            <TextField style={{width:'50vw'}} type = "datetime-local" id = "due_date" name = "desc" placeholder = "due_date" /><br/>
            <Member mem = {mem}/>
            <Typography > Is Completed : 
            <Switch id = "check"{..."is completed"} /></Typography><br></br>
            {/* {items.map(item => (
                <li>
                <Typography sx={{color:'#2185d0'}} variant="h7" component="div">{item["email"]+" : "}<input id = {item["id"]} type = "checkbox" value = {item["id"]} onChange = {(e) => handleMember(e)}></input></Typography><br/></li>
            ))} */}
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div></Box></div></ul></div></>
    )
}}

export default function  Updatecard() {
    return(
        Myform()
    )
}
