 import React, {Component} from "react"
import ProjectDetailView from "./project-detail-view/project-detail-view";
import AddTask from "./add-task/add-task";
import UpdateTask from "./update-task/update-task";
import TaskDetailView from "./task-detail-view/task-detail-view";

 class DetailView extends Component{


   render(){

      console.log(this.props.detailViewIndex)
     let detailView=null;
     let detailViewIndex=this.props.detailViewIndex;
     if(detailViewIndex===1)
     detailView=<ProjectDetailView/>
     else if(detailViewIndex===2)
     detailView=<TaskDetailView  selectedTask={this.props.selectedTask} selectedTaskIndex={this.props.selectedTaskIndex} openUpdateTaskDetailView={this.props.openUpdateTaskDetailView} />
     else if(detailViewIndex===3)
     detailView=<AddTask projectIdentifier={this.props.projectIdentifier} reloadTasks={this.props.reloadTasks}/>
     else if(detailViewIndex===4)
     detailView=<UpdateTask selectedTask={this.props.selectedTask}  projectIdentifier={this.props.projectIdentifier} reloadTasks={this.props.reloadTasks}/>




     return (
        <div className={"detailView "+this.props.activeClass}>
           {/* <p className="detailView__para">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus soluta tenetur atque, temporibus adipisci, officia eligendi quam, modi facilis, sunt nulla! Dicta tenetur dolorum mollitia expedita dolore illum maxime architecto perspiciatis fuga amet accusantium nemo, molestiae asperiores alias corporis, ullam explicabo unde! Praesentium animi quisquam fuga perspiciatis! Mollitia, similique.
           </p>
            <p className="detailView__para">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus soluta tenetur atque, temporibus adipisci, officia eligendi quam, modi facilis, sunt nulla! Dicta tenetur dolorum mollitia expedita dolore illum maxime architecto perspiciatis fuga amet accusantium nemo, molestiae asperiores alias corporis, ullam explicabo unde! Praesentium animi quisquam fuga perspiciatis! Mollitia, similique.
            </p> */}
            
           {detailView}
          </div>
     )
   }
 }


export default DetailView;
