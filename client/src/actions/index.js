import axios from 'axios';
import _ from 'lodash';
import { FETCH_USER,FETCH_SURVEYS,DELETE_SURVEYS,SUBMIT_SURVEY_QUESTION } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};



export const submitSurvey = (values,history) =>{

    return async dispatch => {
      const res = await axios.post('/api/surveys', values);

      dispatch({ type: FETCH_USER, payload: res.data });
      history.push('/surveys');

    }
};


export const submitSurveyQuestion = (id,values) =>{

  return async dispatch => {
     await axios.post('/api/response', {surveyId:id,values:values});

    dispatch({ type: SUBMIT_SURVEY_QUESTION });

  }
};



export const fetchSurveys = () =>{

  return async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });

  }
};


export const fetchSurvey = (id) =>{

  return async dispatch => {
    const res = await axios.post('/api/survey',{id:id});
    dispatch({ type: FETCH_SURVEYS, payload: _.map(res.data) });

  }
};

export const deleteSurvey = (id) =>{

  return async dispatch => {
    const res = await axios.post(`/api/delete`,{id:id});
    dispatch({ type: DELETE_SURVEYS, payload:res.data});

  }
};



