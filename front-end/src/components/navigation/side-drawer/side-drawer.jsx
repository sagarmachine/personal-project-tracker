 import React, {Component} from "react"


 class SideDrawer extends Component{


   render(){
     return (
        <div onClick={this.props.clicked} className={this.props.classes}>SideDrawer</div>
     )
   }
 }


export default SideDrawer;
