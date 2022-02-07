import { combineReducers } from 'redux';
import { foodList } from "../data"

function foodListReducer(state = foodList, action) {
    switch (action.type) {
        default: return state;
    }
}

function mealsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_MEAL" :
            return [...state, action.payload]
        default: return state;
    }
}

export default combineReducers({ foodListReducer, mealsReducer });