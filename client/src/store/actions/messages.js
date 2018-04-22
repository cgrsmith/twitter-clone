import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";

export const loadMessages = function(messages) {
    return {
        type : LOAD_MESSAGES,
        messages : messages
    }
}

export function removeAction(id) {
    return {
        type : REMOVE_MESSAGE,
        id : id
    }
}

export const fetchMessages = function() {
    return function(dispatch) {
        return apiCall("get", "api/messages")
            .then(res => {
                dispatch(loadMessages(res));
            })
            .catch(err => addError(err.message))
    }
}

export function postNewMessage(text) {
    return function(dispatch, getState) {
        let currentUser = getState().currentUser.user;
        return apiCall("post", "/api/user/" + currentUser.id + "/messages", {text : text})
            .then(res => {

            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export function removeMessage(userId, id) {
    return function(dispatch) {
        return apiCall("delete", "/api/user/" + userId + "/messages/" + id)
        .then(res => {
            dispatch(removeAction(id));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}