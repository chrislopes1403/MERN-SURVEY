import React from 'react';
import {Link} from 'react-router-dom'

const Landing = ({location}) => {


console.log(location)

  const handleUnAuthorized = ()=>
  {
    console.log(22)
    return(
      <div className="ui warning message">
      <div className="header">
        You must logged in before you can do that!
      </div>
        Log in with Google on the top right, then try again
      </div>);
  }


  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        MERN-Survey
      </h1>
      <p>Collect feedback form your users</p>

      <Link  to="/surveys" style={{ marginTop: '10px',backgroundColor:'#283694' }} className="ui primary button">
      Start a New Campaign!
      </Link>

      
      { location.state  ? handleUnAuthorized() : null}
      


      
    </div>
  );
};

export default Landing;
