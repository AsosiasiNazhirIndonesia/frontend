import { combineReducers } from "redux-immutable";
import actorReducer from "./actor.reducer";

export default combineReducers({
    actor: actorReducer
})