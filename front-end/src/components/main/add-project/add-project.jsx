 import React, {Component} from "react"


 class AddProject extends Component{

   render(){

     return (
        <div className="addProject">
          <h5 className="addProject__heading">Create / Edit Project form</h5>
<hr />
          <div className="addProject__item">
                <input type="text" className="addProject__item-name" placeholder="Project Name" />
          </div>
          <div className="addProject__item">
                <input type="text" className="addProject__item-id" placeholder="Unique Project ID"/>
          </div>
          <div className="addProject__item">
                <textarea className="addProject__item-des" placeholder="Project Description"></textarea>
          </div>
          <h6>Start Date</h6>
          <div className="addProject__item">
                <input type="date" className="addProject__item-date" name="start_date" />
          </div>
          <h6>Estimated End Date</h6>
          <div className="addProject__item">
                <input type="date" className="addProject__item-date" name="end_date" />
          </div>
          <div className="addProject__item">
                <input type="submit" className="submitBtn" />
          </div>
          <div className="addProject__img">
          </div>
        </div>
     )
   }
 }


export default AddProject;
