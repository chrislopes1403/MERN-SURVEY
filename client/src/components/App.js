import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import ProtectedRoute from './ProtectedRoute';
import Feedback from './Feedback';
import OverView from './overviews/OverView';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/feedback" component={Feedback} />
            <ProtectedRoute exact path="/surveys" component={Dashboard} />
            <ProtectedRoute exact path="/surveys/new" component={SurveyNew} />
            <ProtectedRoute exact path="/surveys/overview/:id" component={OverView} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
