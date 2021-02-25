import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import M from 'materialize-css';

const Dashboard = () => {

    const [showDelete,setShowDelete]=useState(false);
    
    useEffect(()=>{

        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'top'
        });


    },[]);
    

      const handleShowDelete=()=>
      {
        setShowDelete(!showDelete);
      };

      
  return (
    <div>
      <SurveyList showDelete={showDelete}/>
      <div className="fixed-action-btn">
        <Link to="/surveys/new"  className="btn-floating btn-large" style={{backgroundColor:'#283694'}} >
          <i className="material-icons">add</i>
        </Link>
        <ul>
            <li><a className="btn-floating" style={{backgroundColor:'#283694'}} ><i onClick={handleShowDelete} className="material-icons">delete</i></a></li>   
        </ul>
      </div>

      


      
    </div>
  );
};
export default Dashboard;
