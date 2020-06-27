 import React, {Component,Fragment} from "react"
import {Link} from "react-router-dom"

 class CreateProjectBtn extends Component{

   render(){

     return (
       <Fragment>
           <Link to="/addProject" className="dark-btn">
               Create a Project
           </Link>
       </Fragment>
     )
   }
 }


export default CreateProjectBtn;
