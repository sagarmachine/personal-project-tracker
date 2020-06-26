 import React, {Component} from "react"
import {Route,Switch} from "react-router-dom"
import SignUp from "./sign-up/sign-up";
import LogIn from "./log-in/log-in";
import Background from "../UI/background/background"

 class Main extends Component{

   render(){

     return (
        <div className="main">
             <Background /> 
          <Switch>
              <Route exact path="/" component={SignUp}/>
              <Route exact path="/login" component={LogIn}/>
          </Switch>
        </div>
     )
   }
 }


export default Main;
