import React, {Component,Fragment} from "react"
import Toolbar from "../navigation/toolbar/toolbar";
import SideDrawer from "../navigation/side-drawer/side-drawer";
import Main from "../main/main";
import axios from "axios";




class Layout extends Component{
  state={
    sideDrawer:null,
    toolbar:["toolbar","closeToolbar"],
    toggle:true,
    logInName:"",
    logIn:false
  }


  sideDrawerToggleHandler=()=>{
    const newToggle = !this.state.toggle
    this.setState({toggle:newToggle})
    const classes = ["sideDrawer",this.state.toggle?"open":"close"]
    const newClasses = classes.join(" ");
    this.setState({sideDrawer:newClasses})
    this.toolbarHandler();
  }

   toolbarHandler=()=>{
     const newToggle =this.state.toggle
     if(this.state.toggle){
       const newClasses = ["toolbar",newToggle?"openToolbar":"closeToolbar"]
       this.setState({toolbar:newClasses})
     }else{
       const newClasses = ["toolbar",newToggle?"openToolbar":"closeToolbar"]
       this.setState({toolbar:newClasses})
     }
   }

   logInHandler=()=>{
   this.setState({login :true})
      alert("Clicked login")
   }


   logOutHandler=()=>{
      this.setState({logInName:""})
      axios.defaults.headers.common['Authentication'] = null;
      alert("done");
   }

   logInNameHandler=(email)=>{
     const newState = this.state;
     newState.logInName = email;
     this.setState({
       ...newState
     })
   }

   render(){

    let sideDrawer = null;
     if(this.state.sideDrawer){
        sideDrawer = <SideDrawer classes={this.state.sideDrawer}/>

     }
     return (
       <Fragment>
          <Toolbar
           logIn={this.logInHandler}
           logOut={this.logOutHandler}
           email={this.state.logInName}
           classes={this.state.toolbar}
           toggleSideDrawer={this.sideDrawerToggleHandler}/>
            {sideDrawer}
           {/*<div>modal</div>*/}
          <Main email={(email)=>this.logInNameHandler(email)}/>
       </Fragment>
     )
  }
}


export default Layout;
