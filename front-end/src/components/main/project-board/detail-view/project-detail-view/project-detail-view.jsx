import React, { Component } from 'react'

export default class ProjectDetailView extends Component {

     state={
       todoNo:0,
       inProgressNo:0,
       completedNo:0,
     }

    componentDidMount=()=>{
      this.countHandler()
    }

    countHandler=()=>{
       let todo=0;
       let progress=0;
       let done=0;
        let datas= this.props.data.map(data=>{

         if(data.status==="TO_DO"){
           todo= todo + 1;
         }else if(data.status==="IN_PROGRESS"){
           progress= progress +1;
         }else if(data.status==="DONE"){
           done= done +1;
         }
         return data.status;
       })
       console.log(datas);
       this.setState({
         todoNo:todo,inProgressNo:progress,completedNo:done
       })
    }

    render() {


        return (
            <div className="taskDetailView">
               <div id="ProjectDetailView__flexer-head" className="ProjectDetailView__flexer ProjectDetailView__flexer-first">
                   <div className="PDWFirst">
                       <div className="ProjectDetailView__name ProjectDetailView__name1"><strong>{this.props.projectData.projectName}</strong></div>
                       <div className="ProjectDetailView__identifier">id: <strong>{this.props.projectData.projectIdentifier}</strong></div>
                   </div>
                   <div className="PDWSecond">
                       <div className="ProjectDetailView__name">created on: <strong>{this.props.projectData.createdDate}</strong></div>
                       <div className="ProjectDetailView__identifier">updated on: <strong>{this.props.projectData.updatedDate?this.props.projectData.updatedDate:"N/A"}</strong></div>
                   </div>
               </div>
               <hr/>
              <div className="ProjectDetailView__flexer ProjectDetailView__flexer-second">
                    <div className="PDWFirst">
                        <div className="ProjectDetailView__name">start date: <strong>{this.props.projectData.startingDate?this.props.projectData.startingDate:"N/A"}</strong></div>
                        <div className="ProjectDetailView__identifier">end date: <strong>{this.props.projectData.endingDate?this.props.projectData.endingDate:"N/A"}</strong></div>
                    </div>
                    <div className="PDWSecond">
                        <div className="ProjectDetailView__name">todo: <strong>{this.state.todoNo}</strong></div>
                        <div className="ProjectDetailView__name">in progress: <strong>{this.state.inProgressNo}</strong></div>
                        <div className="ProjectDetailView__name">done: <strong>{this.state.completedNo}</strong></div>
                    </div>
                </div>
                <div className="">


                   {this.props.projectData.projectDescription?[<hr/>,<h5>Description</h5>,
                    <div className="ProjectDetailView__des ProjectDetailView__flexer ProjectDetailView__flexer-main">{this.props.projectData.projectDescription}</div>]:null}

{this.props.projectData.notes.length?[<hr/>,
                    <h5>Notes</h5>,
                    <div className="taskDetailView__notes">
                    <ol>
                           {this.props.projectData.notes.map((note,i)=>(
                             <li key={"note"+i} className="taskDetailView__note">
                                {note}
                             </li>
                           ))}
                       </ol>
                    </div>]:null}
{this.props.projectData.usefullLinks.length?[<hr/>,
                    <h5>Links</h5>,
                    <div className="taskDetailView__links">
                    <ol>
                          {this.props.projectData.usefullLinks.map((link,i)=>(
                            <li key={"link"+i} className="taskDetailView__link">
                               <a href={link.link} target="_blank" rel="noopener noreferrer" className="taskDetailView__linkUR">{link.link}</a>
                               <div className="taskDetailView__comment">{link.comment}</div>
                            </li>
                          ))}
                      </ol>
                </div>]:null}
                </div>
            </div>
        )
    }
}
