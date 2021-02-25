import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import SurveyCustoms from './SurveyCustoms';
import SurveyQuestions from './SurveyQuestions';
import SurveySteps from './SurveySteps';

class SurveyNew extends React.Component {

  state={showFormReview:0,numberOfQuestions:0};



  componentDidMount()
  {
    console.log(1)
  }


  renderContent()
  {

    switch(this.state.showFormReview)
    {
      case 0:
        return <SurveyForm onSubmit={()=>this.setState({showFormReview:1})}/>

      case 1:
        return <SurveyCustoms 
                onCancel={()=>this.setState({showFormReview:0})} 
                onSubmit={()=>this.setState({showFormReview:2})}
                setQuestion={(number)=>this.setState({numberOfQuestions:number})}
              />
      case 2:
        return <SurveyQuestions 
                  onCancel={()=>this.setState({showFormReview:1})} 
                  numberOfQuestions={this.state.numberOfQuestions} 
                  onSubmit={()=>this.setState({showFormReview:3})}
                />

      case 3:
        return <SurveyReview onCancel={()=>this.setState({showFormReview:2})}
                              numberOfQuestions={this.state.numberOfQuestions}
        />
    }
  }


  render() {
    return (
      <div>
        

      <SurveySteps stepNumber={this.state.showFormReview}/>


        {this.renderContent()}
      </div>
    );
  }
}



export default SurveyNew;

