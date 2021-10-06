import { Button } from "@mui/material";
import React from "react";


export default function Login() {
    
//     function HandleSub(e)
// {
//     e.preventDefault();
//     // document.location.href = "https://channeli.in/oauth/authorise/?client_id=STTrMkmTfDZEuFoDKj45uM6YEN4FXXXByWzltpRg&redirect_uri=http://localhost:3000/todo/auth&state=RANDOM_STATE_STRING";
//     document.location.href = "http://127.0.0.1:8000/todo/channeli"
// }
    
        return(
        // <form id = "form" onSubmit = {e => HandleSub(e)}>
        <Button sx={{marginLeft:'5px'}}variant="contained" size="small"type = "submit"><a href="http://127.0.0.1:8000/todo/channeli">Channeli</a></Button>
    // </form>
    )
            
}