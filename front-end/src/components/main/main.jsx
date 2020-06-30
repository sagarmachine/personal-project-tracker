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
          <Switch>
             <Route exact path="/" component={Background}/>
             <Route exact path="/login" component={Background}/>
             <Route path="/projectBoard" component={Background}/>
             <Route exact path="/dashboard" component={Background}/>
          </Switch>
          <Switch>
              <Route exact path="/" component={SignUp}/>
              <Route exact path="/login" component={LogIn}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
              <Route path="/projectBoard" component={ProjectBoard}/>
          </Switch>
        </div>
     )
   }
 }


export default Main;
