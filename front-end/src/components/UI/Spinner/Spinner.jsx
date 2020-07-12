 import React, {Component} from "react"


 class Spinner extends Component{

   render(){

     return (
        <div style={{fontSize:this.props.style}}><div class="loader">Loading...</div></div>
     )
   }
 }


export default Spinner;
