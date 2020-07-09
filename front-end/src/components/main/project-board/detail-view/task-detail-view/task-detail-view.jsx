import React, { Component } from 'react'

export default class TaskDetailView extends Component {

    // state={
    //     loading=0
    // }

    render() {
       console.log(this.props.selectedTask);
        return (
            <div className="taskDetailView">
                <div className="taskDetailView__head">
                     <div className="taskDetailView__identifier">TASK DETAIL VIEW: {this.props.selectedTask.projectTaskIdentifier}</div>
                     <div className="taskDetailView__date taskDetailView__startDate">START DATE: {this.props.selectedTask.startDate}</div>
                     <div className="taskDetailView__date taskDetailView__endDate">END DATE: {this.props.selectedTask.endDate}</div>
                     <div className="taskDetailView__date taskDetailView__createdOn">CREATED ON: {this.props.selectedTask.createdDate}</div>
                </div>
                <div className="taskDetailView__btn">
                     <div className="dark-btn submitBtn" onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTaskIndex)} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update</div>
                     <div className="dark-btn submitBtn" onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTaskIndex)} ><i className="fa fa-trash" aria-hidden="true"></i> Delete</div>
                </div>
                <h3>NOTES</h3>
                <div className="taskDetailView__notes">
                   {this.props.selectedTask.notes.map((note,i)=>(
                     <div key={"note"+i} className="taskDetailView__note">
                        {note.note}
                     </div>
                   ))}
                </div>
                <h3>LINKS</h3>
                <div className="taskDetailView__links">
                  {this.props.selectedTask.usefullLinks.map((link,i)=>(
                    <div key={"link"+i} className="taskDetailView__link">
                       <div className="taskDetailView__linkUR">{link.link}</div>
                       <div className="taskDetailView__comment">{link.comment}</div>
                    </div>
                  ))}
                </div>
            </div>
        )
    }
}
