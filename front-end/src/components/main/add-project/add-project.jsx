 import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

 class AddProject extends Component{
    state={
      projectName: "",
      projectIdentifier: "",
      projectDescription: "",
      startingDate: "",
      endingDate: "",
    }

    onChangeHandler=(e)=>{
      const value = e.target.value
      const name = e.target.name
      let newState = {...this.state}
      this.setState({
        newState,[name]:value
      })
    }

    onSubmitHandler=()=>{

      console.log(this.props);
       const newProject= {
         projectName:this.state.projectName,
         projectIdentifier:this.state.projectIdentifier,
         projectDescription:this.state.projectDescription,
         startingDate: this.state.startingDate,
         endingDate: this.state.endingDate
       }

       axios.post("/v1/project",newProject,{headers:{"Content-Type":"application/json"}}).then(response=>{
           console.log(response);
           this.props.history.push("/dashboard");
       }).catch(e=>{
          console.log(e);
       })
    }

   render(){

     return (
        <div className="addProject">
          <h5 className="addProject__heading">Create / Edit Project form</h5>
<hr />
          <div className="addProject__item">
                <input
                type="text"
                className="addProject__item-name"
                placeholder="Project Name"
                name="projectName"
                value={this.state.projectName}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item">
                <input
                type="text"
                className="addProject__item-id"
                placeholder="Unique Project ID"
                name="projectIdentifier"
                value={this.state.projectIdentifier}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item">
                <textarea
                className="addProject__item-des"
                placeholder="Project Description"
                name="projectDescription"
                value={this.state.projectDescription}
                onChange={this.onChangeHandler}></textarea>
          </div>
          <h6>Start Date</h6>
          <div className="addProject__item">
                <input
                type="date"
                className="addProject__item-date"
                name="startingDate"
                value={this.state.startingDate}
                onChange={this.onChangeHandler}/>
          </div>
          <h6>Estimated End Date</h6>
          <div className="addProject__item">
                <input
                type="date"
                className="addProject__item-date"
                name="endingDate"
                value={this.state.endingDate}
                onChange={this.onChangeHandler}/>
          </div>
          <div className="addProject__item">
                    <input
                    onClick={this.onSubmitHandler}
                    type="submit"
                    className="submitBtn" />
          </div>
          <div className="addProject__img">
          </div>
        </div>
     )
   }
 }


export default AddProject;
