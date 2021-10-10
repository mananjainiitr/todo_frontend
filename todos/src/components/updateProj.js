import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField'
import { Box, Button,  Icon, Link, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from 'react-router';
import Projdetail from './projdetail';
import Header from './Header';
import { CardContent, useMediaQuery } from '@material-ui/core';
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

{    var width = "50vw";
const isactive = useMediaQuery("(max-width : 830px)")
    var mem =[];
    var desc = "";
    var member =[];
    const { id } = useParams();
    
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var project = document.getElementById("projtitle").value;
      // var wiki = document.getElementById("wiki").value;
      var wiki = desc;
      const tokenid = localStorage.getItem("token");
      var people = []
      var mem = document.getElementById("one").value;
      people = mem.split(",")
      console.log(people);
      // console.log(creator)
  
      axios.put("http://localhost:8000/todo/viewsets/project/"+id+"/",{
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
            // console.log(items['creator']);
            
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
      // creator = item['creator']
      items.map(item => (
                
        mem.push({"title":item["email"],"year":item["id"]})
        
    ))
       if(isactive)
       {
         width = '100vw'
       }
      return(
        <>
          <Header token={tokenid}/>
          <div><ul style={{padding:'0px',backgroundColor:'#f2f4f7',margin:'0px'}}>
          <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>UPDATE PROJECT</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
          <Link style={{textDecoration:"none",color:"black"}} href={"/todo/project/id/"+id+"/list"}><h3>Back</h3></Link>
          </Box></Box></Box>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll",background:'#f2f4f7'}}>
          <Box><Projdetail id = {id}/></Box>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
           
            
        <form style={{maxWidth : "80vw"}}id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
            <TextField style={{width:'50vw'}}type = "text"id = "projtitle" name = "projtitle" placeholder = "project title" /><br/>
            {/* <TextField style={{width:'50vw'}} type = "text"id = "wiki" name = "wiki" placeholder = "wiki" /> */}<br></br>
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
             <Member mem = {mem}/>
            {/* {items.map(item => (
                <li>
                
                <Typography sx={{color:'#2185d0'}} variant="h7" component="div">{item["email"]+" : "}<input id = {item["id"]} type = "checkbox" value = {item["id"]} onChange = {(e) => handleMember(e)}></input></Typography><br/></li>
            ))} */}
            <Button type="submit" variant="contained" color="primary">Add</Button>
        </form></Box> </div></ul></div></>
    )
}}

export default function  Updateproject() {
    return(
        Myform()
    )
}
