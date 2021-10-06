import { useState , useEffect} from 'react';

// import Avatar from '@mui/material/Avatar';
import { Avatar , Box  } from '@mui/material';

import axios from 'axios';
import { Link } from 'react-router-dom';



const styles = {
    paperContainer: {
        height:"10vh",
        width :"10vh"
    },
    

};
    function MyComponent(token) 
    {
    
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        var [items, setItems] = useState([]);
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        // const { id1 } = useParams();
        // const { id2 }= useParams();
        const tokenid = token
        useEffect(() => {
          axios.get("http://localhost:8000/todo/mydata/data",{
            headers: { 'Authorization':tokenid,}
          })
            .then(
              (result) => {
                console.log(result);
                
                setItems(result['data']['results']);
                items = result['data']['results'];
                setIsLoaded(true);
                // console.log(items);
                
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
            <header style={{background:'rgb(100, 53, 201)'}}>
            <Box sx={{ width:'100vw',display:"flex",justifyContent:'center'}}>
            <Box sx={{minWidth:"50vw",maxWidth:'800px', display: 'flex' ,flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row',padding:"10px"}}>
                <Box  ><h2 style= {{maginLeft:'50px',color:'white'}}>Hii {items[0]['name']}....</h2></Box>
                <Box><Link to="/todo/dashboard/project"><Avatar sx={{height:'100px',width:'100px',right:'80px'}} src="https://ver.to/wp-content/uploads/2021/08/oscar-1018x1024.png" /></Link></Box>               
            </Box></Box>
        </header>
          );
        }
    }


export default function Header(props) {
    return(
      MyComponent(props.token)
    );
  }