import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import { Avatar , Box , Divider  } from '@mui/material';
import { Link, Redirect, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Deletelist from './deletelist';
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });
  
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
  
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
function MyComponent() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    var token = localStorage.getItem("token");
    // const search = useLocation().search;
    // const projid = new URLSearchParams(search).get('project');
    const { id } = useParams();
    console.log(id);
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project/id/"+id+"/list",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            console.log(result);
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
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
              <CardContent sx={{color:"white"}}>LISTS</CardContent>
          <Button>
          <Link to={"/todo/project/id/"+id+"/addlist"}>
              <Icon sx={{ fontSize: 30 , color:'white'}}>add_circle</Icon></Link>
          </Button>
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>         
          </Box></Box>
          <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
          {items.map(item => (
            <li key={item.id}>
                <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
                 <Card sx={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
                     <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{item['listtitle']}</Typography> 
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">{item['desc']}</Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">Start Date : {DateAndTimePickers(item['start_date'],"Start date :")}</Typography>
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">Due Date : {DateAndTimePickers(item['due_date'],'Due Date :')}</Typography>
                     <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'None'}} to={"/todo/project/id/"+id+"/list/id/"+item.id+"/cards"}>View Cards</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+id+"/list/id/"+item.id}>Update</Link></Button>
                     <Deletelist id1={id} id2={item.id}/>
                     </CardActions>
                     <Typography variant="body2"><h5>Created By : {item['creator']}</h5></Typography>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          ))}
          </div>
        </ul></div>
      );
    }
  }

  export default function List(){


//   {     console.log(props.user);
//     const { id } = useParams();
//     console.log(id);
//     return(id);


    // const search = useLocation().search;
    // const userName = new URLSearchParams(search).get('Token');
    // localStorage.setItem("token",userName)
    //         console.log(localStorage.getItem("token"));
       return (MyComponent());
  }