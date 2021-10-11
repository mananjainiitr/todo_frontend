import { Paper, styled } from "@material-ui/core";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Log() {
    window.localStorage.removeItem("token");
    
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
            <Item><Typography>You have been logged out successfully</Typography></Item>
            </Box>

            
           
            
            </Box>
            </Grid>

            
        
    )
            
}