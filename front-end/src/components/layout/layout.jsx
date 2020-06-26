import React, {Component,Fragment} from "react"
import Toolbar from "../navigation/toolbar/toolbar";
import SideDrawer from "../navigation/side-drawer/side-drawer";
import Main from "../main/main";

class Layout extends Component{
  state={
    sideDrawer:null,
    toolbar:["toolbar","closeToolbar"],
    toggle:true
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



   render(){
     let sideDrawer = null;
     if(this.state.sideDrawer){
        sideDrawer = <SideDrawer classes={this.state.sideDrawer}/>

     }
     return (
       <Fragment>
          <Toolbar classes={this.state.toolbar} toggleSideDrawer={this.sideDrawerToggleHandler}/>
           {sideDrawer}
          <div>modal</div>
          <Main/>
       </Fragment>
     )
  }
}


export default Layout;
