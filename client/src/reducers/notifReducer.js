import {GET_NOTIFICATIONS,ADD_NOTIFICATIONS,DELETE_NOTIFICATIONS,NOTIF_LOADING,UNCHECKED_NOTIF} from '../actions/types'
const inisialState ={
    Notifications :[],
    loading : false
}


export default function (state = inisialState,action){
switch (action.type){
    case GET_NOTIFICATIONS :
    return {...state,
    Notifications :action.payload,
    loading: false
    
    }
    case DELETE_NOTIFICATIONS :
    return {...state,
        Notifications : state.Notifications.
        filter(Notification =>  Notification._id !== action.payload)
    }
    case ADD_NOTIFICATIONS :
    return {...state,
        Notifications : [action.payload , ...state.Notifications]
    }
    
    case NOTIF_LOADING :
    return {...state,
       loading : true
    }
    case UNCHECKED_NOTIF :
    return {...state,
    Notifications :action.payload,
    loading: false
    
    }
    default : return state;
}

}