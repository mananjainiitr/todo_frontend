import react, { useState , useEffect} from 'react';
import { Button, CardActions, CardContent, Container, Icon, SvgIcon, TextField, Typography } from '@mui/material';
import { AppBar, Card, Toolbar } from "@material-ui/core";
// import Avatar from '@mui/material/Avatar';
import { Avatar , Box , Divider  } from '@mui/material';
import { flexbox } from '@mui/system';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Deleteproject from './deleteproject';
import ProjectDash from './dashproj';
import DashCards from './dashcard';



const styles = {
    paperContainer: {
        height:"10vh",
        width :"10vh"
    },
    

};


  
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

    function MyComponent() 
    {
    
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        var [item_data, setitem_data] = useState([]);
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        // const { id1 } = useParams();
        // const { id2 }= useParams();
        const tokenid = localStorage.getItem("token")
        useEffect(() => {
          axios.get("http://localhost:8000/todo/mydata/data",{
            headers: { 'Authorization':tokenid,}
          })
            .then(
              (result) => {
                console.log(result);
                
                setitem_data(result['data']['results']);
                item_data = result['data']['results'];
                setIsLoaded(true);
                // console.log(item_data);
                
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
              <>
            <Header token={tokenid}/>
            <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
              <Link style={{ textDecoration:"none" }} to="/todo/dashboard/project">
              <CardContent sx={{color:"white"}}>PROJECTS</CardContent>
              </Link>
          
              <Link style={{ textDecoration:"none" }} to="/todo/dashboard/card">
              <CardContent sx={{color:"white"}}>Cards</CardContent></Link>
          
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>         
          </Box></Box>
          <Box sx={{width:'100vw',display:'flex',justifyContent:'center'}}>
              <Box sx={{width:'50vw',display:'flex',justifyContent:'space-between'}}>
          <CardContent  type="text">Name : {item_data[0]["name"]}</CardContent>
          <CardContent type="text">Email : {item_data[0]["email"]}</CardContent>
          <CardContent type="text">Year : {item_data[0]["year"]}</CardContent></Box>
          
          </Box>
          <DashCards/>
          </ul></div>
          
          </>
          );
        }
    }


export default function Dashboard() {
    return(
      MyComponent()
    );
  }