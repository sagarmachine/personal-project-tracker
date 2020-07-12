 import React, {Component} from "react";
 import {NavLink} from "react-router-dom";

 class NavItem extends Component{

   render(){
     let navItem = null
     if(this.props.email===""){
       navItem = <div className="nav__items">

                        <NavLink
                        exact
                        to="/" className="nav__items-item"><i className="fa fa-info-circle iconSize" aria-hidden="true"></i> About</NavLink>
                        <NavLink

                        exact
                        to="/signUp" className="nav__items-item"><i className="fa fa-registered iconSize" aria-hidden="true"></i> SignUp</NavLink>
                        <NavLink
                        exact
                        to="/login"
                        onClick={this.props.logIn}
                        className="nav__items-item">
                           <i className="fa fa-sign-in iconSize" aria-hidden="true"></i> logIn
                        </NavLink>
                        {/*Landing Component GET-STARTED login:false
                          logout onClick={logoutHadler()}  */}
                 </div>
     }else{
       navItem = <div className="nav__items">
           <NavLink
                        exact
                        to="/" className="nav__items-item"><i className="fa fa-info-circle iconSize" aria-hidden="true"></i> About</NavLink>
                        <NavLink

                        exact
                        to="/dashboard"
                        className="nav__items-item">
                          <i className="fa fa-tachometer iconSize" aria-hidden="true"></i> Dashboard
                        </NavLink>
                        <NavLink

                        exact
                        to="/profile"
                        className="nav__items-item">
                          <i class="fa fa-user iconSize" aria-hidden="true"></i>{" "+this.props.email.split("@").shift()}
                        </NavLink>
                        <div
                        onClick={this.props.logOut}
                        className="nav__items-item logOut">
                          <i class="fa fa-sign-out iconSize" aria-hidden="true"></i> logOut
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
