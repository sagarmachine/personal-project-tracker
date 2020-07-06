 import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

 class UpdateTask extends Component{


   state={
           id:"id",
           summary:"summary",
           status: "DONE",
           preference:"HIGH",
           startDate:"",
           endDate:"",
          //prevTask:"",   
             }

   onChangeHandler=(e)=>{
     const name = e.target.name
     const value = e.target.value
     this.setState((prevState)=>{
        return (
          {
            ...prevState,
            [name]:value
          }
        )
     })
   }

   componentDidMount=()=>{
    this.setState({...this.props.selectedTask,prevTask:this.props.selectedTask.id});
   }


   componentDidUpdate=(prevProps, prevState, snapshot)=>{
     console.log(this.state.id+":"+prevState.prevTask);
    if(this.state.prevTask!=this.props.selectedTask.id)
    this.setState({...this.props.selectedTask,prevTask:this.props.selectedTask.id});

   }

   onSubmitHandler=()=>{
     const submitedState = this.state
     axios.put("/v1/projecttask/"+this.props.projectIdentifier,submitedState,{headers:{"Content-Type":"application/json"}})
     .then(res=>{
       console.log(res);
       this.props.reloadTasks();
     }).catch(e=>{
       console.log("failure");
     })
   }

   update=()=>{

this.setState({...this.props.selectedTask});

   }

   render(){

     return (
        <div className="addTask formUI">
            <h4 className="formUI__heading addTask__modifier2">Update Project Task</h4>
            <p className="formUI__heading addTask__modifier2">{"ID: "}</p>
            <div className="formUI__details">
                <textarea
                    value={this.state.summary}
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
            </div>
            <h6 className="formUI__heading">Start Date</h6>
            <div className="formUI__details">
                <input
                value={this.state.startDate}
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date"
                name="startDate" />
            </div>
            <h6 className="formUI__heading">End Date</h6>
            <div className="formUI__details">
                <input
                value={this.state.endDate}
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date"
                name="endDate" />
            </div>
            <div className="formUI__details">
                <select
                    value={this.state.preference}
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    name="preference">
                        <option value={0}>Select Priority</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Low</option>
                </select>
            </div>
            <div className="formUI__details">
                <select
                    value={this.state.status}
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    name="status">
                        <option value="">Select Status</option>
                        <option value="TO_DO">TO DO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
            </select>
            </div>
            <input
            onClick={this.onSubmitHandler}
            type="submit"
            className="dark-btn addTask__modifier3" />

        </div>
     )
   }
 }


export default UpdateTask;
