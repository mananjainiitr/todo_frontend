import { Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
function Myfunc(id)
{
    const tokenid = localStorage.getItem("token");
    function HandleSub(e){
       e.preventDefault()
    axios.delete("http://localhost:8000/todo/viewsets/project/"+id+"/",{
        headers: { 'Authorization':tokenid,}
    }).then(function (response) {
        console.log(response);
    })}
    return(<form id = "form" onSubmit = {e => HandleSub(e)}>
        <Button sx={{marginLeft:'5px'}}variant="contained" size="small"type = "submit"> Delete </Button>
    </form>)
}

export default function  Deleteproject(props) {
    
    return (Myfunc(props.id))
}