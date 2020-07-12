 import React, {Component} from "react"
import {Link} from "react-router-dom"
import TodoTask from "./todo-task/todo-task"
import InDevelopmentTask from "./in-development-task/in-development-task"
import CompletedTask from "./completed-task/completed-task"
import UpdateTask from "./detail-view/update-task/update-task"
import DetailView from "./detail-view/detail-view"
import axios from "axios";
import LayoutContext from "../../layout/layout-context"

 class ProjectBoard extends Component{


   state={
     todoToggle:"visible",
     inDevelopmentToggle:"hidden",
     completedToggle:"hidden",
     data:[],
     active:"detailViewClose",
     detailViewIndex:1,
     loadingTasks:false,
     selectedTaskIndex:-1,
     updating:false,

   }

   static contextType= LayoutContext
   activeHandler=()=>{
      if(this.state.active==="detailViewClose"){
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

   reloadTaskHandler=()=>{
    this.setState({loadingTasks:true})

   }


   componentDidUpdate=()=>{
    const identifier = "/v1/project/"+this.props.location.state.projectIdentifier+"/projecttask"
    if(this.state.loadingTasks)
    axios.get(identifier)
     .then(res=>{
       this.setState({
         data:res.data,
         loadingTasks:false
       });
       if(this.state.selectedTaskIndex>=0)
       this.openTaskDetailViewHandler(this.state.selectedTaskIndex);
       else{
         this.openProjectDetailViewHandler();
       }
     }).catch(e=>{
       console.log(e);
     })

     if(this.state.updating)
     this.setState({updating:false})

   }


   componentDidMount=()=>{
     this.setState({loadingTasks:true})
   }


   openProjectDetailViewHandler=()=>{
     this.setState({detailViewIndex:1});
     this.activeHandler();
   }
   openTaskDetailViewHandler=(index)=>{
    this.setState({detailViewIndex:2,selectedTaskIndex:index});
    this.activeHandler();
  }
  openAddTaskDetailViewHandler=()=>{
    this.setState({detailViewIndex:3,selectedTaskIndex:-1});
    this.activeHandler();
  }
  openUpdateTaskDetailViewHandler=(index)=>{
    console.log(index)
    this.setState({detailViewIndex:4,selectedTaskIndex:index});
    this.activeHandler();
  }

  deleteHandler=(index,id)=>{
     if(window.confirm('Are you sure you would like to accept this reply as your favor?')===true){
        axios.delete("/v1/projecttask/"+id).then(res=>{
        let newData = [...this.state.data]
        newData.splice(index,1);
        console.log(newData);
        let selectedTaskIndexTemp=this.state.selectedTaskIndex;
        let detailViewIndexTemp =this.state.detailViewIndex;
        if(this.state.selectedTaskIndex>index)
              selectedTaskIndexTemp -=1;
         if(detailViewIndexTemp===1)
         { 
           detailViewIndexTemp=2;
          selectedTaskIndexTemp=0;
        
        } 
        if(this.state.data.length===1)
        {
          detailViewIndexTemp=3;
          selectedTaskIndexTemp=-1;
        }
        this.setState({data:newData,selectedTaskIndex:selectedTaskIndexTemp,detailViewIndex:detailViewIndexTemp})
        
               
       }).catch(e=>{
         alert(e);
       })
     }else{
       alert("not proceeded");
     }
  }

   render(){

    if(this.context.authenticated==false)
    window.location.href = "http://localhost:3000/login";

     let todo = null;
     if(this.state.data.length===0){
          todo =<div  onClick={this.openAddTaskDetailViewHandler}>{<div className="dark-btn submitBtn"><i className="fa fa-plus" aria-hidden="true"></i> Task</div>} </div>

     }else{
         todo = <ul className="projectBoard__ul">
           {this.state.data.map((data,index)=>{
             return (data.status==="TO_DO")?
                    <li  className="projectBoard__li">
                        <TodoTask
                            delete={this.deleteHandler}
                            activeHandler={this.activeHandler}
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            openTaskDetailView={this.openTaskDetailViewHandler}
                            openUpdateTaskDetailView={this.openUpdateTaskDetailViewHandler}
                            index={index}
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
           {this.state.data.map((data,index)=>{
             return (data.status==="IN_PROGRESS")?
                    <li  className="projectBoard__li">
                        <InDevelopmentTask
                            delete={this.deleteHandler}
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            openTaskDetailView={this.openTaskDetailViewHandler}
                            openUpdateTaskDetailView={this.openUpdateTaskDetailViewHandler}
                            index={index}
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
           {this.state.data.map((data,index)=>{
             return (data.status==="DONE")?
                    <li  className="projectBoard__li">
                        <CompletedTask
                            delete={this.deleteHandler}
                            summary={data.summary}
                            status={data.status}
                            preference={data.preference}
                            id={data.projectTaskIdentifier}
                            updateID={data.id}
                            projectIdentifier={this.props.location.state.projectIdentifier}
                            openTaskDetailView={this.openTaskDetailViewHandler}
                            openUpdateTaskDetailView={this.openUpdateTaskDetailViewHandler}
                            index={index}
                            />
                   </li>
                   :null
           })
         }
         </ul>
     }
     if(this.state.loadingTasks===true){
       return null;
     }
     return (



       <div className="projectBoard">
        <div onClick={this.activeHandler} className="detailView__head">
            {(this.state.active==="detailViewOpen")
                ?<i className="onOffTogler fa fa-toggle-on" aria-hidden="true"></i>
                :<i className="onOffTogler fa fa-toggle-off" aria-hidden="true"></i>
              }
         </div>

               {this.state.updating?null:
                <DetailView  activeClass={this.state.active}
                          detailViewIndex={this.state.detailViewIndex}
                          projectIdentifier={this.props.location.state.projectIdentifier}
                          reloadTasks={this.reloadTaskHandler}
                          selectedTask={this.state.data[this.state.selectedTaskIndex]}
                          openUpdateTaskDetailView={this.openUpdateTaskDetailViewHandler}
                          selectedTaskIndex={this.state.selectedTaskIndex}
                          openTaskDetailView={this.openTaskDetailViewHandler}
                          projectData={this.props.location.state.data}
                          data={this.state.data}
               
             />
          }







             {(this.state.data.length!==0)?
             <div style={{display:"inline-block"}} className="submitBtn" onClick={this.openAddTaskDetailViewHandler}>Add Task Button</div>
            //  <Link to={{
            //    pathname:"/addTask",
            //    state:{
            //      projectIdentifier:this.props.location.state.projectIdentifier,
            //      projectName:this.props.location.state.projectName
            // }}}>
            //     <div className="dark-btn dark-btn--modifier"><i className="fa fa-plus" aria-hidden="true"></i> create a task</div>
            // </Link>
            :null}

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
                      <i onClick={this.openProjectDetailViewHandler} className="fa fa-hourglass-end" aria-hidden="true"></i>
                </div>
          </div>
       </div>
     )
   }
 }


export default ProjectBoard;
