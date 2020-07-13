 import React, {Component} from "react"
 import {Link } from "react-router-dom";

 class PageNotFound extends Component{

   render(){




     return (
         <div className="pageNotFound ">

         <div className="pageNotFound__btn">
             <Link className="pageNotFound__btn-1" to="/"><div className="submitBtn dark-btn">
               Try Again
             </div></Link>
         </div>

         <div className="pageNotFound__para">
             <span >Page Not Found</span>
             <span className="pageNotFound__404">
             <span className="pageNotFound__4"> 4</span>
             <span className="pageNotFound__0"> 0</span>
             <span className="pageNotFound__44"> 4</span>
             </span>
         </div>
         </div>
     )
   }
 }


export default PageNotFound;
