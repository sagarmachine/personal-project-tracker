 import React, {Component} from "react";
 import {NavLink,Link} from "react-router-dom";


 class NavItem extends Component{

   render(){
     let navItem = null
     if(this.props.email===""){
       navItem = <div className="nav__items">
                        {/*<NavLink
                        activeStyle={{
                          background:"orangered",
                          color:"black",
                          transition:"all .4s"
                        }}
                        exact
                        to="/dashboard"
                        className="nav__items-item">
                          Dashboard
                        </NavLink>*/}
                        <NavLink
                        activeStyle={{
                          background:"orangered",
                          color:"black",
                          transition:"all .4s"
                        }}
                        exact
                        to="/" className="nav__items-item">signUp</NavLink>
                        <NavLink
                        activeStyle={{
                          background:"orangered",
                          color:"black",
                          transition:"all .4s"
                        }}
                        exact
                        to="/login"
                        className="nav__items-item">
                           logIn
                        </NavLink>
                        {/*Landing Component GET-STARTED login:false
                          logout onClick={logoutHadler()}  */}
                 </div>
     }else{
       navItem = <div className="nav__items">
                        <NavLink
                        activeStyle={{
                          background:"orangered",
                          color:"black",
                          transition:"all .4s"
                        }}
                        exact
                        to="/dashboard"
                        className="nav__items-item">
                          Dashboard
                        </NavLink>
                        <NavLink
                        activeStyle={{
                          background:"orangered",
                          color:"black",
                          transition:"all .4s"
                        }}
                        exact
                        to="/profile"
                        className="nav__items-item">
                          {this.props.email}
                        </NavLink>
                        <div
                        onClick={this.props.logOut}
                        className="nav__items-item logOut">
                          logOut
                        </div>
                        {/*Landing Component GET-STARTED login:false
                          logout onClick={logoutHadler()}  */}
                 </div>
     }

     return (
         navItem
     )
   }
 }


export default NavItem;
