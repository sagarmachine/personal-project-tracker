 import React, {Component} from "react"
import CreateProjectBtn from "./create-project-btn/create-project-btn"
import ProjectItems from "./project-items/project-items"
import LayoutContext from "../../layout/layout-context"


 class Dashboard extends Component{

  static contextType=LayoutContext;

   render(){
    console.log(JSON.stringify(this.props))
    console.log(this.context.authenticated);
if(this.context.authenticated==false)
window.location.href = "http://localhost:3000/login";
     return (
       <div className="dashboard">
            <h1 className="dashboard__heading">Projects</h1>
            <CreateProjectBtn />
            <ProjectItems/>
       </div>
     )
   }
 }


export default Dashboard;
