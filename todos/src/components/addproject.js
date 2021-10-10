import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Box, Button,  Icon, Link, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import SvgIcon from '@mui/material/SvgIcon';
import Header from './Header';
import { CardContent, useMediaQuery } from '@material-ui/core';
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
    

{   const isactive = useMediaQuery("(max-width : 830px)");
    var width = "53vw"
    var desc = "";
    var mem=[];
    var member =[];
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var project = document.getElementById("projtitle").value;
    //   var wiki = document.getElementById("wiki").value;
    var wiki = desc;
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
    var wiki;

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
        if (isactive){
        width = "90vw"
         }
        items.map(item => (
                
            mem.push({"title":item["email"],"year":item["id"]})
            
        ))
      return(
          <>
          <Header token={tokenid}/>
          <div><ul style={{padding:'0px',backgroundColor:'#f2f4f7',margin:'0px'}}>
          <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>ADD PROJECTS</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
          <Link style={{textDecoration:"none",color:"black"}} href="/todo/project"><h3>Back</h3></Link>
          </Box></Box></Box>
          
          <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
             
            
        <form style={{maxWidth:"80vw"}} id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center",maxWidth:"80vw"}}id = "err"></div>
            <TextField style={{width:'50vw'}}type = "text"id = "projtitle" name = "projtitle" placeholder = "project title" /><br/><br></br>
            {/* <TextField style={{width:'50vw'}} type = "text"id = "wiki" name = "wiki" placeholder = "wiki" /> */}
            <CKEditor
          editor={ ClassicEditor }
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log('Editor is ready to use!', editor);
          }}
          data={wiki}
          onChange={(event, editor) => {
            const data = editor.getData();
            wiki = data
            desc = wiki
            // console.log(data);
            console.log(wiki)
          }}
      />
            {/* {items.map(item => (
                
                mem.push({"title":item["email"],"year":item["id"]})
                
            ))} */}
            <Member mem = {mem}/>
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div></ul></div></>
    )
}}

export default function  Addproject() {
    return(
        Myform()
    )
}
