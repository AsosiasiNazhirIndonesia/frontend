import { fromJS } from 'immutable';
import { ACTION_TYPE } from '../../constants/action.type';
import { ACTOR } from '../../constants/component.constant';

const initState = fromJS({
    selectedData: fromJS({})
});

export default (state = initState, action) => {
    switch(action.type) {
        case ACTION_TYPE.SET_DELETE_SELECTED_DATA:
            return state.merge({
                selectedData: fromJS(action.data)
            });
        default:
            return state;
    } 
}