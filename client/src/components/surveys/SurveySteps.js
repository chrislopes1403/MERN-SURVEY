import React from 'react';




const SurveySteps = ({stepNumber})=>
{


    return(
    <div style={{textAlign:'center',marginBottom:'20px'}}>
        <div className="ui steps" style={{textAlign:'center'}}>

        <a className={`step ${stepNumber===0 ? 'active' : ''}`}>
            <i className="envelope icon"></i>
            <div className="content">
                <div className="title">Email Setup</div>
                <div className={`description ${stepNumber !==0 ? 'transition hidden' : ''}`}>Customize your email</div>
            </div>
        </a>

        
        <a className={`step ${stepNumber===1 || stepNumber===2 ? 'active' : ''}`}>
            <i className="edit icon"></i>
            <div className="content">
                <div className="title">Questionaire Stepup</div>
                <div className={`description ${stepNumber !==1 && stepNumber !==2 ? 'transition hidden' : ''}`}>Customize what questions are asked</div>
            </div>
        </a>
        
        <a className={`step ${stepNumber===3 ? 'active' : ''}`}>
            <i className="paper plane icon"></i>
            <div className="content">
                <div className="title">{'Review & Send'}</div>
                <div className={`description ${stepNumber !==3 ? 'transition hidden' : ''}`}>Review your Campaign</div>
            </div>
        </a>
    </div>
  </div>)
  ;
}


export default SurveySteps;