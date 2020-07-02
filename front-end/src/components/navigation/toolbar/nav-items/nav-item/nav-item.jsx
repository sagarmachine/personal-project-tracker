 import React, {Component} from "react";
 import {NavLink} from "react-router-dom";


 class NavItem extends Component{

   render(){

     return (
      <div className="nav__items">
         <NavLink activeStyle={{background:"rgba(255,255,255,.5)",color:"black",transition:"all .4s"}} exact to="/dashboard" className="nav__items-item">Dashboard</NavLink>
         <NavLink activeStyle={{background:"rgba(255,255,255,.5)",color:"black",transition:"all .4s"}} exact to="/" className="nav__items-item">signUp</NavLink>
         <NavLink activeStyle={{background:"rgba(255,255,255,.5)",color:"black",transition:"all .4s"}} exact to="/login" className="nav__items-item">logIn</NavLink>
      </div>
     )
   }
 }


export default NavItem;
