 import React, {Component} from "react"
import {Link} from "react-router-dom"
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

   componentDidMount=()=>{
     let notes= this.props.selectedTask.notes.map(note=>note.note);
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
     const submitedState = this.state
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
            <h4 className="formUI__heading addTask__modifier2">Update Project Task</h4>
            <p className="formUI__heading addTask__modifier2">{"ID: "+this.state.id}</p>
            <div className="formUI__details">
                <textarea
                    value={this.state.summary}
                    onChange={this.onChangeHandler}
                    className="formUI__name-input"
                    placeholder="Project summary"
                    name="summary">
                </textarea>
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

            <input
            onClick={this.onSubmitHandler}
            type="submit"
            className="submitBtn dark-btn addTask__modifier3" />
        </div>
     )
   }
 }


export default UpdateTask;
