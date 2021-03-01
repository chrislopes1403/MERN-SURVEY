import React from 'react';
import {connect} from 'react-redux';
import { fetchSurveys,deleteSurvey } from './../../actions';
import { Link, withRouter } from 'react-router-dom';
import './SurveyList.css';

class SurveyList extends React.Component {
    
    
    componentDidMount()
    {
        this.props.fetchSurveys();
    }


    handleRedirect(path)
    {
        console.log(222);
        this.props.history.push(path);
    }

    renderDelete(id)
    {
        return this.props.showDelete ? (
 
            <div className="card-action right-align">
            <a className="btn white-text red" onClick={()=>this.props.deleteSurvey(id)}>Delete</a>                
            </div>
        ) : null;
    }

    renderSurveys()
    {
    
        if(this.props.surveys.length)
        {
        return this.props.surveys.reverse().map(survey=>{
                return(
                    <div key={survey._id} className="ui card fluid grow">
                    <div className="content" onClick={()=>this.handleRedirect("/surveys/overview/"+survey._id)}>

                        <div className="header">{survey.title}</div>
                        <div className="meta">{new Date(survey.dateSent).toLocaleDateString()}</div>
                        <div className="description">
                        <p>{survey.body}</p>
                        </div>
                    </div>
                    <div className="extra content">
                        <i className="edit icon"></i>
                        <a> Agree: {survey.yes}</a>
                        <a> Disagree: {survey.no}</a>
                        {this.renderDelete(survey._id)}
                    </div>
                    </div>
                );
            });
        }
        else
        {
            return (
                <div style={{ textAlign: 'center' }}>
                  <h3>
                    Start A New Survey!
                  </h3>
                    Press the add button at the bottom corner...
                </div>
              );
        }
    
    }

    render() { 
        return (
        <div >
            {this.renderSurveys()}
        </div>);
    }
}
 
function mapStateToProps({surveys})
{
    return{surveys:surveys}
}


const Wrapper = connect(mapStateToProps,{fetchSurveys,deleteSurvey})(SurveyList);

export default withRouter(Wrapper);


/*<div class="card">
    <div class="content">
      <img class="right floated mini ui image" src="/images/avatar/large/elliot.jpg">
      <div class="header">
        Elliot Fu
      </div>
      <div class="meta">
        Friends of Veronika
      </div>
      <div class="description">
        Elliot requested permission to view your contact details
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
        <div class="ui basic green button">Approve</div>
        <div class="ui basic red button">Decline</div>
      </div>
    </div>
  </div> 
  
   <div className="card  darken-1" key={survey._id}>
                    {this.renderDelete(survey._id)}
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a> Yes: {survey.yes}</a>
                        <a> No: {survey.no}</a>
                    </div>
                </div>
  
  */