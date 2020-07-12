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
     searchedProjects:[],
   }


   deleteProjectHandler=(id,index)=>{

   let newProjects=[...this.state.projects]
       newProjects.splice(index,1);

     this.setState({deleting:1,deletingID:id,projects:newProjects});
   }

   componentDidUpdate=()=>{

   if(this.state.deleting===1){
        axios.delete("/v1/project/"+this.state.deletingID).then(res=>{
          setTimeout(()=>{
            this.setState({totalProjects:this.state.totalProjects-1,deleting:0,deletingID:"",loadingProjects:1})
          },400)
   }).catch(e=>{
     if(e.response.data){
       alert(e.response.data[0])
     }else{
       alert("Something went wrong")
     }
   })
 }

if(this.state.loadingProjects===1)
     axios.get('/v1/project')
     .then(response=>{
       this.setState({
         totalProjects:response.data.length,
         projects:response.data,
         searchedProjects:response.data,
         loadingProjects:0
       })
     }).catch(e=>{
       if(e.response.data){
         alert(e.response.data[0])
       }else{
         alert("Something went wrong")
       }
     })
   }

   componentDidMount=()=>{
    this.setState({loadingProjects:1});
   }


searchProjectHandler=(search)=>{

  if(search===""){
  this.setState({searchedProjects:this.state.projects})
  return;
}
//  let a="";
//  a.toUp
// console.log(this.state)
  let newSearchedProject=this.state.projects.filter(project=>{
    //console.log(project.projectName.toUpperCase().indexOf(search.toUpperCase()));
              return (project.projectIdentifier.toUpperCase().indexOf(search.toUpperCase())>=0 ||
               project.projectName.toUpperCase().indexOf(search.toUpperCase())>=0)})

               console.log(newSearchedProject)
      this.setState({searchedProjects:newSearchedProject});

}



   render(){
     let style={
        textAlign:"center",
        padding:"2.5rem",
        color:"black",
        fontSize:"2.5rem",
        background:"rgba(255,255,255,0.3)"
     }
     let projectItem = null;

     if(this.state.totalProjects===0){
      projectItem = <Spinner/>
      if(this.state.loadingProjects===0){
        projectItem = <h1 style={style}>Start Adding Project</h1>
      }
    }else{
      if(this.state.deleting){
        projectItem = <Spinner/>
      }else{
        projectItem =
        <React.Fragment>
        <input onChange={(event)=>this.searchProjectHandler(event.target.value)} className="search-btn" type="text"/>
      {this.state.searchedProjects.map((project,i)=>(
          <ProjectItem
          key={project.projectName+i}
          index={i}
          data={project}
          delete={this.deleteProjectHandler}
          name={project.projectName} des={project.projectDescription}
          identifier={project.projectIdentifier}/>
         ))
         }
      </React.Fragment>

    }

   }
   return (
    projectItem
  )
 }
 }

export default ProjectItems;
