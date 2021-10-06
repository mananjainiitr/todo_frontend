import { useState , useEffect} from 'react';
import { Button,  CardContent,  SvgIcon} from '@mui/material';

// import Avatar from '@mui/material/Avatar';
import { Box  } from '@mui/material';

import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
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
        <Link to="/todo/project">
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon></Link>
    );
  }

    function MyComponent() 
    {
        var {detail} = useParams();
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
            if(detail == "card")
            {
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
          );}
          else{
              return(
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
              <CardContent  type="text"><Button>Name : {item_data[0]["name"]}</Button></CardContent>
              <CardContent type="text"><Button>Email : {item_data[0]["email"]}</Button></CardContent>
              <CardContent>{admin(item_data[0]["admin"],item_data[0]["year"])}</CardContent>
              {/* <CardContent type="text">Year : {item_data[0]["year"]}</CardContent> */}
              </Box>
              
              </Box>
              
              <ProjectDash/>
              </ul></div>
              
              </>

              );
          }
        }
    }
function admin(is_admin , year)
{
    console.log("admin");
    if(is_admin == true)
    {
        return(<Button><Link style={{color:"#1976d2",textDecoration:"none"}}to = "/todo/user/info">Admin</Link></Button>);
    }
    else
    {
        return(<Button>Year : {year}</Button>);
    }
}
export default function Dashboard() {
    return(
      MyComponent()
    );
  }