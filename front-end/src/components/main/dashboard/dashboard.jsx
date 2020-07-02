 import React, {Component} from "react"
import CreateProjectBtn from "./create-project-btn/create-project-btn"
import ProjectItems from "./project-items/project-items"
 class Dashboard extends Component{

   render(){

     return (
       <div className="dashboard">
            <h1 className="dashboard__heading">Projects</h1>
            <CreateProjectBtn />
            <ProjectItems/>
       </div>
     )
   }
 }


export default Dashboard;
