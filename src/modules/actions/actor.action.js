import { ACTION_TYPE } from "../../constants/action.type";

export const setUser = (data) => ({
    type: ACTION_TYPE.SET_USER,
    data
});

export const setAdmin = (data) => ({
    type: ACTION_TYPE.SET_ADMIN,
    data
});

export const setActorType = (data) => ({
    type: ACTION_TYPE.SET_ACTOR_TYPE,
    data
});