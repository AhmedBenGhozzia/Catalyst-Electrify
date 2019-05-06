import { GET_SMARTHUB, smartHubLoading, ADD_ITEM, DELETE_ITEM} from '../actions/types';

const initialState = {
    smartHubs : [],
    loading : false
}

export default function(state= initialState,action) {
   
    switch(action.type){
        case GET_SMARTHUB:
         return {
             ...state,
             smartHubs: action.payload,
             loading: false
         }

         case smartHubLoading:
         return {
             ...state,
             loading: true
         }

         case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items],
            }
        case DELETE_ITEM: 
            return {
                ...state,
                items: state.items.filter(item => item.serialNumber !== action.payload)
            }
    default : return state;
    }
}