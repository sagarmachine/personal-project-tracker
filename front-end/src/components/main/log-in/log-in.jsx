 import React, {Component} from "react"
 import { withRouter } from 'react-router';
 import axios from "axios"

 class LogIn extends Component{
   state={
     email:"",
     password:"",
     authenticating:false,
   }

   componentDidUpdate=()=>{
    if(this.state.authenticating===true)
    axios.post("/v1/user/login",this.state).
    then(data=>{
      this.props.email(this.state.email);
      this.setState({authenticating:false});
      this.props.history.push("/dashboard")}).
    catch(ex=>{alert("credentials are invlaid");
         this.setState({email:"",password:"",authenticating:false})});
     }


  loginHandler=()=>{
    this.setState({authenticating:true})
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
   render(){
 console.log("login --> "+ JSON.stringify(this.props.history))
     return (
       <div className="formUI">
           <div className="formUI__heading">
               <h1 className="formUI__head">Log In</h1>
           </div>
           <div className="formUI__details">
               <div className="formUI__email">
                   <input
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
                   onChange={this.onChangeHandler}
                   id="Spass"
                   type="password"
                   className="formUI__pass-input"
                   placeholder="Password"
                   name="password"
                   value={this.state.password}/>
               </div>
                  <input onClick={this.loginHandler} type="submit" className="submitBtn"  value="Log In"/>
                 
           </div>

       </div>
     )
   }
 }


export default withRouter(LogIn);
