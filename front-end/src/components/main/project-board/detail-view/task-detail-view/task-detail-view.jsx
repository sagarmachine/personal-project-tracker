import React, { Component } from 'react'

export default class TaskDetailView extends Component {

    // state={
    //     loading=0
    // }

    render() {
       console.log(this.props.selectedTask);
        return (
            <div className="taskDetailView">
                <div id="ProjectDetailView__flexer-head" className="ProjectDetailView__flexer taskDetailView__head">
                   <div className="PDVFirst">
                         <div className="">{this.props.selectedTask.projectTaskIdentifier}</div>
                         <div className="">start date: {this.props.selectedTask.startDate}</div>
                   </div>
                   <div className="PDWSecond">
                         <div className="">end date: {this.props.selectedTask.endDate}</div>
                         <div className="">created on: {this.props.selectedTask.createdDate}</div>
                   </div>
                </div>
                <div className="taskDetailView__btn">
                     <div className="dark-btn submitBtn" onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTaskIndex)} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update</div>
                     <div className="dark-btn submitBtn" onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTaskIndex)} ><i className="fa fa-trash" aria-hidden="true"></i> Delete</div>
                </div>
                <hr/>
                <h5>Summary</h5>
                 <div className="ProjectDetailView__des ProjectDetailView__flexer ProjectDetailView__flexer-main">{this.props.selectedTask.summary}</div>

{this.props.selectedTask.notes.length?([<hr/>,
                <h5>Notes</h5>,
                <div className="taskDetailView__notes">
                 <ol>
                       {this.props.selectedTask.notes.map((note,i)=>(
                         <li key={"note"+i} className="taskDetailView__note">
                            {note}
                         </li>
                       ))}
                   </ol>
                </div>]):null}

{this.props.selectedTask.usefullLinks.length?([<hr/>,
                <h5>Links</h5>,
                <div className="taskDetailView__links">
                <ol>
                    {this.props.selectedTask.usefullLinks.map((link,i)=>(
                      <li key={"link"+i} className="taskDetailView__link">
                         <a href={link.link} target="_blank" rel="noopener noreferrer" className="taskDetailView__linkUR">{link.link}</a>
                         <div className="taskDetailView__comment">{link.comment}</div>
                      </li>
                    ))}
                  </ol>
                  </div>]):null}
            </div>
        )
    }
}
