import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button,  Icon, Link, Typography } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import Header from './Header';
import Member from './member';

function HomeIcon(props) {
    return (
        <Link href="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }

function Myform()
{   
    var mem=[];
    var member =[];
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var project = document.getElementById("projtitle").value;
      var wiki = document.getElementById("wiki").value;
      const tokenid = localStorage.getItem("token");
      var people = []
      var mem = document.getElementById("one").value;
      people = mem.split(",")
      console.log(people);
  
      axios.post("http://localhost:8000/todo/viewsets/project/",{
        "projtitle": project,
        "wiki": wiki,
        "member_pk2": people},{
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
        items.map(item => (
                
            mem.push({"title":item["email"],"year":item["id"]})
            
        ))
      return(
          
          <div style={{width:"35vw",padding:"2vw"}} >
              <h3>ADD PROJECT</h3>
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <TextField style={{width:'30vw'}}type = "text"id = "projtitle" name = "projtitle" placeholder = "project title" /><br/>
        <TextField style={{width:'30vw'}} type = "text"id = "wiki" name = "wiki" placeholder = "wiki" />
        <Member mem = {mem}/>
        <Button type="submit" variant="contained" color="primary">Add</Button>
    </form></div>
    );
}}

export default function  AddprojectComp() {
    return(
        Myform()
    )
}