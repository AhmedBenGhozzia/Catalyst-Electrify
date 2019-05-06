import {NAVUNCHECKED_NOTIF,GET_NOTIFICATIONS,ADD_NOTIFICATIONS,DELETE_NOTIFICATIONS,NOTIF_LOADING,UNCHECKED_NOTIF,DANGER_NOTIF,INFO_NOTIF,WARNING_NOTIF,SUCCESS_NOTIF} from '../actions/types'
const inisialState ={
    Notifications :[],
    NotificationStatus :[],
    NotificationsDanger :[],
    NotificationsWarning :[],
    NotificationsInfo :[],
    NotificationUNCHECKED :[],

    loading : false,
    user :{}
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
    NotificationUNCHECKED : action.payload,
    loading: false
    
    }
    case NAVUNCHECKED_NOTIF :
    return {...state,
    NotificationUNCHECKED : action.payload,
    loading: false
    
    }
    case SUCCESS_NOTIF :
    return {...state,
        NotificationStatus :action.payload,
    loading: false
    
    }  
    case WARNING_NOTIF :
    return {...state,
        NotificationsWarning :action.payload,
    loading: false
    
    } 
     case DANGER_NOTIF :
    return {...state,
    NotificationsDanger :action.payload,
    loading: false
    
    }  
    case INFO_NOTIF :
    return {...state,
        NotificationsInfo :action.payload,
    loading: false

    }
    default : return state;
}

}