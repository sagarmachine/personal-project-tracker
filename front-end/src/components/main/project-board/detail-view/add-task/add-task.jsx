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
       console.log("failure");
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
     newState.links.splice(linkIndex,1);
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
            <h4 className="formUI__heading">Add  Project Task</h4>
            <p className="formUI__heading addTask__modifier2">{"Name:"+ this.props.projectIdentifier+"  ID: "}</p>
            <div className="formUI__details">
                <textarea
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
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
            <div className="rowMaker rowMaker--marginRemover">
                <div className="formUI__details">
                <h6 className="formUI__heading addTask__dateLabelFixer">Start Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date  addTask__dateLabelFixer"
                name="startDate" />
                </div>
                <div className="formUI__details">
                <h6 className="formUI__heading addTask__dateLabelFixer">End Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date  addTask__dateLabelFixer"
                name="endDate" />
                </div>
            </div>
            <div className="rowMaker rowMaker--marginRemover">
            <div className="addProject__item addProject__item1 addProject__item3 parentFixer">
                    {this.state.notes.map((note,noteIndex)=>(
                        <div className="noteBox">
                              <input
                              type="text"
                              className="addProject__item-name addNote addNote-fixer "
                              name="projectName"
                              value={note}
                              disabled="true"/>
                              <i onClick={()=>this.removeNoteHandler(noteIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer" aria-hidden="true"></i>
                        </div>
                    ))}
                  <div>
                  <input
                  type="text"
                  className="addProject__item-name addNote addNote-fixer"
                  placeholder="add a Note"
                  name="addNote"
                  value={this.state.addNote}
                  onChange={this.onChangeHandler}
                  />
                <i onClick={this.addNoteHandler}  className="fa fa-plus fa-4x addIcon addIcon-fixer addIcon1" aria-hidden="true"></i>
                </div>
              </div>
              <div className="addProject__item addProject__item1 addProject__item3 parentFixer">
                    {this.state.usefullLinks.map((link,linkIndex)=>(
                      <div className="linkBox">
                          <input
                          type="text"
                          className="addProject__item-name addLink-fullLink"
                          value={link.link}
                          disabled="true"/>
                          <i onClick={()=>this.removeLinkHandler(linkIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer removeIcon2" aria-hidden="true"></i>
                          <input
                          type="text"
                          className="addProject__item-name addLink-comment"
                          value={link.comment}
                          disabled="true"/>
                      </div>
                    ))}
                    <div>
                    <input
                    type="text"
                    className="addProject__item-name addLink-fullLink"
                    placeholder="add a Link"
                    name="addLinkFullLink"
                    value={this.state.addLinkFullLink}
                    onChange={this.onChangeHandler}
                    />
                    <input
                    type="text"
                    className="addProject__item-name addLink-comment"
                    placeholder="add a comment"
                    name="addLinkComment"
                    value={this.state.addLinkComment}
                    onChange={this.onChangeHandler}
                    />
                    <i onClick={this.addLinkHandler}  className="fa fa-plus fa-4x addIcon  addIcon-fixer addIcon2" aria-hidden="true"></i>
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
