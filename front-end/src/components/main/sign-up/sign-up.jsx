 import React, {Component} from "react"

 class SignUp extends Component{
    state={
      name:"",
      email:"",
      password:"",
      confirmPassword:""
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
               <h1 className="formUI__head">Sign Up</h1>
               <p className="formUI__para">Create your Account</p>
           </div>
           <div className="formUI__details">
               <div className="formUI__name">
                   <label
                   htmlFor="Sname"
                   className="formUI__name-label">
                   Name
                   </label><br/>
                   <input
                   onChange={this.onChangeHandler}
                   id="Sname"
                   type="text"
                   className="formUI__name-input"
                   placeholder="Name"
                   name="name"
                   autoComplete="off"
                   required
                   value={this.state.name}/>
               </div>
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
                   name="email" />
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
                   name="password" />
               </div>
               <div className="formUI__pass2">
                   <label
                   htmlFor="Spass2"
                   className="formUI__pass2-label">
                   Confirm Password
                   </label><br/>
                   <input onChange={this.onChangeHandler}
                   id="Spass2"
                   type="password"
                   className="formUI__pass2-input"
                   placeholder="Confirm Password"
                   name="confirmPassword" />
               </div>
               <input onClick={this.onSubmitHandler} type="submit" className="submitBtn" />
           </div>

       </div>

     )
   }
 }


export default SignUp;
