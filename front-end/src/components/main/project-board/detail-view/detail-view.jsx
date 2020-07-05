 import React, {Component} from "react"
import UpdateTask from "../update-task/update-task"
import AddTask from "../add-task/add-task"

 class DetailView extends Component{



   render(){


     return (
        <div className={"detailView "+this.props.activeClass}>
           <p className="detailView__para">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus soluta tenetur atque, temporibus adipisci, officia eligendi quam, modi facilis, sunt nulla! Dicta tenetur dolorum mollitia expedita dolore illum maxime architecto perspiciatis fuga amet accusantium nemo, molestiae asperiores alias corporis, ullam explicabo unde! Praesentium animi quisquam fuga perspiciatis! Mollitia, similique.
           </p>
           {this.props.children}
            <p className="detailView__para">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus soluta tenetur atque, temporibus adipisci, officia eligendi quam, modi facilis, sunt nulla! Dicta tenetur dolorum mollitia expedita dolore illum maxime architecto perspiciatis fuga amet accusantium nemo, molestiae asperiores alias corporis, ullam explicabo unde! Praesentium animi quisquam fuga perspiciatis! Mollitia, similique.
            </p>
          </div>
     )
   }
 }


export default DetailView;
