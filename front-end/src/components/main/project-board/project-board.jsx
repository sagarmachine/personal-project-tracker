 import React, {Component} from "react"
import AddTask from "./add-task/add-task"
import {Link} from "react-router-dom"
import TodoTask from "./todo-task/todo-task"
import InDevelopmentTask from "./in-development-task/in-development-task"
import CompletedTask from "./completed-task/completed-task"

 class ProjectBoard extends Component{


   state={
     todoToggle:"hidden",
     inDevelopmentToggle:"hidden",
     completedToggle:"hidden",
   }

   onClickHandler=(name)=>{
       let newState = null;
       if(this.state[name]==="hidden"){
         newState = "visible"
       }else{
         newState = "hidden"
       }
       this.setState({
         [name]:newState
       })
   }

   render(){


     return (
       <div className="projectBoard">
             <Link to={{
               pathname:"/addTask",
               params:{
                 // projectIdentifier:this.props.location.params.projectIdentifier,

            }}}>
                <div className="dark-btn dark-btn--modifier"><i className="fa fa-plus" aria-hidden="true"></i> create a task</div>
            </Link>

            <div className='projectBoard__chart'>
                <div
                onClick={()=>this.onClickHandler("todoToggle")}
                className="projectBoardTogger">
                     <i class="fa fa-tasks" aria-hidden="true"></i>
                     <span className="projectBoard__span">todo list tasks</span>
                </div>
                <div
                className={this.state.todoToggle}>
                  <ul>
                    <li  className="projectBoard__li">
                        <TodoTask />
                    </li>
                  </ul>
                </div>
                <div
                onClick={()=>this.onClickHandler("inDevelopmentToggle")}
                className="projectBoardTogger">
                     <i class="fa fa-spinner" aria-hidden="true"></i>
                      <span className="projectBoard__span">in development tasks</span>
                </div>
                <div
                className={this.state.inDevelopmentToggle}>
                <ul>
                  <li className="projectBoard__li">
                     <InDevelopmentTask/>
                  </li>
                </ul>
                </div>
                <div
                onClick={()=>this.onClickHandler("completedToggle")}
                className="projectBoardTogger">
                      <i class="fa fa-check" aria-hidden="true"></i>
                       <span className="projectBoard__span">compeleted tasks</span>
                </div>
                <div
                className={this.state.completedToggle}>
                <ul>
                  <li  className="projectBoard__li">
                     <CompletedTask/>
                  </li>
                </ul>
                </div>
                <div
                       style={{
                         background:"darkgrey",
                         color:"#51e890",
                         fontSize:"3.5rem"
                       }}
                       className="projectBoardTogger">
                      <i class="fa fa-hourglass-end" aria-hidden="true"></i>
                </div>
          </div>
       </div>
     )
   }
 }


export default ProjectBoard;
