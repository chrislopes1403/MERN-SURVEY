import React from 'react';
import Search from './Search.js';
import CountUp from 'react-countup';
import Mark from "mark.js";
import {connect} from 'react-redux';
import { fetchSurvey } from './../../actions';
import './OverView.css';

class OverView extends React.Component {
    state = { activeTab: 1, 
              questionCount:0,
              replySum:0,
              replyArray:[], 
              loadingDone:false 
            }



    componentDidMount=async()=>
    {
         const { id } = this.props.match.params;
         await this.props.fetchSurvey(id);

         this.setState({questionCount:this.props.surveys[0].questions.length});
         this.setState({loadingDone: true});
         this.calculateReplySum();
    };

    calculateReplySum=()=>
    {

        let total = 0;
        this.props.surveys[0].questions.map((question)=>{
            total += question.reply.length;
        });

        this.setState({replySum:total})

    }

    handleSearch=(value)=>
    {
        this.Instances = document.querySelectorAll(".search-node");

        for(var i = 0; i < this.Instances.length; i++)
        {
            let mark=new Mark(this.Instances[i]);

            var responseList= this.Instances[i].getElementsByClassName('segment-customs');


           for(var j = 0; j <  responseList.length; j++)
           {
                responseList[j].classList.remove("transition");
                responseList[j].classList.remove("hidden");

               if(! responseList[j].innerHTML.includes(value))
               {
                     responseList[j].classList.add("transition");
                     responseList[j].classList.add("hidden");
               }
           }

            mark.unmark({
                done: () => {
                  mark.mark(value);
                }
              });


        }

       
    }


    handleTab = (select) =>
    {
        this.setState({activeTab:select})
    }


    renderTabHeader=()=>
    {
        const {surveys} = this.props;
        const {activeTab} = this.state;
         return surveys[0].questions.map((question,i)=>{
            const index = i + 1;
            return(
                <a 
                key={i}
                className={`item ${activeTab === index ? ' active' : ''}`}  
                data-position="top left"
                data-tooltip={question.question}
                onClick={()=>this.handleTab(index)} 
                data-tab="first"
                >
                {'Q'+index}
                </a>
                );
        
            });

    }
    
    renderTabContent = () =>
    {
        const {surveys} = this.props;
        const {activeTab} = this.state;
        
        
        
        
        
        
        
        return surveys[0].questions.map((question,i)=>{
            const index = i +1
          
          if(!question.reply.length)
          {
              return(
                    <div key ={i} className={`ui bottom attached tab segment ${activeTab === index ? ' active' : ''}`} data-tab="first">
                
                        <div className="ui comments comment-customs search-node">
                        
                            <div key={i} className={`ui segment segment-customs`}>
                                <p className="response-custom">No user responses for this question yet...</p>
                            </div>
                        
                        </div>

                    </div>);
                  
                  
          }
          
          
          
            return(
            <div key ={i} className={`ui bottom attached tab segment ${activeTab === index ? ' active' : ''}`} data-tab="first">
               
                <div className="ui comments comment-customs search-node">
                                       
                    
                    {
                        question.reply.map((answer,i)=>{

                            return(<div key={i} className={`ui segment segment-customs ${question.question}`}>
                            <i className="user icon"></i>{" "}
                            <p className="response-custom">{answer}</p>
                            </div>);
                                        
                        })
                    }

                </div>

            </div>);

        });
    }

    
    render() 
    { 

        let {yes,no} =  this.props.surveys[0] !== undefined ? this.props.surveys[0] : {yes:null,no:null} ;
        let {replySum,loadingDone} = this.state;

        let content = loadingDone===false ?  '' : (
           
           <div className="ui container">

                <Search onSubmit={this.handleSearch}/>

           

                        <div className="ui card right card-custom" style={{ width:'450px' }}>
                            
                            <div className="content" style={{ textAlign: 'center' }}>

                                    <div className="ui small statistic">

                                        <div className="value count-number">
                                        <CountUp end={replySum} />
                                        {"  "}<i className="edit icon"></i>
                                        </div>
                                        <div className="label yes-custom">
                                        Total Questioniare Replies
                                        </div>

                                        <div className="value count-number ">
                                        <CountUp end={yes} />
                                        {"  "}<i className="thumbs up outline icon"></i>
                                        </div>
                                        <div className="label yes-custom">
                                        Email Agree Responses
                                        </div>

                                        <div className="value count-number">
                                        <CountUp end={no} />
                                        {"  "}<i className="thumbs down outline icon"></i>
                                        </div>
                                        <div className="label">
                                        Email Disagree Responses
                                        </div>


                                    </div>


                            </div>
                            
                        </div>

                    
                    
                    
                        <div className="ui card left card-custom" style={{ width:'450px' }}>
                            
                            <div className="content" id="search-node">

                            
                            <div className="ui top attached tabular menu">
                            {this.renderTabHeader()}
                            </div>
                            {this.renderTabContent()}

                            </div>
                            
                        </div>


        </div>);
        
       return content;
    }            
    
}
 
function mapStateToProps({surveys})
{
    return{surveys:surveys}
}


export default connect(mapStateToProps,{
    fetchSurvey:fetchSurvey
})(OverView);