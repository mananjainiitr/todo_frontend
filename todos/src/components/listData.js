import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Box  } from '@mui/material';
import { Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Deletelist from './deletelist';
function DateAndTimePickers(datee , typee) {
    const { type } = typee
    // console.log("dat"+datee);

    let str = datee
    str = str.slice(0,16);
    console.log(str);
  
    return (
      <form noValidate>
        <TextField
          id="datetime-local"
          label = { type }
          type="datetime-local"
          defaultValue= {str}
        />
      </form>
    );
  }

function myfunc(is_completed)
{
    if(is_completed)
    {
        return (<Typography style={{fontSize:"11px",color:"black"}}>Completed</Typography>)
    }
    else{
        return (<Typography style={{fontSize:"11px",color:"black"}}>Not Completed</Typography>)
    }
}
function MyComponent(id1,id2) {
    var width = "50vw";
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [item, setItems] = useState([]);
    
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    var token = localStorage.getItem("token");
    // const search = useLocation().search;
    // const projid = new URLSearchParams(search).get('project');
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/"+id2,{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {

            item = result['data'];
            setItems(result['data']);
            console.log(item);
            setIsLoaded(true);
            
            // items = result['data'];
            
            console.log(item);
            
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
        if(isactive){
            width = "100vw"
        }
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        // <ul>
        //   {items.map(item => (
        //     <li key={item.id}>
        //         <a href = {"/card/?list="+item.id+"&&project="+id} >
        //       {item['listtitle']}</a>
        //     </li>
        //   ))}
        // </ul>
        
             <div style={{minwidth:width,flexWrap:"wrap"}}>
           
            <li style={{minwidth:width,margin:"0px"}} key={item.id}>
                <Box style={{ minwidth:width,display:"flex",justifyContent:'right',margin:'2px',padding:"0px"}}>
                
                 <Card style={{minWidth:width,maxWidth:"800px",margin:'0px',padding:"8px"}}><CardContent style = {{padding:"8px"}}> 
                 <Grid container spacing={2}>
                 <Avatar style={{backgroundColor:"#1976d2",margin:"20px",}}>
                    <AssignmentIcon /></Avatar>
                     <Typography style={{padding:"20px",color:"black"}} sx={{color:'#2185d0'}} variant="h5" component="div">{item['listtitle']}
                     <Typography style={{color:"rgba(0, 0, 0, 0.6)"}}>Desc: {item['desc']}</Typography>
                     <Typography style={{fontSize:"11px",color:"#2185d0"}}>By : {item['creator']['name']}<Typography type="date" >{item['due_date'].slice(0,10)}</Typography>
                     {myfunc(item["is_completed"])}
                     </Typography></Typography> </Grid>
                     {/* <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions> */}
                     <br></br>
                     <br></br>
                     
                     <Grid container spacing={2}>
                     <Button variant="contained" style={{backgroundColor:"#ACD1AF"}}size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+id1+"/list/id/"+id2}>Update</Link></Button>
                     <Deletelist id1={id1} id2={id2}/></Grid>
                     </CardContent>
                     </Card></Box>
              
            </li>
        </div>
          
        
      );
    }
  }

  export default function ListData(props){


//   {     console.log(props.user);
//     const { id } = useParams();
//     console.log(id);
//     return(id);


    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
       return (MyComponent(props.id1,props.id2));
  }