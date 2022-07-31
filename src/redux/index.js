import { combineReducers, createStore } from "redux";
import { Reducer } from "./reducer";

/**
 * Gộp các reducer thành một
 */

export const combineReducer = combineReducers({
  firstReducer: Reducer,
});

export const store = createStore(combineReducer);
