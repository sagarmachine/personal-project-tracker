 import React, {Component} from "react"
import {Link} from "react-router-dom"
import TodoTask from "./todo-task/todo-task"
import InDevelopmentTask from "./in-development-task/in-development-task"
import CompletedTask from "./completed-task/completed-task"
import UpdateTask from "./update-task/update-task"
import AddTask  from "./add-task/add-task"
import DetailView from "./detail-view/detail-view"
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner"

 class ProjectBoard extends Component{


   state={
     todoToggle:"visible",
     inDevelopmentToggle:"hidden",
     completedToggle:"hidden",
     data:[],
     active:"detailViewClose"
   }

   activeHandler=()=>{
      let newState = this.state;
      if(newState.active==="detailViewClose"){
         this.setState({
           active:"detailViewOpen"
         })
      }else{
        this.setState({
          active:"detailViewClose"
        })
      }
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

   componentDidMount=()=>{
     const identifier = "/v1/project/"+this.props.location.state.projectIdentifier+"/projecttask"
     console.log(identifier);
     axios.get(identifier)
     .then(res=>{
       console.log(res);
       this.setState({
         data:res.data
       })
     }).catch(e=>{
       console.log(e);
     })
   }


   render(){
     console.log(this.props.location.state);
     let todo = null;
     if(this.state.data.length===0){
         todo = <Link to={{
           pathname:"/addTask",
           state:{
             projectIdentifier:this.props.location.state.projectIdentifier,
             projectName:this.props.location.state.projectName
        }}}>
            <div className="dark-btn dark-btn--modifier"><i className="fa fa-plus" aria-hidden="true"></i> create a task</div>
        </Link>
     }else{
         todo = <ul className="projectBoard__ul">
           {this.state.data.map(data=>{
             return (data.status==="TO_DO")?
                    <li  className="projectBoard__li">
                        <TodoTask
                            activeHandler={this.activeHandler}
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            />
                   </li>
                   :null
           })
         }
         </ul>
     }

     let inDevelopment = null;
     if(this.state.data.length===0){
         inDevelopment = null;
     }else{
         inDevelopment = <ul className="projectBoard__ul">
           {this.state.data.map(data=>{
             return (data.status==="IN_PROGRESS")?
                    <li  className="projectBoard__li">
                        <InDevelopmentTask
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            />
                   </li>
                   :null
           })
         }
         </ul>
     }

     let completed = null;
     if(this.state.data.length===0){
         completed = null
     }else{
         completed = <ul className="projectBoard__ul">
           {this.state.data.map(data=>{
             return (data.status==="DONE")?
                    <li  className="projectBoard__li">
                        <CompletedTask
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            />
                   </li>
                   :null
           })
         }
         </ul>
     }

     return (
       <div className="projectBoard">
        <div onClick={this.activeHandler} className="detailView__head">
            {(this.state.active==="detailViewOpen")
                ?<i className="fa fa-toggle-on" aria-hidden="true"></i>
                :<i className="fa fa-toggle-off" aria-hidden="true"></i>
              }
         </div>
             <DetailView activeClass={this.state.active}>
                   <div style={{color:"white"}}>
                       <UpdateTask />
                   </div>
             </DetailView>
             {(this.state.data.length!==0)?<Link to={{
               pathname:"/addTask",
               state:{
                 projectIdentifier:this.props.location.state.projectIdentifier,
                 projectName:this.props.location.state.projectName
            }}}>
                <div className="dark-btn dark-btn--modifier"><i className="fa fa-plus" aria-hidden="true"></i> create a task</div>
            </Link>:null}

            <div className='projectBoard__chart'>
                <div
                onClick={()=>this.onClickHandler("todoToggle")}
                className="projectBoardTogger projectBoardTogger__todo">
                     <i className="fa fa-tasks" aria-hidden="true"></i>
                     <span className="projectBoard__span">todo list tasks</span>
                </div>
                <div
                className={this.state.todoToggle}>
                 {todo}
                </div>
                <div
                onClick={()=>this.onClickHandler("inDevelopmentToggle")}
                className="projectBoardTogger projectBoardTogger__inDevelopment">
                     <i className="fa fa-spinner" aria-hidden="true"></i>
                      <span className="projectBoard__span">in development tasks</span>
                </div>
                <div
                className={this.state.inDevelopmentToggle}>
                  {inDevelopment}
                </div>
                <div
                onClick={()=>this.onClickHandler("completedToggle")}
                className="projectBoardTogger projectBoardTogger__completed">
                      <i className="fa fa-check" aria-hidden="true"></i>
                       <span className="projectBoard__span">compeleted tasks</span>
                </div>
                <div
                className={this.state.completedToggle}>
                   {completed}
                </div>
                <div
                       style={{
                         background:"darkgrey",
                         color:"#51e890",
                         fontSize:"3.5rem"
                       }}
                       className="projectBoardTogger">
                      <i className="fa fa-hourglass-end" aria-hidden="true"></i>
                </div>
          </div>
       </div>
     )
   }
 }


export default ProjectBoard;
