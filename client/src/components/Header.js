import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './payments';
import './Header.css';


class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return(<div className="ui item">

        <a  href="/auth/google" className="ui google button hover-custom ">
          <i className="google  icon " ></i>
          Sign in with Google
        </a>

        </div>);



      default:
        return [
          <div  key="1"><Payments /></div>,
          <div  key="2" className="ui item">Credits: {this.props.auth.credits}</div>,
          <a  key="3" className="ui item"href="/api/logout">Logout</a>
        ];
    }
  }

  render() {
    return (
            <div className="ui secondary menu " style={{'backgroundColor':'#EDEDED', 'marginTop':'10px'}}>
               <Link
                  to={this.props.auth ? '/surveys' : '/'}
                  className="ui item"
                >
                MERN-Survey
              </Link>
              


              <div className="right menu">
                
                {this.renderContent()}

               



              </div>

            </div>
            );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
