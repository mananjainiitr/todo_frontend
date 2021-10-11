import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button, Icon, Link, Typography } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Header from './Header';
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
    const tokenid = localStorage.getItem("token");   
    const { id } = useParams();
    function HandleListChange(e)
    {   
        
        console.log(e.target.value)
        var check
        const tokenid = localStorage.getItem("token");
        if(e.target.value.length)
        {
        axios.get("http://localhost:8000/todo/validate/list/"+id+"/"+e.target.value+"/data/",{
            headers: { 'Authorization':tokenid,}
        })
            .then(
            (result) => {
                    check = (result['data']['count'])
                    console.log(e.target.value.length)
                    
                    if(check == 1)
                    {
                        document.getElementById("validate").style.color = "red";
                        document.getElementById("validate").innerHTML = "Not available";
                    }
                    else{
                        document.getElementById("validate").style.color = "green";
                        document.getElementById("validate").innerHTML = "Available";
                    }
                   
                
            })}
            else{
                document.getElementById("validate").style.color = "red";
                        document.getElementById("validate").innerHTML = "Can't be Blank";
            }
    }
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
  
      axios.post("http://localhost:8000/todo/viewsets/project/id/"+id+"/list/",{
        "listtitle": list,
        "desc": desc,
        "is_completed": is_completed,
        
        "due_date":due_date},{
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
             
        <div style={{width:"35vw",padding:"2vw"}} >
        <h3>ADD List</h3> 
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
        
        
            <div id="validate" ></div>
            <TextField style={{width:'35vw'}}type = "text"id = "listtitle" name = "listtitle" placeholder = "List Title" onChange = {e => HandleListChange(e)} required="true"/><br/>
            <TextField style={{width:'35vw'}} type = "text"id = "desc" name = "desc" placeholder = "List Desc" /><br/>
            
            <TextField id="due_date"type = "datetime-local"/><br/><br></br>
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></div>
    )
}

export default function  AddlistComp() {
    return(
        Myform()
    )
}