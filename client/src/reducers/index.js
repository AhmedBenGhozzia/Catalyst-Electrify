import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import smartHubReducer from "./smartHubReducer";
export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    smartHub : smartHubReducer
})