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
          return (<DashCards name={item_data[0]['name']} email={item_data[0]['email']} year={item_data[0]['year']} is_admin={item_data[0]['admin']}/>);
        }
          else{
              console.log(item_data[0]['name']);
              return(<ProjectDash name={item_data[0]['name']} email={item_data[0]['email']} year={item_data[0]['year']} is_admin={item_data[0]['admin']} />);
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