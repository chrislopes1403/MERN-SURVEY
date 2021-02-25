import React from 'react';
import {connect} from 'react-redux';
import { fetchSurvey,submitSurveyQuestion } from './../actions';
import _ from 'lodash';
import { reduxForm, Field} from 'redux-form';
import SurveyField from './surveys/SurveyField';





class Feedback extends React.Component {

    state = {
        showQuestions:false,
        numberOfQuestions:1,
        showMessage:false,
        surveyId:null
    }


    componentDidMount()
    {

        const urlParams = new URLSearchParams(this.props.location.search);
        const surveyId = urlParams.get('survey');
        this.setState({surveyId:surveyId});
        this.props.fetchSurvey(surveyId);

    }



    handeResponse=()=>
    {
        this.setState({ showQuestions:true }); 
    }


    renderPrompt=()=>
    {
        return( 
        <div> 
            <h1>Thank You!</h1>
            <p>Can you answer few quick questions to help us improve?</p>
            <button onClick={this.handeResponse} className="ui violet button">Yes</button>
        </div>);
    }

    handleSubmit=(formValues)=>
    {
       this.props.submitSurveyQuestion(this.state.surveyId,formValues);
        this.setState({showMessage:true});
    }

    
    renderQuestions=()=>
    {
        console.log(this.props)
    const {questions}=this.props.surveys[0]; 

       return(
           
        <form id="question-from" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        {_.map(questions.slice(0,this.state.numberOfQuestions), (question,i) => {
        
        
                return(
                 <div key={i}>
                        <Field
                        key={i}
                        component={SurveyField}
                        type="text"
                        label={question.question}
                        name={question.question}
                        />
                
                    {this.renderButton(questions.length,i)}
                </div>);
                
        })
        }
        
       </form>
       )

    }



    renderButton=(length,index)=>
    {
            if( (index+1) === length)
                return <button className="ui blue button"  type="submit">submit</button>
            else
                return <div 
                            className="ui blue button"  
                            onClick={this.nextQuestion} 
                            style={{marginBottom:'10px'}}
                        >
                        Next</div>

    }


    nextQuestion =()=>
    {
        this.setState(prevState => {
            return {numberOfQuestions: prevState.numberOfQuestions + 1}
         });
    }


    render() { 
        
        if(this.state.showMessage)
            return (
            <div style={{ textAlign: 'center' }}>
                <h1>Thank you for your response!</h1>
            </div>);
        else
            return (
            <div style={{ textAlign: 'center' }}>
                {!this.state.showQuestions ? this.renderPrompt() : this.renderQuestions()}     
            </div>);
                       
    }
}
 
function mapStateToProps({surveys})
{
    return {surveys:surveys}
}







const formWrapped = reduxForm({
    form:'surveyForm',
})(Feedback);


export default connect(mapStateToProps,{
    fetchSurvey:fetchSurvey,
    submitSurveyQuestion:submitSurveyQuestion
}
)(formWrapped);


/*
<div className="ui ordered steps">
  <div className="completed step">
    <div className="content">
      <div className="title">Shipping</div>
      <div className="description">Choose your shipping options</div>
    </div>
  </div>
  <div className="completed step">
    <div className="content">
      <div className="title">Billing</div>
      <div className="description">Enter billing information</div>
    </div>
  </div>
  <div className="active step">
    <div className="content">
      <div className="title">Confirm Order</div>
      <div className="description">Verify order details</div>
    </div>
  </div>
</div>

*/ 