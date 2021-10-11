import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
// import { CardContent} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar , Box , Divider  } from '@mui/material';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import { Grid, useMediaQuery } from '@material-ui/core';
import Deleteproject from './deleteproject';
function MyComponent(id1) {
    const id = id1
    var width = "50vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [item, setItems] = useState([]);
    // var [email , setEmail] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project/"+id,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            
            item = result['data'];
            // email = items['creator']['email'];
            setItems(result['data']);
            // setEmail = (items['creator']['email']);
            setIsLoaded(true);
            // console.log(items['creator']['email']);
            
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
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
      console.log(item);
      if(isactive){
          width = "96vw";
      }
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        
        // <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
          
            
        //          <Card sx={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
        //              <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{items['projtitle']}</Typography> 
        //              <Typography sx={{ mb: 1.5 }} color="text.secondary">{items.wiki}</Typography>
        //              <Typography variant="body2">Creator : {items['creator']['email']}</Typography>
                    //  <br></br>
                     
                     
                     
                    //  <Grid style={{marginLeft:"0px"}}container spacing={4}><Typography variant="body2">Members : </Typography>{items['member'].map(
                    //    member=>(
                    //     <Button sx={{ border: 1 }} style={{backgroundColor:"#FFFFF",marginLeft:"2px",fontSize:"10px"}} varient="contained">{member["name"]}</Button>
                    //    )
                    //  )}</Grid>
                    //  <br></br>
                      
        //              <CardActions>
        //              <Button size="small"><Link sx={{textDecoration:'None'}} to={"/todo/project/id/"+items.id+"/list"}>View List</Link></Button>
                     
        //              </CardActions>
        //              </CardContent>
        //              </Card><br></br><br></br>
              
           
          
        // </ul></div>
        <div style={{minwidth:width,flexWrap:"wrap"}}>
            <h3 style={{paddingLeft:'10px'}}>Project details</h3>
            <li style={{minwidth:width,margin:'0px'}} key={item.id}>
                <Box sx={{ minwidth:width,display:"flex",justifyContent:'center',margin:'0px'}}>
                
                 <Card sx={{minWidth:width,maxWidth:"800px",margin:'0px'}}><CardContent> 
                 <Grid container spacing={2}>
                     <Avatar style={{backgroundColor:"#1976d2",fontSize:"70px",width:"100px",height:"100px",margin:"20px"}} variant="rounded">
                     {((item['projtitle']).slice(0,1)).toUpperCase()}
                     </Avatar>  
                     <Typography style={{padding:"20px"}} sx={{color:'#2185d0'}} variant="h4" component="div">{item['projtitle']}
                     {/* <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary">Wiki : {item['wiki']}</Typography> */}
                     <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary"component="h1" variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: item['wiki']}}></Typography>
                     <Typography style={{fontSize:"11px"}}>Creator : {item['creator']['name']}</Typography></Typography> </Grid>
                     <br></br>
                     
                     
                     
                     <Grid style={{marginLeft:"0px"}}container spacing={4}><Typography variant="body2">Members : </Typography>{item['member'].map(
                       member=>(
                        <Button sx={{ border: 1 }} style={{backgroundColor:"#FFFFF",marginLeft:"2px",fontSize:"10px"}} varient="contained">{member["name"]}</Button>
                       )
                     )}</Grid>
                     <br></br>
                     <br></br>
                     <Grid container spacing={2}>
                     <Button variant="contained" style={{backgroundColor:"#ACD1AF"}}size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={id} /></Grid>
                     {/* <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions> */}
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          </div>
      );
    }
  }
  export default function  ProjData(props) {
    return(
        MyComponent(props.id)
    )
}