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



function ProjectComp() {
    
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    console.log(tokenid);
    useEffect(() => {
      axios.get("http://localhost:8000/todo/dashbord/project",{
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
      return (<>
        
          <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
          {items.map(item => (
            <li key={item.id}>
                <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
                 <Card style={{width:'50vw',minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
                     <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{item['projtitle']}</Typography> 
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">{item['wiki']}</Typography>
                     <Typography variant="body2"><h5>Creator : {item['creator']}</h5></Typography>
                     <CardActions>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     <Button variant="contained" size="small"><Link style={{textDecoration:'none'}} to={"/todo/project/id/"+item.id}>Update</Link></Button>
                     <Deleteproject id={item.id} />
                     </CardActions>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          ))}
          </div>
        </>
      );
    }
  }
  export default function ProjectDash() {
    return(
      ProjectComp()
    );
  }
