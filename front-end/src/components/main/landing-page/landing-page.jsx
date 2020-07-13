import React, { Component } from 'react'
import {Link } from "react-router-dom"
import logo from "../../../assets/images/projectTrackerLogo3.png"
 class LandingPage extends Component {

   state={
       value:""
   }
   componentDidMount=()=>{
    this.repeat();
    }

    repeat =()=>{
  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:"प्रोजेक्ट "}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" ट्रैकर"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" में"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" आपका"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" स्वागत"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" है |"}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:" Welcome"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" to"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Tracker."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Make"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" your"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" unforgettable."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"Track"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" and"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" plan"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" your"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" every"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" project."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"This"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" is"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" just"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" a"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" begining."}});

  setTimeout(()=>{this.setState((prevState)=>{return{value:""}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+"Team"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Project"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" Tracker"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" under"}});
  setTimeout(()=>{this.setState((prevState)=>{return{value:prevState.value+" construction."}});

this.repeat();
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
},1000);
},500);
},500);
},500);
},500);
 },500);
},500);
},1000);
     }


    render() {
        return (
            <div className="landing">
                <div className="landing__head">
                   <div className="landing__head-1">
                       <div className="backgroundWhite"></div>
                       <div className="landing__head-static">{this.state.value}</div>
                       <Link style={{color:"white"}} to={this.props.getStarted?"/dashboard":"/login"}>
                       <div className="subnitBtn dark-btn landing__head-static--2">
                          Get Started
                       </div>
                       </Link>
                   </div>
                   <img className="landing__logo" src={logo} alt="logo"/>
                </div>
                <div className="meet__parent">
                  <div className="meet">Meet the Team</div>
                </div>
                <div className="row">
                  <div className="card">
                           <div className="card__side card__side--front">
                             <div className="card__picture card__picture--1">
                                &nbsp;
                             </div>
                             <h4 className="card__heading">
                               <span className="card__heading-span card__heading-span--1">Sagar Panwar</span>
                            </h4>
                           </div>
                           <div className="card__side card__side--back card__side--back-1">
                             <div className="card__cta">
                                 <div className="card__detail">
                                   <ul>
                                     <li><a href="https://www.linkedin.com/in/sagar-panwar-20a59914b/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                     <li><a href="https://github.com/sagarmachine" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-github" aria-hidden="true"></i></a></li>
                                     <li><a href="https://www.instagram.com/drunken_piglet_00/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                   </ul>
                                 </div>
                             </div>
                           </div>
                  </div>

                  <div className="card">
                           <div className="card__side card__side--front">
                             <div className="card__picture card__picture--2">
                                &nbsp;
                             </div>
                             <h4 className="card__heading">
                               <span className="card__heading-span card__heading-span--1">Anuj BhAtt</span>
                            </h4>
                           </div>
                           <div className="card__side card__side--back card__side--back-1">
                             <div className="card__cta">
                                 <div className="card__detail">
                                   <ul>
                                       <li><a href="https://www.linkedin.com/in/anuj-bhatt-4271051a1/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                       <li><a href="https://github.com/anujbhatt-dev" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-github" aria-hidden="true"></i></a></li>
                                       <li><a href="https://www.instagram.com/bhatt5933/" target="_blank" rel="noopener noreferrer">{" "}<i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                   </ul>
                                 </div>
                             </div>
                           </div>
                  </div>
              </div>
              <div className="footer">
                 under construction <i className="fa fa-wrench" aria-hidden="true"></i>
              </div>
            </div>
        )
    }
}
export default LandingPage;
