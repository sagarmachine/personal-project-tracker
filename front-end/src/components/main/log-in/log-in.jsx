 import React, {Component} from "react"
 import { withRouter } from 'react-router';
 import axios from "axios"
import {Link } from "react-router-dom"
 class LogIn extends Component{
   state={
     email:"",
     password:"",
     authenticating:false,
     loading:false
   }



   componentDidUpdate=()=>{
    if(this.state.authenticating===true)
    axios.post("/v1/user/login",this.state)
    .then(data=>{
      this.props.email(this.state.email);
      this.setState({authenticating:false,loading:false});
      this.props.history.push("/dashboard")})
      .catch(ex=>{alert("credentials are invlaid");
         this.setState({email:"",password:"",authenticating:false})});
     }


  loginHandler=()=>{

    this.setState({authenticating:true,loading:true})
  }

   keyPress=(e)=>{
     if(e.charCode===13){
       this.setState({authenticating:true,loading:true})
     }
   }

   onChangeHandler=(e)=>{
     let name = e.target.name
     let value = e.target.value
     this.setState((prevState)=>{
       return (
         {...prevState,[name]:value}
       )
     })
     setTimeout(()=>{
     },0)
   }

   enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      alert("shit");
    } 
}


   render(){
 console.log("login --> "+ JSON.stringify(this.props.history))

     return (
       <div className="formUI log">
           <div className="formUI__heading">
               <h1 className="formUI__head">Log In</h1>
           </div>
           <div className="formUI__details">
               <div className="formUI__email">
                   <input
                   onKeyPress={this.keyPress}
                   onChange={this.onChangeHandler}
                   id="Semail"
                   type="email"
                   className="formUI__email-input"
                   placeholder="Email Address"
                   name="email"
                   value={this.state.email}/>
               </div>
               <div className="formUI__pass">
                   <input
                   onKeyPress={this.keyPress}
                   onChange={this.onChangeHandler}
                   id="Spass"
                   type="password"
                   className="formUI__pass-input"
                   placeholder="Password"
                   name="password"
                   value={this.state.password}/>
               </div>
               {
                 this.state.authenticating?
                 <i style={{
                   margin:"1rem 5rem",
                 }} className="spinnerRotator fa fa-spinner fa-3x" aria-hidden="true"></i>
                 :<input  onClick={this.loginHandler} type="submit" className="submitBtn"  value="Log In"/>
               }

                <Link to="/signUp"><h3 style={{textAlign:"right"}}>new user?</h3></Link>
           </div>

       </div>
     )
   }
 }


export default withRouter(LogIn);
