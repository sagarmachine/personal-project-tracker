 import React, {Component} from "react"
import AddTask from "./add-task/add-task"
import {Link} from "react-router-dom"

 class ProjectBoard extends Component{

   render(){

     return (
       <div className="projectBoard">
       <Link to="/">
         <div className="dark-btn dark-btn--modifier"><i class="fa fa-plus" aria-hidden="true"></i> create a task</div>
      </Link>
       </div>
     )
   }
 }


export default ProjectBoard;
