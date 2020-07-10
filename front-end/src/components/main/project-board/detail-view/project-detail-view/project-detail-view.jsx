import React, { Component } from 'react'

export default class ProjectDetailView extends Component {

     state={
       todoNo:0,
       inProgressNo:0,
       completedNo:0,
     }

    componentDidMount=()=>{
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
               <div className="ProjectDetailView__flexer">
                   <div className="taskDetailView__btn taskDetailView__btn--modifier">
                       <div className="ProjectDetailView__name">PROJECT NAME: <strong>{this.props.projectData.projectName}</strong></div>
                       <div className="ProjectDetailView__identifier">PROJECT IDENTIFIER: <strong>{this.props.projectData.projectIdentifier}</strong></div>
                   </div>
                   <div className="taskDetailView__btn taskDetailView__btn--modifier">
                       <div className="ProjectDetailView__name">CREATED ON: <strong>{this.props.projectData.createdDate}</strong></div>
                       <div className="ProjectDetailView__identifier">UPDATED DATE: <strong>{this.props.projectData.updatedDate}</strong></div>
                   </div>
               </div>

                <div className="taskDetailView__btn taskDetailView__btn--modifier">
                    <div className="ProjectDetailView__name">START DATE: <strong>{this.props.projectData.startingDate}</strong></div>
                    <div className="ProjectDetailView__identifier">END DATE: <strong>{this.props.projectData.endingDate}</strong></div>
                </div>
                <div className="taskDetailView__btn taskDetailView__btn--modifier">
                    <div className="ProjectDetailView__name">TODO: <strong>{this.state.todoNo}</strong></div>
                    <div className="ProjectDetailView__name">IN PROGRESS: <strong>{this.state.inProgressNo}</strong></div>
                    <div className="ProjectDetailView__name">IN PROGRESS: <strong>{this.state.completedNo}</strong></div>
                </div>
                <h4>DESCRIPTION</h4>
                <div className="ProjectDetailView__des">{this.props.projectData.projectDescription}</div>
                <h4>NOTES</h4>
                <div className="taskDetailView__notes">
                   {this.props.projectData.notes.map((note,i)=>(
                     <div key={"note"+i} className="taskDetailView__note">
                        {note}
                     </div>
                   ))}
                </div>
                <h4>LINKS</h4>
                <div className="taskDetailView__links">
                  {this.props.projectData.usefullLinks.map((link,i)=>(
                    <div key={"link"+i} className="taskDetailView__link">
                       <div className="taskDetailView__linkUR">{link.link}</div>
                       <div className="taskDetailView__comment">{link.comment}</div>
                    </div>
                  ))}
                </div>
            </div>
        )
    }
}
