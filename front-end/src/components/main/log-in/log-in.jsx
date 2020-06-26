 import React, {Component} from "react"


 class LogIn extends Component{
   state={
     email:"",
     password:""
   }

   onChangeHandler=(e)=>{
     let name = e.target.name
     let value = e.target.value
     // let newState = this.state;
     this.setState((prevState)=>{
       return (
         {...prevState,[name]:value}
       )
     })
     setTimeout(()=>{
       console.log(this.state);
     },0)
   }
   render(){

     return (
       <div className="formUI">
           <div className="formUI__heading">
               <h1 className="formUI__head">Log In</h1>
               <p className="formUI__para">Create your Account</p>
           </div>
           <div className="formUI__details">
               <div className="formUI__email">
                   <label
                   htmlFor="Sname"
                   className="formUI__email-label">
                   Email
                   </label><br/>
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
                   <label
                   htmlFor="Spass"
                   className="formUI__pass-label">
                   Password
                   </label><br/>
                   <input
                   onChange={this.onChangeHandler}
                   id="Spass"
                   type="password"
                   className="formUI__pass-input"
                   placeholder="Password"
                   name="password"
                   value={this.state.password}/>
               </div>

               <input type="submit" className="submitBtn"  value="Log In"/>
           </div>

       </div>
     )
   }
 }


export default LogIn;
