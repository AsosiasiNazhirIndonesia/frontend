import { ACTION_TYPE } from "../../constants/action.type";

export const setDeleteSelectedData = (data) => ({
    type: ACTION_TYPE.SET_DELETE_SELECTED_DATA,
    data
});