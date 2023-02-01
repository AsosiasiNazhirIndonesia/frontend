import { fromJS } from "immutable";
import { ACTION_TYPE } from "../../constants/action.type";

const initState = fromJS({
  user: fromJS({}),
  admin: fromJS({}),
  type: "",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return state.merge({
        user: fromJS(action.data),
      });
    case ACTION_TYPE.SET_ADMIN:
      return state.merge({
        admin: fromJS(action.data),
      });
    case ACTION_TYPE.SET_ACTOR_TYPE:
      return state.merge({
        type: action.data,
      });
    default:
      return state;
  }
};
