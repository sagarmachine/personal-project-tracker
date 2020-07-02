 import React, {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

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
                <div className={"projectBoard__head "+classPriority}>{"ID: "+this.props.id+" PREFRENCE: "+preference}</div>
                <div className="projectBoard__body">{this.props.summary}</div>
                <div className="projectBoard__foot">
                     <Link to={{
                       pathname:"/updateTask",
                       state:{
                         summary:this.props.summary,
                         status:this.props.status,
                         preference:this.props.preference,
                         id:this.props.updateID,
                         updateID:this.props.id,
                         projectIdentifier:this.props.projectIdentifier
                       }
                     }}>
                     <input type="Submit" className="projectBoard__foot-modifier1 submitBtn" value="Update"/>
                    </Link >
                    <input onClick={this.deleteHandler} type="Submit" className="projectBoard__foot-modifier2 submitBtn" value="delete"/>
                </div>
            </div>
         </div>
     )
   }
 }


export default TodoTask;
