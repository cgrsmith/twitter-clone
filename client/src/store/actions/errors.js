import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

export const addError = function(error) {
    console.log(error);
    return {
        type: ADD_ERROR,
        error : error
    }
}

export const removeError = function(error) {
    return {
        type: REMOVE_ERROR
    }
}