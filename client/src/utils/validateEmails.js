import _ from 'lodash';
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails)=>{

    let invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regex.test(email) === false && email.length); 
    
    invalidEmails = _.compact(invalidEmails); 
    
        if (invalidEmails.length) {

            if (invalidEmails.includes("")) {
                return "There is a trailing comma";
              }

            return `These emails are invalid: ${invalidEmails}. (Please check that commas separate emails.)`;
        }

    return;
};



