 import React, {Component} from "react"
import NavItems from "./nav-items/nav-items"

 class Toolbar  extends Component{

   render(){
     return (
        <div className={this.props.classes[0]}>
               <NavItems classes={this.props.classes[1]} toggleSideDrawer={this.props.toggleSideDrawer}/>
        </div>
     )
   }
 }


export default Toolbar;
