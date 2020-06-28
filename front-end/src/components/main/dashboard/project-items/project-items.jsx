 import React, {Component} from "react"
import ProjectItem from "./project-item/project-item"
import axios from "axios"

 class ProjectItems extends Component{
   state= {
     projects:[]
   }
   componentDidMount=()=>{
        axios.get('/v1/project')
        .then(response=>{
          this.setState({
            projects:response.data
          })
          console.log(response);
        }).catch(e=>{
          console.log(e);
        })
   }

   render(){
      let projectItem =  this.state.projects.map(project=>(
        <ProjectItem name={project.projectName} des={project.projectDescription}/>
      ))
     return (
       projectItem
     )
   }
 }


export default ProjectItems;
