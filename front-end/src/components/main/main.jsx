 import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import SignUp from "./sign-up/sign-up";
import LogIn from "./log-in/log-in";
import Background from "../UI/background/background"
import Dashboard from "./dashboard/dashboard"
import AddProject from "./add-project/add-project"
import ProjectBoard from "./project-board/project-board"

 class Main extends Component{

   render(){

     return (
        <div className="main">
             <Background />
          <Switch>
              <Route exact path="/"><SignUp email={(email)=>this.props.email(email)}/></Route>
              <Route exact path="/login"><LogIn email={(email)=>this.props.email(email)}/></Route>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
              <Route exact path="/projectBoard" component={ProjectBoard}/>
          </Switch>
        </div>
     )
   }
 }


export default Main;
