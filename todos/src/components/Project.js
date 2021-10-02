import axios from 'axios'
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import {useLocation} from "react-router-dom";
// import { CardContent} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Avatar , Box , Divider  } from '@mui/material';
import List from './List';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

function MyComponent() {
    
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var [items, setItems] = useState([]);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const tokenid = localStorage.getItem("token");
    useEffect(() => {
      axios.get("http://localhost:8000/todo/viewsets/project",{
        headers: { 'Authorization':tokenid,}
      })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result['data']['results']);
            items = result['data']['results'];
            console.log(items);
            
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
      return (
        //   <p>{items[1]['projtitle']}</p>
        //   <p>hi</p>
        
        <div><ul style={{padding:'0px',background:'#f2f4f7',margin:'0px'}}>
            <Box sx={{backgroundColor:'rgb(100, 53, 201)',display:"flex",justifyContent:'center'}}>
          <Box sx={{ display:"flex",justifyContent:'space-between',backgroundColor:'rgb(100, 53, 201)',width:'50vw'}}>
              <CardContent sx={{color:"white"}}>PROJECTS</CardContent>
          <Button onClick >
              <Link to="/todo/project/addproject">
              <Icon sx={{ fontSize: 30 , color:'white'}}>add_circle</Icon></Link>
          </Button>
          <Button><HomeIcon sx={{ color:"white"}}color="white" /></Button>         
          </Box></Box>
          <div style={{height:"80vh",listStyleType:'None',overflowY:"scroll"}}>
          {items.map(item => (
            <li key={item.id}>
                <Box sx={{ width:'100vw',display:"flex",justifyContent:'center',margin:'0px'}}>
                 <Card sx={{minWidth:"50vw",maxWidth:"800px",margin:'0px'}}><CardContent> 
                       
                     <Typography sx={{color:'#2185d0'}} variant="h4" component="div">{item['projtitle']}</Typography> 
                     <Typography sx={{ mb: 1.5 }} color="text.secondary">{item['wiki']}</Typography>
                     <Typography variant="body2"><h5>Creator : {item['creator']}</h5></Typography>
                     <CardActions>
                     <Button size="small"><Link sx={{textDecoration:'None'}} to={"/todo/project/id/"+item.id+"/list"}>View List</Link></Button>
                     
                     </CardActions>
                     </CardContent>
                     </Card><br></br></Box><br></br>
              
            </li>
          ))}
          </div>
        </ul></div>
      );
    }
  }
  

  export default function Project()

  {    
    
    const search = useLocation().search;
    const userName = new URLSearchParams(search).get('Token');
    if(userName){
    localStorage.setItem("token",userName)}
            console.log(localStorage.getItem("token"));
       return (MyComponent());
  }
// function main(){
//     var list = [];
// //     var projList = [];
// //     var item ;
// // var isPaused = true;

//  axios.get(`http://localhost:8000/todo/viewsets/project`, {
//     headers: {
//         'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
//     }}).then(function (response) {
//         console.log(response);
        
//     const x = response['data']['count'];
    
//     for (let i = 0 ; i < x ; i ++)
//     {
//         list[i] = response['data']['results'][i]['projtitle'];
        
//     }
//     // isPaused = false;
// })
// return("hi");
// }
// export default function Project()

// {   return (main());
// }

// export default function Project () {
//     const url = 'http://localhost:8000/todo/viewsets/project';
//     const [user,setuser] = useState(null);
//     const [loading , setloading] = useState(true)
//     useEffect(() => {
//         axios.get(`http://localhost:8000/todo/viewsets/project`, {
//         headers: {
//             'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
//         }
//       }).then(function (response) {
//           const x = response['data']['count'];
//           const list = [];
//           for (let i = 0 ; i < x ; i ++)
//           {
//               list[i] = response['data']['results'][i]['projtitle'];
              
//           }
    
//         projList = list;
//         // console.log("hey"+projList);
//         const listItems = projList.map((d) => <li className="li">{d.name}</li>);
//         item = listItems
//         // console.log(item)
//         return (
//             <div>
//             { item }
//             </div>
//           );
//       });
//       return item;

// })
// };
    

 
        




// function getproj()
// {
    
//     axios.get(`http://localhost:8000/todo/viewsets/project`, {
//     headers: {
//         'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
//     }
//   }).then(function (response) {
//       const x = response['data']['count'];
//       const list = [];
//       for (let i = 0 ; i < x ; i ++)
//       {
//           list[i] = response['data']['results'][i]['projtitle'];
//       }

//      projList = list;
//     console.log(projList);
    

//   });
//   return projList;
  
// }
// async function main(){
//     var item ;
//     var projList = [];

//     const list = await axios.get(`http://localhost:8000/todo/viewsets/project`, {
//         headers: {
//             'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
//         }
//       }).then(function (response) {
//           const x = response['data']['count'];
//           const list = [];
//           for (let i = 0 ; i < x ; i ++)
//           {
//               list[i] = response['data']['results'][i]['projtitle'];
              
//           }
    
//         projList = list;
//         // console.log("hey"+projList);
//         const listItems = projList.map((d) => <li className="li">{d.name}</li>);
//         item = listItems
//         // console.log(item)
//         return (
//             <div>
//             { item }
//             </div>
//           );
//       });
//       return item;

// }

    

 

// export default function Login() {
    
//     const val =  main().finally();
//     console.log(val)

//     return ("hii");
   

    // axios.get(`http://localhost:8000/todo/viewsets/project`, {
    //     headers: {
    //         'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
    //     }
    //   }).then(function (response) {
    //       const x = response['data']['count'];
    //       const list = [];
    //       for (let i = 0 ; i < x ; i ++)
    //       {
    //           list[i] = response['data']['results'][i]['projtitle'];
              
    //       }
    
    //     projList = list;
    //     console.log("hey"+projList);
    //     const listItems = projList.map((d) => <li className="li">{d.name}</li>);
    //     item = listItems
    //     console.log(item)
    //     return (
    //         <div>
    //         { item }
    //         </div>
    //       );
    //   });
 
    // const [isLoading, setLoading] = useState(true);
    // console.log("bybh")
    // function makeGetRequest(path) {
    //     return new Promise(function (resolve, reject) {
    //          axios.get(path,{headers : {
    //     'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
    // }}).then(
    //             (response) => {
    //                 const x = response['data']['count'];
    //               const list = [];
    //               for (let i = 0 ; i < x ; i ++)
    //               {
    //                   list[i] = response['data']['results'][i]['projtitle'];
    //               }
    //               projList = list;
    //               resolve(list);
    //             },
    //                 (error) => {
    //                 reject(error);
    //             }
    //         );
    //     });
    // }
      
    // async function main() {
    //     var result = await makeGetRequest('http://localhost:8000/todo/viewsets/project');
    //     console.log(result.result);
    //     console.log('Statement 2');
    // }
    // main();

// function makeGetRequest(path) {
//     axios.get(path,{headers : {
//         'Authorization':'Token 38ee222727bb2bf75f9091c5b395532345a784b3',
//     }}).then(
//         (response) => {
//             const x = response['data']['count'];
//           const list = [];
//           for (let i = 0 ; i < x ; i ++)
//           {
//               list[i] = response['data']['results'][i]['projtitle'];
//           }
//           projList = list;
//         },
//         (error) => {
//             console.log(error);
//         }
//     );
// }
// function main() {
//     var response = makeGetRequest('http://localhost:8000/todo/viewsets/project');
//     console.log(response);
// }
// main();
    

    // const list = getproj();
    // console.log(list);
    // // const urlParams = new URLSearchParams(queryString);
    