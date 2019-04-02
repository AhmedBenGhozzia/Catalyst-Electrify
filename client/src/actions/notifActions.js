import axios from 'axios';
import {GET_NOTIFICATIONS,ADD_NOTIFICATIONS,DELETE_NOTIFICATIONS,NOTIF_LOADING,UNCHECKED_NOTIF} from './types';

export const getNotif = ()=> dispatch =>{
dispatch(setNotifLoading());
axios
.get('/notif')
.then(res =>
    dispatch({
        type : GET_NOTIFICATIONS,
        payload : res.data
    }))

    

}
export const getUncheked = ()=> dispatch =>{
    dispatch(setNotifLoading());
    axios
    .get('/notif/UnchekedNotif')
    .then(res =>
        dispatch({
            type : UNCHECKED_NOTIF,
            payload : res.data
        }))
    
        
    
    }
export const addNotif = (notif)=> dispatch =>{
     
      axios.post('/notif',notif)
      .then (res=>
       dispatch({
           type : ADD_NOTIFICATIONS,
           payload : res.data
       }))
     
  
   
}








export const deleteNotif = (id)=> dispatch =>{
   axios.delete(`/notif/${id}`).then(res=>
    dispatch({
        type : DELETE_NOTIFICATIONS,
        payload : id 
    }))

}



export const setNotifLoading = ()=>{
    return {
    
        type : NOTIF_LOADING
    }
}
