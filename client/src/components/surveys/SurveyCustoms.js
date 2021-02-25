import React from 'react';
import {Form} from 'semantic-ui-react';


const options = [

    {label:'1 Question',value:1},
    {label:'2 Questions',value:2},
    {label:'3 Questions',value:3},
    {label:'4 Questions',value:4},
    {label:'5 Questions',value:5},

];


  
class SurveyCustom extends React.Component {
    state = { value:1}

    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log(this.state.value);
        this.props.setQuestion(this.state.value);
        this.props.onSubmit();
    }    

    renderPrompt()
    {
       const { value } = this.state
       return options.map(option=>{

            return( 
            <Form.Radio
                key={option.label}
                label={option.label}
                value={option.value}
                checked={value === option.value}
                onChange={this.handleChange}
              />);
        });

    }




    render() { 
        return (
        <div style={{ textAlign: 'center' }}>
        <Form   onSubmit={this.handleSubmit}> 
            <Form.Group >
            <label>How Many Questions Would you like? 
                (Secondary Questionaire)</label>

            {this.renderPrompt()}
           
            </Form.Group>
            <Form.Button className="right" >Next</Form.Button>

            <button   className="yellow darken-3 btn-flat left " onClick={this.props.onCancel}>
            Back
            </button>
        </Form>
           
        </div>);
    }
}
 

export default SurveyCustom;
    