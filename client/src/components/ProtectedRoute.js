import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


const ProtectedRoute =({component:Component, auth,...rest})=> {


    if(auth!==null)
     return <Route {...rest} render={props => (
       auth ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/',
            
            state: { from: props.location,unauthorized:true }
          }}/>
        )
      )}/>
      else
      {
          return <div></div>;
      }
}

const mapStateToProps=({auth})=>{

    return{auth};
}

export default connect(mapStateToProps, null, null, {
    pure: false,
  })(ProtectedRoute);