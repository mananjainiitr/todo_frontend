import axios from 'axios'
import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField'
import { Alert, Box, Button,  Icon, Link, Typography } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import SvgIcon from '@mui/material/SvgIcon';
import Header from './Header';
import Member from './member';
import { render } from '@testing-library/react';


function HomeIcon(props) {
    return (
        <Link href="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }

function Myform()

{   var err = true;
    var desc = "";
    var mem=[];
    var member =[];
    function HandleSub(e)
    {
      e.preventDefault();
      console.log(e);
      var project = document.getElementById("projtitle").value;
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

    // function Posterror()
    // {
    //     if (err)
    //     {
    //         return (<Alert id = "alert" severity="error">This is an error alert — check it out!</Alert>)
    //     }
    // }

    function HandleChange(e)
    {
        console.log(e.target.value)
        var check
        const tokenid = localStorage.getItem("token");
        if(e.target.value.length)
        {
        axios.get("http://localhost:8000/todo/validate/project/"+e.target.value+"/data/",{
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
        items.map(item => (
                
            mem.push({"title":item["name"],"year":item["id"]})
            
        ))
      return(
        
          <div style={{width:"35vw",padding:"2vw"}} >
              <h3>ADD PROJECT</h3>
        <form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err">
            
        </div>
        
        <div id="validate" ></div>
        
        <TextField style={{width:'30vw'}}type = "text"id = "projtitle" name = "projtitle" placeholder = "Project Title" onChange = {e => HandleChange(e)} required="true"/><br/><br></br>
        {/* <TextField style={{width:'30vw'}} type = "text"id = "wiki" name = "wiki" placeholder = "wiki" /> */}
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
        <Member mem = {mem}/><br></br>
        <Button type="submit" variant="contained" color="primary">Add</Button>
    </form></div>
    );
}}

export default function  AddprojectComp() {
    return(
        Myform()
    )
}