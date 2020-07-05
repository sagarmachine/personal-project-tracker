import React, { Component } from 'react'

export default class TaskDetailView extends Component {

    // state={
    //     loading=0
    // }

    render() {

        console.log(this.props.task)
        return (
            <div>
                     TASK DETAIL VIEW {this.props.task.projectTaskIdentifier}
                     <button onClick={()=>this.props.openUpdateTaskDetailView(this.props.selectedTask)} >Update</button>        
            </div>
        )
    }
}
