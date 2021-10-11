import { Avatar, Card, Grid, useMediaQuery } from "@material-ui/core";
import { Box, Button, CardContent, Checkbox, FormControlLabel, Icon, SvgIcon, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function handleSubmit(e,id)
{
    // e.preventDefault();
    // console.log(e.target["0"].checked);
    var is_active = e.target["0"].checked
    var admin = e.target["1"].checked
    var staff = e.target["2"].checked
    const tokenid = localStorage.getItem("token");
    axios.put("http://localhost:8000/todo/user/info/"+id+"/",{
        "is_active": is_active,
        "admin": admin,
        "staff": staff},{
        headers: { 'Authorization':tokenid,}}
        
      ).then(function (response) {
        console.log(response);
    })
}

function handleActive(e)
{
    console.log(e.target.checked);
}
function handleAdmin(e)
{
    console.log(e.target.checked);
}
function handleStaff(e)
{
    console.log(e.target.checked);
}
function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }
function MyComponent()
{
    var width = '35vw';
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/user/info",{
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
    if (isactive)
      {
        width = "80vw"
      }
    return(
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:'53vw'}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>ADMIN DASHBOARD</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
              <h3>Users&nbsp;</h3>
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
        <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll",textAlign:"center"}}>
        <Grid style={{justifyContent:"center",justifyContent:"space-evenly"}} container spacing={3}>
        {items.map(item => (
        <li style={{minWidth:width}} key={item.id}>
        <Box style={{ minWidth:width,display:"flex",justifyContent:'center',margin:'10px'}}>
         <Card style={{minWidth:width,maxWidth:"800px",margin:'0px'}}><CardContent>
        <form value = {item["id"]} onSubmit = {(e) => handleSubmit(e,item["id"])}>
            
                <div style={{maxWidth:"140px"}}>
        <Avatar style={{backgroundColor:"#1976d2",fontSize:"70px",width:"100px",height:"100px",margin:"20px"}} >
                     {((item['name']).slice(0,1)).toUpperCase()}
                     </Avatar></div>
        <div style={{minWidth:width}}><Typography  sx={{ mb: 1.5 }} color="black">Name : {item['name']}</Typography>
        <Typography  sx={{ mb: 1.5 }} color="black">Email : {item['email']}</Typography></div>
        <Typography sx={{ mb: 1.5 }} color="black">Year : {item['year']}</Typography>
        <Typography id = "is_active" sx={{ mb: 1.5 }} color="black">Is active : <Checkbox defaultChecked={item['is_active']} onChange = {(e) => handleActive(e)}></Checkbox></Typography>
        <Typography id = "admin" sx={{ mb: 1.5 }} color="black">Is Admin : <Checkbox defaultChecked={item['admin']} onChange = {(e) => handleAdmin(e)}></Checkbox></Typography>
        <Typography id = "staff" sx={{ mb: 1.5 }} color="black">Is Staff : <Checkbox defaultChecked={item['staff']} onChange = {(e) => handleStaff(e)}></Checkbox></Typography>
        <Button variant="contained" color="primary" type = "submit">Update</Button>
        </form></CardContent></Card></Box></li>) )}</Grid>
        </div></ul></div></>
        );
}


export default function Admin()

{    
     return (MyComponent());
}