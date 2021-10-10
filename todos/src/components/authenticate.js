import { Redirect, useLocation } from "react-router";

export default function  Authenticate() {
    const search = useLocation().search;
    const userName = new URLSearchParams(search).get('Token');
    if(userName){
    localStorage.setItem("token",userName)
    return(
        window.location.href = "/todo/project"
    );}
    else {
        return ("loading...")
    }
}