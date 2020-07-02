 import React, {Component} from "react"
import axios from "axios"


 class SignUp extends Component{
    state={
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      registering:false,
    }


    componentDidUpdate=()=>{
      
      if(this.state.registering===true)
      axios.post("http://localhost:8081/api/v1/user/register",this.state).then(data=>{console.log(data);
                                                                                         this.setState({registering:false})});
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
     //   console.log(this.state);
      },0)
    }

    onSubmitHandler=()=>{
      this.setState({registering:true})
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
                   <input
                   onChange={this.onChangeHandler}
                   id="Semail"
                   type="email"
                   className="formUI__email-input"
                   placeholder="Email Address"
                   name="email" />
               </div>
               <div className="formUI__pass">
                   <input
                   onChange={this.onChangeHandler}
                   id="Spass"
                   type="password"
                   className="formUI__pass-input"
                   placeholder="Password"
                   name="password" />
               </div>
               <div className="formUI__pass2">
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
