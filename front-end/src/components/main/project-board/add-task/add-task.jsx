 import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

 class AddTask extends Component{

   state={
        summary:"task 2",
        status: "TODO",
        preference:"3",
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
     axios.post("/v1/projecttask/"+this.props.location.state.projectIdentifier,submitedState,{headers:{"Content-Type":"application/json"}})
     .then(res=>{
       console.log("success");
       this.props.history.push("/projectBoard",{
         projectIdentifier:this.props.location.state.projectIdentifier,
         projectName:this.props.location.state.projectName
       })
     }).catch(e=>{
       console.log("failure");
     })
   }

   render(){
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
            <p className="formUI__heading addTask__modifier2">{"Name: "+this.props.location.state.projectName+" ID: "+this.props.location.state.projectIdentifier}</p>
            <div className="formUI__details">
                <textarea
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
            </div>

            <h6 className="formUI__heading">Start Date</h6>
            <div className="formUI__details">
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date"
                name="startDate" />
            </div>
            <h6 className="formUI__heading">End Date</h6>
            <div className="formUI__details">
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date"
                name="endDate" />
            </div>
            <div className="formUI__details">
                <select
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    name="preference">
                        <option value={0}>Select Priority</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Low</option>
                </select>
            </div>

            {/*/ <Link to={{
            //   pathname:"/projectBoard",
            //   state:{
            //     projectIdentifier:this.props.location.state.projectIdentifier,
            //     projectName:this.props.location.state.projectName
            //   }
            // }}>
            // </Link>*/}
                <input
                    onClick={this.onSubmitHandler}
                    type="submit"
                    className="dark-btn addTask__modifier3" />

        </div>
     )
   }
 }


export default AddTask;
