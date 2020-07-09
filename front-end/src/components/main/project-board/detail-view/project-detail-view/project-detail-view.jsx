import React, { Component } from 'react'

export default class ProjectDetailView extends Component {

    // state={
    //     loading=0
    // }

    render() {
        return (
            <div className="taskDetailView">
                <div className="taskDetailView__btn taskDetailView__btn--modifier">
                    <div className="ProjectDetailView__name"><strong>PROJECT NAME: </strong>{this.props.projectData.projectName}</div>
                    <div className="ProjectDetailView__identifier"><strong>PROJECT IDENTIFIER: </strong>{this.props.projectData.projectIdentifier}</div>
                </div>
                <div className="taskDetailView__btn taskDetailView__btn--modifier">
                    <div className="ProjectDetailView__name"><strong>START DATE: </strong>{this.props.projectData.startingDate}</div>
                    <div className="ProjectDetailView__identifier"><strong>END DATE: </strong>{this.props.projectData.endingDate}</div>
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
