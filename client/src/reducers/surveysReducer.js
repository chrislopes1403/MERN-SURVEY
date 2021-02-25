import { FETCH_SURVEYS ,DELETE_SURVEYS,SUBMIT_SURVEY_QUESTION} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
      case FETCH_SURVEYS:
        return action.payload;

      case DELETE_SURVEYS:
        return action.payload;


      case SUBMIT_SURVEY_QUESTION:
        return {...state};

        
      default:
        return state;
    }
  }
  


  