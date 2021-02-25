import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
const questionFields = [

    {label:'Question 1 value...',name:'Q1'},
    {label:'Question 2 value...',name:'Q2'},
    {label:'Question 3 value...',name:'Q3'},
    {label:'Question 4 value...',name:'Q4'},
    {label:'Question 5 value...',name:'Q5'},

];

let numbers=0;

 class SurveyQuestions extends React.Component {

   
    renderQuestions=()=>
    {

        const { numberOfQuestions} = this.props;
        numbers=numberOfQuestions;
        return _.map(questionFields.slice(0,numberOfQuestions), ({ label, name }) => {
            return (
              <Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
              />
            );
          });

    }


  render() {
   
    return (
        <div className="ui card fluid">
        <div className="content">
            <h3>Customize Questions</h3>
            <form  onSubmit={this.props.handleSubmit(this.props.onSubmit)}> 

                {this.renderQuestions()}

         


          <button className="yellow darken-3 btn-flat" onClick={this.props.onCancel}>
            Back
          </button>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
          </form>

        </div>
      </div>
    )
  }
}
function validate(values)
{
    const errors={};


    _.each(questionFields.slice(0,numbers), ({ name }) => {
        if (!values[name]) {
          errors[name] = `You must provide a question value`;
        }
      });

  

    return errors;

}


export default reduxForm({
  validate:validate,
  form: 'surveyForm',
  destroyOnUnmount:false,
  forceUnregisterOnUnmount: true
})(SurveyQuestions);

/*
import _ from 'lodash';
import React from 'react';
import { List, Transition } from 'semantic-ui-react';

const Questions=[{question:''},{question:''},{question:''},{question:''},{question:''}];
 class SurveyQuestions extends React.Component {


  state = { items: Questions.slice(0, 1) }

  handleAdd = () =>
    this.setState((prevState) => ({
      items: Questions.slice(0, prevState.items.length + 1),
    }))

  handleRemove = () =>
    this.setState((prevState) => ({ items: prevState.items.slice(0, -1) }))


handleQuestion = (e,i) =>
{
    Questions[i].question=e.target.value;
}

renderButton=(i)=>
{
    if(i===4)
        return <div className="ui button "  onClick={()=>this.props.NextPage()}>Continue</div>
    else
        return <div className="ui button" onClick={this.handleAdd} style={{marginBottom:'10px'}}>Next</div>

}



  render() {
    const { items } = this.state
    console.log(this.props);

    return (
      <div>
        <Transition.Group
          as={List}
          duration={800}
          divided
          size='huge'
          verticalAlign='middle'
        >
        
          {items.map((item,i) => (
            <div>
                <div key={i} className="ui fluid action input" style={{marginBottom:'10px',marginTop:'10px',}}>
                    <input type="text" placeholder={`Question ${i+1}...`}  style={{height:'15px'}}/>
                </div>
                {this.renderButton(i)}
            </div>
         ))}
        </Transition.Group>
      </div>
    )
  }
}


export default SurveyQuestions;


 <div key={i} className="ui fluid action input" style={{marginBottom:'10px'}}>
                <input type="text" placeholder="Search small..." onChange={(e)=>this.handleQuestion(e,i)}/>
                <div className="ui button">Next</div>            
                </div>


*/