import { Button } from "@mui/material";
import axios from "axios";

function Myfunc(id1,id2)
{
    const tokenid = localStorage.getItem("token");
    function HandleSub(e){
       e.preventDefault()
    axios.delete("http://localhost:8000/todo/viewsets/project/id/"+id1+"/list/"+id2,{
        headers: { 'Authorization':tokenid,}
    }).then(function (response) {
        console.log(response);
    })}
    return(<form id = "form" onSubmit = {e => HandleSub(e)}>
        <Button sx={{marginLeft:'5px'}}variant="contained" size="small"type = "submit"> Delete </Button>
    </form>)
}

export default function  Deletelist(props) {
    
    return (Myfunc(props.id1,props.id2))
}