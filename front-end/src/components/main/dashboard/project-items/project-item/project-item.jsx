 import React, {Component} from "react"
import axios from "axios";
import {Link} from "react-router-dom"

 class ProjectItem extends Component{

   onClickHandler=()=>{
     axios.delete("/v1/project/"+this.props.name).then(res=>{
       console.log(res);
     }).catch(e=>{
       console.log(e);
     })
   }


   render(){

     return (
         // <!-- Project Item Component -->
        <div className="projectItem">
                    <div className="projectItem__details">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.des}</p>
                    </div>
                    <div className="projectItem__edits">
                        <ul className="projectItem__edits-list">
                            <Link to="">
                                <li className="projectItem__edits-board projectItem__edits-item">
                                    <i className="fa fa-flag-checkered pr-1"> Project Board</i>
                                </li>
                            </Link>
                            <Link to="">
                                <li className="projectItem__edits-update projectItem__edits-item">
                                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                                </li>
                            </Link>
                            <Link to="/dashboard">
                                <li onClick={this.onClickHandler} className="projectItem__edits-delete projectItem__edits-item">
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
        // <!-- End of Project Item Component -->
     )
   }
 }


export default ProjectItem;
