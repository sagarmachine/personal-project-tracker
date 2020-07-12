 import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import SignUp from "./sign-up/sign-up";
import LogIn from "./log-in/log-in";
import Background from "../UI/background/background"
import Dashboard from "./dashboard/dashboard"
import AddProject from "./add-project/add-project"
import UpdateProject from "./update-project/update-project"
import ProjectBoard from "./project-board/project-board"
import LandingPage from "./landing-page/landing-page";

 class Main extends Component{

   render(){

     return (
        <div className="main">
          <Switch>
          <Route exact path="/dashboard" component={Background}/>
          <Route exact path="/signUp"><Background/></Route>
         <Route exact path="/login"><Background/></Route>
         <Route exact path="/addProject" component={Background}/>
         <Route exact path="/updateProject" component={Background}/>
         <Route exact path="/projectBoard" component={Background}/>
          </Switch>
          <Switch>
              <Route exact path="/" ><LandingPage getStarted={this.props.getStarted}/></Route>
               <Route exact path="/signUp"><SignUp email={this.props.email}/></Route>
              <Route exact path="/login"><LogIn test={"test"} email={this.props.email}/></Route>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
              <Route exact path="/updateProject" component={UpdateProject}/>
              <Route exact path="/projectBoard" component={ProjectBoard}/>
          </Switch>
        </div>
     )
   }
 }


export default Main;
