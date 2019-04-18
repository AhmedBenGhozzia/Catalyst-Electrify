import axios from 'axios';
import { GET_SMARTHUB, smartHubLoading, ADD_ITEM, DELETE_ITEM } from './types';
import {clearErrors} from './errorActions';
export const getSmart = ()=> dispatch => {
    dispatch(setSmartHubLoading());
    axios.get('http://localhost:5000/api/smarthub').then(res => 
        dispatch({
            type : GET_SMARTHUB,
            payload: res.data
        }))
        .catch(err =>
            dispatch(clearErrors)
          );
}

export const addItem = item => (dispatch, getState) => {
    axios
      .post('http://localhost:5000/api/smarthub/add', item)
      .then(res =>
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })
      ).catch(err =>
        dispatch(clearErrors())
      );

  };

  export const deleteItem = serialNumber => (dispatch, getState) => {
    axios
      .get(`http://localhost:5000/api/smarthub/delete/${serialNumber}`)
      .then(res =>
        dispatch({
          type: DELETE_ITEM,
          payload: serialNumber
        })
      ).catch(err =>
        dispatch(clearErrors())
      );
  };
export const setSmartHubLoading = () => {
    return {
        type : smartHubLoading
    }
}
