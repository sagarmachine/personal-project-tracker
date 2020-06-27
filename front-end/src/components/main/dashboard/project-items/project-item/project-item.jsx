 import React, {Component} from "react"


 class ProjectItem extends Component{

   render(){

     return (
         // <!-- Project Item Component -->
        <div className="projectItem">
                    <div className="projectItem__details">
                        <h3>Spring / React Project</h3>
                        <p>Project to create a Kanban Board with Spring Boot and React</p>
                    </div>
                    <div className="projectItem__edits">
                        <ul className="projectItem__edits-list">
                            <a href="#">
                                <li className="projectItem__edits-board projectItem__edits-item">
                                    <i className="fa fa-flag-checkered pr-1"> Project Board</i>
                                </li>
                            </a>
                            <a href="#">
                                <li className="projectItem__edits-update projectItem__edits-item">
                                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                                </li>
                            </a>
                            <a href="">
                                <li className="projectItem__edits-delete projectItem__edits-item">
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
        // <!-- End of Project Item Component -->
     )
   }
 }


export default ProjectItem;
