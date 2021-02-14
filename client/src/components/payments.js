import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from  'react-redux';
import * as actions from './../actions';


class Payments extends React.Component {
    state = {  }
    render() { 
        return ( 
            <StripeCheckout
             amount={500} //in cents
             token={token=>this.props.handleToken(token)}
             stripeKey={process.env.REACT_APP_STRIPE_KEY}
             name="MERN-SURVEY"
             description="$5 form 5 email survey"
             >
            
                <button className="btn">Add Credits</button>
            </StripeCheckout>
         );
    }
}
 
export default connect(null,
    actions)(Payments);