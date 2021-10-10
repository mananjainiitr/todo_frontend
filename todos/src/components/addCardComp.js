import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, Icon, Link, Typography } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Header from './Header';
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
{   
    var mem = [];
    var member =[];
    const {id1} = useParams();
    const {id2} = useParams();
    function HandleSub(e)
    {
    //   e.preventDefault();
      console.log(e);
      var cardtitle = document.getElementById("cardtitle").value;
      var desc = document.getElementById("desc").value;
      var due_date= document.getElementById("due_date").value;
      var is_completed = false;
      var people = []
      var mem = document.getElementById("one").value;
      people = mem.split(",")
      console.log(people);
      const tokenid = localStorage.getItem("token");
  
      axios.post("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/id/"+id2+"/card/",{
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
    
        <div style={{width:"35vw",padding:"2vw"}} >
        <h3>ADD Card</h3> 
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
            <TextField style={{width:'35vw'}}type = "text"id = "cardtitle" name = "cardtitle" placeholder = "card title" /><br/>
            <TextField style={{width:'35vw'}} type = "text"id = "desc" name = "desc" placeholder = "desc" /><br/>
            <TextField style={{width:'35vw'}} type = "datetime-local" id = "due_date" name = "desc" placeholder = "due_date" /><br/>
            
            <Member mem = {mem}/>
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></div>
    )
}}

export default function  AddCardComp() {
    return(
        Myform()
    )
}
