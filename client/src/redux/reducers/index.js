import { combineReducers } from "redux";
import state from "./posts";
import auth from './auth'

export default combineReducers({
    Posts: state,
    auth

})