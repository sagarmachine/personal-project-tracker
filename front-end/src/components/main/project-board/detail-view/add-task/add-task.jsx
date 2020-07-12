 import React, {Component} from "react"
// import {Link} from "react-router-dom"
import axios from "axios"

 class AddTask extends Component{

   state={
        summary:"task 2",
        status: "TODO",
        preference:"3",
        startDate:"",
        endDate:"",
        addNote:"",
        notes:[],
        usefullLinks:[],
        addLinkFullLink:"",
        addLinkComment:""
   }

   onSubmitHandler=()=>{
     const submitedState = {
       summary:this.state.summary,
       status:this.state.status,
       preference:this.state.preference,
       startDate: this.state.startDate,
       endDate: this.state.endDate,
       notes:this.state.notes,
       usefullLinks:this.state.usefullLinks
     }
     axios.post("/v1/projecttask/"+this.props.projectIdentifier,submitedState,{headers:{"Content-Type":"application/json"}})
     .then(res=>{
       console.log(res);
      this.props.reloadTasks();
     }).catch(e=>{
       if(e.response.data){
         alert(e.response.data[0])
       }else{
         alert("Something went wrong")
       }
     })
   }

   removeNoteHandler=(noteIndex)=>{
     let newState= this.state
     newState.notes.splice(noteIndex,1);

     this.setState({
        ...newState
     })
   }

   addNoteHandler=()=>{
     let newState= this.state
     if(newState.addNote.length!==0){
       newState.notes.push(newState.addNote);
       newState.addNote="";
       this.setState({
         ...newState
       })
     }
   }

   removeLinkHandler=(linkIndex)=>{
     let newState= this.state
     newState.usefullLinks.splice(linkIndex,1);
     this.setState({
        ...newState
     })
   }

   addLinkHandler=()=>{
     let newState= this.state
     let link={
       link:newState.addLinkFullLink,
       comment:newState.addLinkComment
     }
     if(newState.addLinkFullLink.length!==0 && newState.addLinkComment.length!==0){
       newState.usefullLinks.push(link);
       newState.addLinkFullLink=""
       newState.addLinkComment=""
       this.setState({
         ...newState
       })
     }
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



   render(){
     return (
        <div className="addTask formUI">
            {/* <Link
            to={{
              pathname:"/projectBoard",
              state:{
                projectIdentifier:this.props.location.state.projectIdentifier
               }
            }}
            className="formUI__heading addTask__modifier1">
                Back to Project Board
            </Link> */}
            <div className="sticky">
              <h6 className="formUI__heading">Add Task</h6>
              <h6 className="formUI__heading addTask__modifier2"><strong>{this.props.projectIdentifier}</strong></h6>
            </div>
            <div className="formUI__details">
              <h6 className="itemdate">summary</h6>
                <textarea
                    onChange={this.onChangeHandler}
                    className="formUI__name-input  inputSize"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
            </div>
            <div className="formUI__details">
              <h6 className="itemdate">Priority</h6>
                <select
                    onChange={this.onChangeHandler}
                    className="formUI__name-input  inputSize"
                    name="preference">
                        <option value={0}>Select Priority</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option selected value={3}>Low</option>
                </select>
            </div>
            <div className="rowMaker rowMaker--marginRemover">
                <div className="formUI__details">
                <h6 className="itemdate">Start Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date inputSize  addTask__dateLabelFixer"
                name="startDate" />
                </div>
                <div className="formUI__details">
                <h6 className="itemdate">End Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date inputSize  addTask__dateLabelFixer"
                name="endDate" />
                </div>
            </div>
            <div className="">
            <div className="addProject__item addP inputSizeroject__item1 addProject__item3 parentFixer">
                <h6>Notes</h6>
                    {this.state.notes.map((note,noteIndex)=>(
                        <div className="noteBox">
                              <input
                              type="text"
                              className="addProject__item-name inputSize addNote addNote-fixer "
                              name="projectName"
                              value={note}
                              disabled="true"/>
                              <i onClick={()=>this.removeNoteHandler(noteIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer" aria-hidden="true"></i>
                        </div>
                    ))}
                  <div>
                  <input
                  type="text"
                  className="addProject__item-name inputSize addNote addNote-fixer"
                  placeholder="add a Note"
                  name="addNote"
                  value={this.state.addNote}
                  onChange={this.onChangeHandler}
                  />
                <i onClick={this.addNoteHandler}  className="fa fa-plus fa-4x addIcon addIcon-fixer1 addIcon1" aria-hidden="true"></i>
                </div>
              </div>
              <div className="addProject__item inputSizeroject__item1 addProject__item3 parentFixer">
                 <h6>Usefull Links</h6>
                    {this.state.usefullLinks.map((link,linkIndex)=>(
                      <div className="linkBox">
                          <input
                          type="text"
                          className="addProject__item-name inputSize addLink-fullLink fullLink-fixer"
                          value={link.link}
                          disabled="true"/>
                          <i onClick={()=>this.removeLinkHandler(linkIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer removeIcon2" aria-hidden="true"></i>
                          <input
                          type="text"
                          className="addProject__item-name inputSize addLink-comment comment-fixer"
                          value={link.comment}
                          disabled="true"/>
                          <span className="comment__span comment__span-fixer">comment :</span>
                      </div>
                    ))}
                    <div>
                    <input
                    type="text"
                    className="addProject__item-name inputSize addLink-fullLink"
                    placeholder="add a Link"
                    name="addLinkFullLink"
                    value={this.state.addLinkFullLink}
                    onChange={this.onChangeHandler}
                    />
                    <input
                    type="text"
                    className="addProject__item-name inputSize addLink-comment comment-fixer"
                    placeholder="add a comment"
                    name="addLinkComment"
                    value={this.state.addLinkComment}
                    onChange={this.onChangeHandler}
                    />
                    <i onClick={this.addLinkHandler}  className="fa fa-plus fa-4x addIcon  addIcon-fixer2 addIcon2" aria-hidden="true"></i>
                    <span className="comment__span comment__span-fixer">comment :</span>
                    </div>
              </div>

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
                    className="submitBtn dark-btn addTask__modifier3" />

        </div>
     )
   }
 }


export default AddTask;
