import { combineReducers } from "redux-immutable";
import actorReducer from "./actor.reducer";
import deleteReducer from "./delete.reducer";

export default combineReducers({
    actor: actorReducer,
    delete: deleteReducer
})