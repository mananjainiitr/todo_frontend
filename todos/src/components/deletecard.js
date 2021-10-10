import { Button } from "@mui/material";
import axios from "axios";

function Myfunc(id1,id2,id3)
{
    const tokenid = localStorage.getItem("token");
    function HandleSub(e){
       e.preventDefault()
    axios.delete("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/id/"+id2+"/card/"+id3,{
        headers: { 'Authorization':tokenid,}
    }).then(function (response) {
        console.log(response);
        window.location.reload();
    }).catch(function (erro) {
        console.log((erro.message).slice(-3));
        if((erro.message).slice(-3)==400)
        {
        console.log(document.getElementById("err").innerHTML = '<h3>ERROR: PLEASE ENTER UNIQUE TITLE NAME</h3>');
        }
        else{
         console.log(document.getElementById("err").innerHTML = '<h3>ERROR: you are not allowed to delete</h3>');
        }
       });
}
    return(<form id = "form" onSubmit = {e => HandleSub(e)}>
        <div style={{backgroundColor:'#FF9494',borderRadius:"5px",textAlign:"center"}}id = "err"></div>
        <Button style={{backgroundColor:"#F47174"}} sx={{marginLeft:'5px'}}variant="contained" size="small"type = "submit"> Delete </Button>
    </form>)
}

export default function  Deletecard(props) {
    
    return (Myfunc(props.id1,props.id2,props.id3))
}