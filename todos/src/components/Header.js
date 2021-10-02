import react from 'react';
import { Container } from '@mui/material';
import { AppBar, Toolbar } from "@material-ui/core";
// import Avatar from '@mui/material/Avatar';
import { Avatar , Box , Divider  } from '@mui/material';
import { flexbox } from '@mui/system';



const styles = {
    paperContainer: {
        height:"10vh",
        width :"10vh"
    },
    

};


export default function Header(props) {
    return(
      <header style={{background:'rgb(100, 53, 201)'}}>
          <Box sx={{ width:'100vw',display:"flex",justifyContent:'center'}}>
          <Box sx={{minWidth:"50vw",maxWidth:'800px', display: 'flex' ,flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row',padding:"10px"}}>
              <Box  ><h2 style= {{maginLeft:'50px',color:'white'}}>Hii Manan....</h2></Box>
              <Box><Avatar sx={{height:'100px',width:'100px',right:'80px'}} src="https://ver.to/wp-content/uploads/2021/08/oscar-1018x1024.png" /></Box>               
          </Box></Box>
      </header>
    );
  }