import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import smartHubReducer from "./smartHubReducer";
import notifReducer from './notifReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    notif : notifReducer,
    smartHub : smartHubReducer,
    notifStatus : notifReducer
})