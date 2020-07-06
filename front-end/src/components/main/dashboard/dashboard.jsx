 import React, {Component} from "react"
import CreateProjectBtn from "./create-project-btn/create-project-btn"
import ProjectItems from "./project-items/project-items"
 class Dashboard extends Component{

   render(){

     return (
       <div className="dashboard">
            <h1 className="dashboard__heading">Projects</h1>
            <CreateProjectBtn /><br />
            <input type="text" style={{height:"6rem",
                                       width:"40rem",
                                       background:"black",
                                       color:"orangered",
                                       margin:"3rem auto",
                                       display:"block",
                                       textAlign:"center",
                                       border:".1rem solid orangered"
                                     }}/>
            <ProjectItems/>
       </div>
     )
   }
 }


export default Dashboard;
