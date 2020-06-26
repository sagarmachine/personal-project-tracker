 import React, {Component} from "react";
 import {Link} from "react-router-dom";


 class NavItem extends Component{

   render(){

     return (
      <div className="nav__items">
         <Link to="/" className="nav__items-item">signUp</Link>
         <Link to="/login" className="nav__items-item">logIn</Link>
      </div>
     )
   }
 }


export default NavItem;
