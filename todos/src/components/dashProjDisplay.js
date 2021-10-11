import { useState , useEffect} from 'react';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { Avatar, Card, Grid, useMediaQuery} from "@material-ui/core";
// import Avatar from '@mui/material/Avatar';
import { Box  } from '@mui/material';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Deleteproject from './deleteproject';
import Header from './Header';
import AddprojectComp from './addProjComponent';
import UserProfile from './userprofile';



function ProjectComp(number) {
    
    var width = "40vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    console.log(tokenid);
    useEffect(() => {
      axios.get("http://localhost:8000/todo/dashbord/project/?page="+number,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            console.log(items);
            
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
        if(isactive)
        {
            width = '100vw';
        }
      return (<>
        

          <div style={{minwidth:width,flexWrap:"wrap"}}>
        
            {items.map(item => (
            <li style={{minwidth:width}} key={item.id}>
                <Box style={{ minwidth:width,display:"flex",justifyContent:'center',margin:'0px'}}>
                <Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>
                 <Card style={{minWidth:width,margin:'0px'}}><CardContent> 
                 <Grid container spacing={2}>
                     <Avatar style={{backgroundColor:"#1976d2",fontSize:"70px",width:"100px",height:"100px",margin:"20px"}} variant="rounded">
                     {((item['projtitle']).slice(0,1)).toUpperCase()}
                     </Avatar>  
                     <Typography style={{padding:"20px"}} sx={{color:'#2185d0'}} variant="h4" component="div">{item['projtitle']}
                     {/* <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary">Wiki : {item['wiki']}</Typography> */}
                     <Typography style={{maxWidth:"40vw"}}sx={{ mb: 1.5 }} color="text.secondary"component="h1" variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: item['wiki']}}></Typography>
                     <Typography style={{fontSize:"11px"}}>Creator : {item['creator']['name']}</Typography></Typography> </Grid>
                     {/* <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions> */}
                     </CardContent>
                     </Card></Link><br></br></Box><br></br>
              
            </li>
          ))}</div>
        </>
      );
    }
  }                                                                                                        
  export default function ProjDisplal(props) {
    return(
      ProjectComp(props.number)
    );
  }
