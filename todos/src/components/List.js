import axios from 'axios'
import React, { useState, useEffect } from 'react';

import {  Box, Pagination  } from '@mui/material';
import { Link,  useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';

import TextField from '@material-ui/core/TextField';
import Deletelist from './deletelist';
import ListDisplay from './listdisplay';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { Avatar, Grid, useMediaQuery } from '@material-ui/core';
import AddprojectComp from './addProjComponent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { green } from '@material-ui/core/colors';
import AddlistComp from './addListComp';
import ProjData from './projectData';

const MyBlock = (props) => {
    return (
        <div style={{
            padding: 10,
            backgroundColor: "#ebebeb"
        }}>
            My Block content is:
            {props.children}
        </div>
    )
}
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
function listReq(number)
{
    return (<ListDisplay key = {number} number={number}/>)
}
function HomeIcon(props) {
    return (
        <Link to="/todo/project">
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon></Link>
    );
  }
  function addlistfunc(isactive)
{
    if (!(isactive))
    {
        return (<AddlistComp />)
    }
}
function MyComponent() {
    var width = "50vw"
    const isactive = useMediaQuery("(max-width : 830px)")
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    const [page, setPage] = React.useState(1);
    const [pageCount, setpageCount] = React.useState(1);
    const handleChange = (event, value) => {

        setPage(value);
        // setIsLoaded(false);
        
    };
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
            setpageCount(result['data']['count']);
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
        if (isactive)
        {
            width = "90vw"
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
        <>
        <Header token={tokenid}/>
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
        <Box style={{paddingLeft:"0px"}} sx={{display:"flex",justifyContent:'right'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',width:width}}>
              <CardContent style={{padding:"0px"}} sx={{color:"black"}}><h3>Lists</h3></CardContent>
          <Box style={{paddingBottom:"0px",paddingTop:"0px"}} >
             {isactive && <Link style={{textDecoration:"none",color:"black"}} to={"/todo/project/id/"+id+"/addlist"}><h3>ADD ➕</h3></Link>}
          </Box>
          {/* <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>          */}
          </Box></Box>
          {/* <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
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
                     <Typography variant="body2"><h5>Created By : {item['creator']['email']}</h5></Typography>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          ))}
          </div> */}
          <div style={{maxWidth:"100vw",overflowX:"hidden",height:"85vh",listStyleType:'None',overflowY:"scroll"}}>
          <Grid container spacing={2} style={{justifyContent:"space-between"}}>
          <div>
              <div style = {{position:"fixed"}}>  
          {addlistfunc(isactive)} </div></div>
          <div>

          {listReq(page)}
          <Box style = {{width:width}}>
          <Typography style={{marginLeft:'10px'}}>Page: {page}</Typography>
          <Pagination count={Math.ceil(pageCount/5)} page={page} onChange={handleChange} /><br/><br/></Box></div>
          </Grid>
          </div>
        </ul></div></>
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