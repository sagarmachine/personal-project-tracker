 import React, {Component} from "react"



 class AddTask extends Component{

   state={
     addTask:{
        summary:"task 2",
        status: "TODO",
        preference:"3",
        startDate:"",
        endDate:""
     }
   }


   render(){
     return (
        <div>
            <a href="#" className="btn btn-light">
                Back to Project Board
            </a>
            <h4 className="display-4 text-center">Add /Update Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="summary" placeholder="Project Task summary" />
            </div>
            <div className="form-group">
                <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
            </div>
            <h6>Due Date</h6>
            <div className="form-group">
                <input type="date" className="form-control form-control-lg" name="dueDate" />
            </div>
            <div className="form-group">
                <select className="form-control form-control-lg" name="priority">
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>
            <div className="form-group">
                <select className="form-control form-control-lg" name="status">
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
            </select>
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4" />

        </div>
     )
   }
 }


export default AddTask;
