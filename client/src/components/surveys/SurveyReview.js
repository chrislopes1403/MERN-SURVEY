import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import questionFields from './questionFields';
import * as actions from '../../actions';
import { withRouter } from "react-router-dom";

const SurveyReview =({onCancel,formValues,submitSurvey,history,numberOfQuestions})=>
{
   

    const reviewFields=_.map(formFields,({name, label})=>{

        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });


    const reviewQuestionFields=_.map(questionFields.slice(0,numberOfQuestions),({name, label})=>{

        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });




    return(
    <div className="ui card fluid">
        <div className="content">
        <h5>Please confirm your entries</h5>
        {reviewFields}
        {reviewQuestionFields}
        <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
        >
        Back
        </button>
        <button className="green btn-flat  right white-text"
        onClick={()=>submitSurvey(formValues,history)}
        >
        Send Survey
        <i className="material-icons right">email</i>
        </button>
        </div>
    </div>);

}

function mapStateToProps(state)
{

    return {formValues:state.form.surveyForm.values}
}


export default connect(mapStateToProps,actions)(withRouter(SurveyReview));