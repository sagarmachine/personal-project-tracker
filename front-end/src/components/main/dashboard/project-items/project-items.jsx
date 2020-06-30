 import React, {Component} from "react";
import ProjectItem from "./project-item/project-item";
import axios from "axios";
import Spinner from "../../../UI/Spinner/Spinner"
import {Link} from "react-router-dom"

 class ProjectItems extends Component{
   state= {
     totalProjects:0,
     projects:[],
     deleting :0,
     deletingID:"",
     loadingProjects:0,

   }

  // shouldComponentUpdate=(nextProps,nextState)=>{
  //
  //    if((nextState.projects.length < this.state.projects.length) || this.state.totalProjects===0){
  //      console.log("IN");
  //      return true;
  //    }
  //    console.log("in");
  //   return false;
  // }

   deleteProjectHandler=(id,index)=>{

   let newProjects=[...this.state.projects]
       newProjects.splice(index,1);

     this.setState({deleting:1,deletingID:id,projects:newProjects});
   }

   componentDidUpdate=()=>{

   if(this.state.deleting===1){
        axios.delete("/v1/project/"+this.state.deletingID).then(res=>{
          setTimeout(()=>{
            this.setState({totalProjects:this.state.totalProjects-1,deleting:0,deletingID:""})
          },400)
   }).catch(e=>{
        console.log(e);
   })
 }

if(this.state.loadingProjects===1)
     axios.get('/v1/project')
     .then(response=>{
       this.setState({
         totalProjects:response.data.length,
         projects:response.data,
         loadingProjects:0
       })
       // console.log(this.state.totalProjects);
     }).catch(e=>{
       // console.log(e);
     })
   }

   componentDidMount=()=>{
    this.setState({loadingProjects:1});
   }

   render(){
     let projectItem = null;
     let style = {
       textTransform:"uppercase",
       fontSize:"2rem",
       textAlign:"center",
       color:"black",
       padding:"3rem 0",
       border:"1px solid none",
       background:"rgba(255,255,255,.3)",
     }
     if(this.state.totalProjects===0){
      projectItem = <Link to="/addProject"><h1 style={style}><i class="fa fa-plus" aria-hidden="true"></i> Add a project</h1></Link>
    }else{
      if(this.state.deleting){
        projectItem = <Spinner/>
      }else{
        projectItem =  this.state.projects.map((project,i)=>(
          <ProjectItem key={project.projectName+i} index={i} delete={this.deleteProjectHandler} name={project.projectName} des={project.projectDescription} identifier={project.projectIdentifier}/>
          // console.log(arr)
        ))
      }
    }
     return (
       projectItem
     )
   }
 }


export default ProjectItems;
