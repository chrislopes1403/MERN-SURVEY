import { FETCH_USER } from './types';
import  axios from 'axios'; 




export const fetchUser = () =>
{
    return async function (dispatch)
    {
      const user = await axios.get('/api/current_user');
      dispatch({type:FETCH_USER,payload:user.data});
    }
}


export const handleToken = (token) =>
{
  return async function (dispatch)
  {
    const response = await axios.post('/api/stripe',token);
    console.log(response);
    dispatch({type:FETCH_USER,payload:response.data});
  }
}


