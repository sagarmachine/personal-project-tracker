 import React, {Component} from "react"
import axios from "axios"
// import {Link} from "react-router-dom"

 class TodoTask extends Component{


   deleteHandler=()=>{
      if(window.confirm('Are you sure you would like to accept this reply as your favor?')===true){
         axios.delete("/v1/").then(res=>{
          console.log(res);
        }).catch(e=>{
          alert(e);
        })
      }else{
        alert("not proceeded");
      }
   }

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
                <div className={"projectBoard__head "+classPriority} onClick={()=>this.props.openTaskDetailView(this.props.index)} >{"ID: "+this.props.id+" PREFRENCE: "+preference}</div>
                <div className="projectBoard__body">{this.props.summary}</div>
                <div className="projectBoard__foot">
                     <div onClick={()=>this.props.openUpdateTaskDetailView(this.props.index)} props={this.props} className="projectBoard__foot-modifier1 submitBtn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update</div>
                    <div onClick={this.deleteHandler} type="Submit" className="projectBoard__foot-modifier2 submitBtn"><i className="fa fa-trash" aria-hidden="true"></i> Delete</div>
                </div>
            </div>
         </div>
     )
   }
 }


export default TodoTask;
