import axios from 'axios';
import {NAVUNCHECKED_NOTIF,GET_NOTIFICATIONS,ADD_NOTIFICATIONS,DELETE_NOTIFICATIONS,NOTIF_LOADING,UNCHECKED_NOTIF,DANGER_NOTIF,INFO_NOTIF,WARNING_NOTIF,SUCCESS_NOTIF} from './types';

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
export const getSuccsess = ()=> dispatch =>{
    dispatch(setNotifLoading());
    axios
    .get('/notif/SuccessNotif')
    .then(res =>
        dispatch({
            type : SUCCESS_NOTIF,
            payload : res.data
        }))
    
        
    
    }
    export const getWarning = ()=> dispatch =>{
        dispatch(setNotifLoading());
        axios
        .get('/notif/WarningNotif')
        .then(res =>
            dispatch({
                type : WARNING_NOTIF,
                payload : res.data
            }))
        
            
        
        }
        export const getInfo = ()=> dispatch =>{
            dispatch(setNotifLoading());
            axios
            .get('/notif/InfoNotif')
            .then(res =>
                dispatch({
                    type : INFO_NOTIF,
                    payload : res.data
                }))
            
                
            
            }
            export const getDanger = ()=> dispatch =>{
                dispatch(setNotifLoading());
                axios
                .get('/notif/DangerNotif')
                .then(res =>
                    dispatch({
                        type : DANGER_NOTIF,
                        payload : res.data
                    }))
                
                    
                
                }
export const getUncheked = (id)=> dispatch =>{
    dispatch(setNotifLoading());
    axios
    .get(`http://localhost:5000/notif/UnchekedNotif/${id}`)
    .then(res =>
        dispatch({
            type : UNCHECKED_NOTIF,
            payload : res.data
        }))
    
        
    
    }

    export const getnavUncheked = (id)=> dispatch =>{
        dispatch(setNotifLoading());
        axios
        .get(`http://localhost:5000/notif/UnchekedNotif/${id}`)
        .then(res =>
            dispatch({
                type : NAVUNCHECKED_NOTIF,
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
