 import React, {Component} from "react"
// import {Link} from "react-router-dom"
import axios from "axios"

 class UpdateTask extends Component{


   state={
          id:"id",
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

   componentDidMount=()=>{
     let notes= this.props.selectedTask.notes.map(note=>note);
     let links = this.props.selectedTask.usefullLinks.map(link=>({link:link.link,comment:link.comment}));
     console.log(notes);
    this.setState({
      ...this.props.selectedTask,
      id:this.props.selectedTask.id,
      notes:notes,
      usefullLinks:links,
    });
   }

   //
   // componentDidUpdate=(prevProps, prevState, snapshot)=>{
   //   console.log(this.state.id+":"+prevState.prevTask);
   //  if(this.state.prevTask!=this.props.selectedTask.id)
   //  this.setState({...this.props.selectedTask,prevTask:this.props.selectedTask.id});
   //
   // }

   onSubmitHandler=()=>{
     const submitedState ={...this.state}
     console.log("log before submiting "+ submitedState);
     axios.put("/v1/projecttask/"+this.props.projectIdentifier,submitedState,{headers:{"Content-Type":"application/json"}})
     .then(res=>{
       console.log(res);
       this.props.reloadTasks();
      // this.props.openTaskDetailView(this.props.selectedTaskIndex);
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
           <div className="sticky">
                <h6 className="formUI__heading">Add Task</h6>
                <h6 className="formUI__heading addTask__modifier2">Name: <strong>{this.state.id}</strong></h6>
            </div>
            <div className="formUI__details">
              <h6 className="itemdate">summary</h6>
                <textarea
                    value={this.state.summary}
                    onChange={this.onChangeHandler}
                    className="formUI__name-input colorChanger  inputSize"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
            </div>

            <div className="rowMaker--marginRemover">
                <div className="formUI__details">
                  <h6 className="itemdate">Priority</h6>
                    <select
                        value={this.state.preference}
                        onChange={this.onChangeHandler}
                        className="formUI__name-input colorChanger   inputSize"
                        name="preference">
                            <option value={0}>Select Priority</option>
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                    </select>
                </div>
                <div className="formUI__details">
                  <h6 className="itemdate">Status</h6>
                    <select
                        value={this.state.status}
                        onChange={this.onChangeHandler}
                        className="formUI__name-input colorChanger  inputSize"
                        name="status">
                            <option value="">Select Status</option>
                            <option value="TO_DO">TO DO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                </select>
                </div>
            </div>
            <div className="rowMaker rowMaker--marginRemover">
                <div className="formUI__details">
                <h6 className="itemdate">start Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date  addTask__dateLabelFixer"
                name="startDate" />
                </div>
                <div className="formUI__details">
                <h6 className="itemdate">End Date</h6>
                <input
                onChange={this.onChangeHandler}
                type="date"
                className="addProject__item-date  addTask__dateLabelFixer"
                name="endDate" />
                </div>
            </div>
            <div className="">
            <div className="addProject__item addProject__item1 addProject__item3 parentFixer">
                <h6>Notes</h6>
                    {this.state.notes.map((note,noteIndex)=>(
                        <div className="noteBox">
                              <input
                              type="text"
                              className="addProject__item-name  inputSize addNote addNote-fixer "
                              name="projectName"
                              value={note}
                              disabled="true"/>
                              <i onClick={()=>this.removeNoteHandler(noteIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer" aria-hidden="true"></i>
                        </div>
                    ))}
                  <div>
                  <input
                  type="text"
                  className="addProject__item-name  inputSize addNote addNote-fixer"
                  placeholder="add a Note"
                  name="addNote"
                  value={this.state.addNote}
                  onChange={this.onChangeHandler}
                  />
                <i onClick={this.addNoteHandler}  className="fa fa-plus fa-4x addIcon addIcon-fixer1 addIcon1" aria-hidden="true"></i>
                </div>
              </div>
              <div className="addProject__item addProject__item1 addProject__item3 parentFixer">
                <h6>Usefull Links</h6>
                    {this.state.usefullLinks.map((link,linkIndex)=>(
                      <div className="linkBox">
                          <input
                          type="text"
                          className="addProject__item-name  inputSize addLink-fullLink fullLink-fixer"
                          value={link.link}
                          disabled="true"/>
                          <i onClick={()=>this.removeLinkHandler(linkIndex)} className="fa fa-remove fa-4x removeIcon removeIcon-fixer removeIcon2" aria-hidden="true"></i>
                          <input
                          type="text"
                          className="addProject__item-name addLink-comment  comment-fixer"
                          value={link.comment}
                          disabled="true"/>
                          <span className="comment__span comment__span-fixer">comment :</span>
                      </div>
                    ))}
                    <div>
                    <input
                    type="text"
                    className="addProject__item-name addLink-fullLink  fullLink-fixer"
                    placeholder="add a Link"
                    name="addLinkFullLink"
                    value={this.state.addLinkFullLink}
                    onChange={this.onChangeHandler}
                    />
                    <input
                    type="text"
                    className="addProject__item-name addLink-comment comment-fixer"
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

            <input
            onClick={this.onSubmitHandler}
            type="submit"
            className="submitBtn dark-btn addTask__modifier3" />
        </div>
     )
   }
 }


export default UpdateTask;
