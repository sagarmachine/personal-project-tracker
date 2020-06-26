 import React, {Component} from "react"
import NavItem from "./nav-item/nav-item"

 class NavItems extends Component{

   render(){

     return (
          <nav className="nav">
             <i onClick={this.props.toggleSideDrawer} className={"nav__toggler fa fa-arrow-circle-right "+this.props.classes}></i>
             <NavItem/>
          </nav>
     )
   }
 }


export default NavItems;
