import { Paper, styled } from "@material-ui/core";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Login() {
        return(
            <Grid
            backgroundColor = "#1976d2"
            height = "100vh"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
            <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
            
            <Box gridColumn="span 10">
            <Item><Typography>Login With Channeli</Typography></Item>
            </Box>

            <Box gridColumn="span 10">
            <Item><Typography>Todo app</Typography></Item>
            </Box>
            
            <Box gridColumn="span 10"> 
            <Item><Button sx={{marginLeft:'5px'}}variant="contained" size="small"><a href="http://127.0.0.1:8000/todo/channeli">Channeli</a></Button>      
            </Item>
            </Box> 
           
            
            </Box>
            </Grid>

            
        
    )
            
}