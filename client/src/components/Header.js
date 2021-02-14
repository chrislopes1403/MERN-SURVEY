import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './payments';

class Header extends React.Component {
    state = {  }



    renderContent()
    {

        switch(this.props.auth)
        {
            case null:
                return null;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>

            default:
                return [
                <li key="1"><Payments/></li>,
                <li key="2" style={{margin:'0 10px'}}>
                    Credits:{this.props.auth.credits}
                </li>,
                <li key="3"><a href="/api/logout">Logout</a></li>
            ]

        }

    }







    render() { 
        return ( 
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    
                    to={this.props.auth ? '/surverys' : '/' } 
                    
                    className="left brand-logo"
                    >
                         MERN-Survey
                    </Link>
                    <ul className="right">
                       {this.renderContent()}
                    </ul>
                </div>
            </nav>
         );
    }
}
 
const mapStateToProps=(state)=>
{

    return {auth:state}
};


export default connect(mapStateToProps)(Header);