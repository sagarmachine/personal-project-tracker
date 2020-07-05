 import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

 class UpdateTask extends Component{

   state={
           id:this.props.location.state.id,
           summary:this.props.location.state.summary,
           status: this.props.location.state.status,
           preference:this.props.location.state.preference,
           startDate:"",
           endDate:""
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

   onSubmitHandler=()=>{
     const submitedState = this.state
     axios.put("/v1/projecttask/"+this.props.location.state.projectIdentifier,submitedState,{headers:{"Content-Type":"application/json"}})
     .then(res=>{
       // console.log("success");
       this.props.history.push("/projectBoard",{
         projectIdentifier:this.props.location.state.projectIdentifier,
         projectName:this.props.location.state.projectName
       })
     }).catch(e=>{
       console.log("failure");
     })
   }

   render(){
     console.log(this.state);
     return (
        <div className="addTask formUI">
            <Link
            to={{
              pathname:"/projectBoard",
              state:{
                projectIdentifier:this.props.location.state.projectIdentifier
               }
            }}
            className="formUI__heading addTask__modifier1">
                Back to Project Board
            </Link>
            <h4 className="formUI__heading">Add /Update Project Task</h4>
            <p className="formUI__heading addTask__modifier2">{"ID: "+this.props.location.state.projectIdentifier}</p>
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