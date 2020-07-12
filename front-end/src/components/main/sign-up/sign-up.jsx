 import React, {Component} from "react"
 import {withRouter} from "react-router-dom"
import axios from "axios"


 class SignUp extends Component{
    state={
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      registering:false,
      loading:false
    }

    keyPress=(e)=>{
      if(e.charCode===13){
        this.setState({registering:true,loading:true})
      }
    }

    componentDidUpdate=()=>{
      if(this.state.registering===true)
      axios.post("/v1/user/register",this.state)
      .then(data=>{
        console.log(data);
        this.setState({registering:false})
        this.props.email(this.state.email);
        this.props.history.push("/dashboard")
      }).catch(error=>{
         console.log(error.response);

        this.setState({
          name:"",
          email:"",
          password:"",
          confirmPassword:"",
          registering:false,
          loading:false
        })
        alert(error.response.data[0])
      })
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
      this.setState({registering:true,loading:true})
        }

   render(){


     return (

       <div className="formUI log">
           <div className="formUI__heading">
               <h1 className="formUI__head">Sign Up</h1>
               <p className="formUI__para">Create your Account</p>
           </div>
           <div className="formUI__details">
               <div className="formUI__name">
                   <input
                   onKeyPress={this.keyPress}
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
                   onKeyPress={this.keyPress}
                   onChange={this.onChangeHandler}
                   id="Semail"
                   type="email"
                   className="formUI__email-input"
                   placeholder="Email Address"
                   name="email"
                   value={this.state.email} />
               </div>
               <div className="formUI__pass">
                   <input
                   onKeyPress={this.keyPress}
                   onChange={this.onChangeHandler}
                   id="Spass"
                   type="password"
                   className="formUI__pass-input"
                   placeholder="Password"
                   value={this.state.password}
                   name="password" />
               </div>
               <div className="formUI__pass2">
                   <input onChange={this.onChangeHandler}
                   id="Spass2"
                   onKeyPress={this.keyPress}
                   type="password"
                   className="formUI__pass2-input"
                   placeholder="Confirm Password"
                   value={this.state.confirmPassword}
                   name="confirmPassword" />
               </div>
               {(this.state.registering)?
                   <i style={{
                     margin:"1rem 5rem",

                   }} className="spinnerRotator fa fa-spinner fa-3x" aria-hidden="true"></i>
                   :<input onClick={this.onSubmitHandler} type="submit" className="submitBtn" />
                 }


           </div>

       </div>

     )
   }
 }


export default withRouter(SignUp);



// if (error.response) {
//     /*
//      * The request was made and the server responded with a
//      * status code that falls out of the range of 2xx
//      */
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
// } else if (error.request) {
//     /*
//      * The request was made but no response was received, `error.request`
//      * is an instance of XMLHttpRequest in the browser and an instance
//      * of http.ClientRequest in Node.js
//      */
//     console.log(error.request);
// } else {
//     // Something happened in setting up the request and triggered an Error
//     console.log('Error', error.message);
// }
// console.log(error.config);
