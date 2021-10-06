import axios from "axios";
import { useLocation } from "react-router";


function myfunc(code)
{
    
    console.log(code);
    axios.get("http://localhost:8000/todo/login?code="+code);
    return ("hii");
}
export default function Auth()
{
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    return (myfunc(code));
}