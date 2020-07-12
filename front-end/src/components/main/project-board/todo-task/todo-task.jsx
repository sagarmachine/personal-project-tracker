 import React, {Component} from "react"

 class TodoTask extends Component{

   render(){
     let preference = null;
     let classPriority = null;
     if(this.props.preference===1){
       preference = "HIGH"
       classPriority = "HIGH"
     }else if(this.props.preference===2){
       preference = "MEDIUM"
       classPriority = "MEDIUM"
     }else if(this.props.preference===3){
       preference = "LOW"
       classPriority = "LOW"
     }
     return (
         <div className="projectBoard__todo ">
            <div className="projectBoard__anatomy">
               <div className="flexer">
                   <div className={"projectBoard__head hoverer "+classPriority} onClick={()=>this.props.openTaskDetailView(this.props.index)} >{this.props.id+" ("+preference+")"}</div>
                   <div className={"projectBoard__body "+classPriority}>{this.props.summary}</div>
               </div>
                <div className={"projectBoard__foot "+classPriority}>
                     <div onClick={()=>this.props.openUpdateTaskDetailView(this.props.index)} props={this.props} className="projectBoard__foot-modifier1 submitBtn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i><span className="updateSpan"> Update</span></div>
                    <div onClick={()=>this.props.delete(this.props.index,this.props.id)} type="Submit" className="projectBoard__foot-modifier2 submitBtn"><i className="fa fa-trash" aria-hidden="true"></i><span className="deleteSpan"> Delete</span></div>
                </div>
            </div>
         </div>
     )
   }
 }


export default TodoTask;
