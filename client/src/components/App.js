import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveryNew from './SurveyNew';


class App extends React.Component {
    state = {  }


    componentDidMount()
    {
        this.props.fetchUser();
    }


    render() { 
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route  exact path="/" component={Landing}/>

                    </div>
                </BrowserRouter>
            </div>);
    }
}
 
export default connect(null,actions)(App);



/*
 <Route  exact path="/" component={Landing}/>
                <Route  exact path="/surveys" component={Dashboard}/>
                <Route  exact path="/surveys/new" component={SurveryNew}/>
                <Route  exact path="/" component={Landing}/>
*/


