 import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import SignUp from "./sign-up/sign-up";
import LogIn from "./log-in/log-in";
import Background from "../UI/background/background"
import Dashboard from "./dashboard/dashboard"
import AddProject from "./add-project/add-project"
import ProjectBoard from "./project-board/project-board"
import AddTask from "./project-board/add-task/add-task";

 class Main extends Component{

   render(){

     return (
        <div className="main">
             <Background />
          <Switch>
              <Route exact path="/" component={SignUp}/>
              <Route exact path="/login" component={LogIn}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
              <Route exact path="/projectBoard" component={ProjectBoard}/>
              <Route exact path="/addTask" component={AddTask}/>
          </Switch>
        </div>
     )
   }
 }


export default Main;
