import React, { Component } from 'react'

export default class TaskDetailView extends Component {

    // state={
    //     loading=0
    // }

    render() {

        return (
            <div>
                     TASK DETAIL VIEW {this.props.selectedTask.projectTaskIdentifier}
                     <button onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTaskIndex)} >Update</button>        
            </div>
        )
    }
}
